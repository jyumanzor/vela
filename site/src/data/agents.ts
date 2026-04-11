export interface AgentDefinition {
  id: string;
  name: string;
  description: string;
  persona: string;
  inputLabel: string;
  inputPlaceholder: string;
  outputFormat: 'findings' | 'verdicts' | 'checklist';
  categoryColor: string;
}

export const agents: AgentDefinition[] = [
  {
    id: 'citation-checker',
    name: 'Citation Checker',
    description:
      'Scans your draft for uncited claims and tags each as PUBLISHED, DERIVED, ANALYST, or UNCITED.',
    persona: 'Provenance auditor',
    inputLabel: 'Your draft text',
    inputPlaceholder: 'Paste your draft or a section of it here...',
    outputFormat: 'findings',
    categoryColor: 'var(--star-gold)',
  },
  {
    id: 'daubert-verification',
    name: 'Daubert Verification',
    description:
      'Tests every data claim against 4 admissibility criteria. Verdicts: ADMISSIBLE, INADMISSIBLE, or PERJURY RISK.',
    persona: 'Expert witness defense attorney',
    inputLabel: 'Your document with data claims',
    inputPlaceholder:
      'Paste text containing statistics, figures, or data claims...',
    outputFormat: 'verdicts',
    categoryColor: 'var(--meteor-red)',
  },
  {
    id: 'devils-advocate',
    name: "Devil's Advocate",
    description:
      'Three adversarial personas attack your work: opposing counsel, arithmetic auditor, competing firm.',
    persona: 'Adversarial reviewer',
    inputLabel: 'Your argument or deliverable',
    inputPlaceholder: 'Paste your argument, analysis, or deliverable text...',
    outputFormat: 'findings',
    categoryColor: 'var(--ember-copper)',
  },
  {
    id: 'holistic-reviewer',
    name: 'Holistic Reviewer',
    description:
      'Three-pass coherence check: brief fidelity, structural coherence, and stakeholder simulation.',
    persona: 'Naive reader doing end-to-end review',
    inputLabel: 'Your multi-draft deliverable',
    inputPlaceholder:
      'Paste your current draft. For best results, include build log notes about what changed across revisions...',
    outputFormat: 'checklist',
    categoryColor: 'var(--nebula-amber)',
  },
  {
    id: 'argument-reviewer',
    name: 'Argument Reviewer',
    description:
      'Adversarial review focused on logical gaps, unsupported claims, and weak reasoning.',
    persona: 'Skeptical peer reviewer',
    inputLabel: 'Your argument or thesis',
    inputPlaceholder:
      'Paste your argument, thesis section, or analytical framework...',
    outputFormat: 'findings',
    categoryColor: 'var(--lime)',
  },
];

export function getAgent(id: string): AgentDefinition | undefined {
  return agents.find((a) => a.id === id);
}
