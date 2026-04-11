"use client";

import { useState } from "react";
import Link from "next/link";
import type { Gallery } from "@/data/galleries";
import Lightbox from "@/components/Lightbox";

interface Props {
  gallery: Gallery;
}

export default function GalleryContent({ gallery }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
            {gallery.photoCount} photographs
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
                onClick={() => setLightboxIndex(i)}
                className="block w-full overflow-hidden rounded-sm border border-transparent hover:border-burgundy/20 transition-all duration-300 group break-inside-avoid"
              >
                <div
                  className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{
                    aspectRatio: photo.aspect || "3/2",
                    background: photo.gradient,
                  }}
                />
              </button>
            ))}
          </div>

          {gallery.photos.length < gallery.photoCount && (
            <p className="font-body text-xs text-text-muted text-center mt-12 tracking-wide">
              Showing {gallery.photos.length} of {gallery.photoCount}{" "}
              photographs. Full collection coming soon.
            </p>
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
