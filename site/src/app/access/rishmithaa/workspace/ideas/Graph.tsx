'use client';

import { NetworkGraph } from '@/components/access/NetworkGraph';
import { rishmithaaGraph } from '@/data/rishmithaa-graph';

/* Client-only wrapper so the graph renders as a client island. */
export function RishmithaaGraph() {
  return <NetworkGraph data={rishmithaaGraph} accent="#C87B56" />;
}
