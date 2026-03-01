import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CourseWithSyllabus } from "@/lib/data/courses";

/* ── Category badge styles ─────────────────────────────────────────────── */

const CATEGORY_MAP: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  beginner: {
    label: "Fundamentals",
    bg: "bg-[hsl(var(--bg-tertiary-100))]",
    text: "text-[hsl(var(--text-tertiary-600))]",
  },
  intermediate: {
    label: "Intermediate",
    bg: "bg-[hsl(var(--bg-primary-100))]",
    text: "text-[hsl(var(--text-primary-600))]",
  },
  advanced: {
    label: "Advanced",
    bg: "bg-[hsl(var(--bg-secondary-100))]",
    text: "text-[hsl(var(--text-secondary-950))]",
  },
};

/* ── Duration icon (calendar-style square) ─────────────────────────────── */

function DurationIcon({ duration }: { duration: string }) {
  const parts = duration.split(" ");
  const number = parts[0];
  const unit = parts[1]?.toUpperCase().slice(0, 3) ?? "HRS";

  return (
    <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center overflow-hidden rounded-lg bg-[hsl(var(--bg-primary-100))] transition-colors group-hover:bg-white">
      <div className="flex h-[24px] w-full items-center justify-center border-b border-[hsl(var(--border-primary-200))]">
        <span className="text-[10px] font-medium text-[hsl(var(--text-secondary-950))]">
          {unit}
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <span
          className="text-[20px] font-bold text-[hsl(var(--text-secondary-950))]"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          {number}
        </span>
      </div>
    </div>
  );
}

/* ── Single recorded card row ──────────────────────────────────────────── */

function RecordedCard({ course }: { course: CourseWithSyllabus }) {
  const cat = CATEGORY_MAP[course.level] ?? CATEGORY_MAP.beginner;

  return (
    <Link
      href={`/training/${course.slug}`}
      className="group flex items-center gap-5 rounded-xl bg-white px-5 py-4 shadow-[0_4px_4px_rgba(216,216,216,0.25)] transition-all duration-200 hover:bg-[hsl(var(--bg-primary-100))] hover:shadow-[0_6px_16px_rgba(216,216,216,0.35)] sm:gap-6 sm:px-6 sm:py-5"
    >
      <DurationIcon duration={course.duration} />

      {/* Title + description */}
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold leading-[22px] text-[hsl(var(--text-secondary-950))] tracking-[-0.15px] group-hover:text-primary transition-colors sm:text-[16px]">
          {course.title}
        </p>
        <p className="mt-1 text-[13px] font-normal leading-[18px] text-[hsl(var(--text-neutrals-800))] line-clamp-1">
          {course.description}
        </p>
      </div>

      {/* Category badge — hidden on mobile */}
      <span
        className={`hidden flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium tracking-[0.48px] sm:inline-flex ${cat.bg} ${cat.text}`}
      >
        {cat.label}
      </span>

      {/* Arrow CTA */}
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white">
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

/* ── Group courses by level ────────────────────────────────────────────── */

const GROUP_ORDER: Array<{ key: string; label: string }> = [
  { key: "beginner", label: "Fundamentals" },
  { key: "intermediate", label: "Intermediate" },
  { key: "advanced", label: "Advanced" },
];

export function RecordedSection({
  courses,
}: {
  courses: CourseWithSyllabus[];
}) {
  const grouped = GROUP_ORDER.map((g) => ({
    ...g,
    items: courses.filter((c) => c.level === g.key),
  })).filter((g) => g.items.length > 0);

  return (
    <section className="bg-[hsl(var(--bg-primary-50))] py-20 sm:py-24 lg:py-28">
      <div className="container-default">
        {/* Section header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-bold text-[hsl(var(--text-primary-600))] uppercase tracking-[1.2px] mb-2">
            Self-Paced Courses
          </p>
          <h2
            className="text-2xl font-extrabold text-[hsl(var(--text-secondary-950))] tracking-tight sm:text-3xl"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Learn at Your Own Pace
          </h2>
          <p className="mt-2 mx-auto max-w-lg text-sm text-muted-foreground">
            Bite-sized video lessons with hands-on exercises. Start anytime,
            learn anywhere, and go from UX designer to AI design engineer on
            your own schedule.
          </p>
        </div>

        {/* Grouped list */}
        <div className="mx-auto flex max-w-[920px] flex-col gap-7">
          {grouped.map((group) => (
            <div key={group.key} className="flex flex-col gap-3">
              {/* Category label */}
              <p className="text-xs font-medium uppercase leading-4 tracking-[0.48px] text-[hsl(var(--text-tertiary-600))]">
                {group.label}
              </p>

              {/* Cards */}
              <div className="flex flex-col gap-3">
                {group.items.map((course) => (
                  <RecordedCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
