// HIDDEN: Workshop detail pages temporarily disabled. Re-enable by removing underscore prefix. Date: 2026-04-04
import { notFound, redirect } from "next/navigation";
import {
  getBootcampBySlug,
  getAllBootcampSlugs,
} from "@/lib/data/bootcamps";
import WorkshopDetailContent from "./workshop-detail-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBootcampSlugs().map((slug) => ({ slug }));
}

export default async function WorkshopDetailPage({ params }: Props) {
  const { slug } = await params;
  const mod = getBootcampBySlug(slug);

  if (!mod) {
    notFound();
  }

  if (mod.upcoming) {
    redirect("/workshops");
  }

  return <WorkshopDetailContent module={mod} />;
}
