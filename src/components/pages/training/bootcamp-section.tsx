import Link from "next/link";
import { ArrowRight, Calendar, Users, Sparkles } from "lucide-react";
import { LevelBadge } from "./level-badge";
import type { CourseWithSyllabus } from "@/lib/data/courses";

/* ── Unique gradient + accent per bootcamp ─────────────────────────────── */

const CARD_THEMES: Record<
  string,
  { gradient: string; accent: string }
> = {
  "ai-first-ux-design-fundamentals": {
    gradient: "from-[#1A2130] via-[#243047] to-[#B55331]",
    accent: "AI-First Design",
  },
  "advanced-ux-research-with-ai": {
    gradient: "from-[#1A2130] via-[#1e3555] to-[#4338ca]",
    accent: "AI Research",
  },
  "design-systems-for-enterprise": {
    gradient: "from-[#1A2130] via-[#1e3545] to-[#0d9488]",
    accent: "Design Systems",
  },
};

function BootcampCard({ course }: { course: CourseWithSyllabus }) {
  const theme = CARD_THEMES[course.slug] ?? CARD_THEMES["ai-first-ux-design-fundamentals"];

  return (
    <Link
      href={`/training/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border-primary-200))] bg-white shadow-[0_4px_4px_rgba(216,216,216,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(26,33,48,0.15)]"
    >
      {/* Image area — tall gradient with decorative elements */}
      <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${theme.gradient}`}>
        {/* Decorative UI mockup elements */}
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="absolute left-[8%] top-[12%] h-16 w-28 rounded-lg border border-white/30 bg-white/15 backdrop-blur-[2px]" />
          <div className="absolute right-[10%] top-[20%] h-12 w-20 rounded-lg border border-white/25 bg-white/10 backdrop-blur-[2px]" />
          <div className="absolute bottom-[15%] left-[20%] h-14 w-36 rounded-lg border border-white/20 bg-white/10 backdrop-blur-[2px]" />
          <div className="absolute bottom-[25%] right-[15%] h-10 w-24 rounded-lg border border-white/25 bg-white/15 backdrop-blur-[2px]" />
        </div>

        {/* Topic label */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-white/80" />
          <span className="text-[11px] font-semibold text-white/90">
            {theme.accent}
          </span>
        </div>

        {/* Live cohort badge */}
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
            Live
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2">
          <LevelBadge level={course.level} />
        </div>

        <h3
          className="mb-2 text-[18px] font-bold leading-[24px] text-[hsl(var(--text-secondary-950))] transition-colors group-hover:text-primary sm:text-[20px] sm:leading-[26px]"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          {course.title}
        </h3>

        <p className="mb-5 text-[13px] leading-[20px] text-[hsl(var(--text-neutrals-800))] line-clamp-2">
          {course.description}
        </p>

        {/* Meta row */}
        <div className="mt-auto flex items-center justify-between border-t border-[hsl(var(--border-primary-100))] pt-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {course.syllabus.length} Modules
            </span>
          </div>

          <span className="flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
            More Details
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BootcampSection({
  courses,
}: {
  courses: CourseWithSyllabus[];
}) {
  return (
    <section id="bootcamps" className="bg-background pb-20 sm:pb-24 scroll-mt-20">
      <div className="container-default">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <p className="text-xs font-bold text-[hsl(var(--text-primary-600))] uppercase tracking-[1.2px] mb-2">
            Live Bootcamps
          </p>
          <h2
            className="text-2xl font-extrabold text-[hsl(var(--text-secondary-950))] tracking-tight sm:text-3xl"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Cohort-Based Training
          </h2>
          <p className="mt-2 mx-auto max-w-lg text-sm text-muted-foreground">
            Join a live cohort. Expert-led masterclasses, weekly office hours, and hands-on projects with fellow designers.
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <BootcampCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
