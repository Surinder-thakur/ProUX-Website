import type { Metadata } from "next";
import { getBootcampBySlug } from "@/lib/data/bootcamps";

interface Props {
  params: Promise<{ slug: string }>;
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
      title: `${mod.title} | ProUX Design Engineering Bootcamp`,
      description: mod.tagline,
      url: `https://proux.design/bootcamps/${mod.slug}`,
    },
  };
}

export default function BootcampDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
