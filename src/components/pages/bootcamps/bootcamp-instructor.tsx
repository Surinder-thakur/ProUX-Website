import Image from "next/image";

const badges = [
  { src: "/images/badge-nng.png", alt: "NN/g Certification Badge" },
  { src: "/images/badge-cua.png", alt: "hfi CUA Certification Badge" },
  { src: "/images/badge-cdpa.png", alt: "hfi CDPA Certification Badge" },
];

export default function BootcampInstructor() {
  return (
    <section className="bg-[hsl(var(--bg-primary-50))] py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4">
        {/* Card wrapper — relative so the profile image can be positioned */}
        <div className="relative bg-card rounded-[32px] shadow-sm p-8 md:p-12">
          {/* ── Profile image ─────────────────────────────────────────── */}
          {/* Mobile: centered above content */}
          <div className="flex justify-center mb-8 md:hidden">
            <div className="relative h-[170px] w-[170px] shrink-0 overflow-hidden rounded-full border-[5px] border-primary">
              <Image
                src="/images/surinder-profile.jpg"
                alt="Surinder Thakur — AI Design Engineer Instructor"
                fill
                sizes="170px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Desktop: absolute-positioned to the left of the card */}
          <div className="hidden md:block absolute top-12 -left-[85px]">
            <div className="relative h-[170px] w-[170px] shrink-0 overflow-hidden rounded-full border-[5px] border-primary">
              <Image
                src="/images/surinder-profile.jpg"
                alt="Surinder Thakur — AI Design Engineer Instructor"
                fill
                sizes="170px"
                className="object-cover"
              />
            </div>
          </div>

          {/* ── Text content ──────────────────────────────────────────── */}
          <div className="md:pl-24">
            {/* Eyebrow */}
            <p className="text-[12px] font-bold uppercase tracking-wider text-[hsl(var(--text-primary-600))] mb-4">
              Your Instructor
            </p>

            {/* Heading */}
            <h2
              className="text-[28px] md:text-[36px] font-bold text-foreground leading-tight mb-5"
              style={{
                fontFamily: "var(--font-family-display)",
                letterSpacing: "-0.4px",
              }}
            >
              Learn From Someone Who Ships.
            </h2>

            {/* Body */}
            <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                I don&apos;t just teach design — I build and ship products. Every
                bootcamp exercise comes from real projects I&apos;ve delivered for
                startups and enterprises over 18 years.
              </p>
              <p>
                You&apos;ll get direct feedback from me in every session. Small
                cohorts, no TAs, no recordings as a substitute for live teaching.
              </p>
            </div>

            {/* ── Signature area ──────────────────────────────────────── */}
            <div className="mt-8">
              <Image
                src="/images/consulting/signature-surinder.png"
                alt="Surinder.T"
                width={641}
                height={173}
                className="h-[40px] w-auto object-contain opacity-60 mb-2"
              />
              <p className="text-base font-bold text-foreground">
                Surinder Thakur
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                AI-First UX Consultant &amp; Design Engineer
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                NN/g Certified | hfi CUA&reg; | hfi CDPA&reg;
              </p>

              {/* Certification badges */}
              <div className="mt-5 flex items-center gap-4">
                {badges.map((badge) => (
                  <div key={badge.alt} className="relative h-[110px] w-auto">
                    <Image
                      src={badge.src}
                      alt={badge.alt}
                      height={110}
                      width={110}
                      className="h-[110px] w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
