"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  getActiveTier,
  getAllTiersInfo,
  type BootcampModule,
  type ActiveTier,
  type TierInfo,
} from "@/lib/data/bootcamps";

/* ── Countdown ───────────────────────────────────────────────────────── */

function getTimeLeft(deadline: Date): string | null {
  const diff = deadline.getTime() - Date.now();
  if (diff <= 0) return null;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  // Two levels only: days+hours when >= 1 day, hours+minutes otherwise
  if (d >= 1) return `${d}d ${h}h left`;
  return `${h}h ${m}m left`;
}

function CountdownTimer({ deadline }: { deadline: Date }) {
  const [text, setText] = useState(() => getTimeLeft(deadline));

  useEffect(() => {
    const tick = () => setText(getTimeLeft(deadline));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [deadline]);

  if (!text) return null;

  // Renders inline — parent controls font size and color
  return <>{text}</>;
}

/* ── Tier Info Popover ────────────────────────────────────────────────── */

function TierCheckIcon({ status }: { status: TierInfo["status"] }) {
  if (status === "active") {
    return (
      <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  if (status === "ended") {
    return (
      <svg className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  return (
    <span className="w-3.5 h-3.5 shrink-0 rounded-[3px] border-[1.5px] border-muted-foreground/30" />
  );
}

function TierInfoPopover({ tiers }: { tiers: TierInfo[] }) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open, close]);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full border border-[#B0B0B0] text-[9px] font-bold text-[#888] hover:text-foreground hover:border-foreground/40 transition-colors leading-none"
        aria-label="View pricing tiers"
      >
        ?
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-[280px] rounded-xl bg-white border border-[#e8e4d9] shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-3.5"
        >
          <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-[#e8e4d9]" />

          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#4A5568] mb-2.5">
            Price goes up the longer you wait
          </p>

          <div className="space-y-2.5">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex items-start gap-2 ${
                  tier.status === "ended" ? "opacity-60" : ""
                }`}
              >
                <div className="mt-0.5">
                  <TierCheckIcon status={tier.status} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span
                      className={`text-[12px] font-semibold ${
                        tier.status === "active"
                          ? "text-foreground"
                          : tier.status === "ended"
                            ? "line-through text-[#888]"
                            : "text-[#4A5568]"
                      }`}
                    >
                      {tier.label}
                    </span>
                    <span className="text-[12px] text-[#4A5568]">
                      ${tier.price}
                    </span>
                    {tier.discount > 0 && tier.status !== "ended" && (
                      <span className="text-[11px] font-semibold text-emerald-600">
                        ({tier.discount}% off)
                      </span>
                    )}
                    {tier.status === "ended" && (
                      <span className="text-[11px] text-[#888]">(ended)</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#6D6D6D] mt-0.5">
                    {tier.dateRange}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </span>
  );
}

/* ── Dot Indicator ────────────────────────────────────────────────────── */

function TierDot({ color }: { color: ActiveTier["dotColor"] }) {
  const colorMap = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
  };
  const pingMap = {
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    red: "bg-red-400",
  };
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${pingMap[color]} opacity-75`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${colorMap[color]}`} />
    </span>
  );
}

function formatDeadlineShort(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ── Card Pricing Display (list page — compact 2 lines) ──────────────── */

export function CardPricingDisplay({ module: mod }: { module: BootcampModule }) {
  const tier = getActiveTier(mod);
  const tiers = getAllTiersInfo(mod);

  if (tier.name === "closed") {
    return (
      <span className="text-[13px] font-semibold text-muted-foreground">
        Enrollment Closed
      </span>
    );
  }

  return (
    <div className="space-y-1.5">
      {/* Line 1: price + strikethrough */}
      <div className="flex items-baseline gap-2">
        <span className="text-[24px] font-extrabold text-foreground leading-none">
          ${tier.price}
        </span>
        <span className="text-[13px] text-muted-foreground line-through">
          ${tier.fullPrice}
        </span>
      </div>

      {/* Line 2: dot + tier label + countdown + tooltip trigger */}
      <div className="flex items-center gap-2">
        <TierDot color={tier.dotColor} />
        <span className="text-[12px] font-semibold text-foreground">
          {tier.label}
        </span>
        {tier.deadline && (
          <>
            <span className="text-[12px] text-[#4A5568]">
              <CountdownTimer deadline={tier.deadline} />
            </span>
            <TierInfoPopover tiers={tiers} />
          </>
        )}
      </div>
    </div>
  );
}

/* ── Sidebar Pricing Display (detail page — more room for deadline) ─── */

export function SidebarPricingDisplay({ module: mod }: { module: BootcampModule }) {
  const tier = getActiveTier(mod);
  const tiers = getAllTiersInfo(mod);

  if (tier.name === "closed") {
    return (
      <p className="text-sm font-semibold text-muted-foreground">Enrollment Closed</p>
    );
  }

  return (
    <div className="space-y-2">
      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-foreground">
          ${tier.price}
        </span>
        <span className="text-sm text-muted-foreground line-through">
          ${tier.fullPrice}
        </span>
      </div>

      {/* Tier + deadline + countdown */}
      <div className="flex items-center gap-2 flex-wrap">
        <TierDot color={tier.dotColor} />
        <span className="text-[13px] font-semibold text-foreground">
          {tier.label}
        </span>
        {tier.deadline && (
          <>
            <span className="text-[13px] text-[#4A5568]">
              ends {formatDeadlineShort(tier.deadline)}
            </span>
            <span className="text-[13px] text-[#4A5568]">
              <CountdownTimer deadline={tier.deadline} />
            </span>
            <TierInfoPopover tiers={tiers} />
          </>
        )}
      </div>
    </div>
  );
}

/* ── Inline Pricing (sticky bar, mobile bar, other courses) ──────────── */

export function InlinePricingDisplay({ module: mod }: { module: BootcampModule }) {
  const tier = getActiveTier(mod);

  return (
    <div className="flex items-baseline gap-2">
      <span className="text-lg font-extrabold text-foreground">
        ${tier.price}
      </span>
      <span className="text-sm text-muted-foreground line-through">
        ${tier.fullPrice}
      </span>
      {tier.discount > 0 && (
        <span className="text-[11px] font-bold text-emerald-600 uppercase">
          {tier.discount}% OFF
        </span>
      )}
    </div>
  );
}

/* ── Hook for current price (enroll buttons) ─────────────────────────── */

export function useActiveTier(mod: BootcampModule) {
  const [tier, setTier] = useState(() => getActiveTier(mod));

  useEffect(() => {
    const id = setInterval(() => setTier(getActiveTier(mod)), 60_000);
    return () => clearInterval(id);
  }, [mod]);

  return tier;
}
