"use client";

import { useState } from "react";
import { Shield, Rocket, Award, Building2, Layers } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface PricingFeature {
  text: string;
}

interface PricingCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  price: number | null;
  priceLabel?: string;
  deliveryDays: number | null;
  deliveryLabel?: string;
  buttonText: string;
  buttonVariant: "outline" | "filled";
  features: PricingFeature[];
  hasAddOn: boolean;
  addOnLabel?: string;
  addOnPrice?: number;
  addOnDays?: number;
  isDark: boolean;
  isMostPopular: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Card data                                                                 */
/* -------------------------------------------------------------------------- */

const pricingCards: PricingCard[] = [
  {
    id: "starter-audit",
    icon: <Rocket className="h-6 w-6" />,
    title: "Starter Audit",
    description:
      "AI-powered UX audit with prioritized recommendations.",
    price: 4500,
    deliveryDays: 10,
    buttonText: "Start Audit",
    buttonVariant: "outline",
    features: [
      { text: "AI-powered UX audit" },
      { text: "Heuristic evaluation (50+ criteria)" },
      { text: "Competitor benchmarking (3 competitors)" },
      { text: "Prioritized recommendations report" },
      { text: "30-min strategy walkthrough" },
    ],
    hasAddOn: true,
    addOnLabel: "Add High-Fidelity Designs",
    addOnPrice: 3000,
    addOnDays: 5,
    isDark: false,
    isMostPopular: false,
  },
  {
    id: "growth-sprint",
    icon: <Award className="h-6 w-6" />,
    title: "Growth Sprint",
    description:
      "Full 4-week sprint: research, strategy, prototypes & validation.",
    price: 10000,
    deliveryDays: 20,
    buttonText: "Book Sprint",
    buttonVariant: "filled",
    features: [
      { text: "Everything in Starter Audit" },
      { text: "User journey mapping & persona creation" },
      { text: "High-fidelity Figma prototypes" },
      { text: "AI-powered usability testing" },
      { text: "A/B test hypotheses with ROI projections" },
      { text: "Developer handoff package" },
    ],
    hasAddOn: true,
    addOnLabel: "Add High-Fidelity Designs",
    addOnPrice: 5000,
    addOnDays: 5,
    isDark: true,
    isMostPopular: true,
  },
  {
    id: "enterprise-retainer",
    icon: <Building2 className="h-6 w-6" />,
    title: "Enterprise Retainer",
    description:
      "Quarterly partnership with ongoing optimization and support.",
    price: null,
    priceLabel: "Custom",
    deliveryDays: null,
    deliveryLabel: "",
    buttonText: "Book Discovery Call",
    buttonVariant: "outline",
    features: [
      { text: "Everything in Growth Sprint" },
      { text: "Quarterly UX sprints" },
      { text: "Dedicated UX strategist" },
      { text: "Ongoing analytics & monitoring" },
      { text: "Priority support & SLA" },
    ],
    hasAddOn: false,
    isDark: false,
    isMostPopular: false,
  },
];

/* -------------------------------------------------------------------------- */
/*  Green circle check icon                                                   */
/* -------------------------------------------------------------------------- */

function GreenCheck({ light = false }: { light?: boolean }) {
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
      <circle cx="10" cy="10" r="10" fill={light ? "#5BBB2A" : "#47AB19"} />
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
/*  Format price helper                                                       */
/* -------------------------------------------------------------------------- */

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/* -------------------------------------------------------------------------- */
/*  Add-on Toggle                                                             */
/* -------------------------------------------------------------------------- */

function AddOnToggle({
  enabled,
  onToggle,
  label,
  isDark,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
  isDark: boolean;
}) {
  return (
    <div
      className={cn(
        "mt-6 flex items-center justify-between rounded-xl border px-4 py-3",
        isDark
          ? "border-white/10 bg-white/5"
          : "border-[hsl(var(--border-primary-200))] bg-[hsl(var(--bg-primary-100))]/50"
      )}
    >
      <div className="flex items-center gap-2">
        <Layers
          className={cn(
            "h-4 w-4",
            isDark
              ? "text-[hsl(var(--gold-300))]"
              : "text-[hsl(var(--text-primary-600))]"
          )}
        />
        <span
          className={cn(
            "text-[13px] font-medium",
            isDark ? "text-white/80" : "text-[hsl(var(--text-neutrals-800))]"
          )}
        >
          {enabled ? "Added" : label}
        </span>
      </div>

      {/* Toggle switch */}
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={cn(
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          enabled
            ? "bg-primary"
            : isDark
              ? "bg-white/20"
              : "bg-[hsl(var(--neutral-300))]",
          isDark
            ? "focus-visible:ring-white/50 focus-visible:ring-offset-foreground"
            : "focus-visible:ring-primary focus-visible:ring-offset-[hsl(var(--bg-primary-50))]"
        )}
      >
        <span className="sr-only">Toggle add-on</span>
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            enabled ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Money-back guarantee badge                                                */
/* -------------------------------------------------------------------------- */

function GuaranteeBadge({ isDark }: { isDark: boolean }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "mt-6 flex cursor-help items-center justify-center gap-2 rounded-lg border px-3 py-2.5",
              isDark
                ? "border-white/10 bg-white/5"
                : "border-[hsl(var(--border-primary-200))] bg-[hsl(var(--bg-primary-100))]/50"
            )}
          >
            <Shield
              className={cn(
                "h-4 w-4 flex-shrink-0",
                isDark
                  ? "text-[hsl(var(--gold-300))]"
                  : "text-primary"
              )}
            />
            <span
              className={cn(
                "text-[12px] font-semibold uppercase tracking-wider",
                isDark
                  ? "text-white/70"
                  : "text-[hsl(var(--text-neutrals-800))]"
              )}
            >
              Money-Back Guarantee
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="max-w-xs rounded-lg bg-foreground px-4 py-3 text-[13px] leading-relaxed text-[hsl(var(--text-neutrals-50))]"
        >
          If our prototypes don&apos;t test better than your current experience,
          we extend the sprint at no cost until they do.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/* -------------------------------------------------------------------------- */
/*  Single Pricing Card                                                       */
/* -------------------------------------------------------------------------- */

function PricingCardComponent({ card }: { card: PricingCard }) {
  const [addOnEnabled, setAddOnEnabled] = useState(false);

  const totalPrice =
    card.price !== null
      ? addOnEnabled && card.addOnPrice
        ? card.price + card.addOnPrice
        : card.price
      : null;

  const totalDays =
    card.deliveryDays !== null
      ? addOnEnabled && card.addOnDays
        ? card.deliveryDays + card.addOnDays
        : card.deliveryDays
      : null;

  return (
    <div
      className={cn(
        "relative flex flex-1 flex-col rounded-2xl border p-6 lg:p-8 transition-shadow duration-300",
        card.isDark
          ? "border-white/10 bg-foreground text-white shadow-2xl"
          : "border-[hsl(var(--border-primary-200))] bg-[hsl(var(--bg-primary-50))] text-foreground shadow-md hover:shadow-lg"
      )}
    >
      {/* Most Popular badge */}
      {card.isMostPopular && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[hsl(var(--gold-500))] to-[hsl(var(--gold-600))] px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      {/* Icon */}
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
          card.isDark
            ? "bg-white/10 text-[hsl(var(--gold-300))]"
            : "bg-[hsl(var(--bg-primary-100))] text-[hsl(var(--text-primary-600))]"
        )}
      >
        {card.icon}
      </div>

      {/* Title */}
      <h3
        className={cn(
          "text-[22px] font-bold tracking-tight",
          card.isDark ? "text-white" : "text-foreground"
        )}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        className={cn(
          "mt-2 text-[14px] leading-relaxed",
          card.isDark ? "text-white/60" : "text-[hsl(var(--text-neutrals-800))]"
        )}
      >
        {card.description}
      </p>

      {/* Price */}
      <div className="mt-6 mb-6">
        {totalPrice !== null ? (
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                "text-[36px] font-extrabold tracking-tight",
                card.isDark ? "text-white" : "text-foreground"
              )}
            >
              {formatPrice(totalPrice)}
            </span>
          </div>
        ) : (
          <span
            className={cn(
              "text-[36px] font-extrabold tracking-tight",
              card.isDark ? "text-white" : "text-foreground"
            )}
          >
            {card.priceLabel}
          </span>
        )}

        {totalDays !== null && (
          <p
            className={cn(
              "mt-1 text-[13px] font-medium",
              card.isDark ? "text-white/50" : "text-[hsl(var(--text-neutrals-400))]"
            )}
          >
            Delivered in {totalDays} days
            {addOnEnabled && card.addOnDays && (
              <span className="ml-1 text-primary">
                (+{card.addOnDays} days)
              </span>
            )}
          </p>
        )}
      </div>

      {/* CTA Button */}
      <a
        href="#consultation"
        className={cn(
          "mb-8 inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-[14px] font-semibold uppercase tracking-wide transition-all duration-200",
          card.buttonVariant === "filled"
            ? "bg-primary text-primary-foreground shadow-lg hover:brightness-110 hover:shadow-xl"
            : card.isDark
              ? "border-2 border-white/30 text-white hover:border-white hover:bg-white/10"
              : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        )}
      >
        {card.buttonText}
      </a>

      {/* Divider */}
      <div
        className={cn(
          "mb-6 h-px w-full",
          card.isDark ? "bg-white/10" : "bg-[hsl(var(--border-primary-200))]"
        )}
      />

      {/* Features list */}
      <ul className="flex flex-1 flex-col gap-0">
        {card.features.map((feature, idx) => (
          <li
            key={idx}
            className={cn(
              "flex items-start gap-3 py-3",
              idx < card.features.length - 1 &&
                (card.isDark
                  ? "border-b border-dashed border-white/10"
                  : "border-b border-dashed border-[hsl(var(--border-primary-200))]")
            )}
          >
            <GreenCheck light={card.isDark} />
            <span
              className={cn(
                "text-[14px] leading-snug",
                card.isDark ? "text-white/80" : "text-[hsl(var(--text-neutrals-800))]"
              )}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Add-on toggle */}
      {card.hasAddOn && card.addOnLabel && (
        <AddOnToggle
          enabled={addOnEnabled}
          onToggle={() => setAddOnEnabled((prev) => !prev)}
          label={card.addOnLabel}
          isDark={card.isDark}
        />
      )}

      {/* Money-back guarantee */}
      <GuaranteeBadge isDark={card.isDark} />
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
      className="scroll-mt-[56px] bg-[hsl(var(--bg-primary-50))] py-[80px] lg:py-[120px]"
    >
      <div className="container-default">
        {/* ── Section Header ──────────────────────────────────────────── */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          {/* Badge */}
          <span className="label-caps mb-4 inline-block text-[hsl(var(--text-primary-600))]">
            Consulting Packages
          </span>

          {/* Heading */}
          <h2
            className="mb-4 font-extrabold tracking-tight text-foreground"
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(1.75rem, 4vw, 40px)",
              lineHeight: 1.15,
              letterSpacing: "var(--font-title-h3-tracking)",
            }}
          >
            Transparent Pricing, Measurable Impact
          </h2>

          {/* Subtitle */}
          <p className="body-large mx-auto max-w-xl">
            Choose the engagement that fits your stage. Every package includes
            our performance guarantee.
          </p>
        </div>

        {/* ── Pricing Cards ───────────────────────────────────────────── */}
        <div className="mx-auto flex max-w-[1080px] flex-col items-stretch gap-8 lg:flex-row">
          {pricingCards.map((card) => (
            <PricingCardComponent key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
