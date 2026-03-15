"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import RazorpayButton from "./razorpay-button";
import { X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
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
  const [bundleAdded, setBundleAdded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const tier = useActiveTier(mod);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const bar = (
    <div
      className={`fixed inset-x-0 bottom-0 z-[100] border-t border-[#dfdbc9] bg-white/95 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        display: "var(--mobile-bar-display, block)",
      }}
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

        <button
          data-mobile-enroll
          onClick={() => setDrawerOpen(true)}
          className="btn-shine rounded-[12px] bg-primary px-8 h-[44px] text-[13px] font-semibold uppercase tracking-wide text-white shadow-md transition-all hover:brightness-110 shrink-0"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Portal the sticky bar directly into body — immune to parent CSS issues */}
      {createPortal(bar, document.body)}

      {/* Hide on lg+ via CSS custom property (can't use Tailwind on portaled element) */}
      <style>{`@media (min-width: 1024px) { :root { --mobile-bar-display: none; } }`}</style>

      {/* ── Enrollment Drawer ──── */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} shouldScaleBackground={false}>
        <DrawerContent className="max-h-[85vh]">
          {/* Close — floating above the sheet, matches bundle popup style */}
          <DrawerClose asChild>
            <button
              className="absolute -top-12 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </DrawerClose>

          <DrawerHeader className="text-left">
            <DrawerTitle className="text-[20px] font-extrabold tracking-[-0.3px]">
              {mod.title}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Choose your track and enroll
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-4 space-y-4 overflow-y-auto flex-1">
            {/* Price with tier info */}
            <SidebarPricingDisplay module={mod} />

            {/* Schedule */}
            <div className="flex items-center gap-2.5 rounded-lg border border-[#dfdbc9] px-3 py-2.5">
              <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Starts {mod.startDate}, 2026
                </p>
                <p className="text-xs text-muted-foreground">
                  {mod.trackA?.day ?? "Mondays"} &middot; {mod.trackA?.time ?? "8:00 \u2013 9:30 PM IST"}
                </p>
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
    </>
  );
}
