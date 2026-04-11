import Link from "next/link";

const services = [
  {
    title: "Fine Art Prints",
    description:
      "Museum-quality prints of select photographs. Available in multiple sizes and framing options.",
    price: "Starting at $250",
    cta: "Inquire",
  },
  {
    title: "Commissions",
    description:
      "Custom photography for events, portraits, editorial, or commercial projects.",
    price: null,
    cta: "Discuss your project",
  },
  {
    title: "Licensing",
    description:
      "License photographs for editorial, commercial, or personal use.",
    price: null,
    cta: "Request licensing",
  },
];

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
            Available for prints, commissions, and events.
          </p>
        </div>

        {/* -- Cards -- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group border border-warm-gray rounded-sm bg-cream p-6 sm:p-8 flex flex-col transition-all duration-300 hover:border-t-[3px] hover:border-t-burgundy"
            >
              <h2
                style={{ fontFamily: fc }}
                className="text-2xl text-charcoal font-light mb-3"
              >
                {s.title}
              </h2>
              <p
                style={{ fontFamily: fo }}
                className="text-sm text-text-secondary leading-relaxed flex-1"
              >
                {s.description}
              </p>
              {s.price && (
                <p
                  style={{ fontFamily: fo }}
                  className="text-xs text-text-muted mt-4"
                >
                  {s.price}
                </p>
              )}
              <Link
                href="/contact"
                style={{ fontFamily: fo }}
                className="inline-block text-sm text-burgundy tracking-wide mt-6 border-b border-burgundy/30 pb-0.5 hover:border-burgundy transition-colors duration-200 self-start"
              >
                {s.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
