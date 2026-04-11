import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-border-light">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center gap-4 text-center">
        <p className="font-display text-lg tracking-[0.15em] text-text-secondary">
          Cinque Photography
        </p>
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs tracking-wide text-text-muted hover:text-burgundy transition-colors duration-200"
        >
          Instagram
        </Link>
        <p className="font-body text-xs text-warm-gray-dark">
          {new Date().getFullYear()} Cinque Photography
        </p>
      </div>
    </footer>
  );
}
