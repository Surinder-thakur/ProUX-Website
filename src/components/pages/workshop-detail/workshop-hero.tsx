"use client";

import Image from "next/image";
import type { BootcampModule } from "@/lib/data/bootcamps";

const COMPANY_LOGOS = [
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
];

export default function WorkshopHero({ module: mod }: { module: BootcampModule }) {
  return (
    <section className="bg-[hsl(var(--gold-100))]">
      {/* ── Hero: text left, image right ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-28 md:pt-32 pb-10 md:pb-12">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">

          {/* Left: Text content */}
          <div className="flex flex-col justify-center">
            <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-6">
              Live Workshop
            </p>
            <h1 className="text-[28px] leading-[34px] md:text-4xl lg:text-[48px] lg:leading-[56px] font-extrabold text-foreground tracking-[-1.4px] mb-6">
              {mod.title}
            </h1>
            <p className="text-sm md:text-base lg:text-[18px] lg:leading-[24px] font-medium text-[#4f4f4f] max-w-[480px] mb-6">
              {mod.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/surinder-profile.jpg"
                  alt="Surinder Thakur"
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px] rounded-full object-cover border-[2px] border-primary/20"
                />
                <div>
                  <p className="text-[13px] font-semibold text-foreground">With Surinder Thakur</p>
                  <p className="text-[11px] text-muted-foreground">NN/g Certified UX Consultant</p>
                </div>
              </div>
              <span className="hidden sm:block w-[1px] h-8 bg-[#dfdbc9]" />
              <p className="text-[13px] font-semibold text-foreground">Starts {mod.startDate}, 2026</p>
            </div>
            <button
              className="btn-shine w-fit rounded-[12px] bg-primary text-primary-foreground px-[40px] h-[56px] text-[14px] font-semibold uppercase tracking-[0.35px] shadow-lg transition-all hover:shadow-xl hover:brightness-110"
              onClick={() => {
                const trigger = document.querySelector<HTMLButtonElement>('[data-mobile-enroll]');
                if (trigger) trigger.click();
              }}
            >
              Reserve Your Spot
            </button>
          </div>

          {/* Right: Image — rounded mask with breathing room */}
          <div className="w-full bg-white rounded-[40px] p-5 md:p-7">
            <Image
              src="/images/workshop-hero-v2.jpg"
              alt={`${mod.title} workflow`}
              width={1500}
              height={938}
              priority
              quality={95}
              unoptimized
              className="w-full h-auto rounded-[28px]"
            />
          </div>
        </div>
      </div>

      {/* ── Logo marquee ── */}
      <div className="border-t border-[#dfdbc9] py-8 md:py-10 overflow-hidden relative">
        <style>{`
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

        <p className="text-[11px] font-semibold text-muted-foreground/40 uppercase tracking-[0.15em] text-center mb-6">
          Trusted by teams worldwide
        </p>

        <div className="absolute left-0 top-0 bottom-0 w-[80px] md:w-[120px] bg-gradient-to-r from-[hsl(var(--gold-100))] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[80px] md:w-[120px] bg-gradient-to-l from-[hsl(var(--gold-100))] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden group">
          <div className="flex shrink-0 items-center gap-10 md:gap-14 animate-[marquee-scroll_50s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...COMPANY_LOGOS, ...COMPANY_LOGOS, ...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, i) => (
              <Image
                key={`${logo.alt}-${i}`}
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={38}
                className="h-[32px] md:h-[36px] w-auto object-contain opacity-30 shrink-0 invert hover:opacity-50 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
