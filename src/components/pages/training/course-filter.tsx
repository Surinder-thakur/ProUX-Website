"use client";

import { useState } from "react";
import { CourseCard } from "./course-card";
import type { CourseWithSyllabus } from "@/lib/data/courses";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
] as const;

export function CourseFilter({ courses }: { courses: CourseWithSyllabus[] }) {
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all"
      ? courses
      : courses.filter((c) => c.level === active);

  return (
    <>
      {/* Filter pills */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ${
              active === f.value
                ? "border-proux-copper bg-proux-copper text-white"
                : "border-border bg-white text-foreground hover:border-proux-copper/40"
            }`}
            style={
              active === f.value
                ? { borderColor: "hsl(var(--proux-copper))", backgroundColor: "hsl(var(--proux-copper))" }
                : undefined
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          No courses found for this level.
        </p>
      )}
    </>
  );
}
