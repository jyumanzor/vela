'use client';

import { useState, use } from 'react';
import { getClient } from '@/data/clients';
import { portableRules } from '@/data/portable-rules';
import { RuleCard } from '@/components/RuleCard';
import { ConstellationDivider } from '@/components/ConstellationDivider';

type FilterKey = 'all' | 'methodology' | 'failure-mode' | 'verification';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'methodology', label: 'Methodology' },
  { key: 'failure-mode', label: 'Failure Modes' },
  { key: 'verification', label: 'Verification' },
];

const fi = 'var(--font-instrument), serif';
const fd = 'var(--font-dm-sans), sans-serif';
const fj = 'var(--font-jetbrains), monospace';

const domainKitLabels: Record<string, string> = {
  writing: 'Writing Kit',
  frontend: 'Frontend Kit',
  data: 'Data Kit',
};

export default function ClientSkillsPage({
  params,
}: {
  params: Promise<{ client: string }>;
}) {
  const { client: slug } = use(params);
  const client = getClient(slug);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  if (!client) return null;

  const loadedRules = portableRules.filter((r) =>
    client.loadedSkillIds.includes(r.id)
  );

  const filtered =
    activeFilter === 'all'
      ? loadedRules
      : loadedRules.filter((r) => r.category === activeFilter);

  const kitLabel = domainKitLabels[client.domainKit] || client.domainKit;

  return (
    <div>
      {/* Header */}
      <section style={{ marginBottom: 8 }}>
        <p
          style={{
            fontFamily: fj,
            fontSize: 11,
            letterSpacing: '0.15em',
            color: 'var(--constellation)',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Your Skills
        </p>
        <h1
          style={{
            fontFamily: fi,
            fontSize: 'clamp(28px, 4vw, 40px)',
            color: 'var(--moonlight)',
            lineHeight: 1.15,
            marginBottom: 12,
          }}
        >
          {loadedRules.length} rules loaded for {client.domainLabel.toLowerCase()}
        </h1>
        <p
          style={{
            fontFamily: fd,
            fontSize: 15,
            color: 'var(--dusk)',
            lineHeight: 1.6,
            maxWidth: 600,
          }}
        >
          Tier 1 universal rules plus your {kitLabel.toLowerCase()}. These load
          automatically in every session.
        </p>
      </section>

      {/* Filters */}
      <section style={{ paddingTop: 16, paddingBottom: 8 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {filters.map((f) => {
            const isActive = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                style={{
                  fontFamily: fd,
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '6px 16px',
                  borderRadius: 6,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease, color 0.15s ease',
                  background: isActive ? 'var(--star-gold)' : 'var(--stardust)',
                  color: isActive ? 'var(--forest-floor)' : 'var(--dusk)',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <p
          style={{
            fontFamily: fj,
            fontSize: 11,
            color: 'var(--constellation)',
            marginTop: 14,
            letterSpacing: '0.05em',
          }}
        >
          Showing {filtered.length} of {loadedRules.length} loaded skills
        </p>
      </section>

      <ConstellationDivider brightIndices={[1, 3]} />

      {/* Skills Grid */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: 16,
          paddingBottom: 80,
        }}
      >
        {filtered.map((rule) => (
          <div key={rule.id}>
            <RuleCard rule={rule} />
            <p
              style={{
                fontFamily: fj,
                fontSize: 10,
                letterSpacing: '0.08em',
                color: rule.tier === 1 ? 'var(--constellation)' : 'var(--nebula-amber)',
                marginTop: 6,
                marginLeft: 4,
                opacity: 0.8,
              }}
            >
              {rule.tier === 1
                ? 'Universal — loaded for all Vela users'
                : `${kitLabel} — loaded because your domain is ${client.domainLabel.toLowerCase()}`}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
