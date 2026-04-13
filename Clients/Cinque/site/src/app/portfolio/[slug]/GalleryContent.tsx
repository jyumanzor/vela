"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";
import { type Gallery, getGalleryCountLabel } from "@/data/galleries";

interface Props {
  gallery: Gallery;
}

export default function GalleryContent({ gallery }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeCaption, setActiveCaption] = useState<string | null>(null);

  const handlePhotoClick = useCallback((photoId: string, idx: number) => {
    if (activeCaption === photoId) {
      setLightboxIndex(idx);
      setActiveCaption(null);
    } else {
      setActiveCaption(photoId);
    }
  }, [activeCaption]);

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-8">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/"
            className="font-body text-xs tracking-[0.2em] text-whisper uppercase hover:text-clasp-gold transition-colors duration-200"
          >
            Back
          </Link>

          <h1 className="font-display text-4xl sm:text-5xl text-parchment font-light leading-snug mt-6">
            {gallery.title}
          </h1>

          <p className="font-body text-sm sm:text-base text-dust leading-relaxed mt-4 max-w-xl">
            {gallery.description}
          </p>

          <p className="font-body text-xs text-whisper tracking-[0.2em] uppercase mt-4">
            {getGalleryCountLabel(gallery)}
          </p>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-2 sm:gap-3">
            {gallery.photos.map((photo, i) => (
              <div
                key={photo.id}
                className="photo-item relative break-inside-avoid mb-2 sm:mb-3 cursor-gallery"
                onClick={() => handlePhotoClick(photo.id, i)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full block transition-transform duration-300"
                  style={{ willChange: "transform" }}
                  loading="lazy"
                  draggable={false}
                />

                {/* Desktop hover caption */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:flex items-end">
                  <div className="w-full px-3 pb-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--clasp-gold)" }}
                      />
                      <span className="font-script text-sm" style={{ color: "var(--clasp-gold)" }}>
                        {photo.caption}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile tap caption */}
                <div
                  className={`sm:hidden art-card-caption ${activeCaption === photo.id ? "visible" : ""}`}
                >
                  <div className="flex items-center gap-1.5 pt-2 pb-1 px-1">
                    <span
                      className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "var(--clasp-gold)" }}
                    />
                    <span className="font-script text-sm" style={{ color: "var(--clasp-gold)" }}>
                      {photo.caption}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
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
