"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md"
          : ""
      }`}
      style={{
        backgroundColor: scrolled
          ? "rgba(43, 15, 17, 0.8)"
          : "transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark + script tag */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-baseline gap-2"
        >
          <span className="font-display text-lg tracking-[0.25em] font-medium uppercase text-parchment transition-colors duration-300">
            Cinque
          </span>
          <span className="font-display text-xs text-dust tracking-[0.2em] italic">Photography</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className={`font-body text-sm tracking-wide transition-colors duration-200 ${
                  active
                    ? "text-parchment"
                    : "text-dust hover:text-clasp-gold"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-px bg-parchment transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-parchment transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 backdrop-blur-md ${
          menuOpen ? "max-h-48" : "max-h-0"
        }`}
        style={{
          backgroundColor: menuOpen ? "rgba(43, 15, 17, 0.95)" : "transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className={`font-body text-sm tracking-wide transition-colors duration-200 ${
                  active
                    ? "text-parchment"
                    : "text-dust hover:text-clasp-gold"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
