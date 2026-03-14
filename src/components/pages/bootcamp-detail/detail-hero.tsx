"use client";

import Image from "next/image";
import type { BootcampModule } from "@/lib/data/bootcamps";

/* Base dark from global CSS: --neutral-950 = #121212 */
const BG = "#121212";
const BG_RGB = "18,18,18";

export default function DetailHero({ module: mod }: { module: BootcampModule }) {
  const headlineLines = mod.heroHeadline.split("\n");

  return (
    <div
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: BG }}
    >
      {/* ── Subtle radial glow — depth ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 70% 40%, rgba(${BG_RGB},0.3) 0%, transparent 70%)`,
        }}
      />

      {/* ══════════════════════════════════════════════════════
          Background image — bleed from top-right
          Responsive: visible at ALL breakpoints, opacity scales down.
          Image 12% larger on xl/lg, extending toward bottom-left
          with heavier opacity in the text zone.

          xl (1280+):  35% opacity, 65% width
          lg (1024+):  25% opacity, 58% width
          md (768+):   15% opacity, 50% width
          mobile:      10% opacity, 70% width — faint contextual hint
         ══════════════════════════════════════════════════════ */}
      <div
        className="
          absolute top-[6%] md:top-[4%] lg:top-[3%] -right-[20%] pointer-events-none
          w-[90%] md:w-[70%] lg:w-[78%] xl:w-[85%]
        "
      >
        <Image
          src={mod.heroImage || "/images/bc1-hero.png"}
          alt={`${mod.title} workflow`}
          width={2746}
          height={1740}
          priority
          quality={100}
          unoptimized
          className="
            w-full h-auto
            opacity-[0.15] md:opacity-[0.15] lg:opacity-[0.12] xl:opacity-[0.18]
          "
        />

        {/* ── Edge dissolves — seamless merge, NO visible cutoffs ── */}

        {/* Left edge: wide smooth fade so white PNG bg never shows */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${BG} 0%, rgba(${BG_RGB},0.85) 8%, rgba(${BG_RGB},0.55) 20%, rgba(${BG_RGB},0.25) 35%, transparent 55%)`,
          }}
        />

        {/* Bottom edge: wide fade, blends image floor into bg seamlessly */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${BG} 0%, rgba(${BG_RGB},0.85) 10%, rgba(${BG_RGB},0.45) 25%, transparent 50%)`,
          }}
        />

        {/* Bottom-left corner: radial vignette — heaviest protection where text lives */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 100% 100% at 0% 100%, ${BG} 0%, rgba(${BG_RGB},0.7) 25%, transparent 55%)`,
          }}
        />

        {/* Top edge: gentle fade so top of image doesn't hard-cut against bg */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(${BG_RGB},0.4) 0%, transparent 8%)`,
          }}
        />

        {/* Right edge: subtle fade so right side doesn't feel like a strip */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to left, rgba(${BG_RGB},0.3) 0%, transparent 10%)`,
          }}
        />
      </div>

      {/* Warm glow — xl only */}
      <div className="absolute top-[35%] right-[28%] w-[300px] h-[250px] rounded-full opacity-[0.10] blur-[80px] bg-[#C2612C] hidden xl:block" />

      {/* ══════════════════════════════════════════════════════
          RESPONSIVE GRADIENT OVERLAYS — text protection
          Layered on top of the image for each breakpoint
         ══════════════════════════════════════════════════════ */}

      {/* Mobile: image visible at 10% but needs strong text protection */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background: `linear-gradient(to right, rgba(${BG_RGB},0.97) 0%, rgba(${BG_RGB},0.90) 40%, rgba(${BG_RGB},0.70) 70%, rgba(${BG_RGB},0.50) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background: `linear-gradient(to top, rgba(${BG_RGB},0.95) 0%, rgba(${BG_RGB},0.80) 35%, transparent 65%)`,
        }}
      />

      {/* Tablet (md to lg) */}
      <div
        className="absolute inset-0 hidden md:block lg:hidden"
        style={{
          background: `linear-gradient(to right, rgba(${BG_RGB},0.98) 0%, rgba(${BG_RGB},0.92) 40%, rgba(${BG_RGB},0.60) 68%, rgba(${BG_RGB},0.30) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 hidden md:block lg:hidden"
        style={{
          background: `linear-gradient(to top, rgba(${BG_RGB},0.96) 0%, rgba(${BG_RGB},0.72) 28%, transparent 58%)`,
        }}
      />

      {/* Desktop lg */}
      <div
        className="absolute inset-0 hidden lg:block xl:hidden"
        style={{
          background: `linear-gradient(to right, rgba(${BG_RGB},0.96) 0%, rgba(${BG_RGB},0.85) 28%, rgba(${BG_RGB},0.45) 52%, rgba(${BG_RGB},0.12) 78%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-0 hidden lg:block xl:hidden"
        style={{
          background: `linear-gradient(to top, ${BG} 0%, rgba(${BG_RGB},0.60) 24%, transparent 52%)`,
        }}
      />

      {/* Desktop xl+ */}
      <div
        className="absolute inset-0 hidden xl:block"
        style={{
          background: `linear-gradient(to right, rgba(${BG_RGB},0.95) 0%, rgba(${BG_RGB},0.80) 22%, rgba(${BG_RGB},0.32) 48%, rgba(${BG_RGB},0.06) 70%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-0 hidden xl:block"
        style={{
          background: `linear-gradient(to top, ${BG} 0%, rgba(${BG_RGB},0.50) 20%, transparent 48%)`,
        }}
      />

      {/* ── Content — z-10 always above everything ── */}
      <div className="relative z-10 px-6 md:px-10 lg:px-12 pt-28 pb-12 md:pb-16">
        <p className="text-[13px] font-medium text-white/50 tracking-wide mb-5">
          {mod.heroTag}
        </p>

        <h1 className="font-black tracking-[-2px] text-white mb-6">
          {headlineLines.map((line, i) => (
            <span key={i} className="block text-[34px] leading-[1.08] md:text-[48px] lg:text-[56px]">
              {line}
            </span>
          ))}
        </h1>

        <p className="text-[16px] md:text-[18px] lg:text-[20px] font-normal text-white/75 leading-[1.55] mb-10 max-w-[560px]">
          {mod.heroSubheadline}
        </p>

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

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-[11px] font-medium text-white/35 uppercase tracking-[0.15em] mb-5">
            Top companies upskill their teams with our bootcamps
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              { src: "/images/logos/ibm.svg", alt: "IBM" },
              { src: "/images/logos/ebay.svg", alt: "eBay" },
              { src: "/images/logos/walmart.svg", alt: "Walmart" },
              { src: "/images/logos/samsung.svg", alt: "Samsung" },
              { src: "/images/logos/globant.svg", alt: "Globant" },
              { src: "/images/logos/wise.svg", alt: "Wise" },
              { src: "/images/logos/accenture.svg", alt: "Accenture" },
              { src: "/images/logos/ntt.svg", alt: "NTT" },
              { src: "/images/logos/uber.svg", alt: "Uber" },
              { src: "/images/logos/careem.svg", alt: "Careem" },
            ].map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={18}
                className="h-[18px] w-auto object-contain opacity-35"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
