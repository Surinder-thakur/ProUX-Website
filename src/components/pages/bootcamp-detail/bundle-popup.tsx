"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  getAllBootcamps,
  BUNDLE_PRICE_USD,
  BUNDLE_ORIGINAL_USD,
  BUNDLE_SAVINGS_USD,
  BUNDLE_RAZORPAY_ID,
} from "@/lib/data/bootcamps";
import RazorpayButton from "./razorpay-button";

/* ── Green circle checkmark ──────────────────────────────────────────── */

function Check() {
  return (
    <span className="shrink-0 w-4 h-4 rounded-full bg-emerald-600 inline-flex items-center justify-center">
      <svg className="w-[9px] h-[9px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

/* ── Bundle Popup ────────────────────────────────────────────────────── */

export default function BundlePopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const modules = getAllBootcamps();
  const savingsPercent = Math.round(
    (BUNDLE_SAVINGS_USD / BUNDLE_ORIGINAL_USD) * 100
  );

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Close — floating, outside the card, top-right */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed z-[121] top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[120] m-auto max-w-[1060px] h-fit max-h-[calc(100vh-48px)] w-[calc(100%-48px)] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
          >
            {/* ── Header ─────────────────────────────────────────── */}
            <div className="bg-[#1a2130] px-7 py-5 flex items-center justify-between gap-8">
              <div className="min-w-0">
                <h2 className="text-[20px] font-extrabold text-white tracking-[-0.4px] leading-tight">
                  The Complete AI Design Engineer Bundle
                </h2>
                <p className="text-[13px] text-white/45 mt-1">
                  12 live classes &middot; 18 hours &middot; 3 certifications
                </p>
              </div>

              <div className="shrink-0 text-right">
                <div className="flex items-baseline gap-2.5 justify-end">
                  <span className="text-[30px] font-extrabold text-white leading-none tracking-[-0.5px]">
                    ${BUNDLE_PRICE_USD}
                  </span>
                  <span className="text-[14px] text-white/25 line-through">
                    ${BUNDLE_ORIGINAL_USD}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-[3px] rounded-md bg-emerald-500/15 text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                  Save {savingsPercent}% &mdash; ${BUNDLE_SAVINGS_USD}
                </span>
              </div>
            </div>

            {/* ── 3 Module Cards ──────────────────────────────────── */}
            <div className="bg-[#faf9f6] px-6 py-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {modules.map((mod, i) => (
                  <div
                    key={mod.slug}
                    className="rounded-xl bg-white border border-[#e8e4d9] shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col"
                  >
                    {/* Card header — fixed height so titles align across cards */}
                    <div className="px-4 pt-4 pb-3 min-h-[88px] flex flex-col">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-[22px] h-[22px] rounded-full bg-[#1a2130] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                          Weeks {i * 4 + 1}&ndash;{(i + 1) * 4}
                        </span>
                      </div>
                      <h3 className="text-[14px] font-bold text-foreground leading-snug flex-1">
                        {mod.title}
                      </h3>
                      <p className="text-[11px] text-[#999] mt-1">
                        {mod.classCount} classes &middot; {mod.hoursLive} hours live
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="mx-4 border-t border-[#eeebe3]" />

                    {/* Deliverables — aligned across all cards */}
                    <div className="px-4 py-3 flex-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#aaa] mb-2.5">
                        What You Ship
                      </p>
                      <div className="space-y-2">
                        {mod.deliverables.slice(0, 3).map((d, j) => (
                          <div key={j} className="flex items-center gap-2.5">
                            <Check />
                            <span className="text-[12px] text-foreground/75 leading-snug">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CTA Footer ─────────────────────────────────────── */}
            <div className="bg-white border-t border-[#e8e4d9] px-7 py-4 flex items-center gap-6">
              <p className="flex-1 text-[13px] text-[#555] leading-snug">
                One enrollment. Three certifications. Everything you need to
                design, build, and ship AI products yourself.
              </p>
              <div className="shrink-0 w-[280px]">
                <RazorpayButton label="Enroll Full Bundle" price={BUNDLE_PRICE_USD} buttonId={BUNDLE_RAZORPAY_ID} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
