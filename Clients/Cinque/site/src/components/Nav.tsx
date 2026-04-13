"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const transparentNav = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wordmarkClass = transparentNav ? "text-cream" : "text-burgundy";
  const buttonLineClass = transparentNav ? "bg-cream" : "bg-charcoal";

  function getLinkClass(active: boolean) {
    if (transparentNav) {
      return active ? "text-cream" : "text-cream/70 hover:text-cream";
    }

    return active
      ? "text-burgundy"
      : "text-text-secondary hover:text-text-primary";
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparentNav
          ? "bg-transparent"
          : scrolled
          ? "bg-cream/95 backdrop-blur-sm border-b border-border"
          : "bg-cream/90 backdrop-blur-sm border-b border-border/70"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          onClick={closeMenu}
          className={`font-display text-xl tracking-[0.25em] font-medium uppercase transition-colors duration-300 ${wordmarkClass}`}
        >
          Cinque
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
                className={`font-body text-sm tracking-wide transition-colors duration-200 ${getLinkClass(active)}`}
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
            className={`block w-5 h-px transition-all duration-300 ${buttonLineClass} ${
              menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px transition-all duration-300 ${buttonLineClass} ${
              menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-cream/95 backdrop-blur-sm ${
          menuOpen ? "max-h-48 border-b border-border" : "max-h-0"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className={`font-body text-sm tracking-wide transition-colors duration-200 ${getLinkClass(active)}`}
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
