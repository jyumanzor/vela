'use client';

import { useMemo, useState } from 'react';

/* ── Types ───────────────────────────────────────────────────── */
export type NodeType = 'thesis' | 'claim' | 'evidence' | 'source' | 'counter';
export type EdgeType = 'supports' | 'challenges' | 'cites' | 'extends';

export interface GraphNode { id: string; label: string; type: NodeType; note?: string; }
export interface GraphEdge { from: string; to: string; type: EdgeType; }
export interface GraphData { nodes: GraphNode[]; edges: GraphEdge[]; }

/* ── Visual config ───────────────────────────────────────────── */
const NODE_COLOR: Record<NodeType, string> = {
  thesis: '#D4A843', claim: '#C8D4A8', evidence: '#8FA797', source: '#566B5C', counter: '#C87B56',
};
const NODE_R: Record<NodeType, number> = { thesis: 26, claim: 18, evidence: 13, source: 11, counter: 15 };
const EDGE_RGBA: Record<EdgeType, string> = {
  supports: 'rgba(200,212,168,0.5)', challenges: 'rgba(200,123,86,0.6)',
  cites: 'rgba(86,107,92,0.6)', extends: 'rgba(143,167,151,0.5)',
};
const EDGE_DASH: Record<EdgeType, string | undefined> = {
  supports: undefined, challenges: '7 5', cites: '2 4', extends: '9 4',
};

const VW = 1200, VH = 820;

/* ── Deterministic radial layout ──────────────────────────────
   Thesis at the centre, claims + counter on the first ring, then a
   breadth-first fan outward (evidence, then sources). Pure function run
   during render: identical on server and client, no effects, no physics. */
interface Pos extends GraphNode { x: number; y: number; }

function computeLayout(data: GraphData): Pos[] {
  const cx = VW / 2, cy = VH / 2;
  const R = [0, 175, 290, 375];
  const pos: Record<string, { x: number; y: number }> = {};
  const angleOf: Record<string, number> = {};

  const adj: Record<string, string[]> = {};
  data.nodes.forEach(n => { adj[n.id] = []; });
  data.edges.forEach(e => { adj[e.from]?.push(e.to); adj[e.to]?.push(e.from); });

  const thesis = data.nodes.find(n => n.type === 'thesis') ?? data.nodes[0];
  pos[thesis.id] = { x: cx, y: cy };
  angleOf[thesis.id] = -Math.PI / 2;

  // Ring 1: claims + counter, evenly spaced spokes off the thesis
  const spokes = data.nodes.filter(n => n.id !== thesis.id && (n.type === 'claim' || n.type === 'counter'));
  spokes.forEach((s, i) => {
    const a = -Math.PI / 2 + (i / Math.max(1, spokes.length)) * 2 * Math.PI;
    pos[s.id] = { x: cx + R[1] * Math.cos(a), y: cy + R[1] * Math.sin(a) };
    angleOf[s.id] = a;
  });

  // BFS outward for the remaining tiers (evidence, sources)
  let frontier = spokes.map(s => s.id);
  for (let depth = 2; depth < R.length && frontier.length; depth++) {
    const next: string[] = [];
    for (const pid of frontier) {
      const kids = [...new Set(adj[pid])].filter(id => pos[id] === undefined);
      kids.forEach((id, j) => {
        const base = angleOf[pid];
        const a = base + (kids.length > 1 ? (j / (kids.length - 1) - 0.5) * 0.7 : 0);
        pos[id] = { x: cx + R[depth] * Math.cos(a), y: cy + R[depth] * Math.sin(a) };
        angleOf[id] = a;
        next.push(id);
      });
    }
    frontier = next;
  }

  // Anything still unplaced → spread on the outer ring
  const unplaced = data.nodes.filter(n => pos[n.id] === undefined);
  unplaced.forEach((n, i) => {
    const a = (i / Math.max(1, unplaced.length)) * 2 * Math.PI;
    pos[n.id] = { x: cx + R[R.length - 1] * Math.cos(a), y: cy + R[R.length - 1] * Math.sin(a) };
  });

  return data.nodes.map(n => ({
    ...n,
    x: Math.max(70, Math.min(VW - 70, pos[n.id].x)),
    y: Math.max(80, Math.min(VH - 80, pos[n.id].y)),
  }));
}

function wrapLabel(label: string, max = 24): string[] {
  const words = label.split(' ');
  const lines: string[] = []; let cur = '';
  for (const w of words) {
    if ((cur + w).length > max && cur) { lines.push(cur.trim()); cur = w + ' '; }
    else cur += w + ' ';
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

/* ── Component ───────────────────────────────────────────────── */
export function NetworkGraph({ data, accent = '#D4A843' }: { data: GraphData; accent?: string }) {
  const nodes = useMemo(() => computeLayout(data), [data]);
  const idx: Record<string, number> = {};
  nodes.forEach((n, i) => { idx[n.id] = i; });

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeId = selectedId ?? hoveredId;
  const activeNode = activeId ? data.nodes.find(n => n.id === activeId) ?? null : null;
  const activeCol = activeNode ? NODE_COLOR[activeNode.type] : accent;
  const connectedIds = new Set<string>();
  if (activeId) {
    for (const e of data.edges) {
      if (e.from === activeId) connectedIds.add(e.to);
      if (e.to === activeId) connectedIds.add(e.from);
    }
  }

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minWidth: 0 }}>
        <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
          <defs>
            <filter id="ng-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* edges */}
          {data.edges.map((e, i) => {
            const a = nodes[idx[e.from]], b = nodes[idx[e.to]];
            if (!a || !b) return null;
            const hi = e.from === activeId || e.to === activeId;
            const dim = activeId && !hi;
            return (
              <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={EDGE_RGBA[e.type]} strokeWidth={hi ? 2 : 1.2}
                strokeOpacity={dim ? 0.12 : hi ? 1 : 0.6} strokeDasharray={EDGE_DASH[e.type]} />
            );
          })}

          {/* nodes */}
          {nodes.map((n) => {
            const col = NODE_COLOR[n.type], r = NODE_R[n.type];
            const sel = n.id === selectedId, hov = n.id === hoveredId;
            const related = n.id === activeId || connectedIds.has(n.id);
            const dim = activeId && !related;
            const showLabel = hov || sel || related || n.type === 'thesis' || n.type === 'claim';
            return (
              <g key={n.id}
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() => setHoveredId(h => (h === n.id ? null : h))}
                onClick={() => setSelectedId(s => (s === n.id ? null : n.id))}
                style={{ cursor: 'pointer', opacity: dim ? 0.4 : 1, transition: 'opacity 0.2s' }}>
                {sel && <circle cx={n.x} cy={n.y} r={r + 7} fill="none" stroke={col} strokeOpacity={0.5} />}
                <circle cx={n.x} cy={n.y} r={r} fill={col} fillOpacity={sel || hov ? 1 : 0.88}
                  filter={sel || hov ? 'url(#ng-glow)' : undefined} />
                {showLabel && wrapLabel(n.label).map((line, li) => (
                  <text key={li} x={n.x} y={n.y + r + 16 + li * 15} textAnchor="middle"
                    fill={n.type === 'thesis' ? '#F0EDE6' : '#8FA797'}
                    fontSize={n.type === 'thesis' ? 15 : 12.5}
                    fontFamily="var(--font-dm-sans),sans-serif" style={{ pointerEvents: 'none' }}>{line}</text>
                ))}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', flexDirection: 'column', gap: 7, pointerEvents: 'none' }}>
          {(Object.entries(NODE_COLOR) as [NodeType, string][]).map(([type, col]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: col }} />
              <span style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, color: 'var(--constellation)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{type}</span>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 16, right: 16, fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, color: 'var(--constellation)', letterSpacing: '0.08em', pointerEvents: 'none' }}>
          hover to trace · click to inspect
        </div>
      </div>

      {/* Detail panel */}
      <div style={{ width: activeNode ? 268 : 0, flexShrink: 0, overflow: 'hidden', borderLeft: activeNode ? '1px solid var(--hairline)' : 'none', transition: 'width 0.3s cubic-bezier(0.22,1,0.36,1)' }}>
        {activeNode && (
          <div style={{ width: 268, padding: '28px 22px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: activeCol, boxShadow: `0 0 8px ${activeCol}` }} />
              <span style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--constellation)' }}>{activeNode.type}</span>
            </div>
            <p style={{ fontFamily: 'var(--font-instrument),serif', fontSize: 21, lineHeight: 1.2, color: 'var(--moonlight)', margin: '0 0 14px' }}>{activeNode.label}</p>
            {activeNode.note && <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13.5, lineHeight: 1.65, color: 'var(--dusk)', margin: 0 }}>{activeNode.note}</p>}
            <div style={{ marginTop: 22 }}>
              <p style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--constellation)', margin: '0 0 10px' }}>Connections</p>
              {data.edges.filter(e => e.from === activeNode.id || e.to === activeNode.id).map(e => {
                const otherId = e.from === activeNode.id ? e.to : e.from;
                const other = data.nodes.find(n => n.id === otherId);
                if (!other) return null;
                return (
                  <button key={otherId + e.type} onClick={() => setSelectedId(otherId)}
                    style={{ display: 'flex', gap: 10, alignItems: 'baseline', padding: '9px 0', borderTop: '1px solid var(--hairline)', cursor: 'pointer', background: 'none', border: 'none', borderTopStyle: 'solid', borderTopWidth: 1, borderTopColor: 'var(--hairline)', width: '100%', textAlign: 'left' }}>
                    <span style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, color: 'var(--dusk)', flexShrink: 0 }}>{e.from === activeNode.id ? '→' : '←'} {e.type}</span>
                    <span style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, color: 'var(--dusk)', lineHeight: 1.4 }}>{other.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
