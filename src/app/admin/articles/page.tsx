"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Article } from "@/lib/types/database";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* =============================================================================
 * DESIGNERS: Admin Articles Page
 * =============================================================================
 * Table of articles with title, category, status, and date.
 * Includes a placeholder "New Article" button.
 * Falls back to placeholder data when Supabase is not connected.
 *
 * To update:
 * - Edit PLACEHOLDER_ARTICLES for static fallback data
 * - Adjust table columns and visibility per breakpoint
 * - Change category badge colors in getCategoryColor()
 * ========================================================================== */

const PLACEHOLDER_ARTICLES: Article[] = [
  {
    id: "1",
    title: "How AI Is Reshaping the UX Research Landscape in 2025",
    slug: "ai-reshaping-ux-research-2025",
    excerpt: "Discover how generative AI tools are transforming user research...",
    content: "",
    author: "Surinder Thakur",
    category: "AI & UX Research",
    tags: ["AI", "UX Research"],
    image_url: null,
    read_time: 8,
    is_published: true,
    published_at: "2025-01-15T00:00:00Z",
    created_at: "2025-01-15T00:00:00Z",
    updated_at: "2025-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Design Systems at Scale: Lessons from Enterprise UX Teams",
    slug: "design-systems-at-scale-enterprise",
    excerpt: "Building and maintaining a design system across 50+ product teams...",
    content: "",
    author: "Surinder Thakur",
    category: "Design Systems",
    tags: ["Design Systems", "Enterprise"],
    image_url: null,
    read_time: 12,
    is_published: true,
    published_at: "2025-02-01T00:00:00Z",
    created_at: "2025-02-01T00:00:00Z",
    updated_at: "2025-02-01T00:00:00Z",
  },
  {
    id: "3",
    title: "The ROI of UX: Measuring Design Impact on Business Metrics",
    slug: "roi-of-ux-measuring-design-impact",
    excerpt: "Learn proven frameworks for quantifying UX improvements...",
    content: "",
    author: "Surinder Thakur",
    category: "UX Strategy",
    tags: ["ROI", "Business Metrics"],
    image_url: null,
    read_time: 10,
    is_published: true,
    published_at: "2025-02-20T00:00:00Z",
    created_at: "2025-02-20T00:00:00Z",
    updated_at: "2025-02-20T00:00:00Z",
  },
  {
    id: "4",
    title: "Prompt-Driven Prototyping: A New Workflow for UX Designers",
    slug: "prompt-driven-prototyping-workflow",
    excerpt: "Explore how UX designers are using AI-powered prototyping tools...",
    content: "",
    author: "Surinder Thakur",
    category: "AI & Design Tools",
    tags: ["Prototyping", "AI Tools"],
    image_url: null,
    read_time: 7,
    is_published: true,
    published_at: "2025-03-10T00:00:00Z",
    created_at: "2025-03-10T00:00:00Z",
    updated_at: "2025-03-10T00:00:00Z",
  },
  {
    id: "5",
    title: "Accessibility Beyond Compliance: Designing Inclusive AI Interfaces",
    slug: "accessibility-beyond-compliance-ai",
    excerpt: "Why WCAG compliance is just the starting line...",
    content: "",
    author: "Surinder Thakur",
    category: "Accessibility",
    tags: ["Accessibility", "Inclusive Design"],
    image_url: null,
    read_time: 9,
    is_published: false,
    published_at: null,
    created_at: "2025-03-25T00:00:00Z",
    updated_at: "2025-03-25T00:00:00Z",
  },
  {
    id: "6",
    title: "From Wireframes to AI Agents: The Evolution of UX Deliverables",
    slug: "wireframes-to-ai-agents-ux-evolution",
    excerpt: "The deliverables UX designers produce are fundamentally changing...",
    content: "",
    author: "Surinder Thakur",
    category: "UX Strategy",
    tags: ["AI Agents", "UX Deliverables"],
    image_url: null,
    read_time: 11,
    is_published: true,
    published_at: "2025-04-05T00:00:00Z",
    created_at: "2025-04-05T00:00:00Z",
    updated_at: "2025-04-05T00:00:00Z",
  },
];

function formatDate(dateString: string | null): string {
  if (!dateString) return "Draft";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* DESIGNERS: Category badge colors */
function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    "AI & UX Research": "bg-blue-50 text-blue-700 border-blue-200",
    "Design Systems": "bg-purple-50 text-purple-700 border-purple-200",
    "UX Strategy": "bg-amber-50 text-amber-700 border-amber-200",
    "AI & Design Tools": "bg-emerald-50 text-emerald-700 border-emerald-200",
    Accessibility: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return colorMap[category] || "bg-secondary text-secondary-foreground";
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState(PLACEHOLDER_ARTICLES);
  const [, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setArticles(data);
        }
      } catch {
        // Supabase not configured — keep placeholder data
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  return (
    <div className="space-y-6">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2 text-proux-navy">Articles</h1>
          <p className="body-base mt-1">
            Manage your free UX industry insight articles.
          </p>
        </div>
        {/* DESIGNERS: New Article button — placeholder, wire up to article editor */}
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
          New Article
        </Button>
      </div>

      {/* ── Articles Table ────────────────────────────────────────── */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                  Published
                </TableHead>
                <TableHead className="hidden lg:table-cell text-right">
                  Read Time
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div>
                      <span className="text-sm font-medium text-foreground line-clamp-1">
                        {article.title}
                      </span>
                      <span className="block text-xs text-muted-foreground mt-0.5 sm:hidden">
                        {article.category}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="outline"
                      className={`text-[10px] uppercase tracking-wider ${getCategoryColor(article.category)}`}
                    >
                      {article.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {article.is_published ? (
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
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {formatDate(article.published_at)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground text-right">
                    {article.read_time} min
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
