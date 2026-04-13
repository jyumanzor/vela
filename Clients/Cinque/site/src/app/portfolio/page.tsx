import Link from "next/link";
import PhotoFrame from "@/components/PhotoFrame";
import {
  galleries,
  getGalleryCoverPhoto,
  getGalleryCountLabel,
} from "@/data/galleries";
import { siteProfile } from "@/data/site";

export default function PortfolioPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="bg-cream pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-body text-xs tracking-[0.3em] text-text-muted uppercase mb-4">
            Portfolio
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal font-light leading-snug">
            Collections
          </h1>
          <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed mt-6 max-w-xl mx-auto">
            Organized by geography, with each collection showing the current
            preview selects for a larger body of work.
          </p>
          <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed mt-4 max-w-xl mx-auto">
            {siteProfile.previewNotice}
          </p>
        </div>
      </section>

      {/* ── Gallery Grid ── */}
      <section className="bg-warm-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery) => {
              const coverPhoto = getGalleryCoverPhoto(gallery);

              return (
              <Link
                key={gallery.slug}
                href={`/portfolio/${gallery.slug}`}
                className="group block relative overflow-hidden rounded-sm border border-transparent hover:border-burgundy/30 transition-all duration-500"
              >
                {coverPhoto ? (
                  <PhotoFrame
                    photo={{
                      ...coverPhoto,
                      gradient: gallery.coverGradient,
                    }}
                    className="transition-transform duration-700 group-hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.7)] via-[rgba(26,26,26,0.16)] to-transparent" />
                  </PhotoFrame>
                ) : (
                  <div
                    className="relative transition-transform duration-700 group-hover:scale-[1.02]"
                    style={{ aspectRatio: "3/2", background: gallery.coverGradient }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.7)] via-[rgba(26,26,26,0.16)] to-transparent" />
                  </div>
                )}

                {/* Overlay label */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[rgba(26,26,26,0.6)] to-transparent">
                  <h2 className="font-display text-2xl sm:text-3xl text-cream/90 font-light tracking-wide">
                    {gallery.title}
                  </h2>
                  <p className="font-body text-xs text-cream/50 tracking-[0.2em] uppercase mt-1.5">
                    {gallery.photoCount > 0
                      ? getGalleryCountLabel(gallery)
                      : "Coming soon"}
                  </p>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
