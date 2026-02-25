/* =============================================================================
 * PUBLIC HOMEPAGE — First Fold Only
 * =============================================================================
 * Currently showing only the first fold (Hero + Secondary Nav).
 * Other sections are commented out and will be rebuilt component-by-component.
 * ========================================================================== */

import HeroSection from "@/components/sections/hero";
import StatsBar from "@/components/sections/stats-bar";
import BenefitStatsSection from "@/components/sections/benefit-stats";
import FeaturesSection from "@/components/sections/features";
import ProductSecondaryNav from "@/components/sections/product-secondary-nav";
import CallToActionSection from "@/components/sections/call-to-action";
// import SocialProofCtaSection from "@/components/sections/social-proof-cta";
import TestimonialsSection from "@/components/sections/testimonials";
import PricingSection from "@/components/sections/pricing";
import MoneyBackSection from "@/components/sections/money-back";
import FaqSection from "@/components/sections/faq";
import ArticlesPreviewSection from "@/components/sections/articles-preview";
import AiToolsSection from "@/components/sections/ai-tools";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <BenefitStatsSection />
      <FeaturesSection />
      <CallToActionSection />
      <TestimonialsSection />
      <PricingSection />
      <ProductSecondaryNav />
      <MoneyBackSection />
      <FaqSection />
      <ArticlesPreviewSection />
      <AiToolsSection />
      {/* <SocialProofCtaSection /> */}
    </>
  );
}
