import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars not configured");
  return createClient(url, key);
}

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not configured");
  return new Resend(key);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, bootcamp } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = getSupabase();
    const { error: dbError } = await supabase.from("enquiries").insert({
      name: email.trim(),
      email: email.trim(),
      company: bootcamp || null,
      phone: null,
      message: `Interest registered for upcoming bootcamp: ${bootcamp}`,
      enquiry_type: "training" as const,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    // Notify ProUX team
    const fromAddress = process.env.RESEND_FROM_EMAIL || "ProUX <notifications@proux.us>";
    const resend = getResend();

    try {
      await resend.emails.send({
        from: fromAddress,
        replyTo: email.trim(),
        to: "hey@proux.design",
        subject: `Bootcamp Interest: ${bootcamp}`,
        html: `<p><strong>${email}</strong> registered interest in <strong>${bootcamp}</strong>.</p>`,
      });
    } catch (e) {
      console.error("Notification email error:", e);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Bootcamp interest API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
