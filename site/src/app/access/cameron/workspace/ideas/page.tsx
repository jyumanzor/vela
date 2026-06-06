import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { verifyToken, cookieName, verifyAdmin, adminCookieName } from '@/lib/clientAuth';
import { SignInScreen } from '@/components/access/SignInScreen';
import { CameronGraph } from './Graph';
import { fi, fd, fj } from '@/components/access/primitives';

export const metadata: Metadata = { title: 'Ideas Network | Cameron | Vela', robots: { index: false } };
export const dynamic = 'force-dynamic';

const SLUG   = 'cameron';
const NAME   = 'Cameron';
const ACCENT = 'var(--star-gold)';

export default async function CameronIdeasPage({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const sp    = await searchParams;
  const store = await cookies();
  const authed = verifyToken(SLUG, store.get(cookieName(SLUG))?.value) || verifyAdmin(store.get(adminCookieName)?.value);

  if (!authed) {
    return <SignInScreen slug={SLUG} name={NAME} accent={ACCENT} error={sp.e === '1'} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--forest-floor)' }}>
      {/* Top bar */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '0 24px',
        height: 52,
        borderBottom: '1px solid var(--hairline)',
        background: 'rgba(20,30,24,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}>
        <Link href="/access/cameron/workspace" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: fj, fontSize: 11, color: 'var(--constellation)', letterSpacing: '0.06em' }}>←</span>
          <span style={{ fontFamily: fj, fontSize: 11, color: 'var(--constellation)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Workspace</span>
        </Link>
        <span style={{ color: 'var(--hairline)', fontSize: 12 }}>|</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span aria-hidden style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--star-gold)', boxShadow: '0 0 6px var(--star-gold)', flexShrink: 0 }}/>
          <span style={{ fontFamily: fi, fontSize: 17, color: 'var(--moonlight)' }}>Network of Ideas</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 20, alignItems: 'center' }}>
          {/* edge type legend */}
          {([['supports', ''], ['challenges', '6 4'], ['cites', '2 3'], ['extends', '8 3']] as [string, string][]).map(([label]) => (
            <span key={label} style={{ fontFamily: fj, fontSize: 10, color: 'var(--constellation)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
          ))}
        </div>
      </div>

      {/* Graph — fills remaining height */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <CameronGraph />
      </div>

      {/* Footer hint */}
      <div style={{ flexShrink: 0, padding: '10px 24px', borderTop: '1px solid var(--hairline)', display: 'flex', gap: 24 }}>
        <span style={{ fontFamily: fd, fontSize: 12, color: 'var(--constellation)' }}>
          <strong style={{ color: 'var(--dusk)' }}>Hover</strong> a node to trace its connections
        </span>
        <span style={{ fontFamily: fd, fontSize: 12, color: 'var(--constellation)' }}>
          <strong style={{ color: 'var(--dusk)' }}>Click</strong> a node to read its notes
        </span>
      </div>
    </div>
  );
}
