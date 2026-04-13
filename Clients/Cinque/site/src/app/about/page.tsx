import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Cinque — a Chicago-born photographer shooting analog film on a 1970s Nikon FM.",
};

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
          </div>
        </div>
      </section>

      {/* -- Bio -- */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-[540px] mx-auto px-6">
          <p
            style={{ fontFamily: fo }}
            className="text-xs tracking-[0.3em] text-text-muted uppercase mb-4"
          >
            About
          </p>

          <div
            style={{ fontFamily: fo }}
            className="text-sm text-text-secondary leading-relaxed space-y-5"
          >
            <p>
              Born and raised in Chicago. Drawn to travel, architecture, and the
              quiet details that make a place feel real rather than staged.
            </p>
            <p>
              The work is analog — unhurried, deliberate, shaped by available
              light and the limits of a single roll of film.
            </p>
            <p
              style={{ fontFamily: fc }}
              className="text-lg text-charcoal font-light tracking-wide"
            >
              Shot on a Nikon FM — a 1970s film camera.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 mt-10 sm:flex-row">
            <Link
              href="/portfolio"
              className="inline-block font-body text-sm tracking-wide text-cream bg-burgundy hover:bg-burgundy-deep px-8 py-3 rounded-sm transition-colors duration-300"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="inline-block font-body text-sm tracking-wide text-burgundy border-b border-burgundy/30 pb-0.5 hover:border-burgundy transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
