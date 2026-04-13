import type { Metadata } from "next";
import Link from "next/link";
import { siteProfile } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "See what to include when you reach out to Cinque about portraits, travel stories, editorial work, or prints.",
};

export default function ContactPage() {
  const fc = "var(--font-cormorant), serif";
  const fo = "var(--font-outfit), sans-serif";
  const hasMethods = siteProfile.contact.methods.length > 0;

  return (
    <section className="pt-16 bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* -- Left: Info -- */}
          <div>
            <h1
              style={{ fontFamily: fc }}
              className="text-4xl sm:text-5xl text-charcoal font-light leading-tight"
            >
              Get in Touch
            </h1>
            <p
              style={{ fontFamily: fo }}
              className="text-sm text-text-secondary leading-relaxed mt-6 max-w-sm"
            >
              {siteProfile.contact.intro}
            </p>

            <div
              style={{ fontFamily: fo }}
              className="mt-10 space-y-4 text-sm text-text-secondary"
            >
              {hasMethods ? (
                siteProfile.contact.methods.map((method) => (
                  <div key={method.label}>
                    <p className="text-xs tracking-[0.2em] text-text-muted uppercase mb-1">
                      {method.label}
                    </p>
                    <a
                      href={method.href}
                      target={method.external ? "_blank" : undefined}
                      rel={method.external ? "noopener noreferrer" : undefined}
                      className="hover:text-burgundy transition-colors duration-200"
                    >
                      {method.value}
                    </a>
                  </div>
                ))
              ) : (
                <div className="rounded-sm border border-border bg-warm-white px-5 py-5">
                  <p className="text-xs tracking-[0.2em] text-text-muted uppercase mb-2">
                    Preview note
                  </p>
                  <p className="leading-relaxed">{siteProfile.contact.note}</p>
                </div>
              )}
            </div>

            <div className="mt-10 rounded-sm border border-border bg-warm-white px-5 py-5">
              <p
                style={{ fontFamily: fo }}
                className="text-xs tracking-[0.2em] text-text-muted uppercase mb-3"
              >
                Available for
              </p>
              <div className="space-y-4">
                {siteProfile.services.map((service) => (
                  <div key={service.title}>
                    <p
                      style={{ fontFamily: fc }}
                      className="text-xl text-charcoal font-light"
                    >
                      {service.title}
                    </p>
                    <p
                      style={{ fontFamily: fo }}
                      className="text-sm text-text-secondary leading-relaxed mt-1"
                    >
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* -- Right: Guidance -- */}
          <div className="space-y-6">
            <div className="rounded-sm border border-border bg-warm-white px-6 py-6">
              <p
                style={{ fontFamily: fo }}
                className="text-xs tracking-[0.2em] text-text-muted uppercase mb-3"
              >
                Helpful details
              </p>
              <ul className="space-y-3">
                {siteProfile.contact.checklist.map((item) => (
                  <li
                    key={item}
                    style={{ fontFamily: fo }}
                    className="text-sm text-text-secondary leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-sm border border-border bg-cream px-6 py-6">
              <p
                style={{ fontFamily: fo }}
                className="text-xs tracking-[0.2em] text-text-muted uppercase mb-3"
              >
                Best next step
              </p>
              <p
                style={{ fontFamily: fo }}
                className="text-sm text-text-secondary leading-relaxed"
              >
                Start by looking through the portfolio and services pages so
                the first note can reference the kind of images or coverage
                you have in mind.
              </p>
              <div className="flex flex-col items-start gap-3 mt-6 sm:flex-row sm:items-center">
                <Link
                  href="/portfolio"
                  className="inline-block font-body text-sm tracking-wide text-cream bg-burgundy hover:bg-burgundy-deep px-6 py-3 rounded-sm transition-colors duration-300"
                >
                  View Portfolio
                </Link>
                <Link
                  href="/services"
                  className="inline-block font-body text-sm tracking-wide text-burgundy border-b border-burgundy/30 pb-0.5 hover:border-burgundy transition-colors duration-200"
                >
                  Review Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
