"use client";

import { useState, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "motion/react";

/* -------------------------------------------------------------------------- */
/*  Revenue options — 5 pills, single line                                     */
/* -------------------------------------------------------------------------- */

const revenueOptions = [
  "Under $10M",
  "$10M – $50M",
  "$50M – $1B",
  "$1B+",
];

/* -------------------------------------------------------------------------- */
/*  Check Icon                                                                 */
/* -------------------------------------------------------------------------- */

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <circle cx="10" cy="10" r="10" fill="#47AB19" />
      <path
        d="M6.5 10L9 12.5L13.5 8"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mail Icon                                                                  */
/* -------------------------------------------------------------------------- */

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared styles                                                              */
/* -------------------------------------------------------------------------- */

const inputClasses =
  "w-full rounded-full border border-border bg-[hsl(var(--bg-primary-100))] px-6 py-3.5 text-[15px] text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-[hsl(var(--text-primary-600))] focus:ring-4 focus:ring-[hsl(var(--text-primary-600))]/10";

const labelClasses =
  "ml-5 text-[11px] font-bold uppercase tracking-[0.08em] text-foreground/70";

/* -------------------------------------------------------------------------- */
/*  ConsultingResults Section                                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  Validation helpers                                                         */
/* -------------------------------------------------------------------------- */

function validateEmail(value: string): string | null {
  if (!value.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address";
  return null;
}

function validateWebsite(value: string): string | null {
  if (!value.trim() || value.trim() === "https://") return "Website URL is required";
  try {
    const url = new URL(value.trim().startsWith("http") ? value.trim() : `https://${value.trim()}`);
    if (!url.hostname.includes(".")) return "Enter a valid URL (e.g. yourcompany.com)";
  } catch {
    return "Enter a valid URL (e.g. yourcompany.com)";
  }
  return null;
}

/* -------------------------------------------------------------------------- */
/*  ConsultingResults Section                                                  */
/* -------------------------------------------------------------------------- */

export default function ConsultingResults() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [formData, setFormData] = useState({
    email: "",
    website: "https://",
    revenue: "",
    challenge: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});

  /* ── Auto-expand textarea ────────────────────────────────────────────── */

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(140, el.scrollHeight)}px`;
  }, []);

  /* ── Blur handler — validate on focus leave ──────────────────────────── */

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    let error: string | null = null;
    if (name === "email") error = validateEmail(value);
    if (name === "website") error = validateWebsite(value);

    setFieldErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error as user types if the field was previously touched
    if (touched[name]) {
      let error: string | null = null;
      if (name === "email") error = validateEmail(value);
      if (name === "website") error = validateWebsite(value);
      setFieldErrors((prev) => ({ ...prev, [name]: error }));
    }

    if (name === "challenge") {
      requestAnimationFrame(autoResize);
    }
  };

  /* ── Form submit handler ─────────────────────────────────────────────── */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run field validations and mark all as touched
    const emailErr = validateEmail(formData.email);
    const websiteErr = validateWebsite(formData.website);
    setTouched({ email: true, website: true });
    setFieldErrors({ email: emailErr, website: websiteErr });

    if (
      emailErr ||
      websiteErr ||
      !formData.revenue ||
      !formData.challenge.trim()
    ) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }

      setIsSubmitted(true);
      setFormData({ email: "", website: "https://", revenue: "", challenge: "" });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at hey@proux.design",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Render ──────────────────────────────────────────────────────────── */

  return (
    <section
      id="consultation"
      className="scroll-mt-[64px] bg-[hsl(var(--bg-primary-50))] py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="rounded-[32px] bg-card p-8 shadow-sm md:p-12 lg:p-14">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              /* ── Success state ──────────────────────────────────── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center justify-center py-10 md:py-16"
              >
                {/* Animated check circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--bg-primary-100))]"
                >
                  <motion.svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#47AB19"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </motion.svg>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-3 text-[28px] font-extrabold tracking-tight text-foreground"
                  style={{ fontFamily: "var(--font-family-display)" }}
                >
                  Thank You!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-2 max-w-md text-center text-[16px] leading-relaxed text-[hsl(var(--text-neutrals-800))]"
                >
                  Your details have been received. I&apos;ll personally review
                  your application and get back to you within 24 hours.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="mt-4 flex items-center gap-2 text-foreground/60"
                >
                  <MailIcon />
                  <span className="text-sm font-medium">
                    Check your inbox for a confirmation email
                  </span>
                </motion.div>
              </motion.div>
            ) : (
              /* ── Form state: copy left + form right ─────────────── */
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 items-start gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-14 lg:gap-16"
              >
                {/* ── Left column: heading + trust + email ──────── */}
                <div className="flex flex-col">
                  <h2
                    className="text-[32px] md:text-[40px] font-extrabold tracking-tight text-foreground leading-[1.15]"
                    style={{
                      fontFamily: "var(--font-family-display)",
                    }}
                  >
                    Ready to Fix What&apos;s Costing You Revenue?
                  </h2>

                  <p
                    className="mt-5 text-base md:text-lg text-[hsl(var(--text-neutrals-800))] leading-relaxed"
                  >
                    I work with a limited number of
                    <br className="hidden md:block" />
                    companies each quarter. This quick
                    <br className="hidden md:block" />
                    form helps me understand your situation.
                  </p>

                  {/* Trust signals */}
                  <div className="mt-6 flex flex-col gap-3">
                    {[
                      "Personal review within 24 hours",
                      "Limited spots per quarter",
                      "No commitment required",
                    ].map((text) => (
                      <div key={text} className="flex items-center gap-2.5">
                        <CheckIcon />
                        <span className="text-sm font-medium text-foreground/70">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Direct email fallback */}
                  <div className="mt-8 pt-6 border-t border-border/40">
                    <p className="text-[12px] font-medium text-foreground/50 uppercase tracking-[0.06em] mb-2">
                      Prefer email?
                    </p>
                    <a
                      href="mailto:hey@proux.design"
                      className="inline-flex items-center gap-2 text-[14px] font-medium text-foreground/70 hover:text-primary transition-colors"
                    >
                      <MailIcon />
                      hey@proux.design
                    </a>
                  </div>
                </div>

                {/* ── Right column: form ─────────────────────────── */}
                <div>
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Email + Website side by side */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
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
                          onBlur={handleBlur}
                          className={`${inputClasses} ${
                            touched.email && fieldErrors.email
                              ? "!border-destructive !ring-destructive/10 focus:!border-destructive focus:!ring-destructive/10"
                              : ""
                          }`}
                        />
                        <AnimatePresence>
                          {touched.email && fieldErrors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -4, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: "auto" }}
                              exit={{ opacity: 0, y: -4, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-5 text-[12px] font-medium text-destructive"
                            >
                              {fieldErrors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex flex-col gap-1.5">
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
                          onBlur={handleBlur}
                          className={`${inputClasses} ${
                            touched.website && fieldErrors.website
                              ? "!border-destructive !ring-destructive/10 focus:!border-destructive focus:!ring-destructive/10"
                              : ""
                          }`}
                        />
                        <AnimatePresence>
                          {touched.website && fieldErrors.website && (
                            <motion.p
                              initial={{ opacity: 0, y: -4, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: "auto" }}
                              exit={{ opacity: 0, y: -4, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-5 text-[12px] font-medium text-destructive"
                            >
                              {fieldErrors.website}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Revenue pills — 4 options, single line */}
                    <fieldset className="mt-5">
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
                                className={`inline-flex items-center rounded-full border px-4 py-2 text-[13px] font-medium transition-all ${
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

                    {/* Textarea — auto-expanding */}
                    <div className="mt-5 flex flex-col gap-1.5">
                      <label htmlFor="challenge" className={labelClasses}>
                        About the Project{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        ref={textareaRef}
                        id="challenge"
                        name="challenge"
                        required
                        rows={5}
                        placeholder="Tell me about your biggest UX or conversion challenge..."
                        value={formData.challenge}
                        onChange={handleInputChange}
                        className="w-full resize-none overflow-hidden rounded-[24px] border border-border bg-[hsl(var(--bg-primary-100))] px-6 py-4 text-[15px] text-foreground placeholder:text-muted-foreground/50 outline-none transition-[border-color,box-shadow] duration-200 focus:border-[hsl(var(--text-primary-600))] focus:ring-4 focus:ring-[hsl(var(--text-primary-600))]/10"
                        style={{ minHeight: "140px" }}
                      />
                    </div>

                    {/* Submit */}
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-consulting-shine w-full rounded-[14px] bg-primary px-14 h-[56px] text-[14px] font-semibold uppercase tracking-[1px] text-primary-foreground shadow-lg transition-all hover:brightness-110 hover:shadow-xl disabled:pointer-events-none disabled:opacity-60"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
