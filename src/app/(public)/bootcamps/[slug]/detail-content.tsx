"use client";

import type { BootcampModule } from "@/lib/data/bootcamps";
import DetailHero from "@/components/pages/bootcamp-detail/detail-hero";
import DetailAudience from "@/components/pages/bootcamp-detail/detail-audience";
import DetailCurriculum from "@/components/pages/bootcamp-detail/detail-curriculum";
import DetailDeliverables from "@/components/pages/bootcamp-detail/detail-deliverables";
import DetailSchedule from "@/components/pages/bootcamp-detail/detail-schedule";
import DetailCertification from "@/components/pages/bootcamp-detail/detail-certification";
import DetailFaq from "@/components/pages/bootcamp-detail/detail-faq";
import DetailSidebar from "@/components/pages/bootcamp-detail/detail-sidebar";
import DetailMobileBar from "@/components/pages/bootcamp-detail/detail-mobile-bar";
import DetailStickyBar from "@/components/pages/bootcamp-detail/detail-sticky-bar";
import BootcampModuleCards from "@/components/pages/bootcamps/bootcamp-module-cards";
import BootcampStatsBar from "@/components/pages/bootcamps/bootcamp-stats-bar";
import ConsultingTestimonials from "@/components/pages/consulting/consulting-testimonials";

export default function DetailContent({
  module: mod,
}: {
  module: BootcampModule;
}) {
  return (
    <>
      {/* Sticky enrollment bar — appears on scroll (desktop only) */}
      <DetailStickyBar module={mod} />

      {/* ── Two-column layout: Hero left + sticky ATC right ─────────────── */}
      <div className="lg:grid lg:grid-cols-[1fr_500px]">
        {/* ── Left column — hero image ────────────────────────────── */}
        <div className="min-w-0 border-b border-[hsl(var(--border-primary-200))]">
          <DetailHero module={mod} />
        </div>

        {/* ── Right column — sticky ATC ───────────────────────────── */}
        <div className="hidden lg:block border-l border-[#dfdbc9] border-b border-b-[hsl(var(--border-primary-200))] bg-card">
          <DetailSidebar module={mod} />
        </div>
      </div>

      {/* ── Stats bar — static, sits below both panels ───────────────── */}
      <div className="[&>div]:!static">
        <BootcampStatsBar />
      </div>

      {/* ── Standard-width single-column content ─────────────────────── */}
      <div className="container-default pb-16 lg:pb-20">
        {/* Audience — warm cream bg */}
        <div className="rounded-2xl bg-[hsl(var(--gold-100))] p-6 md:p-8 my-10 md:my-14">
          <DetailAudience audience={mod.audience} />
        </div>

        <DetailCurriculum curriculum={mod.curriculum} />

        <DetailDeliverables deliverables={mod.deliverables} />

        <DetailSchedule />

        {/* Instructor */}
        <section className="py-10 md:py-14">
          <div className="relative bg-card rounded-[32px] shadow-sm p-8 md:p-10 overflow-hidden">
            <div className="flex flex-col items-center text-center md:text-left md:flex-row md:items-start gap-6">
              <div className="relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-full border-[5px] border-primary">
                <img
                  src="/images/surinder-profile.jpg"
                  alt="Surinder Thakur — AI Design Engineer Instructor"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wider text-[hsl(var(--text-primary-600))] mb-3">
                  Your Instructor
                </p>
                <h2 className="text-[24px] md:text-[28px] font-bold text-foreground leading-tight mb-4" style={{ fontFamily: "var(--font-family-display)", letterSpacing: "-0.4px" }}>
                  Learn From Someone Who Ships.
                </h2>
                <div className="flex flex-col gap-2.5 text-[14px] leading-relaxed text-muted-foreground">
                  <p>
                    I don&apos;t just teach design — I build and ship products. Every bootcamp exercise comes from real projects I&apos;ve delivered for startups and enterprises over 18 years.
                  </p>
                  <p>
                    You&apos;ll get direct feedback from me in every session. Small cohorts, no TAs, no recordings as a substitute for live teaching.
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-base font-bold text-foreground">Surinder Thakur</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    AI-First UX Consultant &amp; Design Engineer
                  </p>
                  <p className="text-sm text-muted-foreground">
                    NN/g Certified | hfi CUA&reg; | hfi CDPA&reg;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DetailCertification module={mod} />

        <DetailFaq faqs={mod.faqs} />
      </div>

      {/* ── Full-width sections below ─────────────────────────────────── */}
      <BootcampModuleCards />
      <ConsultingTestimonials />
      <DetailMobileBar module={mod} />
    </>
  );
}
