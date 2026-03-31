"use client";

import Image from "next/image";
import type { BootcampModule } from "@/lib/data/bootcamps";
import { useActiveTier } from "@/components/pages/bootcamps/bootcamp-pricing";
import RazorpayButton from "@/components/pages/bootcamp-detail/razorpay-button";

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

/* ── Option C: Warm Banner + Floating Enrollment Card ────────────────── */

export default function WorkshopHeroC({ module: mod }: { module: BootcampModule }) {
  const tier = useActiveTier(mod);

  return (
    <div className="relative">
      {/* ── Warm Banner ── */}
      <div
        className="relative pt-32 md:pt-40 pb-28 md:pb-36 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a2130 0%, #2a1a12 40%, #B55331 100%)",
        }}
      >
        {/* Subtle glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 50% 60% at 70% 40%, rgba(181,83,49,0.2) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 container-default px-6 md:px-10">
          {/* Tag */}
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-white/50 mb-4">
            Live Workshop
          </p>

          {/* Title */}
          <h1 className="text-[30px] md:text-[42px] lg:text-[48px] font-extrabold md:font-black text-white leading-[1.12] tracking-[-1.5px] md:tracking-[-2px] mb-4 md:mb-6 max-w-[600px]">
            {mod.title}
          </h1>

          {/* Tagline */}
          <p className="text-[14px] md:text-[17px] lg:text-[19px] font-normal text-white/70 leading-[1.55] mb-6 max-w-[560px]">
            {mod.tagline}
          </p>

          {/* Info pills */}
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
        </div>
      </div>

      {/* ── Floating Enrollment Card — overlaps banner ── */}
      <div className="relative z-10 container-default px-4 -mt-20 md:-mt-24 mb-12 md:mb-16">
        <div className="max-w-[460px] mx-auto rounded-2xl bg-white border border-[#dfdbc9] shadow-[0_12px_40px_rgba(0,0,0,0.10)] p-6 md:p-8">
          {/* Instructor row */}
          <div className="flex items-center gap-4 mb-4">
            <Image
              src="/images/surinder-profile.jpg"
              alt="Surinder Thakur"
              width={52}
              height={52}
              className="w-[52px] h-[52px] rounded-full object-cover border-[3px] border-primary/25"
            />
            <div>
              <p className="text-[14px] font-bold text-foreground">Surinder Thakur</p>
              <p className="text-[12px] text-muted-foreground">
                AI-First UX Consultant &middot; NN/g Certified
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-[11px] font-semibold text-foreground ml-1">4.98</span>
                <span className="text-[11px] text-muted-foreground ml-0.5">· 12k+ trained</span>
              </div>
            </div>
          </div>

          {/* Price + urgency */}
          <div className="bg-[hsl(var(--gold-50))] rounded-xl px-5 py-4 mb-5">
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="text-[28px] font-extrabold text-foreground leading-none">
                ${tier.price}
              </span>
              {tier.discount > 0 && (
                <>
                  <span className="text-[15px] text-muted-foreground line-through">
                    ${tier.fullPrice}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-100 text-[12px] font-bold text-emerald-700 uppercase tracking-wide">
                    {tier.discount}% OFF
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className={`inline-block w-2 h-2 rounded-full ${
                tier.dotColor === "emerald" ? "bg-emerald-500" :
                tier.dotColor === "amber" ? "bg-amber-500" : "bg-red-500"
              }`} />
              <span className="text-[13px] font-semibold text-foreground">{tier.label}</span>
              <span className="text-[13px] text-muted-foreground">
                &middot; {mod.trackA?.day ?? "Mondays"} &middot; {mod.trackA?.time ?? "8:00 – 9:30 PM IST"}
              </span>
            </div>
          </div>

          {/* CTA */}
          <RazorpayButton label="Enroll Now" price={tier.price} buttonId={tier.razorpayId!} />
        </div>
      </div>

      {/* Company logos — below the card */}
      <div className="container-default px-4 pb-12 md:pb-16">
        <div className="flex flex-col items-center">
          <p className="text-[11px] font-medium text-muted-foreground/50 uppercase tracking-[0.15em] mb-4">
            Top companies upskill their teams with our workshops
          </p>
          <div className="flex items-center justify-center gap-x-8 gap-y-3 flex-wrap">
            {COMPANY_LOGOS.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={18}
                className="h-[16px] w-auto object-contain opacity-20"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
