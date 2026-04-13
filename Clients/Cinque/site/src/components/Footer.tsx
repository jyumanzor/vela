import Link from "next/link";
import { siteProfile } from "@/data/site";

const footerLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-border-light">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center gap-4 text-center">
        <p className="font-display text-lg tracking-[0.15em] text-text-secondary">
          {siteProfile.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-body text-xs tracking-wide text-text-muted hover:text-burgundy transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
          {siteProfile.contact.methods.map((method) => (
            <Link
              key={method.label}
              href={method.href}
              target={method.external ? "_blank" : undefined}
              rel={method.external ? "noopener noreferrer" : undefined}
              className="font-body text-xs tracking-wide text-text-muted hover:text-burgundy transition-colors duration-200"
            >
              {method.label}
            </Link>
          ))}
        </div>
        <p className="font-body text-xs text-text-muted max-w-md">
          {siteProfile.previewNotice}
        </p>
        <p className="font-body text-xs text-warm-gray-dark">
          {new Date().getFullYear()} {siteProfile.title}
        </p>
      </div>
    </footer>
  );
}
