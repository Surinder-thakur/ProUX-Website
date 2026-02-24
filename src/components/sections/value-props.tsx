/* =============================================================================
 * VALUE PROPOSITIONS SECTION
 * =============================================================================
 * DESIGNERS: Three value proposition cards. Key customization points:
 * - Card titles & descriptions
 * - Card icons/emojis
 * - Background colors & border styles
 * - Card layout (grid columns)
 * ========================================================================== */

/* DESIGNERS: Update these value propositions to match your product's key benefits. */
const valueProps = [
  {
    id: "speed",
    /* DESIGNERS: Icon or emoji for the card */
    icon: (
      <svg
        className="h-8 w-8 text-proux-copper"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    title: "Design 80% Faster with AI Agents",
    description:
      "Automate repetitive UX tasks with intelligent AI agents that handle research, analysis, and documentation — so you can focus on strategic design decisions.",
  },
  {
    id: "quality",
    icon: (
      <svg
        className="h-8 w-8 text-proux-copper"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
        />
      </svg>
    ),
    title: "Improve Design Quality by 50% with AI Feedbacks",
    description:
      "Get instant, actionable AI feedback on your designs based on proven UX principles, psychology patterns, and real-world best practices.",
  },
  {
    id: "conversions",
    icon: (
      <svg
        className="h-8 w-8 text-proux-copper"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
        />
      </svg>
    ),
    title: "Boost Conversions with Proven Principles",
    description:
      "Apply battle-tested UX principles and cognitive psychology patterns to create experiences that convert visitors into loyal customers.",
  },
];

export default function ValuePropsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-default">
        {/* ── DESIGNERS: Value prop cards grid ───────────────────────── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {valueProps.map((prop) => (
            <div
              key={prop.id}
              className="group rounded-2xl border border-border bg-proux-warm p-8 transition-all hover:border-primary/20 hover:shadow-lg"
            >
              {/* DESIGNERS: Card icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
                {prop.icon}
              </div>

              {/* DESIGNERS: Card title */}
              <h3 className="heading-4 mb-3 text-proux-navy">{prop.title}</h3>

              {/* DESIGNERS: Card description */}
              <p className="body-base">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
