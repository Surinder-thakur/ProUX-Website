/* =============================================================================
 * PRICING SECTION
 * =============================================================================
 * DESIGNERS: Three pricing tiers. Key customization points:
 * - Section heading & description
 * - Tier names, prices & billing cycles
 * - Feature lists per tier
 * - "Most Popular" badge placement
 * - CTA button text & links
 * ========================================================================== */

import Link from "next/link";

/* DESIGNERS: Pricing tier configuration. Update prices, features, and CTAs. */
const pricingTiers = [
  {
    id: "explorer",
    name: "Explorer",
    /* DESIGNERS: Price display — set to "$0" for free tier */
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with AI-powered UX insights.",
    isPopular: false,
    cta: "Get Started Free",
    ctaHref: "#get-started",
    /* DESIGNERS: Tier-specific styling */
    cardClass: "border-border bg-white",
    ctaClass:
      "border border-border bg-white text-proux-navy hover:bg-proux-warm",
    features: [
      "3 AI Design Scans per month",
      "Basic UX Principles Library",
      "5 Product Analyses",
      "Community access",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$32",
    period: "/mo",
    description:
      "For professional designers who want unlimited access to AI tools.",
    isPopular: false,
    cta: "Start Pro Trial",
    ctaHref: "#get-started",
    cardClass: "border-border bg-white",
    ctaClass:
      "border border-primary bg-white text-primary hover:bg-primary hover:text-white",
    features: [
      "Unlimited AI Design Scans",
      "Full UX Principles & Psychology Library",
      "All Product Analyses",
      "AI UX Specialists access",
      "Curated Guidelines Library",
      "UX Insight Database",
      "Priority support",
      "Export & share reports",
    ],
  },
  {
    id: "lifetime",
    name: "Lifetime Access",
    price: "$699",
    period: "one-time",
    description:
      "Pay once, get lifetime access to everything. Best value for serious designers.",
    /* DESIGNERS: Set isPopular to true to show the "MOST POPULAR" badge */
    isPopular: true,
    cta: "Get Lifetime Access",
    ctaHref: "#get-started",
    cardClass:
      "border-primary bg-white ring-2 ring-primary/20 shadow-xl relative",
    ctaClass: "bg-primary text-white hover:bg-primary/90",
    features: [
      "Everything in Pro, forever",
      "Unlimited AI Design Scans",
      "Full UX Principles & Psychology Library",
      "All Product Analyses",
      "AI UX Specialists access",
      "Curated Guidelines Library",
      "UX Insight Database",
      "Priority support",
      "Export & share reports",
      "Future features included",
      "No recurring fees ever",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section-padding bg-proux-warm">
      <div className="container-default">
        {/* ── DESIGNERS: Section heading ─────────────────────────────── */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="label-caps mb-4 text-proux-copper">Pricing</p>
          <h2 className="heading-1 mb-4 text-proux-navy">
            Design with AI-Powered Confidence
          </h2>
          <p className="body-large">
            Choose the plan that fits your needs. All plans include our
            money-back guarantee.
          </p>
        </div>

        {/* ── DESIGNERS: Pricing cards grid ──────────────────────────── */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-2xl border p-8 transition-shadow hover:shadow-lg ${tier.cardClass}`}
            >
              {/* DESIGNERS: "MOST POPULAR" badge */}
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="label-caps rounded-full bg-primary px-4 py-1.5 text-white">
                    Most Popular
                  </span>
                </div>
              )}

              {/* DESIGNERS: Tier name */}
              <h3 className="heading-4 text-proux-navy">{tier.name}</h3>

              {/* DESIGNERS: Price display */}
              <div className="mb-2 mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-proux-navy">
                  {tier.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {tier.period}
                </span>
              </div>

              {/* DESIGNERS: Tier description */}
              <p className="body-small mb-6">{tier.description}</p>

              {/* DESIGNERS: CTA button */}
              <Link
                href={tier.ctaHref}
                className={`mb-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all ${tier.ctaClass}`}
              >
                {tier.cta}
              </Link>

              {/* DESIGNERS: Feature list */}
              <ul className="flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-proux-copper"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
