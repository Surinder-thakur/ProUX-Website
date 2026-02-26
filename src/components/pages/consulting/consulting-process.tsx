"use client";

import { useState, useCallback, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*  Custom SVG icons (from live Figma design)                                 */
/* -------------------------------------------------------------------------- */

function IconDeepResearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 47 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.67 6.83C8.8 6.83 5.67 9.97 5.67 13.83C5.67 15.16 6.04 16.4 6.68 17.46C3.44 18.08 1 20.92 1 24.33C1 27.75 3.44 30.59 6.68 31.21M12.67 6.83C12.67 3.61 15.28 1 18.5 1C21.72 1 24.33 3.61 24.33 6.83V10.33M12.67 6.83C12.67 8.74 13.58 10.44 15 11.5M6.68 31.21C6.04 32.27 5.67 33.51 5.67 34.83C5.67 38.7 8.8 41.83 12.67 41.83C12.67 45.06 15.28 47.67 18.5 47.67C21.72 47.67 24.33 45.06 24.33 41.83V38.33M6.68 31.21C7.51 29.84 8.8 28.77 10.33 28.23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 17.33H31.33C29.13 17.33 28.03 17.33 27.35 18.02C26.67 18.7 26.67 19.8 26.67 22V26.67C26.67 28.87 26.67 29.97 27.35 30.65C28.03 31.33 29.13 31.33 31.33 31.33H36C38.2 31.33 39.3 31.33 39.98 30.65C40.67 29.97 40.67 28.87 40.67 26.67V22C40.67 19.8 40.67 18.7 39.98 18.02C39.3 17.33 38.2 17.33 36 17.33Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30.17 31.33V36M37.17 31.33V36M30.17 12.67V17.33M37.17 12.67V17.33M26.67 20.83H22M26.67 27.83H22M45.33 20.83H40.67M45.33 27.83H40.67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconStrategicInsights({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M31 21C31 26.52 26.52 31 21 31C15.48 31 11 26.52 11 21C11 15.48 15.48 11 21 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M25 1.4C23.71 1.14 22.37 1 21 1C9.95 1 1 9.95 1 21C1 32.05 9.95 41 21 41C32.05 41 41 32.05 41 21C41 19.63 40.86 18.29 40.6 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 21L30.5 11.5M30.5 11.5L28.5 9.5L36.5 5.5L40.5 5.7C41.4 5.9 41.9 6.5 42 7.2C42.1 7.9 41.8 8.6 41.3 9.1L39 11.4L32.9 12.4L30.5 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDesignPrototypes({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.33 9.17C10.33 6.99 10.33 5.9 10.8 5.08C11.11 4.55 11.55 4.11 12.08 3.8C12.9 3.33 13.99 3.33 16.17 3.33H23.17C25.35 3.33 26.44 3.33 27.25 3.8C27.78 4.11 28.22 4.55 28.53 5.08C29 5.9 29 6.99 29 9.17C29 11.35 29 12.44 28.53 13.25C28.22 13.78 27.78 14.22 27.25 14.53C26.44 15 25.35 15 23.17 15H16.17C13.99 15 12.9 15 12.08 14.53C11.55 14.22 11.11 13.78 10.8 13.25C10.33 12.44 10.33 11.35 10.33 9.17Z" stroke="currentColor" strokeWidth="2" />
      <path d="M10.33 32.5C10.33 30.32 10.33 29.23 10.8 28.42C11.11 27.88 11.55 27.44 12.08 27.14C12.9 26.67 13.99 26.67 16.17 26.67H23.17C25.35 26.67 26.44 26.67 27.25 27.14C27.78 27.44 28.22 27.88 28.53 28.42C29 29.23 29 30.32 29 32.5C29 34.68 29 35.77 28.53 36.58C28.22 37.12 27.78 37.56 27.25 37.86C26.44 38.33 25.35 38.33 23.17 38.33H16.17C13.99 38.33 12.9 38.33 12.08 37.86C11.55 37.56 11.11 37.12 10.8 36.58C10.33 35.77 10.33 34.68 10.33 32.5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M44.96 36.33C46.76 34.52 47.67 33.62 47.67 32.5C47.67 31.38 46.76 30.48 44.96 28.67L44.5 28.21C42.69 26.4 41.79 25.5 40.67 25.5C39.55 25.5 38.64 26.4 36.84 28.21L36.37 28.67C34.57 30.48 33.67 31.38 33.67 32.5C33.67 33.62 34.57 34.52 36.37 36.33L36.84 36.79C38.64 38.6 39.55 39.5 40.67 39.5C41.79 39.5 42.69 38.6 44.5 36.79L44.96 36.33Z" stroke="currentColor" strokeWidth="2" />
      <path d="M10.35 9.17H1.02M1.02 9.17V1M1.02 9.17V24.33C1.02 26.91 0.67 30.09 3.09 31.71C4.27 32.5 5.91 32.5 9.18 32.5M29.01 32.5H33.67M40.67 25.5V18.5C40.67 14.1 40.67 11.9 39.3 10.53C37.93 9.17 35.74 9.17 31.34 9.17H29.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M47.67 47.67C45.49 47.67 44.41 47.67 43.55 47.36C42.4 46.96 41.5 46.18 41.02 45.2C40.67 44.46 40.67 43.53 40.67 41.67V40.67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTestingValidation({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M43 43H17.33C9.63 43 5.78 43 3.39 40.61C1 38.22 1 34.37 1 26.67V1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 4V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5.67 40.67C8.17 36.12 11.55 24.38 18.05 24.38C22.54 24.38 23.7 30.1 28.1 30.1C35.67 30.1 34.57 17.33 43 17.33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step card data                                                            */
/* -------------------------------------------------------------------------- */

const steps = [
  {
    icon: IconDeepResearch,
    title: "Deep Research",
    week: "Week 1",
    accent: "From Problems to Insights",
    description:
      "AI-powered audits plus behavior analysis find where revenue leaks.",
  },
  {
    icon: IconStrategicInsights,
    title: "Strategic Insights",
    week: "Week 2",
    accent: "From Insights to Solutions",
    description:
      "Turn findings into A/B hypotheses ranked by effort vs. impact ROI.",
  },
  {
    icon: IconDesignPrototypes,
    title: "Design Prototypes",
    week: "Week 3",
    accent: "From Solutions to Designs",
    description:
      "Build high-fidelity prototypes of critical flows ready to test.",
  },
  {
    icon: IconTestingValidation,
    title: "Testing & Validation",
    week: "Week 4",
    accent: "From Designs to Results",
    description:
      "AI-powered testing validates lift before you build anything out.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Formatting helpers                                                        */
/* -------------------------------------------------------------------------- */

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    value
  );
}

/* -------------------------------------------------------------------------- */
/*  Slider track / thumb styling                                              */
/* -------------------------------------------------------------------------- */

const sliderClassName =
  "py-2 [&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-track]]:bg-[#e1e4ea]/10 [&_[data-slot=slider-range]]:bg-[#B9573D] [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:bg-[#B9573D] [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:shadow-lg";

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function ConsultingProcess() {
  const AUDIT_FEE = 10000;

  const [conversionRate, setConversionRate] = useState(1.5);
  const [aov, setAov] = useState(146);
  const [monthlySessions, setMonthlySessions] = useState(200000);
  const [uplift, setUplift] = useState(5);
  const [customMode, setCustomMode] = useState(false);

  const baselineAnnual = useMemo(
    () => monthlySessions * (conversionRate / 100) * aov * 12,
    [monthlySessions, conversionRate, aov]
  );

  const grossLift = useMemo(
    () => baselineAnnual * (uplift / 100),
    [baselineAnnual, uplift]
  );

  const netLift = useMemo(() => grossLift - AUDIT_FEE, [grossLift]);

  const handleConversionRate = useCallback(
    (v: number[]) => setConversionRate(v[0]),
    []
  );
  const handleAov = useCallback((v: number[]) => setAov(v[0]), []);
  const handleMonthlySessions = useCallback(
    (v: number[]) => setMonthlySessions(v[0]),
    []
  );

  return (
    <section
      className="relative w-full bg-[#242424] text-white py-[120px] px-6 overflow-hidden flex flex-col items-center"
      aria-label="Service process overview"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Badge ────────────────────────────────────────────────────────── */}
      <div className="flex justify-center mb-8 w-full relative z-10">
        <span className="text-[#99825d] font-bold tracking-wider text-sm uppercase">
          THE ROADMAP
        </span>
      </div>

      {/* ── Heading Group ────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto w-full relative z-10 mb-20">
        <h2 className="text-[32px] md:text-[40px] leading-[1.05] font-bold tracking-tight text-white">
          How We Turn Friction Into Revenue
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-[#eaedf4] max-w-2xl font-light">
          User research, strategy, prototyping, and validation, delivered
          through a clear 4-week process.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <Link
            href="#consultation"
            className="btn-consulting-shine h-12 px-8 inline-flex items-center justify-center text-base font-semibold bg-[#B9573D] text-white rounded-[14px] shadow-lg hover:bg-[#a04a32] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wide"
          >
            Book UX Consultation
          </Link>
          <Link
            href="#"
            className="h-12 px-8 inline-flex items-center justify-center text-base font-semibold bg-transparent text-white border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all duration-300 uppercase tracking-wide"
          >
            View Sample
          </Link>
        </div>
      </div>

      {/* ── Step Cards ───────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-8 items-start justify-center w-full max-w-7xl relative z-10 mb-16">
        {steps.map((step) => (
          <div
            key={step.title}
            className="flex flex-col gap-3 items-center text-center w-full md:flex-1"
          >
            {/* Icon */}
            <step.icon className="h-12 w-12 text-white" />

            {/* Title + Week */}
            <div className="flex flex-col items-center text-white w-full">
              <p className="text-[24px] font-bold leading-[40px] tracking-[-0.16px]">
                {step.title}
              </p>
              <p className="text-[16px] font-semibold leading-[24px] tracking-[-0.27px]">
                {step.week}
              </p>
            </div>

            {/* Description with accent */}
            <p className="text-base leading-relaxed text-[#eaedf4]">
              <strong className="text-[#99825d] font-normal">
                {step.accent}
              </strong>
              <br />
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* ── Separator ────────────────────────────────────────────────────── */}
      <div className="w-full max-w-[52.5rem] h-px relative z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Calculator Section ────────────────────────────────────────────── */}
      <div
        id="calculator"
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-16 mt-20 scroll-mt-[120px]"
      >
        <div className="flex flex-col items-center text-center gap-6">
          <h3 className="text-[28px] md:text-[32px] leading-[1.2] font-extrabold tracking-tight text-white">
            Quantify the Results of
            <br />
            UX Consulting
          </h3>
          <p className="text-[16px] leading-[24px] text-white/80 max-w-[580px] font-light">
            Enhance your UX by identifying and resolving the top usability
            issues, uncovering problems to elevate your user experience.
          </p>
        </div>

        {/* Calculator card */}
        <div className="w-full bg-[#222222]/95 backdrop-blur-md rounded-[32px] p-8 md:p-[60px] text-white border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-24 items-start">
            {/* LEFT: Inputs */}
            <div className="flex flex-col gap-10">
              {/* Conversion Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-white">
                  <label className="text-[18px] font-normal tracking-[-0.27px]">
                    Conversion Rate
                  </label>
                  <span className="text-[18px] font-semibold tracking-[-0.27px]">
                    {conversionRate.toFixed(1)}%
                  </span>
                </div>
                <Slider
                  value={[conversionRate]}
                  onValueChange={handleConversionRate}
                  min={0.4}
                  max={4.5}
                  step={0.1}
                  className={sliderClassName}
                />
              </div>

              {/* Average Order Value */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-white">
                  <label className="text-[18px] font-normal tracking-[-0.27px]">
                    Average Order Value
                  </label>
                  <span className="text-[18px] font-semibold tracking-[-0.27px]">
                    ${aov}
                  </span>
                </div>
                <Slider
                  value={[aov]}
                  onValueChange={handleAov}
                  min={100}
                  max={2500}
                  step={10}
                  className={sliderClassName}
                />
              </div>

              {/* Monthly Sessions */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-white">
                  <label className="text-[18px] font-normal tracking-[-0.27px]">
                    Monthly Sessions
                  </label>
                  <span className="text-[18px] font-semibold tracking-[-0.27px]">
                    {formatNumber(monthlySessions)}
                  </span>
                </div>
                <Slider
                  value={[monthlySessions]}
                  onValueChange={handleMonthlySessions}
                  min={80000}
                  max={1000000}
                  step={1000}
                  className={sliderClassName}
                />
              </div>

              {/* Annual Revenue */}
              <div className="mt-6">
                <div className="flex justify-between items-start">
                  <span className="text-[18px] font-semibold tracking-[-0.27px]">
                    Annual Revenue
                  </span>
                  <span className="text-[20px] font-bold tracking-[-0.3px]">
                    {formatCurrency(baselineAnnual)}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Projections */}
            <div className="flex flex-col gap-14">
              {/* Impact Header + Button Group */}
              <div className="flex flex-col gap-4">
                <h4 className="text-[18px] font-semibold tracking-[-0.27px]">
                  Overall Revenue Impact
                </h4>

                <div className="flex flex-col gap-3">
                  <TooltipProvider delayDuration={200}>
                  <div className="flex rounded-[6px] w-full max-w-[300px] border border-[#414141] bg-[#272727] h-[47px]">
                    {[5, 10].map((pct, idx) => (
                      <Tooltip key={pct}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => {
                              setUplift(pct);
                              setCustomMode(false);
                            }}
                            className={`flex-1 flex items-center justify-center text-[14px] font-bold text-white transition-all border-r border-[#414141] ${
                              idx === 0 ? "rounded-l-[6px]" : ""
                            } ${
                              !customMode && uplift === pct
                                ? "bg-[#b55331]"
                                : "bg-[#272727] hover:bg-[#333333]"
                            }`}
                          >
                            +{pct}%
                          </button>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={8} className="bg-[#F0EEE4] text-[#1a2130] border-[#F0EEE4] [&_svg]:!fill-[#F0EEE4]">
                          <p>Your conversion rate would increase from {conversionRate}% to {(conversionRate * (1 + pct / 100)).toFixed(3)}%</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                    {customMode ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => setCustomMode(true)}
                            className="flex-1 flex items-center justify-center text-[14px] font-bold text-white transition-all rounded-r-[6px] bg-[#b55331]"
                          >
                            +{uplift}%
                          </button>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={8} className="bg-[#F0EEE4] text-[#1a2130] border-[#F0EEE4] [&_svg]:!fill-[#F0EEE4]">
                          <p>Your conversion rate would increase from {conversionRate}% to {(conversionRate * (1 + uplift / 100)).toFixed(3)}%</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCustomMode(true)}
                        className="flex-1 flex items-center justify-center text-[14px] font-bold text-white transition-all rounded-r-[6px] bg-[#272727] hover:bg-[#333333]"
                      >
                        Custom
                      </button>
                    )}
                  </div>
                  </TooltipProvider>

                  {/* Custom percentage slider */}
                  {customMode && (
                    <div className="w-full max-w-[300px]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[14px] text-white/60">Custom uplift</span>
                        <span className="text-[14px] font-bold text-white">{uplift}%</span>
                      </div>
                      <Slider
                        value={[uplift]}
                        onValueChange={(v) => setUplift(v[0])}
                        min={1}
                        max={30}
                        step={1}
                        className={sliderClassName}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div className="flex flex-col gap-6 w-full max-w-[322px]">
                <div className="flex justify-between items-baseline">
                  <span className="text-[16px] font-light text-white tracking-[-0.176px]">
                    Estimated Increase
                  </span>
                  <span className="text-[16px] font-medium text-[#76db47] tracking-[-0.176px]">
                    +{formatCurrency(grossLift)}
                  </span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-[16px] font-light text-white tracking-[-0.176px]">
                    UX Investment (One Experiment)
                  </span>
                  <span className="text-[16px] font-medium text-[#f45b52] tracking-[-0.176px]">
                    -{formatCurrency(AUDIT_FEE)}
                  </span>
                </div>

                <div className="h-px bg-[#414141] w-full" />

                <div className="flex justify-between items-baseline">
                  <span className="text-[16px] font-light text-white tracking-[-0.176px]">
                    Additional Net Revenue
                  </span>
                  <span className="text-[16px] font-medium text-[#76db47] tracking-[-0.176px]">
                    +{formatCurrency(netLift)}
                  </span>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-[14px] font-normal text-[#7f7f7f] tracking-[-0.154px] leading-[22px] max-w-[300px]">
                This calculator is a tool to depict, not a guarantee of results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
