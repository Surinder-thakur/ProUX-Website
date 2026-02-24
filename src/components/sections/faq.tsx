/* =============================================================================
 * FAQ SECTION
 * =============================================================================
 * DESIGNERS: Accordion-style FAQ. Key customization points:
 * - Section heading
 * - FAQ items (question & answer pairs)
 * - Accordion open/close behavior
 * - Styling of active vs inactive items
 *
 * NOTE: Uses client-side state for accordion toggle.
 * ========================================================================== */

"use client";

import { useState } from "react";

/* DESIGNERS: FAQ data. Add, remove, or reorder questions as needed. */
const faqItems = [
  {
    id: 1,
    question: "What is ProUX and who is it for?",
    answer:
      "ProUX is an AI-first UX intelligence platform designed for product designers, UX teams, and founders. It provides AI-powered design analysis, curated UX principles, real product breakdowns, and expert guidelines — everything you need to make smarter, faster design decisions at every stage of the design process.",
  },
  {
    id: 2,
    question: "How does the AI Design Scanner work?",
    answer:
      "Simply upload your design file or paste a URL, and our AI analyzes it against hundreds of proven UX principles, accessibility standards, and usability heuristics. You'll receive an instant report with prioritized recommendations, severity scores, and specific suggestions for improvement — complete with references to the underlying UX principles.",
  },
  {
    id: 3,
    question: "What's included in the Lifetime Access plan?",
    answer:
      "The Lifetime Access plan ($699 one-time) includes everything in the Pro plan forever: unlimited AI design scans, full access to the UX principles & psychology library, all product analyses, AI UX specialists, curated guidelines library, UX insight database, priority support, report exports, and all future features we add to the platform. No recurring fees, ever.",
  },
  {
    id: 4,
    question: "Can I try ProUX before committing to a paid plan?",
    answer:
      "Absolutely! Our Explorer plan is completely free and gives you 3 AI design scans per month, access to the basic UX principles library, and 5 product analyses. It's a great way to experience the platform before upgrading. Plus, all paid plans come with a 100% money-back guarantee — try risk-free for 30 days.",
  },
  {
    id: 5,
    question: "How is ProUX different from other UX tools?",
    answer:
      "ProUX is built by certified UX professionals (NNg, CUA, CDPA) and uniquely combines AI intelligence with human expertise. Unlike generic design tools, every recommendation is grounded in proven UX principles and real-world product data. Our AI doesn't just flag issues — it explains why something matters and how to fix it, helping you grow as a designer while shipping better products.",
  },
];

export default function FaqSection() {
  /* DESIGNERS: Set to null to have all items collapsed by default,
   * or set to a number (e.g., 1) to have the first item open. */
  const [openItem, setOpenItem] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="faq" className="section-padding bg-proux-warm">
      <div className="container-narrow">
        {/* ── DESIGNERS: Section heading ─────────────────────────────── */}
        <div className="mb-12 text-center">
          <p className="label-caps mb-4 text-proux-copper">FAQ</p>
          <h2 className="heading-1 text-proux-navy">
            Frequently Asked Questions
          </h2>
        </div>

        {/* ── DESIGNERS: Accordion items ─────────────────────────────── */}
        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openItem === item.id;

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-sm"
              >
                {/* DESIGNERS: Accordion trigger button */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-proux-warm/50"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 text-base font-semibold text-proux-navy sm:text-lg">
                    {item.question}
                  </span>
                  {/* DESIGNERS: Open/close icon */}
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                {/* DESIGNERS: Accordion content panel */}
                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5">
                      <p className="body-base">{item.answer}</p>
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
