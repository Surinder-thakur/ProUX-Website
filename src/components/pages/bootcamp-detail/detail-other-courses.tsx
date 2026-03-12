"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getAllBootcamps, getActiveTier, type BootcampModule } from "@/lib/data/bootcamps";

export default function DetailOtherCourses({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const otherModules = getAllBootcamps().filter((m) => m.slug !== currentSlug);

  return (
    <section className="py-10 md:py-14">
      <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-3">
        Explore More
      </p>
      <h2 className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.6px] text-foreground mb-8">
        Other Bootcamps
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {otherModules.map((mod) => (
          <CourseCard key={mod.slug} module={mod} />
        ))}
      </div>
    </section>
  );
}

function CourseCard({ module: mod }: { module: BootcampModule }) {
  const tier = getActiveTier(mod);

  return (
    <Link
      href={`/bootcamps/${mod.slug}`}
      className="group flex flex-col rounded-xl border border-[#dfdbc9] bg-card overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative h-[140px] overflow-hidden">
        <Image
          src={mod.image}
          alt={mod.title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <Badge variant="secondary" className="absolute top-3 left-3 text-[11px]">
          {mod.badge}
        </Badge>
      </div>

      <div className="p-4">
        <h3 className="text-[15px] font-bold text-foreground mb-1 tracking-[-0.2px]">
          {mod.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {mod.tagline}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-foreground">
              ${tier.price}
            </span>
            <span className="text-xs text-muted-foreground line-through">
              ${tier.fullPrice}
            </span>
            {tier.discount > 0 && (
              <span className="text-[10px] font-bold text-emerald-600">
                {tier.discount}% OFF
              </span>
            )}
          </div>
          <span className="text-xs font-semibold text-primary group-hover:underline">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
