import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { galleries, getGallery } from "@/data/galleries";
import { siteProfile } from "@/data/site";
import GalleryContent from "./GalleryContent";

export function generateStaticParams() {
  return galleries.map((g) => ({ slug: g.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gallery = getGallery(slug);

  if (!gallery) {
    return {
      title: "Gallery not found",
    };
  }

  return {
    title: gallery.title,
    description: `${gallery.description} ${siteProfile.previewNotice}`,
  };
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;
  const gallery = getGallery(slug);

  if (!gallery) {
    notFound();
  }

  return <GalleryContent gallery={gallery} />;
}
