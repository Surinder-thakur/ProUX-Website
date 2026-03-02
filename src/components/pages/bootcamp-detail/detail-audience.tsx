"use client";

import type { AudiencePersona } from "@/lib/data/bootcamps";

export default function DetailAudience({
  audience,
}: {
  audience: AudiencePersona[];
}) {
  return (
    <section className="py-2">
      <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-3">
        Who This Is For
      </p>
      <h2 className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.6px] text-foreground mb-6">
        Ideal Students
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {audience.map((persona) => (
          <div
            key={persona.number}
            className="rounded-xl bg-card p-5"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-sm font-bold text-primary mb-3">
              {persona.number}
            </span>
            <h3 className="text-[15px] font-bold text-foreground mb-1 tracking-[-0.2px]">
              {persona.role}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {persona.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
