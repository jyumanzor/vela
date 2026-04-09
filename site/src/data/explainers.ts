export interface Explainer {
  id: string;
  title: string;
  summary: string;
  category: 'why-methodology' | 'validation' | 'cross-model' | 'data-quality' | 'system-architecture';
  categoryLabel: string;
  source: 'musings' | 'building';
  url: string;
  relevantTo: ('writing' | 'frontend' | 'data' | 'all')[];
}

export const categoryLabels: Record<Explainer['category'], string> = {
  'why-methodology': 'Why Methodology Matters',
  'validation': 'Validation Patterns',
  'cross-model': 'Cross-Model Verification',
  'data-quality': 'Data Quality',
  'system-architecture': 'System Architecture',
};

export const explainers: Explainer[] = [
  // ─── Why Methodology Matters ───
  {
    id: 'ai-at-work',
    title: 'AI at Work: What the Evidence Actually Shows',
    summary: '86% of executives report no measurable productivity impact from AI. Examines the gap between adoption and evidence from coding, customer service, and real case studies.',
    category: 'why-methodology',
    categoryLabel: 'Why Methodology Matters',
    source: 'musings',
    url: 'https://jennumanzor.com/musings/ai-at-work',
    relevantTo: ['all'],
  },
  {
    id: 'gpts-are-gpts',
    title: 'GPTs are GPTs: What the Foundational AI Exposure Paper Actually Shows',
    summary: 'Dissects Eloundou et al.\'s Science paper on AI exposure. Shows how the chain from task exposure to actual dollar impact breaks when applied to specific companies.',
    category: 'why-methodology',
    categoryLabel: 'Why Methodology Matters',
    source: 'musings',
    url: 'https://jennumanzor.com/musings/gpts-are-gpts',
    relevantTo: ['all'],
  },
  {
    id: 'building-with-agents',
    title: 'Building With Agents',
    summary: 'What compounds when building with Claude and Codex isn\'t model tricks but the local operating layer — skill files, project memory, validation lanes.',
    category: 'why-methodology',
    categoryLabel: 'Why Methodology Matters',
    source: 'musings',
    url: 'https://jennumanzor.com/musings/building-with-agents',
    relevantTo: ['all'],
  },

  // ─── Validation Patterns ───
  {
    id: 'validating-ai-output',
    title: 'Validating AI Output',
    summary: 'Seven validation principles: proof chains, forbidden strings, oracle validation, count reconciliation, and seam testing. Catches errors before deliverables ship.',
    category: 'validation',
    categoryLabel: 'Validation Patterns',
    source: 'building',
    url: 'https://jennumanzor.com/building/validating-ai-output',
    relevantTo: ['all'],
  },
  {
    id: 'enforcement-over-knowledge',
    title: 'Enforcement Over Knowledge',
    summary: '78% of bugs shipped despite existing rules. Solution: three-layer enforcement system where rules become scripts that run automatically.',
    category: 'validation',
    categoryLabel: 'Validation Patterns',
    source: 'building',
    url: 'https://jennumanzor.com/building/verification-system',
    relevantTo: ['all'],
  },
  {
    id: 'provenance-theater',
    title: 'Provenance Theater: When the Safety Net Is Made of Paper',
    summary: 'Six data explorers had provenance labels and validators but shipped fabricated data. The difference between infrastructure for rigor and actual verification.',
    category: 'validation',
    categoryLabel: 'Validation Patterns',
    source: 'building',
    url: 'https://jennumanzor.com/building/provenance-theater',
    relevantTo: ['data', 'all'],
  },

  // ─── Cross-Model Verification ───
  {
    id: 'cross-model-interlocutor',
    title: 'Cross-Model Interlocutor',
    summary: 'Built an MCP server letting Claude ask ChatGPT to critique work. Model disagreement identifies which inputs need human review.',
    category: 'cross-model',
    categoryLabel: 'Cross-Model Verification',
    source: 'building',
    url: 'https://jennumanzor.com/building/chatgpt-interlocutor',
    relevantTo: ['all'],
  },
  {
    id: 'two-agent-protocol',
    title: 'A Working Protocol for Claude and Codex',
    summary: 'Shared skills library, build logs, workspace contracts, and skill promotion so multiple agents inherit each other\'s judgment.',
    category: 'cross-model',
    categoryLabel: 'Cross-Model Verification',
    source: 'building',
    url: 'https://jennumanzor.com/building/two-agent-protocol',
    relevantTo: ['all'],
  },

  // ─── Data Quality ───
  {
    id: 'metrics-need-sources',
    title: 'If a Number Is on the Page, It Needs a Source',
    summary: 'Portfolio metrics drifted across pages. Fixed by treating metrics as derived data with generators, shared imports, and audit surfaces.',
    category: 'data-quality',
    categoryLabel: 'Data Quality',
    source: 'building',
    url: 'https://jennumanzor.com/building/metrics-need-sources',
    relevantTo: ['data', 'writing'],
  },
  {
    id: 'data-provenance-guards',
    title: 'Tag It, Badge It, Block the Export',
    summary: 'Three-part system: tag data at ingest with provenance mode, show colored badges in UI, block exports of unverified data.',
    category: 'data-quality',
    categoryLabel: 'Data Quality',
    source: 'building',
    url: 'https://jennumanzor.com/building/data-provenance-guards',
    relevantTo: ['data', 'writing'],
  },

  // ─── System Architecture ───
  {
    id: 'claude-md-hierarchy',
    title: 'The CLAUDE.md Hierarchy',
    summary: 'Three-tier context system (global, project, session). Concrete hex codes and spacing values work better than philosophy for improving first-pass quality.',
    category: 'system-architecture',
    categoryLabel: 'System Architecture',
    source: 'building',
    url: 'https://jennumanzor.com/building/claude-md-hierarchy',
    relevantTo: ['all'],
  },
  {
    id: 'skills-system',
    title: 'Skills as Loadable Context',
    summary: 'Write down what went wrong and load it into every future build. Skills are stronger than suggestions because they change what gets built.',
    category: 'system-architecture',
    categoryLabel: 'System Architecture',
    source: 'building',
    url: 'https://jennumanzor.com/building/skills-system',
    relevantTo: ['all'],
  },
  {
    id: 'multi-model-architecture',
    title: 'The Models Are Interchangeable. The Architecture Isn\'t.',
    summary: 'Multi-model tools treat cross-model as a feature. The better pattern treats it as a constraint where the competitive advantage is skills and validation, not which model.',
    category: 'system-architecture',
    categoryLabel: 'System Architecture',
    source: 'musings',
    url: 'https://jennumanzor.com/musings/multi-model-architecture',
    relevantTo: ['all'],
  },
];
