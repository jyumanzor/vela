'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const fi = 'var(--font-instrument), serif';
const fd = 'var(--font-dm-sans), sans-serif';
const fj = 'var(--font-jetbrains), monospace';

type Tab = 'signin' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  const [tab, setTab] = useState<Tab>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');
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

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage('Check your email for a confirmation link.');
    setLoading(false);
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

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 0,
            marginBottom: 28,
            borderBottom: '1px solid var(--stardust)',
          }}
        >
          {(['signin', 'signup'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setError('');
                setMessage('');
              }}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '10px 0 12px',
                fontFamily: fd,
                fontSize: 14,
                fontWeight: 600,
                color: tab === t ? 'var(--star-gold)' : 'var(--dusk)',
                borderBottom:
                  tab === t
                    ? '2px solid var(--star-gold)'
                    : '2px solid transparent',
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              {t === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
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

        {/* Success */}
        {message && (
          <div
            style={{
              fontFamily: fd,
              fontSize: 13,
              color: 'var(--lime)',
              background: 'rgba(230, 241, 99, 0.08)',
              border: '1px solid rgba(230, 241, 99, 0.2)',
              borderRadius: 8,
              padding: '10px 14px',
              marginBottom: 20,
              lineHeight: 1.5,
            }}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={tab === 'signin' ? handleSignIn : handleSignUp}
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

          {tab === 'signup' && (
            <div>
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
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
          )}

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
            {loading
              ? 'Loading...'
              : tab === 'signin'
                ? 'Sign In'
                : 'Create Account'}
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
