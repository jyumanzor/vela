"use client";

import { useState, useEffect, useCallback } from "react";
import type { Photo } from "@/data/galleries";

interface LightboxProps {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({
  photos,
  initialIndex,
  onClose,
}: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [visible, setVisible] = useState(false);

  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) setIndex((i) => i - 1);
  }, [hasPrev]);

  const goNext = useCallback(() => {
    if (hasNext) setIndex((i) => i + 1);
  }, [hasNext]);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  // Fade in on mount
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, goNext, goPrev]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-200"
      style={{
        backgroundColor: "rgba(26, 26, 26, 0.95)",
        opacity: visible ? 1 : 0,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {/* Close button */}
      <button
        onClick={close}
        className="absolute top-6 right-6 font-body text-2xl text-cream/70 hover:text-burgundy-light transition-colors duration-200 w-10 h-10 flex items-center justify-center z-10"
        aria-label="Close lightbox"
      >
        {"\u00D7"}
      </button>

      {/* Previous arrow */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 font-body text-3xl text-cream/50 hover:text-cream transition-colors duration-200 w-12 h-12 flex items-center justify-center z-10"
          aria-label="Previous photo"
        >
          {"<"}
        </button>
      )}

      {/* Next arrow */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 font-body text-3xl text-cream/50 hover:text-cream transition-colors duration-200 w-12 h-12 flex items-center justify-center z-10"
          aria-label="Next photo"
        >
          {">"}
        </button>
      )}

      {/* Photo + caption area */}
      <div
        className="flex flex-col items-center max-w-4xl w-full px-16 sm:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient placeholder for the photo */}
        <div
          className="w-full rounded-sm overflow-hidden"
          style={{
            aspectRatio: photo.aspect || "3/2",
            background: photo.gradient,
            maxHeight: "70vh",
          }}
        />

        {/* Caption */}
        {photo.caption && (
          <p className="font-body text-sm text-cream/80 mt-4 text-center">
            {photo.caption}
          </p>
        )}

        {/* Location and date */}
        {(photo.location || photo.date) && (
          <p className="font-body text-xs text-cream/40 mt-1.5 text-center tracking-wide">
            {[photo.location, photo.date].filter(Boolean).join(" — ")}
          </p>
        )}

        {/* Counter */}
        <p className="font-body text-[10px] text-cream/25 mt-4 tracking-[0.2em] uppercase">
          {index + 1} / {photos.length}
        </p>
      </div>
    </div>
  );
}
