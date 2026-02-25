import React from "react";
import Image from "next/image";
import Link from "next/link";

/* ── Types ─────────────────────────────────────────────────────────────── */

interface Article {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  href: string;
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const articles: Article[] = [
  {
    category: "eCommerce",
    title:
      "Apparel E-Commerce: Visually Group and Clearly Label Size Filter Options",
    excerpt:
      "Do you have a long \u2018time-to-value\u2019, and an orchestra of noise\u2026",
    readTime: "11 min read",
    date: "Feb 28, 2024",
    image: "/images/article-ecommerce.png",
    href: "/free-articles",
  },
  {
    category: "MARKETING",
    title: "A Comprehensive Salesforce Audit Guide",
    excerpt:
      "Three video conferencing tools that are objectively very similar\u2026",
    readTime: "11 min read",
    date: "Feb 28, 2024",
    image: "/images/article-salesforce.png",
    href: "/free-articles",
  },
];

/* ── Arrow Chevron Icon ────────────────────────────────────────────────── */

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 12L10 8L6 4" />
    </svg>
  );
}

/* ── Article Card ─────────────────────────────────────────────────────── */

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={article.href} className="block w-full group">
      <article className="flex flex-col md:flex-row gap-6 p-5 md:h-[280px] transition-all duration-300 bg-white rounded-xl border border-transparent hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        {/* ── Content (left on desktop) ── */}
        <div className="flex flex-col flex-1 min-w-0 py-1 order-2 md:order-1">
          {/* Top meta */}
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent bg-accent/10 rounded-[var(--radius)]">
              {article.category}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {article.date}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug transition-colors group-hover:text-primary"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-base font-normal text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Bottom row */}
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {article.readTime}
            </span>

            <div className="flex items-center gap-2 text-sm font-bold text-foreground group-hover:translate-x-1 transition-transform">
              Read Article
              <ArrowIcon />
            </div>
          </div>
        </div>

        {/* ── Image (right on desktop, top on mobile) ── */}
        <div className="relative w-full md:w-[260px] aspect-[4/3] md:aspect-auto shrink-0 overflow-hidden h-full order-1 md:order-2 rounded-[calc(var(--radius)+2px)] bg-border">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 260px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </article>
    </Link>
  );
}

/* ── Main Section ─────────────────────────────────────────────────────── */

export default function ResearchBasedArticles() {
  return (
    <section className="w-full py-16 lg:py-20 px-4 flex flex-col gap-9 items-center bg-[hsl(var(--bg-primary-50))]">
      {/* ── Header ── */}
      <div className="flex flex-col gap-3 items-center text-center w-full max-w-[800px] px-4">
        <h2
          className="text-[32px] md:text-[40px] font-extrabold text-foreground"
          style={{
            fontFamily: "var(--font-family-display)",
            lineHeight: 1.15,
            letterSpacing: "-0.4px",
          }}
        >
          AI-First UX Industry
          <br />
          Insights
        </h2>
        <p className="text-lg md:text-xl font-normal text-muted-foreground leading-relaxed">
          Monthly articles on AI-powered design, emerging UX patterns,
          <br className="hidden md:block" />
          and what&apos;s shaping the future of product design.
        </p>
      </div>

      {/* ── Article cards ── */}
      <div className="flex flex-col gap-6 items-center justify-center w-full max-w-4xl">
        {articles.map((article, i) => (
          <ArticleCard key={i} article={article} />
        ))}
      </div>

      {/* ── See all link ── */}
      <Link
        href="/free-articles"
        className="mt-4 text-base font-bold text-primary uppercase tracking-[0.84px] hover:opacity-80 hover:underline transition-all"
      >
        SEE ALL ARTICLES
      </Link>
    </section>
  );
}
