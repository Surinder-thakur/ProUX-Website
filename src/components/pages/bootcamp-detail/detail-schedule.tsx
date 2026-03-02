"use client";

const STATS = [
  { value: "4", unit: "weeks", sub: "Course duration" },
  { value: "60", unit: "min", sub: "Per live class" },
  { value: "12", unit: "max", sub: "Students per track" },
  { value: "Monthly", unit: "", sub: "Rolling enrollment" },
];

export default function DetailSchedule() {
  return (
    <section className="py-10 md:py-14">
      <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-3">
        Schedule & Format
      </p>
      <h2 className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.6px] text-foreground mb-8">
        How It Runs
      </h2>

      {/* Stats strip — matches consulting stats pattern */}
      <div className="rounded-2xl border border-[#dfdbc9] bg-card overflow-hidden">
        <div className="grid grid-cols-2 lg:flex lg:divide-x divide-[#dfdbc9]">
          {STATS.map((s) => (
            <div
              key={s.sub}
              className="flex flex-col items-center py-5 lg:py-6 hover:bg-[hsl(var(--gold-50))] transition-colors text-center px-4 lg:px-6 lg:flex-row lg:gap-3 lg:text-left lg:flex-auto lg:justify-center"
            >
              <span className="text-[36px] md:text-[42px] lg:text-4xl font-black text-foreground tracking-tight leading-none shrink-0">
                {s.value}
              </span>
              <div className="flex flex-col items-center lg:items-start mt-0.5 lg:mt-0">
                {s.unit && (
                  <span className="text-[11px] lg:text-sm font-bold text-primary uppercase tracking-wide whitespace-nowrap leading-tight">
                    {s.unit}
                  </span>
                )}
                <span className="text-[11px] lg:text-xs text-muted-foreground max-w-[180px] mt-0.5 line-clamp-2 leading-snug">
                  {s.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Track info */}
        <div className="border-t border-[#dfdbc9] grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#dfdbc9]">
          <div className="flex items-center gap-3 px-6 py-4">
            <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-xs font-bold text-primary">
              A
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Track A</p>
              <p className="text-xs text-muted-foreground">India / Asia / Europe, weekday evenings IST</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-4">
            <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-xs font-bold text-primary">
              B
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Track B</p>
              <p className="text-xs text-muted-foreground">Americas, weekday evenings US time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
