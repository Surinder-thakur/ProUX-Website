"use client";

import type { BootcampModule } from "@/lib/data/bootcamps";

export default function DetailCertification({
  module: mod,
}: {
  module: BootcampModule;
}) {
  return (
    <section className="py-10 md:py-14">
      <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-3">
        Certification
      </p>
      <h2 className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.6px] text-foreground mb-8">
        Certificate of Completion
      </h2>

      {/* Large certificate visual */}
      <div className="rounded-2xl border-2 border-[#dfdbc9] bg-card p-8 md:p-12 mb-6">
        <div className="max-w-lg mx-auto text-center">
          {/* Certificate frame */}
          <div className="rounded-xl border border-primary/20 bg-[hsl(var(--gold-50))] p-8 md:p-10 relative">
            {/* Corner decorations */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/30 rounded-tl-sm" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/30 rounded-tr-sm" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/30 rounded-bl-sm" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/30 rounded-br-sm" />

            {/* Badge icon */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 mx-auto mb-5">
              <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              ProUX Academy
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Certificate of Completion
            </p>

            <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-[-0.5px] mb-2">
              {mod.title}
            </h3>

            <div className="w-48 mx-auto border-b border-dashed border-[#dfdbc9] my-5" />

            <p className="text-lg font-semibold text-foreground/40 italic">
              Your Name Here
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Awarded upon completion of {mod.classCount} classes
            </p>
          </div>
        </div>
      </div>

      {/* Benefits below certificate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            title: "Portfolio-Ready Deliverables",
            desc: "Real work products you can showcase in interviews and on your portfolio.",
          },
          {
            title: "ProUX Alumni Network",
            desc: "Join a community of design engineers who have completed the bootcamp.",
          },
          {
            title: "Lifetime Access to Materials",
            desc: "Recordings, templates, and resources available after the cohort ends.",
          },
          {
            title: "Shareable Digital Certificate",
            desc: "Add to your LinkedIn profile, resume, and portfolio website.",
          },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <svg
              className="shrink-0 w-4 h-4 text-emerald-600 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {item.title}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
