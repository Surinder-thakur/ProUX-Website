/* =============================================================================
 * FEATURES SECTION
 * =============================================================================
 * DESIGNERS: Six feature blocks with alternating layouts. Key customization:
 * - Section heading
 * - Feature titles, descriptions & bullet points
 * - Testimonial quotes & avatars
 * - Product screenshot images (mobile + desktop)
 * - Alternating layout direction (image left/right)
 * ========================================================================== */

import Image from "next/image";

/* DESIGNERS: Update feature data to match your product offering. */
const features = [
  {
    id: "scanner",
    title: "AI-Powered Design Scanner",
    description:
      "Upload any design and get instant, actionable feedback powered by AI. Our scanner analyzes your layouts against hundreds of proven UX principles and identifies improvements in seconds.",
    bullets: [
      "Instant analysis of any design file or URL",
      "Actionable recommendations based on UX best practices",
      "Severity scoring to prioritize what matters most",
      "Export reports for stakeholder presentations",
    ],
    testimonial: {
      quote:
        "The AI Scanner caught usability issues our entire team missed. It's like having a senior UX reviewer available 24/7.",
      name: "Lisa Chen",
      role: "Lead Product Designer at Shopify",
      avatar: "/images/testimonial-lisa.jpg",
    },
    mobileImage: "/images/scanner-mobile.png",
    desktopImage: "/images/scanner-desktop.png",
    mobileAlt: "AI Design Scanner mobile view",
    desktopAlt: "AI Design Scanner desktop view",
  },
  {
    id: "specialists",
    title: "AI-First UX Specialists",
    description:
      "Access a team of AI-powered UX specialists, each trained on specific domains. From e-commerce to SaaS, healthcare to fintech — get expert-level guidance tailored to your industry.",
    bullets: [
      "Domain-specific UX expertise on demand",
      "Trained on thousands of real product analyses",
      "Contextual advice for your specific industry",
      "Available 24/7 with instant responses",
    ],
    testimonial: {
      quote:
        "Having AI specialists for our specific industry saved us months of research. The recommendations are spot-on every time.",
      name: "Jordan Rivera",
      role: "UX Manager at Stripe",
      avatar: "/images/testimonial-jordan.jpg",
    },
    mobileImage: "/images/specialists-mobile.png",
    desktopImage: "/images/specialists-desktop.png",
    mobileAlt: "AI UX Specialists mobile view",
    desktopAlt: "AI UX Specialists desktop view",
  },
  {
    id: "principles",
    title: "UX Principles & Psychology",
    description:
      "Master the cognitive psychology behind great design. Browse our curated library of UX principles, mental models, and behavioral patterns with real-world examples and implementation guides.",
    bullets: [
      "100+ proven UX principles and psychology patterns",
      "Real-world examples from top products",
      "Implementation guides for each principle",
      "Filter by category, impact, and use case",
    ],
    testimonial: {
      quote:
        "This library transformed how our team thinks about design decisions. Every principle comes with actionable guidance.",
      name: "Nina Patel",
      role: "Senior Designer at Airbnb",
      avatar: "/images/testimonial-nina.jpg",
    },
    mobileImage: "/images/principles-mobile.png",
    desktopImage: "/images/principles-desktop.png",
    mobileAlt: "UX Principles mobile view",
    desktopAlt: "UX Principles desktop view",
  },
  {
    id: "guidelines",
    title: "Curated Guidelines Library",
    description:
      "Stop reinventing the wheel. Access our expert-curated library of design guidelines, component patterns, and accessibility standards used by leading design teams worldwide.",
    bullets: [
      "Platform-specific guidelines (iOS, Android, Web)",
      "Component-level best practices",
      "Accessibility standards and WCAG compliance",
      "Regular updates with latest industry standards",
    ],
    testimonial: {
      quote:
        "The guidelines library is our team's single source of truth. It ensures consistency across every product we ship.",
      name: "Priya Sharma",
      role: "Design Lead at Microsoft",
      avatar: "/images/testimonial-priya.jpg",
    },
    mobileImage: "/images/guidelines-mobile.png",
    desktopImage: "/images/guidelines-desktop.png",
    mobileAlt: "Guidelines Library mobile view",
    desktopAlt: "Guidelines Library desktop view",
  },
  {
    id: "analysis",
    title: "Real Product Analysis Library",
    description:
      "Learn from the best by studying detailed UX breakdowns of top-performing products. See exactly what makes successful products work and apply those patterns to your own designs.",
    bullets: [
      "500+ in-depth product UX analyses",
      "Before/after comparisons with measurable impact",
      "Industry-specific teardowns and case studies",
      "New analyses added weekly",
    ],
    testimonial: {
      quote:
        "Studying real product analyses gave our team inspiration and confidence. We stopped guessing and started designing with evidence.",
      name: "Tom Wilson",
      role: "Product Designer at Netflix",
      avatar: "/images/testimonial-tom.jpg",
    },
    mobileImage: "/images/analysis-mobile.png",
    desktopImage: "/images/analysis-desktop.png",
    mobileAlt: "Product Analysis Library mobile view",
    desktopAlt: "Product Analysis Library desktop view",
  },
  {
    id: "insights",
    title: "Real-World UX Insight Database",
    description:
      "Access a living database of UX insights gathered from real user research across industries. Make data-driven design decisions backed by actual user behavior patterns.",
    bullets: [
      "Thousands of validated UX insights",
      "Searchable by industry, pattern, or component",
      "Backed by real user research data",
      "Continuously updated with new findings",
    ],
    testimonial: {
      quote:
        "The insight database is pure gold. It's replaced hours of user research with instant access to validated patterns.",
      name: "Kevin Park",
      role: "Head of UX at Figma",
      avatar: "/images/testimonial-kevin.jpg",
    },
    mobileImage: "/images/insights-mobile.png",
    desktopImage: "/images/insights-desktop.png",
    mobileAlt: "UX Insight Database mobile view",
    desktopAlt: "UX Insight Database desktop view",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-default">
        {/* ── DESIGNERS: Section heading ─────────────────────────────── */}
        <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
          <p className="label-caps mb-4 text-proux-copper">Platform Features</p>
          <h2 className="heading-1 text-proux-navy">
            Everything You Need for Smarter UX Decisions
          </h2>
        </div>

        {/* ── DESIGNERS: Feature blocks ──────────────────────────────── */}
        <div className="space-y-20 lg:space-y-32">
          {features.map((feature, index) => {
            /* DESIGNERS: Alternating layout — even index = image right, odd = image left */
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={feature.id}
                className={`flex flex-col items-center gap-10 lg:gap-16 ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                {/* ── Text content ──────────────────────────────────── */}
                <div className="flex-1 space-y-6">
                  {/* DESIGNERS: Feature title */}
                  <h3 className="heading-2 text-proux-navy">{feature.title}</h3>

                  {/* DESIGNERS: Feature description */}
                  <p className="body-large">{feature.description}</p>

                  {/* DESIGNERS: Bullet points */}
                  <ul className="space-y-3">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <svg
                          className="mt-1 h-5 w-5 flex-shrink-0 text-proux-copper"
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
                        <span className="body-base text-foreground">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* DESIGNERS: Testimonial quote */}
                  <blockquote className="mt-8 rounded-xl border border-border bg-proux-warm p-6">
                    <p className="body-base mb-4 italic text-foreground">
                      &ldquo;{feature.testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <Image
                        src={feature.testimonial.avatar}
                        alt={feature.testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-semibold text-proux-navy">
                          {feature.testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {feature.testimonial.role}
                        </p>
                      </div>
                    </div>
                  </blockquote>
                </div>

                {/* ── Product screenshots ───────────────────────────── */}
                <div className="relative flex-1">
                  <div className="relative">
                    {/* DESIGNERS: Desktop screenshot (background) */}
                    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-xl">
                      <Image
                        src={feature.desktopImage}
                        alt={feature.desktopAlt}
                        width={600}
                        height={400}
                        className="h-auto w-full"
                      />
                    </div>

                    {/* DESIGNERS: Mobile screenshot (overlapping, bottom-right) */}
                    <div
                      className={`absolute -bottom-6 ${
                        isReversed ? "-left-4 sm:-left-8" : "-right-4 sm:-right-8"
                      } w-[35%] overflow-hidden rounded-xl border border-border bg-white shadow-xl`}
                    >
                      <Image
                        src={feature.mobileImage}
                        alt={feature.mobileAlt}
                        width={200}
                        height={400}
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
