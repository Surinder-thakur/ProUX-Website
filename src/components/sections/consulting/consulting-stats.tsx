/* ── Data ─────────────────────────────────────────────────────────────── */

const stats = [
  {
    value: "10x",
    label: "ROI Average",
    caption: "Based on post-sprint conversion performance.",
  },
  {
    value: "250+",
    label: "Funnels Optimized",
    caption: "Across eCommerce, fintech, and SaaS.",
  },
  {
    value: "95%",
    label: "Repeat Rate",
    caption: "Among clients on our quarterly retainer.",
  },
  {
    value: "15%",
    label: "Avg. Conversion Lift",
    caption: "Validated by users before development.",
  },
];

/* ── Component ────────────────────────────────────────────────────────── */

export default function ConsultingStats() {
  return (
    <section className="bg-[hsl(var(--bg-primary-50))] border-y border-[hsl(var(--border-primary-200))]/20 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="container-default py-10 md:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative flex">
              {/* Vertical divider between items on desktop */}
              {i > 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-[hsl(var(--border-primary-200))]/30" />
              )}

              <div className="flex flex-col items-center text-center w-full px-2 md:px-4 py-3 rounded-xl transition-colors duration-200 hover:bg-[hsl(var(--bg-primary-100))]/50">
                {/* Number */}
                <p className="text-[28px] md:text-[36px] font-extrabold text-foreground leading-none tracking-tight">
                  {stat.value}
                </p>

                {/* Label */}
                <p className="mt-2 text-[11px] md:text-xs font-bold uppercase tracking-widest text-[hsl(var(--text-primary-600))]">
                  {stat.label}
                </p>

                {/* Caption — hidden on mobile */}
                <p className="hidden sm:block mt-1.5 text-[12px] md:text-[13px] leading-snug text-muted-foreground max-w-[200px]">
                  {stat.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
