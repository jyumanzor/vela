'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

const links = [
  { href: '/rules', label: 'Rules' },
  { href: '/tools', label: 'Tools' },
  { href: '/explainers', label: 'Explainers' },
];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
    router.refresh();
  }

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

        {/* Links + Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
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
                <Link
                  href="/login"
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--star-gold)',
                    border: '1px solid var(--star-gold)',
                    borderRadius: 6,
                    padding: '5px 14px',
                    textDecoration: 'none',
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
              )}
            </>
          )}
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
