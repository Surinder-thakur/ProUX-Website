import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/* =============================================================================
 * DESIGNERS: Free Articles List Page
 * =============================================================================
 * Displays a grid of AI-first UX articles. Content loads from Supabase when
 * available, otherwise falls back to the placeholder data below.
 *
 * To update:
 * - Edit PLACEHOLDER_ARTICLES to change static article previews
 * - Adjust grid columns via the grid classes on the articles container
 * - Change card layout by editing the ArticleCard component
 * ========================================================================== */

export const metadata: Metadata = {
  title: "AI-First UX Industry Insights | Free Articles",
  description:
    "Monthly articles on AI-powered design, UX strategy, and the future of human-centered interfaces. Free insights from ProUX.",
  openGraph: {
    title: "AI-First UX Industry Insights | ProUX",
    description:
      "Monthly articles on AI-powered design, UX strategy, and the future of human-centered interfaces.",
  },
};

/* =============================================================================
 * DESIGNERS: Placeholder Article Data
 * =============================================================================
 * These articles display when Supabase is not configured or returns no data.
 * Update titles, excerpts, categories, and images to match your content plan.
 * ========================================================================== */
const PLACEHOLDER_ARTICLES = [
  {
    id: "1",
    title: "How AI Is Reshaping the UX Research Landscape in 2025",
    slug: "ai-reshaping-ux-research-2025",
    excerpt:
      "Discover how generative AI tools are transforming user research methodologies, from automated interview analysis to predictive persona generation, and what it means for UX professionals.",
    author: "Surinder Thakur",
    category: "AI & UX Research",
    tags: ["AI", "UX Research", "Generative AI"],
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
    excerpt:
      "Building and maintaining a design system across 50+ product teams requires more than a component library. Learn the governance, tooling, and culture shifts that make it work.",
    author: "Surinder Thakur",
    category: "Design Systems",
    tags: ["Design Systems", "Enterprise", "Governance"],
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
    excerpt:
      "Learn proven frameworks for quantifying UX improvements. From task-completion rates to revenue attribution, discover how top companies tie design work to bottom-line results.",
    author: "Surinder Thakur",
    category: "UX Strategy",
    tags: ["ROI", "Business Metrics", "UX Strategy"],
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
    excerpt:
      "Explore how UX designers are using AI-powered prototyping tools to go from concept to clickable prototype in minutes, and the new skills required to excel in this workflow.",
    author: "Surinder Thakur",
    category: "AI & Design Tools",
    tags: ["Prototyping", "AI Tools", "Workflow"],
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
    excerpt:
      "Why WCAG compliance is just the starting line. Dive into inclusive design principles for AI-driven interfaces that serve users with diverse abilities, contexts, and needs.",
    author: "Surinder Thakur",
    category: "Accessibility",
    tags: ["Accessibility", "Inclusive Design", "AI Interfaces"],
    image_url: null,
    read_time: 9,
    is_published: true,
    published_at: "2025-03-25T00:00:00Z",
    created_at: "2025-03-25T00:00:00Z",
    updated_at: "2025-03-25T00:00:00Z",
  },
  {
    id: "6",
    title: "From Wireframes to AI Agents: The Evolution of UX Deliverables",
    slug: "wireframes-to-ai-agents-ux-evolution",
    excerpt:
      "The deliverables UX designers produce are fundamentally changing. Understand how conversational flows, agent personas, and intent maps are becoming core design artifacts.",
    author: "Surinder Thakur",
    category: "UX Strategy",
    tags: ["AI Agents", "UX Deliverables", "Conversational UX"],
    image_url: null,
    read_time: 11,
    is_published: true,
    published_at: "2025-04-05T00:00:00Z",
    created_at: "2025-04-05T00:00:00Z",
    updated_at: "2025-04-05T00:00:00Z",
  },
];

/* DESIGNERS: Category badge color mapping — maps category names to Tailwind styles */
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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function getArticles() {
  /* ── Try Supabase first, fall back to placeholder data ────────── */
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = createClient();
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch {
    // Supabase not configured — use placeholder data
  }

  return PLACEHOLDER_ARTICLES;
}

export default async function FreeArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      {/* ── Hero Section ──────────────────────────────────────────── */}
      {/* DESIGNERS: Update hero background, heading text, and subtitle */}
      <section className="bg-proux-warm section-padding">
        <div className="container-default text-center">
          <p className="label-caps text-proux-copper mb-4">
            Free Resources
          </p>
          <h1 className="heading-display text-proux-navy mb-6">
            AI-First UX Industry Insights
          </h1>
          <p className="body-large mx-auto max-w-2xl">
            Monthly articles on AI-powered design, UX strategy, and the future
            of human-centered interfaces. Written by practitioners, for
            practitioners.
          </p>
        </div>
      </section>

      {/* ── Articles Grid ─────────────────────────────────────────── */}
      {/* DESIGNERS: Change grid-cols values to adjust card layout per breakpoint */}
      <section className="section-padding">
        <div className="container-default">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/free-articles/${article.slug}`}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                  {/* DESIGNERS: Article thumbnail — shows placeholder gradient when no image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-secondary to-muted">
                    {article.image_url ? (
                      <Image
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <svg
                          className="h-12 w-12 text-muted-foreground/30"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 p-6">
                    {/* DESIGNERS: Category badge + date row */}
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-semibold uppercase tracking-wider ${getCategoryColor(article.category)}`}
                      >
                        {article.category}
                      </Badge>
                      <span className="body-small text-xs whitespace-nowrap">
                        {article.published_at
                          ? formatDate(article.published_at)
                          : ""}
                      </span>
                    </div>

                    {/* DESIGNERS: Article title */}
                    <h2 className="heading-4 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>

                    {/* DESIGNERS: Article excerpt */}
                    <p className="body-small line-clamp-3">{article.excerpt}</p>

                    {/* DESIGNERS: Read time */}
                    <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{article.read_time} min read</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
