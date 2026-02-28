import Link from "next/link";
import { ChevronRight, Clock, Layers, User } from "lucide-react";
import { LevelBadge } from "../level-badge";
import type { CourseWithSyllabus } from "@/lib/data/courses";

export function CourseDetailHero({ course }: { course: CourseWithSyllabus }) {
  return (
    <section className="relative overflow-hidden bg-proux-navy">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(var(--proux-copper)) 0%, transparent 50%), radial-gradient(circle at 80% 80%, hsl(var(--proux-copper)) 0%, transparent 40%)",
        }}
      />

      <div className="container-default relative pb-20 pt-16 sm:pt-20 lg:pt-24">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1 text-sm text-white/50">
          <Link href="/training" className="transition-colors hover:text-white/80">
            Training
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/70">{course.title}</span>
        </nav>

        <div className="max-w-3xl">
          <div className="mb-4">
            <LevelBadge level={course.level} />
          </div>

          <h1 className="heading-display mb-4 text-white !text-[40px] !leading-[48px] lg:!text-[56px] lg:!leading-[64px]">
            {course.title}
          </h1>

          <p className="body-large mb-8 max-w-2xl !text-white/70">
            {course.long_description || course.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {course.instructor}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              {course.syllabus.length} Modules
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
