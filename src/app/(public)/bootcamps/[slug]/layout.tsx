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
    },
    alternates: {
      canonical: `https://proux.design/bootcamps/${mod.slug}`,
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
