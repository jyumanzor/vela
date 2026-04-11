'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { clients } from '@/data/clients';
import type { Client } from '@/data/clients';

const fi = 'var(--font-instrument), serif';
const fd = 'var(--font-dm-sans), sans-serif';
const fj = 'var(--font-jetbrains), monospace';

const navItems: { path: string; label: string; icon: string; comingSoon?: boolean }[] = [
  { path: '', label: 'Dashboard', icon: '\u2237' },
  { path: '/setup', label: 'Setup', icon: '\u2605' },
  { path: '/skills', label: 'Skills', icon: '\u25C6' },
  { path: '/explainers', label: 'Explainers', icon: '\u25C7' },
  { path: '/downloads', label: 'Downloads', icon: '\u2193' },
  { path: '/agents', label: 'Agents', icon: '\u25CA' },
  { path: '/tasks', label: 'Tasks', icon: '\u2713' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [setupMessage, setSetupMessage] = useState(false);

  useEffect(() => {
    async function loadClient() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // Try to find client record in Supabase
      const { data: clientRecord } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (clientRecord) {
        // Map Supabase record to Client type
        setClient({
          slug: clientRecord.slug,
          name: clientRecord.name,
          domain: clientRecord.domain,
          domainLabel: clientRecord.domain_label,
          domainKit: clientRecord.domain_kit,
          loadedSkillIds: clientRecord.loaded_skill_ids || [],
          setupSteps: [], // Will come from Supabase later
          agents: clientRecord.agent_ids || [],
        });
      } else {
        // Fall back to Cameron's hardcoded data for now
        const fallback = clients[0];
        if (fallback) {
          setClient(fallback);
        } else {
          setSetupMessage(true);
        }
      }

      setLoading(false);
    }

    loadClient();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingTop: 56 }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--star-gold)',
              boxShadow: '0 0 12px var(--star-gold)',
              margin: '0 auto 16px',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
          <p style={{ fontFamily: fd, fontSize: 14, color: 'var(--dusk)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (setupMessage) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingTop: 56 }}>
        <div style={{ textAlign: 'center', maxWidth: 400, padding: '0 20px' }}>
          <div
            style={{
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--star-gold)',
              boxShadow: '0 0 12px var(--star-gold)',
              margin: '0 auto 20px',
            }}
          />
          <h1 style={{ fontFamily: fi, fontSize: 28, color: 'var(--moonlight)', marginBottom: 12 }}>
            Your sandbox is being set up
          </h1>
          <p style={{ fontFamily: fd, fontSize: 15, color: 'var(--dusk)', lineHeight: 1.6 }}>
            We&apos;re preparing your workspace. This usually takes just a moment.
          </p>
          <Link
            href="/"
            style={{
              fontFamily: fd, fontSize: 14, color: 'var(--star-gold)',
              marginTop: 24, display: 'inline-block', textDecoration: 'none',
            }}
          >
            Back to Vela
          </Link>
        </div>
      </div>
    );
  }

  if (!client) return null;

  const basePath = '/dashboard';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 56 }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          background: 'var(--deep-canopy)',
          borderRight: '1px solid var(--stardust)',
          padding: '28px 0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Client identity */}
        <div style={{ padding: '0 20px', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--star-gold)',
                boxShadow: '0 0 8px var(--star-gold)',
                flexShrink: 0,
              }}
            />
            <span style={{ fontFamily: fi, fontSize: 22, color: 'var(--moonlight)' }}>
              {client.name}
            </span>
          </div>
          <p style={{ fontFamily: fj, fontSize: 11, color: 'var(--constellation)', marginTop: 6, paddingLeft: 15 }}>
            {client.domainLabel}
          </p>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => {
            const href = basePath + item.path;
            const isActive = item.path === ''
              ? pathname === basePath || pathname === basePath + '/'
              : pathname?.startsWith(href);

            return (
              <Link
                key={item.path}
                href={href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 20px',
                  textDecoration: 'none',
                  fontFamily: fd, fontSize: 14, fontWeight: 500,
                  color: isActive ? 'var(--star-gold)' : 'var(--dusk)',
                  borderLeft: isActive ? '3px solid var(--star-gold)' : '3px solid transparent',
                  transition: 'color 0.15s ease, border-color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--moonlight)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--dusk)';
                }}
              >
                <span style={{ width: 18, textAlign: 'center', fontSize: 14, flexShrink: 0 }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.comingSoon && (
                  <span
                    style={{
                      fontFamily: fj, fontSize: 9, letterSpacing: '0.05em',
                      color: 'var(--constellation)',
                      border: '1px solid var(--constellation)',
                      borderRadius: 4, padding: '1px 6px',
                      marginLeft: 'auto', whiteSpace: 'nowrap',
                    }}
                  >
                    Soon
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '32px 40px', maxWidth: 960 }}>
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          aside {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid var(--stardust);
            padding: 12px 0 !important;
          }
          aside > div:first-child { display: none !important; }
          aside nav {
            flex-direction: row !important;
            overflow-x: auto;
            gap: 0 !important;
            padding: 0 12px;
          }
          aside nav a {
            border-left: none !important;
            border-bottom: 2px solid transparent;
            padding: 8px 14px !important;
            white-space: nowrap;
            font-size: 13px !important;
          }
        }
      `}</style>
    </div>
  );
}
