"use client";

import { useState, useCallback, useMemo } from "react";
import { BarChart3, Target, Clock, TrendingUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";

/* -------------------------------------------------------------------------- */
/*  Step card data                                                            */
/* -------------------------------------------------------------------------- */

const steps = [
  {
    icon: BarChart3,
    title: "Deep Research",
    week: "Week 1",
    accent: "From Problems to Insights",
    description:
      "AI-powered audits plus behavior analysis find where revenue leaks.",
  },
  {
    icon: Target,
    title: "Strategic Insights",
    week: "Week 2",
    accent: "From Insights to Solutions",
    description:
      "Turn findings into A/B hypotheses ranked by effort vs. impact ROI.",
  },
  {
    icon: Clock,
    title: "Design Prototypes",
    week: "Week 3",
    accent: "From Solutions to Designs",
    description:
      "Build high-fidelity prototypes of critical flows ready to test.",
  },
  {
    icon: TrendingUp,
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
  return "$" + Math.round(value).toLocaleString("en-US");
}

function formatNumber(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}

/* -------------------------------------------------------------------------- */
/*  Uplift toggle options                                                     */
/* -------------------------------------------------------------------------- */

type UpliftOption = "+5%" | "+10%" | "Custom";

const upliftOptions: UpliftOption[] = ["+5%", "+10%", "Custom"];

/* -------------------------------------------------------------------------- */
/*  Slider track / thumb styling                                              */
/* -------------------------------------------------------------------------- */

const sliderClassName =
  "[&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-track]]:bg-[#e1e4ea]/10 [&_[data-slot=slider-range]]:bg-[#B9573D] [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:bg-[#B9573D] [&_[data-slot=slider-thumb]]:size-5";

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function ConsultingProcess() {
  /* ── Calculator state ─────────────────────────────────────────────────── */
  const [conversionRate, setConversionRate] = useState(1.5);
  const [aov, setAov] = useState(146);
  const [monthlySessions, setMonthlySessions] = useState(200000);
  const [selectedUplift, setSelectedUplift] = useState<UpliftOption>("+5%");
  const [customUplift, setCustomUplift] = useState(7);

  /* ── Derived calculations ─────────────────────────────────────────────── */
  const annualRevenue = useMemo(
    () => monthlySessions * (conversionRate / 100) * aov * 12,
    [monthlySessions, conversionRate, aov]
  );

  const upliftPercent = useMemo(() => {
    if (selectedUplift === "+5%") return 5;
    if (selectedUplift === "+10%") return 10;
    return customUplift;
  }, [selectedUplift, customUplift]);

  const estimatedIncrease = useMemo(
    () => annualRevenue * (upliftPercent / 100),
    [annualRevenue, upliftPercent]
  );

  const uxInvestment = 10000;

  const additionalNetRevenue = useMemo(
    () => estimatedIncrease - uxInvestment,
    [estimatedIncrease, uxInvestment]
  );

  /* ── Handlers ─────────────────────────────────────────────────────────── */
  const handleConversionRate = useCallback(
    (v: number[]) => setConversionRate(v[0]),
    []
  );
  const handleAov = useCallback((v: number[]) => setAov(v[0]), []);
  const handleMonthlySessions = useCallback(
    (v: number[]) => setMonthlySessions(v[0]),
    []
  );
  const handleCustomUplift = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 0 && val <= 100) setCustomUplift(val);
    },
    []
  );

  return (
    <section className="relative bg-[#242424] py-[120px] text-white overflow-hidden">
      {/* ── Subtle white glow blob at top ───────────────────────────────── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1200px] px-6 relative z-10">
        {/* ================================================================ */}
        {/*  PROCESS HEADER                                                  */}
        {/* ================================================================ */}
        <div className="mb-16 text-center">
          {/* Badge */}
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#C9A227]">
            The Roadmap
          </p>

          {/* Heading */}
          <h2 className="text-[32px] font-extrabold leading-tight text-white md:text-[44px]">
            How We Turn Friction Into Revenue
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-[720px] text-[18px] leading-relaxed text-[#eaedf4]">
            User research, strategy, prototyping, and validation, delivered
            through a clear 4-week process.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#consultation"
              className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-[14px] font-semibold uppercase tracking-wide text-white shadow-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: "hsl(var(--proux-copper))" }}
            >
              Book UX Consultation
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-transparent px-7 py-3.5 text-[14px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/5"
            >
              View Sample
            </a>
          </div>
        </div>

        {/* ================================================================ */}
        {/*  STEP CARDS                                                      */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-white/5">
                <step.icon
                  className="h-6 w-6 text-white"
                  strokeWidth={1.8}
                />
              </div>

              {/* Title */}
              <h3 className="text-[22px] font-bold leading-tight text-white">
                {step.title}
              </h3>

              {/* Week */}
              <p className="mt-1.5 text-[14px] font-semibold text-white/60">
                {step.week}
              </p>

              {/* Accent tagline */}
              <p className="mt-3 text-[14px] font-semibold text-[#C9A227]">
                {step.accent}
              </p>

              {/* Description */}
              <p className="mt-2 text-[14px] leading-relaxed text-[#eaedf4]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* ================================================================ */}
        {/*  DIVIDER                                                         */}
        {/* ================================================================ */}
        <div className="my-20 bg-gradient-to-r from-transparent via-white/10 to-transparent h-px" />

        {/* ================================================================ */}
        {/*  CALCULATOR                                                      */}
        {/* ================================================================ */}
        <div id="calculator" className="scroll-mt-[120px]">
          {/* Calculator header */}
          <div className="mb-12 text-center">
            <h2 className="text-[32px] font-extrabold leading-tight text-white md:text-[40px]">
              Quantify the Results of UX Consulting
            </h2>
            <p className="mx-auto mt-4 max-w-[720px] text-[18px] leading-relaxed text-[#eaedf4]">
              Enhance your UX by identifying and resolving the top usability
              issues, uncovering problems to elevate your user experience.
            </p>
          </div>

          {/* Calculator card */}
          <div className="bg-[#222222]/95 backdrop-blur-md rounded-[32px] border border-white/10 p-8 md:p-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              {/* ─── LEFT COLUMN: Inputs ──────────────────────────────── */}
              <div className="space-y-8">
                {/* Conversion Rate */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[15px] font-medium text-white/80">
                      Conversion Rate
                    </label>
                    <span className="text-[18px] font-bold text-white">
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
                  <div className="mt-1.5 flex justify-between text-[12px] text-white/30">
                    <span>0.4%</span>
                    <span>4.5%</span>
                  </div>
                </div>

                {/* Average Order Value */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[15px] font-medium text-white/80">
                      Average Order Value
                    </label>
                    <span className="text-[18px] font-bold text-white">
                      {formatCurrency(aov)}
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
                  <div className="mt-1.5 flex justify-between text-[12px] text-white/30">
                    <span>$100</span>
                    <span>$2,500</span>
                  </div>
                </div>

                {/* Monthly Sessions */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[15px] font-medium text-white/80">
                      Monthly Sessions
                    </label>
                    <span className="text-[18px] font-bold text-white">
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
                  <div className="mt-1.5 flex justify-between text-[12px] text-white/30">
                    <span>80,000</span>
                    <span>1,000,000</span>
                  </div>
                </div>

                {/* Annual Revenue display */}
                <div className="rounded-2xl bg-white/5 border border-white/5 p-5">
                  <p className="text-[13px] font-medium uppercase tracking-wide text-white/50">
                    Annual Revenue
                  </p>
                  <p className="mt-1 text-[32px] font-extrabold text-white">
                    {formatCurrency(annualRevenue)}
                  </p>
                </div>
              </div>

              {/* ─── RIGHT COLUMN: Projections ────────────────────────── */}
              <div>
                <h3 className="mb-6 text-[22px] font-bold text-white">
                  Overall Revenue Impact
                </h3>

                {/* Uplift toggle buttons */}
                <div className="mb-8 inline-flex rounded-xl border border-[#414141] overflow-hidden">
                  {upliftOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedUplift(option)}
                      className={`px-5 py-2.5 text-[14px] font-semibold transition-colors ${
                        selectedUplift === option
                          ? "bg-[#b55331] text-white"
                          : "bg-[#272727] text-white/60 hover:text-white/80"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {/* Custom uplift input */}
                {selectedUplift === "Custom" && (
                  <div className="mb-6 flex items-center gap-3">
                    <label className="text-[14px] text-white/60">
                      Custom uplift:
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={customUplift}
                        onChange={handleCustomUplift}
                        min={0}
                        max={100}
                        className="w-20 rounded-lg border border-[#414141] bg-[#272727] px-3 py-2 text-[14px] font-semibold text-white outline-none focus:border-[#b55331]"
                      />
                      <span className="text-[14px] text-white/60">%</span>
                    </div>
                  </div>
                )}

                {/* Metrics */}
                <div className="space-y-5">
                  {/* Estimated Increase */}
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] text-white/70">
                      Estimated Increase
                    </span>
                    <span className="text-[20px] font-bold text-[#76db47]">
                      {formatCurrency(estimatedIncrease)}
                    </span>
                  </div>

                  {/* UX Investment */}
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] text-white/70">
                      UX Investment{" "}
                      <span className="text-[12px] text-white/40">
                        (One Experiment)
                      </span>
                    </span>
                    <span className="text-[20px] font-bold text-[#f45b52]">
                      -{formatCurrency(uxInvestment)}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/10" />

                  {/* Additional Net Revenue */}
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-semibold text-white">
                      Additional Net Revenue
                    </span>
                    <span className="text-[24px] font-extrabold text-[#76db47]">
                      {formatCurrency(additionalNetRevenue)}
                    </span>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="mt-8 text-[12px] leading-relaxed text-white/30">
                  These projections are estimates based on the inputs provided
                  and typical conversion rate improvements observed across
                  e-commerce and SaaS businesses. Actual results may vary based
                  on industry, traffic quality, and implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
