"use client";

import Link from "next/link";
import Image from "next/image";
import { getAllBootcamps, type BootcampModule } from "@/lib/data/bootcamps";

/* ── Single Card ─────────────────────────────────────────────────────────── */

function BootcampCard({ module: mod }: { module: BootcampModule }) {
  return (
    <Link
      href={`/bootcamps/${mod.slug}`}
      className="group relative flex flex-col rounded-[20px] bg-[hsl(var(--bg-primary-50))] border border-[#ece9d8] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#f3f1ec] hover:border-[#e0dbc8] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] cursor-pointer"
    >
      {/* ── Image zone with inset ──────────────────────────────────────── */}
      <div className="relative p-3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
          <Image
            src={mod.image}
            alt={mod.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
            className="object-cover"
          />
          {/* Soft bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          {/* Date badge — frosted glass, top-right */}
          <span className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-[12px] border border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-[11px] font-semibold text-foreground">
            <svg
              className="w-3 h-3 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            {mod.startDate}, 2026
          </span>
        </div>
      </div>

      {/* ── Click indicator — bottom-right, visible on hover ─────────── */}
      <div className="absolute bottom-5 right-5 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white opacity-0 scale-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
        <svg className="w-4 h-4 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6-6m6 6l-6 6" />
        </svg>
      </div>

      {/* ── Content zone ───────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
        {/* Title */}
        <h3 className="text-[17px] md:text-[19px] font-bold text-foreground tracking-[-0.01em] leading-tight">
          {mod.title}
        </h3>

        {/* Tagline */}
        <p className="text-[13px] text-muted-foreground leading-relaxed mt-1.5 pr-2 line-clamp-2">
          {mod.tagline}
        </p>

        {/* Metadata */}
        <p className="text-[11px] uppercase tracking-[0.05em] text-muted-foreground/70 font-medium mt-4">
          4 Weeks &middot; Cohort-Based
        </p>

        {/* ── Pricing zone (pushed to bottom so cards align) ────── */}
        <div className="mt-auto pt-5">
          <div className="flex items-baseline gap-2">
            <span className="text-[24px] font-extrabold text-foreground leading-none">
              ${mod.earlyBirdUsd}
            </span>
            <span className="text-[13px] text-muted-foreground line-through">
              ${mod.priceUsd}
            </span>
          </div>
          <span className="inline-block mt-1.5 px-2 py-[3px] rounded text-[10px] font-semibold uppercase tracking-wide text-primary bg-primary/[0.08]">
            Early Bird - Ends {mod.earlyBirdDeadline}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Grid ─────────────────────────────────────────────────────────────────── */

export default function BootcampModuleCards() {
  const modules = getAllBootcamps();

  return (
    <section
      id="modules"
      aria-label="Bootcamps"
      className="bg-[hsl(var(--bg-primary-50))] pt-8 pb-12 md:pb-16 scroll-mt-[80px]"
    >
      <div className="container-default">
        {/* Section heading */}
        <div className="mb-8 max-w-lg">
          <h2 className="text-[28px] md:text-[34px] font-extrabold text-foreground tracking-[-0.02em] leading-tight">
            Live AI UX Bootcamps{" "}
            <span className="relative inline-flex h-3 w-3 align-middle ml-1"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" /></span>
          </h2>
          <p className="text-[16px] text-muted-foreground mt-3">
            Live classes. Small cohorts. Start with any bootcamp.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-7">
          {modules.map((mod) => (
            <BootcampCard key={mod.slug} module={mod} />
          ))}
        </div>

        {/* Single-bootcamp note */}
        <p className="text-center text-[14px] text-muted-foreground mt-8">
          Not ready for all three? Each bootcamp is fully standalone — start with one anytime.
        </p>
      </div>
    </section>
  );
}
