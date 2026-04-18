import type { Metadata } from "next";
import Link from "next/link";
import { serviceSheets } from "@/data/services";

export const metadata: Metadata = {
  title: "Services — Cinque Photography",
  description: "Fine art prints, commissioned work, and licensing from Cinque's 35mm film archive.",
};

export default function ServicesPage() {
  return (
    <section className="pt-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="font-display text-4xl sm:text-5xl text-parchment font-light leading-tight">
            Services
          </h1>
          <p className="font-display text-sm text-dust italic mt-3 tracking-wide">
            Prints, commissions, licensing.
          </p>
        </div>

        {/* Directory — 3 sheet cards */}
        <div className="flex flex-col gap-16">
          {serviceSheets.map((sheet) => (
            <Link
              key={sheet.slug}
              href={`/services/${sheet.slug}`}
              className="group block border-t border-suede pt-10 transition-colors"
            >
              <h2 className="font-display text-2xl sm:text-3xl text-parchment font-light mb-3 group-hover:text-clasp-gold transition-colors">
                {sheet.title}
              </h2>
              <p className="font-body text-sm text-dust leading-relaxed mb-6 max-w-lg">
                {sheet.tagline}
              </p>

              {/* Starting price preview */}
              {sheet.pricing[0] && (
                <p
                  className="font-display text-sm italic"
                  style={{ color: "var(--clasp-gold)" }}
                >
                  from {sheet.pricing[0].value}
                </p>
              )}

              <span className="inline-block mt-6 font-body text-xs tracking-[0.3em] uppercase text-dust group-hover:text-clasp-gold transition-colors">
                Read the sheet →
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-20 pt-10 border-t border-suede text-center">
          <p className="font-body text-xs text-whisper leading-relaxed max-w-md mx-auto">
            All prices in USD. Film turnaround is 2 to 3 weeks from shoot date.
            Rush processing available for an additional fee.
          </p>
          <Link href="/contact" className="pill-btn inline-block mt-6">
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
