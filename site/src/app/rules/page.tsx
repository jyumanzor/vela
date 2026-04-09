'use client';

import { useState } from 'react';
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

export default function RulesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filtered =
    activeFilter === 'all'
      ? portableRules
      : portableRules.filter((r) => r.category === activeFilter);

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
      {/* Header */}
      <section style={{ paddingTop: 120, paddingBottom: 8 }}>
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
          Rules Library
        </p>
        <h1
          style={{
            fontFamily: fi,
            fontSize: 'clamp(32px, 5vw, 48px)',
            color: 'var(--moonlight)',
            lineHeight: 1.15,
            marginBottom: 12,
          }}
        >
          Encoded judgment from real failures
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
          13 universal rules. Loaded into every session. Extracted from projects that broke.
        </p>
      </section>

      {/* Filters */}
      <section style={{ paddingTop: 24, paddingBottom: 8 }}>
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
          Showing {filtered.length} of {portableRules.length} rules
        </p>
      </section>

      <ConstellationDivider brightIndices={[1, 3]} />

      {/* Rules Grid */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: 16,
          paddingBottom: 80,
        }}
      >
        {filtered.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
      </section>
    </div>
  );
}
