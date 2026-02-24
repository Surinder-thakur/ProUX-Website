/* =============================================================================
 * ARTICLES PREVIEW SECTION
 * =============================================================================
 * DESIGNERS: Article card preview section. Customize:
 * - Section heading & description
 * - Article card data (title, excerpt, image, category, date)
 * - Card layout and hover effects
 * - "View all" link destination
 * ========================================================================== */

import Image from "next/image";
import Link from "next/link";

/* DESIGNERS: Article preview data. Update to match your latest blog posts. */
const articles = [
  {
    id: 1,
    title: "How AI Is Transforming E-Commerce UX: A Complete Design Guide",
    excerpt:
      "Discover how leading e-commerce platforms are using AI to create personalized shopping experiences that drive conversion and customer loyalty.",
    image: "/images/article-ecommerce.png",
    imageAlt: "AI in E-Commerce UX Design",
    category: "AI & E-Commerce",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    href: "/articles/ai-ecommerce-ux-guide",
  },
  {
    id: 2,
    title:
      "Salesforce UX Redesign: What Designers Can Learn from Enterprise AI Integration",
    excerpt:
      "An in-depth analysis of Salesforce's recent UX overhaul and how enterprise platforms are balancing complexity with AI-powered simplicity.",
    image: "/images/article-salesforce.png",
    imageAlt: "Salesforce UX Redesign Analysis",
    category: "Enterprise UX",
    date: "Jan 8, 2026",
    readTime: "10 min read",
    href: "/articles/salesforce-ux-redesign",
  },
];

export default function ArticlesPreviewSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-default">
        {/* ── DESIGNERS: Section heading ─────────────────────────────── */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="label-caps mb-4 text-proux-copper">Blog</p>
            <h2 className="heading-1 text-proux-navy">
              AI-First UX Industry Insights
            </h2>
          </div>
          {/* DESIGNERS: "View all" link — update href to your articles page */}
          <Link
            href="/articles"
            className="body-base flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
          >
            View all articles
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>

        {/* ── DESIGNERS: Article cards grid ──────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="group overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-lg"
            >
              {/* DESIGNERS: Article image */}
              <div className="aspect-[16/9] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  width={600}
                  height={340}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* DESIGNERS: Article content */}
              <div className="p-6">
                {/* DESIGNERS: Category & metadata */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="label-caps text-proux-copper">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {article.date}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {article.readTime}
                  </span>
                </div>

                {/* DESIGNERS: Article title */}
                <h3 className="heading-4 mb-2 text-proux-navy transition-colors group-hover:text-primary">
                  {article.title}
                </h3>

                {/* DESIGNERS: Article excerpt */}
                <p className="body-small line-clamp-2">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
