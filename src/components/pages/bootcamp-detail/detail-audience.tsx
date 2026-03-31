"use client";

import type { AudiencePersona } from "@/lib/data/bootcamps";

export default function DetailAudience({
  audience,
  variant = "bootcamp",
}: {
  audience: AudiencePersona[];
  variant?: "bootcamp" | "workshop";
}) {
  const isWorkshop = variant === "workshop";

  return (
    <section className={isWorkshop ? "py-10 md:py-14" : "w-full py-14 md:py-20 bg-[hsl(var(--gold-100))]"}>
      <div className={isWorkshop ? "" : "container-default"}>
        <div className={`mb-8 md:mb-10 ${isWorkshop ? "text-left" : "text-center"}`}>
          <h2 className="text-[26px] md:text-[32px] font-extrabold tracking-[-0.6px] text-foreground mb-3">
            {isWorkshop ? "Who should join this workshop" : "Who should join this bootcamp"}
          </h2>
          <p className={`text-[15px] md:text-[16px] text-muted-foreground leading-relaxed ${isWorkshop ? "max-w-lg" : "mx-auto max-w-md"}`}>
            No AI experience needed. Just a design background and the will to build.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {audience.map((persona) => (
            <div
              key={persona.number}
              className={`rounded-2xl border border-[#e8e4d9] p-5 md:p-6 ${isWorkshop ? "bg-[hsl(var(--gold-50))]" : "bg-white"}`}
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-[#e8e4d9] text-[12px] font-semibold text-foreground/60 mb-3">
                {persona.number}
              </span>
              <h3 className="text-[15px] md:text-[16px] font-bold text-foreground tracking-[-0.2px] mb-1.5">
                {persona.role}
              </h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {persona.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
