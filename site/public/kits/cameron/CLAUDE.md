# White Papers — Claude Code Instructions

## Project Context
Writing white papers for Harvard Business Review submission.
All work must be defensible, cited, and professionally formatted.

## Reference Documents
Store all source materials in `ref-docs/` organized by:
- `ref-docs/papers/` — academic papers, published research
- `ref-docs/data/` — datasets, spreadsheets, raw data
- `ref-docs/notes/` — personal notes, interview transcripts
- `ref-docs/drafts/` — previous drafts and reviewer feedback

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
- `skills/operating-loop.md` — the build→challenge→resolve→promote rhythm
- `skills/testifying-expert.md` — provenance categories, defensibility checks
- `skills/cross-model-review.md` — adversarial review protocols
- `skills/plausible-but-wrong-numbers.md` — catching AI-fabricated statistics
- `skills/ai-data-smoothing.md` — catching AI that interpolates volatile data
- `skills/silent-data-drop.md` — catching data that gets filtered away unnoticed
- `skills/build-log-protocol.md` — cross-session memory
- `skills/workspace-hygiene.md` — folder structure that prevents version confusion

## Before You Submit Checklist
- [ ] Every cited number has a provenance tag (PUBLISHED/DERIVED/ANALYST)
- [ ] Cross-model adversarial review completed on full draft
- [ ] No uncited statistics remain
- [ ] Build log reflects all major revision decisions
- [ ] Reference docs folder is complete and organized
- [ ] PDF export reviewed for formatting quality

## Build Log
Maintain `_BUILD_LOG.md` in the project root.
Append an entry after every significant writing session.
Read it before starting any new session.

## Workspace Structure
```
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
```
