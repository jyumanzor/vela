import Link from "next/link";

const collections = [
  {
    name: "France",
    slug: "france",
    count: 31,
    gradient: "from-[#8B6B5A] to-[#6B4A3A]",
  },
  {
    name: "United Kingdom",
    slug: "united-kingdom",
    count: 28,
    gradient: "from-[#7A8B6B] to-[#5A6B4A]",
  },
  {
    name: "Italy",
    slug: "italy",
    count: 2,
    gradient: "from-[#9B8B6B] to-[#7B6B4A]",
  },
  {
    name: "United States",
    slug: "united-states",
    count: 12,
    gradient: "from-[#6B7A8B] to-[#4A5A6B]",
  },
];

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
            Photography
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
            Capturing light across continents
          </h2>
          <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed mt-6">
            From the lavender fields of southern France to the cobblestone
            streets of London, Cinque&apos;s lens finds beauty in the quiet
            moments between destinations. Each photograph is an invitation to
            pause, to look closer, to see the world as it reveals itself to
            those who are patient.
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
            {collections.map((c) => (
              <Link
                key={c.name}
                href={`/portfolio/${c.slug}`}
                className="group block relative overflow-hidden rounded-sm border border-transparent hover:border-burgundy/30 transition-all duration-500"
              >
                {/* Placeholder gradient */}
                <div
                  className={`aspect-[4/3] bg-gradient-to-br ${c.gradient} transition-transform duration-700 group-hover:scale-[1.02]`}
                />

                {/* Label overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="font-display text-2xl sm:text-3xl text-white/90 font-light tracking-wide">
                    {c.name}
                  </h3>
                  <p className="font-body text-xs text-white/50 tracking-[0.2em] uppercase mt-2">
                    {c.count} photographs
                  </p>
                </div>
              </Link>
            ))}
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
              Cinque is a documentary and travel photographer whose work
              spans four countries and a lifetime of curiosity. With an eye
              for natural light and an instinct for composition, she captures
              the textures and rhythms of the places she calls home.
            </p>
            <p className="font-body text-sm text-text-secondary leading-relaxed mt-4">
              Based between France and the United States, her portfolio
              reflects both the grandeur of European landscapes and the
              intimate details of everyday life.
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
            Let&apos;s work together
          </h2>
          <p className="font-body text-sm text-text-secondary leading-relaxed mt-6">
            Whether you have a project in mind, would like to commission a
            series, or simply want to say hello — I would love to hear from
            you.
          </p>
          <Link
            href="/contact"
            className="inline-block font-body text-sm tracking-wide text-cream bg-burgundy hover:bg-burgundy-deep px-8 py-3 mt-8 rounded-sm transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
