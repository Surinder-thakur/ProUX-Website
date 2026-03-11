"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CourseWithSyllabus } from "@/lib/data/courses";

const INCLUDES = [
  "Full course access",
  "Downloadable resources",
  "Hands-on projects",
  "Certificate of completion",
  "Community access",
  "30-day money-back guarantee",
];

export function CoursePricingCard({ course }: { course: CourseWithSyllabus }) {
  return (
    <>
      {/* Desktop sticky sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-border/50 bg-white p-8 shadow-lg">
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-proux-navy">
              ${course.price}
            </span>
            <span className="ml-1 text-sm text-muted-foreground">USD</span>
          </div>

          <Button
            size="lg"
            className="mb-6 w-full rounded-full text-sm font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: "hsl(var(--proux-copper))" }}
          >
            Enroll Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            This course includes
          </div>
          <ul className="space-y-3">
            {INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-proux-copper" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            30-day money-back guarantee
          </p>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="container-default flex items-center justify-between gap-4">
          <div>
            <span className="text-2xl font-extrabold text-proux-navy">
              ${course.price}
            </span>
            <span className="ml-1 text-xs text-muted-foreground">USD</span>
          </div>
          <Button
            size="lg"
            className="rounded-full px-8 text-sm font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: "hsl(var(--proux-copper))" }}
          >
            Enroll Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
