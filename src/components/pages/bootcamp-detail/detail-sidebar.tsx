"use client";

import { useState } from "react";
import {
  BUNDLE_PRICE_USD,
  BUNDLE_ORIGINAL_USD,
  BUNDLE_SAVINGS_USD,
  QUICK_FACTS,
  type BootcampModule,
} from "@/lib/data/bootcamps";
import BundlePopup from "./bundle-popup";

export default function DetailSidebar({
  module: mod,
}: {
  module: BootcampModule;
}) {
  const [selectedTrack, setSelectedTrack] = useState<"A" | "B" | null>(null);
  const [bundleMode, setBundleMode] = useState(false);
  const [bundlePopupOpen, setBundlePopupOpen] = useState(false);

  const displayPrice = bundleMode ? BUNDLE_PRICE_USD : mod.earlyBirdUsd;
  const displayOriginal = bundleMode ? BUNDLE_ORIGINAL_USD : mod.priceUsd;

  return (
    <>
      {/*
        sticky: sticks to top when scrolling
        top-28: offset from top (header height)
        The parent grid uses items-start so this column doesn't stretch
      */}
      <div className="sticky top-28 space-y-4">
        <div className="rounded-2xl border border-[#dfdbc9] bg-card p-5 space-y-5">
          {/* Bootcamp title */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
              {bundleMode ? "Full Bundle" : "Bootcamp"}
            </p>
            <h3 className="text-base font-bold text-foreground tracking-[-0.2px]">
              {bundleMode ? "All 3 Bootcamps" : mod.title}
            </h3>
          </div>

          {/* Price */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-foreground">
                ${displayPrice}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ${displayOriginal}
              </span>
              {!bundleMode && (
                <span className="text-[11px] font-semibold text-primary uppercase">
                  Early Bird
                </span>
              )}
            </div>
            {bundleMode && (
              <p className="text-xs text-muted-foreground mt-1">
                12 classes, 12 hours, every deliverable
              </p>
            )}
          </div>

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
            {bundleMode
              ? `Enroll Full Bundle \u2014 $${BUNDLE_PRICE_USD}`
              : `Enroll Now \u2014 $${mod.earlyBirdUsd}`}
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
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-foreground">
              Full Bundle
            </p>
            {/* Toggle */}
            <button
              onClick={() => setBundleMode(!bundleMode)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
                bundleMode ? "bg-emerald-500" : "bg-[#dfdbc9]"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 mt-0.5 ${
                  bundleMode ? "translate-x-[18px]" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-2.5">
            All 3 Modules &middot; 12 Classes &middot; 12 Hours
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
            View all modules
          </button>
        </div>
      </div>

      <BundlePopup open={bundlePopupOpen} onClose={() => setBundlePopupOpen(false)} />
    </>
  );
}
