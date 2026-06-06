import type { GraphData } from '@/components/access/NetworkGraph';

/* Seed argument network for Cameron's HBR white paper.
   Structured around the Toulmin model: thesis → claims → evidence → sources,
   with a counter-argument to test the central position.
   Cameron can drag nodes, click to read notes, and use this as his live outline. */
export const cameronGraph: GraphData = {
  nodes: [
    {
      id: 'thesis',
      type: 'thesis',
      label: 'Structured AI adoption outperforms ad-hoc usage in knowledge work',
      note: 'The central claim. Firms that encode operating discipline into their AI workflows — provenance rules, adversarial review, build logs — produce more defensible output than those using AI as a faster search engine.',
    },
    {
      id: 'claim-output',
      type: 'claim',
      label: 'Discipline multiplies output quality, not just speed',
      note: 'The naive case for AI is velocity. The real case is defensibility: structured workflows eliminate the class of errors (fabricated stats, unsourced claims) that AI generates at speed.',
    },
    {
      id: 'claim-debt',
      type: 'claim',
      label: 'Ad-hoc AI creates knowledge-pipeline debt',
      note: 'When AI output is not provenance-tagged, every downstream use of that output inherits an unknown error rate. The debt compounds — one unverified statistic spawns three cited references.',
    },
    {
      id: 'claim-provenance',
      type: 'claim',
      label: 'Provenance discipline prevents AI-fabricated statistics from shipping',
      note: 'Classifying every number as PUBLISHED, DERIVED, or ANALYST forces the writer to verify before citing. Removes the category of "felt right so I left it in."',
    },
    {
      id: 'ev-mckinsey',
      type: 'evidence',
      label: '70% of AI value comes from process change, not model capability',
      note: 'McKinsey Global Institute finding: the majority of measurable value from enterprise AI deployments traces to workflow redesign, not raw model performance.',
    },
    {
      id: 'ev-stanford',
      type: 'evidence',
      label: 'Output quality degrades without structured prompting discipline',
      note: 'Stanford HAI research on LLM reliability: unconstrained generation produces confident errors at a rate that structured prompting significantly reduces.',
    },
    {
      id: 'ev-fabrication',
      type: 'evidence',
      label: 'LLMs hallucinate citations at high rates in academic contexts',
      note: 'Multiple studies (2023–24) document that LLMs produce plausible-but-nonexistent citations when asked for sources. Rate drops dramatically with explicit verification loops.',
    },
    {
      id: 'source-mgi',
      type: 'source',
      label: 'McKinsey Global Institute, 2024',
    },
    {
      id: 'source-hai',
      type: 'source',
      label: 'Stanford HAI Report, 2024',
    },
    {
      id: 'source-fab',
      type: 'source',
      label: 'Maynez et al. / Hallucination literature review',
    },
    {
      id: 'counter',
      type: 'counter',
      label: 'Generic AI tools are sufficient for most knowledge tasks',
      note: 'The steelman: most knowledge work does not require HBR-level defensibility. For routine memos and summaries, ad-hoc GPT is cost-effective and fast enough.',
    },
  ],
  edges: [
    { from: 'thesis',         to: 'claim-output',    type: 'supports' },
    { from: 'thesis',         to: 'claim-debt',      type: 'supports' },
    { from: 'thesis',         to: 'claim-provenance', type: 'supports' },
    { from: 'claim-output',   to: 'ev-mckinsey',     type: 'cites' },
    { from: 'claim-debt',     to: 'ev-fabrication',  type: 'cites' },
    { from: 'claim-provenance', to: 'ev-stanford',   type: 'cites' },
    { from: 'claim-provenance', to: 'ev-fabrication', type: 'extends' },
    { from: 'ev-mckinsey',    to: 'source-mgi',      type: 'cites' },
    { from: 'ev-stanford',    to: 'source-hai',      type: 'cites' },
    { from: 'ev-fabrication', to: 'source-fab',      type: 'cites' },
    { from: 'counter',        to: 'thesis',          type: 'challenges' },
    { from: 'claim-output',   to: 'counter',         type: 'challenges' },
  ],
};
