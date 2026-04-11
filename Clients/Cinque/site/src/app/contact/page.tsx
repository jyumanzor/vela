"use client";

import { useState } from "react";

const subjects = [
  "Print Inquiry",
  "Commission",
  "Event",
  "Collaboration",
  "Other",
];

export default function ContactPage() {
  const fc = "var(--font-cormorant), serif";
  const fo = "var(--font-outfit), sans-serif";

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const update = (
    field: keyof typeof form,
    value: string,
  ) => setForm((prev) => ({ ...prev, [field]: value }));

  // TODO: Wire to Formspree or Resend
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputBase = [
    "w-full rounded-sm border px-3 py-2.5 text-sm outline-none transition-colors duration-200",
    "bg-warm-white border-warm-gray",
    "focus:border-burgundy",
    "placeholder:text-text-muted",
  ].join(" ");

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
              For inquiries about prints, commissions, events, or
              collaborations.
            </p>

            <div
              style={{ fontFamily: fo }}
              className="mt-10 space-y-4 text-sm text-text-secondary"
            >
              <div>
                <p className="text-xs tracking-[0.2em] text-text-muted uppercase mb-1">
                  Email
                </p>
                <a
                  href="mailto:cinque@cinquephotos.com"
                  className="hover:text-burgundy transition-colors duration-200"
                >
                  cinque@cinquephotos.com
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-text-muted uppercase mb-1">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/cinquephotos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-burgundy transition-colors duration-200"
                >
                  @cinquephotos
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-text-muted uppercase mb-1">
                  Location
                </p>
                <p>Chicago, IL</p>
              </div>
            </div>
          </div>

          {/* -- Right: Form -- */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                style={{ fontFamily: fo }}
                className="block text-xs tracking-wide text-text-secondary mb-1.5"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                style={{ fontFamily: fo }}
                className={inputBase}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                style={{ fontFamily: fo }}
                className="block text-xs tracking-wide text-text-secondary mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                style={{ fontFamily: fo }}
                className={inputBase}
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                style={{ fontFamily: fo }}
                className="block text-xs tracking-wide text-text-secondary mb-1.5"
              >
                Subject
              </label>
              <select
                id="subject"
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                style={{ fontFamily: fo }}
                className={`${inputBase} ${
                  form.subject ? "text-text-primary" : "text-text-muted"
                }`}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                style={{ fontFamily: fo }}
                className="block text-xs tracking-wide text-text-secondary mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                style={{ fontFamily: fo }}
                className={`${inputBase} resize-none`}
              />
            </div>

            <button
              type="submit"
              style={{ fontFamily: fo }}
              className="text-sm tracking-wide text-cream bg-burgundy hover:bg-burgundy-deep px-8 py-3 rounded-sm transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
