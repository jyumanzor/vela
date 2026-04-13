import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Limited edition fine art prints shot on 35mm film with a 1970s Nikon FM.",
};

const prints = [
  {
    title: "Provence",
    photo: "/photos/france/000084680002.jpg",
    sizes: ["8x10", "11x14", "16x20"],
    startingPrice: 45,
  },
  {
    title: "Paris",
    photo: "/photos/france/R1-06255-005A.JPG",
    sizes: ["8x10", "11x14", "16x20"],
    startingPrice: 45,
  },
  {
    title: "Yorkshire",
    photo: "/photos/uk/000377010001.jpg",
    sizes: ["8x10", "11x14", "16x20"],
    startingPrice: 45,
  },
  {
    title: "Florence",
    photo: "/photos/italy/000377080011.jpg",
    sizes: ["8x10", "11x14", "16x20"],
    startingPrice: 45,
  },
  {
    title: "Utah",
    photo: "/photos/us/R1-07714-0021.JPG",
    sizes: ["8x10", "11x14", "16x20"],
    startingPrice: 45,
  },
  {
    title: "Selected Work",
    photo: "/photos/featured/R1-06254-0004.JPG",
    sizes: ["8x10", "11x14", "16x20"],
    startingPrice: 45,
  },
];

// TODO: Wire Stripe Checkout

export default function ShopPage() {
  const fc = "var(--font-cormorant), serif";
  const fo = "var(--font-outfit), sans-serif";

  return (
    <section className="pt-16 bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        {/* -- Header -- */}
        <div className="text-center mb-16">
          <p
            style={{ fontFamily: fo }}
            className="text-xs tracking-[0.3em] text-text-muted uppercase mb-4"
          >
            Shop
          </p>
          <h1
            style={{ fontFamily: fc }}
            className="text-4xl sm:text-5xl text-charcoal font-light leading-tight"
          >
            Fine Art Prints
          </h1>
          <p
            style={{ fontFamily: fo }}
            className="text-sm text-text-secondary leading-relaxed mt-4 max-w-lg mx-auto"
          >
            Limited edition prints from the collection. Shot on 35mm film with a
            1970s Nikon FM.
          </p>
        </div>

        {/* -- Print Cards -- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prints.map((print) => (
            <div
              key={print.title}
              className="group border border-warm-gray rounded-sm bg-cream flex flex-col transition-all duration-300 hover:border-t-[3px] hover:border-t-burgundy overflow-hidden"
            >
              {/* Print photo */}
              <div className="w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src={print.photo}
                  alt={print.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Card content */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h2
                  style={{ fontFamily: fc }}
                  className="text-xl text-charcoal font-light"
                >
                  {print.title}
                </h2>

                <p
                  style={{ fontFamily: fo }}
                  className="text-xs text-text-muted mt-2 tracking-wide"
                >
                  {print.sizes.join(" / ")}
                </p>

                <p
                  style={{ fontFamily: fo }}
                  className="text-sm text-text-secondary mt-3"
                >
                  From ${print.startingPrice}
                </p>

                {/* TODO: Wire Stripe Checkout */}
                <button
                  type="button"
                  disabled
                  className="mt-4 self-start font-body text-sm tracking-wide text-burgundy border border-burgundy/40 px-6 py-2 rounded-sm hover:bg-burgundy hover:text-cream transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* -- Custom note -- */}
        <div className="text-center mt-16">
          <p
            style={{ fontFamily: fo }}
            className="text-sm text-text-secondary"
          >
            Custom sizes and framing available —{" "}
            <Link
              href="/contact"
              className="text-burgundy border-b border-burgundy/30 pb-0.5 hover:border-burgundy transition-colors duration-200"
            >
              contact for details
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
