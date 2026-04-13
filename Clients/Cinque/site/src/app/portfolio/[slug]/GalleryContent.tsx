"use client";

import { useState } from "react";
import Link from "next/link";
import PhotoFrame from "@/components/PhotoFrame";
import Lightbox from "@/components/Lightbox";
import {
  type Gallery,
  getGalleryCountLabel,
  isGalleryPreviewOnly,
} from "@/data/galleries";
import { siteProfile } from "@/data/site";

interface Props {
  gallery: Gallery;
}

export default function GalleryContent({ gallery }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const previewOnly = isGalleryPreviewOnly(gallery);

  return (
    <>
      {/* ── Header ── */}
      <section className="bg-cream pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/portfolio"
            className="font-body text-xs tracking-[0.2em] text-text-muted uppercase hover:text-burgundy transition-colors duration-200"
          >
            Portfolio
          </Link>

          <h1 className="font-display text-4xl sm:text-5xl text-charcoal font-light leading-snug mt-6">
            {gallery.title}
          </h1>

          <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed mt-4 max-w-xl">
            {gallery.description}
          </p>

          <p className="font-body text-xs text-text-muted tracking-[0.2em] uppercase mt-4">
            {getGalleryCountLabel(gallery)}
          </p>
        </div>
      </section>

      {/* ── Photo Grid (masonry-style columns) ── */}
      <section className="bg-warm-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {gallery.photos.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Open preview for ${photo.alt}`}
                className="block w-full overflow-hidden rounded-sm border border-transparent hover:border-burgundy/20 transition-all duration-300 group break-inside-avoid"
              >
                <PhotoFrame
                  photo={photo}
                  className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
                  showFallbackDetails
                />
              </button>
            ))}
          </div>

          {(previewOnly || gallery.photos.length < gallery.photoCount) && (
            <div className="max-w-2xl mx-auto mt-12 text-center">
              <p className="font-body text-xs text-text-muted tracking-wide">
                {gallery.photos.length < gallery.photoCount
                  ? `Showing ${gallery.photos.length} preview selects from a ${gallery.photoCount}-photograph collection.`
                  : "Preview cards are standing in for final image files while the collection is still being assembled."}
              </p>
              {previewOnly && (
                <p className="font-body text-xs text-text-muted tracking-wide mt-3">
                  {siteProfile.previewNotice}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={gallery.photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
