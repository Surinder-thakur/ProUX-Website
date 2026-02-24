/* =============================================================================
 * SOCIAL PROOF / CTA SECTION
 * =============================================================================
 * DESIGNERS: Dark navy background section with stats and CTA. Customize:
 * - Headline text
 * - Stat blocks (value + label)
 * - CTA button text & link
 * - Background color (currently navy)
 * ========================================================================== */

import Link from "next/link";

/* DESIGNERS: Update these stat blocks to match your product impact metrics. */
const statBlocks = [
  {
    id: "decision-maker",
    value: "From Order Taker to Decision Maker",
    description:
      "Stop just executing tasks. Start making strategic UX decisions backed by AI intelligence and proven principles.",
  },
  {
    id: "faster",
    value: "3x Faster Strategic Decisions",
    description:
      "Make confident design decisions in minutes instead of days with instant AI-powered analysis and expert recommendations.",
  },
  {
    id: "saved",
    value: "6 Hours Saved Every Week",
    description:
      "Automate research, analysis, and documentation so you can spend your time on high-impact design work that matters.",
  },
];

export default function SocialProofCtaSection() {
  return (
    <section className="bg-proux-navy section-padding">
      <div className="container-default">
        {/* ── DESIGNERS: Section heading ─────────────────────────────── */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="heading-1 text-white">
            Stop executing. Start leading with AI.
          </h2>
        </div>

        {/* ── DESIGNERS: Stat blocks grid ───────────────────────────── */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {statBlocks.map((stat) => (
            <div
              key={stat.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
            >
              {/* DESIGNERS: Stat headline */}
              <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl">
                {stat.value}
              </h3>
              {/* DESIGNERS: Stat description */}
              <p className="text-sm leading-relaxed text-white/70">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── DESIGNERS: CTA button ─────────────────────────────────── */}
        <div className="text-center">
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
          >
            UPGRADE TO PRO
          </Link>
        </div>
      </div>
    </section>
  );
}
