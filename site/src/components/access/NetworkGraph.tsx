'use client';

import { useMemo, useState, useCallback } from 'react';

/* ── Types (taxonomy is data-driven, not hardcoded) ───────────── */
export interface GraphNode { id: string; label: string; type: string; note?: string; }
export interface GraphEdge { from: string; to: string; type: string; }
export interface GraphData { rootId: string; nodes: GraphNode[]; edges: GraphEdge[]; }

interface NodeStyle { color: string; r: number; label: string; always?: boolean; }
interface EdgeStyle { color: string; dash?: string; }

const NODE_STYLE: Record<string, NodeStyle> = {
  thesis:    { color: '#D4A843', r: 26, label: 'Thesis', always: true },
  claim:     { color: '#C8D4A8', r: 18, label: 'Claim', always: true },
  evidence:  { color: '#8FA797', r: 13, label: 'Evidence' },
  source:    { color: '#566B5C', r: 11, label: 'Source' },
  counter:   { color: '#C87B56', r: 15, label: 'Counter', always: true },
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

/* ── Deterministic radial layout via BFS from the root ───────── */
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
  if (!root) return [];
  pos[root.id] = { x: cx, y: cy };
  angleOf[root.id] = -Math.PI / 2;

  const ring1 = [...new Set(adj[root.id])].filter(id => id !== root.id);
  ring1.forEach((id, i) => {
    const a = -Math.PI / 2 + (i / Math.max(1, ring1.length)) * 2 * Math.PI;
    pos[id] = { x: cx + R[1] * Math.cos(a), y: cy + R[1] * Math.sin(a) };
    angleOf[id] = a;
  });

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

/* ── Shared inline styles for edit controls ───────────────────── */
const inputBase: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid var(--hairline-strong)',
  borderRadius: 8, padding: '8px 10px', color: 'var(--moonlight)',
  fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, width: '100%',
  outline: 'none', boxSizing: 'border-box',
};
const btnSmall: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)', border: '1px solid var(--hairline-strong)',
  borderRadius: 6, padding: '5px 12px', color: 'var(--dusk)', cursor: 'pointer',
  fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
};
const btnPrimary: React.CSSProperties = {
  ...btnSmall, background: 'rgba(200,212,168,0.18)', borderColor: 'rgba(200,212,168,0.3)',
  color: '#C8D4A8',
};
const btnDanger: React.CSSProperties = {
  ...btnSmall, background: 'rgba(200,123,86,0.15)', borderColor: 'rgba(200,123,86,0.3)',
  color: '#C87B56',
};

/* ── Component ───────────────────────────────────────────────── */
interface Props {
  data: GraphData;
  accent?: string;
  editable?: boolean;
  nodeTypes?: string[];
  saveStatus?: 'idle' | 'saving' | 'saved' | 'error';
  onChange?: (data: GraphData) => void;
}

export function NetworkGraph({ data, accent = '#D4A843', editable, nodeTypes, saveStatus, onChange }: Props) {
  const nodes = useMemo(() => computeLayout(data), [data]);
  const idx: Record<string, number> = {};
  nodes.forEach((n, i) => { idx[n.id] = i; });

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Edit-mode state
  const [showAdd, setShowAdd] = useState(false);
  const [editFields, setEditFields] = useState<{ label: string; note: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [addEdgeTarget, setAddEdgeTarget] = useState('');
  const [addEdgeType, setAddEdgeType] = useState('');
  const [showAddEdge, setShowAddEdge] = useState(false);

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

  const present = new Set(data.nodes.map(n => n.type));
  const legend = Object.entries(NODE_STYLE).filter(([t]) => present.has(t));
  const edgeTypeKeys = useMemo(() => {
    const s = new Set(data.edges.map(e => e.type));
    Object.keys(EDGE_STYLE).forEach(t => s.add(t));
    return [...s];
  }, [data.edges]);

  /* ── Mutations ─────────────────────────────────────────────── */
  const emit = useCallback((d: GraphData) => { onChange?.(d); }, [onChange]);

  const handleAddNode = useCallback((type: string, label: string, note: string, parentId: string, edgeType: string) => {
    const id = `n-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newNode: GraphNode = { id, type, label, ...(note ? { note } : {}) };
    const newEdges = parentId ? [...data.edges, { from: parentId, to: id, type: edgeType || edgeTypeKeys[0] || 'contains' }] : [...data.edges];
    emit({ ...data, nodes: [...data.nodes, newNode], edges: newEdges });
    setShowAdd(false);
    setSelectedId(id);
  }, [data, emit, edgeTypeKeys]);

  const handleUpdateNode = useCallback(() => {
    if (!selectedId || !editFields) return;
    const newNodes = data.nodes.map(n =>
      n.id === selectedId ? { ...n, label: editFields.label, note: editFields.note || undefined } : n
    );
    emit({ ...data, nodes: newNodes });
    setEditFields(null);
  }, [data, selectedId, editFields, emit]);

  const handleDeleteNode = useCallback(() => {
    if (!selectedId) return;
    const newNodes = data.nodes.filter(n => n.id !== selectedId);
    const newEdges = data.edges.filter(e => e.from !== selectedId && e.to !== selectedId);
    const rootId = data.rootId === selectedId ? (newNodes[0]?.id ?? '') : data.rootId;
    emit({ rootId, nodes: newNodes, edges: newEdges });
    setSelectedId(null);
    setConfirmDelete(false);
  }, [data, selectedId, emit]);

  const handleAddEdge = useCallback(() => {
    if (!selectedId || !addEdgeTarget || selectedId === addEdgeTarget) return;
    const dup = data.edges.some(e =>
      (e.from === selectedId && e.to === addEdgeTarget) || (e.from === addEdgeTarget && e.to === selectedId)
    );
    if (dup) return;
    emit({ ...data, edges: [...data.edges, { from: selectedId, to: addEdgeTarget, type: addEdgeType || edgeTypeKeys[0] || 'contains' }] });
    setShowAddEdge(false);
    setAddEdgeTarget('');
    setAddEdgeType('');
  }, [data, selectedId, addEdgeTarget, addEdgeType, edgeTypeKeys, emit]);

  const handleRemoveEdge = useCallback((from: string, to: string, type: string) => {
    emit({ ...data, edges: data.edges.filter(e => !(e.from === from && e.to === to && e.type === type)) });
  }, [data, emit]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(s => {
      const next = s === id ? null : id;
      setEditFields(null);
      setConfirmDelete(false);
      setShowAddEdge(false);
      return next;
    });
  }, []);

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      {/* SVG graph */}
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
                onClick={() => handleSelect(n.id)}
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

      {/* ── Edit toolbar ───────────────────────────────────────── */}
      {editable && (
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => { setShowAdd(s => !s); setSelectedId(null); }} style={{ ...btnPrimary, fontSize: 11, padding: '6px 14px' }}>
            + Add node
          </button>
          {saveStatus === 'saving' && <span style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, color: 'var(--constellation)' }}>saving...</span>}
          {saveStatus === 'saved' && <span style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, color: '#8FA797' }}>saved</span>}
          {saveStatus === 'error' && <span style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, color: '#C87B56' }}>save failed</span>}
        </div>
      )}

      {/* ── Add-node form ──────────────────────────────────────── */}
      {editable && showAdd && (
        <AddNodeForm
          types={(nodeTypes ?? [...present]).map(t => [t, ns(t)] as [string, NodeStyle])}
          nodes={data.nodes}
          edgeTypes={edgeTypeKeys}
          onAdd={handleAddNode}
          onCancel={() => setShowAdd(false)}
        />
      )}

      {/* ── Detail panel (overlay) ─────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 268,
        background: 'linear-gradient(180deg,var(--understory),var(--deep-canopy))',
        borderLeft: '1px solid var(--hairline)',
        boxShadow: activeNode ? '-14px 0 36px rgba(0,0,0,0.3)' : 'none',
        transform: activeNode ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
        overflow: 'hidden',
      }}>
        {activeNode && (
          <div style={{ width: 268, padding: '28px 22px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
            <button onClick={() => { setSelectedId(null); setEditFields(null); }} aria-label="Close"
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'var(--constellation)', fontFamily: 'var(--font-jetbrains),monospace', fontSize: 16, cursor: 'pointer', lineHeight: 1 }}>
              ✕
            </button>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: activeCol, boxShadow: `0 0 8px ${activeCol}` }} />
              <span style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--constellation)' }}>{ns(activeNode.type).label}</span>
            </div>

            {/* Label + Note: static or edit mode */}
            {editFields ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                <input value={editFields.label} onChange={e => setEditFields(f => f ? { ...f, label: e.target.value } : f)}
                  style={{ ...inputBase, fontFamily: 'var(--font-instrument),serif', fontSize: 18 }} />
                <textarea value={editFields.note} onChange={e => setEditFields(f => f ? { ...f, note: e.target.value } : f)}
                  rows={4} style={{ ...inputBase, resize: 'vertical' }} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={handleUpdateNode} style={btnPrimary}>Save</button>
                  <button onClick={() => setEditFields(null)} style={btnSmall}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <p style={{ fontFamily: 'var(--font-instrument),serif', fontSize: 21, lineHeight: 1.2, color: 'var(--moonlight)', margin: '0 0 14px' }}>{activeNode.label}</p>
                {activeNode.note && <p style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13.5, lineHeight: 1.65, color: 'var(--dusk)', margin: 0 }}>{activeNode.note}</p>}
              </>
            )}

            {/* Connections */}
            <div style={{ marginTop: 22 }}>
              <p style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--constellation)', margin: '0 0 10px' }}>Connections</p>
              {data.edges.filter(e => e.from === activeNode.id || e.to === activeNode.id).map(e => {
                const otherId = e.from === activeNode.id ? e.to : e.from;
                const other = data.nodes.find(n => n.id === otherId);
                if (!other) return null;
                return (
                  <div key={otherId + e.type} style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid var(--hairline)' }}>
                    <button onClick={() => handleSelect(otherId)}
                      style={{ display: 'flex', gap: 10, alignItems: 'baseline', padding: '9px 0', cursor: 'pointer', background: 'none', border: 'none', flex: 1, textAlign: 'left' }}>
                      <span style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, color: 'var(--dusk)', flexShrink: 0 }}>{e.from === activeNode.id ? '→' : '←'} {e.type}</span>
                      <span style={{ fontFamily: 'var(--font-dm-sans),sans-serif', fontSize: 13, color: 'var(--dusk)', lineHeight: 1.4 }}>{other.label}</span>
                    </button>
                    {editable && (
                      <button onClick={() => handleRemoveEdge(e.from, e.to, e.type)}
                        style={{ background: 'none', border: 'none', color: 'var(--constellation)', cursor: 'pointer', padding: '4px 6px', fontSize: 12, opacity: 0.6 }}
                        title="Remove connection">
                        ✕
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Add connection */}
              {editable && !showAddEdge && (
                <button onClick={() => { setShowAddEdge(true); setAddEdgeTarget(''); setAddEdgeType(edgeTypeKeys[0] || 'contains'); }}
                  style={{ ...btnSmall, marginTop: 10, width: '100%', textAlign: 'center' }}>
                  + Connection
                </button>
              )}
              {editable && showAddEdge && (
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <select value={addEdgeTarget} onChange={e => setAddEdgeTarget(e.target.value)}
                    style={{ ...inputBase, fontSize: 12 }}>
                    <option value="">Select node...</option>
                    {data.nodes.filter(n => n.id !== selectedId && !connectedIds.has(n.id)).map(n => (
                      <option key={n.id} value={n.id}>{n.label}</option>
                    ))}
                  </select>
                  <select value={addEdgeType} onChange={e => setAddEdgeType(e.target.value)}
                    style={{ ...inputBase, fontSize: 12 }}>
                    {edgeTypeKeys.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={handleAddEdge} disabled={!addEdgeTarget} style={{ ...btnPrimary, opacity: addEdgeTarget ? 1 : 0.4 }}>Add</button>
                    <button onClick={() => setShowAddEdge(false)} style={btnSmall}>Cancel</button>
                  </div>
                </div>
              )}
            </div>

            {/* Edit / Delete actions */}
            {editable && !editFields && (
              <div style={{ marginTop: 24, borderTop: '1px solid var(--hairline)', paddingTop: 16, display: 'flex', gap: 8 }}>
                <button onClick={() => setEditFields({ label: activeNode.label, note: activeNode.note ?? '' })} style={btnSmall}>
                  Edit
                </button>
                {activeNode.id !== data.rootId && (
                  confirmDelete ? (
                    <button onClick={handleDeleteNode} style={btnDanger}>Confirm delete</button>
                  ) : (
                    <button onClick={() => setConfirmDelete(true)} style={{ ...btnSmall, color: '#C87B56' }}>Delete</button>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Add-node form ───────────────────────────────────────────── */
function AddNodeForm({ types, nodes, edgeTypes, onAdd, onCancel }: {
  types: [string, NodeStyle][];
  nodes: GraphNode[];
  edgeTypes: string[];
  onAdd: (type: string, label: string, note: string, parentId: string, edgeType: string) => void;
  onCancel: () => void;
}) {
  const [type, setType] = useState(types[0]?.[0] ?? '');
  const [label, setLabel] = useState('');
  const [note, setNote] = useState('');
  const [parentId, setParentId] = useState(nodes[0]?.id ?? '');
  const [edgeType, setEdgeType] = useState(edgeTypes[0] ?? 'contains');

  return (
    <div style={{
      position: 'absolute', top: 48, left: 12, width: 260,
      background: 'linear-gradient(180deg,var(--understory),var(--deep-canopy))',
      border: '1px solid var(--hairline-strong)', borderRadius: 14,
      padding: '20px 18px', boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
      zIndex: 10,
    }}>
      <p style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--constellation)', margin: '0 0 14px' }}>
        New node
      </p>

      {/* Type selector */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {types.map(([key, st]) => (
          <button key={key} onClick={() => setType(key)} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '4px 10px', borderRadius: 999,
            background: type === key ? 'rgba(255,255,255,0.1)' : 'transparent',
            border: type === key ? `1px solid ${st.color}` : '1px solid var(--hairline)',
            cursor: 'pointer', color: type === key ? st.color : 'var(--dusk)',
            fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10,
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: st.color }} />
            {st.label}
          </button>
        ))}
      </div>

      <input placeholder="Label" value={label} onChange={e => setLabel(e.target.value)}
        style={{ ...inputBase, marginBottom: 8 }} autoFocus />
      <textarea placeholder="Note (optional)" value={note} onChange={e => setNote(e.target.value)}
        rows={2} style={{ ...inputBase, marginBottom: 10, resize: 'vertical' }} />

      {/* Connect to */}
      <p style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 10, color: 'var(--constellation)', margin: '0 0 6px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Connect to
      </p>
      <select value={parentId} onChange={e => setParentId(e.target.value)}
        style={{ ...inputBase, fontSize: 12, marginBottom: 6 }}>
        <option value="">None (orphan)</option>
        {nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
      </select>
      {parentId && (
        <select value={edgeType} onChange={e => setEdgeType(e.target.value)}
          style={{ ...inputBase, fontSize: 12, marginBottom: 10 }}>
          {edgeTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => { if (label.trim()) onAdd(type, label.trim(), note.trim(), parentId, edgeType); }}
          disabled={!label.trim()} style={{ ...btnPrimary, opacity: label.trim() ? 1 : 0.4 }}>
          Add
        </button>
        <button onClick={onCancel} style={btnSmall}>Cancel</button>
      </div>
    </div>
  );
}
