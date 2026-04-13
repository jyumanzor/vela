"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { galleries, type Photo } from "@/data/galleries";
import Lightbox from "@/components/Lightbox";

interface GallerySection {
  id: string;
  label: string;
  photos: Photo[];
}

const sections: GallerySection[] = [
  { id: "france", label: "France", photos: galleries.find((g) => g.slug === "france")!.photos },
  { id: "united-kingdom", label: "United Kingdom", photos: galleries.find((g) => g.slug === "united-kingdom")!.photos },
  { id: "united-states", label: "United States", photos: galleries.find((g) => g.slug === "united-states")!.photos },
  { id: "italy", label: "Italy", photos: galleries.find((g) => g.slug === "italy")!.photos },
  { id: "selected", label: "Selected Work", photos: galleries.find((g) => g.slug === "featured")!.photos },
];

const allPhotos = sections.flatMap((s) => s.photos);

export default function Home() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [activeCaption, setActiveCaption] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const pillBarRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for country tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    for (const section of sections) {
      const el = sectionRefs.current[section.id];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const offset = (pillBarRef.current?.offsetHeight ?? 0) + 64 + 16;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const handlePhotoClick = useCallback((photo: Photo) => {
    if (activeCaption === photo.id) {
      // Second click: open lightbox
      const idx = allPhotos.findIndex((p) => p.id === photo.id);
      setLightboxIndex(idx >= 0 ? idx : 0);
      setActiveCaption(null);
    } else {
      // First click: show caption
      setActiveCaption(photo.id);
    }
  }, [activeCaption]);

  return (
    <>
      {/* Hero area */}
      <section className="pt-28 pb-8 px-6 text-center">
        <h1 className="font-display text-parchment text-6xl sm:text-7xl md:text-8xl font-light tracking-[0.15em] leading-none">
          CINQUE
        </h1>
        <p className="font-script text-dust text-lg sm:text-xl mt-3">
          35mm
        </p>
      </section>

      {/* Country jump pills — sticky */}
      <div
        ref={pillBarRef}
        className="sticky top-16 z-40 py-4 px-6 flex items-center justify-center gap-3 flex-wrap"
        style={{ backgroundColor: "rgba(28, 24, 22, 0.92)", backdropFilter: "blur(12px)" }}
      >
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            className={`pill-btn ${activeSection === section.id ? "active" : ""}`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Endless scroll gallery */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            ref={(el) => { sectionRefs.current[section.id] = el; }}
          >
            {/* Country marker */}
            <div className="country-marker">
              <span className="font-display text-sm italic text-clasp-gold tracking-wide">
                {section.label}
              </span>
              <span className="font-body text-xs text-whisper">
                {section.photos.length}
              </span>
            </div>

            {/* Masonry grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-2 sm:gap-3">
              {section.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="photo-item relative break-inside-avoid mb-2 sm:mb-3 cursor-gallery"
                  onClick={() => handlePhotoClick(photo)}
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

                  {/* Mobile art card caption (tap to show) */}
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
          </section>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={allPhotos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
