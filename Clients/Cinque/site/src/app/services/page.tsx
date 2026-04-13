import type { Metadata } from "next";
import Link from "next/link";
import { siteProfile } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Learn what kinds of portrait, travel, editorial, print, and licensing inquiries Cinque is currently open to.",
};

export default function ServicesPage() {
  const fc = "var(--font-cormorant), serif";
  const fo = "var(--font-outfit), sans-serif";

  return (
    <section className="pt-16 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20 sm:py-28">
        {/* -- Header -- */}
        <div className="text-center mb-16">
          <h1
            style={{ fontFamily: fc }}
            className="text-4xl sm:text-5xl text-charcoal font-light leading-tight"
          >
            Services
          </h1>
          <p
            style={{ fontFamily: fo }}
            className="text-sm text-text-secondary leading-relaxed mt-4"
          >
            A small set of focused offerings built around the current portfolio.
          </p>
          <p
            style={{ fontFamily: fo }}
            className="text-xs text-text-muted tracking-wide mt-4 max-w-xl mx-auto"
          >
            {siteProfile.previewNotice}
          </p>
        </div>

        {/* -- Cards -- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {siteProfile.services.map((service) => (
            <div
              key={service.title}
              className="group border border-warm-gray rounded-sm bg-cream p-6 sm:p-8 flex flex-col transition-all duration-300 hover:border-t-[3px] hover:border-t-burgundy"
            >
              <h2
                style={{ fontFamily: fc }}
                className="text-2xl text-charcoal font-light mb-3"
              >
                {service.title}
              </h2>
              <p
                style={{ fontFamily: fo }}
                className="text-sm text-text-secondary leading-relaxed flex-1"
              >
                {service.description}
              </p>
              <p
                style={{ fontFamily: fo }}
                className="text-xs text-text-muted mt-4 leading-relaxed"
              >
                {service.detail}
              </p>
              <Link
                href="/contact"
                style={{ fontFamily: fo }}
                className="inline-block text-sm text-burgundy tracking-wide mt-6 border-b border-burgundy/30 pb-0.5 hover:border-burgundy transition-colors duration-200 self-start"
              >
                {service.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
