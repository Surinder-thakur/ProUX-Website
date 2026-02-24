"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

/* =============================================================================
 * DESIGNERS: Training Page Configuration
 * =============================================================================
 * This page serves as a waitlist / coming-soon landing page for the
 * AI-First UX Training program. Update copy, social proof count, and
 * curriculum highlights below.
 *
 * Once the training launches, this page can be expanded with full
 * course cards, pricing tiers, and enrollment CTAs.
 * ========================================================================== */

/* DESIGNERS: Social proof counter — update as the waitlist grows */
const WAITLIST_COUNT = "850+";

/* DESIGNERS: Curriculum highlights shown below the waitlist form */
const curriculumHighlights = [
  "AI-powered user research & synthesis",
  "Prompt engineering for UX workflows",
  "Generative UI prototyping with AI tools",
  "AI-first design systems & components",
  "Ethics & bias in AI-driven design",
  "Real-world capstone project",
];

export default function TrainingPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address to join the waitlist.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();

      /* Submit to the waitlist table */
      const { error } = await supabase.from("waitlist").insert({
        email: email.trim(),
        source: "training",
      });

      if (error) throw error;

      setIsSubmitted(true);
      setEmail("");

      toast({
        title: "You're on the list!",
        description: "We'll notify you when enrollment opens.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us at hello@proux.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ================================================================
       * HERO / WAITLIST SECTION
       * ================================================================
       * DESIGNERS: This is the primary above-the-fold section.
       * The layout is a centered single-column with a waitlist form.
       * Background uses the navy color for dramatic contrast.
       * ============================================================== */}
      <section className="relative overflow-hidden bg-proux-navy">
        {/* DESIGNERS: Decorative background gradient — adjust opacity/position */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, hsl(var(--proux-copper)) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(var(--proux-copper)) 0%, transparent 40%)",
          }}
        />

        <div className="container-default relative section-padding">
          <div className="mx-auto max-w-3xl text-center">
            {/* DESIGNERS: Badge — update text when enrollment status changes */}
            <Badge
              variant="outline"
              className="mb-6 rounded-full border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm"
            >
              Enrollment Opening Soon
            </Badge>

            {/* DESIGNERS: Main heading — "AI-Native" uses copper highlight */}
            <h1 className="heading-display mb-6 text-white">
              The Future of UX is{" "}
              <span className="text-proux-copper">AI-Native</span>
            </h1>

            {/* DESIGNERS: Subheading description */}
            <p className="body-large mx-auto mb-10 max-w-2xl !text-white/70">
              Join the waitlist to get early access to the curriculum, a special
              launch discount, and a free &ldquo;AI Tools for UX&rdquo; starter
              guide delivered straight to your inbox.
            </p>

            {/* ── Waitlist Form ─────────────────────────────────────── */}
            {isSubmitted ? (
              <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-proux-copper/20">
                  <CheckCircle2 className="h-7 w-7 text-proux-copper" />
                </div>
                <h3 className="heading-4 mb-2 text-white">
                  You&apos;re on the list!
                </h3>
                <p className="body-small !text-white/60">
                  We&apos;ll send you early access details, the launch discount
                  code, and your free AI Tools starter guide soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              >
                {/* DESIGNERS: Email input styling */}
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 flex-1 rounded-full border-white/20 bg-white/10 px-5 text-white placeholder:text-white/50 focus-visible:ring-proux-copper focus-visible:border-white/30"
                />

                {/* DESIGNERS: CTA button — copper background, uppercase text */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="h-12 rounded-full px-6 text-xs font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: "hsl(var(--proux-copper))" }}
                >
                  {isSubmitting ? (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      Notify Me
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* DESIGNERS: Social proof line — update WAITLIST_COUNT above */}
            <p className="mt-5 text-sm text-white/50">
              Join{" "}
              <span className="font-semibold text-white/70">
                {WAITLIST_COUNT} designers
              </span>{" "}
              waiting for the launch.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
       * WHAT YOU'LL LEARN SECTION
       * ================================================================
       * DESIGNERS: Update curriculum highlights in the array above.
       * This section gives visitors a preview of the training content.
       * ============================================================== */}
      <section className="section-padding">
        <div className="container-default">
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
            <p className="label-caps text-proux-copper mb-3">Curriculum Preview</p>
            <h2 className="heading-1 text-proux-navy mb-4">
              What You&apos;ll Learn
            </h2>
            <p className="body-large">
              A hands-on curriculum designed to give UX professionals the skills
              to lead in an AI-first world.
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {curriculumHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border/50 bg-white p-5 transition-all duration-200 hover:border-primary/20 hover:shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-proux-copper" />
                  <span className="text-sm font-medium text-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
       * WHO IT'S FOR SECTION
       * ================================================================
       * DESIGNERS: Update the audience personas below.
       * ============================================================== */}
      <section className="bg-proux-warm section-padding">
        <div className="container-default">
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
            <p className="label-caps text-proux-copper mb-3">Who It&apos;s For</p>
            <h2 className="heading-1 text-proux-navy mb-4">
              Built for UX Professionals Ready to{" "}
              <span className="text-proux-copper">Level Up</span>
            </h2>
          </div>

          {/* DESIGNERS: Audience cards — update roles and descriptions */}
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              {
                role: "UX Designers",
                description:
                  "Integrate AI tools into your design workflow and 10x your research and prototyping speed.",
              },
              {
                role: "Product Managers",
                description:
                  "Understand AI-native UX principles to make smarter product decisions and ship faster.",
              },
              {
                role: "UX Researchers",
                description:
                  "Leverage AI for synthesis, analysis, and insight generation from qualitative data.",
              },
            ].map((persona) => (
              <div
                key={persona.role}
                className="rounded-2xl border border-border/50 bg-white p-6 text-center transition-all duration-200 hover:shadow-md sm:p-8"
              >
                {/* DESIGNERS: Persona icon placeholder */}
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "hsl(var(--proux-copper) / 0.1)",
                  }}
                >
                  <span className="text-lg font-bold text-proux-copper">
                    {persona.role.charAt(0)}
                  </span>
                </div>
                <h3 className="heading-4 text-proux-navy mb-2">
                  {persona.role}
                </h3>
                <p className="body-small">{persona.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
       * INSTRUCTOR SECTION
       * ================================================================
       * DESIGNERS: Update instructor bio and credentials.
       * ============================================================== */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center">
            <p className="label-caps text-proux-copper mb-3">Your Instructor</p>
            <h2 className="heading-1 text-proux-navy mb-6">
              Led by Surinder Thakur
            </h2>

            {/* DESIGNERS: Instructor bio paragraph */}
            <p className="body-large mx-auto max-w-2xl mb-6">
              NN/g certified UX consultant with 15+ years of experience.
              Surinder has trained over 12,000 designers globally and delivered
              $100M+ in measurable impact for organizations ranging from
              startups to Fortune 500 companies.
            </p>

            {/* DESIGNERS: Credential badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                "NN/g Certified",
                "12,000+ Designers Trained",
                "15+ Years Experience",
                "$100M+ Impact",
              ].map((credential) => (
                <Badge
                  key={credential}
                  variant="secondary"
                  className="rounded-full px-4 py-1.5 text-xs"
                >
                  {credential}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
       * BOTTOM CTA / SECOND WAITLIST SECTION
       * ================================================================
       * DESIGNERS: Duplicate of the waitlist form for bottom-of-page conversion.
       * Uses the navy background for visual bookend effect.
       * ============================================================== */}
      <section className="relative overflow-hidden bg-proux-navy section-padding">
        {/* DESIGNERS: Decorative background gradient */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, hsl(var(--proux-copper)) 0%, transparent 50%)",
          }}
        />

        <div className="container-narrow relative text-center">
          <h2 className="heading-2 mb-4 text-white">
            Don&apos;t Miss the Launch
          </h2>
          <p className="body-large mx-auto mb-8 max-w-xl !text-white/70">
            Be the first to know when enrollment opens. Waitlist members get
            early access and an exclusive launch discount.
          </p>

          {isSubmitted ? (
            <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-proux-copper" />
              <p className="text-sm font-medium text-white">
                You&apos;re already on the waitlist. We&apos;ll be in touch!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 flex-1 rounded-full border-white/20 bg-white/10 px-5 text-white placeholder:text-white/50 focus-visible:ring-proux-copper focus-visible:border-white/30"
              />
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="h-12 rounded-full px-6 text-xs font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: "hsl(var(--proux-copper))" }}
              >
                {isSubmitting ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    Notify Me
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          <p className="mt-5 text-sm text-white/50">
            Join{" "}
            <span className="font-semibold text-white/70">
              {WAITLIST_COUNT} designers
            </span>{" "}
            waiting for the launch.
          </p>
        </div>
      </section>
    </>
  );
}
