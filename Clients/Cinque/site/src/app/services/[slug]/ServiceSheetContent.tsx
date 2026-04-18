"use client";

import Link from "next/link";
import Image from "next/image";
import { galleries, type Photo } from "@/data/galleries";
import type { ServiceSheet } from "@/data/services";

/**
 * Flatten all photos across all galleries so sample-photo ids
 * can resolve regardless of which country they belong to.
 */
const allPhotos: Photo[] = galleries.flatMap((g) => g.photos);

function resolveSamples(ids: string[]): Photo[] {
  return ids
    .map((id) => allPhotos.find((p) => p.id === id))
    .filter((p): p is Photo => Boolean(p));
}

export default function ServiceSheetContent({ sheet }: { sheet: ServiceSheet }) {
  const samples = resolveSamples(sheet.samplePhotoIds);

  return (
    <section className="pt-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
        {/* Eyebrow — link back to /services */}
        <div className="mb-10">
          <Link
            href="/services"
            className="font-body text-xs tracking-[0.3em] uppercase text-dust hover:text-clasp-gold transition-colors"
          >
            ← Services
          </Link>
        </div>

        {/* Title + tagline */}
        <header className="mb-16">
          <h1 className="font-display text-4xl sm:text-5xl text-parchment font-light leading-tight">
            {sheet.title}
          </h1>
          <p className="font-display text-sm text-dust italic mt-3 tracking-wide max-w-lg">
            {sheet.tagline}
          </p>
        </header>

        {/* Description — 2-3 paragraphs */}
        <div className="flex flex-col gap-5 mb-16 max-w-xl">
          {sheet.description.map((para, i) => (
            <p
              key={i}
              className="font-body text-sm sm:text-base text-parchment/90 leading-relaxed"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Sample photos */}
        {samples.length > 0 && (
          <div className="mb-20">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-dust mb-6">
              From the archive
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {samples.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-[3/4] overflow-hidden rounded-sm"
                  style={{ backgroundColor: "var(--patent-soft)" }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process */}
        <div className="mb-20">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-dust mb-6">
            How it works
          </p>
          <ol className="flex flex-col gap-5">
            {sheet.processSteps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span
                  className="font-display text-lg italic flex-shrink-0 w-6 text-right"
                  style={{ color: "var(--clasp-gold)" }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-base text-parchment font-light">
                    {step.title}
                  </p>
                  <p className="font-body text-sm text-dust leading-relaxed mt-1">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Pricing */}
        <div className="mb-12 border-t border-suede pt-10">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-dust mb-6">
            Pricing
          </p>
          <div>
            {sheet.pricing.map((tier) => (
              <div
                key={tier.label}
                className="flex items-baseline justify-between py-3 border-b border-suede/50 gap-4"
              >
                <span className="font-body text-sm text-parchment/80 flex-1">
                  {tier.label}
                  {tier.note && (
                    <span
                      className="ml-2 font-body text-xs italic"
                      style={{ color: "var(--whisper)" }}
                    >
                      {tier.note}
                    </span>
                  )}
                </span>
                <span
                  className="font-display text-lg font-light whitespace-nowrap"
                  style={{ color: "var(--clasp-gold)" }}
                >
                  {tier.value}
                </span>
              </div>
            ))}
          </div>
          {sheet.pricingNote && (
            <p className="font-body text-xs text-whisper leading-relaxed mt-6 max-w-lg">
              {sheet.pricingNote}
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 pt-10 border-t border-suede text-center">
          <Link href={sheet.cta.href} className="pill-btn inline-block">
            {sheet.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
