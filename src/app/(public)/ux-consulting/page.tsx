import ConsultingSecondaryNav from "@/components/sections/consulting/consulting-secondary-nav";
import ConsultingHero from "@/components/sections/consulting/consulting-hero";
import RealResults from "@/components/sections/consulting/real-results";
import ConsultingStats from "@/components/sections/consulting/consulting-stats";
import ConsultingProcess from "@/components/sections/consulting/consulting-process";
import HowItWorks from "@/components/sections/consulting/how-it-works";
import ConsultingPricing from "@/components/sections/consulting/consulting-pricing";
import ConsultingTestimonials from "@/components/sections/consulting/consulting-testimonials";
import ConsultingQuality from "@/components/sections/consulting/consulting-quality";
import ConsultingFaq from "@/components/sections/consulting/consulting-faq";
import ResearchBasedArticles from "@/components/sections/consulting/research-articles";
import ConsultingResults from "@/components/sections/consulting/consulting-results";

/**
 * UX Consulting Landing Page — /ux-consulting
 *
 * Section order:
 *  1.  ConsultingSecondaryNav  — floating pill nav (ROI Calculator, FAQ, Book Consultation)
 *  2.  Hero                    — headline, CTA, hero image, trust badges
 *  3.  RealResults             — infinite marquee of client result cards
 *  4.  Stats                   — 4-column stat bar (10x ROI, 250+ Funnels, 95% Repeat, 15% Lift)
 *  5.  Process                 — dark section: 4 weekly steps + ROI Calculator
 *  6.  HowItWorks              — dark section: 3 timeline steps, divider, CTA
 *  7.  Pricing                 — 3 pricing cards (Starter, Growth Sprint, Enterprise)
 *  8.  ConsultingTestimonials  — 3 text cards + 4 video testimonials
 *  9.  ConsultingQuality       — personal commitment card with photo + certifications
 * 10.  ConsultingFaq           — 5-item accordion
 * 11.  ResearchBasedArticles   — shared article cards section
 * 12.  ConsultingResults       — lead capture form → Supabase
 */
export default function UXConsultingPage() {
  return (
    <div className="relative bg-[hsl(var(--bg-primary-50))]">
      <ConsultingSecondaryNav />
      <ConsultingHero />
      <RealResults />
      <ConsultingStats />
      <ConsultingProcess />
      <HowItWorks />
      <ConsultingPricing />
      <ConsultingTestimonials />
      <ConsultingQuality />
      <ConsultingFaq />
      <ResearchBasedArticles />
      <ConsultingResults />
    </div>
  );
}
