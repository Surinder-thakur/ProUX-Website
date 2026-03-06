"use client";

import Image from "next/image";
import type { BootcampModule } from "@/lib/data/bootcamps";
import DetailHero from "@/components/pages/bootcamp-detail/detail-hero";
import DetailAudience from "@/components/pages/bootcamp-detail/detail-audience";
import DetailCurriculum from "@/components/pages/bootcamp-detail/detail-curriculum";
import DetailCertification from "@/components/pages/bootcamp-detail/detail-certification";
import DetailCompactCta from "@/components/pages/bootcamp-detail/detail-compact-cta";
import DetailFaq from "@/components/pages/bootcamp-detail/detail-faq";
import DetailSidebar from "@/components/pages/bootcamp-detail/detail-sidebar";
import DetailMobileBar from "@/components/pages/bootcamp-detail/detail-mobile-bar";
import DetailStickyBar from "@/components/pages/bootcamp-detail/detail-sticky-bar";
import BootcampModuleCards from "@/components/pages/bootcamps/bootcamp-module-cards";
import BootcampStatsBar from "@/components/pages/bootcamps/bootcamp-stats-bar";
import ConsultingTestimonials from "@/components/pages/consulting/consulting-testimonials";

const badges = [
  { src: "/images/badge-nng.png", alt: "NN/g Certification Badge" },
  { src: "/images/badge-cua.png", alt: "hfi CUA Certification Badge" },
  { src: "/images/badge-cdpa.png", alt: "hfi CDPA Certification Badge" },
];

export default function DetailContent({
  module: mod,
}: {
  module: BootcampModule;
}) {
  return (
    <>
      {/* Sticky enrollment bar — appears on scroll (desktop only) */}
      <DetailStickyBar module={mod} />

      {/* ── First fold: Hero left + sticky ATC right (FROZEN) ─────────── */}
      <div className="lg:grid lg:grid-cols-[1fr_500px]">
        <div className="min-w-0 border-b border-[hsl(var(--border-primary-200))]">
          <DetailHero module={mod} />
        </div>
        <div className="hidden lg:block border-l border-[#dfdbc9] border-b border-b-[hsl(var(--border-primary-200))] bg-card">
          <DetailSidebar module={mod} />
        </div>
      </div>

      {/* ── Stats bar (FROZEN) ──────────────────────────────────────────── */}
      <div className="[&>div]:!static">
        <BootcampStatsBar variant="module" />
      </div>

      {/* ── Audience — full-width ───────────────────────────────────────── */}
      <DetailAudience audience={mod.audience} />

      {/* ── Two-column: Content left + compact CTA right ────────────────── */}
      <div className="lg:grid lg:grid-cols-[1fr_340px] max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Left column ──────────────────────────────────────────── */}
        <div className="min-w-0 lg:pr-10">
          <DetailCurriculum curriculum={mod.curriculum} mod={mod} />

          <DetailCertification module={mod} />

          {/* ── Instructor (contained for column layout) ───────── */}
          <section className="py-14 md:py-20">
            <div className="relative bg-card rounded-[24px] border border-[#e8e4d9] p-8 md:p-10">
              {/* Mobile: centered photo */}
              <div className="flex justify-center mb-8 md:hidden">
                <div className="relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-full border-[4px] border-primary">
                  <Image
                    src="/images/surinder-profile.jpg"
                    alt="Surinder Thakur"
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Desktop: photo floats left */}
              <div className="hidden md:block absolute top-10 -left-[70px]">
                <div className="relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-full border-[4px] border-primary">
                  <Image
                    src="/images/surinder-profile.jpg"
                    alt="Surinder Thakur"
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="md:pl-20">
                <p className="text-[12px] font-bold uppercase tracking-wider text-[hsl(var(--text-primary-600))] mb-3">
                  Your Instructor
                </p>
                <h2 className="text-[24px] md:text-[28px] font-bold text-foreground leading-tight mb-4 tracking-[-0.3px]">
                  Learn From Someone Who Ships.
                </h2>

                <div className="flex flex-col gap-2.5 text-[14px] leading-relaxed text-muted-foreground mb-6">
                  <p>
                    I don&apos;t just teach design — I build and ship products.
                    Every bootcamp exercise comes from real projects I&apos;ve
                    delivered for startups and enterprises over 18 years.
                  </p>
                  <p>
                    You&apos;ll get direct feedback from me in every session.
                    Small cohorts, no TAs, no recordings as a substitute for
                    live teaching.
                  </p>
                </div>

                <Image
                  src="/images/consulting/signature-surinder.png"
                  alt="Surinder.T"
                  width={641}
                  height={173}
                  className="h-[36px] w-auto object-contain opacity-60 mb-2"
                />
                <p className="text-[15px] font-bold text-foreground">
                  Surinder Thakur
                </p>
                <p className="text-[13px] text-muted-foreground leading-relaxed mt-0.5">
                  AI-First UX Consultant &amp; Design Engineer
                </p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  NN/g Certified | hfi CUA&reg; | hfi CDPA&reg;
                </p>

                {/* Certification badges */}
                <div className="mt-4 flex items-center gap-3">
                  {badges.map((badge) => (
                    <div key={badge.alt} className="relative h-[80px] w-auto">
                      <Image
                        src={badge.src}
                        alt={badge.alt}
                        height={80}
                        width={80}
                        className="h-[80px] w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <DetailFaq faqs={mod.faqs} />

          {/* ── Text + Video testimonials (contained in left column) ── */}
          <ConsultingTestimonials contained />
        </div>

        {/* ── Right column — compact sticky CTA (desktop only) ─────── */}
        <div className="hidden lg:block">
          <DetailCompactCta module={mod} />
        </div>
      </div>

      {/* ── Full-width: all bootcamps ────────────────────────────────── */}
      <BootcampModuleCards contained currentSlug={mod.slug} />

      <DetailMobileBar module={mod} />
    </>
  );
}
