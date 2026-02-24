"use client";

import { useState } from "react";
import {
  Search,
  ClipboardCheck,
  BarChart3,
  Users,
  Lightbulb,
  FileSearch,
  MessageSquare,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

/* =============================================================================
 * SEO METADATA
 * =============================================================================
 * Note: Because this is a "use client" component, metadata must be exported
 * from a separate file or handled via generateMetadata in a parent layout.
 * We set the <title> and <meta> tags via the head using Next.js metadata
 * conventions in a co-located metadata file if needed.
 * ========================================================================== */

/* =============================================================================
 * DESIGNERS: Consulting Services Configuration
 * =============================================================================
 * Update the services array to add, remove, or reorder consulting offerings.
 * Each service has an icon, title, description, and list of features.
 * ========================================================================== */
const services = [
  {
    icon: Search,
    title: "UX Audit",
    description:
      "Comprehensive evaluation of your product's user experience against industry best practices and heuristic principles.",
    features: [
      "Heuristic evaluation (Nielsen's 10)",
      "Accessibility compliance review",
      "Competitive benchmarking",
      "Prioritized recommendations report",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Design Review",
    description:
      "Expert analysis of your design system, UI patterns, and visual hierarchy to identify improvement opportunities.",
    features: [
      "Design system assessment",
      "UI pattern consistency check",
      "Visual hierarchy analysis",
      "Interaction design review",
    ],
  },
  {
    icon: BarChart3,
    title: "CRO Optimization",
    description:
      "Data-driven conversion rate optimization to transform more visitors into customers and increase revenue.",
    features: [
      "Funnel analysis & drop-off diagnosis",
      "A/B test strategy & planning",
      "Landing page optimization",
      "Micro-conversion tracking setup",
    ],
  },
  {
    icon: Users,
    title: "Usability Testing",
    description:
      "Structured user testing sessions to uncover real pain points and validate design decisions with actual users.",
    features: [
      "Test plan & script creation",
      "Moderated & unmoderated sessions",
      "Think-aloud protocol analysis",
      "Video highlight reels & report",
    ],
  },
];

/* =============================================================================
 * DESIGNERS: Process Steps Configuration
 * =============================================================================
 * Update the process steps to reflect the consulting methodology.
 * The step number is auto-generated (01, 02, etc.).
 * ========================================================================== */
const processSteps = [
  {
    icon: Lightbulb,
    title: "Discovery",
    description:
      "We start by understanding your business goals, user needs, and current pain points through stakeholder interviews and data analysis.",
  },
  {
    icon: FileSearch,
    title: "Analysis",
    description:
      "Deep-dive into your product using heuristic evaluations, user research, analytics review, and competitive benchmarking.",
  },
  {
    icon: MessageSquare,
    title: "Recommendations",
    description:
      "Deliver a prioritized action plan with clear, actionable recommendations ranked by impact and implementation effort.",
  },
  {
    icon: Rocket,
    title: "Implementation",
    description:
      "Work alongside your team to implement changes, validate improvements through testing, and measure results.",
  },
];

/* =============================================================================
 * DESIGNERS: Engagement Stats
 * =============================================================================
 * Update these numbers as ProUX grows. These are displayed in the stats bar.
 * ========================================================================== */
const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "$100M+", label: "Measurable Impact" },
  { value: "12,000+", label: "Designers Trained" },
  { value: "15+", label: "Years Experience" },
];

export default function UXConsultingPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* DESIGNERS: Form field state — add or remove fields as needed */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* Basic validation */
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing required fields",
        description: "Please fill in your name, email, and message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.from("enquiries").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || null,
        phone: formData.phone.trim() || null,
        enquiry_type: "consulting" as const,
        message: formData.message.trim(),
      });

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });

      toast({
        title: "Enquiry submitted!",
        description: "We'll get back to you within 24 hours.",
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
       * HERO SECTION
       * ================================================================
       * DESIGNERS: Update heading, subheading, and CTA text below.
       * Background uses the warm off-white token (bg-proux-warm).
       * ============================================================== */}
      <section className="bg-proux-warm section-padding">
        <div className="container-default">
          <div className="mx-auto max-w-3xl text-center">
            {/* DESIGNERS: Badge text above heading */}
            <p className="label-caps text-proux-copper mb-4">Expert UX Consulting</p>

            <h1 className="heading-display text-proux-navy mb-6">
              Transform Your Product&apos;s{" "}
              <span className="text-proux-copper">User Experience</span>
            </h1>

            {/* DESIGNERS: Hero description — keep to 2-3 sentences max */}
            <p className="body-large max-w-2xl mx-auto mb-8">
              ProUX delivers strategic UX consulting that drives measurable
              business results. From comprehensive audits to hands-on usability
              testing, we help teams build products people love to use.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wider"
                style={{ backgroundColor: "hsl(var(--proux-copper))" }}
              >
                <a href="#enquiry-form">
                  Get a Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
       * STATS BAR
       * ================================================================
       * DESIGNERS: Update stat values in the stats array above.
       * Background uses navy for contrast.
       * ============================================================== */}
      <section className="bg-proux-navy py-10 sm:py-12">
        <div className="container-default">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
       * SERVICES SECTION
       * ================================================================
       * DESIGNERS: Update services in the services array above.
       * Cards use the standard Card component with hover effects.
       * ============================================================== */}
      <section className="section-padding" id="services">
        <div className="container-default">
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            {/* DESIGNERS: Section label and heading */}
            <p className="label-caps text-proux-copper mb-3">What We Offer</p>
            <h2 className="heading-1 text-proux-navy mb-4">
              Our Consulting Services
            </h2>
            <p className="body-large">
              Tailored UX engagements designed to identify opportunities, solve
              usability challenges, and accelerate product growth.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="group border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                >
                  <CardContent className="p-6 sm:p-8">
                    {/* DESIGNERS: Icon container — change size/color here */}
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-proux-copper" />
                    </div>

                    <h3 className="heading-3 text-proux-navy mb-3">
                      {service.title}
                    </h3>

                    <p className="body-base mb-5">{service.description}</p>

                    {/* DESIGNERS: Feature bullet list for each service */}
                    <ul className="space-y-2.5">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-proux-copper" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
       * PROCESS SECTION
       * ================================================================
       * DESIGNERS: Update process steps in the processSteps array above.
       * Uses alternating warm background for visual rhythm.
       * ============================================================== */}
      <section className="bg-proux-warm section-padding" id="process">
        <div className="container-default">
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            {/* DESIGNERS: Section label and heading */}
            <p className="label-caps text-proux-copper mb-3">How We Work</p>
            <h2 className="heading-1 text-proux-navy mb-4">
              Our Proven Process
            </h2>
            <p className="body-large">
              A structured, collaborative approach that delivers actionable
              insights and measurable improvements at every stage.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative text-center sm:text-left"
                >
                  {/* DESIGNERS: Step number badge */}
                  <div className="mb-5 inline-flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: "hsl(var(--proux-copper))" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-5 w-5 text-proux-copper" />
                  </div>

                  <h3 className="heading-4 text-proux-navy mb-2">
                    {step.title}
                  </h3>

                  <p className="body-small">{step.description}</p>

                  {/* Connector line (hidden on last item and mobile) */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute right-0 top-5 hidden h-px w-8 bg-border lg:block translate-x-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
       * WHY PROUX SECTION
       * ================================================================
       * DESIGNERS: Update differentiators below as needed.
       * ============================================================== */}
      <section className="section-padding">
        <div className="container-default">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="label-caps text-proux-copper mb-3">
                Why Choose ProUX
              </p>
              <h2 className="heading-1 text-proux-navy mb-6">
                UX Consulting That Drives{" "}
                <span className="text-proux-copper">Real Results</span>
              </h2>
              <p className="body-large mb-8">
                Led by Surinder Thakur, an NN/g certified UX consultant with
                15+ years of experience, ProUX combines deep expertise with a
                pragmatic, results-oriented approach.
              </p>

              {/* DESIGNERS: Differentiator list — update text as needed */}
              <ul className="space-y-4">
                {[
                  "NN/g certified UX expertise across 200+ projects",
                  "Data-driven approach with measurable ROI tracking",
                  "Actionable deliverables, not just slide decks",
                  "Cross-industry experience from startups to enterprise",
                  "Hands-on collaboration with your design & product teams",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-proux-copper" />
                    <span className="text-base text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DESIGNERS: Right column — visual placeholder.
                Replace with image, testimonial card, or case study graphic. */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-proux-warm-alt border border-border/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-6xl font-bold text-proux-copper mb-2">$100M+</p>
                  <p className="body-large">
                    Measurable impact delivered for clients across industries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
       * ENQUIRY / CONTACT FORM
       * ================================================================
       * DESIGNERS: Adjust form fields, labels, placeholder text below.
       * The form submits to the Supabase "enquiries" table with
       * enquiry_type = "consulting".
       * ============================================================== */}
      <section
        id="enquiry-form"
        className="bg-proux-warm section-padding"
      >
        <div className="container-narrow">
          <div className="text-center mb-10 sm:mb-12">
            {/* DESIGNERS: Form section heading */}
            <p className="label-caps text-proux-copper mb-3">Get Started</p>
            <h2 className="heading-1 text-proux-navy mb-4">
              Request a Consultation
            </h2>
            <p className="body-large max-w-xl mx-auto">
              Tell us about your project and we&apos;ll get back to you within
              24 hours with a tailored plan.
            </p>
          </div>

          {isSubmitted ? (
            /* ── Success State ────────────────────────────────────── */
            <div className="mx-auto max-w-lg rounded-2xl border bg-white p-8 text-center shadow-sm sm:p-10">
              <div
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: "hsl(var(--proux-copper) / 0.1)" }}
              >
                <CheckCircle2 className="h-8 w-8 text-proux-copper" />
              </div>
              <h3 className="heading-3 text-proux-navy mb-3">
                Thank You!
              </h3>
              <p className="body-base mb-6">
                Your consultation request has been received. Our team will review
                your details and reach out within 24 hours.
              </p>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setIsSubmitted(false)}
              >
                Submit Another Enquiry
              </Button>
            </div>
          ) : (
            /* ── Form ─────────────────────────────────────────────── */
            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-lg space-y-6 rounded-2xl border bg-white p-6 shadow-sm sm:p-8"
            >
              {/* DESIGNERS: Name field */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>

              {/* DESIGNERS: Email field */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>

              {/* DESIGNERS: Two-column row for Company + Phone */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>
              </div>

              {/* DESIGNERS: Message / project details field */}
              <div className="space-y-2">
                <Label htmlFor="message">
                  Project Details <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your product, challenges, and what you're hoping to achieve..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="resize-none"
                />
              </div>

              {/* DESIGNERS: Submit button — uses copper background */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full rounded-full py-3 text-sm font-bold uppercase tracking-wider"
                style={{ backgroundColor: "hsl(var(--proux-copper))" }}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Enquiry
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                We typically respond within 24 hours. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
