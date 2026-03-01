import Image from "next/image";
import Link from "next/link";

const certBadges = [
  { src: "/images/badge-nng.png", alt: "Nielsen Norman Group Certification" },
  { src: "/images/badge-cua.png", alt: "CUA Certification" },
  { src: "/images/badge-cdpa.png", alt: "CDPA Certification" },
];

const trustStats = [
  { value: "12k+", labelLine1: "Design Engineers", labelLine2: "TRAINED", hasStars: false },
  { value: "4.98", valueSuffix: "/5", labelLine1: "Positive Reviews", labelLine2: "", hasStars: true },
  { value: "100%", labelLine1: "Money Back", labelLine2: "GUARANTEE", hasStars: false },
];

function StarIcon() {
  return (
    <svg className="h-4 w-4 fill-current text-foreground" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="bg-background pt-28 pb-14 md:pb-20 overflow-hidden">
      <div className="container-default">
        {/* Hero content — centered */}
        <div className="mx-auto max-w-5xl xl:max-w-6xl text-center">
          {/* Eyebrow */}
          <p className="text-xs md:text-sm font-regular text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-6">
            For Product Designers, UX Teams &amp; Founders
          </p>

          {/* H1 */}
          <h1 className="text-[28px] leading-[34px] md:text-4xl lg:text-[48px] lg:leading-[56px] font-extrabold text-foreground tracking-[-1.4px] mb-6 px-6 md:px-0 max-w-[960px] mx-auto">
            Ship Better Designs in<br className="lg:hidden" /> Half the Time.
            <span className="block text-primary">AI-Powered UX Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base lg:text-[18px] lg:leading-[24px] font-medium text-[#4f4f4f] mx-auto max-w-2xl mb-8 px-6 md:px-0">
            AI-powered UX intelligence for research, audits, and optimization grounded in 350+ expert guidelines &amp; insights.
          </p>

          {/* CTA button with shine */}
          <div className="mb-10">
            <Link
              href="https://app.proux.design/Auth"
              className="btn-shine inline-flex items-center justify-center bg-primary text-primary-foreground rounded-[12px] w-full max-w-[360px] md:w-auto md:px-[40px] h-[56px] md:h-[56px] text-[14px] font-semibold uppercase tracking-[0.35px] shadow-lg transition-all hover:shadow-xl hover:brightness-110"
            >
              Start Free
            </Link>
            <p className="text-xs text-muted-foreground mt-2">No credit card required</p>
          </div>

          {/* Certifications row */}
          <div className="mb-12 flex flex-col items-center gap-4">
            <p className="font-medium text-foreground text-[12px] tracking-[0.96px] uppercase opacity-80">
              Built by Certified Professionals
            </p>
            <div className="flex items-center gap-5">
              {certBadges.map((badge) => (
                <Image
                  key={badge.alt}
                  src={badge.src}
                  alt={badge.alt}
                  width={127}
                  height={127}
                  className="h-[92px] md:h-[115px] w-auto"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product preview image card */}
        <div className="mx-auto max-w-[915px]">
          <div className="bg-card rounded-[24px] shadow-[0px_-16px_94px_10px_rgba(222,215,179,0.3)] overflow-hidden">
            <Image
              src="/images/hero-dashboard.png"
              alt="ProUX AI-First UX Intelligence Platform Dashboard"
              width={915}
              height={549}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>

        {/* Trust stats */}
        <div className="mt-12 mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-10">
            {trustStats.map((stat) => (
              <div
                key={stat.labelLine1}
                className="flex items-center gap-3 py-1.5 sm:py-0"
              >
                <div className="relative leading-[40px]">
                  <span className="text-[36px] font-black text-foreground">
                    {stat.value}
                  </span>
                  {stat.valueSuffix && (
                    <span className="text-[18px] font-medium text-muted-foreground align-baseline">
                      {stat.valueSuffix}
                    </span>
                  )}
                </div>
                <div>
                  {stat.hasStars && (
                    <div className="flex items-center gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                  )}
                  <p className="text-[12px] font-bold leading-[15px] text-[hsl(var(--text-primary-600))] uppercase tracking-[1.2px] whitespace-nowrap">
                    {stat.labelLine1}
                  </p>
                  {stat.labelLine2 && (
                    <p className="text-[12px] font-bold leading-[15px] text-[hsl(var(--text-primary-600))] uppercase tracking-[1.2px]">
                      {stat.labelLine2}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
