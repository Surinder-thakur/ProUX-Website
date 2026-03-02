"use client";

import { useState, useEffect, useRef } from "react";

/* ── Data ─────────────────────────────────────────────────────────────── */

const stats = [
  {
    value: "12",
    label: "Live Classes",
    caption: "Across three focused 4-week bootcamps.",
  },
  {
    value: "12",
    label: "Hours of Training",
    caption: "Hands-on sessions, not passive lectures.",
  },
  {
    value: "12",
    label: "Students Per Cohort",
    caption: "Small groups for personalized feedback.",
  },
  {
    value: "2",
    label: "Time Zones",
    caption: "US & EU friendly schedules available.",
  },
];

/* ── Component ────────────────────────────────────────────────────────── */

export default function BootcampStatsBar() {
  const inFlowRef = useRef<HTMLDivElement>(null);
  const [showFixed, setShowFixed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!inFlowRef.current) return;
      const rect = inFlowRef.current.getBoundingClientRect();
      // Hide fixed bar the instant the in-flow bar's bottom reaches viewport bottom.
      setShowFixed(rect.bottom > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const barInner = (
    <section
      className="w-full bg-[#F8F7F4] border-y border-[#99825d]/20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
      aria-label="Program statistics"
    >
      <div className="max-w-[1200px] mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-2 lg:flex lg:divide-x divide-[#99825d]/20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center py-5 lg:py-4 hover:bg-[#99825d]/5 transition-colors text-center px-4 lg:px-6 lg:flex-row lg:gap-3 lg:text-left lg:flex-auto lg:justify-center"
            >
              <span className="text-[40px] md:text-[48px] lg:text-4xl font-black text-[#1a2130] tracking-tight leading-none shrink-0">
                {stat.value}
              </span>
              <div className="flex flex-col items-center lg:items-start mt-0.5 lg:mt-0">
                <span className="text-[11px] lg:text-sm font-bold text-[#99825d] uppercase tracking-wide whitespace-nowrap leading-tight">
                  {stat.label}
                </span>
                <span className="hidden sm:block text-[11px] lg:text-xs text-[#4A5568] max-w-[180px] mt-0.5 line-clamp-2 leading-snug">
                  {stat.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <>
      {/* Fixed bar at viewport bottom — desktop only */}
      <div
        className={`hidden lg:block fixed bottom-0 left-0 right-0 z-50 transition-opacity duration-200 ${
          showFixed ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {barInner}
      </div>

      {/* In-flow bar — scrolls with the page */}
      <div ref={inFlowRef} className="relative z-40">
        {barInner}
      </div>
    </>
  );
}
