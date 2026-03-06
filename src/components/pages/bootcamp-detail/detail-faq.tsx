"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { FaqEntry } from "@/lib/data/bootcamps";

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
        isOpen ? "bg-card" : "bg-[hsl(var(--gold-100))]"
      }`}
      onClick={onClick}
    >
      <div className="px-5 py-4 flex gap-4 items-start w-full">
        <div className="flex-1 flex flex-col">
          <p className="text-[15px] md:text-base font-semibold text-foreground leading-7 tracking-[-0.176px]">
            {question}
          </p>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-3 text-sm md:text-[15px] font-normal text-muted-foreground leading-6 tracking-[-0.084px]">
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

export default function DetailFaq({ faqs }: { faqs: FaqEntry[] }) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const handleToggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-7 md:py-10">
      <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-3">
        FAQ
      </p>
      <h2 className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.6px] text-foreground mb-8">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col gap-3">
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
    </section>
  );
}
