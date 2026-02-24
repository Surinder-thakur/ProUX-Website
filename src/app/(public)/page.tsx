/* =============================================================================
 * PUBLIC HOMEPAGE
 * =============================================================================
 * DESIGNERS: This is the main landing page. All sections are imported and
 * rendered in order below. To reorder, add, or remove sections:
 * 1. Import/remove the section component
 * 2. Add/remove it from the JSX below
 * 3. Each section manages its own padding and background color
 *
 * Section order (top to bottom):
 * 1. Hero — headline, CTA, dashboard image, stats
 * 2. Value Props — 3 benefit cards
 * 3. Features — 6 detailed feature blocks
 * 4. Social Proof CTA — dark navy stats + upgrade CTA
 * 5. Testimonials — infinite scroll marquee
 * 6. Pricing — 3 tier cards
 * 7. Money Back — guarantee section
 * 8. FAQ — accordion
 * 9. Articles Preview — 2 latest blog posts
 * 10. AI Tools — 3 AI tool cards
 * ========================================================================== */

import HeroSection from "@/components/sections/hero";
import ValuePropsSection from "@/components/sections/value-props";
import FeaturesSection from "@/components/sections/features";
import SocialProofCtaSection from "@/components/sections/social-proof-cta";
import TestimonialsSection from "@/components/sections/testimonials";
import PricingSection from "@/components/sections/pricing";
import MoneyBackSection from "@/components/sections/money-back";
import FaqSection from "@/components/sections/faq";
import ArticlesPreviewSection from "@/components/sections/articles-preview";
import AiToolsSection from "@/components/sections/ai-tools";

export default function HomePage() {
  return (
    <main>
      {/* DESIGNERS: Reorder, add, or remove sections below as needed */}
      <HeroSection />
      <ValuePropsSection />
      <FeaturesSection />
      <SocialProofCtaSection />
      <TestimonialsSection />
      <PricingSection />
      <MoneyBackSection />
      <FaqSection />
      <ArticlesPreviewSection />
      <AiToolsSection />
    </main>
  );
}
