"use client";

import Image from "next/image";
import { INSTRUCTOR } from "@/lib/data/bootcamps";

export default function DetailInstructor() {
  return (
    <section className="py-2">
      <p className="text-xs md:text-sm font-normal text-white/50 uppercase tracking-wider mb-3">
        Your Instructor
      </p>
      <h2 className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.6px] text-white mb-6">
        Meet Your Instructor
      </h2>

      <div className="flex flex-col sm:flex-row items-start gap-5">
        <div className="relative shrink-0 h-[120px] w-[120px] overflow-hidden rounded-full border-[4px] border-primary">
          <Image
            src="/images/surinder-profile.jpg"
            alt={`${INSTRUCTOR.name} — ${INSTRUCTOR.title}`}
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-0.5 tracking-[-0.2px]">
            {INSTRUCTOR.name}
          </h3>
          <p className="text-sm text-white/60 mb-3">
            {INSTRUCTOR.title} &middot; {INSTRUCTOR.credentials.join(" \u00B7 ")}
          </p>
          <p className="text-sm text-[#eaedf4] leading-relaxed italic">
            &ldquo;{INSTRUCTOR.quoteLong}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
