"use client";

const STATS = [
  { value: "4", unit: "weeks", sub: "Course Duration" },
  { value: "12", unit: "max", sub: "Students Per Track" },
  { value: "Weekly", unit: "", sub: "Class Engagement" },
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

      {/* Stats strip */}
      <div className="rounded-2xl border border-[#dfdbc9] bg-card overflow-hidden">
        <div className="grid grid-cols-3 divide-x divide-[#dfdbc9]">
          {STATS.map((s) => (
            <div
              key={s.sub}
              className="flex flex-col items-center py-5 lg:py-6 hover:bg-[hsl(var(--gold-50))] transition-colors text-center px-4 lg:px-6"
            >
              <span className="text-[32px] md:text-[40px] lg:text-4xl font-black text-foreground tracking-tight leading-none">
                {s.value}
              </span>
              <div className="flex flex-col items-center mt-1">
                {s.unit && (
                  <span className="text-[11px] lg:text-sm font-bold text-primary uppercase tracking-wide whitespace-nowrap leading-tight">
                    {s.unit}
                  </span>
                )}
                <span className="text-[11px] lg:text-xs text-muted-foreground mt-0.5 leading-snug">
                  {s.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Track info with timestamps */}
        <div className="border-t border-[#dfdbc9] grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#dfdbc9]">
          <div className="flex items-center gap-3 px-6 py-4">
            <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-xs font-bold text-primary">
              A
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Track A &middot; Monday</p>
              <p className="text-[13px] font-medium text-foreground">7:30 PM &ndash; 9:00 PM IST</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-4">
            <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-xs font-bold text-primary">
              B
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Track B &middot; Thursday</p>
              <p className="text-[13px] font-medium text-foreground">2:30 PM &ndash; 4:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
