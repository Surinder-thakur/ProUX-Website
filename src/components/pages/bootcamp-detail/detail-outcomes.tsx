"use client";

import type { LearningOutcome } from "@/lib/data/bootcamps";

export default function DetailOutcomes({
  outcomes,
}: {
  outcomes: LearningOutcome[];
}) {
  return (
    <section className="py-10 md:py-14">
      <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-3">
        What You&apos;ll Learn
      </p>
      <h2 className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.6px] text-foreground mb-8">
        Learning Outcomes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
        {outcomes.map((outcome) => (
          <div key={outcome.number} className="flex gap-3">
            <svg
              className="shrink-0 w-5 h-5 text-primary mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-[15px] font-semibold text-foreground mb-1 tracking-[-0.2px]">
                {outcome.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {outcome.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
