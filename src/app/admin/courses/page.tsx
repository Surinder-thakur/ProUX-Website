"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Course } from "@/lib/types/database";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* =============================================================================
 * DESIGNERS: Admin Courses Page
 * =============================================================================
 * Table of courses with title, level, price, and status.
 * Includes a placeholder "New Course" button.
 * Falls back to placeholder data when Supabase is not connected.
 *
 * To update:
 * - Edit PLACEHOLDER_COURSES for static fallback data
 * - Adjust table columns and visibility per breakpoint
 * - Change level badge colors in getLevelBadgeColor()
 * ========================================================================== */

const PLACEHOLDER_COURSES: Course[] = [
  {
    id: "1",
    title: "AI-First UX Design Fundamentals",
    slug: "ai-first-ux-design-fundamentals",
    description:
      "Master the foundations of designing user experiences for AI-powered products.",
    long_description: null,
    duration: "4 weeks",
    level: "beginner" as const,
    price: 499,
    image_url: null,
    instructor: "Surinder Thakur",
    syllabus: null,
    is_published: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Advanced UX Research with AI Tools",
    slug: "advanced-ux-research-ai-tools",
    description:
      "Learn to leverage AI-powered research tools for faster, deeper user insights.",
    long_description: null,
    duration: "6 weeks",
    level: "advanced" as const,
    price: 799,
    image_url: null,
    instructor: "Surinder Thakur",
    syllabus: null,
    is_published: true,
    created_at: "2025-01-15T00:00:00Z",
    updated_at: "2025-01-15T00:00:00Z",
  },
  {
    id: "3",
    title: "Design Systems for Enterprise Teams",
    slug: "design-systems-enterprise-teams",
    description:
      "Build, maintain, and scale design systems across large product organizations.",
    long_description: null,
    duration: "8 weeks",
    level: "intermediate" as const,
    price: 699,
    image_url: null,
    instructor: "Surinder Thakur",
    syllabus: null,
    is_published: true,
    created_at: "2025-02-01T00:00:00Z",
    updated_at: "2025-02-01T00:00:00Z",
  },
  {
    id: "4",
    title: "UX Strategy and Business Impact",
    slug: "ux-strategy-business-impact",
    description:
      "Connect UX improvements to measurable business outcomes and build executive buy-in.",
    long_description: null,
    duration: "5 weeks",
    level: "intermediate" as const,
    price: 599,
    image_url: null,
    instructor: "Surinder Thakur",
    syllabus: null,
    is_published: true,
    created_at: "2025-02-15T00:00:00Z",
    updated_at: "2025-02-15T00:00:00Z",
  },
  {
    id: "5",
    title: "Conversational UX & AI Agent Design",
    slug: "conversational-ux-ai-agent-design",
    description:
      "Design intuitive conversational interfaces and AI agent experiences.",
    long_description: null,
    duration: "6 weeks",
    level: "advanced" as const,
    price: 849,
    image_url: null,
    instructor: "Surinder Thakur",
    syllabus: null,
    is_published: false,
    created_at: "2025-03-01T00:00:00Z",
    updated_at: "2025-03-01T00:00:00Z",
  },
  {
    id: "6",
    title: "Inclusive Design & Accessibility Essentials",
    slug: "inclusive-design-accessibility-essentials",
    description:
      "Go beyond compliance to create truly inclusive digital experiences for all users.",
    long_description: null,
    duration: "4 weeks",
    level: "beginner" as const,
    price: 399,
    image_url: null,
    instructor: "Surinder Thakur",
    syllabus: null,
    is_published: true,
    created_at: "2025-03-15T00:00:00Z",
    updated_at: "2025-03-15T00:00:00Z",
  },
];

/* DESIGNERS: Level badge colors */
function getLevelBadgeColor(level: string): string {
  const colorMap: Record<string, string> = {
    beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
    intermediate: "bg-blue-50 text-blue-700 border-blue-200",
    advanced: "bg-purple-50 text-purple-700 border-purple-200",
  };
  return colorMap[level] || "bg-secondary text-secondary-foreground";
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(PLACEHOLDER_COURSES);
  const [, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setCourses(data);
        }
      } catch {
        // Supabase not configured — keep placeholder data
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  return (
    <div className="space-y-6">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2 text-proux-navy">Courses</h1>
          <p className="body-base mt-1">
            Manage your AI-first UX training courses.
          </p>
        </div>
        {/* DESIGNERS: New Course button — placeholder, wire up to course editor */}
        <Button className="rounded-lg">
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          New Course
        </Button>
      </div>

      {/* ── Courses Table ─────────────────────────────────────────── */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">Level</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell text-right">
                  Duration
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <span className="text-sm font-medium text-foreground line-clamp-1">
                        {course.title}
                      </span>
                      <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {course.instructor}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="outline"
                      className={`text-[10px] uppercase tracking-wider capitalize ${getLevelBadgeColor(course.level)}`}
                    >
                      {course.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {formatPrice(course.price)}
                  </TableCell>
                  <TableCell>
                    {course.is_published ? (
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] uppercase tracking-wider"
                      >
                        Published
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] uppercase tracking-wider"
                      >
                        Draft
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground text-right">
                    {course.duration}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
