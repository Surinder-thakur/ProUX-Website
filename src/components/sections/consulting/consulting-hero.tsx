"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

/* -------------------------------------------------------------------------- */
/*  Trust badge data                                                          */
/* -------------------------------------------------------------------------- */

const trustBadges = [
  { label: "Insights in days", hasTooltip: false },
  { label: "Data-backed", hasTooltip: false },
  {
    label: "Performance Guaranteed",
    hasTooltip: true,
    tooltip:
      "Get data-backed insights in days (not months) with zero guesswork. If our prototypes don\u2019t test better than your current experience, we extend the sprint at no cost until they do.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Green check icon (circle with white checkmark)                            */
/* -------------------------------------------------------------------------- */

function GreenCheck() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="#47AB19" />
      <path
        d="M6 10.5L8.5 13L14 7.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Consulting Hero Section                                                   */
/* -------------------------------------------------------------------------- */

export default function ConsultingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  /* ── Mouse-tracking parallax for decorative blobs ───────────────────── */
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 … 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate(${x * 30}px, ${y * 20}px)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate(${x * -20}px, ${y * 25}px)`;
      }
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate(${x * 15}px, ${y * -15}px)`;
      }
    }

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <>
      {/* Shine animation keyframes */}
      <style>{`
        @keyframes consulting-shine {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }
        .btn-consulting-shine {
          position: relative;
          overflow: hidden;
        }
        .btn-consulting-shine::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: consulting-shine 3s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-[hsl(var(--bg-primary-50))] pt-32 pb-8 md:pb-12"
      >
        {/* ── Decorative parallax blobs ───────────────────────────────── */}
        <div
          ref={blob1Ref}
          className="pointer-events-none absolute -top-24 -left-32 h-[420px] w-[420px] rounded-full bg-[hsl(var(--gold-200)/0.4)] blur-[100px] transition-transform duration-700 ease-out"
          aria-hidden="true"
        />
        <div
          ref={blob2Ref}
          className="pointer-events-none absolute -right-20 top-1/3 h-[350px] w-[350px] rounded-full bg-[hsl(var(--brown-100)/0.35)] blur-[90px] transition-transform duration-700 ease-out"
          aria-hidden="true"
        />
        <div
          ref={blob3Ref}
          className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[hsl(var(--blue-100)/0.3)] blur-[80px] transition-transform duration-700 ease-out"
          aria-hidden="true"
        />

        {/* ── Container ──────────────────────────────────────────────── */}
        <div className="container-default relative z-10">
          {/* ── Two-column grid ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            {/* ── Left column: text content ─────────────────────────── */}
            <div className="text-center lg:text-left">
              {/* Eyebrow */}
              <p className="label-caps mb-5 text-[hsl(var(--text-primary-600))]">
                For Founders &amp; Business Owners
              </p>

              {/* Headline */}
              <h1
                className="mb-4 font-extrabold tracking-tight text-foreground"
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                  lineHeight: 1.15,
                  letterSpacing: "var(--font-title-h1-tracking)",
                }}
              >
                Do Your Users Know
                <br />
                <span className="text-primary">What to Do Next?</span>
              </h1>

              {/* Subheadline */}
              <p
                className="mb-8 text-[hsl(var(--text-neutrals-800))]"
                style={{
                  fontFamily: "var(--font-family-base)",
                  fontSize: "clamp(1.125rem, 2vw, var(--font-paragraph-xl-size))",
                  lineHeight: 1.4,
                }}
              >
                How much is this costing you?
              </p>

              {/* CTA buttons */}
              <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start lg:justify-start">
                <Link
                  href="#consultation"
                  className="btn-consulting-shine inline-flex items-center justify-center rounded-[12px] bg-primary px-7 py-3.5 text-[14px] font-semibold uppercase tracking-wide text-primary-foreground shadow-lg transition-all hover:brightness-110 hover:shadow-xl"
                >
                  Book Strategy Call
                </Link>

                <Link
                  href="#calculator"
                  className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Calculate ROI
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Trust badges */}
              <TooltipProvider delayDuration={200}>
                <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
                  {trustBadges.map((badge) => (
                    <div
                      key={badge.label}
                      className="flex items-center gap-2"
                    >
                      <GreenCheck />
                      <span className="text-[13px] font-medium text-[hsl(var(--text-neutrals-800))]">
                        {badge.label}
                      </span>
                      {badge.hasTooltip && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              aria-label="More info about Performance Guaranteed"
                              className="inline-flex cursor-help text-[hsl(var(--text-neutrals-400))] transition-colors hover:text-[hsl(var(--text-primary-600))]"
                            >
                              <Info className="h-3.5 w-3.5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="max-w-xs rounded-lg bg-foreground px-4 py-3 text-[13px] leading-relaxed text-[hsl(var(--text-neutrals-50))]"
                          >
                            {badge.tooltip}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  ))}
                </div>
              </TooltipProvider>

              {/* Benefits paragraph */}
              <p className="body-base mx-auto max-w-xl lg:mx-0">
                We help e-commerce and SaaS companies strategize (UX), design
                (UI), and optimize conversions (CRO) using AI-powered audits and
                validated prototypes.
              </p>
            </div>

            {/* ── Right column: hero image ──────────────────────────── */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-none">
                <Image
                  src="/images/hero-consulting.png"
                  alt="ProUX consulting — UX audit and conversion optimization"
                  width={580}
                  height={520}
                  className="h-auto w-full rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
