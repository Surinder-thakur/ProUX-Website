"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  QUICK_FACTS,
  BUNDLE_PRICE_USD,
  BUNDLE_ORIGINAL_USD,
  BUNDLE_SAVINGS_USD,
  getAllTiersInfo,
  type BootcampModule,
  type TierInfo,
} from "@/lib/data/bootcamps";
import { useActiveTier } from "@/components/pages/bootcamps/bootcamp-pricing";
import BundlePopup from "./bundle-popup";

/* ── Countdown (duplicated from detail-sidebar — sidebar is frozen) ──── */

function useCountdown(deadline: Date | null) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!deadline) return;
    const tick = () => {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 0) { setText(""); return; }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setText(d >= 1 ? `${d}d ${h}h left` : `${h}h ${m}m left`);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [deadline]);

  return text;
}

function formatDeadlineShort(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ── Green Filled Checkmark ──────────────────────────────────────────── */

function GreenCheck() {
  return (
    <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-emerald-600 shrink-0">
      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

/* ── Pricing Tier Tooltip ────────────────────────────────────────────── */

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
      <svg className="w-3.5 h-3.5 text-[#aaa] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  return <span className="w-3.5 h-3.5 shrink-0 rounded-[3px] border-[1.5px] border-[#ccc]" />;
}

function PricingTierTooltip({ tiers }: { tiers: TierInfo[] }) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current && !popoverRef.current.contains(target) &&
        triggerRef.current && !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

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
          className="absolute z-50 top-full right-0 mt-2 w-[260px] rounded-xl bg-white border border-[#e8e4d9] shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-4"
        >
          <div className="absolute -top-[6px] right-4 w-3 h-3 rotate-45 bg-white border-l border-t border-[#e8e4d9]" />

          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#555] mb-3">
            Price goes up the longer you wait
          </p>

          <div className="space-y-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`flex items-start gap-2.5 ${t.status === "ended" ? "opacity-50" : ""}`}
              >
                <div className="mt-0.5">
                  <TierCheckIcon status={t.status} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className={`text-[12px] font-semibold ${
                      t.status === "active" ? "text-foreground" :
                      t.status === "ended" ? "line-through text-[#888]" : "text-[#555]"
                    }`}>
                      {t.label}
                    </span>
                    <span className="text-[12px] text-[#555]">${t.price}</span>
                    {t.discount > 0 && t.status !== "ended" && (
                      <span className="text-[11px] font-semibold text-emerald-600">
                        ({t.discount}% off)
                      </span>
                    )}
                    {t.status === "ended" && (
                      <span className="text-[11px] text-[#888]">(ended)</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#888] mt-0.5">{t.dateRange}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </span>
  );
}

/* ── Compact CTA Sidebar ──────────────────────────────────────────────── */

export default function DetailCompactCta({
  module: mod,
}: {
  module: BootcampModule;
}) {
  const [selectedTrack, setSelectedTrack] = useState<"A" | "B">("A");
  const [bundleAdded, setBundleAdded] = useState(false);
  const [bundlePopupOpen, setBundlePopupOpen] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const tier = useActiveTier(mod);
  const tiers = getAllTiersInfo(mod);
  const countdown = useCountdown(tier.deadline);

  const dotColor =
    tier.dotColor === "emerald" ? "bg-emerald-500" :
    tier.dotColor === "amber" ? "bg-amber-500" : "bg-red-500";

  /* ── Delayed entrance: trigger after user scrolls 25% into the column ── */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAppeared(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-25% 0px 0px 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Fade out when the parent column's bottom is near viewport ── */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const column = el.parentElement;
    if (!column) return;

    const onScroll = () => {
      const rect = column.getBoundingClientRect();
      // When the column bottom is within 600px of the viewport top, fade out
      setIsNearBottom(rect.bottom < 600);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        ref={sentinelRef}
        className="sticky top-[14px] z-[110] pt-6 lg:pl-8 transition-opacity duration-300"
        style={{ opacity: isNearBottom ? 0 : undefined, pointerEvents: isNearBottom ? "none" : undefined }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={hasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="rounded-2xl border border-[#e8e4d9] bg-card shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 space-y-5"
        >

          {/* ── Price block ──────────────────────────────────────── */}
          <div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-[28px] font-extrabold text-foreground leading-none">
                {bundleAdded ? `$${BUNDLE_PRICE_USD}` : `$${tier.price}`}
              </span>
              <span className="text-[14px] text-[#888] line-through">
                {bundleAdded ? `$${BUNDLE_ORIGINAL_USD}` : `$${tier.fullPrice}`}
              </span>
              {!bundleAdded && tier.discount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-100 text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                  {tier.discount}% OFF
                </span>
              )}
              {bundleAdded && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-100 text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                  Save ${BUNDLE_SAVINGS_USD}
                </span>
              )}
            </div>

            {/* Urgency: tier label + countdown */}
            {!bundleAdded && tier.deadline && countdown && (
              <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                <span className={`inline-block w-2 h-2 rounded-full ${dotColor}`} />
                <span className="text-[12px] font-semibold text-foreground">
                  {tier.label}
                </span>
                <span className="text-[12px] text-[#555]">
                  ends {formatDeadlineShort(tier.deadline)}
                </span>
                <span className="text-[12px] text-[#555]">&middot;</span>
                <span className="text-[12px] font-semibold text-foreground">
                  {countdown}
                </span>
                <PricingTierTooltip tiers={tiers} />
              </div>
            )}

            <p className="text-[12px] text-[#555] mt-2">
              {bundleAdded
                ? `All 3 Bootcamps \u00b7 12 Classes \u00b7 18 Hours`
                : `Cohort starts ${mod.startDate}, 2026`}
            </p>
            {bundleAdded && (
              <p className="text-[12px] text-[#555] mt-1">
                Cohort starts {mod.startDate}, 2026
              </p>
            )}
          </div>

          {/* ── CTA button ──────────────────────────────────────── */}
          <button className="btn-shine w-full rounded-[14px] h-[50px] text-[13px] font-semibold uppercase tracking-wide text-white bg-primary shadow-md transition-all hover:brightness-110 hover:shadow-xl cursor-pointer">
            {bundleAdded
              ? `Enroll Full Bundle \u2014 $${BUNDLE_PRICE_USD}`
              : `Enroll Now \u2014 $${tier.price}`}
          </button>

          {/* ── Compact track selector ──────────────────────────── */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#888] mb-2.5">
              Choose Your Track
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(["A", "B"] as const).map((track) => (
                <button
                  key={track}
                  onClick={() => setSelectedTrack(track)}
                  className={`rounded-lg border px-3 py-2.5 text-left transition-all ${
                    selectedTrack === track
                      ? "border-primary/40 bg-primary/5 ring-1 ring-primary/30"
                      : "border-[#dfdbc9] hover:border-[#b8b0a0]"
                  }`}
                >
                  <p className="text-[13px] font-bold text-foreground">Track {track}</p>
                  <p className="text-[11px] text-[#555] mt-0.5">
                    {track === "A" ? "Mon \u00b7 7:30 PM" : "Thu \u00b7 2:30 PM"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* ── Bootcamp Includes ────────────────────────────────── */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#888] mb-3">
              {bundleAdded ? "Bundle Includes" : "Bootcamp Includes"}
            </p>
            <div className="space-y-2.5">
              {(bundleAdded
                ? ["12 live classes, 90 min each", "18 hours total instruction", "12 students per track", "3 Certificates of Completion"]
                : QUICK_FACTS
              ).map((fact) => (
                <div key={fact} className="flex items-center gap-2.5">
                  <GreenCheck />
                  <span className="text-[13px] text-[#555]">{fact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bundle upsell ────────────────────────────────────── */}
          <div className={`!mt-[24px] rounded-xl border p-4 transition-all ${
            bundleAdded
              ? "border-emerald-300 bg-emerald-50"
              : "border-emerald-200 bg-emerald-50/60"
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] font-bold text-foreground mb-0.5">
                  {bundleAdded ? "Full Bundle Added" : "Save with the Full Bundle"}
                </p>
                <p className="text-[12px] text-[#555] mb-2">
                  All 3 Bootcamps &middot; 12 Classes &middot; 18 Hours
                </p>
              </div>
              <button
                onClick={() => setBundleAdded(!bundleAdded)}
                className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  bundleAdded ? "bg-emerald-500" : "bg-gray-300"
                }`}
                role="switch"
                aria-checked={bundleAdded}
                aria-label="Add full bundle"
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                  bundleAdded ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[16px] font-extrabold text-foreground">${BUNDLE_PRICE_USD}</span>
              <span className="text-[13px] text-[#888] line-through">${BUNDLE_ORIGINAL_USD}</span>
              <span className="text-[12px] font-semibold text-emerald-600">Save ${BUNDLE_SAVINGS_USD}</span>
            </div>
            <button
              onClick={() => setBundlePopupOpen(true)}
              className="text-[13px] font-semibold text-emerald-600 hover:underline"
            >
              View all bootcamps
            </button>
          </div>

        </motion.div>
      </div>

      <BundlePopup open={bundlePopupOpen} onClose={() => setBundlePopupOpen(false)} />
    </>
  );
}
