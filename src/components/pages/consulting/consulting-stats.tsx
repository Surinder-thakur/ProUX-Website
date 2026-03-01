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
    <section
      className="w-full bg-[#F8F7F4] border-y border-[#99825d]/20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
      aria-label="Company statistics"
    >
      <div className="max-w-[1200px] mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-2 lg:flex lg:divide-x divide-[#99825d]/20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center py-5 lg:py-4 hover:bg-[#99825d]/5 transition-colors text-center px-4 lg:px-6 lg:flex-row lg:gap-3 lg:text-left lg:flex-auto lg:justify-center"
            >
              <span className="text-[40px] md:text-[48px] lg:text-4xl font-black text-[#1a2130] tracking-tight leading-none shrink-0">
                {stat.value}
              </span>
              <div className="flex flex-col items-center lg:items-start mt-0.5 lg:mt-0">
                <span className="text-[11px] lg:text-sm font-bold text-[#99825d] uppercase tracking-wide whitespace-nowrap leading-tight">
                  {stat.label}
                </span>
                <span className="hidden sm:block text-[11px] lg:text-xs text-[#4A5568] max-w-[180px] mt-0.5 line-clamp-2 leading-snug">
                  {stat.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
