"use client";

import Image from "next/image";
import Link from "next/link";

/* ── Data ──────────────────────────────────────────────────────────────── */

const STATS = [
  { value: "18+", label: "Years" },
  { value: "$100M+", label: "Impact" },
  { value: "12,000+", label: "Designers Trained" },
  { value: "4.98/5", label: "Rating" },
];

/* ══════════════════════════════════════════════════════════════════════════
   FOUNDER STORY — Chapters Layout
   All reading content capped at max-w-[720px].
   Full-bleed used only for background treatments, never for text width.
   ══════════════════════════════════════════════════════════════════════════ */

export default function FounderStory() {
  return (
    <div>
      {/* ══════════════════════════════════════════════════════════════════
          HERO — Two-column: story intro left, large portrait right
         ══════════════════════════════════════════════════════════════════ */}
      <section
        className="pt-28 pb-14 md:pt-36 md:pb-20"
        style={{
          background: "linear-gradient(to bottom, #f8f7f4 0%, #ffffff 400px)",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
            {/* Left — text + signature */}
            <div className="max-w-[560px]">
              <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-4">
                Founder Story
              </p>
              <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-foreground leading-[1.08] tracking-[-2px] mb-6">
                Why I Built ProUX
              </h1>
              <p className="text-[18px] md:text-[21px] font-normal text-muted-foreground leading-[1.6] mb-8">
                18 years in. Still asking the same question — why does good design so often fail to move the business?
              </p>
              <Image
                src="/images/consulting/signature-surinder.png"
                alt="Surinder.T"
                width={641}
                height={173}
                className="h-[36px] w-auto object-contain opacity-40"
              />
            </div>

            {/* Right — large portrait */}
            <div className="relative w-[220px] h-[280px] md:w-[300px] md:h-[380px] rounded-[28px] overflow-hidden shadow-[0px_24px_64px_rgba(0,0,0,0.08)]">
              <Image
                src="/images/surinder-profile.jpg"
                alt="Surinder Thakur"
                fill
                className="object-cover"
                sizes="300px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 1 — Opening
         ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-[720px] mx-auto px-6 md:px-10">
          <p className="text-[24px] md:text-[30px] font-medium text-foreground leading-[1.45] mb-10">
            I started in India in 2007.<br />
            Freelancing. Figuring it out.
          </p>
          <div className="space-y-6 text-[17px] md:text-[18px] text-muted-foreground leading-[1.8]">
            <p>
              By 2012 I was working remote for US companies. By 2016 I was
              leading design teams. By 2023 I was running UX at Puffy — and we
              grew their revenue 67% through a systematic, research-driven
              redesign.
            </p>
            <p>Different companies. Different industries. Different teams.</p>
          </div>
        </div>
      </section>

      {/* ── Dramatic divider ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#1a2130]">
        <div className="max-w-[720px] mx-auto px-6 md:px-10 text-center">
          <p className="text-[30px] md:text-[44px] font-black text-white leading-[1.12] tracking-[-1.5px]">
            Same problem<br />every single time.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 2 — The Problem
         ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-[720px] mx-auto px-6 md:px-10">
          <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-4">
            The Pattern
          </p>
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-foreground leading-[1.1] tracking-[-1px] mb-10">
            The Problem I Kept<br className="hidden md:block" /> Running Into
          </h2>

          <div className="border-l-[3px] border-primary/30 pl-8 space-y-5 text-[17px] md:text-[18px] text-muted-foreground leading-[1.8] mb-12">
            <p>Talented designers. Some genuinely brilliant.</p>
            <p>But designing in a vacuum.</p>
            <p>Handing off flows no developer could actually build.</p>
            <p>Running research nobody read.</p>
            <p>
              Shipping products that looked great in Figma and barely
              converted in the real world.
            </p>
          </div>

          {/* Turning point — larger, bolder */}
          <div className="rounded-[20px] bg-[hsl(var(--gold-50))] border border-[#e8e4d9] p-8 md:p-10">
            <p className="text-[20px] md:text-[24px] font-bold text-foreground leading-[1.35] mb-3">
              The gap wasn&apos;t skill.
            </p>
            <p className="text-[20px] md:text-[24px] font-bold text-foreground leading-[1.35] mb-5">
              It was the missing connection between design decisions and what
              the business actually needed.
            </p>
            <p className="text-[16px] md:text-[17px] text-muted-foreground leading-[1.7]">
              Nobody taught them to think that way. The tools didn&apos;t help
              either.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 3 — Consulting
         ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[hsl(var(--gold-50))]">
        <div className="max-w-[720px] mx-auto px-6 md:px-10">
          <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-4">
            The Proof
          </p>
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-foreground leading-[1.1] tracking-[-1px] mb-10">
            What Consulting Fixed —<br className="hidden md:block" /> And What It Couldn&apos;t
          </h2>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { value: "$100M+", label: "Product Impact" },
              { value: "18+", label: "Years" },
              { value: "+67%", label: "Revenue at Puffy" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white border border-[#e8e4d9] py-6 px-4 text-center shadow-[0px_4px_20px_rgba(222,215,179,0.18)]"
              >
                <p className="text-[26px] md:text-[34px] font-black text-foreground leading-none mb-2 tracking-[-0.5px]">
                  {s.value}
                </p>
                <p className="text-[10px] md:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-6 text-[17px] md:text-[18px] text-muted-foreground leading-[1.8]">
            <p>
              I built the Revenue Optimization Sprint to solve this at the
              company level. 4-week engagements. Deep research. Systematic
              redesign. Real outcomes.
            </p>
            <p>
              It worked. Clients across the US, UAE, India, Europe. +67%
              revenue at Puffy. -14% cart abandonment. Products launched in
              under 3 months.
            </p>
          </div>
        </div>
      </section>

      {/* ── Dramatic divider — the ceiling ───────────────────────────── */}
      <section className="py-14 md:py-20 bg-[hsl(var(--gold-100))]">
        <div className="max-w-[720px] mx-auto px-6 md:px-10 text-center">
          <p className="text-[26px] md:text-[36px] font-bold text-foreground leading-[1.25] mb-4">
            But consulting has a ceiling.
          </p>
          <p className="text-[18px] md:text-[22px] italic text-foreground/60 leading-[1.55]">
            I could fix one company&apos;s UX at a time. The designer inside
            that company still didn&apos;t know why it worked. Couldn&apos;t
            replicate it next project.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 4 — Why ProUX Exists
          Cards go slightly wider (max-w-[960px]) for the 3-col grid,
          but text stays at 720px.
         ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-[720px] mx-auto px-6 md:px-10 text-center mb-14">
          <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-4">
            The Solution
          </p>
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-foreground leading-[1.1] tracking-[-1px] mb-4">
            ProUX Is the System<br className="hidden md:block" /> I Wish Had Existed
          </h2>
          <p className="text-[17px] md:text-[18px] text-muted-foreground leading-[1.6]">
            I built ProUX to make what I learned accessible — not just
            billable. Three things. Connected by one purpose.
          </p>
        </div>

        {/* Cards — slightly wider container for 3-col */}
        <div className="max-w-[960px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {[
              {
                num: "01",
                title: "The Platform",
                desc: "AI-powered UX intelligence grounded in 350+ expert principles. Expert-level feedback without waiting for a consultant.",
                link: { label: "Explore Platform", href: "/" },
              },
              {
                num: "02",
                title: "The Training",
                desc: "Workshops that teach what agencies actually do. Real deliverables. Small groups. Direct feedback from me every session.",
                link: { label: "View Workshops", href: "/workshops" },
              },
              {
                num: "03",
                title: "The Consulting",
                desc: "For companies that need the full transformation. Same methodology. Same frameworks. Hands-on engagement.",
                link: {
                  label: "Learn More",
                  href: "https://www.surinder.design",
                },
              },
            ].map((item) => (
              <div
                key={item.num}
                className="flex flex-col rounded-[24px] border border-[#e8e4d9] bg-card p-7 shadow-[0px_4px_24px_rgba(222,215,179,0.12)] hover:shadow-[0px_8px_32px_rgba(222,215,179,0.2)] transition-shadow"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[hsl(var(--gold-100))] text-[14px] font-bold text-primary mb-5">
                  {item.num}
                </span>
                <h3 className="text-[20px] font-bold text-foreground tracking-[-0.3px] mb-3">
                  {item.title}
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-5 flex-1">
                  {item.desc}
                </p>
                {item.link.href.startsWith("http") ? (
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-semibold text-primary hover:underline"
                  >
                    {item.link.label} &rarr;
                  </a>
                ) : (
                  <Link
                    href={item.link.href}
                    className="text-[14px] font-semibold text-primary hover:underline"
                  >
                    {item.link.label} &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-[26px] md:text-[32px] font-black text-foreground tracking-[-0.5px]">
            One system. Three levels of involvement.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHAPTER 5 — Who It's For
         ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[hsl(var(--gold-50))]">
        <div className="max-w-[720px] mx-auto px-6 md:px-10">
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-foreground leading-[1.1] tracking-[-1px] text-center mb-12">
            Who This Is For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div className="rounded-[24px] bg-white border border-[#e8e4d9] p-8 shadow-[0px_4px_20px_rgba(222,215,179,0.12)]">
              <p className="text-[12px] font-bold uppercase tracking-wider text-primary mb-4">
                For Designers
              </p>
              <p className="text-[16px] text-muted-foreground leading-[1.7]">
                You&apos;re a mid-level or senior designer tired of executing
                other people&apos;s ideas. You want to own the strategy. Speak
                the language of revenue, not just pixels.
              </p>
            </div>
            <div className="rounded-[24px] bg-white border border-[#e8e4d9] p-8 shadow-[0px_4px_20px_rgba(222,215,179,0.12)]">
              <p className="text-[12px] font-bold uppercase tracking-wider text-primary mb-4">
                For Founders
              </p>
              <p className="text-[16px] text-muted-foreground leading-[1.7]">
                You have UX debt quietly killing your conversion rate — and
                you want someone who&apos;s fixed this before.
              </p>
            </div>
          </div>

          <p className="text-[22px] md:text-[26px] font-bold text-foreground text-center">
            ProUX is built for both of you.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CREDENTIALS STRIP
         ══════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 border-b border-[#e8e4d9]">
        <div className="max-w-[720px] mx-auto px-6 md:px-10">
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[26px] md:text-[30px] font-black text-foreground leading-none mb-1 tracking-[-0.5px]">
                  {stat.value}
                </p>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BOTTOM CTA
         ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-[960px] mx-auto px-6 md:px-10">
          <div className="rounded-[24px] bg-[#1a2130] text-white py-14 md:py-20 px-8 md:px-16 text-center shadow-[0px_16px_60px_rgba(26,33,48,0.2)]">
            <h2 className="text-[32px] md:text-[44px] font-extrabold leading-[1.1] tracking-[-1.5px] mb-8">
              Ready to build, ship<br className="hidden md:block" /> and lead
              with AI?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="btn-shine inline-flex items-center justify-center text-[14px] font-bold uppercase tracking-[0.35px] rounded-[12px] px-10 h-[56px] bg-white text-[#1a2130] shadow-lg transition-all hover:shadow-xl hover:brightness-95"
              >
                Explore the Platform
              </Link>
              <Link
                href="/workshops"
                className="inline-flex items-center justify-center text-[14px] font-bold uppercase tracking-[0.35px] rounded-[12px] px-10 h-[56px] border border-white/25 text-white transition-colors hover:bg-white/10"
              >
                Join a Workshop
              </Link>
              <a
                href="https://www.surinder.design"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-[14px] font-bold uppercase tracking-[0.35px] rounded-[12px] px-10 h-[56px] border border-white/25 text-white transition-colors hover:bg-white/10"
              >
                Book Consulting
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER BIO
         ══════════════════════════════════════════════════════════════════ */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-[720px] mx-auto px-6 md:px-10">
          <div className="flex items-start gap-5 border-t border-[#e8e4d9] pt-10">
            <Image
              src="/images/surinder-profile.jpg"
              alt="Surinder Thakur"
              width={64}
              height={64}
              className="w-[64px] h-[64px] rounded-full object-cover shrink-0"
            />
            <p className="text-[15px] md:text-[16px] text-muted-foreground leading-[1.7]">
              <span className="font-bold text-foreground">
                Surinder Thakur
              </span>{" "}
              is an NN/g-certified UX consultant, HFI-CUA&trade; and
              HFI-CDPA&trade; with 18+ years of experience. Founder of ProUX.
              Design lead behind $100M+ in measurable product impact across
              SaaS, eCommerce and enterprise. Consulting work at{" "}
              <a
                href="https://www.surinder.design"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                surinder.design
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
