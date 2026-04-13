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

export default function ShopPage() {
  return (
    <section className="pt-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] text-whisper uppercase mb-4">
            Shop
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-parchment font-light leading-tight">
            Fine Art Prints
          </h1>
          <p className="font-body text-sm text-dust leading-relaxed mt-4 max-w-lg mx-auto">
            Limited edition prints from the collection. Shot on 35mm film with a
            1970s Nikon FM.
          </p>
        </div>

        {/* Print Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prints.map((print) => (
            <div
              key={print.title}
              className="group border border-suede rounded-sm flex flex-col transition-all duration-300 hover:border-clasp-gold/40 overflow-hidden"
              style={{ backgroundColor: "var(--patent-soft)" }}
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
                <h2 className="font-display text-xl text-parchment font-light">
                  {print.title}
                </h2>

                <p className="font-body text-xs text-whisper mt-2 tracking-wide">
                  {print.sizes.join(" / ")}
                </p>

                <p className="font-body text-sm text-dust mt-3">
                  From ${print.startingPrice}
                </p>

                <button
                  type="button"
                  disabled
                  className="mt-4 self-start pill-btn disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom note */}
        <div className="text-center mt-16">
          <p className="font-body text-sm text-dust">
            Custom sizes and framing available --{" "}
            <Link
              href="/contact"
              className="text-clasp-gold border-b border-clasp-gold/30 pb-0.5 hover:border-clasp-gold transition-colors duration-200"
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
