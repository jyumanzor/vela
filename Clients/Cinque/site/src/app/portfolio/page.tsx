import Link from "next/link";
import { galleries } from "@/data/galleries";

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
            Organized by geography — each collection represents a place, a
            palette, and the particular quality of light that makes it unlike
            anywhere else.
          </p>
        </div>
      </section>

      {/* ── Gallery Grid ── */}
      <section className="bg-warm-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {galleries.map((gallery) => (
              <Link
                key={gallery.slug}
                href={`/portfolio/${gallery.slug}`}
                className="group block relative overflow-hidden rounded-sm border border-transparent hover:border-burgundy/30 transition-all duration-500"
              >
                {/* Cover gradient */}
                <div
                  className="aspect-[3/2] transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{ background: gallery.coverGradient }}
                />

                {/* Overlay label */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[rgba(26,26,26,0.6)] to-transparent">
                  <h2 className="font-display text-2xl sm:text-3xl text-cream/90 font-light tracking-wide">
                    {gallery.title}
                  </h2>
                  <p className="font-body text-xs text-cream/50 tracking-[0.2em] uppercase mt-1.5">
                    {gallery.photoCount} photographs
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
