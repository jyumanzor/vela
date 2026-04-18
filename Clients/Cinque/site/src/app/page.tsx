"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { galleries, type Photo } from "@/data/galleries";
import Lightbox from "@/components/Lightbox";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => <div style={{ height: 400, background: "var(--cream)" }} />,
});

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
      const idx = allPhotos.findIndex((p) => p.id === photo.id);
      setLightboxIndex(idx >= 0 ? idx : 0);
      setActiveCaption(null);
    } else {
      setActiveCaption(photo.id);
    }
  }, [activeCaption]);

  // Map marker click → open Lightbox at first photo of that country
  const handleMapCountryClick = useCallback((id: string) => {
    const firstPhoto = sections.find((s) => s.id === id)?.photos[0];
    if (!firstPhoto) return;
    const idx = allPhotos.findIndex((p) => p.id === firstPhoto.id);
    if (idx >= 0) setLightboxIndex(idx);
  }, []);

  return (
    <>
      {/* ═══ DARK HERO ═══ */}
      <section
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ background: "var(--patent)" }}
      >
        <h1
          className="text-7xl sm:text-8xl md:text-9xl leading-none"
          style={{ fontFamily: "var(--font-logo), serif", color: "var(--cream)", letterSpacing: "-0.04em" }}
        >
          CINQUE
        </h1>
        <p className="font-display text-dust text-sm sm:text-base mt-4 tracking-[0.3em] uppercase font-light italic">
          Photography
        </p>

        {/* Scroll hint */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12" style={{ background: "var(--dust)" }} />
          <span className="font-body text-dust text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        </div>
      </section>

      {/* ═══ TRANSITION GRADIENT ═══ */}
      <div
        className="h-24"
        style={{ background: "linear-gradient(to bottom, var(--patent), var(--cream))" }}
      />

      {/* ═══ MAP SECTION ═══ */}
      <div style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
          <p className="font-display text-sm italic tracking-wide" style={{ color: "var(--text-mid)" }}>
            Explore by location
          </p>
        </div>
        <MapView onCountryClick={handleMapCountryClick} />
      </div>

      {/* ═══ CREAM GALLERY ═══ */}
      <div style={{ background: "var(--cream)" }}>

        {/* Country jump pills — sticky */}
        <div
          ref={pillBarRef}
          className="sticky top-16 z-40 py-4 px-6 flex items-center justify-center gap-3 flex-wrap"
          style={{ backgroundColor: "rgba(250, 247, 242, 0.95)", backdropFilter: "blur(12px)" }}
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

        {/* Gallery sections */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => { sectionRefs.current[section.id] = el; }}
            >
              {/* Country marker */}
              <div className="country-marker-light">
                <span className="font-display text-sm italic tracking-wide" style={{ color: "var(--text-dark)" }}>
                  {section.label}
                </span>
                <span className="font-body text-xs" style={{ color: "var(--text-mid)" }}>
                  {section.photos.length}
                </span>
              </div>

              {/* Masonry grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
                {section.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="photo-item-light"
                    onClick={() => handlePhotoClick(photo)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full block rounded-sm transition-all duration-300"
                      loading="lazy"
                      draggable={false}
                    />

                    {/* Desktop hover caption — dainty text below */}
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:flex items-end">
                      <div className="w-full px-2 pb-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: "var(--patent)" }}
                          />
                          <span className="font-script text-sm" style={{ color: "var(--text-dark)" }}>
                            {photo.caption}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile art card caption */}
                    <div
                      className={`sm:hidden art-card-caption ${activeCaption === photo.id ? "visible" : ""}`}
                    >
                      <div className="flex items-center gap-1.5 pt-2 pb-1 px-1">
                        <span
                          className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "var(--patent)" }}
                        />
                        <span className="font-script text-sm" style={{ color: "var(--text-dark)" }}>
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

        {/* Bottom fade back to dark */}
        <div
          className="h-16"
          style={{ background: "linear-gradient(to bottom, var(--cream), var(--patent))" }}
        />
      </div>

      {/* Lightbox (stays dark) */}
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
