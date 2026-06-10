'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

const links = [
  { href: '/rules', label: 'Rules' },
  { href: '/tools', label: 'Tools' },
  { href: '/explainers', label: 'Explainers' },
  { href: '/blog', label: 'Blog' },
];

/* The gold "Sign In" pill, shared by the desktop row and the mobile bar. */
function SignInPill() {
  return (
    <Link
      href="/login"
      className="vela-nav-pill"
      style={{
        fontFamily: 'var(--font-dm-sans), sans-serif',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--star-gold)',
        border: '1px solid var(--star-gold)',
        borderRadius: 6,
        padding: '5px 14px',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        transition: 'background 0.15s ease, color 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--star-gold)';
        e.currentTarget.style.color = 'var(--forest-floor)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--star-gold)';
      }}
    >
      Sign In
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const supabase = createClient();

    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // ESC closes the mobile menu and returns focus to the toggle.
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
    router.push('/');
    router.refresh();
  }

  /* Client-workspace pages (/access/<slug> and /access/<slug>/workspace) run
     their own HttpOnly-cookie password gate and render their own sign-in form
     or "Sign out" link in the body. The cookie can't be read from client JS,
     but those routes are server-gated, so the path alone tells us the global
     gold "Sign In" pill (which points at the unrelated Supabase /login) would
     only confuse a client there. Suppress it on those routes. */
  const onAccessPage = pathname === '/access' || !!pathname?.startsWith('/access/');

  const isActive = (href: string) =>
    pathname === href || !!pathname?.startsWith(href + '/');

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
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-instrument), serif',
              fontSize: 24,
              color: 'var(--moonlight)',
              position: 'relative',
              letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
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

        {/* Desktop (>=768px): full link row + auth, unchanged */}
        <div className="vela-nav-desktop">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  color: active ? 'var(--star-gold)' : 'var(--dusk)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = 'var(--moonlight)';
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = 'var(--dusk)';
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Auth section */}
          {!loading && (
            <>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Link
                    href="/dashboard"
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: 14,
                      fontWeight: 500,
                      color: pathname?.startsWith('/dashboard') ? 'var(--star-gold)' : 'var(--dusk)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!pathname?.startsWith('/dashboard'))
                        e.currentTarget.style.color = 'var(--moonlight)';
                    }}
                    onMouseLeave={(e) => {
                      if (!pathname?.startsWith('/dashboard'))
                        e.currentTarget.style.color = 'var(--dusk)';
                    }}
                  >
                    Dashboard
                  </Link>
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains), monospace',
                      fontSize: 11,
                      color: 'var(--constellation)',
                      maxWidth: 160,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--dusk)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--moonlight)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--dusk)';
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                !onAccessPage && <SignInPill />
              )}
            </>
          )}
        </div>

        {/* Mobile (<768px): pill (signed out) + hamburger */}
        <div className="vela-nav-mobile">
          {!loading && !user && !onAccessPage && <SignInPill />}
          <button
            ref={burgerRef}
            type="button"
            className="vela-nav-burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="vela-nav-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M3 5.5h14M3 10h14M3 14.5h14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <>
          <div
            className="vela-nav-overlay"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          />
          <div id="vela-nav-menu" className="vela-nav-menu">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="vela-nav-menu-link"
                  style={{ color: active ? 'var(--star-gold)' : 'var(--dusk)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            {!loading && user && (
              <div
                style={{
                  borderTop: '1px solid var(--stardust)',
                  marginTop: 8,
                  paddingTop: 8,
                }}
              >
                <Link
                  href="/dashboard"
                  className="vela-nav-menu-link"
                  style={{
                    color: pathname?.startsWith('/dashboard')
                      ? 'var(--star-gold)'
                      : 'var(--dusk)',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: 11,
                    color: 'var(--constellation)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    padding: '6px 2px',
                  }}
                >
                  {user.email}
                </span>
                <button
                  type="button"
                  className="vela-nav-menu-link vela-nav-menu-btn"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes navStarPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px var(--star-gold); }
          50% { opacity: 0.5; box-shadow: 0 0 3px var(--star-gold); }
        }

        /* ── Nav responsive layout (component-scoped via vela-nav- prefix) ── */
        .vela-nav-desktop {
          display: none;
          align-items: center;
          gap: 28px;
        }
        .vela-nav-mobile {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .vela-nav-burger {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          margin-right: -10px;
          padding: 0;
          background: none;
          border: none;
          border-radius: 8px;
          color: var(--moonlight);
          cursor: pointer;
        }
        .vela-nav-overlay {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 1;
          background: rgba(8, 12, 9, 0.45);
          animation: velaNavFadeIn 180ms ease-out;
        }
        .vela-nav-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 2;
          background: rgba(20, 30, 24, 0.96);
          -webkit-backdrop-filter: blur(16px);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--stardust);
          padding: 6px 24px 18px;
          max-height: calc(100vh - 56px);
          overflow-y: auto;
          animation: velaNavMenuIn 180ms ease-out;
        }
        .vela-nav-menu-link {
          display: block;
          width: 100%;
          padding: 13px 2px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: var(--dusk);
          text-align: left;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
        }
        .vela-nav-menu-link + .vela-nav-menu-link {
          border-top: 1px solid var(--stardust);
        }
        .vela-nav-menu-btn {
          font-size: 14px;
        }
        .vela-nav-burger:focus-visible,
        .vela-nav-menu-link:focus-visible,
        .vela-nav-pill:focus-visible {
          outline: 2px solid var(--star-gold);
          outline-offset: 3px;
        }
        @media (min-width: 768px) {
          .vela-nav-desktop { display: flex; }
          .vela-nav-mobile,
          .vela-nav-overlay,
          .vela-nav-menu { display: none; }
        }
        @keyframes velaNavMenuIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes velaNavFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vela-nav-menu,
          .vela-nav-overlay {
            animation: none;
          }
        }
      `}</style>
    </nav>
  );
}
