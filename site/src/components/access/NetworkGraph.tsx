'use client';

import { useMemo, useState } from 'react';

/* ── Types (taxonomy is data-driven, not hardcoded) ───────────── */
export interface GraphNode { id: string; label: string; type: string; note?: string; }
export interface GraphEdge { from: string; to: string; type: string; }
export interface GraphData { rootId: string; nodes: GraphNode[]; edges: GraphEdge[]; }

interface NodeStyle { color: string; r: number; label: string; always?: boolean; }
interface EdgeStyle { color: string; dash?: string; }

/* Shared style registry — covers every client's taxonomy. A page's legend
   only shows the types that actually appear in its data. */
const NODE_STYLE: Record<string, NodeStyle> = {
  // argument atlas (Cameron)
  thesis:    { color: '#D4A843', r: 26, label: 'Thesis', always: true },
  claim:     { color: '#C8D4A8', r: 18, label: 'Claim', always: true },
  evidence:  { color: '#8FA797', r: 13, label: 'Evidence' },
  source:    { color: '#566B5C', r: 11, label: 'Source' },
  counter:   { color: '#C87B56', r: 15, label: 'Counter', always: true },
  // site / design atlas (Rishmithaa)
  site:      { color: '#C87B56', r: 26, label: 'Site', always: true },
  page:      { color: '#C8D4A8', r: 18, label: 'Page', always: true },
  component: { color: '#8FA797', r: 13, label: 'Component' },
  token:     { color: '#D4A843', r: 11, label: 'Token' },
  content:   { color: '#566B5C', r: 11, label: 'Content' },
};

const EDGE_STYLE: Record<string, EdgeStyle> = {
  supports:   { color: 'rgba(200,212,168,0.5)' },
  challenges: { color: 'rgba(200,123,86,0.6)', dash: '7 5' },
  cites:      { color: 'rgba(86,107,92,0.6)', dash: '2 4' },
  extends:    { color: 'rgba(143,167,151,0.5)', dash: '9 4' },
  contains:   { color: 'rgba(200,212,168,0.5)' },
  uses:       { color: 'rgba(212,168,67,0.55)', dash: '2 4' },
  links:      { color: 'rgba(143,167,151,0.5)', dash: '9 4' },
  feeds:      { color: 'rgba(86,107,92,0.6)', dash: '7 5' },
};

const FALLBACK_NODE: NodeStyle = { color: '#8FA797', r: 13, label: 'Node' };
const FALLBACK_EDGE: EdgeStyle = { color: 'rgba(143,167,151,0.5)' };
const ns = (t: string) => NODE_STYLE[t] ?? FALLBACK_NODE;
const es = (t: string) => EDGE_STYLE[t] ?? FALLBACK_EDGE;

const VW = 1200, VH = 820;

/* ── Deterministic radial layout via BFS from the root ─────────
   Pure function run during render: identical on server and client, no effects,
   no measurement, no hydration mismatch. Works for any rooted graph. */
interface Pos extends GraphNode { x: number; y: number; }

function computeLayout(data: GraphData): Pos[] {
  const cx = VW / 2, cy = VH / 2;
  const R = [0, 175, 290, 375];
  const pos: Record<string, { x: number; y: number }> = {};
  const angleOf: Record<string, number> = {};

  const adj: Record<string, string[]> = {};
  data.nodes.forEach(n => { adj[n.id] = []; });
  data.edges.forEach(e => { adj[e.from]?.push(e.to); adj[e.to]?.push(e.from); });

  const root = data.nodes.find(n => n.id === data.rootId) ?? data.nodes[0];
  pos[root.id] = { x: cx, y: cy };
  angleOf[root.id] = -Math.PI / 2;

  // Ring 1: root's direct neighbours, evenly spaced
  const ring1 = [...new Set(adj[root.id])].filter(id => id !== root.id);
  ring1.forEach((id, i) => {
    const a = -Math.PI / 2 + (i / Math.max(1, ring1.length)) * 2 * Math.PI;
    pos[id] = { x: cx + R[1] * Math.cos(a), y: cy + R[1] * Math.sin(a) };
    angleOf[id] = a;
  });

  // Outer rings: BFS, each child placed in an arc around its parent's angle
  let frontier = ring1;
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

  // traceId drives the hover/select highlight in the graph (responds to hover).
  // The detail panel opens on CLICK only (selectedId), so it never flaps on hover.
  const activeId = selectedId ?? hoveredId;
  const activeNode = selectedId ? data.nodes.find(n => n.id === selectedId) ?? null : null;
  const activeCol = activeNode ? ns(activeNode.type).color : accent;
  const connectedIds = new Set<string>();
  if (activeId) {
    for (const e of data.edges) {
      if (e.from === activeId) connectedIds.add(e.to);
      if (e.to === activeId) connectedIds.add(e.from);
    }
  }

  // Legend shows only the node types present in this graph, in registry order
  const present = new Set(data.nodes.map(n => n.type));
  const legend = Object.entries(NODE_STYLE).filter(([t]) => present.has(t));

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
          <defs>
            <filter id="ng-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {data.edges.map((e, i) => {
            const a = nodes[idx[e.from]], b = nodes[idx[e.to]];
            if (!a || !b) return null;
            const hi = e.from === activeId || e.to === activeId;
            const dim = activeId && !hi;
            const st = es(e.type);
            return (
              <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={st.color} strokeWidth={hi ? 2 : 1.2}
                strokeOpacity={dim ? 0.12 : hi ? 1 : 0.6} strokeDasharray={st.dash} />
            );
          })}

          {nodes.map((n) => {
            const st = ns(n.type);
            const sel = n.id === selectedId, hov = n.id === hoveredId;
            const related = n.id === activeId || connectedIds.has(n.id);
            const dim = activeId && !related;
            const showLabel = hov || sel || related || st.always;
            return (
              <g key={n.id}
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() => setHoveredId(h => (h === n.id ? null : h))}
                onClick={() => setSelectedId(s => (s === n.id ? null : n.id))}
                style={{ cursor: 'pointer', opacity: dim ? 0.4 : 1, transition: 'opacity 0.2s' }}>
                {sel && <circle cx={n.x} cy={n.y} r={st.r + 7} fill="none" stroke={st.color} strokeOpacity={0.5} />}
                <circle cx={n.x} cy={n.y} r={st.r} fill={st.color} fillOpacity={sel || hov ? 1 : 0.88}
                  filter={sel || hov ? 'url(#ng-glow)' : undefined} />
                {showLabel && wrapLabel(n.label).map((line, li) => (
                  <text key={li} x={n.x} y={n.y + st.r + 16 + li * 15} textAnchor="middle"
                    fill={st.always && st.r >= 18 ? '#F0EDE6' : '#8FA797'}
                    fontSize={st.r >= 24 ? 15 : 12.5}
                    fontFamily="var(--font-dm-sans),sans-serif" style={{ pointerEvents: 'none' }}>{line}</text>
                ))}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', flexDirection: 'column', gap: 7, pointerEvents: 'none' }}>
          {legend.map(([t, st]) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: st.color }} />
              <span style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, color: 'var(--constellation)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{st.label}</span>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 16, right: 16, fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, color: 'var(--constellation)', letterSpacing: '0.08em', pointerEvents: 'none' }}>
          hover to trace · click to inspect
        </div>
      </div>

      {/* Detail panel — absolute overlay; slides over the graph so the SVG never resizes/rescales */}
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 268, background: 'linear-gradient(180deg,var(--understory),var(--deep-canopy))', borderLeft: '1px solid var(--hairline)', boxShadow: activeNode ? '-14px 0 36px rgba(0,0,0,0.3)' : 'none', transform: activeNode ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)', overflow: 'hidden' }}>
        {activeNode && (
          <div style={{ width: 268, padding: '28px 22px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
            <button onClick={() => setSelectedId(null)} aria-label="Close" style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'var(--constellation)', fontFamily: 'var(--font-jetbrains),monospace', fontSize: 16, cursor: 'pointer', lineHeight: 1 }}>✕</button>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: activeCol, boxShadow: `0 0 8px ${activeCol}` }} />
              <span style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--constellation)' }}>{ns(activeNode.type).label}</span>
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
                    style={{ display: 'flex', gap: 10, alignItems: 'baseline', padding: '9px 0', cursor: 'pointer', background: 'none', border: 'none', borderTop: '1px solid var(--hairline)', width: '100%', textAlign: 'left' }}>
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
