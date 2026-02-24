/* =============================================================================
 * MONEY-BACK GUARANTEE SECTION
 * =============================================================================
 * DESIGNERS: Trust-building guarantee section. Customize:
 * - Badge image
 * - Guarantee headline & description
 * - Bullet points (guarantee details)
 * - CTA button text & link
 * ========================================================================== */

import Image from "next/image";
import Link from "next/link";

/* DESIGNERS: Guarantee bullet points. Update to match your refund policy. */
const guaranteePoints = [
  "Try ProUX risk-free for 30 days",
  "If you're not satisfied, get a full refund — no questions asked",
  "No hoops to jump through, no fine print",
  "We believe in our product and want you to love it",
];

export default function MoneyBackSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:gap-12 md:text-left">
          {/* ── DESIGNERS: Guarantee badge image ────────────────────── */}
          <div className="flex-shrink-0">
            <Image
              src="/images/money-back-guarantee.png"
              alt="100% Money Back Guarantee"
              width={200}
              height={200}
              className="h-40 w-40 sm:h-48 sm:w-48"
            />
          </div>

          {/* ── DESIGNERS: Guarantee text content ───────────────────── */}
          <div>
            {/* DESIGNERS: Guarantee headline */}
            <h2 className="heading-2 mb-4 text-proux-navy">
              100% Money-Back Guarantee
            </h2>

            {/* DESIGNERS: Guarantee description */}
            <p className="body-large mb-6">
              We&apos;re confident ProUX will transform your design workflow. If
              it doesn&apos;t meet your expectations within 30 days, we&apos;ll
              refund every penny.
            </p>

            {/* DESIGNERS: Guarantee bullet points */}
            <ul className="mb-8 space-y-3">
              {guaranteePoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="body-base text-foreground">{point}</span>
                </li>
              ))}
            </ul>

            {/* DESIGNERS: CTA button */}
            <Link
              href="#get-started"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              Get Started Risk-Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
