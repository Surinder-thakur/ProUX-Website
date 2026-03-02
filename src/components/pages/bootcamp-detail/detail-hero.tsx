"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BootcampModule } from "@/lib/data/bootcamps";

export default function DetailHero({ module: mod }: { module: BootcampModule }) {
  return (
    <section className="bg-[hsl(var(--bg-primary-50))] pt-28 pb-8 md:pb-12">
      <div className="container-default">
        <div className="text-center lg:text-left max-w-2xl">
          {/* Back link */}
          <Link
            href="/bootcamps"
            className="inline-flex items-center gap-1 text-xs md:text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            &larr; All Bootcamps
          </Link>

          <div className="flex flex-col gap-3">
            <Badge variant="secondary" className="self-start text-[11px]">
              {mod.badge}
            </Badge>

            <h1 className="text-[28px] leading-[34px] md:text-4xl lg:text-[42px] lg:leading-[50px] font-extrabold tracking-[-1.2px] text-foreground">
              {mod.title}
            </h1>

            <p className="text-lg md:text-xl font-medium text-[hsl(var(--text-neutrals-800))] leading-[1.4]">
              {mod.tagline}
            </p>

            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
              <span>{mod.classCount} Classes</span>
              <span className="h-3 w-px bg-[#dfdbc9]" />
              <span>{mod.hoursLive} Hours Live</span>
              <span className="h-3 w-px bg-[#dfdbc9]" />
              <span>Cohort Based</span>
              <span className="h-3 w-px bg-[#dfdbc9]" />
              <span>Rolling Monthly</span>
            </div>

            {/* Story */}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-3">
              {mod.story}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
