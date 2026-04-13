export interface SetupStep {
  id: string;
  label: string;
  description: string;
  completed: boolean;
}

export interface ClientProject {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'complete';
  pages: string[];
  pagesComplete: number;
  accentColor: string;
}

export interface Client {
  slug: string;
  name: string;
  domain: string;
  domainLabel: string;
  domainKit: 'writing' | 'frontend' | 'data';
  loadedSkillIds: string[];
  setupSteps: SetupStep[];
  agents: string[];
  projects?: ClientProject[];
}

export const clients: Client[] = [
  {
    slug: 'cameron',
    name: 'Cameron',
    domain: 'white-papers',
    domainLabel: 'White Papers for HBR',
    domainKit: 'writing',
    loadedSkillIds: [
      // Tier 1 (13)
      'operating-loop',
      'build-log-protocol',
      'workspace-hygiene',
      'testifying-expert',
      'operational-inheritance',
      'claude-handoff-notes',
      'holistic-review',
      'testing-ai-output',
      'build-time-enforcement',
      'cross-model-review',
      'plausible-but-wrong-numbers',
      'silent-data-drop',
      'ai-data-smoothing',
      // Tier 2 writing kit
      'multi-round-editing',
      'word-document-review',
    ],
    setupSteps: [
      { id: 'choose-tools', label: 'Choose your tools', description: 'Select Claude Code, Codex, or both', completed: false },
      { id: 'install-claude-code', label: 'Install Claude Code', description: 'Set up Claude Code CLI on your machine', completed: false },
      { id: 'install-codex', label: 'Install Codex', description: 'Set up OpenAI Codex for review tasks', completed: false },
      { id: 'create-workspace', label: 'Create workspace folder', description: 'Organize your project directory', completed: false },
      { id: 'organize-refs', label: 'Organize reference docs', description: 'Place source materials in the right folders', completed: false },
      { id: 'install-claude-md', label: 'Install CLAUDE.md + skills', description: 'Drop your portable rules into the workspace', completed: false },
      { id: 'first-session', label: 'Run first session', description: 'Start Claude Code and verify skills load', completed: false },
    ],
    agents: [
      'citation-checker',
      'daubert-verification',
      'devils-advocate',
      'holistic-reviewer',
      'argument-reviewer',
    ],
    projects: [{
      id: 'white-papers',
      name: 'White Papers for HBR',
      description: 'Write and submit white papers using AI methodology',
      status: 'not-started',
      pages: ['Reference organization', 'First draft', 'Cross-model review', 'Revision cycle', 'Final submission'],
      pagesComplete: 0,
      accentColor: 'var(--star-gold)',
    }],
  },
  {
    slug: 'matt',
    name: 'Matt',
    domain: 'music-health',
    domainLabel: 'Music Site + Health Dashboard',
    domainKit: 'data',
    loadedSkillIds: [
      // Tier 1 (13)
      'operating-loop',
      'build-log-protocol',
      'workspace-hygiene',
      'testifying-expert',
      'operational-inheritance',
      'claude-handoff-notes',
      'holistic-review',
      'testing-ai-output',
      'build-time-enforcement',
      'cross-model-review',
      'plausible-but-wrong-numbers',
      'silent-data-drop',
      'ai-data-smoothing',
      // Tier 2 data kit
      'data-provenance',
      'interactive-visuals',
    ],
    setupSteps: [
      { id: 'choose-tools', label: 'Choose your tools', description: 'Select Claude Code, Codex, or both', completed: false },
      { id: 'install-claude-code', label: 'Install Claude Code', description: 'Set up Claude Code CLI on your machine', completed: false },
      { id: 'install-codex', label: 'Install Codex', description: 'Set up OpenAI Codex for review tasks', completed: false },
      { id: 'create-workspace', label: 'Create workspace folder', description: 'Set up matt-workspace with both seed projects', completed: false },
      { id: 'install-claude-md', label: 'Install CLAUDE.md + skills', description: 'Drop your portable rules into the workspace', completed: false },
      { id: 'scaffold-music', label: 'Scaffold music site', description: 'Create the Next.js project for your music catalog', completed: false },
      { id: 'scaffold-health', label: 'Scaffold health dashboard', description: 'Create the Next.js project for health tracking', completed: false },
      { id: 'first-session', label: 'Run first session', description: 'Start Claude Code and build your first page', completed: false },
    ],
    agents: [
      'holistic-reviewer',
      'argument-reviewer',
      'devils-advocate',
      'citation-checker',
      'daubert-verification',
    ],
    projects: [
      {
        id: 'music-site',
        name: 'Music Site',
        description: 'Organize recordings, sessions, and collaborations',
        status: 'not-started',
        pages: ['Home', 'Recordings list', 'Recording detail', 'Sessions timeline', 'Collaborators'],
        pagesComplete: 0,
        accentColor: 'var(--ember-copper)',
      },
      {
        id: 'health-dashboard',
        name: 'Health Dashboard',
        description: 'Track nutrition, blood work, PT/rehab, and mobility',
        status: 'not-started',
        pages: ['Overview dashboard', 'Nutrition', 'Blood work', 'PT/Rehab', 'Mobility'],
        pagesComplete: 0,
        accentColor: 'var(--lime)',
      },
    ],
  },
];

export function getClient(slug: string): Client | undefined {
  return clients.find((c) => c.slug === slug);
}
