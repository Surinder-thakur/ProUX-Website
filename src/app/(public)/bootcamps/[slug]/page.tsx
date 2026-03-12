import { notFound } from "next/navigation";
import {
  getBootcampBySlug,
  getAllBootcampSlugs,
} from "@/lib/data/bootcamps";
import DetailContent from "./detail-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBootcampSlugs().map((slug) => ({ slug }));
}

export default async function BootcampDetailPage({ params }: Props) {
  const { slug } = await params;
  const mod = getBootcampBySlug(slug);

  if (!mod) {
    notFound();
  }

  return <DetailContent module={mod} />;
}
