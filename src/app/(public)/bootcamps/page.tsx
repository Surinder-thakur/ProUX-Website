import BootcampHero from "@/components/pages/bootcamps/bootcamp-hero";
import BootcampStatsBar from "@/components/pages/bootcamps/bootcamp-stats-bar";
import BootcampModuleCards from "@/components/pages/bootcamps/bootcamp-module-cards";
import BootcampHowItWorks from "@/components/pages/bootcamps/bootcamp-how-it-works";
import BootcampInstructor from "@/components/pages/bootcamps/bootcamp-instructor";
import { getAllBootcamps } from "@/lib/data/bootcamps";

/* ── JSON-LD Structured Data ────────────────────────────────────────────── */

function BootcampJsonLd() {
  const bootcamps = getAllBootcamps();

  const courseInstances = bootcamps.map((mod) => ({
    "@type": "CourseInstance",
    name: mod.title,
    description: mod.tagline,
    courseMode: "Online",
    courseWorkload: "PT4W",
    url: `https://proux.design/bootcamps/${mod.slug}`,
    image: mod.image,
    offers: [
      {
        "@type": "Offer",
        name: "Early Access",
        price: mod.pricingTiers.earlyBird.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        validThrough: mod.pricingTiers.earlyBird.deadline,
      },
      {
        "@type": "Offer",
        name: "Standard",
        price: mod.pricingTiers.standard.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: mod.pricingTiers.earlyBird.deadline,
        validThrough: mod.pricingTiers.standard.deadline,
      },
      {
        "@type": "Offer",
        name: "Last Call",
        price: mod.pricingTiers.lastCall.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: mod.pricingTiers.standard.deadline,
      },
    ],
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "AI Design Engineering Bootcamp",
    description:
      "Master AI-powered design workflows in 4 weeks. Prompt mastery, design systems, Figma-to-code, and UX strategic thinking. Live cohort-based classes capped at 12 students.",
    provider: {
      "@type": "Organization",
      name: "ProUX",
      url: "https://proux.design",
    },
    instructor: {
      "@type": "Person",
      name: "Surinder Thakur",
      jobTitle: "AI-First UX Consultant & Design Engineer",
      url: "https://www.surinder.design",
    },
    hasCourseInstance: courseInstances,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "12000",
      bestRating: "5",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function BootcampsPage() {
  return (
    <div className="bg-[hsl(var(--bg-primary-50))]">
      <BootcampJsonLd />
      <BootcampHero />
      <BootcampModuleCards />
      <BootcampStatsBar />
      <BootcampHowItWorks />
      <BootcampInstructor />
    </div>
  );
}
