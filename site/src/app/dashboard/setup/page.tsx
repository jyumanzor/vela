'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { clients } from '@/data/clients';
import type { Client } from '@/data/clients';

const fi = 'var(--font-instrument), serif';
const fd = 'var(--font-dm-sans), sans-serif';
const fj = 'var(--font-jetbrains), monospace';

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ position: 'relative', background: 'var(--forest-floor)', border: '1px solid var(--stardust)', borderRadius: 8, padding: '14px 16px', marginTop: 10, overflowX: 'auto' }}>
      <code style={{ fontFamily: fj, fontSize: 13, color: 'var(--moonlight)', whiteSpace: 'pre' }}>{code}</code>
      <button
        onClick={copy}
        style={{
          position: 'absolute', top: 8, right: 8, background: 'var(--stardust)', border: 'none',
          borderRadius: 6, padding: '4px 10px', fontFamily: fj, fontSize: 11,
          color: copied ? 'var(--star-gold)' : 'var(--dusk)', cursor: 'pointer', transition: 'color 0.15s',
        }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

const tabs = ['Claude Code', 'Codex'] as const;
type Tab = typeof tabs[number];

export default function SetupPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Claude Code');
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: clientRecord } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (clientRecord) {
        setClient({
          slug: clientRecord.slug,
          name: clientRecord.name,
          domain: clientRecord.domain,
          domainLabel: clientRecord.domain_label,
          domainKit: clientRecord.domain_kit,
          loadedSkillIds: clientRecord.loaded_skill_ids || [],
          setupSteps: [],
          agents: clientRecord.agent_ids || [],
        });
      } else {
        setClient(clients[0] || null);
      }
    }
    load();
  }, []);

  if (!client) return null;

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div>
      {/* Header */}
      <p style={{ fontFamily: fj, fontSize: 11, letterSpacing: '0.15em', color: 'var(--constellation)', textTransform: 'uppercase', marginBottom: 8 }}>
        Setup
      </p>
      <h1 style={{ fontFamily: fi, fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--moonlight)', lineHeight: 1.2, marginBottom: 8 }}>
        Get started with your tools
      </h1>
      <p style={{ fontFamily: fd, fontSize: 15, color: 'var(--dusk)', marginBottom: 32 }}>
        Two tools, one workspace. Claude Code writes, Codex reviews.
      </p>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid var(--stardust)', marginBottom: 32 }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0 12px',
              fontFamily: fd, fontSize: 15, fontWeight: 600,
              color: activeTab === tab ? 'var(--star-gold)' : 'var(--dusk)',
              borderBottom: activeTab === tab ? '2px solid var(--star-gold)' : '2px solid transparent',
              transition: 'color 0.15s, border-color 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'Claude Code' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Section num={1} title="Install">
            <CodeBlock code="npm install -g @anthropic-ai/claude-code" />
          </Section>
          <Section num={2} title="Create workspace">
            <CodeBlock code="mkdir -p ~/white-papers/{ref-docs/{papers,data,notes,drafts},output/_archive,skills}" />
          </Section>
          <Section num={3} title="Install your rules">
            <p style={{ fontFamily: fd, fontSize: 14, color: 'var(--dusk)', lineHeight: 1.6 }}>
              Download your starter kit from the{' '}
              <Link href="/dashboard/downloads" style={{ color: 'var(--star-gold)', textDecoration: 'none' }}>
                Downloads page
              </Link>
              , or copy these files manually.
            </p>
          </Section>
          <Section num={4} title="Start a session">
            <CodeBlock code="cd ~/white-papers && claude" />
            <p style={{ fontFamily: fd, fontSize: 14, color: 'var(--dusk)', lineHeight: 1.6, marginTop: 10 }}>
              Claude reads your CLAUDE.md automatically. Your skills, citation rules, and operating loop are loaded from the first prompt.
            </p>
          </Section>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Section num={1} title="What Codex does differently">
            <div style={{ background: 'var(--understory)', border: '1px solid var(--stardust)', borderRadius: 10, padding: '16px 20px', marginTop: 10 }}>
              <p style={{ fontFamily: fd, fontSize: 14, color: 'var(--dusk)', lineHeight: 1.6 }}>
                Codex runs in the background. You give it a task, it works asynchronously, and you check results later. Use it as a reviewer while Claude Code handles primary writing.
              </p>
            </div>
          </Section>
          <Section num={2} title="Install">
            <CodeBlock code="npm install -g @openai/codex" />
          </Section>
          <Section num={3} title="Share your workspace">
            <p style={{ fontFamily: fd, fontSize: 14, color: 'var(--dusk)', lineHeight: 1.6 }}>
              Point Codex at the same project folder. It reads the same CLAUDE.md and skills.
            </p>
            <CodeBlock code="cd ~/white-papers && codex" />
          </Section>
          <Section num={4} title="When to use Codex">
            <ul style={{ fontFamily: fd, fontSize: 14, color: 'var(--dusk)', lineHeight: 1.8, paddingLeft: 20, marginTop: 8 }}>
              {[
                'Review my argument for logical gaps',
                'Check all citations against my reference docs',
                'Find counterexamples to my thesis',
                'Run a background check while I keep writing in Claude',
              ].map((item) => (
                <li key={item} style={{ marginBottom: 4 }}>{item}</li>
              ))}
            </ul>
          </Section>
        </div>
      )}

      {/* Progress checklist */}
      {client.setupSteps.length > 0 && (
        <div style={{ marginTop: 48, background: 'var(--deep-canopy)', border: '1px solid var(--stardust)', borderRadius: 12, padding: '24px 28px' }}>
          <p style={{ fontFamily: fj, fontSize: 11, letterSpacing: '0.15em', color: 'var(--constellation)', textTransform: 'uppercase', marginBottom: 12 }}>
            Progress
          </p>
          <h3 style={{ fontFamily: fi, fontSize: 22, color: 'var(--moonlight)', marginBottom: 20 }}>
            Setup checklist
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {client.setupSteps.map((step) => (
              <label
                key={step.id}
                style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}
                onClick={() => toggle(step.id)}
              >
                <span
                  style={{
                    width: 20, height: 20, borderRadius: 4, flexShrink: 0, marginTop: 1,
                    border: checked[step.id] ? '2px solid var(--star-gold)' : '2px solid var(--constellation)',
                    background: checked[step.id] ? 'var(--star-gold)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}
                >
                  {checked[step.id] && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="var(--forest-floor)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <div>
                  <span style={{
                    fontFamily: fd, fontSize: 14, fontWeight: 600,
                    color: checked[step.id] ? 'var(--star-gold)' : 'var(--moonlight)',
                    textDecoration: checked[step.id] ? 'line-through' : 'none',
                    transition: 'color 0.15s',
                  }}>
                    {step.label}
                  </span>
                  <p style={{ fontFamily: fd, fontSize: 13, color: 'var(--constellation)', marginTop: 2 }}>
                    {step.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 24, height: 24, borderRadius: '50%', background: 'var(--stardust)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-jetbrains), monospace', fontSize: 12, color: 'var(--dusk)', flexShrink: 0,
        }}>
          {num}
        </span>
        <h3 style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 16, fontWeight: 600, color: 'var(--moonlight)' }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
