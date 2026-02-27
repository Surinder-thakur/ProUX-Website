import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

/* -------------------------------------------------------------------------- */
/*  Supabase server client (uses service-role or anon key server-side)         */
/* -------------------------------------------------------------------------- */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

/* -------------------------------------------------------------------------- */
/*  Resend client                                                              */
/* -------------------------------------------------------------------------- */

const resend = new Resend(process.env.RESEND_API_KEY);

/* -------------------------------------------------------------------------- */
/*  POST handler                                                               */
/* -------------------------------------------------------------------------- */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, website, revenue, challenge } = body;

    // Basic server-side validation
    if (!email || !website || !revenue || !challenge) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 1. Insert into Supabase
    const { error: dbError } = await supabase.from("enquiries").insert({
      name: email.trim(),
      email: email.trim(),
      company: website.trim() || null,
      phone: revenue || null,
      message: challenge.trim(),
      enquiry_type: "consulting" as const,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save enquiry" },
        { status: 500 }
      );
    }

    // 2. Send notification email to ProUX team
    const fromAddress = process.env.RESEND_FROM_EMAIL || "ProUX <notifications@proux.us>";

    // Extract clean company name from website for a unique, spam-safe subject
    let company = "New Lead";
    try {
      const raw = website.trim().startsWith("http") ? website.trim() : `https://${website.trim()}`;
      company = new URL(raw).hostname.replace(/^www\./, "").split(".")[0];
      company = company.charAt(0).toUpperCase() + company.slice(1);
    } catch {
      // fallback stays "New Lead"
    }

    try {
      await resend.emails.send({
        from: fromAddress,
        replyTo: email.trim(),
        to: "hey@proux.design",
        subject: `New Consultation from ${company}`,
        html: notificationEmailHtml({ email, website, revenue, challenge }),
      });
    } catch (emailErr) {
      console.error("Notification email error:", emailErr);
      // Don't fail the request — data is saved
    }

    // 3. Send confirmation email to the submitter
    try {
      await resend.emails.send({
        from: fromAddress,
        replyTo: "hey@proux.design",
        to: email.trim(),
        subject: "We received your consultation request — ProUX",
        html: confirmationEmailHtml({ email }),
      });
    } catch (emailErr) {
      console.error("Confirmation email error:", emailErr);
      // Don't fail the request — data is saved
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Consultation API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------------------------- */
/*  Email templates                                                            */
/* -------------------------------------------------------------------------- */

function notificationEmailHtml({
  email,
  website,
  revenue,
  challenge,
}: {
  email: string;
  website: string;
  revenue: string;
  challenge: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background-color:#f8f7f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f7f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:#1a2130;padding:32px 40px;">
              <h1 style="margin:0;color:#f8f7f4;font-size:20px;font-weight:700;letter-spacing:-0.3px;">
                New Consultation Request
              </h1>
              <p style="margin:8px 0 0;color:#99825d;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">
                ProUX Consulting
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0eee4;">
                    <p style="margin:0 0 4px;color:#99825d;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Email</p>
                    <p style="margin:0;color:#1a2130;font-size:15px;">
                      <a href="mailto:${email}" style="color:#b55331;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0eee4;">
                    <p style="margin:0 0 4px;color:#99825d;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Website</p>
                    <p style="margin:0;color:#1a2130;font-size:15px;">
                      <a href="${website}" style="color:#b55331;text-decoration:none;">${website}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0eee4;">
                    <p style="margin:0 0 4px;color:#99825d;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Annual Revenue</p>
                    <p style="margin:0;color:#1a2130;font-size:15px;font-weight:600;">${revenue}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <p style="margin:0 0 4px;color:#99825d;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">About the Project</p>
                    <p style="margin:0;color:#1a2130;font-size:15px;line-height:1.6;white-space:pre-wrap;">${challenge}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 28px;background-color:#f8f7f4;border-top:1px solid #f0eee4;">
              <p style="margin:0;color:#718096;font-size:12px;">
                Reply directly to <a href="mailto:${email}" style="color:#b55331;text-decoration:none;">${email}</a> to respond.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function confirmationEmailHtml({ email }: { email: string }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background-color:#f8f7f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f7f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:#1a2130;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#f8f7f4;font-size:22px;font-weight:700;letter-spacing:-0.3px;">
                Thank you for reaching out
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 20px;color:#1a2130;font-size:16px;line-height:1.7;">
                Hi there,
              </p>
              <p style="margin:0 0 20px;color:#1a2130;font-size:16px;line-height:1.7;">
                I&rsquo;ve received your consultation request and will personally review it within 24 hours. You can expect a response at <strong>${email}</strong>.
              </p>
              <p style="margin:0 0 20px;color:#1a2130;font-size:16px;line-height:1.7;">
                In the meantime, here&rsquo;s what to expect:
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td style="padding:6px 0;vertical-align:top;">
                    <span style="display:inline-block;width:20px;height:20px;border-radius:50%;background-color:#47AB19;text-align:center;line-height:20px;color:#fff;font-size:11px;font-weight:700;">&#10003;</span>
                  </td>
                  <td style="padding:6px 0 6px 12px;color:#1a2130;font-size:15px;line-height:1.5;">
                    I&rsquo;ll review your website and project details
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;">
                    <span style="display:inline-block;width:20px;height:20px;border-radius:50%;background-color:#47AB19;text-align:center;line-height:20px;color:#fff;font-size:11px;font-weight:700;">&#10003;</span>
                  </td>
                  <td style="padding:6px 0 6px 12px;color:#1a2130;font-size:15px;line-height:1.5;">
                    Prepare initial observations and recommendations
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;">
                    <span style="display:inline-block;width:20px;height:20px;border-radius:50%;background-color:#47AB19;text-align:center;line-height:20px;color:#fff;font-size:11px;font-weight:700;">&#10003;</span>
                  </td>
                  <td style="padding:6px 0 6px 12px;color:#1a2130;font-size:15px;line-height:1.5;">
                    Reach out to schedule a discovery call
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#718096;font-size:15px;line-height:1.7;">
                If you have any urgent questions, feel free to reply to this email.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 28px;background-color:#f8f7f4;border-top:1px solid #f0eee4;text-align:center;">
              <p style="margin:0 0 4px;color:#1a2130;font-size:14px;font-weight:700;">ProUX</p>
              <p style="margin:0;color:#718096;font-size:12px;">UX Consulting &amp; Strategy</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
