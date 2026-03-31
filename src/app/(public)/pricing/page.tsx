import type { Metadata } from "next";
import PricingSection from "@/components/sections/pricing";

export const metadata: Metadata = {
  title: "Pricing — ProUX",
  description:
    "Everything ProUX costs at a glance. Free forever tier, Pro annual plan, Lifetime access, and live AI Design Workshops.",
};

export default function PricingPage() {
  return (
    <div
      className="bg-background [&_#pricing]:bg-transparent [&_#pricing>div>div:first-child]:hidden [&_#pricing]:pt-6 [&_#pricing]:md:pt-8"
    >
      {/* Hero header — exact match to homepage hero layout */}
      <div className="pt-28 pb-0 md:pt-[120px]">
        <div className="mx-auto max-w-5xl xl:max-w-6xl text-center">
          {/* Eyebrow — same as homepage */}
          <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-6">
            Platform Pricing
          </p>

          {/* H1 — same sizes, weight, tracking, line-height as homepage */}
          <h1 className="text-[28px] leading-[34px] md:text-4xl lg:text-[48px] lg:leading-[56px] font-extrabold text-foreground tracking-[-1.4px] mb-6 px-6 md:px-0 max-w-[960px] mx-auto">
            Design with
            <span className="block text-primary">AI-Powered Confidence</span>
          </h1>

          {/* Subtitle — same as homepage */}
          <p className="text-sm md:text-base lg:text-[18px] lg:leading-[24px] font-medium text-[#4f4f4f] mx-auto max-w-2xl mb-8 px-6 md:px-0">
            Stop guessing. Start shipping. Make brilliant design decisions with 350+ proven guidelines and AI tools — in minutes, not days.
          </p>
        </div>
      </div>

      <PricingSection />
    </div>
  );
}
