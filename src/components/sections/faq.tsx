"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ── Plus / Minus Icon ─────────────────────────────────────────────────── */

const ICON_PATHS = {
  minus: "M4.75 9.25H15.25V10.75H4.75V9.25Z",
  plus: "M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z",
};

function FaqIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative shrink-0 size-5">
      <svg className="block size-full" fill="none" viewBox="0 0 20 20">
        <motion.path
          d={isOpen ? ICON_PATHS.minus : ICON_PATHS.plus}
          fill="hsl(var(--foreground))"
          initial={false}
          animate={{ d: isOpen ? ICON_PATHS.minus : ICON_PATHS.plus }}
          transition={{ duration: 0.2 }}
        />
      </svg>
    </div>
  );
}

/* ── FAQ Data ──────────────────────────────────────────────────────────── */

interface FaqEntry {
  question: string;
  answer: string;
}

const faqs: FaqEntry[] = [
  {
    question: "How does ProUX\u2019s AI work?",
    answer:
      "ProUX uses specialized AI agents trained by NN/g and hfi certified UX professionals. Each agent is built on a database of 350+ universal UX/UI/CRO principles and real product examples. When you upload a design, our AI analyzes it against these expert-validated principles and provides scored feedback with specific recommendations.",
  },
  {
    question: "What file types and formats does ProUX support?",
    answer:
      "ProUX works with image files (PNG, JPG, SVG), live website URLs, and pasted content. You can scan landing pages, mobile app screens, checkout flows, dashboards, or any digital design. No plugins or integrations required\u2014just upload and analyze.",
  },
  {
    question: "How is ProUX different from hiring a UX consultant?",
    answer:
      "ProUX gives you instant expert-level feedback 24/7 at a fraction of the cost. While consultants take days or weeks and charge thousands per project, ProUX analyzes designs in under 60 seconds for $384/year. Plus, you get access to our entire principles library and real product examples to learn as you go.",
  },
  {
    question: "What\u2019s the difference between Free and Pro?",
    answer:
      "Free users get limited tokens for design scans per month with basic AI feedback and restricted access to the guidelines library. Pro members ($384/year) get unlimited tokens for scans, access to all AI specialists, the complete principles library with annotated examples, priority support, and new features as we release them.",
  },
  {
    question: "Can I try Pro before paying?",
    answer:
      "Yes! All Pro features come with a 5-day money-back guarantee. Try everything risk-free. If ProUX doesn\u2019t transform your workflow, we\u2019ll refund you completely\u2014no forms, no questions asked. Plus, you keep all the work you created during the trial.",
  },
  {
    question: "Can I use ProUX for my entire team?",
    answer:
      "Team plans are coming soon! Contact our support team to join the waitlist and discuss your team\u2019s requirements.",
  },
  {
    question: "Is my design data private and secure?",
    answer:
      "Absolutely. Your uploaded designs are encrypted and stored securely. We never share your data with third parties or use it to train our AI models. You can delete your designs anytime from your account.",
  },
  {
    question: "Can I pay monthly instead of annually?",
    answer:
      "Currently, we offer annual plans ($384/year, which works out to $32/month) to ensure you have enough time to see real results. Monthly billing may be available in the future.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, Amex) via Razorpay. Contact our support team if you need a custom payment method.",
  },
  {
    question: "How often do you add new principles and examples?",
    answer:
      "We update ProUX weekly with new principles, annotated product examples, case studies, and AI agent improvements. All updates are included in your Pro subscription at no extra cost. You\u2019ll be notified in-app when new content is available.",
  },
];

/* ── Single FAQ Item ───────────────────────────────────────────────────── */

function FaqItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`w-full cursor-pointer transition-all duration-200 overflow-hidden rounded-xl ${
        isOpen
          ? "bg-card"
          : "bg-[hsl(var(--gold-100))]"
      }`}
      onClick={onClick}
    >
      <div className="px-6 py-5 flex gap-4 items-start w-full">
        <div className="flex-1 flex flex-col">
          {/* Question */}
          <p className="text-base md:text-lg font-semibold text-foreground leading-7 tracking-[-0.176px]">
            {question}
          </p>

          {/* Answer (animated) */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4 text-sm md:text-[15px] font-normal text-muted-foreground leading-6 tracking-[-0.084px]">
                  {answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-1">
          <FaqIcon isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ──────────────────────────────────────────────────────── */

export default function FaqSection() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  const handleToggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section
      id="faq"
      className="w-full py-20 pb-24 px-4 flex flex-col items-center scroll-mt-[64px] bg-[hsl(var(--bg-primary-50))]"
    >
      <div className="flex flex-col gap-8 items-center w-full max-w-[800px]">
        {/* ── Header ── */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2
            className="text-[32px] md:text-[40px] font-extrabold text-foreground px-2 md:px-0"
            style={{
              fontFamily: "var(--font-family-display)",
              lineHeight: 1.15,
              letterSpacing: "-0.4px",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl font-normal text-muted-foreground leading-relaxed px-2 md:px-0">
            Everything you need to know about ProUX, pricing, and getting started.
          </p>
        </div>

        {/* ── Accordion list ── */}
        <div className="flex flex-col gap-3 w-full">
          {visibleFaqs.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndices.includes(index)}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* ── Expand / Collapse toggle ── */}
        {faqs.length > 5 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="mt-4 text-base font-bold text-primary uppercase tracking-[0.84px] hover:opacity-80 hover:underline transition-all"
          >
            {showAll ? "Collapse" : "Expand More"}
          </button>
        )}
      </div>
    </section>
  );
}
