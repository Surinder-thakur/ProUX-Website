"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

/* -------------------------------------------------------------------------- */
/*  Revenue options for radio pill group                                       */
/* -------------------------------------------------------------------------- */

const revenueOptions = [
  "< $5M",
  "$5M - $10M",
  "$10M - $25M",
  "$25M - $50M",
  "$50M+",
];

/* -------------------------------------------------------------------------- */
/*  Shared input class names                                                   */
/* -------------------------------------------------------------------------- */

const inputBaseClasses =
  "w-full rounded-full border border-border bg-[hsl(var(--bg-primary-100))] px-8 py-5 text-[15px] text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-[hsl(var(--text-primary-600))] focus:ring-4 focus:ring-[hsl(var(--text-primary-600))]/10";

const labelClasses =
  "ml-6 text-[11px] font-bold uppercase tracking-[0.08em] text-foreground/70";

/* -------------------------------------------------------------------------- */
/*  ConsultingResults Section                                                  */
/* -------------------------------------------------------------------------- */

export default function ConsultingResults() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    website: "https://",
    revenue: "",
    challenge: "",
  });

  /* ── Input change handler ─────────────────────────────────────────────── */

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ── Form submit handler ──────────────────────────────────────────────── */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.email.trim() ||
      !formData.website.trim() ||
      !formData.revenue ||
      !formData.challenge.trim()
    ) {
      toast({
        title: "Missing required fields",
        description:
          "Please fill in all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.from("enquiries").insert({
        name: formData.email.trim(),
        email: formData.email.trim(),
        company: formData.website.trim() || null,
        phone: formData.revenue || null,
        message: formData.challenge.trim(),
        enquiry_type: "consulting" as const,
      });

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({
        email: "",
        website: "https://",
        revenue: "",
        challenge: "",
      });

      toast({
        title: "Application submitted!",
        description: "We'll review your details and respond within 24 hours.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description:
          "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Render ───────────────────────────────────────────────────────────── */

  return (
    <section
      id="consultation"
      className="scroll-mt-[56px] bg-[hsl(var(--bg-primary-50))] pb-16 pt-12 md:pb-24 md:pt-24"
    >
      <div className="mx-auto max-w-[840px] px-4 sm:px-6">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-10 text-center md:mb-14">
          <h2
            className="mb-4 font-extrabold tracking-tight text-foreground"
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(1.75rem, 4vw, 40px)",
              lineHeight: 1.15,
            }}
          >
            Ready to Fix What&apos;s Costing You Revenue?
          </h2>

          <p
            className="mx-auto max-w-xl text-[hsl(var(--text-neutrals-800))]"
            style={{
              fontFamily: "var(--font-family-base)",
              fontSize: "clamp(1rem, 1.8vw, 1.125rem)",
              lineHeight: 1.6,
            }}
          >
            I work with a limited number of companies each quarter. This quick
            form helps me understand your situation so I can come prepared with
            specific insights.
          </p>

          <p className="mt-3 text-sm text-foreground/80">
            I review every application personally and respond within 24 hours.
          </p>
        </div>

        {/* ── Form / Success State ────────────────────────────────────── */}
        {isSubmitted ? (
          /* ── Success message ─────────────────────────────────────── */
          <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>

            <h3
              className="mb-3 text-2xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Thank You
            </h3>

            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Your details have been received. I&apos;ll review your application
              and get back to you within 24 hours.
            </p>
          </div>
        ) : (
          /* ── Lead capture form ──────────────────────────────────── */
          <form onSubmit={handleSubmit} noValidate>
            {/* Row 1: Email + Website URL */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Work Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={labelClasses}>
                  Work Email <span className="text-destructive">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputBaseClasses}
                />
              </div>

              {/* Website URL */}
              <div className="flex flex-col gap-2">
                <label htmlFor="website" className={labelClasses}>
                  Website URL <span className="text-destructive">*</span>
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  required
                  autoComplete="url"
                  placeholder="https://yourcompany.com"
                  value={formData.website}
                  onChange={handleInputChange}
                  className={inputBaseClasses}
                />
              </div>
            </div>

            {/* Row 2: Annual Revenue (radio pills) */}
            <fieldset className="mt-6">
              <legend className={labelClasses}>
                Annual Revenue <span className="text-destructive">*</span>
              </legend>

              <div className="mt-2 flex flex-wrap gap-2">
                {revenueOptions.map((option) => {
                  const isSelected = formData.revenue === option;
                  return (
                    <label key={option} className="cursor-pointer">
                      <input
                        type="radio"
                        name="revenue"
                        value={option}
                        checked={isSelected}
                        onChange={handleInputChange}
                        className="sr-only"
                        required
                      />
                      <span
                        className={`inline-flex items-center rounded-full border px-5 py-2.5 text-[14px] font-medium transition-all ${
                          isSelected
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-transparent text-muted-foreground hover:border-foreground/30"
                        }`}
                      >
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Row 3: About the Project */}
            <div className="mt-6 flex flex-col gap-2">
              <label htmlFor="challenge" className={labelClasses}>
                About the Project{" "}
                <span className="text-destructive">*</span>
              </label>
              <textarea
                id="challenge"
                name="challenge"
                required
                placeholder="Tell me about your biggest UX or conversion challenge..."
                value={formData.challenge}
                onChange={handleInputChange}
                className="min-h-[160px] w-full resize-none rounded-[32px] border border-border bg-[hsl(var(--bg-primary-100))] px-8 py-6 text-[15px] text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-[hsl(var(--text-primary-600))] focus:ring-4 focus:ring-[hsl(var(--text-primary-600))]/10"
              />
            </div>

            {/* Submit button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-[14px] bg-primary px-14 py-[18px] text-[14px] font-semibold uppercase tracking-[1px] text-primary-foreground shadow-lg transition-all hover:brightness-110 hover:shadow-xl disabled:pointer-events-none disabled:opacity-60 md:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
