"use client";

import type { AudiencePersona } from "@/lib/data/bootcamps";

export default function DetailAudience({
  audience,
}: {
  audience: AudiencePersona[];
}) {
  return (
    <section className="w-full py-14 md:py-20 bg-[hsl(var(--gold-100))]">
      <div className="container-default">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[26px] md:text-[32px] font-extrabold tracking-[-0.6px] text-foreground mb-3">
            Who should join this bootcamp
          </h2>
          <p className="text-[15px] md:text-[16px] text-muted-foreground mx-auto leading-relaxed whitespace-nowrap">
            No AI experience needed. Just a design background and the will to build.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {audience.map((persona) => (
            <div
              key={persona.number}
              className="rounded-2xl border border-[#e8e4d9] bg-white p-6 md:p-7"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#e8e4d9] text-[13px] font-semibold text-foreground/60 mb-5">
                {persona.number}
              </span>
              <h3 className="text-[16px] md:text-[17px] font-bold text-foreground tracking-[-0.2px] mb-2">
                {persona.role}
              </h3>
              <p className="text-[14px] text-muted-foreground leading-relaxed">
                {persona.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
