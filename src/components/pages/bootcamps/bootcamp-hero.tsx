"use client";

import Image from "next/image";

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=face&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&q=80",
];

export default function BootcampHero() {
  return (
    <section
      aria-label="Hero"
      className="bg-[hsl(var(--bg-primary-50))] pt-28 pb-6"
    >
      <div className="container-default">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-4">
            For Mid-Level &amp; Senior Designers
          </p>

          {/* Headline — single line */}
          <h1 className="mb-3 text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[56px] font-extrabold tracking-[-1.4px] text-foreground">
            Design it. Build it.{" "}
            <span className="text-primary">Ship it yourself.</span>
          </h1>

          {/* Subline */}
          <p className="mb-6 text-[17px] md:text-lg font-medium text-muted-foreground leading-[1.55]">
            Become a modern AI product design engineer in 12 weeks.
          </p>

          {/* Social proof row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Avatar stack */}
            <div className="flex -space-x-3 pr-3">
              {AVATARS.map((src, i) => (
                <div
                  key={i}
                  className="relative w-[30px] h-[30px] rounded-full border-2 border-[hsl(var(--bg-primary-50))] overflow-hidden"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="30px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Designers trained */}
            <p className="text-[16px] font-normal text-foreground tracking-[-0.18px]">
              12k+ Designers Trained
            </p>

            {/* Star rating */}
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#e3a020]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-[16px] font-normal text-foreground tracking-[-0.18px]">
                4.5
              </span>
            </div>

            {/* Level indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-end gap-[2px] h-5 w-5 p-[2px]">
                <div className="w-1 h-[7px] rounded-[1px] bg-[#e3a020]" />
                <div className="w-1 h-[11px] rounded-[1px] bg-[#e3a020]" />
                <div className="w-1 h-[15px] rounded-[1px] bg-[hsl(var(--bg-primary-200))]" />
              </div>
              <span className="text-[16px] font-normal text-foreground tracking-[-0.18px]">
                Intermediate
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-6 border-t border-[hsl(var(--border-primary-200))]" />
        </div>
      </div>
    </section>
  );
}
