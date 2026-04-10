'use client';

import { ConstellationDivider } from '@/components/ConstellationDivider';

const fj = 'var(--font-jetbrains), monospace';
const fi = 'var(--font-instrument), serif';
const fd = 'var(--font-dm-sans), sans-serif';

// ── Embedded file contents ──

const CLAUDE_MD = `# White Papers — Claude Code Instructions

## Project Context
Writing white papers for Harvard Business Review submission.
All work must be defensible, cited, and professionally formatted.

## Reference Documents
Store all source materials in \`ref-docs/\` organized by:
- \`ref-docs/papers/\` — academic papers, published research
- \`ref-docs/data/\` — datasets, spreadsheets, raw data
- \`ref-docs/notes/\` — personal notes, interview transcripts
- \`ref-docs/drafts/\` — previous drafts and reviewer feedback

## Citation Rules
- Every factual claim MUST have a provenance tag:
  - **PUBLISHED**: Directly from a citable source (paper, dataset, report)
  - **DERIVED**: Calculated from published data (show the math)
  - **ANALYST**: Your judgment call (flag explicitly, defend in text)
- Never let AI generate statistics without verification
- If a number feels right but you can't trace it, flag it

## Operating Loop
Every draft section runs through: BUILD → CHALLENGE → RESOLVE → PROMOTE
- BUILD: Write the section
- CHALLENGE: Run through cross-model verification (adversarial review)
- RESOLVE: Accept, reject, or revise based on challenge findings
- PROMOTE: Record what survived in _BUILD_LOG.md

## Skills (Always Loaded)
Read these before every major writing session:
- \`skills/operating-loop.md\` — the build→challenge→resolve→promote rhythm
- \`skills/testifying-expert.md\` — provenance categories, defensibility checks
- \`skills/cross-model-review.md\` — adversarial review protocols
- \`skills/plausible-but-wrong-numbers.md\` — catching AI-fabricated statistics
- \`skills/ai-data-smoothing.md\` — catching AI that interpolates volatile data
- \`skills/silent-data-drop.md\` — catching data that gets filtered away unnoticed
- \`skills/build-log-protocol.md\` — cross-session memory
- \`skills/workspace-hygiene.md\` — folder structure that prevents version confusion

## Before You Submit Checklist
- [ ] Every cited number has a provenance tag (PUBLISHED/DERIVED/ANALYST)
- [ ] Cross-model adversarial review completed on full draft
- [ ] No uncited statistics remain
- [ ] Build log reflects all major revision decisions
- [ ] Reference docs folder is complete and organized
- [ ] PDF export reviewed for formatting quality

## Build Log
Maintain \`_BUILD_LOG.md\` in the project root.
Append an entry after every significant writing session.
Read it before starting any new session.

## Workspace Structure
\`\`\`
white-papers/
├── CLAUDE.md              ← this file
├── _BUILD_LOG.md          ← session history
├── _WORKSPACE.md          ← canonical files, archive rules
├── skills/                ← portable methodology
├── ref-docs/              ← source materials
│   ├── papers/
│   ├── data/
│   ├── notes/
│   └── drafts/
├── output/                ← current canonical drafts
└── output/_archive/       ← dated previous versions
\`\`\`
`;

const BUILD_LOG_MD = `# Build Log — White Papers

> Append-only. Read before starting. Write before stopping.

---

<!-- Copy this template for each entry:

## YYYY-MM-DD | description
**Built**: What was produced
**Canonical**: Current canonical output file(s)
**Changed**: What changed from previous version
**Learned**: Durable insight (if any)

-->
`;

const WORKSPACE_MD = `# Workspace — White Papers

## Canonical Files
- Current draft: \`output/[paper-name].md\` (or .docx)
- Reference docs: \`ref-docs/\`

## Archive Rules
- Previous drafts: \`output/_archive/[paper-name]_vN_YYYY-MM-DD.md\`
- Never keep multiple "current" versions in \`output/\`
- Lock files (\`~$*\`) — delete on sight

## Naming Convention
- Canonical: \`Paper_Title.md\` (unversioned, always latest)
- Archive: \`Paper_Title_v2_2026-04-15.md\`
`;

const SKILLS_COMBINED = `# Skills Library — White Paper Writing Kit (13 files)

> These are summaries. Full skill files are available in the starter kit download.

---

## 1. Operating Loop
The build→challenge→resolve→promote rhythm. Every draft section runs through this cycle. What survives adversarial review gets promoted to canonical.

## 2. Build Log Protocol
Cross-session memory. Read before starting, write before stopping. Append-only dated entries with what was built, what changed, and what was learned.

## 3. Workspace Hygiene
Folder structure that prevents version confusion. Canonical files, archive rules, naming conventions, cleanup rules for lock files and stale exports.

## 4. Testifying Expert Lens
Three provenance categories (PUBLISHED / DERIVED / ANALYST) for every claim. Cross-examination defense. Treats every factual assertion as if it will be challenged under oath.

## 5. Cross-Model Review
Use a second model as an adversarial reviewer. Model disagreement identifies which inputs need human review. Protocol for structured critique sessions.

## 6. Plausible-but-Wrong Numbers
Catching AI-fabricated statistics. The numbers feel right, pass a smell test, but trace to no source. Verification patterns for every quantitative claim.

## 7. AI Data Smoothing
Catching AI that interpolates volatile data. When real data has spikes and dips, AI tends to smooth them into plausible-looking curves. Detection patterns.

## 8. Silent Data Drop
Records disappear during pipeline processing without any error or warning. The output looks complete but isn't. Row count reconciliation and coverage checks.

## 9. Holistic Review
Iterative deliverable coherence check. Every iterative deliverable accumulates drift. This skill catches inconsistencies before the stakeholder does.

## 10. Operational Inheritance
When a useful structure, workflow, or decision framework should carry forward into your operating system instead of dying inside one project folder.

## 11. Claude Handoff Notes
Structured handoff format for passing context between sessions or agents without losing critical state.

## 12. Testing AI Output
Seven validation principles: proof chains, forbidden strings, oracle validation, count reconciliation, and seam testing.

## 13. Multi-Round Document Editing
Patterns for iterative editing across multiple review rounds without losing track of what changed and why.
`;

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadStarterKit() {
  // Combine all files into one large markdown
  const kit = `# Vela Starter Kit — White Paper Writing

> Download date: ${new Date().toISOString().split('T')[0]}
> This file contains your complete starter kit. Extract each section into its own file.

---

# FILE: CLAUDE.md

${CLAUDE_MD}

---

# FILE: _BUILD_LOG.md

${BUILD_LOG_MD}

---

# FILE: _WORKSPACE.md

${WORKSPACE_MD}

---

# FILE: skills/ (13 files)

${SKILLS_COMBINED}
`;
  downloadFile('vela-starter-kit.md', kit);
}

const downloads = [
  { filename: 'CLAUDE.md', label: 'CLAUDE.md', description: 'Your rules file. Citation requirements, operating loop, failure modes.', content: CLAUDE_MD },
  { filename: '_BUILD_LOG.md', label: '_BUILD_LOG.md', description: 'Session history template. Read before starting, write before stopping.', content: BUILD_LOG_MD },
  { filename: '_WORKSPACE.md', label: '_WORKSPACE.md', description: 'Workspace rules. Canonical files, archive conventions, naming.', content: WORKSPACE_MD },
  { filename: 'skills-library.md', label: 'Skills Library (13 files)', description: 'All 13 portable methodology files for your skills/ folder.', content: SKILLS_COMBINED },
];

export default function ClientDownloadsPage() {
  return (
    <div>
      {/* Header */}
      <p style={{ fontFamily: fj, fontSize: 10, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--constellation)', marginBottom: 12 }}>
        Downloads
      </p>
      <h1 style={{ fontFamily: fi, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: 'var(--moonlight)', lineHeight: 1.15, marginBottom: 12 }}>
        Your starter kit
      </h1>
      <p style={{ fontSize: 15, color: 'var(--dusk)', maxWidth: 520, lineHeight: 1.7, marginBottom: 32 }}>
        Everything you need to get started. Download individually or grab the full kit.
      </p>

      {/* Full Starter Kit CTA */}
      <div
        style={{
          border: '2px solid var(--star-gold)', borderRadius: 14, padding: '28px 32px',
          background: 'var(--deep-canopy)', marginBottom: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
        }}
      >
        <div>
          <h2 style={{ fontFamily: fd, fontSize: 18, fontWeight: 600, color: 'var(--moonlight)', marginBottom: 6 }}>
            Download Starter Kit
          </h2>
          <p style={{ fontSize: 13, color: 'var(--dusk)', lineHeight: 1.6 }}>
            CLAUDE.md + 13 skills + templates — everything in one folder
          </p>
        </div>
        <button
          onClick={downloadStarterKit}
          style={{
            fontFamily: fj, fontSize: 12, fontWeight: 500, letterSpacing: '0.05em',
            padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: 'var(--star-gold)', color: 'var(--forest-floor)',
            transition: 'opacity 0.2s ease', flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          Download All
        </button>
      </div>

      <ConstellationDivider brightIndices={[2, 4]} />

      {/* Individual downloads grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginTop: 28 }}>
        {downloads.map((dl) => (
          <div
            key={dl.filename}
            style={{
              background: 'var(--understory)', border: '1px solid var(--stardust)',
              borderRadius: 12, padding: '20px',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}
          >
            <div>
              <p style={{ fontFamily: fj, fontSize: 13, fontWeight: 500, color: 'var(--moonlight)', marginBottom: 6 }}>
                {dl.label}
              </p>
              <p style={{ fontSize: 13, color: 'var(--dusk)', lineHeight: 1.6 }}>
                {dl.description}
              </p>
            </div>
            <button
              onClick={() => downloadFile(dl.filename, dl.content)}
              style={{
                fontFamily: fj, fontSize: 11, fontWeight: 500, letterSpacing: '0.05em',
                padding: '8px 16px', borderRadius: 6, cursor: 'pointer',
                background: 'transparent', color: 'var(--ember-copper)',
                border: '1px solid var(--ember-copper)',
                transition: 'all 0.2s ease', marginTop: 'auto', alignSelf: 'flex-start',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200, 123, 86, 0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
