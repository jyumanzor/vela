'use client';

import { useState } from 'react';
import type { PortableRule } from '@/data/portable-rules';

const categoryColors: Record<PortableRule['category'], string> = {
  methodology: 'var(--star-gold)',
  'failure-mode': 'var(--meteor-red)',
  verification: 'var(--ember-copper)',
};

const categoryLabels: Record<PortableRule['category'], string> = {
  methodology: 'methodology',
  'failure-mode': 'failure mode',
  verification: 'verification',
};

const fi = 'var(--font-instrument), serif';
const fd = 'var(--font-dm-sans), sans-serif';
const fj = 'var(--font-jetbrains), monospace';

export function RuleCard({ rule }: { rule: PortableRule }) {
  const [expanded, setExpanded] = useState(false);
  const color = categoryColors[rule.category];

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: 'var(--understory)',
        border: `1px solid ${expanded ? 'var(--constellation)' : 'var(--stardust)'}`,
        borderRadius: 12,
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!expanded) e.currentTarget.style.borderColor = 'var(--constellation)';
      }}
      onMouseLeave={(e) => {
        if (!expanded) e.currentTarget.style.borderColor = 'var(--stardust)';
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 18px',
          borderBottom: `1px solid var(--stardust)`,
          backgroundImage: expanded
            ? `linear-gradient(180deg, rgba(212,168,67,0.06) 0%, transparent 100%)`
            : 'none',
        }}
      >
        <h3
          style={{
            fontFamily: fd,
            fontSize: 15,
            fontWeight: 600,
            color: 'var(--moonlight)',
            margin: 0,
          }}
        >
          {rule.name}
        </h3>
        <span
          style={{
            fontFamily: fj,
            fontSize: 10,
            color,
            border: `1px solid ${color}`,
            borderRadius: 4,
            padding: '2px 8px',
            opacity: 0.85,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            marginLeft: 12,
          }}
        >
          {categoryLabels[rule.category]}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '14px 18px' }}>
        <p
          style={{
            fontFamily: fi,
            fontSize: 14,
            color: 'var(--moonlight)',
            lineHeight: 1.5,
            margin: '0 0 10px 0',
            fontStyle: 'italic',
          }}
        >
          {rule.keyPrinciple}
        </p>
        <p
          style={{
            fontFamily: fd,
            fontSize: 13,
            color: 'var(--dusk)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {rule.summary}
        </p>

        {/* Expanded content */}
        <div
          style={{
            maxHeight: expanded ? 600 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.35s ease',
          }}
        >
          {rule.checklist && rule.checklist.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <p
                style={{
                  fontFamily: fj,
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  color: 'var(--constellation)',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Checklist
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  listStyleType: 'none',
                }}
              >
                {rule.checklist.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: fd,
                      fontSize: 12,
                      color: 'var(--dusk)',
                      lineHeight: 1.6,
                      paddingLeft: 4,
                      marginBottom: 4,
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: -14,
                        top: 6,
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: 'var(--constellation)',
                        display: 'inline-block',
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {rule.applicableTo.length > 0 && (
            <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {rule.applicableTo.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: fj,
                    fontSize: 10,
                    color: 'var(--dusk)',
                    background: 'var(--stardust)',
                    borderRadius: 4,
                    padding: '2px 8px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {rule.tier === 2 && rule.domainKit && (
            <div style={{ marginTop: 10 }}>
              <span
                style={{
                  fontFamily: fj,
                  fontSize: 10,
                  color: 'var(--nebula-amber)',
                  border: '1px solid var(--nebula-amber)',
                  borderRadius: 4,
                  padding: '2px 8px',
                  opacity: 0.8,
                }}
              >
                {rule.domainKit} kit
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
