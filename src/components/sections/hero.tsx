/* =============================================================================
 * HERO SECTION
 * =============================================================================
 * DESIGNERS: This is the first thing visitors see. Key customization points:
 * - Sub-navigation links
 * - Headline text & highlighted phrase
 * - Description copy
 * - CTA button text & link
 * - Certification badges
 * - Hero dashboard image
 * - Stats bar numbers
 * - Feature pills
 * ========================================================================== */

import Image from "next/image";
import Link from "next/link";

/* DESIGNERS: Sub-navigation items. Update href values to match your section IDs. */
const subNavItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Get Started", href: "#get-started" },
];

/* DESIGNERS: Stats bar data. Update numbers and labels as needed. */
const stats = [
  { value: "12k+", label: "Product Designers" },
  { value: "4.98/5", label: "Positive Reviews" },
  { value: "100%", label: "Money Back Guarantee" },
];

/* DESIGNERS: Feature pills displayed below the hero image. */
const featurePills = [
  "AI Design Scanner",
  "UX Principles",
  "Psychology Patterns",
  "Real Product Analysis",
  "Guidelines Library",
  "AI Specialists",
];

/* DESIGNERS: Certification badges shown below the CTA. */
const certBadges = [
  { src: "/images/badge-nng.png", alt: "Nielsen Norman Group Certification" },
  { src: "/images/badge-cua.png", alt: "CUA Certification" },
  { src: "/images/badge-cdpa.png", alt: "CDPA Certification" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="bg-proux-warm section-padding overflow-hidden"
    >
      <div className="container-default">
        {/* ── DESIGNERS: Sub-navigation ──────────────────────────────── */}
        <nav className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {subNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="body-small rounded-full border border-border bg-white px-4 py-2 font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ── DESIGNERS: Hero content ───────────────────────────────── */}
        <div className="mx-auto max-w-4xl text-center">
          {/* DESIGNERS: Eyebrow text above the headline */}
          <p className="label-caps mb-4 text-proux-copper">
            For Product Designers, UX Teams &amp; Founders
          </p>

          {/* DESIGNERS: Main headline. The <span> applies copper highlight. */}
          <h1 className="heading-display mb-6 text-proux-navy">
            AI-First UX Intelligence Platform for{" "}
            <span className="text-proux-copper">Every Stage of Design</span>
          </h1>

          {/* DESIGNERS: Supporting description text */}
          <p className="body-large mx-auto mb-8 max-w-2xl">
            Get AI-powered UX feedback, proven design principles, and
            expert-curated resources — all in one platform built by certified
            UX professionals.
          </p>

          {/* DESIGNERS: Primary CTA button — update href for your signup flow */}
          <div className="mb-8">
            <Link
              href="#get-started"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              Get Started Free
            </Link>
          </div>

          {/* ── DESIGNERS: Certification badges ─────────────────────── */}
          <div className="mb-12 flex flex-col items-center gap-3">
            <p className="label-caps text-muted-foreground">
              Built by Certified Professionals
            </p>
            <div className="flex items-center gap-4">
              {certBadges.map((badge) => (
                <Image
                  key={badge.alt}
                  src={badge.src}
                  alt={badge.alt}
                  width={48}
                  height={48}
                  className="h-10 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:h-12"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── DESIGNERS: Hero dashboard image ───────────────────────── */}
        <div className="relative mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-xl border border-border bg-white shadow-2xl">
            <Image
              src="/images/hero-dashboard.png"
              alt="ProUX AI-First UX Intelligence Platform Dashboard"
              width={1200}
              height={720}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>

        {/* ── DESIGNERS: Stats bar ──────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-proux-navy sm:text-3xl">
                {stat.value}
              </p>
              <p className="body-small mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── DESIGNERS: Feature pills ──────────────────────────────── */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {featurePills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
