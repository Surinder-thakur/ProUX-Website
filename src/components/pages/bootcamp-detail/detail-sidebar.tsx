"use client";

import { useState } from "react";
import {
  BUNDLE_PRICE_USD,
  BUNDLE_ORIGINAL_USD,
  BUNDLE_SAVINGS_USD,
  QUICK_FACTS,
  type BootcampModule,
} from "@/lib/data/bootcamps";
import { SidebarPricingDisplay, useActiveTier } from "@/components/pages/bootcamps/bootcamp-pricing";
import BundlePopup from "./bundle-popup";

export default function DetailSidebar({
  module: mod,
}: {
  module: BootcampModule;
}) {
  const [selectedTrack, setSelectedTrack] = useState<"A" | "B" | null>(null);
  const [bundlePopupOpen, setBundlePopupOpen] = useState(false);
  const tier = useActiveTier(mod);

  return (
    <>
      <div className="sticky top-28 space-y-4">
        <div className="rounded-2xl border border-[#dfdbc9] bg-card p-5 space-y-5">
          {/* Bootcamp title */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
              Bootcamp
            </p>
            <h3 className="text-base font-bold text-foreground tracking-[-0.2px]">
              {mod.title}
            </h3>
          </div>

          {/* Price with tier info */}
          <SidebarPricingDisplay module={mod} />

          {/* Track Selector */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-2.5">
              Choose Your Track
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedTrack("A")}
                className={`rounded-lg border px-3 py-2.5 text-left transition-all ${
                  selectedTrack === "A"
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-[#dfdbc9] hover:border-primary/40"
                }`}
              >
                <p className="text-sm font-bold text-foreground">Track A</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  India / Asia / Europe
                </p>
              </button>
              <button
                onClick={() => setSelectedTrack("B")}
                className={`rounded-lg border px-3 py-2.5 text-left transition-all ${
                  selectedTrack === "B"
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-[#dfdbc9] hover:border-primary/40"
                }`}
              >
                <p className="text-sm font-bold text-foreground">Track B</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Americas
                </p>
              </button>
            </div>
          </div>

          {/* Next cohort */}
          <p className="text-sm text-muted-foreground">
            Next cohort starts:{" "}
            <span className="font-semibold text-foreground">{mod.startDate}, 2026</span>
          </p>

          {/* Enroll CTA */}
          <button
            disabled={!selectedTrack}
            className={`btn-shine w-full rounded-[12px] h-[48px] text-[13px] font-semibold uppercase tracking-wide text-white shadow-md transition-all ${
              selectedTrack
                ? "bg-primary hover:brightness-110 hover:shadow-xl cursor-pointer"
                : "bg-primary opacity-50 cursor-not-allowed"
            }`}
          >
            Enroll Now &mdash; ${tier.price}
          </button>

          {/* Quick facts */}
          <div className="space-y-2 pt-1">
            {QUICK_FACTS.map((fact) => (
              <div key={fact} className="flex items-center gap-2">
                <svg
                  className="shrink-0 w-3.5 h-3.5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm text-muted-foreground">{fact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bundle upsell card — green tones, separate card */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-bold text-foreground mb-2">
            Save with the Full Bundle
          </p>
          <p className="text-xs text-muted-foreground mb-2.5">
            All 3 Bootcamps &middot; 12 Classes &middot; 12 Hours
          </p>
          <div className="flex items-baseline gap-2 mb-2.5">
            <span className="text-lg font-extrabold text-foreground">
              ${BUNDLE_PRICE_USD}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ${BUNDLE_ORIGINAL_USD}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              Save ${BUNDLE_SAVINGS_USD}
            </span>
          </div>
          <button
            onClick={() => setBundlePopupOpen(true)}
            className="text-sm font-semibold text-emerald-600 hover:underline"
          >
            View all bootcamps
          </button>
        </div>
      </div>

      <BundlePopup open={bundlePopupOpen} onClose={() => setBundlePopupOpen(false)} />
    </>
  );
}
