import Link from "next/link";
import { Clock, Layers, ArrowRight } from "lucide-react";
import { LevelBadge } from "./level-badge";
import type { CourseWithSyllabus } from "@/lib/data/courses";

export function CourseCard({ course }: { course: CourseWithSyllabus }) {
  return (
    <Link
      href={`/training/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border-primary-200))] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(26,33,48,0.12)]"
    >
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3">
          <LevelBadge level={course.level} />
        </div>

        <h3 className="mb-1.5 text-[17px] font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {course.title}
        </h3>

        <p className="mb-4 text-[13px] leading-relaxed text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-[hsl(var(--border-primary-100))] pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Layers className="h-3 w-3" />
              {course.syllabus.length} Modules
            </span>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-primary">
            View
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
