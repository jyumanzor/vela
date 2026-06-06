'use client';

import { NetworkGraph } from '@/components/access/NetworkGraph';
import { cameronGraph } from '@/data/cameron-graph';

/* Client-only wrapper so the canvas never touches SSR.
   The Server Component page renders this as a client island. */
export function CameronGraph() {
  return <NetworkGraph data={cameronGraph} accent="#D4A843" />;
}
