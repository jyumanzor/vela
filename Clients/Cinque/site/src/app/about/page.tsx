import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Cinque -- a Chicago-born photographer shooting analog film on a 1970s Nikon FM.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Placeholder portrait */}
          <div
            className="aspect-[3/4] rounded-sm"
            style={{ background: "linear-gradient(135deg, var(--suede) 0%, var(--patent-soft) 100%)" }}
          />

          <div>
            <h1
              className="text-6xl sm:text-7xl leading-none"
              style={{ fontFamily: "var(--font-logo), serif", color: "var(--maroon)", letterSpacing: "-0.04em" }}
            >
              CINQUE
            </h1>
            <p className="font-body text-xs tracking-[0.35em] uppercase text-dust mt-3">
              Photographer
            </p>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[540px] mx-auto px-6">
          <p className="font-body text-xs tracking-[0.3em] text-whisper uppercase mb-4">
            About
          </p>

          <div className="font-body text-sm text-dust leading-relaxed space-y-5">
            <p>
              Born and raised in Chicago.
            </p>
            <p>
              Film photography across six countries. Travel, architecture, and the details that make a place feel lived in.
            </p>
            <p className="font-display text-lg text-parchment font-light tracking-wide">
              Nikon FM. 35mm film.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 mt-10 sm:flex-row">
            <Link
              href="/"
              className="pill-btn"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="font-body text-sm tracking-wide text-clasp-gold border-b border-clasp-gold/30 pb-0.5 hover:border-clasp-gold transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
