"use client";

import type { BootcampModule } from "@/lib/data/bootcamps";

const STATS = [
  { value: "4", unit: "weeks", sub: "Course Duration" },
  { value: "12", unit: "max", sub: "Students Per Track" },
  { value: "Weekly", unit: "", sub: "Live Sessions" },
];

export default function DetailSchedule({ module: mod }: { module: BootcampModule }) {
  return (
    <section className="py-10 md:py-14">
      <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-3 text-center">
        Schedule & Format
      </p>
      <h2 className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.6px] text-foreground mb-6 text-center">
        How It Runs
      </h2>

      {/* Stats + Tracks in one card */}
      <div className="rounded-2xl border border-[#dfdbc9] bg-card overflow-hidden">
        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-[#dfdbc9]">
          {STATS.map((s) => (
            <div
              key={s.sub}
              className="flex flex-col items-center py-5 text-center px-4"
            >
              <span className="text-[28px] md:text-[34px] font-black text-foreground tracking-tight leading-none">
                {s.value}
              </span>
              <div className="flex flex-col items-center mt-1">
                {s.unit && (
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wide leading-tight">
                    {s.unit}
                  </span>
                )}
                <span className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                  {s.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Track times */}
        <div className="border-t border-[#dfdbc9] grid grid-cols-2 divide-x divide-[#dfdbc9]">
          <div className="flex items-center gap-3 px-5 py-3.5">
            <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-[11px] font-bold text-primary">
              A
            </span>
            <div>
              <p className="text-[13px] font-semibold text-foreground">{mod.trackA?.day ?? "Monday"} &middot; {mod.trackA?.time ?? "7:30 \u2013 9:00 PM IST"}</p>
              <p className="text-[11px] text-muted-foreground">Weekday Evenings</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3.5">
            <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-[11px] font-bold text-primary">
              B
            </span>
            <div>
              <p className="text-[13px] font-semibold text-foreground">{mod.trackB?.day ?? "Wednesday"} &middot; {mod.trackB?.time ?? "8:00 \u2013 9:30 PM IST"}</p>
              <p className="text-[11px] text-muted-foreground">Americas Evenings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
