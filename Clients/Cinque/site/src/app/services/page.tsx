import type { Metadata } from "next";
import Link from "next/link";
import { siteProfile } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Learn what kinds of portrait, travel, editorial, print, and licensing inquiries Cinque is currently open to.",
};

export default function ServicesPage() {
  return (
    <section className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20 sm:py-28">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl sm:text-5xl text-parchment font-light leading-tight">
            Services
          </h1>
          <p className="font-body text-sm text-dust leading-relaxed mt-4">
            A small set of focused offerings built around the current portfolio.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {siteProfile.services.map((service) => (
            <div
              key={service.title}
              className="group border border-suede rounded-sm p-6 sm:p-8 flex flex-col transition-all duration-300 hover:border-clasp-gold/40"
              style={{ backgroundColor: "var(--patent-soft)" }}
            >
              <h2 className="font-display text-2xl text-parchment font-light mb-3">
                {service.title}
              </h2>
              <p className="font-body text-sm text-dust leading-relaxed flex-1">
                {service.description}
              </p>
              <p className="font-body text-xs text-whisper mt-4 leading-relaxed">
                {service.detail}
              </p>
              <Link
                href={service.href ?? "/contact"}
                className="inline-block font-body text-sm text-clasp-gold tracking-wide mt-6 border-b border-clasp-gold/30 pb-0.5 hover:border-clasp-gold transition-colors duration-200 self-start"
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
