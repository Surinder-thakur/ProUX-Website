"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ── Plus / Minus Icon ────────────────────────────────────────────────── */

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

/* ── FAQ Data ─────────────────────────────────────────────────────────── */

interface FaqEntry {
  question: string;
  answer: string;
}

const faqs: FaqEntry[] = [
  {
    question: "How long does the engagement take?",
    answer:
      "Our standard engagement is a 4-week sprint. Week 1 is for research and audit, Week 2 for strategy, Week 3 for design prototyping, and Week 4 for validation and testing. We can adjust timelines for larger or more complex projects.",
  },
  {
    question: "What deliverables will I receive?",
    answer:
      "You will receive a comprehensive audit report, strategic roadmap, high-fidelity Figma design files, interactive prototypes, and a validation report with user testing insights. Everything is yours to keep and implement.",
  },
  {
    question: "Do I need an existing design team?",
    answer:
      "No, we can function as your standalone product design team for the duration of the project. If you do have a team, we work alongside them to accelerate their output and provide specialized expertise.",
  },
  {
    question: "How do you handle handoff to developers?",
    answer:
      "We provide clean, developer-ready Figma files with annotations, measurements, and asset exports. We also offer a walkthrough session with your engineering team to ensure a smooth implementation.",
  },
  {
    question: "What if I'm not satisfied with the results?",
    answer:
      "We work in weekly sprints with regular check-ins to ensure we're aligned. Our goal is to drive measurable impact. If we don't meet the agreed-upon KPIs or you're not satisfied with the direction, we'll work with you to make it right.",
  },
];

/* ── Single FAQ Item ──────────────────────────────────────────────────── */

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
      className={`w-full cursor-pointer transition-all duration-200 overflow-hidden rounded-[8px] ${
        isOpen
          ? "bg-card shadow-sm"
          : "bg-[hsl(var(--bg-primary-100))] shadow-sm"
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

/* ── Main Section ─────────────────────────────────────────────────────── */

export default function ConsultingFaq() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

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
      className="w-full py-[80px] pb-[100px] px-4 flex flex-col items-center scroll-mt-[64px] bg-[hsl(var(--bg-primary-50))]"
    >
      <div className="flex flex-col gap-8 items-center w-full max-w-[800px]">
        {/* ── Header ── */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2
            className="text-[32px] md:text-[40px] font-extrabold text-foreground"
            style={{
              fontFamily: "var(--font-family-display)",
              lineHeight: 1.15,
              letterSpacing: "-0.4px",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-[22px] font-normal text-muted-foreground leading-relaxed">
            Details about our process, deliverables, and partnership model.
          </p>
        </div>

        {/* ── Accordion list ── */}
        <div className="flex flex-col gap-3 w-full">
          {faqs.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndices.includes(index)}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
