"use client";

import Image from "next/image";
import { INSTRUCTOR } from "@/lib/data/bootcamps";

export default function BootcampInstructor() {
  return (
    <section className="bg-[hsl(var(--bg-primary-50))] py-16 md:py-20">
      <div className="container-default">
        <div className="rounded-2xl bg-[#242424] p-6 md:p-8">
          <p className="text-xs md:text-sm font-normal text-white/50 uppercase tracking-wider mb-4">
            Your Instructor
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
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
              <h3 className="text-xl font-bold text-white mb-1 tracking-[-0.3px]">
                {INSTRUCTOR.name}
              </h3>
              <p className="text-sm text-white/60 mb-4">
                {INSTRUCTOR.title} &middot; {INSTRUCTOR.credentials.join(" \u00B7 ")}
              </p>
              <p className="text-base text-[#eaedf4] leading-relaxed italic max-w-xl">
                &ldquo;{INSTRUCTOR.quoteLong}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
