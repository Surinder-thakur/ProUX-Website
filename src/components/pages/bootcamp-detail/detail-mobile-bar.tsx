"use client";

import { useState } from "react";
import RazorpayButton from "./razorpay-button";
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
  BUNDLE_RAZORPAY_ID,
  QUICK_FACTS,
  type BootcampModule,
} from "@/lib/data/bootcamps";
import { SidebarPricingDisplay, useActiveTier } from "@/components/pages/bootcamps/bootcamp-pricing";

export default function DetailMobileBar({
  module: mod,
}: {
  module: BootcampModule;
}) {
  const [selectedTrack, setSelectedTrack] = useState<"A" | "B">("A");
  const [bundleAdded, setBundleAdded] = useState(false);
  const tier = useActiveTier(mod);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-[#dfdbc9] bg-card/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <p className="text-lg font-extrabold text-foreground">
              ${tier.price}
            </p>
            <p className="text-xs text-muted-foreground line-through">
              ${tier.fullPrice}
            </p>
            {tier.discount > 0 && (
              <span className="text-[10px] font-bold text-emerald-600 uppercase">
                {tier.discount}% OFF
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${
              tier.dotColor === "emerald" ? "bg-emerald-500" :
              tier.dotColor === "amber" ? "bg-amber-500" : "bg-red-500"
            }`} />
            <p className="text-[11px] font-semibold text-foreground">
              {tier.label}
            </p>
          </div>
        </div>

        <Drawer>
          <DrawerTrigger asChild>
            <button className="btn-shine rounded-[12px] bg-primary px-6 h-[44px] text-[13px] font-semibold uppercase tracking-wide text-white shadow-md transition-all hover:brightness-110 shrink-0">
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
                    <p className="text-sm font-bold text-foreground">
                      Track A
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {mod.trackA?.day ?? "Mon"} &middot; {mod.trackA?.time ?? "7:30 \u2013 9:00 PM IST"}
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
                      {mod.trackB?.day ?? "Thu"} &middot; {mod.trackB?.time ?? "2:30 \u2013 4:00 PM IST"}
                    </p>
                  </button>
                </div>
              </div>

              {/* Enroll CTA */}
              <RazorpayButton label="Enroll Now" price={bundleAdded ? BUNDLE_PRICE_USD : tier.price} buttonId={bundleAdded ? BUNDLE_RAZORPAY_ID : tier.razorpayId!} />

              {/* Quick facts */}
              <div className="space-y-2">
                {QUICK_FACTS.map((fact) => (
                  <div key={fact} className="flex items-center gap-2">
                    <svg
                      className="shrink-0 w-3.5 h-3.5 text-emerald-600"
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

              {/* Bundle upsell with toggle */}
              <div className={`rounded-xl border p-4 transition-all ${
                bundleAdded
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-emerald-200 bg-emerald-50"
              }`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-sm font-bold text-foreground mb-1">
                      {bundleAdded ? "Full Bundle Added" : "Save with the Full Bundle"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      All 3 Bootcamps &middot; 12 Classes &middot; 18 Hours
                    </p>
                  </div>

                  {/* Toggle switch */}
                  <button
                    onClick={() => setBundleAdded(!bundleAdded)}
                    className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      bundleAdded ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                    role="switch"
                    aria-checked={bundleAdded}
                    aria-label="Add full bundle"
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        bundleAdded ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

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
