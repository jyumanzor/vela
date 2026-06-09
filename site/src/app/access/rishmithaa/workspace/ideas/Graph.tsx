'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { NetworkGraph, type GraphData } from '@/components/access/NetworkGraph';
import { rishmithaaGraph } from '@/data/rishmithaa-graph';

const SLUG = 'rishmithaa';
const ACCENT = '#C87B56';
const NODE_TYPES = ['site', 'page', 'component', 'token', 'content'];

export function RishmithaaGraph() {
  const [data, setData] = useState<GraphData>(rishmithaaGraph);
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    fetch(`/api/access/${SLUG}/graph`, { credentials: 'same-origin' })
      .then(r => r.json())
      .then(res => { if (res.stored) setData(res.graph); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const handleChange = useCallback((next: GraphData) => {
    setData(next);
    setSaveStatus('saving');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fetch(`/api/access/${SLUG}/graph`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(next),
      })
        .then(r => { setSaveStatus(r.ok ? 'saved' : 'error'); })
        .catch(() => setSaveStatus('error'));
    }, 1200);
  }, []);

  if (!loaded) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-jetbrains),monospace', fontSize: 11, color: 'var(--constellation)', letterSpacing: '0.1em' }}>
          Loading atlas...
        </span>
      </div>
    );
  }

  return <NetworkGraph data={data} accent={ACCENT} editable nodeTypes={NODE_TYPES} saveStatus={saveStatus} onChange={handleChange} />;
}
