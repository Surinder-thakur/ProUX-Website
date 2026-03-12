import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Design Engineering Bootcamp",
  description:
    "Master AI-powered design workflows in 4 weeks. Prompt mastery, design systems, Figma-to-code, and UX strategic thinking. Live cohort-based classes capped at 12 students.",
  openGraph: {
    title: "AI Design Engineering Bootcamp | ProUX",
    description:
      "Master AI-powered design workflows in 4 weeks. Live cohort-based classes capped at 12 students.",
    url: "https://proux.design/bootcamps",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Design Engineering Bootcamp | ProUX",
    description:
      "Master AI-powered design workflows in 4 weeks. Live cohort-based classes capped at 12 students.",
  },
  alternates: {
    canonical: "https://proux.design/bootcamps",
  },
};

export default function BootcampsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
