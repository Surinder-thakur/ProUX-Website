"use client";

import Image from "next/image";
import type { BootcampModule } from "@/lib/data/bootcamps";

export default function DetailCertification({
  module: mod,
}: {
  module: BootcampModule;
}) {
  return (
    <section className="py-7 md:py-10">
      <h2 className="text-[26px] md:text-[32px] font-extrabold tracking-[-0.6px] text-foreground mb-3">
        Certificate of Completion
      </h2>
      <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed max-w-xl mb-10">
        Graduate with a certificate, a new skill you can apply immediately,
        and a growing network of designers.
      </p>

      {/* Certificate image in white box */}
      <div className="rounded-2xl border border-[#e8e4d9] bg-white p-6 md:p-10">
        <Image
          src={mod.certificateImage || "/images/certificate.jpg"}
          alt={`${mod.title} — Certificate of Completion`}
          width={1400}
          height={900}
          className="w-full h-auto rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
        />
      </div>
    </section>
  );
}
