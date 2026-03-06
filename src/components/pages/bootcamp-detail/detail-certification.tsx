"use client";

import type { BootcampModule } from "@/lib/data/bootcamps";

export default function DetailCertification({
  module: mod,
}: {
  module: BootcampModule;
}) {
  return (
    <section className="py-14 md:py-20">
      <h2 className="text-[26px] md:text-[32px] font-extrabold tracking-[-0.6px] text-foreground mb-3">
        Certificate of Completion
      </h2>
      <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed max-w-xl mb-10">
        Graduate with a certificate, a new skill you can apply immediately,
        and a growing network of designers.
      </p>

      {/* Certificate visual */}
      <div className="rounded-2xl border border-[#e8e4d9] bg-card p-6 md:p-10">
        <div className="rounded-xl bg-[hsl(var(--gold-50))] border border-[#e8e4d9] p-10 md:p-16 relative">
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary/20 rounded-tl-sm" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/20 rounded-tr-sm" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary/20 rounded-bl-sm" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary/20 rounded-br-sm" />

          {/* Badge icon */}
          <div className="mb-8">
            <svg className="w-12 h-12 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>

          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-2">
            Completed Bootcamp
          </p>
          <h3 className="text-[28px] md:text-[34px] font-extrabold text-foreground tracking-[-0.4px] mb-8">
            {mod.title}
          </h3>

          {/* Placeholder lines */}
          <div className="flex flex-col gap-2.5 max-w-[320px]">
            <div className="h-[7px] w-full rounded-full bg-foreground/[0.08]" />
            <div className="h-[7px] w-[85%] rounded-full bg-foreground/[0.06]" />
            <div className="h-[7px] w-[70%] rounded-full bg-foreground/[0.05]" />
          </div>
        </div>
      </div>
    </section>
  );
}
