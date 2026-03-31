import type { Metadata } from "next";
import FounderStory from "@/components/pages/story/founder-story";

export const metadata: Metadata = {
  title: "Why I Built ProUX | Surinder Thakur",
  description:
    "18 years of UX consulting taught me one thing — great design without revenue strategy is just expensive decoration. Here's why I built ProUX.",
  openGraph: {
    title: "Why I Built ProUX | Surinder Thakur",
    description:
      "18 years of UX consulting taught me one thing — great design without revenue strategy is just expensive decoration. Here's why I built ProUX.",
    url: "https://proux.design/story",
    type: "article",
  },
  alternates: {
    canonical: "https://proux.design/story",
  },
};

export default function StoryPage() {
  return <FounderStory />;
}
