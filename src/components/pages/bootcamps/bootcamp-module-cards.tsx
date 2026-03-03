"use client";

import Link from "next/link";
import Image from "next/image";
import { getAllBootcamps, type BootcampModule } from "@/lib/data/bootcamps";
import { CardPricingDisplay } from "./bootcamp-pricing";

/* ── Single Card ─────────────────────────────────────────────────────────── */

function BootcampCard({ module: mod }: { module: BootcampModule }) {
  return (
    <Link
      href={`/bootcamps/${mod.slug}`}
      className="group relative flex flex-col rounded-[20px] bg-[hsl(var(--bg-primary-50))] border border-[#ece9d8] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#FCFBF9] hover:border-[#dfdbc9] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] cursor-pointer"
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

      {/* ── Content zone ───────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
        {/* Title */}
        <h3 className="text-[17px] md:text-[19px] font-bold text-foreground tracking-[-0.01em] leading-tight">
          {mod.title}
        </h3>

        {/* Tagline */}
        <p className="text-[13px] font-medium text-[#4f4f4f] leading-relaxed mt-1.5 pr-2 line-clamp-2">
          {mod.tagline}
        </p>

        {/* Metadata */}
        <p className="text-[11px] uppercase tracking-[0.05em] text-muted-foreground font-medium mt-4">
          4 Weeks &middot; Cohort-Based
        </p>

        {/* ── Pricing zone (pushed to bottom so cards align) ────── */}
        <div className="mt-auto pt-5">
          <CardPricingDisplay module={mod} />

          {/* CTA */}
          <span className="flex items-center justify-center w-full mt-4 rounded-[12px] border-2 border-primary h-[48px] text-[13px] font-semibold uppercase tracking-wide text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-md">
            Explore This Program
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
      className="bg-[hsl(var(--bg-primary-50))] pt-0 pb-12 md:pb-16 scroll-mt-[96px]"
    >
      <div className="container-default">
        {/* Section heading */}
        <div className="mb-8 max-w-lg">
          <h2 className="text-[28px] md:text-[34px] font-extrabold text-foreground tracking-[-0.02em] leading-tight">
            AI Design Bootcamps{" "}
            <span className="relative inline-flex h-3 w-3 align-middle ml-1"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" /></span>
          </h2>
          <p className="text-[16px] text-muted-foreground mt-3">
            Hands-on training for working UX and product designers.
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
