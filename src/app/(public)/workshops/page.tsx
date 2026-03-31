import type { Metadata } from "next";
import BootcampHero from "@/components/pages/bootcamps/bootcamp-hero";
import BootcampModuleCards from "@/components/pages/bootcamps/bootcamp-module-cards";
import { getAllBootcamps } from "@/lib/data/bootcamps";

export const metadata: Metadata = {
  title: "AI Design Workshops — ProUX",
  description:
    "Live, cohort-based AI design workshops taught by Surinder Thakur. Master AI prompting, design systems, and shipping real products.",
};

/* ── JSON-LD Structured Data ────────────────────────────────────────────── */

function WorkshopJsonLd() {
  const bootcamps = getAllBootcamps();

  const courseInstances = bootcamps.map((mod) => ({
    "@type": "CourseInstance",
    name: mod.title,
    description: mod.tagline,
    courseMode: "Online",
    courseWorkload: "PT4W",
    url: `https://proux.design/workshops/${mod.slug}`,
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
    name: "AI Design Workshops",
    description:
      "Master AI-powered design workflows in live workshops. Prompt mastery, design systems, Figma-to-code, and UX strategic thinking. Cohort-based classes capped at 12 students.",
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
      ratingValue: "4.98",
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

export default function WorkshopsPage() {
  return (
    <div className="bg-[hsl(var(--bg-primary-50))]">
      <WorkshopJsonLd />
      <BootcampHero />
      <BootcampModuleCards variant="workshop" />
    </div>
  );
}
