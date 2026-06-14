'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const fi = 'var(--font-instrument), serif';
const fd = 'var(--font-dm-sans), sans-serif';
const fj = 'var(--font-jetbrains), monospace';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    fontFamily: fd,
    fontSize: 14,
    color: 'var(--moonlight)',
    background: 'var(--understory)',
    border: '1px solid var(--stardust)',
    borderRadius: 8,
    outline: 'none',
    transition: 'border-color 0.15s ease',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: fj,
    fontSize: 10,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'var(--constellation)',
    marginBottom: 6,
    display: 'block',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '56px 20px 20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'var(--deep-canopy)',
          border: '1px solid var(--stardust)',
          borderRadius: 16,
          padding: '36px 32px 32px',
        }}
      >
        {/* Wordmark */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: fi,
                fontSize: 32,
                color: 'var(--moonlight)',
                position: 'relative',
              }}
            >
              Vel
              <span style={{ position: 'relative', display: 'inline-block' }}>
                a
                <span
                  style={{
                    position: 'absolute',
                    top: -5,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--star-gold)',
                    boxShadow: '0 0 8px var(--star-gold)',
                  }}
                />
              </span>
            </span>
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              fontFamily: fd,
              fontSize: 13,
              color: 'var(--meteor-red)',
              background: 'rgba(224, 82, 82, 0.1)',
              border: '1px solid rgba(224, 82, 82, 0.25)',
              borderRadius: 8,
              padding: '10px 14px',
              marginBottom: 20,
              lineHeight: 1.5,
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSignIn}
          style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
        >
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'var(--star-gold)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = 'var(--stardust)')
              }
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'var(--star-gold)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = 'var(--stardust)')
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              fontFamily: fd,
              fontSize: 14,
              fontWeight: 600,
              padding: '12px 0',
              borderRadius: 8,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              background: 'var(--star-gold)',
              color: 'var(--forest-floor)',
              opacity: loading ? 0.6 : 1,
              transition: 'opacity 0.15s ease',
              marginTop: 4,
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>

      <style jsx global>{`
        input::placeholder {
          color: var(--constellation);
        }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'var(--dusk)' }}>Loading...</span>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
