"use client";

import Image from "next/image";
import type { BootcampModule } from "@/lib/data/bootcamps";
import WorkshopHero from "@/components/pages/workshop-detail/workshop-hero";
import DetailAudience from "@/components/pages/bootcamp-detail/detail-audience";
import DetailCurriculum from "@/components/pages/bootcamp-detail/detail-curriculum";
import DetailCertification from "@/components/pages/bootcamp-detail/detail-certification";
import DetailCompactCta from "@/components/pages/bootcamp-detail/detail-compact-cta";
import DetailFaq from "@/components/pages/bootcamp-detail/detail-faq";
// import DetailSidebar from "@/components/pages/bootcamp-detail/detail-sidebar";
import DetailMobileBar from "@/components/pages/bootcamp-detail/detail-mobile-bar";
import DetailStickyBar from "@/components/pages/bootcamp-detail/detail-sticky-bar";
import BootcampModuleCards from "@/components/pages/bootcamps/bootcamp-module-cards";
import BootcampTestimonials from "@/components/pages/bootcamp-detail/bootcamp-testimonials";

const badges = [
  { src: "/images/badge-nng.png", alt: "NN/g Certification Badge" },
  { src: "/images/badge-cua.png", alt: "hfi CUA Certification Badge" },
  { src: "/images/badge-cdpa.png", alt: "hfi CDPA Certification Badge" },
];

export default function WorkshopDetailContent({
  module: mod,
}: {
  module: BootcampModule;
}) {
  return (
    <>
      {/* Sticky enrollment bar — appears on scroll (desktop only) */}
      <DetailStickyBar module={mod} variant="workshop" />

      {/* ── First fold: Full-width hero — warm beige bg matching site ── */}
      <div className="bg-background">
        <WorkshopHero module={mod} />
      </div>

      {/* ── Two-column: Content left + ATC right ────────────────── */}
      <div className="lg:grid lg:grid-cols-[1fr_450px] max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Left column ──────────────────────────────────────────── */}
        <div className="min-w-0 lg:pr-10">
          {/* ── Audience — inline in left column ── */}
          <DetailAudience audience={mod.audience} variant="workshop" />

          <DetailCurriculum curriculum={mod.curriculum} mod={mod} variant="workshop" />

          <DetailCertification module={mod} />

          {/* ── Instructor (contained for column layout) ───────── */}
          <section className="py-7 md:py-10">
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
                    Every workshop exercise comes from real projects I&apos;ve
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
          <BootcampTestimonials slug={mod.slug} />
        </div>

        {/* ── Right column — compact sticky CTA (desktop only) ─────── */}
        <div className="hidden lg:block">
          <DetailCompactCta module={mod} variant="workshop" />
        </div>
      </div>

      {/* ── Full-width: all workshops ────────────────────────────────── */}
      <BootcampModuleCards contained currentSlug={mod.slug} variant="workshop" />

      <DetailMobileBar module={mod} variant="workshop" />
    </>
  );
}
