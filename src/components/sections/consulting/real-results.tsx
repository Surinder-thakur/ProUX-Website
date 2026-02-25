"use client";

import { useState } from "react";

/* ── Data ─────────────────────────────────────────────────────────────── */

const results = [
  { metric: "+67% Conversions", company: "Puffy" },
  { metric: "+34% Sign-up Rate", company: "ShopLocal" },
  { metric: "3-Month Launch", company: "Medellín" },
  { metric: "+30% Conversions", company: "Lucyd" },
  { metric: "+45% Engagement", company: "FinTech App" },
  { metric: "5x Faster Shipping", company: "SaaS Startup" },
];

/* ── Component ────────────────────────────────────────────────────────── */

export default function RealResults() {
  const [isPaused, setIsPaused] = useState(false);

  const resultPills = results.map((item, i) => (
    <div
      key={i}
      className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[hsl(var(--border-primary-200))] bg-[hsl(var(--bg-primary-100))]/60 hover:bg-[hsl(var(--bg-primary-100))] transition-colors duration-200"
    >
      <span className="text-sm md:text-[15px] font-bold text-foreground whitespace-nowrap">
        {item.metric}
      </span>
      <span className="text-sm md:text-[15px] font-medium text-[hsl(var(--text-primary-600))] whitespace-nowrap">
        &mdash; {item.company}
      </span>
    </div>
  ));

  return (
    <section className="bg-[hsl(var(--bg-primary-50))] py-10 md:py-14 overflow-hidden">
      <div
        className="relative w-full overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-4 md:gap-6 w-max animate-marquee"
          style={{
            animationDuration: "100s",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {/* First set */}
          <div className="flex gap-4 md:gap-6">
            {resultPills}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex gap-4 md:gap-6">
            {resultPills}
          </div>
        </div>
      </div>
    </section>
  );
}
