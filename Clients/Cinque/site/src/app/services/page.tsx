import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — Cinque Photography",
  description: "Fine art prints, portrait sessions, and licensing from Cinque's 35mm film collection.",
};

const services = [
  {
    title: "Fine Art Prints",
    description: "Limited edition prints from the travel collection. All images shot on 35mm film with a Nikon FM.",
    pricing: [
      { size: '5 x 7"', price: "$35" },
      { size: '8 x 10"', price: "$65" },
      { size: '11 x 14"', price: "$95" },
      { size: '16 x 20"', price: "$150" },
    ],
    note: "Printed on archival matte paper. Unframed. Custom sizes and framing available on request.",
    cta: "Browse prints",
    href: "/shop",
  },
  {
    title: "Portrait Sessions",
    description: "Natural light portraits on 35mm film. Headshots, personal milestones, creative projects.",
    pricing: [
      { size: "Mini session (30 min, 10 selects)", price: "$150" },
      { size: "Standard session (1 hr, 25 selects)", price: "$275" },
      { size: "Extended session (2 hr, 40 selects)", price: "$400" },
    ],
    note: "All sessions include digital scans of selected frames. Chicago area. Travel sessions available for an additional fee.",
    cta: "Book a session",
    href: "/contact",
  },
  {
    title: "Event Coverage",
    description: "Intimate event photography on film. Small gatherings, dinners, celebrations.",
    pricing: [
      { size: "2 hours", price: "$350" },
      { size: "4 hours", price: "$600" },
      { size: "Full day", price: "$1,000" },
    ],
    note: "Includes digital scans of all usable frames. Best suited for gatherings under 50 people.",
    cta: "Discuss your event",
    href: "/contact",
  },
  {
    title: "Licensing",
    description: "License photographs from the collection for editorial, commercial, or personal use.",
    pricing: [
      { size: "Personal / non-commercial", price: "$50" },
      { size: "Editorial (single use)", price: "$150" },
      { size: "Commercial (single use)", price: "$300" },
    ],
    note: "Extended and exclusive licensing available. Contact for bulk or ongoing usage.",
    cta: "Request licensing",
    href: "/contact",
  },
];

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
            Prints, portraits, events, and licensing
          </p>
        </div>

        {/* Services list */}
        <div className="flex flex-col gap-16">
          {services.map((service) => (
            <div key={service.title} className="border-t border-suede pt-10">
              <h2 className="font-display text-2xl sm:text-3xl text-parchment font-light mb-3">
                {service.title}
              </h2>
              <p className="font-body text-sm text-dust leading-relaxed mb-8 max-w-lg">
                {service.description}
              </p>

              {/* Pricing table */}
              <div className="mb-6">
                {service.pricing.map((tier) => (
                  <div
                    key={tier.size}
                    className="flex items-baseline justify-between py-3 border-b border-suede/50"
                  >
                    <span className="font-body text-sm text-parchment/80">{tier.size}</span>
                    <span className="font-display text-lg text-clasp-gold font-light">{tier.price}</span>
                  </div>
                ))}
              </div>

              {/* Note */}
              <p className="font-body text-xs text-whisper leading-relaxed mb-6">
                {service.note}
              </p>

              {/* CTA */}
              <Link
                href={service.href}
                className="pill-btn inline-block"
              >
                {service.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-20 pt-10 border-t border-suede text-center">
          <p className="font-body text-xs text-whisper leading-relaxed max-w-md mx-auto">
            All prices in USD. Turnaround for film work is typically 2-3 weeks
            (developing + scanning + editing). Rush processing available for
            an additional fee.
          </p>
          <Link
            href="/contact"
            className="pill-btn inline-block mt-6"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
