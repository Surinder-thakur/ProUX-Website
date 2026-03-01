import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Design Training | ProUX",
  description:
    "Master the future of UX design with hands-on, AI-first training courses. Learn from an NN/g certified instructor with 15+ years of experience.",
  keywords: [
    "UX training",
    "AI UX course",
    "AI-first design",
    "UX design course",
    "AI tools for UX",
    "UX professional training",
    "AI-native design",
    "design systems course",
    "UX strategy",
    "accessibility training",
  ],
  openGraph: {
    title: "AI Design Training | ProUX",
    description:
      "Master the future of UX design with hands-on, AI-first training courses. 5 courses, 50+ hours, NN/g certified instructor.",
  },
};

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
