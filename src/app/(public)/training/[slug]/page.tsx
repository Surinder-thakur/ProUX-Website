import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses, getCourseBySlug, getRelatedCourses, getCourseStats } from "@/lib/data/courses";
import { CourseDetailHero } from "@/components/pages/training/detail/course-detail-hero";
import { CourseMetrics } from "@/components/pages/training/detail/course-metrics";
import { CoursePricingCard } from "@/components/pages/training/detail/course-pricing-card";
import { CourseOutcomes } from "@/components/pages/training/detail/course-outcomes";
import { CourseCurriculum } from "@/components/pages/training/detail/course-curriculum";
import { TrainingInstructor } from "@/components/pages/training/training-instructor";
import { RelatedCourses } from "@/components/pages/training/detail/related-courses";
import { CourseBottomCta } from "@/components/pages/training/detail/course-bottom-cta";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const course = getCourseBySlug(params.slug);
  if (!course) return {};

  return {
    title: `${course.title} | AI Design Training`,
    description: course.description,
    openGraph: {
      title: `${course.title} | ProUX Training`,
      description: course.description,
    },
  };
}

export default function CourseDetailPage({ params }: PageProps) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  const stats = getCourseStats(course);
  const related = getRelatedCourses(course.slug, 3);

  return (
    <>
      {/* Hero + Pricing sidebar (desktop) */}
      <div className="relative">
        <CourseDetailHero course={course} />

        {/* Desktop pricing card overlaid on hero */}
        <div className="container-default">
          <div className="lg:absolute lg:right-8 lg:top-16 xl:right-[calc((100vw-1200px)/2+2rem)] lg:w-[340px] lg:pt-20">
            <CoursePricingCard course={course} />
          </div>
        </div>
      </div>

      <CourseMetrics {...stats} />
      <CourseOutcomes outcomes={course.learning_outcomes} />
      <CourseCurriculum syllabus={course.syllabus} />
      <TrainingInstructor />
      <RelatedCourses courses={related} />
      <CourseBottomCta title={course.title} price={course.price} />

      {/* Spacer for mobile bottom bar */}
      <div className="h-20 lg:hidden" />
    </>
  );
}
