/* =============================================================================
 * AI TOOLS SECTION
 * =============================================================================
 * DESIGNERS: Three AI tool cards. Key customization points:
 * - Section heading & description
 * - Tool card titles, descriptions & images
 * - CTA button text & links
 * - Card hover effects
 * ========================================================================== */

import Image from "next/image";
import Link from "next/link";

/* DESIGNERS: AI tool card data. Update tools as you add new features. */
const aiTools = [
  {
    id: "magic-wand",
    title: "Magic Wand",
    description:
      "Instantly enhance any design with AI-powered suggestions. Upload your screen and get actionable improvements based on proven UX principles and psychology patterns.",
    image: "/images/ai-magic-wand.png",
    imageAlt: "AI Magic Wand Tool",
    href: "#get-started",
  },
  {
    id: "compare-llm",
    title: "Compare LLM Models",
    description:
      "Compare responses from multiple AI models side by side. Find the best AI-generated UX copy, microcopy, and content for your specific design context.",
    image: "/images/ai-compare-llm.png",
    imageAlt: "Compare LLM Models Tool",
    href: "#get-started",
  },
  {
    id: "consensus",
    title: "Generate Consensus",
    description:
      "Get a unified recommendation from multiple AI models. When you need a definitive answer, our consensus engine synthesizes the best insights from leading AI systems.",
    image: "/images/ai-consensus.png",
    imageAlt: "Generate Consensus Tool",
    href: "#get-started",
  },
];

export default function AiToolsSection() {
  return (
    <section className="section-padding bg-proux-warm">
      <div className="container-default">
        {/* ── DESIGNERS: Section heading ─────────────────────────────── */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="label-caps mb-4 text-proux-copper">AI Tools</p>
          <h2 className="heading-1 mb-4 text-proux-navy">
            Get Better Results from AI Tools
          </h2>
          <p className="body-large">
            Powerful AI-powered tools designed specifically for UX professionals.
            Work smarter, not harder.
          </p>
        </div>

        {/* ── DESIGNERS: AI tool cards grid ──────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {aiTools.map((tool) => (
            <div
              key={tool.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-lg"
            >
              {/* DESIGNERS: Tool image */}
              <div className="aspect-[4/3] overflow-hidden bg-proux-warm p-6">
                <Image
                  src={tool.image}
                  alt={tool.imageAlt}
                  width={400}
                  height={300}
                  className="h-full w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* DESIGNERS: Tool content */}
              <div className="flex flex-1 flex-col p-6">
                {/* DESIGNERS: Tool title */}
                <h3 className="heading-4 mb-3 text-proux-navy">{tool.title}</h3>

                {/* DESIGNERS: Tool description */}
                <p className="body-small mb-6 flex-1">{tool.description}</p>

                {/* DESIGNERS: Tool CTA */}
                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Try it now
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
