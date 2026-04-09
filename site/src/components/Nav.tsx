'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const links = [
  { href: '/rules', label: 'Rules' },
  { href: '/tools', label: 'Tools' },
  { href: '/explainers', label: 'Explainers' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(20, 30, 24, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--stardust)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontFamily: 'var(--font-instrument), serif',
              fontSize: 24,
              color: 'var(--moonlight)',
              position: 'relative',
              letterSpacing: '0.01em',
            }}
          >
            Vel
            <span style={{ position: 'relative', display: 'inline-block' }}>
              a
              <span
                style={{
                  position: 'absolute',
                  top: -4,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--star-gold)',
                  boxShadow: '0 0 6px var(--star-gold)',
                  animation: 'navStarPulse 2.5s ease-in-out infinite',
                }}
              />
            </span>
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', gap: 28 }}>
          {links.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? 'var(--star-gold)' : 'var(--dusk)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--moonlight)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--dusk)';
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes navStarPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px var(--star-gold); }
          50% { opacity: 0.5; box-shadow: 0 0 3px var(--star-gold); }
        }
      `}</style>
    </nav>
  );
}
