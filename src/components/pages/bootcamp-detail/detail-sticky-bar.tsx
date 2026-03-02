"use client";

import { useState, useEffect } from "react";
import type { BootcampModule } from "@/lib/data/bootcamps";

export default function DetailStickyBar({
  module: mod,
}: {
  module: BootcampModule;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~400px (hero area)
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 inset-x-0 z-50 hidden lg:block border-b border-[#dfdbc9] bg-card/95 backdrop-blur-md transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="container-default">
        <div className="flex items-center justify-between h-14">
          {/* Left: course info */}
          <div className="flex items-center gap-4">
            <p className="text-sm font-bold text-foreground truncate max-w-[300px]">
              {mod.title}
            </p>
            <span className="h-4 w-px bg-[#dfdbc9]" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{mod.classCount} Classes</span>
              <span className="h-3 w-px bg-[#dfdbc9]" />
              <span>{mod.hoursLive} Hours</span>
              <span className="h-3 w-px bg-[#dfdbc9]" />
              <span>4 Weeks</span>
            </div>
          </div>

          {/* Right: price + CTA */}
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-foreground">
                ${mod.earlyBirdUsd}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ${mod.priceUsd}
              </span>
              <span className="text-[11px] font-semibold text-primary uppercase">
                Early Bird
              </span>
            </div>
            <button className="btn-shine rounded-[10px] bg-primary px-5 h-[36px] text-[12px] font-semibold uppercase tracking-wide text-white shadow-sm transition-all hover:brightness-110">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
