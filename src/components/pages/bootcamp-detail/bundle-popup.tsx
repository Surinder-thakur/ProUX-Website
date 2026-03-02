"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  getAllBootcamps,
  BUNDLE_PRICE_USD,
  BUNDLE_ORIGINAL_USD,
  BUNDLE_SAVINGS_USD,
} from "@/lib/data/bootcamps";

function ChevronDown({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function BundlePopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const modules = getAllBootcamps();
  const [expandedModule, setExpandedModule] = useState<number>(0);

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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:w-full md:max-w-[680px] md:max-h-[85vh] bg-card rounded-2xl shadow-2xl border border-[#dfdbc9] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 md:p-6 border-b border-[#dfdbc9]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary mb-1">
                  Full Bundle
                </p>
                <h2 className="text-xl md:text-2xl font-extrabold text-foreground tracking-[-0.5px]">
                  All 3 Bootcamps
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  12 classes, 12 hours live, every deliverable included
                </p>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-[hsl(var(--gold-100))] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
              {modules.map((mod, i) => (
                <div
                  key={mod.slug}
                  className="rounded-xl border border-[#dfdbc9] overflow-hidden"
                >
                  {/* Bootcamp header */}
                  <button
                    onClick={() => setExpandedModule(expandedModule === i ? -1 : i)}
                    className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                      expandedModule === i ? "bg-card" : "bg-[hsl(var(--gold-100))]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-white text-xs font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[15px] font-bold text-foreground">
                          {mod.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {mod.classCount} classes &middot; {mod.hoursLive} hours
                        </p>
                      </div>
                    </div>
                    <ChevronDown isOpen={expandedModule === i} />
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {expandedModule === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-3">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {mod.tagline}
                          </p>

                          {/* Curriculum summary */}
                          <div className="space-y-1.5">
                            {mod.curriculum.map((week) => (
                              <div
                                key={week.week}
                                className="flex items-center gap-2 text-sm"
                              >
                                <span className="text-xs font-bold text-primary w-14 shrink-0">
                                  Week {week.week}
                                </span>
                                <span className="text-muted-foreground">
                                  {week.title}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Key deliverables */}
                          <div className="pt-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                              Key Deliverables
                            </p>
                            <div className="space-y-1">
                              {mod.deliverables.slice(0, 3).map((d, j) => (
                                <div key={j} className="flex items-start gap-2">
                                  <svg className="shrink-0 w-3.5 h-3.5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-xs text-muted-foreground">{d}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Footer with CTA */}
            <div className="p-5 md:p-6 border-t border-[#dfdbc9] bg-[hsl(var(--gold-50))]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-foreground">
                    ${BUNDLE_PRICE_USD}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${BUNDLE_ORIGINAL_USD}
                  </span>
                </div>
                <span className="text-sm font-semibold text-secondary">
                  Save ${BUNDLE_SAVINGS_USD}
                </span>
              </div>
              <button className="btn-shine w-full rounded-[12px] h-[48px] text-[13px] font-semibold uppercase tracking-wide text-white bg-primary shadow-lg transition-all hover:brightness-110 hover:shadow-xl">
                Enroll Full Bundle
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
