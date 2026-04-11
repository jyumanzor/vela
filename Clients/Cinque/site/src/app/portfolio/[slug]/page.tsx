import { notFound } from "next/navigation";
import { galleries, getGallery } from "@/data/galleries";
import GalleryContent from "./GalleryContent";

export function generateStaticParams() {
  return galleries.map((g) => ({ slug: g.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;
  const gallery = getGallery(slug);

  if (!gallery) {
    notFound();
  }

  return <GalleryContent gallery={gallery} />;
}
