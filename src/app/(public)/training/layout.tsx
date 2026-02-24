import type { Metadata } from "next";

/* =============================================================================
 * DESIGNERS: Training Page SEO Metadata
 * =============================================================================
 * Update title, description, and keywords for search engine optimization.
 * ========================================================================== */
export const metadata: Metadata = {
  title: "AI-First UX Training",
  description:
    "The future of UX is AI-Native. Join the waitlist for ProUX's AI-First UX Training program. Get early access, a launch discount, and a free AI Tools for UX starter guide.",
  keywords: [
    "UX training",
    "AI UX course",
    "AI-first design",
    "UX design course",
    "AI tools for UX",
    "UX professional training",
    "AI-native design",
  ],
  openGraph: {
    title: "AI-First UX Training | ProUX",
    description:
      "The future of UX is AI-Native. Join 850+ designers on the waitlist for early access and exclusive launch discounts.",
  },
};

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
