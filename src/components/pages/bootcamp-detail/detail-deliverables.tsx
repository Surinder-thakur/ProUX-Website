"use client";

export default function DetailDeliverables({
  deliverables,
}: {
  deliverables: string[];
}) {
  return (
    <section className="py-2">
      <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-3">
        Deliverables
      </p>
      <h2 className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.6px] text-foreground mb-6">
        What You Ship
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {deliverables.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl bg-card p-4"
          >
            <svg
              className="shrink-0 w-4 h-4 text-primary mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-foreground leading-relaxed">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
