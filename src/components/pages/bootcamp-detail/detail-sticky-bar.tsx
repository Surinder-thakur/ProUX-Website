"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { BootcampModule } from "@/lib/data/bootcamps";

export default function DetailStickyBar({
  module: mod,
  variant = "bootcamp",
}: {
  module: BootcampModule;
  variant?: "bootcamp" | "workshop";
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
      className={`fixed top-0 inset-x-0 z-[111] hidden lg:block transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#f8f7f4] border-b border-[#dfdbc9]">
        <div className="flex items-center justify-between px-[24px] lg:px-[100px] h-[64px]">

          {/* Left: thumbnail + title + meta */}
          <div className="flex items-center gap-5 min-w-0">
            <div className="relative h-[42px] w-[60px] shrink-0 rounded-[8px] overflow-hidden shadow-sm">
              <Image src={mod.image} alt={mod.title} fill sizes="60px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-bold text-foreground truncate max-w-[400px] leading-tight">
                {mod.title}
              </p>
              <div className="flex items-center gap-2.5 mt-1">
                {variant === "workshop" ? (
                  <>
                    <span className="text-[12px] text-muted-foreground font-medium">Live Workshop</span>
                    <span className="text-[12px] text-muted-foreground/40">&middot;</span>
                    <span className="text-[12px] text-muted-foreground font-medium">{mod.classCount} Modules</span>
                    <span className="text-[12px] text-muted-foreground/40">&middot;</span>
                    <span className="text-[12px] text-muted-foreground font-medium">Starts {mod.startDate}</span>
                  </>
                ) : (
                  <>
                    <span className="text-[12px] text-muted-foreground font-medium">{mod.classCount} Classes</span>
                    <span className="text-[12px] text-muted-foreground/40">&middot;</span>
                    <span className="text-[12px] text-muted-foreground font-medium">{mod.hoursLive} Hours</span>
                    <span className="text-[12px] text-muted-foreground/40">&middot;</span>
                    <span className="text-[12px] text-muted-foreground font-medium">4 Weeks</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: instructor — positioned to align left of ATC column */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="h-8 w-px bg-[#dfdbc9] mr-3" />
            <div className="relative h-[34px] w-[34px] shrink-0 overflow-hidden rounded-full border-[2px] border-primary/25">
              <Image src="/images/surinder-profile.jpg" alt="Surinder Thakur" fill sizes="34px" className="object-cover" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-foreground leading-tight">Surinder Thakur</p>
              <p className="text-[11px] text-muted-foreground leading-tight">Instructor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
