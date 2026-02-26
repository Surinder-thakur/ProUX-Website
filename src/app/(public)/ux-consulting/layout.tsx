import type { Metadata } from "next";

/* =============================================================================
 * DESIGNERS: UX Consulting Page SEO Metadata
 * =============================================================================
 * Update title, description, and keywords for search engine optimization.
 * ========================================================================== */
export const metadata: Metadata = {
  title: "UX Consulting — AI-Powered UX Audits & CRO",
  description:
    "Expert UX consulting for e-commerce and SaaS. AI-powered audits, validated prototypes, and data-backed UX strategy delivered in a 4-week sprint. Performance guaranteed.",
  keywords: [
    "UX consulting",
    "UX audit",
    "CRO optimization",
    "usability testing",
    "user experience consulting",
    "UX strategy",
    "e-commerce UX",
    "SaaS UX design",
    "conversion rate optimization",
    "AI UX audit",
  ],
  alternates: {
    canonical: "https://proux.design/ux-consulting",
  },
  openGraph: {
    title: "UX Consulting — AI-Powered UX Audits & CRO | ProUX",
    description:
      "AI-powered audits, validated prototypes, and data-backed UX strategy delivered in a 4-week sprint. Performance guaranteed.",
    url: "https://proux.design/ux-consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UX Consulting — AI-Powered UX Audits & CRO | ProUX",
    description:
      "AI-powered audits, validated prototypes, and data-backed UX strategy delivered in a 4-week sprint.",
  },
};

export default function UXConsultingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
