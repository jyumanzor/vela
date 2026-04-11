'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts, categoryColors, categoryLabels } from '@/data/blog-posts';
import type { BlogPost } from '@/data/blog-posts';
import { ConstellationDivider } from '@/components/ConstellationDivider';

const fi = 'var(--font-instrument), serif';
const fd = 'var(--font-dm-sans), sans-serif';
const fj = 'var(--font-jetbrains), monospace';

type Filter = 'all' | BlogPost['category'];

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'tutorial', label: 'Tutorials' },
  { key: 'methodology', label: 'Methodology' },
  { key: 'case-study', label: 'Case Studies' },
  { key: 'tool-guide', label: 'Tool Guides' },
];

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BlogPage() {
  const [active, setActive] = useState<Filter>('all');

  const filtered = active === 'all'
    ? blogPosts
    : blogPosts.filter((p) => p.category === active);

  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
      {/* Header */}
      <section style={{ paddingTop: 140, paddingBottom: 32 }}>
        <p style={{
          fontFamily: fj,
          fontSize: 11,
          letterSpacing: '0.15em',
          color: 'var(--constellation)',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          Blog
        </p>
        <h1 style={{
          fontFamily: fi,
          fontSize: 'clamp(32px, 5vw, 48px)',
          color: 'var(--moonlight)',
          lineHeight: 1.1,
          marginBottom: 12,
        }}>
          Methodology in practice
        </h1>
        <p style={{
          fontFamily: fd,
          fontSize: 16,
          color: 'var(--dusk)',
          lineHeight: 1.6,
        }}>
          Tutorials, case studies, and the thinking behind the rules.
        </p>
      </section>

      {/* Filter pills */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 40,
      }}>
        {filters.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              style={{
                fontFamily: fd,
                fontSize: 13,
                fontWeight: 500,
                padding: '6px 16px',
                borderRadius: 20,
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

      <ConstellationDivider brightIndices={[1, 3]} />

      {/* Post list */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {sorted.map((post, i) => (
          <article
            key={post.id}
            style={{
              paddingTop: 32,
              paddingBottom: 32,
              borderBottom: i < sorted.length - 1 ? '1px solid var(--stardust)' : 'none',
            }}
          >
            {/* Date */}
            <p style={{
              fontFamily: fj,
              fontSize: 12,
              color: 'var(--constellation)',
              marginBottom: 8,
              letterSpacing: '0.03em',
            }}>
              {formatDate(post.date)}
            </p>

            {/* Title */}
            <h2 style={{
              fontFamily: fd,
              fontSize: 20,
              fontWeight: 500,
              color: 'var(--moonlight)',
              lineHeight: 1.3,
              marginBottom: 10,
            }}>
              {post.title}
            </h2>

            {/* Category tag + cross-post note */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 12,
              flexWrap: 'wrap',
            }}>
              <span style={{
                fontFamily: fj,
                fontSize: 10,
                color: categoryColors[post.category],
                border: `1px solid ${categoryColors[post.category]}`,
                borderRadius: 4,
                padding: '2px 8px',
                opacity: 0.85,
                whiteSpace: 'nowrap',
              }}>
                {categoryLabels[post.category]}
              </span>
              {post.type === 'cross-post' && post.sourceUrl && (
                <span style={{
                  fontFamily: fd,
                  fontSize: 12,
                  color: 'var(--constellation)',
                  fontStyle: 'italic',
                }}>
                  Adapted from{' '}
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--dusk)', textDecoration: 'underline' }}
                  >
                    jennumanzor.com
                  </a>
                </span>
              )}
            </div>

            {/* Excerpt */}
            <p style={{
              fontFamily: fd,
              fontSize: 14,
              color: 'var(--dusk)',
              lineHeight: 1.7,
              marginBottom: 14,
            }}>
              {post.excerpt}
            </p>

            {/* Read link */}
            <Link
              href={`/blog/${post.id}`}
              style={{
                fontFamily: fd,
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--star-gold)',
                textDecoration: 'none',
                transition: 'opacity 0.15s ease',
              }}
            >
              Read {'\u2192'}
            </Link>
          </article>
        ))}
      </div>

      <div style={{ paddingTop: 24, paddingBottom: 80 }}>
        <ConstellationDivider brightIndices={[2]} />
      </div>
    </div>
  );
}
