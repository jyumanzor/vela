'use client';

import { useState } from 'react';
import { explainers, categoryLabels } from '@/data/explainers';
import type { Explainer } from '@/data/explainers';
import { ConstellationDivider } from '@/components/ConstellationDivider';

const fj = 'var(--font-jetbrains), monospace';
const fi = 'var(--font-instrument), serif';
const fd = 'var(--font-dm-sans), sans-serif';

const categories = Object.keys(categoryLabels) as Explainer['category'][];

const categoryColors: Record<Explainer['category'], string> = {
  'why-methodology': 'var(--star-gold)',
  'validation': 'var(--meteor-red)',
  'cross-model': 'var(--ember-copper)',
  'data-quality': 'var(--lime)',
  'system-architecture': 'var(--nebula-amber)',
};

const categoryBgColors: Record<Explainer['category'], string> = {
  'why-methodology': 'rgba(212, 168, 67, 0.12)',
  'validation': 'rgba(224, 82, 82, 0.12)',
  'cross-model': 'rgba(200, 123, 86, 0.12)',
  'data-quality': 'rgba(230, 241, 99, 0.12)',
  'system-architecture': 'rgba(232, 168, 73, 0.12)',
};

// Filter to writing-relevant explainers
const domainExplainers = explainers.filter(
  (e) => e.relevantTo.includes('writing') || e.relevantTo.includes('all')
);

export default function ClientExplainersPage() {
  const [activeCategory, setActiveCategory] = useState<Explainer['category'] | 'all'>('all');

  const filtered = activeCategory === 'all'
    ? domainExplainers
    : domainExplainers.filter((e) => e.category === activeCategory);

  return (
    <div>
      {/* Header */}
      <p style={{ fontFamily: fj, fontSize: 10, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--constellation)', marginBottom: 12 }}>
        Your Explainers
      </p>
      <h1 style={{ fontFamily: fi, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: 'var(--moonlight)', lineHeight: 1.15, marginBottom: 12 }}>
        Evidence for your domain
      </h1>
      <p style={{ fontSize: 15, color: 'var(--dusk)', maxWidth: 520, lineHeight: 1.7, marginBottom: 32 }}>
        Curated for white paper writing. The reasoning behind your loaded rules.
      </p>

      {/* Filter pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        <button
          onClick={() => setActiveCategory('all')}
          style={{
            fontFamily: fj, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '6px 14px', borderRadius: 100, border: '1px solid',
            borderColor: activeCategory === 'all' ? 'var(--star-gold)' : 'var(--stardust)',
            background: activeCategory === 'all' ? 'var(--star-gold)' : 'transparent',
            color: activeCategory === 'all' ? 'var(--forest-floor)' : 'var(--dusk)',
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}
        >
          All ({domainExplainers.length})
        </button>
        {categories.map((cat) => {
          const count = domainExplainers.filter((e) => e.category === cat).length;
          if (count === 0) return null;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: fj, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '6px 14px', borderRadius: 100, border: '1px solid',
                borderColor: isActive ? categoryColors[cat] : 'var(--stardust)',
                background: isActive ? categoryColors[cat] : 'transparent',
                color: isActive ? 'var(--forest-floor)' : 'var(--dusk)',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
            >
              {categoryLabels[cat]} ({count})
            </button>
          );
        })}
      </div>

      <ConstellationDivider brightIndices={[1, 3]} />

      {/* Explainer cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginTop: 28 }}>
        {filtered.map((explainer) => (
          <a
            key={explainer.id}
            href={explainer.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block', background: 'var(--deep-canopy)', border: '1px solid var(--stardust)',
              borderRadius: 12, overflow: 'hidden', textDecoration: 'none',
              transition: 'border-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--constellation)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--stardust)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--stardust)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ fontFamily: fj, fontSize: 9, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, background: categoryBgColors[explainer.category], color: categoryColors[explainer.category] }}>
                {explainer.categoryLabel}
              </span>
              <span style={{ fontFamily: fj, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--constellation)' }}>
                {explainer.source}
              </span>
            </div>
            <div style={{ padding: '18px 18px 22px' }}>
              <h3 style={{ fontFamily: fd, fontSize: 15, fontWeight: 500, color: 'var(--moonlight)', marginBottom: 8, lineHeight: 1.4 }}>
                {explainer.title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--dusk)', lineHeight: 1.65 }}>
                {explainer.summary}
              </p>
            </div>
          </a>
        ))}
      </div>

      <p style={{ fontFamily: fj, fontSize: 11, color: 'var(--constellation)', letterSpacing: '0.1em', marginTop: 28, textAlign: 'center' }}>
        Showing {filtered.length} of {domainExplainers.length} explainers
      </p>
    </div>
  );
}
