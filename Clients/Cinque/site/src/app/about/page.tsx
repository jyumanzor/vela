export default function AboutPage() {
  const fc = "var(--font-cormorant), serif";
  const fo = "var(--font-outfit), sans-serif";

  return (
    <>
      {/* -- Hero -- */}
      <section className="pt-16 bg-cream">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Placeholder portrait */}
          <div className="aspect-[3/4] bg-gradient-to-br from-burgundy-deep via-burgundy to-burgundy-light rounded-sm" />

          <div>
            <h1
              style={{ fontFamily: fc }}
              className="text-6xl sm:text-7xl font-light tracking-[0.1em] text-charcoal leading-none"
            >
              CINQUE
            </h1>
            <p
              style={{ fontFamily: fo }}
              className="text-xs tracking-[0.35em] uppercase text-text-secondary mt-3"
            >
              Photographer
            </p>
            <p
              style={{ fontFamily: fo }}
              className="text-xs tracking-wide text-text-muted mt-1"
            >
              Chicago, IL
            </p>
          </div>
        </div>
      </section>

      {/* -- Bio -- */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="max-w-[640px] mx-auto px-6">
          <p
            style={{ fontFamily: fo }}
            className="text-xs tracking-[0.3em] text-text-muted uppercase mb-4"
          >
            About
          </p>
          <h2
            style={{ fontFamily: fc }}
            className="text-3xl sm:text-4xl text-charcoal font-light leading-snug mb-8"
          >
            The story so far
          </h2>

          <div
            style={{ fontFamily: fo }}
            className="text-sm text-text-secondary leading-relaxed space-y-5"
          >
            <p>
              Photography found Cinque during a semester abroad in Lyon. What
              started as snapshots for a journal turned into something more
              deliberate: a way of paying attention. She bought a secondhand
              Nikon from a flea market in Croix-Rousse and spent the rest of
              that year learning to see light the way the city offered it
              &mdash; through tall windows, off the Saone at dusk, in the
              narrow gaps between limestone buildings.
            </p>
            <p>
              Since then, her work has spanned travel, architecture, and
              street photography across France, the United Kingdom, Italy, and
              the United States. She is drawn to the interplay of structure
              and atmosphere: the geometry of a staircase, the warmth of a
              caf&eacute; at golden hour, the tension between old stonework
              and modern glass.
            </p>
            <p>
              Her approach is patient and observational. She rarely directs a
              scene, preferring to wait for the moment when a place reveals
              something honest about itself. The result is work that feels
              lived-in rather than staged &mdash; photographs that invite
              the viewer to spend time inside them.
            </p>
            <p>
              Cinque is based in Chicago and travels regularly for personal
              and commissioned projects. When not behind the lens, she is
              likely reading about architectural history, planning her next
              trip, or developing prints in a small darkroom she keeps in
              her apartment.
            </p>
          </div>
        </div>
      </section>

      {/* -- Equipment -- */}
      <section className="bg-warm-white py-16 sm:py-20">
        <div className="max-w-[640px] mx-auto px-6">
          <h2
            style={{ fontFamily: fc }}
            className="text-2xl text-charcoal font-light mb-8"
          >
            Equipment
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p
                style={{ fontFamily: fo }}
                className="text-xs tracking-[0.2em] text-text-muted uppercase mb-3"
              >
                Camera Bodies
              </p>
              <ul
                style={{ fontFamily: fo }}
                className="text-sm text-text-secondary leading-loose"
              >
                <li>Nikon Z8</li>
                <li>Nikon Z6 III</li>
                <li>Leica Q3</li>
              </ul>
            </div>
            <div>
              <p
                style={{ fontFamily: fo }}
                className="text-xs tracking-[0.2em] text-text-muted uppercase mb-3"
              >
                Lenses
              </p>
              <ul
                style={{ fontFamily: fo }}
                className="text-sm text-text-secondary leading-loose"
              >
                <li>Nikkor Z 24-70mm f/2.8 S</li>
                <li>Nikkor Z 50mm f/1.2 S</li>
                <li>Nikkor Z 14-24mm f/2.8 S</li>
                <li>Nikkor Z 85mm f/1.2 S</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* -- Featured In -- */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-[640px] mx-auto px-6 text-center">
          <h2
            style={{ fontFamily: fc }}
            className="text-2xl text-charcoal font-light mb-8"
          >
            Featured In
          </h2>
          <div
            style={{ fontFamily: fo }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-text-muted tracking-wide"
          >
            <span>Dwell</span>
            <span>Condé Nast Traveler</span>
            <span>Kinfolk</span>
            <span>Cereal Magazine</span>
          </div>
        </div>
      </section>
    </>
  );
}
