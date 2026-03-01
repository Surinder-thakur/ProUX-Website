import Image from "next/image";

/* ── Certification badges ─────────────────────────────────────────────── */

const badges = [
  { src: "/images/badge-nng.png", alt: "NN/g Certification Badge" },
  { src: "/images/badge-cua.png", alt: "hfi CUA Certification Badge" },
  { src: "/images/badge-cdpa.png", alt: "hfi CDPA Certification Badge" },
];

/* ── Component ────────────────────────────────────────────────────────── */

export default function ConsultingQuality() {
  return (
    <section className="bg-[hsl(var(--bg-primary-50))] py-20">
      <div className="mx-auto max-w-3xl px-4">
        {/* Card wrapper — relative so the profile image can be positioned */}
        <div className="relative bg-card rounded-[32px] shadow-sm p-8 md:p-12">
          {/* ── Profile image ─────────────────────────────────────────── */}
          {/* Mobile: centered above content */}
          <div className="flex justify-center mb-8 md:hidden">
            <div className="relative h-[170px] w-[170px] shrink-0 overflow-hidden rounded-full border-[5px] border-primary">
              <Image
                src="/images/surinder-profile.jpg"
                alt="Surinder Thakur — AI-First UX Consultant"
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
                alt="Surinder Thakur — AI-First UX Consultant"
                fill
                sizes="170px"
                className="object-cover"
              />
            </div>
          </div>

          {/* ── Text content ──────────────────────────────────────────── */}
          <div className="md:pl-24">
            {/* Heading */}
            <h2
              className="text-[32px] md:text-[40px] font-bold text-foreground leading-tight mb-6"
              style={{
                fontFamily: "var(--font-family-display)",
                letterSpacing: "-0.4px",
              }}
            >
              My Personal Commitment to You.
            </h2>

            {/* Paragraphs */}
            <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
              <p>
                When you work with me, you get me. Not a team, not juniors. I
                personally lead every audit, recommendation, and validation.
              </p>
              <p>
                18 years in this field, and what matters most: I stand behind
                every recommendation I make.
              </p>
              <p>
                If I find an issue, I won&apos;t just point it out. I&apos;ll
                show you how to fix it, prove it works with data, and give you
                everything to implement it right.
              </p>
              <p>That&apos;s my promise to every client.</p>
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
                AI-First UX Consultant &amp; Revenue Optimization Strategist
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
