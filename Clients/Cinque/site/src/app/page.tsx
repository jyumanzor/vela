import Link from "next/link";
import PhotoFrame from "@/components/PhotoFrame";
import {
  galleries,
  getGalleryCoverPhoto,
  getGalleryCountLabel,
} from "@/data/galleries";
import { siteProfile } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Gradient placeholder for hero image */}
        <div className="absolute inset-0 bg-gradient-to-br from-burgundy-deep via-burgundy to-burgundy-light" />
        <div className="absolute inset-0 bg-soft-black/20" />

        <div className="relative z-10 text-center">
          <h1 className="font-display text-cream text-7xl sm:text-8xl md:text-9xl font-light tracking-[0.15em] leading-none">
            CINQUE
          </h1>
          <p className="font-body text-cream/70 text-xs sm:text-sm tracking-[0.35em] uppercase mt-4">
            {siteProfile.hero.eyebrow}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-body text-cream/40 text-[10px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-cream/20" />
        </div>
      </section>

      {/* ── Section 2: Introduction ── */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal font-light leading-snug">
            A growing archive shaped by place and patience
          </h2>
          <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed mt-6">
            {siteProfile.hero.intro}
          </p>
          <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed mt-4">
            {siteProfile.introduction}
          </p>
          <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed mt-6">
            {siteProfile.previewNotice}
          </p>
        </div>
      </section>

      {/* ── Section 3: Featured Collections ── */}
      <section className="bg-warm-white py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-body text-xs tracking-[0.3em] text-text-muted uppercase text-center mb-12">
            Collections
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {galleries.map((gallery) => {
              const coverPhoto = getGalleryCoverPhoto(gallery);
              if (!coverPhoto) return null;

              return (
              <Link
                key={gallery.slug}
                href={`/portfolio/${gallery.slug}`}
                className="group block relative overflow-hidden rounded-sm border border-transparent hover:border-burgundy/30 transition-all duration-500"
              >
                <PhotoFrame
                  photo={coverPhoto}
                  className="transition-transform duration-700 group-hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,26,26,0.08)_0%,rgba(26,26,26,0.7)_100%)]" />
                </PhotoFrame>

                {/* Label overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="font-display text-2xl sm:text-3xl text-white/90 font-light tracking-wide">
                    {gallery.title}
                  </h3>
                  <p className="font-body text-xs text-white/50 tracking-[0.2em] uppercase mt-2">
                    {getGalleryCountLabel(gallery)}
                  </p>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 4: About Teaser ── */}
      <section className="bg-warm-gray/40 py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Placeholder image area */}
          <div className="aspect-[3/4] bg-gradient-to-b from-warm-gray to-warm-gray-dark rounded-sm" />

          <div>
            <p className="font-body text-xs tracking-[0.3em] text-text-muted uppercase mb-4">
              About
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-charcoal font-light leading-snug">
              About the photographer
            </h2>
            <p className="font-body text-sm text-text-secondary leading-relaxed mt-6">
              {siteProfile.about.paragraphs[0]}
            </p>
            <p className="font-body text-sm text-text-secondary leading-relaxed mt-4">
              {siteProfile.about.availability}
            </p>
            <Link
              href="/about"
              className="inline-block font-body text-sm text-burgundy tracking-wide mt-8 border-b border-burgundy/30 pb-0.5 hover:border-burgundy transition-colors duration-200"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 5: Contact CTA ── */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal font-light leading-snug">
            Open to portraits, travel stories, and selected print inquiries
          </h2>
          <p className="font-body text-sm text-text-secondary leading-relaxed mt-6">
            Browse the available services, then use the contact page to see
            what details will make the first conversation most useful.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 mt-8 sm:flex-row">
            <Link
              href="/services"
              className="inline-block font-body text-sm tracking-wide text-cream bg-burgundy hover:bg-burgundy-deep px-8 py-3 rounded-sm transition-colors duration-300"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="inline-block font-body text-sm tracking-wide text-burgundy border-b border-burgundy/30 pb-0.5 hover:border-burgundy transition-colors duration-200"
            >
              View Contact Notes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
