import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* =============================================================================
 * DESIGNERS: Article Detail Page
 * =============================================================================
 * Shows the full article content with author info, category, and related
 * articles. Content loads from Supabase when available, otherwise falls back
 * to placeholder data.
 *
 * Layout uses container-narrow for comfortable reading width.
 * Prose styles from globals.css are applied to the article body.
 * ========================================================================== */

/* =============================================================================
 * DESIGNERS: Placeholder Article Content
 * =============================================================================
 * Full article data used when Supabase is not connected.
 * Update content, author, and related articles as needed.
 * ========================================================================== */
const PLACEHOLDER_ARTICLES: Record<
  string,
  {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    tags: string[];
    image_url: string | null;
    read_time: number;
    is_published: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
  }
> = {
  "ai-reshaping-ux-research-2025": {
    id: "1",
    title: "How AI Is Reshaping the UX Research Landscape in 2025",
    slug: "ai-reshaping-ux-research-2025",
    excerpt:
      "Discover how generative AI tools are transforming user research methodologies, from automated interview analysis to predictive persona generation.",
    content: `<h2>The New Research Toolkit</h2>
<p>The UX research landscape is undergoing its most significant transformation since the shift from lab-based to remote testing. Generative AI tools are not replacing researchers — they are amplifying their capabilities in ways that were unimaginable just two years ago.</p>

<p>At ProUX, we have been working with enterprise teams across the Middle East and Asia to integrate AI-powered research tools into their existing workflows. The results have been remarkable: research cycles that once took 6-8 weeks are now completed in 2-3 weeks, with deeper and more actionable insights.</p>

<h2>Automated Interview Analysis</h2>
<p>Perhaps the most impactful application of AI in UX research is automated interview analysis. Tools powered by large language models can now transcribe, code, and surface themes from user interviews with impressive accuracy. This does not eliminate the need for human interpretation — it accelerates it.</p>

<p>Our recommended workflow involves three key steps:</p>
<ul>
<li><strong>Capture:</strong> Record interviews with AI-powered transcription running in real time.</li>
<li><strong>Synthesize:</strong> Use AI to identify patterns, contradictions, and emotional cues across all interviews simultaneously.</li>
<li><strong>Validate:</strong> Human researchers review AI-generated themes, adding context that only domain expertise provides.</li>
</ul>

<h2>Predictive Persona Generation</h2>
<p>Traditional persona creation relies on post-hoc analysis of research data. AI-powered persona generation flips this model. By analyzing behavioral data, support tickets, and usage patterns, AI can generate dynamic personas that evolve with your user base.</p>

<p>These are not static PowerPoint slides — they are living documents that update as new data flows in, helping teams make decisions based on current rather than historical user behavior.</p>

<h2>What This Means for UX Professionals</h2>
<p>The role of the UX researcher is not diminishing — it is elevating. As AI handles the mechanical aspects of data processing, researchers can focus on what humans do best: asking the right questions, building empathy, and connecting insights to strategy.</p>

<blockquote>The best AI-augmented research teams are not the ones with the most advanced tools. They are the ones that have learned when to trust the AI and when to trust their instincts.</blockquote>

<p>Investing in AI literacy is no longer optional for UX professionals. Understanding how these tools work, their limitations, and their biases is essential for maintaining the integrity of user-centered design.</p>`,
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
  "design-systems-at-scale-enterprise": {
    id: "2",
    title: "Design Systems at Scale: Lessons from Enterprise UX Teams",
    slug: "design-systems-at-scale-enterprise",
    excerpt:
      "Building and maintaining a design system across 50+ product teams requires more than a component library.",
    content: `<h2>Beyond the Component Library</h2>
<p>When most teams hear "design system," they think of a library of buttons, inputs, and cards. But at enterprise scale — where 50 or more product teams share a single system — a component library is merely the tip of the iceberg.</p>

<p>Through our consulting work at ProUX, we have helped organizations across financial services, healthcare, and government build design systems that serve thousands of designers and developers. The patterns that work are consistent, even when the industries are not.</p>

<h2>Governance That Scales</h2>
<p>The single most important factor in a design system's long-term success is its governance model. Without clear ownership, contribution guidelines, and decision-making processes, even the most beautifully crafted system will fragment within months.</p>

<p>We recommend a federated governance model with three tiers:</p>
<ul>
<li><strong>Core Team:</strong> A dedicated group of 3-5 people who maintain the system full-time, review contributions, and set strategic direction.</li>
<li><strong>Contributors:</strong> Designers and developers from product teams who propose and build new components following established guidelines.</li>
<li><strong>Consumers:</strong> The broader organization that uses the system. Their feedback drives the roadmap.</li>
</ul>

<h2>Tooling That Bridges Design and Code</h2>
<p>The gap between design tools and production code remains the biggest source of inconsistency. Bridging this gap requires investment in token-driven workflows where a single source of truth — typically design tokens in JSON format — feeds both Figma and codebase simultaneously.</p>

<h2>Culture Over Components</h2>
<p>Ultimately, a design system is a shared language. It succeeds when teams feel ownership over it, not when it is imposed from above. Regular open office hours, a transparent changelog, and celebrating contributions from product teams all build the culture that sustains a system over years.</p>

<blockquote>A design system is not a project with a launch date. It is a product with users, a roadmap, and an ongoing commitment to evolution.</blockquote>`,
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
  "roi-of-ux-measuring-design-impact": {
    id: "3",
    title: "The ROI of UX: Measuring Design Impact on Business Metrics",
    slug: "roi-of-ux-measuring-design-impact",
    excerpt:
      "Learn proven frameworks for quantifying UX improvements, from task-completion rates to revenue attribution.",
    content: `<h2>Why Measurement Matters</h2>
<p>UX teams that cannot articulate their business impact in quantitative terms will always struggle for budget, headcount, and strategic influence. This is not cynicism — it is organizational reality. Executives allocate resources based on data, and design teams must speak that language.</p>

<p>Over the past decade, ProUX has helped teams across industries develop measurement frameworks that connect design improvements directly to business outcomes. Here is what we have learned.</p>

<h2>The UX Metrics Framework</h2>
<p>We organize UX metrics into three tiers:</p>
<ul>
<li><strong>Task Metrics:</strong> Task completion rate, time on task, error rate. These are the closest to the design work itself and the easiest to measure.</li>
<li><strong>Experience Metrics:</strong> Customer satisfaction (CSAT), Net Promoter Score (NPS), System Usability Scale (SUS). These capture overall perception.</li>
<li><strong>Business Metrics:</strong> Conversion rate, revenue per user, support ticket volume, customer lifetime value. These are what the C-suite cares about.</li>
</ul>

<h2>Attribution Models That Work</h2>
<p>The challenge is connecting a design change (Tier 1) to a business outcome (Tier 3). Direct attribution is rarely possible, but correlation analysis and controlled experiments can build a compelling case.</p>

<p>A/B testing remains the gold standard for demonstrating design impact. When a redesigned checkout flow increases conversion by 15%, the connection between design and revenue is undeniable. But not every improvement can be A/B tested, which is why we recommend a portfolio approach to UX measurement.</p>

<h2>Building a Measurement Culture</h2>
<p>The most impactful thing a design leader can do is establish a baseline. Before any redesign project begins, capture current metrics. Without a before-and-after comparison, even the most successful project cannot demonstrate its value.</p>

<blockquote>$100M+ in measurable business impact does not come from a single project. It comes from a culture where every design decision is tied to a measurable outcome.</blockquote>`,
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
  "prompt-driven-prototyping-workflow": {
    id: "4",
    title: "Prompt-Driven Prototyping: A New Workflow for UX Designers",
    slug: "prompt-driven-prototyping-workflow",
    excerpt:
      "Explore how UX designers are using AI-powered prototyping tools to go from concept to clickable prototype in minutes.",
    content: `<h2>The Speed Revolution</h2>
<p>The traditional UX workflow — research, wireframe, mockup, prototype, test — is being compressed in ways that would have seemed impossible a few years ago. AI-powered prototyping tools are enabling designers to go from a text description to a functional prototype in minutes rather than days.</p>

<p>But speed without intention is just chaos. The value of prompt-driven prototyping lies not in replacing thoughtful design but in enabling rapid exploration of ideas that would previously have died on the whiteboard.</p>

<h2>The Prompt-First Workflow</h2>
<p>Here is the workflow we recommend at ProUX for integrating AI-powered prototyping into your design process:</p>
<ol>
<li><strong>Define the problem:</strong> Start with a clear problem statement and user needs — this has not changed.</li>
<li><strong>Prompt and generate:</strong> Use natural language to describe the interface. Generate multiple variations quickly.</li>
<li><strong>Curate and refine:</strong> Select the most promising concepts. Apply your design expertise to refine layout, hierarchy, and interaction patterns.</li>
<li><strong>Test early:</strong> Put the refined prototype in front of users within hours rather than weeks.</li>
<li><strong>Iterate with data:</strong> Use test results to inform the next round of prompts and refinements.</li>
</ol>

<h2>New Skills for a New Era</h2>
<p>Prompt engineering for design is becoming a core UX skill. The ability to articulate design intent in clear, structured language directly impacts the quality of AI-generated output. Designers who can write effective prompts will produce better work faster.</p>

<h2>The Human Element Remains Central</h2>
<p>AI-generated prototypes are starting points, not finished products. They lack the nuanced understanding of brand voice, accessibility requirements, and cultural context that experienced designers bring. The most effective teams use AI to handle the mechanical aspects of prototyping while investing human creativity in the decisions that truly matter.</p>

<blockquote>The best prompt-driven prototypes come from designers who deeply understand their users. AI amplifies expertise — it does not replace it.</blockquote>`,
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
  "accessibility-beyond-compliance-ai": {
    id: "5",
    title: "Accessibility Beyond Compliance: Designing Inclusive AI Interfaces",
    slug: "accessibility-beyond-compliance-ai",
    excerpt:
      "Why WCAG compliance is just the starting line. Dive into inclusive design principles for AI-driven interfaces.",
    content: `<h2>Compliance Is Not Enough</h2>
<p>Meeting WCAG 2.1 AA standards is a legal and ethical baseline — but it does not guarantee an inclusive experience. True accessibility goes beyond checklist compliance to consider the full spectrum of human abilities, contexts, and needs.</p>

<p>This distinction becomes even more critical as AI-driven interfaces proliferate. Voice assistants, chatbots, predictive interfaces, and generative tools all introduce new accessibility challenges that existing guidelines do not fully address.</p>

<h2>AI-Specific Accessibility Challenges</h2>
<p>AI interfaces present unique challenges that traditional accessibility standards were not designed to handle:</p>
<ul>
<li><strong>Unpredictable output:</strong> AI-generated content varies each time, making it harder for assistive technologies to provide consistent navigation.</li>
<li><strong>Conversational interfaces:</strong> Screen readers struggle with dynamic chat-like interfaces that scroll, update, and require context-aware interaction.</li>
<li><strong>Cognitive load:</strong> AI systems that present too many options, recommendations, or generated variations can overwhelm users with cognitive disabilities.</li>
<li><strong>Bias in personalization:</strong> AI-driven personalization can inadvertently exclude users whose behavior patterns differ from the training data.</li>
</ul>

<h2>Principles for Inclusive AI Design</h2>
<p>Based on our work with accessibility teams across the region, we recommend five principles:</p>
<ol>
<li><strong>Provide clear controls:</strong> Users must always be able to pause, stop, or undo AI-driven actions.</li>
<li><strong>Offer alternatives:</strong> Every AI-generated output should have a non-AI fallback path.</li>
<li><strong>Communicate confidence:</strong> When AI is uncertain, make that uncertainty visible so users can make informed decisions.</li>
<li><strong>Test with diverse users:</strong> Automated accessibility testing catches at most 30% of real-world issues. Include users with disabilities in every round of testing.</li>
<li><strong>Design for the edges:</strong> If an interface works for users with the most constrained abilities and contexts, it works for everyone.</li>
</ol>

<blockquote>Accessibility is not a feature. It is a quality of thoughtful design. And in the age of AI, it requires more thoughtfulness than ever.</blockquote>`,
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
  "wireframes-to-ai-agents-ux-evolution": {
    id: "6",
    title: "From Wireframes to AI Agents: The Evolution of UX Deliverables",
    slug: "wireframes-to-ai-agents-ux-evolution",
    excerpt:
      "The deliverables UX designers produce are fundamentally changing. Understand how conversational flows and intent maps are becoming core design artifacts.",
    content: `<h2>The Deliverable Landscape Is Shifting</h2>
<p>For two decades, UX deliverables have followed a predictable pattern: personas, journey maps, wireframes, mockups, and prototypes. These artifacts served us well in a world of screen-based interfaces. But as AI agents, voice interfaces, and ambient computing reshape how people interact with technology, our deliverables must evolve too.</p>

<h2>New Artifacts for a New Paradigm</h2>
<p>At ProUX, we have been developing and refining a new set of deliverables for AI-driven product design:</p>
<ul>
<li><strong>Intent Maps:</strong> Instead of mapping page flows, we map user intents and how the AI system should respond to each one. This captures the non-linear nature of AI interactions.</li>
<li><strong>Agent Personas:</strong> Just as user personas capture who we design for, agent personas define the personality, tone, and behavior boundaries of AI agents.</li>
<li><strong>Conversation Flow Diagrams:</strong> These replace traditional wireframes for conversational interfaces, mapping dialogue turns, error recovery, and escalation paths.</li>
<li><strong>Trust Frameworks:</strong> Documents that define when the AI should act autonomously, when it should ask for confirmation, and when it should defer to a human — based on the risk and reversibility of each action.</li>
</ul>

<h2>The Screen Is Not Dead</h2>
<p>This evolution does not mean screens are going away. Most AI interactions still have a visual component, and traditional UX deliverables remain relevant. But they are no longer sufficient on their own. The most effective UX teams are blending traditional and AI-specific artifacts into a comprehensive design documentation practice.</p>

<h2>Skills for the Transition</h2>
<p>UX designers who want to thrive in this new landscape should invest in three areas:</p>
<ol>
<li><strong>Systems thinking:</strong> AI interfaces are inherently systemic. Understanding how components interact across modalities is essential.</li>
<li><strong>Writing:</strong> As interfaces become more conversational, writing quality directly impacts user experience.</li>
<li><strong>Technical fluency:</strong> Understanding how AI models work — their capabilities and limitations — helps designers make better decisions about what to design and what to avoid.</li>
</ol>

<blockquote>The best UX designers have always been translators — between users and technology, between business goals and human needs. In the age of AI, this translation skill is more valuable than ever.</blockquote>`,
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
};

/* DESIGNERS: Category badge color mapping */
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

async function getArticle(slug: string) {
  /* ── Try Supabase first, fall back to placeholder data ────────── */
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("http") &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = createClient();
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (!error && data) {
        return data;
      }
    }
  } catch {
    // Supabase not configured — use placeholder data
  }

  return PLACEHOLDER_ARTICLES[slug] || null;
}

async function getRelatedArticles(currentSlug: string) {
  /* ── Try Supabase first, fall back to placeholder data ────────── */
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("http") &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = createClient();
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, excerpt, category, read_time, published_at")
        .eq("is_published", true)
        .neq("slug", currentSlug)
        .limit(3);

      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch {
    // Supabase not configured
  }

  return Object.values(PLACEHOLDER_ARTICLES)
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 3);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.published_at || undefined,
      authors: [article.author],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);

  if (!article) {
    return (
      <section className="section-padding">
        <div className="container-narrow text-center">
          <h1 className="heading-1 mb-4">Article Not Found</h1>
          <p className="body-large mb-8">
            The article you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/free-articles">Back to Articles</Link>
          </Button>
        </div>
      </section>
    );
  }

  const relatedArticles = await getRelatedArticles(article.slug);

  return (
    <>
      {/* ── Article Header ──────────────────────────────────────────── */}
      {/* DESIGNERS: Update hero background and layout for article pages */}
      <section className="bg-proux-warm section-padding-sm">
        <div className="container-narrow">
          {/* Back link */}
          <Link
            href="/free-articles"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Articles
          </Link>

          {/* Category + Read time */}
          <div className="mb-4 flex items-center gap-3">
            <Badge
              variant="outline"
              className={`text-[10px] font-semibold uppercase tracking-wider ${getCategoryColor(article.category)}`}
            >
              {article.category}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {article.read_time} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="heading-display text-proux-navy mb-6">
            {article.title}
          </h1>

          {/* Author + Date */}
          {/* DESIGNERS: Author avatar and byline row */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {article.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {article.author}
              </p>
              <p className="text-sm text-muted-foreground">
                {article.published_at
                  ? formatDate(article.published_at)
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Image ────────────────────────────────────────── */}
      {article.image_url && (
        <section className="container-narrow -mt-4 mb-8">
          <div className="relative aspect-[2/1] overflow-hidden rounded-xl">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* ── Article Body ──────────────────────────────────────────── */}
      {/* DESIGNERS: Article body uses .prose styles from globals.css */}
      <section className="pb-16">
        <div className="container-narrow">
          <article
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Related Articles ──────────────────────────────────────── */}
      {/* DESIGNERS: Related articles section — shows up to 3 other articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-proux-warm section-padding">
          <div className="container-default">
            <h2 className="heading-2 text-proux-navy mb-8">
              Continue Reading
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/free-articles/${related.slug}`}
                  className="group"
                >
                  <Card className="h-full p-6 transition-shadow duration-300 hover:shadow-lg">
                    <Badge
                      variant="outline"
                      className={`mb-3 text-[10px] font-semibold uppercase tracking-wider ${getCategoryColor(related.category)}`}
                    >
                      {related.category}
                    </Badge>
                    <h3 className="heading-4 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                    <p className="body-small line-clamp-2">{related.excerpt}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{related.read_time} min read</span>
                      {related.published_at && (
                        <>
                          <span>--</span>
                          <span>{formatDate(related.published_at)}</span>
                        </>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
