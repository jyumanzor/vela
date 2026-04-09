'use client';

import { useState } from 'react';
import { explainers, categoryLabels } from '@/data/explainers';
import type { Explainer } from '@/data/explainers';
import { ConstellationDivider } from '@/components/ConstellationDivider';

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

export default function ExplainersPage() {
  const [activeCategory, setActiveCategory] = useState<Explainer['category'] | 'all'>('all');

  const filtered = activeCategory === 'all'
    ? explainers
    : explainers.filter(e => e.category === activeCategory);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px' }}>
      {/* Header */}
      <p
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase' as const,
          color: 'var(--constellation)',
          marginBottom: 12,
        }}
      >
        Explainers
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-instrument)',
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 400,
          color: 'var(--moonlight)',
          lineHeight: 1.15,
          marginBottom: 16,
        }}
      >
        The evidence behind the rules
      </h1>
      <p
        style={{
          fontSize: 16,
          color: 'var(--dusk)',
          maxWidth: 560,
          lineHeight: 1.7,
          marginBottom: 40,
        }}
      >
        Curated from published writing. Each post teaches the reasoning behind a rule —
        not just what to do, but why it works and what broke without it.
      </p>

      {/* Filter pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 24 }}>
        <button
          onClick={() => setActiveCategory('all')}
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            padding: '6px 14px',
            borderRadius: 100,
            border: '1px solid',
            borderColor: activeCategory === 'all' ? 'var(--star-gold)' : 'var(--stardust)',
            background: activeCategory === 'all' ? 'var(--star-gold)' : 'transparent',
            color: activeCategory === 'all' ? 'var(--forest-floor)' : 'var(--dusk)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          All ({explainers.length})
        </button>
        {categories.map(cat => {
          const count = explainers.filter(e => e.category === cat).length;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                padding: '6px 14px',
                borderRadius: 100,
                border: '1px solid',
                borderColor: isActive ? categoryColors[cat] : 'var(--stardust)',
                background: isActive ? categoryColors[cat] : 'transparent',
                color: isActive ? 'var(--forest-floor)' : 'var(--dusk)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {categoryLabels[cat]} ({count})
            </button>
          );
        })}
      </div>

      <ConstellationDivider brightIndices={[1, 3]} />

      {/* Explainer cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginTop: 32 }}>
        {filtered.map(explainer => (
          <a
            key={explainer.id}
            href={explainer.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: 'var(--deep-canopy)',
              border: '1px solid var(--stardust)',
              borderRadius: 12,
              overflow: 'hidden',
              textDecoration: 'none',
              transition: 'border-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--constellation)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--stardust)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--stardust)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  padding: '3px 8px',
                  borderRadius: 4,
                  background: categoryBgColors[explainer.category],
                  color: categoryColors[explainer.category],
                }}
              >
                {explainer.categoryLabel}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 9,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--constellation)',
                }}
              >
                {explainer.source}
              </span>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 20px 24px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--moonlight)',
                  marginBottom: 8,
                  lineHeight: 1.4,
                }}
              >
                {explainer.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--dusk)',
                  lineHeight: 1.65,
                }}
              >
                {explainer.summary}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Count */}
      <p
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 11,
          color: 'var(--constellation)',
          letterSpacing: '0.1em',
          marginTop: 32,
          textAlign: 'center' as const,
        }}
      >
        Showing {filtered.length} of {explainers.length} explainers
      </p>
    </div>
  );
}
