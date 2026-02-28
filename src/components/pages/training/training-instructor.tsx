import Image from "next/image";
import { ExternalLink } from "lucide-react";

/* ── Certification badges ─────────────────────────────────────────────── */

const badges = [
  { src: "/images/badge-nng.png", alt: "NN/g UX Certification Badge" },
  { src: "/images/badge-cua.png", alt: "hfi CUA Certification Badge" },
  { src: "/images/badge-cdpa.png", alt: "hfi CDPA Certification Badge" },
];

/* ── Social links ─────────────────────────────────────────────────────── */

const socials = [
  {
    label: "Twitter",
    href: "https://twitter.com/surikishan",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/surinderthakur",
  },
];

/* ── Component ────────────────────────────────────────────────────────── */

export function TrainingInstructor() {
  return (
    <section className="bg-white section-padding">
      <div className="container-default">
        <div className="mx-auto max-w-[860px]">
          <div className="flex flex-col items-center rounded-[12px] bg-[hsl(var(--bg-primary-100))] px-6 py-8 sm:px-10 sm:py-10">
            {/* Profile photo */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/surinder-profile.jpg"
                alt="Surinder Thakur — AI-First UX Instructor"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            {/* Bio text */}
            <p className="mt-4 max-w-lg text-center text-[16px] leading-[26px] text-[hsl(var(--text-neutrals-800))] sm:text-[18px] sm:leading-[28px]">
              NN/g certified UX consultant with 15+ years of experience.
              Surinder has trained over 12,000 designers globally and delivered
              $100M+ in measurable impact for organizations ranging from
              startups to Fortune 500 companies.
            </p>

            {/* Social links */}
            <div className="mt-4 flex items-center gap-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[14px] font-medium text-[hsl(var(--text-primary-600))] transition-colors hover:text-[hsl(var(--text-primary-800))]"
                >
                  {s.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>

            {/* Certification badges */}
            <div className="mt-6 flex items-center gap-4">
              {badges.map((badge) => (
                <Image
                  key={badge.alt}
                  src={badge.src}
                  alt={badge.alt}
                  height={80}
                  width={80}
                  className="h-[70px] w-auto object-contain mix-blend-multiply sm:h-[80px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
