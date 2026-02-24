/* =============================================================================
 * PUBLIC HOMEPAGE — First Fold Only
 * =============================================================================
 * Currently showing only the first fold (Hero + Secondary Nav).
 * Other sections are commented out and will be rebuilt component-by-component.
 * ========================================================================== */

import HeroSection from "@/components/sections/hero";
import ProductSecondaryNav from "@/components/sections/product-secondary-nav";
// import ValuePropsSection from "@/components/sections/value-props";
// import FeaturesSection from "@/components/sections/features";
// import SocialProofCtaSection from "@/components/sections/social-proof-cta";
// import TestimonialsSection from "@/components/sections/testimonials";
// import PricingSection from "@/components/sections/pricing";
// import MoneyBackSection from "@/components/sections/money-back";
// import FaqSection from "@/components/sections/faq";
// import ArticlesPreviewSection from "@/components/sections/articles-preview";
// import AiToolsSection from "@/components/sections/ai-tools";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductSecondaryNav />
      {/* <ValuePropsSection /> */}
      {/* <FeaturesSection /> */}
      {/* <SocialProofCtaSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <PricingSection /> */}
      {/* <MoneyBackSection /> */}
      {/* <FaqSection /> */}
      {/* <ArticlesPreviewSection /> */}
      {/* <AiToolsSection /> */}
    </>
  );
}
