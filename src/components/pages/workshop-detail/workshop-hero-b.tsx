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

/* ── Option B: Single Column Hero + Inline Enrollment Card ───────────── */

export default function WorkshopHeroB({ module: mod }: { module: BootcampModule }) {
  const tier = useActiveTier(mod);

  return (
    <div className="relative bg-[#f8f7f4] pt-32 md:pt-40 pb-16 md:pb-20">
      {/* Subtle radial warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(181,83,49,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container-default px-4">
        {/* Tag + date */}
        <div className="text-center mb-6">
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-primary">
            Live Workshop &middot; Starts {mod.startDate}
          </p>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[44px] lg:text-[52px] font-extrabold md:font-black text-foreground leading-[1.08] tracking-[-1.5px] md:tracking-[-2px] text-center max-w-[720px] mx-auto mb-5">
          {mod.title}
        </h1>

        {/* Tagline */}
        <p className="text-[15px] md:text-[18px] font-normal text-muted-foreground leading-[1.55] text-center max-w-[580px] mx-auto mb-8">
          {mod.tagline}
        </p>

        {/* Info pills — centered row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            `${mod.classCount} Live Classes`,
            `${mod.hoursLive} Hours Total`,
            "12 Per Cohort",
          ].map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-[#dfdbc9] text-[12px] font-medium text-foreground"
            >
              {pill}
            </span>
          ))}
          {/* Rating pill */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#dfdbc9] text-[12px] font-medium text-foreground">
            <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            4.98
          </span>
        </div>

        {/* ── Enrollment Card — centered ── */}
        <div className="max-w-[520px] mx-auto rounded-2xl bg-white border border-[#dfdbc9] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 md:p-8 mb-12">
          {/* Instructor row */}
          <div className="flex items-center gap-4 mb-5">
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
            </div>
          </div>

          {/* Price + urgency */}
          <div className="flex items-baseline gap-2.5 flex-wrap mb-1.5">
            <span className="text-[32px] font-extrabold text-foreground leading-none">
              ${tier.price}
            </span>
            {tier.discount > 0 && (
              <>
                <span className="text-[16px] text-muted-foreground line-through">
                  ${tier.fullPrice}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-100 text-[12px] font-bold text-emerald-700 uppercase tracking-wide">
                  {tier.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Tier label */}
          <div className="flex items-center gap-2 mb-5">
            <span className={`inline-block w-2 h-2 rounded-full ${
              tier.dotColor === "emerald" ? "bg-emerald-500" :
              tier.dotColor === "amber" ? "bg-amber-500" : "bg-red-500"
            }`} />
            <span className="text-[13px] font-semibold text-foreground">
              {tier.label}
            </span>
            {tier.deadline && (
              <span className="text-[13px] text-muted-foreground">
                &middot; {mod.trackA?.day ?? "Mondays"} &middot; {mod.trackA?.time ?? "8:00 – 9:30 PM IST"}
              </span>
            )}
          </div>

          {/* CTA */}
          <RazorpayButton label="Enroll Now" price={tier.price} buttonId={tier.razorpayId!} />
        </div>

        {/* Company logos */}
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
