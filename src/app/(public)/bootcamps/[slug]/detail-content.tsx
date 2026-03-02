"use client";

import type { BootcampModule } from "@/lib/data/bootcamps";
import DetailHero from "@/components/pages/bootcamp-detail/detail-hero";
import DetailOutcomes from "@/components/pages/bootcamp-detail/detail-outcomes";
import DetailAudience from "@/components/pages/bootcamp-detail/detail-audience";
import DetailCurriculum from "@/components/pages/bootcamp-detail/detail-curriculum";
import DetailSchedule from "@/components/pages/bootcamp-detail/detail-schedule";
import DetailCertification from "@/components/pages/bootcamp-detail/detail-certification";
import DetailInstructor from "@/components/pages/bootcamp-detail/detail-instructor";
import DetailFaq from "@/components/pages/bootcamp-detail/detail-faq";
import DetailOtherCourses from "@/components/pages/bootcamp-detail/detail-other-courses";
import DetailSidebar from "@/components/pages/bootcamp-detail/detail-sidebar";
import DetailMobileBar from "@/components/pages/bootcamp-detail/detail-mobile-bar";
import DetailStickyBar from "@/components/pages/bootcamp-detail/detail-sticky-bar";
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

      {/* Hero — warm cream bg, full width */}
      <DetailHero module={mod} />

      {/* Two-column layout — NO overflow-x-hidden on parent (breaks sticky) */}
      <div className="container-default pb-24 lg:pb-32">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-12 lg:items-start">
          {/* Left column — content sections */}
          <div className="min-w-0">
            {/* What you'll learn */}
            <DetailOutcomes outcomes={mod.outcomes} />

            {/* Audience — warm cream bg */}
            <div className="rounded-2xl bg-[hsl(var(--gold-100))] p-6 md:p-8 -mx-2">
              <DetailAudience audience={mod.audience} />
            </div>

            {/* Curriculum */}
            <DetailCurriculum curriculum={mod.curriculum} />

            {/* Schedule */}
            <DetailSchedule />

            {/* Certification */}
            <DetailCertification module={mod} />

            {/* Instructor — dark section */}
            <div className="rounded-2xl bg-[#242424] p-6 md:p-8 -mx-2">
              <DetailInstructor />
            </div>

            {/* FAQ */}
            <DetailFaq faqs={mod.faqs} />

            {/* Other courses */}
            <DetailOtherCourses currentSlug={mod.slug} />
          </div>

          {/* Right column — sticky ATC sidebar (desktop only) */}
          <div className="hidden lg:block">
            <DetailSidebar module={mod} />
          </div>
        </div>
      </div>

      {/* Testimonials — full width, outside the grid */}
      <ConsultingTestimonials />

      {/* Mobile bottom bar */}
      <DetailMobileBar module={mod} />
    </>
  );
}
