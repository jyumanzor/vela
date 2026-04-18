import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceSheets, getServiceSheet } from "@/data/services";
import ServiceSheetContent from "./ServiceSheetContent";

export function generateStaticParams() {
  return serviceSheets.map((s) => ({ slug: s.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sheet = getServiceSheet(slug);
  if (!sheet) return { title: "Service not found" };
  return {
    title: `${sheet.title} — Cinque Photography`,
    description: sheet.tagline,
  };
}

export default async function ServiceSheetPage({ params }: Props) {
  const { slug } = await params;
  const sheet = getServiceSheet(slug);
  if (!sheet) notFound();
  return <ServiceSheetContent sheet={sheet} />;
}
