"use client";

import { useState } from "react";
import { Shield, Rocket, Award, Building2, Layers, Check } from "lucide-react";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface PricingFeature {
  text: string;
  tooltip?: string;
}

interface PricingCardData {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  price: number | null;
  priceLabel?: string;
  deliveryDays: number | null;
  buttonText: string;
  buttonStyle: "outline" | "filled" | "dark-outline";
  features: PricingFeature[];
  hasAddOn: boolean;
  addOnPrice?: number;
  addOnDuration?: string;
  isDark: boolean;
  isPopular: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Card data                                                                 */
/* -------------------------------------------------------------------------- */

const pricingCards: PricingCardData[] = [
  {
    id: "starter-audit",
    icon: <Rocket className="h-8 w-8 text-[#1a2130]" strokeWidth={1.5} />,
    title: "Starter Audit",
    description:
      "AI-powered UX audit with prioritized recommendations.",
    price: 4500,
    deliveryDays: 10,
    buttonText: "Start Audit",
    buttonStyle: "outline",
    features: [
      { text: "AI-powered UX audit" },
      { text: "Heuristic evaluation (50+ criteria)" },
      { text: "Competitor benchmarking (3 competitors)" },
      { text: "Prioritized recommendations report" },
      { text: "30-min strategy walkthrough" },
    ],
    hasAddOn: true,
    addOnPrice: 3000,
    addOnDuration: "5 days",
    isDark: false,
    isPopular: false,
  },
  {
    id: "growth-sprint",
    icon: <Award className="h-8 w-8 text-white" strokeWidth={1.5} />,
    title: "Growth Sprint",
    description:
      "Full 4-week sprint: research, strategy, prototypes & validation.",
    price: 10000,
    deliveryDays: 20,
    buttonText: "Book Sprint",
    buttonStyle: "filled",
    features: [
      { text: "Everything in Starter Audit" },
      { text: "User journey mapping & persona creation" },
      { text: "High-fidelity Figma prototypes" },
      { text: "AI-powered usability testing" },
      { text: "A/B test hypotheses with ROI projections" },
      { text: "Developer handoff package" },
    ],
    hasAddOn: true,
    addOnPrice: 5000,
    addOnDuration: "5 days",
    isDark: true,
    isPopular: true,
  },
  {
    id: "enterprise-retainer",
    icon: <Building2 className="h-8 w-8 text-[#1a2130]" strokeWidth={1.5} />,
    title: "Enterprise Retainer",
    description:
      "Quarterly partnership with ongoing optimization and support.",
    price: null,
    priceLabel: "Custom",
    deliveryDays: null,
    buttonText: "Book Discovery Call",
    buttonStyle: "outline",
    features: [
      { text: "Everything in Growth Sprint" },
      { text: "Quarterly UX sprints" },
      { text: "Dedicated UX strategist" },
      { text: "Ongoing analytics & monitoring" },
      { text: "Priority support & SLA" },
    ],
    hasAddOn: false,
    isDark: false,
    isPopular: false,
  },
];

/* -------------------------------------------------------------------------- */
/*  Green circle check icon                                                   */
/* -------------------------------------------------------------------------- */

function GreenCheck() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="12" fill="#47AB19" />
      <path
        d="M7 12.5L10 15.5L17 8.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Single Pricing Card                                                       */
/* -------------------------------------------------------------------------- */

function PricingCard({ card }: { card: PricingCardData }) {
  const [addOnEnabled, setAddOnEnabled] = useState(false);

  const totalPrice =
    card.price !== null
      ? addOnEnabled && card.addOnPrice
        ? card.price + card.addOnPrice
        : card.price
      : null;

  const totalDays =
    card.deliveryDays !== null
      ? addOnEnabled
        ? card.deliveryDays + 5
        : card.deliveryDays
      : null;

  return (
    <div
      className={`relative flex flex-col gap-8 items-start pb-8 pt-16 px-8 rounded-[12px] w-full max-w-[326px] shrink-0 ${
        card.isDark ? "bg-[#1a2130]" : "bg-[#f0eee4]"
      }`}
    >
      {/* Most Popular badge */}
      {card.isPopular && (
        <div
          className="absolute flex gap-1.5 items-center justify-center left-1/2 -translate-x-1/2 px-3 py-[5px] rounded-lg top-[-17px] shadow-sm whitespace-nowrap z-20"
          style={{
            backgroundImage:
              "linear-gradient(102.56deg, rgb(221, 160, 62) 19.306%, rgb(212, 147, 26) 118.95%)",
          }}
        >
          <Layers className="size-5 text-[#f8f7f4]" strokeWidth={2} />
          <p className="font-semibold leading-5 text-[#f8f7f4] text-[14px] text-center tracking-[-0.154px]">
            MOST POPULAR
          </p>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col gap-4 items-start relative w-full">
        {/* Bottom border */}
        <div
          aria-hidden="true"
          className={`absolute border-b inset-0 pointer-events-none ${
            card.isDark ? "border-[#2f415f]" : "border-[#dfdbc9]"
          }`}
        />

        {/* Icon + Title + Description */}
        <div className="flex flex-col gap-2 items-center w-full">
          {/* Icon with background */}
          <div className="inline-grid place-items-start leading-[0]">
            <div
              className={`[grid-area:1/1] rounded-[16px] size-[56px] ${
                card.isDark
                  ? "bg-[#dfdbc9] opacity-10"
                  : "bg-[#dfdbc9] opacity-40"
              }`}
            />
            <div className="[grid-area:1/1] ml-3 mt-3 overflow-clip size-8">
              {card.icon}
            </div>
          </div>

          {/* Title */}
          <p
            className={`font-bold leading-8 text-[24px] text-center tracking-tight w-full ${
              card.isDark ? "text-[#f8f7f4]" : "text-[#1a2130]"
            }`}
          >
            {card.title}
          </p>

          {/* Description */}
          <p
            className={`font-semibold leading-5 text-[14px] text-center tracking-[-0.154px] min-h-[40px] ${
              card.isDark ? "text-white" : "text-[#1a2130]"
            }`}
          >
            {card.description}
          </p>
        </div>

        {/* Price */}
        <div
          className={`flex flex-col gap-2 items-start text-center w-full mt-4 ${
            card.isDark ? "text-white" : "text-[#1a2130]"
          }`}
        >
          <p className="font-bold leading-[40px] text-[32px] tracking-tight w-full">
            {card.priceLabel || `$${totalPrice?.toLocaleString()}`}
          </p>
          {totalDays !== null && (
            <p className="font-normal leading-5 text-[14px] tracking-[-0.084px] w-full">
              Delivered in {totalDays} days
            </p>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href="#consultation"
          className={`h-12 rounded-[14px] w-full group transition-all duration-300 shadow-sm hover:shadow-md mt-4 flex items-center justify-center relative ${
            card.buttonStyle === "filled"
              ? "bg-[#b55331] hover:bg-[#a04a32] btn-consulting-shine"
              : ""
          } ${card.buttonStyle === "outline" ? "hover:bg-[#b55331]" : ""} ${
            card.buttonStyle === "dark-outline" ? "hover:bg-white" : ""
          }`}
        >
          <span
            className={`font-bold leading-5 text-[14px] tracking-wider uppercase transition-colors ${
              card.buttonStyle === "filled" ? "text-white" : ""
            } ${
              card.buttonStyle === "outline"
                ? "text-[#b55331] group-hover:text-white"
                : ""
            } ${
              card.buttonStyle === "dark-outline"
                ? "text-white group-hover:text-[#1a2130]"
                : ""
            }`}
          >
            {card.buttonText}
          </span>
          {card.buttonStyle !== "filled" && (
            <div
              aria-hidden="true"
              className={`absolute border-2 inset-0 pointer-events-none rounded-[14px] ${
                card.buttonStyle === "dark-outline"
                  ? "border-white"
                  : "border-[#b55331]"
              }`}
            />
          )}
        </Link>

        {/* Money-back guarantee */}
        <div className="flex gap-2 items-center justify-center w-full mt-2">
          <Shield
            className={`size-5 ${
              card.isDark ? "text-[#C3BA99]" : "text-[#2E9892]"
            }`}
            strokeWidth={1.5}
          />
          <span
            className={`text-[13px] font-medium ${
              card.isDark ? "text-white" : "text-[#1a2130]"
            }`}
          >
            100% Money-Back Guarantee
          </span>
        </div>
      </div>

      {/* Features list */}
      <div className="flex flex-col gap-4 w-full">
        {card.features.map((feature, i) => (
          <div key={i} className="flex gap-3 items-start w-full">
            <GreenCheck />
            <div className="relative w-full">
              <p
                className={`font-normal leading-5 text-[14px] tracking-[-0.084px] ${
                  card.isDark ? "text-white" : "text-[#1a2130]"
                }`}
              >
                {feature.text}
              </p>
              <div
                className={`absolute -bottom-1 left-0 w-full h-px border-b border-dashed ${
                  card.isDark
                    ? "border-[#99825d]/50"
                    : "border-[#99825d]"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add-on toggle */}
      {card.hasAddOn && card.addOnPrice && (
        <div
          className={`w-full rounded-[14px] border p-4 flex flex-col gap-3 mt-auto ${
            card.isDark
              ? "border-white/20 bg-white/5"
              : "border-[#b55331]/20 bg-[#b55331]/5"
          }`}
        >
          <div className="flex flex-col gap-1">
            <h4
              className={`font-bold text-sm ${
                card.isDark ? "text-white" : "text-[#1a2130]"
              }`}
            >
              ADD HIGH-FIDELITY DESIGNS
            </h4>
            <p
              className={`text-xs ${
                card.isDark ? "text-zinc-300" : "text-zinc-600"
              }`}
            >
              Transform wireframes into pixel-perfect Figma designs.
            </p>
            <p
              className={`text-xs font-semibold ${
                card.isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              + {card.addOnDuration} | + ${card.addOnPrice.toLocaleString()}
            </p>
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={addOnEnabled}
                onChange={(e) => setAddOnEnabled(e.target.checked)}
              />
              <div
                className={`w-11 h-6 bg-zinc-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                  card.isDark
                    ? "peer-checked:bg-white peer-checked:after:bg-[#1a2130]"
                    : "peer-checked:bg-[#b55331]"
                }`}
              />
            </div>
            <span
              className={`text-xs font-bold uppercase tracking-wide ${
                card.isDark ? "text-white" : "text-[#b55331]"
              }`}
            >
              {addOnEnabled ? "Added" : "Add Designs"}
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Consulting Pricing Section                                                */
/* -------------------------------------------------------------------------- */

export default function ConsultingPricing() {
  return (
    <section
      id="pricing-section"
      className="scroll-mt-[56px] bg-[#F8F7F4] py-[80px] lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-[#99825d] font-bold tracking-wider text-sm uppercase mb-4 inline-block">
            Consulting Packages
          </span>

          <h2 className="mb-4 font-extrabold tracking-tight text-[#1a2130] text-[32px] md:text-[40px] leading-[1.15]">
            Transparent Pricing, Measurable Impact
          </h2>

          <p className="text-[16px] leading-relaxed text-[#718096] max-w-xl mx-auto">
            Choose the engagement that fits your stage. Every package includes
            our performance guarantee.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
          {pricingCards.map((card) => (
            <PricingCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
