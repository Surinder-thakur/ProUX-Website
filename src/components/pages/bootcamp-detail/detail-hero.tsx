"use client";

import Image from "next/image";
import type { BootcampModule } from "@/lib/data/bootcamps";

export default function DetailHero({ module: mod }: { module: BootcampModule }) {
  // Split headline on \n for controlled line breaks
  const headlineLines = mod.heroHeadline.split("\n");

  return (
    <div className="relative min-h-screen flex flex-col justify-end">
      {/* Background image */}
      <Image
        src="/images/bootcamp-hero.jpg"
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 65vw"
        className="object-cover -scale-x-100"
      />

      {/* Dark tint — softens saturated tones toward pastel/professional, WCAG AA on all zones */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 10, 30, 0.3)" }} />
      {/* Smooth dark gradient — concentrated on bottom-left where text sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />

      {/* Content overlay */}
      <div className="relative z-10 px-6 md:px-10 lg:px-12 pt-28 pb-12 md:pb-16">
        {/* Tag — lowercase, understated */}
        <p className="text-[13px] font-medium text-white/50 tracking-wide mb-5">
          {mod.heroTag}
        </p>

        {/* Headline — controlled line breaks, no orphans */}
        <h1 className="font-black tracking-[-2px] text-white mb-6">
          {headlineLines.map((line, i) => (
            <span key={i} className="block text-[34px] leading-[1.08] md:text-[48px] lg:text-[56px]">
              {line}
            </span>
          ))}
        </h1>

        {/* Subheadline — balanced width */}
        <p className="text-[16px] md:text-[18px] lg:text-[20px] font-normal text-white/75 leading-[1.55] mb-10 max-w-[480px]">
          {mod.heroSubheadline}
        </p>

        {/* Pills — subtle, spaced */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            `${mod.classCount} Live Classes`,
            `${mod.hoursLive} Hours Total`,
            `Starts ${mod.startDate}`,
          ].map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[12px] font-medium text-white/80"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* ── Company logos — trust strip ──────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-[11px] font-medium text-white/35 uppercase tracking-[0.15em] mb-5">
            Top companies upskill their teams with our bootcamps
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            {[
              { src: "/images/logos/ibm.svg", alt: "IBM", w: 60 },
              { src: "/images/logos/ebay.svg", alt: "eBay", w: 72 },
              { src: "/images/logos/walmart.svg", alt: "Walmart", w: 90 },
              { src: "/images/logos/samsung.svg", alt: "Samsung", w: 100 },
              { src: "/images/logos/globant.svg", alt: "Globant", w: 90 },
              { src: "/images/logos/wise.svg", alt: "Wise", w: 68 },
              { src: "/images/logos/accenture.svg", alt: "Accenture", w: 100 },
              { src: "/images/logos/ntt.svg", alt: "NTT", w: 60 },
              { src: "/images/logos/uber.svg", alt: "Uber", w: 68 },
              { src: "/images/logos/careem.svg", alt: "Careem", w: 80 },
            ].map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={24}
                className="h-[20px] w-auto object-contain opacity-40"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
