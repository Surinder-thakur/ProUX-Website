import type { Metadata } from "next";

/* =============================================================================
 * DESIGNERS: UX Consulting Page SEO Metadata
 * =============================================================================
 * Update title, description, and keywords for search engine optimization.
 * ========================================================================== */
export const metadata: Metadata = {
  title: "UX Consulting",
  description:
    "Expert UX consulting services including UX audits, design reviews, CRO optimization, and usability testing. Transform your product's user experience with ProUX.",
  keywords: [
    "UX consulting",
    "UX audit",
    "design review",
    "CRO optimization",
    "usability testing",
    "user experience consulting",
    "UX consultant",
  ],
  openGraph: {
    title: "UX Consulting | ProUX",
    description:
      "Expert UX consulting services including UX audits, design reviews, CRO optimization, and usability testing.",
  },
};

export default function UXConsultingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
