"use client";

import React from "react";
import Link from "next/link";

/* ── Checkmark Icon ────────────────────────────────────────────────────── */

function CheckIcon() {
  return (
    <div
      className="flex items-center justify-center size-6 rounded-full shrink-0 shadow-sm"
      style={{ backgroundColor: "#47AB19" }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

/* ── Gold Seal Badge ───────────────────────────────────────────────────── */

function SealBadge() {
  const points = 24;
  const outerR = 68;
  const innerR = 58;
  const cx = 70;
  const cy = 70;

  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    d += (i === 0 ? "M" : "L") + x.toFixed(2) + "," + y.toFixed(2);
  }
  d += "Z";

  return (
    <div className="relative w-[120px] h-[120px] md:w-[140px] md:h-[140px]">
      <svg viewBox="0 0 140 140" fill="none" className="w-full h-full drop-shadow-lg">
        <path
          d={d}
          fill="url(#seal_gold)"
          stroke="url(#seal_rim)"
          strokeWidth="1.5"
        />
        <circle
          cx="70"
          cy="70"
          r="48"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <text
          x="70"
          y="64"
          textAnchor="middle"
          fill="white"
          fontSize="44"
          fontWeight="800"
          fontFamily="var(--font-family-display)"
        >
          5
        </text>
        <text
          x="70"
          y="82"
          textAnchor="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize="13"
          fontWeight="700"
          fontFamily="var(--font-family-base)"
          letterSpacing="2.5"
        >
          DAYS
        </text>
        <defs>
          <linearGradient id="seal_gold" x1="20" y1="10" x2="120" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E8B94F" />
            <stop offset="50%" stopColor="#D4930F" />
            <stop offset="100%" stopColor="#B87D0A" />
          </linearGradient>
          <linearGradient id="seal_rim" x1="20" y1="10" x2="120" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F0CC6B" />
            <stop offset="100%" stopColor="#A06E08" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── Data ───────────────────────────────────────────────────────────────── */

const guaranteeItems = [
  "Full refund within 5 days",
  "No cancellation forms",
  "Keep all designs you created",
];

/* ── Component ──────────────────────────────────────────────────────────── */

export default function MoneyBackSection() {
  const scrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector("#pricing");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      className="w-full py-20 md:py-32 flex flex-col items-center px-4"
      style={{ backgroundColor: "hsl(var(--gold-100))" }}
    >
      <div className="w-full max-w-3xl">
        <div
          className="w-full p-10 md:p-16 flex flex-col items-center text-center rounded-[calc(var(--radius)+16px)]"
          style={{
            backgroundColor: "hsl(var(--sidebar))",
            boxShadow: "0 4px 40px rgba(0,0,0,0.04)",
          }}
        >
          {/* Seal badge */}
          <SealBadge />

          {/* Eyebrow */}
          <p className="mt-5 mb-4 text-xs md:text-sm font-semibold uppercase tracking-[3px] text-accent">
            Money-Back Guarantee
          </p>

          {/* Title */}
          <h2
            className="text-[32px] md:text-[40px] font-extrabold text-foreground mb-4"
            style={{
              fontFamily: "var(--font-family-display)",
              lineHeight: 1.15,
              letterSpacing: "-0.4px",
            }}
          >
            Try It Risk-Free
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg font-normal text-muted-foreground max-w-[560px] mb-10 leading-relaxed px-2 md:px-0">
            If ProUX isn&apos;t a game-changer for your design workflow, we&apos;ll refund every penny – no questions asked.
          </p>

          {/* Guarantee checkmarks */}
          <div className="flex flex-col md:flex-row gap-x-10 gap-y-3 items-start md:items-center justify-center flex-wrap w-full mb-10">
            {guaranteeItems.map((text, i) => (
              <div key={i} className="flex gap-3 items-center shrink-0">
                <CheckIcon />
                <span className="text-sm md:text-base font-medium text-foreground">
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-[400px] h-px bg-[#dfdbc9] mb-10" />

          {/* CTA area */}
          <div className="flex flex-col items-center w-full">
            <Link
              href="https://app.proux.design/Auth"
              className="px-10 md:px-12 h-[56px] flex items-center justify-center bg-primary rounded-[calc(var(--radius)+8px)] shadow-[0_6px_20px_rgba(181,83,49,0.25)] hover:shadow-[0_8px_25px_rgba(181,83,49,0.35)] hover:-translate-y-0.5 transition-all duration-300 mb-4"
            >
              <span className="text-sm md:text-base font-bold text-primary-foreground uppercase tracking-[0.84px]">
                Start Your Risk-Free Trial
              </span>
            </Link>

            <a
              href="#pricing"
              onClick={scrollToPricing}
              className="mb-6 text-sm font-medium text-primary hover:underline transition-colors"
            >
              View pricing details →
            </a>

            <div className="flex flex-col gap-1 items-center text-center">
              <p className="text-base md:text-[17px] font-bold text-foreground leading-snug">
                Go Pro for $384 today (~$32/mo).
              </p>
              <p className="text-sm md:text-base font-medium text-muted-foreground">
                Join 1,000+ designers • 5-day refund guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
