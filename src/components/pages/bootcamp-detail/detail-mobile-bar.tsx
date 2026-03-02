"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  BUNDLE_PRICE_USD,
  BUNDLE_ORIGINAL_USD,
  BUNDLE_SAVINGS_USD,
  QUICK_FACTS,
  type BootcampModule,
} from "@/lib/data/bootcamps";

export default function DetailMobileBar({
  module: mod,
}: {
  module: BootcampModule;
}) {
  const [selectedTrack, setSelectedTrack] = useState<"A" | "B" | null>(null);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-[#dfdbc9] bg-card/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <p className="text-lg font-extrabold text-foreground">
              ${mod.earlyBirdUsd}
            </p>
            <p className="text-xs text-muted-foreground line-through">
              ${mod.priceUsd}
            </p>
          </div>
          <p className="text-[11px] text-primary font-semibold uppercase">
            Early Bird
          </p>
        </div>

        <Drawer>
          <DrawerTrigger asChild>
            <button className="btn-shine rounded-[12px] bg-primary px-6 h-[44px] text-[13px] font-semibold uppercase tracking-wide text-white shadow-md transition-all hover:brightness-110">
              Enroll Now
            </button>
          </DrawerTrigger>

          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader>
              <DrawerTitle className="text-base font-bold tracking-[-0.2px]">
                {mod.title}
              </DrawerTitle>
              <DrawerDescription className="text-sm">
                Choose your track and enroll
              </DrawerDescription>
            </DrawerHeader>

            <div className="px-4 pb-6 space-y-4 overflow-y-auto">
              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-foreground">
                  ${mod.earlyBirdUsd}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${mod.priceUsd}
                </span>
                <span className="text-[11px] font-semibold text-primary uppercase">
                  Early Bird
                </span>
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
                    <p className="text-sm font-bold text-foreground">
                      Track A
                    </p>
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
                    <p className="text-sm font-bold text-foreground">
                      Track B
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Americas
                    </p>
                  </button>
                </div>
              </div>

              {/* Enroll CTA */}
              <button
                disabled={!selectedTrack}
                className={`btn-shine w-full rounded-[12px] h-[48px] text-[13px] font-semibold uppercase tracking-wide text-white shadow-md transition-all ${
                  selectedTrack
                    ? "bg-primary hover:brightness-110 hover:shadow-xl cursor-pointer"
                    : "bg-primary opacity-50 cursor-not-allowed"
                }`}
              >
                Enroll Now &mdash; ${mod.earlyBirdUsd}
              </button>

              {/* Quick facts */}
              <div className="space-y-2">
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
                    <span className="text-sm text-muted-foreground">
                      {fact}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bundle upsell — green tones */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-bold text-foreground mb-1">
                  Save with the Full Bundle
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  All 3 Modules &middot; 12 Classes &middot; 12 Hours
                </p>
                <div className="flex items-baseline gap-2">
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
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
