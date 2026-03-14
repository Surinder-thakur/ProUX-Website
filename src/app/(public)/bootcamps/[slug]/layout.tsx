import type { Metadata } from "next";
import { getBootcampBySlug, getActiveTier } from "@/lib/data/bootcamps";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const mod = getBootcampBySlug(slug);

  if (!mod) {
    return { title: "Bootcamp Not Found" };
  }

  return {
    title: mod.title,
    description: mod.tagline,
    openGraph: {
      title: `${mod.title} | ProUX AI Design Bootcamp`,
      description: mod.tagline,
      url: `https://proux.design/bootcamps/${mod.slug}`,
      type: "website",
      images: [
        {
          url: mod.image,
          width: 1200,
          height: 630,
          alt: mod.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${mod.title} | ProUX`,
      description: mod.tagline,
      images: [mod.image],
    },
    alternates: {
      canonical: `https://proux.design/bootcamps/${mod.slug}`,
    },
  };
}

export default async function BootcampDetailLayout({ params, children }: Props) {
  const { slug } = await params;
  const mod = getBootcampBySlug(slug);

  if (!mod) return <>{children}</>;

  const tier = getActiveTier(mod);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: mod.title,
      description: mod.tagline,
      url: `https://proux.design/bootcamps/${mod.slug}`,
      provider: {
        "@type": "Organization",
        name: "ProUX",
        url: "https://proux.design",
      },
      instructor: {
        "@type": "Person",
        name: "Surinder Thakur",
        jobTitle: "AI-First UX Consultant & Design Engineer",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: "PT4W",
        startDate: mod.startDateISO,
        offers: {
          "@type": "Offer",
          price: tier.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.98",
        bestRating: "5",
        ratingCount: "12000",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: mod.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
