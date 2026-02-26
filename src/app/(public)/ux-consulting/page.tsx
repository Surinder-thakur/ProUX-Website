import ConsultingSecondaryNav from "@/components/pages/consulting/consulting-secondary-nav";
import ConsultingHero from "@/components/pages/consulting/consulting-hero";
import RealResults from "@/components/pages/consulting/real-results";
import ConsultingStats from "@/components/pages/consulting/consulting-stats";
import ConsultingProcess from "@/components/pages/consulting/consulting-process";
import ConsultingTestimonials from "@/components/pages/consulting/consulting-testimonials";
import ConsultingQuality from "@/components/pages/consulting/consulting-quality";
import ConsultingFaq from "@/components/pages/consulting/consulting-faq";
import ResearchBasedArticles from "@/components/pages/consulting/research-articles";
import ConsultingResults from "@/components/pages/consulting/consulting-results";

/**
 * UX Consulting Landing Page — /ux-consulting
 *
 * Section order:
 *  1.  ConsultingSecondaryNav  — floating pill nav (ROI Calculator, FAQ, Book Consultation)
 *  2.  Hero                    — headline, CTA, hero image, trust badges
 *  3.  RealResults             — infinite marquee of client result cards
 *  4.  Stats                   — 4-column stat bar (10x ROI, 250+ Funnels, 95% Repeat, 15% Lift)
 *  5.  Process                 — dark section: 4 weekly steps + ROI Calculator
 *  6.  ConsultingTestimonials  — 3 text cards + 4 video testimonials
 *  7.  ConsultingQuality       — personal commitment card with photo + certifications
 *  8.  ConsultingFaq           — 5-item accordion
 *  9.  ResearchBasedArticles   — shared article cards section
 * 10.  ConsultingResults       — lead capture form → Supabase
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does the engagement take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our standard engagement is a 4-week sprint. Week 1 is for research and audit, Week 2 for strategy, Week 3 for design prototyping, and Week 4 for validation and testing.",
      },
    },
    {
      "@type": "Question",
      name: "What deliverables will I receive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You will receive a comprehensive audit report, strategic roadmap, high-fidelity Figma design files, interactive prototypes, and a validation report with user testing insights.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an existing design team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, we can function as your standalone product design team for the duration of the project. If you do have a team, we work alongside them to accelerate their output.",
      },
    },
    {
      "@type": "Question",
      name: "How do you handle handoff to developers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide clean, developer-ready Figma files with annotations, measurements, and asset exports. We also offer a walkthrough session with your engineering team.",
      },
    },
    {
      "@type": "Question",
      name: "What if I'm not satisfied with the results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work in weekly sprints with regular check-ins to ensure alignment. If we don't meet the agreed-upon KPIs, we'll work with you to make it right.",
      },
    },
  ],
};

export default function UXConsultingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="relative bg-[hsl(var(--bg-primary-50))]">
        <ConsultingSecondaryNav />
        <ConsultingHero />
        <RealResults />
        <ConsultingStats />
        <ConsultingProcess />
        <ConsultingTestimonials />
        <ConsultingQuality />
        <ConsultingFaq />
        <ResearchBasedArticles />
        <ConsultingResults />
      </div>
    </>
  );
}
