"use client";

export default function DetailDeliverables({
  deliverables,
}: {
  deliverables: string[];
}) {
  return (
    <section className="py-10 md:py-14">
      <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-3 text-center">
        Deliverables
      </p>
      <h2 className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.6px] text-foreground mb-6 text-center">
        What You&apos;ll Ship
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {deliverables.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl bg-card border border-[#e8e4d9] p-4"
          >
            <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center">
              <svg className="w-[11px] h-[11px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-[14px] text-foreground leading-snug">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
