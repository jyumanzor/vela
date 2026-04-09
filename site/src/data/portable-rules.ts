export interface PortableRule {
  id: string;
  name: string;
  category: 'methodology' | 'failure-mode' | 'verification';
  tier: 1 | 2;
  domainKit?: 'writing' | 'frontend' | 'data';
  summary: string;
  keyPrinciple: string;
  checklist?: string[];
  applicableTo: string[];
}

export const portableRules: PortableRule[] = [
  // ── Tier 1: Universal Rules ──

  {
    id: 'operating-loop',
    name: 'Operating Loop',
    category: 'methodology',
    tier: 1,
    summary:
      'Every non-trivial deliverable runs through five steps: Route, Build, Challenge, Resolve, Promote. The builder declares an output contract before starting, a second model challenges the output, findings are resolved with explicit verdicts, and durable lessons get promoted into the skills library.',
    keyPrinciple: 'Nothing ships unchallenged. Build it, attack it, preserve what survived.',
    checklist: [
      'Decide if the deliverable needs challenge (numbers, methodology choices, stakeholder scrutiny)',
      'Declare an output contract before building (what, verify, assumptions, not in scope)',
      'Run the appropriate challenge protocol (adversarial, parallel, acceptance criteria)',
      'Record a resolve log with ACCEPTED / REJECTED / UNRESOLVED for every finding',
      'Promote durable lessons to skills or build log',
    ],
    applicableTo: ['white-papers', 'data-pipelines', 'web-apps', 'presentations', 'analysis'],
  },

  {
    id: 'build-log-protocol',
    name: 'Build Log Protocol',
    category: 'methodology',
    tier: 1,
    summary:
      'Cross-session memory via an append-only journal. One file per project, read before starting, written before stopping. Entries record what was built, what is canonical, what changed, what broke, and what was learned. Insights tagged as skill candidates get extracted into the shared skills library.',
    keyPrinciple: 'Session memory is zero by default. The build log is the fix.',
    checklist: [
      'Create _BUILD_LOG.md at the project root',
      'Read the log before starting any work',
      'Append an entry before ending every session',
      'Keep the Canonical field accurate — it is the contract',
      'Mark actionable learnings as skill candidates for extraction',
      'Never edit or delete existing entries — append corrections as new entries',
    ],
    applicableTo: ['white-papers', 'data-pipelines', 'web-apps', 'presentations', 'analysis'],
  },

  {
    id: 'workspace-hygiene',
    name: 'Workspace Hygiene',
    category: 'methodology',
    tier: 1,
    summary:
      'Folder structure rules that prevent version confusion. One canonical file in the output folder, everything else archived with date suffixes. Lock files deleted on sight, dependencies consolidated, and a _WORKSPACE.md file that maps what is where. If you open a project and cannot tell what is canonical within 5 seconds, this rule applies.',
    keyPrinciple:
      'If you cannot find the current output from the workspace file, the workspace has failed.',
    checklist: [
      'Maintain _WORKSPACE.md with a Canonical Outputs table',
      'One canonical file per deliverable — unversioned, always the latest',
      'Archive previous versions in _archive/ with date suffixes',
      'Delete lock files (~$*) immediately on sight',
      'Consolidate duplicate node_modules/ or document the reason for separation',
      'Clean the workspace before building, not after',
    ],
    applicableTo: ['white-papers', 'data-pipelines', 'web-apps', 'presentations'],
  },

  {
    id: 'testifying-expert',
    name: 'Testifying Expert',
    category: 'methodology',
    tier: 1,
    summary:
      'Every number in an analysis falls into one of three provenance categories: PUBLISHED (from a peer-reviewed source), DERIVED (inferred with a visible reasoning chain), or ANALYST (a modeling choice with no direct source). Label them explicitly. For every ANALYST choice, prepare answers to cross-examination questions: why this number and not another, what changes if you are wrong, and what published evidence supports it.',
    keyPrinciple:
      'If you cannot defend a number on the stand, you cannot put it in the deliverable.',
    checklist: [
      'Tag every number as PUBLISHED, DERIVED, or ANALYST',
      'Include citation (author, year, finding) for PUBLISHED values',
      'Show the derivation chain for DERIVED values',
      'Prepare sensitivity analysis for ANALYST assumptions',
      'Answer: why this number, what if wrong, what evidence, who validated, what would a competitor do',
      'Never present DERIVED numbers as PUBLISHED',
    ],
    applicableTo: ['white-papers', 'analysis', 'data-pipelines', 'presentations'],
  },

  {
    id: 'operational-inheritance',
    name: 'Operational Inheritance',
    category: 'methodology',
    tier: 1,
    summary:
      'The practice of promoting reusable patterns from individual projects into the shared system so future work inherits the improvement by default. Uses a five-rung promotion ladder: project layer, shared skill, operating rules, architecture docs, public teaching. A pattern that dies in a project folder is a pattern that gets rediscovered painfully.',
    keyPrinciple:
      'Do not leave durable structure trapped in the artifact that happened to produce it.',
    checklist: [
      'Name the pattern and define when it applies',
      'Choose the right promotion layer (project, skill, operating rule, architecture, public)',
      'Write it to the canonical file or skill path',
      'Add a trigger or hook that surfaces it automatically',
      'Log the promotion in the build log',
    ],
    applicableTo: ['white-papers', 'data-pipelines', 'web-apps', 'analysis'],
  },

  {
    id: 'claude-handoff-notes',
    name: 'Claude Handoff Notes',
    category: 'methodology',
    tier: 1,
    summary:
      'A structured project-local file that lets an agent answer three questions fast: what to build, what facts are non-negotiable, and how to structure the output. Covers objective, canonical inputs, verified facts vs open questions, sensitivity rules, and a ready-to-send prompt block. Prevents the agent from rediscovering context by guessing through a pile of artifacts.',
    keyPrinciple:
      'If the agent is building, do not hand off chaos. Hand off a brief.',
    checklist: [
      'Write a claude-handoff-notes.md at the project root',
      'State objective in one sentence',
      'List canonical inputs with absolute paths',
      'Separate verified facts from open questions',
      'Define what information to present and in what order',
      'Include sensitivity rules (what not to show)',
      'End with a ready-to-send prompt block',
    ],
    applicableTo: ['web-apps', 'presentations', 'white-papers', 'analysis'],
  },

  {
    id: 'holistic-review',
    name: 'Holistic Review',
    category: 'methodology',
    tier: 1,
    summary:
      'A three-pass drift detection protocol for iterative deliverables. Pass 1 checks brief fidelity (did we deliver what was asked). Pass 2 checks structural coherence (does it flow as one piece, no Frankenstein seams). Pass 3 simulates stakeholder reaction (what will they flag). Auto-triggers after 3+ edit rounds or structural changes like slide deletions and reorders.',
    keyPrinciple:
      'Every iterative deliverable accumulates drift. Catch it before the stakeholder does.',
    checklist: [
      'Run after 3+ rounds of edits on the same artifact',
      'Pass 1: Extract a requirements ledger, score each ask as Delivered / Partial / Missing / Superseded',
      'Pass 2: Read end-to-end as a naive reader, check narrative arc, visual consistency, numbering',
      'Pass 3: Simulate each stakeholder — what would they flag?',
      'Record verdict: Ready / Needs fixes / Needs structural rework',
      'Log the review in _BUILD_LOG.md',
    ],
    applicableTo: ['white-papers', 'presentations', 'web-apps'],
  },

  {
    id: 'testing-ai-output',
    name: 'Testing AI Output',
    category: 'methodology',
    tier: 1,
    summary:
      'Seven testing principles from PolicyEngine: test requirements not implementation, validate every pipeline handoff, tag test priority (critical/important/suggestion), scan for forbidden strings, validate against an external oracle, run a CI-fixer loop, and build reusable test utilities. Structure the test suite as a logical proof: each claim backed by exhaustive tests, all claims simultaneously true when the suite passes.',
    keyPrinciple:
      'When code is AI-generated, testing is not nice-to-have. It is the only proof the code is correct.',
    checklist: [
      'Define forbidden strings that must never appear in output',
      'Define an external oracle to validate against (roster, sitemap, API schema)',
      'Define 3-6 specific guarantees the system makes',
      'Write critical tests first (security, confidentiality)',
      'Test handoffs between stages, not internal implementation',
      'Tag every test as critical, important, or suggestion',
      'Keep total test runtime under 5 seconds',
    ],
    applicableTo: ['data-pipelines', 'web-apps', 'analysis'],
  },

  {
    id: 'build-time-enforcement',
    name: 'Build-Time Enforcement',
    category: 'methodology',
    tier: 1,
    summary:
      'The bottleneck is enforcement, not knowledge. 78% of defects in production had an existing rule that should have caught them. When a defect recurs despite a documented rule, the fix is not writing another rule — it is adding a script check that blocks the build. Pre-commit hooks, CI gates, and lint rules turn knowledge into guardrails.',
    keyPrinciple:
      '78% of defects had existing rules. Enforcement beats knowledge every time.',
    checklist: [
      'Audit recurring defects — does a rule already exist for each one?',
      'For every rule that gets violated twice, add an automated check',
      'Use pre-commit hooks for fast local enforcement (color leaks, forbidden strings, dead refs)',
      'Use CI gates for slower validations (build integrity, test suite, deploy checks)',
      'Log what the hook caught in build log entries',
      'Never rely solely on documentation to prevent defects',
    ],
    applicableTo: ['web-apps', 'data-pipelines', 'white-papers'],
  },

  {
    id: 'cross-model-review',
    name: 'Cross-Model Review',
    category: 'verification',
    tier: 1,
    summary:
      'Use a second model as an adversarial reviewer to catch blind spots the primary model cannot see in its own output. Three protocols: adversarial review (one builds, another critiques), parallel generation (both produce independently, diff the outputs), and acceptance criteria generation (second model writes the tests, primary model builds to pass them). When models converge, confidence goes up. When they diverge, you have found the interesting part.',
    keyPrinciple:
      'A single model validating its own output is a writer proofreading their own essay.',
    checklist: [
      'Choose protocol: adversarial (claims/logic), parallel (classification), or acceptance criteria (pipelines)',
      'For adversarial: paste output to second model with explicit critique prompt',
      'For parallel: compare outputs side by side, investigate disagreements',
      'For acceptance criteria: second model writes tests, primary model builds to pass them',
      'Agreement >90% = robust. 70-90% = investigate. <70% = methodology underspecified',
    ],
    applicableTo: ['white-papers', 'analysis', 'data-pipelines', 'web-apps'],
  },

  {
    id: 'plausible-but-wrong-numbers',
    name: 'Plausible-but-Wrong Numbers',
    category: 'failure-mode',
    tier: 1,
    summary:
      'Numbers stated with confidence that feel correct but were never verified against the actual source. They survive review because they do not trigger skepticism — they are in the right ballpark, use the right units, and fit the narrative. AI models generate these from training data averages. Writers round, misremember, or conflate similar statistics. Reviewers skip verification when a number confirms their priors.',
    keyPrinciple:
      'If you cannot name the author, year, and publication, the number is suspect.',
    checklist: [
      'Every stat card must cite a source in its sub-label (author, year)',
      'Cross-model check: ask a second model to verify specific claims as a domain expert',
      'Check the unit — is this a multiplier, percentage, or percentage point?',
      'Verify against the actual paper, not an abstract or secondary summary',
      'Watch for additive fallacies in survey data',
      'Run a factual audit across ALL claims before publishing, not just uncertain ones',
    ],
    applicableTo: ['white-papers', 'analysis', 'presentations', 'data-pipelines'],
  },

  {
    id: 'silent-data-drop',
    name: 'Silent Data Drop',
    category: 'failure-mode',
    tier: 1,
    summary:
      'Records disappear during pipeline processing without any error, warning, or explicit accounting. The output looks complete but is missing data. Drops compound through pipeline stages — if Stage 1 drops 3 records and Stage 2 drops 2 more, the final output is missing 5 records with no audit trail. For stakeholders who validate by counting, a single missing record destroys confidence in every number downstream.',
    keyPrinciple:
      'Coverage must be 100% or gaps must be named. No middle ground.',
    checklist: [
      'Every pipeline step logs input count, output count, and dropped count',
      'Dropped records listed by identifier with the reason for each drop',
      'Coverage below 100% triggers a WARNING, not a silent pass',
      'Final validation verifies total count against the source',
      'Filter criteria documented explicitly',
      'Validation script runs after every pipeline execution',
    ],
    applicableTo: ['data-pipelines', 'analysis'],
  },

  {
    id: 'ai-data-smoothing',
    name: 'AI Data Smoothing',
    category: 'failure-mode',
    tier: 1,
    summary:
      'AI generates data that looks professional but is fabricated — interpolating between known endpoints, rounding to clean numbers, eliminating real-world volatility, and tagging rows with source names despite having no API access. Ten hallucination vectors: silent smoothing, round number fabrication, source attribution without access, anchor extrapolation, unit confusion, temporal misattribution, category conflation, proxy substitution, backfill imputation, and composite Frankenstein data.',
    keyPrinciple:
      'AI must never generate, estimate, interpolate, or fabricate data values. Period.',
    checklist: [
      'Every number traces to an API response (DIRECT), human entry (VERIFIED), or visible formula (COMPUTED)',
      'Run round-number detector: flag if >50% of values end in clean 100Ks',
      'Run monotonic-trend detector: flag if >90% of changes go one direction',
      'Run volatility check: flag if coefficient of variation is suspiciously low',
      'Verify cited source actually has a machine-readable API',
      'Check anchor years against published values — if anchor is wrong, everything is wrong',
      'Leave cells empty rather than filling with estimates',
    ],
    applicableTo: ['data-pipelines', 'analysis', 'presentations'],
  },

  // ── Tier 2: Domain Kit Examples ──

  {
    id: 'multi-round-editing',
    name: 'Multi-Round Editing',
    category: 'methodology',
    tier: 2,
    domainKit: 'writing',
    summary:
      'Rules for iterative document editing that prevent artifact accumulation. Read all markup before starting. Decide the approach before touching the file: text-only changes via XML edit, structural changes via Word, mixed changes separated into two tracks. Every edit round makes all planned changes in a single pass, verifies by grepping the output, and renders a visual check before declaring done.',
    keyPrinciple:
      'If it needs more than 2 unpack/repack cycles, the approach is wrong. Stop and re-assess.',
    checklist: [
      'Read full markup before starting — summarize the editorial direction',
      'Decide approach: XML edit, Word MCP, or user checklist',
      'One-round rule: all changes in a single pass',
      'Grep the output for every change you claimed to make',
      'Only open items in document comments — no DONE notes, no changelog entries',
      'Render PDF and visually inspect before declaring complete',
    ],
    applicableTo: ['white-papers', 'presentations'],
  },

  {
    id: 'word-document-review',
    name: 'Word Document Review',
    category: 'methodology',
    tier: 2,
    domainKit: 'writing',
    summary:
      'Structured review protocol for Word documents that separates content review from structural review. Content review checks factual accuracy, editorial direction compliance, and comment discipline. Structural review checks formatting layers (paragraph styles, character styles, numbering infrastructure) because Word has five layers where font settings can conflict. Tables should be edited in Word, not via XML surgery.',
    keyPrinciple:
      'Tables are Word\'s strongest feature and XML\'s worst. Know when to hand the user a checklist instead of a broken .docx.',
    checklist: [
      'Review content against the reviewer\'s editorial direction, not just individual comments',
      'Check all five font layers: lvlOverride, abstractNum rPr, Char style, paragraph style, basedOn',
      'Never accept-all tracked changes on structural edits',
      'Use the reviewer\'s version as the new base for large rewrites',
      'Verify table row/column counts match intent',
      'Comments contain only open items, never resolution notes',
    ],
    applicableTo: ['white-papers'],
  },
];
