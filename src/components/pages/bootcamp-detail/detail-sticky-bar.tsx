"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { BootcampModule } from "@/lib/data/bootcamps";

export default function DetailStickyBar({
  module: mod,
}: {
  module: BootcampModule;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 inset-x-0 z-[100] hidden lg:block transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#f8f7f4]/95 backdrop-blur-md border-b border-[#e8e4d9]">
        <div className="container-default">
          <div className="flex items-center h-[72px] gap-6">
            {/* Course thumbnail */}
            <div className="relative h-[48px] w-[68px] shrink-0 rounded-[8px] overflow-hidden shadow-sm">
              <Image
                src={mod.image}
                alt={mod.title}
                fill
                sizes="68px"
                className="object-cover"
              />
            </div>

            {/* Title + meta */}
            <div className="min-w-0">
              <p className="text-[14px] font-bold text-foreground truncate max-w-[400px] leading-tight">
                {mod.title}
              </p>
              <div className="flex items-center gap-2.5 mt-1">
                <span className="text-[12px] text-muted-foreground font-medium">{mod.classCount} Classes</span>
                <span className="text-[12px] text-muted-foreground/40">&middot;</span>
                <span className="text-[12px] text-muted-foreground font-medium">{mod.hoursLive} Hours</span>
                <span className="text-[12px] text-muted-foreground/40">&middot;</span>
                <span className="text-[12px] text-muted-foreground font-medium">4 Weeks</span>
                <span className="text-[12px] text-muted-foreground/40">&middot;</span>
                <span className="text-[12px] text-muted-foreground font-medium">Cohort-Based</span>
              </div>
            </div>

            {/* Separator */}
            <span className="h-8 w-px bg-[#dfdbc9] shrink-0" />

            {/* Instructor */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative h-[36px] w-[36px] shrink-0 overflow-hidden rounded-full border-[2px] border-primary/30">
                <Image
                  src="/images/surinder-profile.jpg"
                  alt="Surinder Thakur"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-foreground leading-tight">
                  Surinder Thakur
                </p>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  Instructor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
