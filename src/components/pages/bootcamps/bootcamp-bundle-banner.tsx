"use client";

import {
  BUNDLE_PRICE_USD,
  BUNDLE_SAVINGS_USD,
  BUNDLE_ORIGINAL_USD,
  getAllBootcamps,
} from "@/lib/data/bootcamps";

export default function BootcampBundleBanner() {
  const modules = getAllBootcamps();

  return (
    <section className="bg-[hsl(var(--proux-navy))]">
      <div className="container-default py-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          {/* Left: individual modules */}
          <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-normal text-white/50 uppercase tracking-wider mb-4">
              Buy Individually
            </p>
            <div className="space-y-4">
              {modules.map((mod) => (
                <div key={mod.slug} className="flex items-center justify-between pb-3 border-b border-white/5 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-semibold text-white/90">{mod.title}</p>
                    <p className="text-xs text-white/40">{mod.classCount} classes, {mod.hoursLive} hours</p>
                  </div>
                  <span className="text-base font-extrabold text-white">
                    ${mod.earlyBirdUsd}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: bundle */}
          <div className="lg:w-[380px] rounded-xl border-2 border-emerald-400/40 bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider">
                Best Value
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white mb-1 tracking-[-0.3px]">
              Full Bundle
            </h3>
            <p className="text-sm text-white/60 mb-4">
              All 3 modules, 12 classes, 12 hours, every deliverable
            </p>

            <div className="space-y-2 mb-6">
              {modules.map((mod) => (
                <div key={mod.slug} className="flex items-center gap-2">
                  <svg className="shrink-0 w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-white/70">{mod.title}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-extrabold text-white">
                  ${BUNDLE_PRICE_USD}
                </span>
                <span className="text-sm text-white/40 line-through">
                  ${BUNDLE_ORIGINAL_USD}
                </span>
              </div>
              <p className="text-sm text-emerald-400 font-semibold mb-4">
                Save ${BUNDLE_SAVINGS_USD}
              </p>
              <button className="btn-shine w-full rounded-[12px] bg-primary h-[48px] text-[13px] font-semibold uppercase tracking-wide text-white shadow-lg transition-all hover:brightness-110 hover:shadow-xl">
                Enroll Full Bundle
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
