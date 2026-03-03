"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { CurriculumWeek } from "@/lib/data/bootcamps";

function ChevronDown({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function WeekItem({
  week,
  isOpen,
  onClick,
}: {
  week: CurriculumWeek;
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
          <p className="text-[15px] md:text-base font-semibold text-foreground leading-7">
            <span className="text-primary font-bold">
              Week {week.week}
            </span>
            <span className="mx-2 text-[#dfdbc9]">/</span>
            {week.title}
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
                <div className="pt-4 space-y-2">
                  {week.parts.map((part, j) => (
                    <div
                      key={j}
                      className="flex items-start justify-between gap-4 py-1"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-primary/40" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {part.title}
                        </span>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground/60 font-medium whitespace-nowrap mt-0.5">
                        {part.duration}
                      </span>
                    </div>
                  ))}

                  {week.homework && (
                    <div className="mt-3 pt-3 border-t border-[#dfdbc9]/60">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-1">
                        Homework
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {week.homework}
                      </p>
                    </div>
                  )}

                  {week.deliverable && (
                    <div className="mt-3 pt-3 border-t border-[#dfdbc9]/60">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-1">
                        Deliverable
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {week.deliverable}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-1 text-muted-foreground">
          <ChevronDown isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
}

export default function DetailCurriculum({
  curriculum,
}: {
  curriculum: CurriculumWeek[];
}) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const allOpen = openIndices.length === curriculum.length;

  const handleToggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleToggleAll = () => {
    if (allOpen) {
      setOpenIndices([]);
    } else {
      setOpenIndices(curriculum.map((_, i) => i));
    }
  };

  return (
    <section className="py-10 md:py-14">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-3">
            Curriculum
          </p>
          <h2 className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.6px] text-foreground">
            Weekly Breakdown
          </h2>
        </div>
        <button
          onClick={handleToggleAll}
          className="text-[13px] font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          {allOpen ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {curriculum.map((week, index) => (
          <WeekItem
            key={week.week}
            week={week}
            isOpen={openIndices.includes(index)}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}
