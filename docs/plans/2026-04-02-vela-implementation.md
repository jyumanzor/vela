# Vela Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the Vela platform — a standalone site for onboarding people to Claude Code with portable Jenn OS methodology — and deliver Cameron's white paper starter kit as the first client package.

**Architecture:** Two parallel tracks. Track A: Cameron's starter kit (self-contained files, no site dependency — deliverable within days). Track B: Vela Next.js site scaffold with the "Forest at Night" design system, MVP pages, and rule browsing. Track A content becomes Track B's first real data.

**Tech Stack:** Next.js 15+, React 19, TypeScript, Tailwind CSS 4, CSS variables for the Vela palette. Skills content stored as markdown files processed at build time.

---

## Track A: Cameron's Starter Kit

### Task 1: Extract Portable Skills from Jenn OS

**Files:**
- Create: `clients/cameron/skills/operating-loop.md`
- Create: `clients/cameron/skills/build-log-protocol.md`
- Create: `clients/cameron/skills/workspace-hygiene.md`
- Create: `clients/cameron/skills/testifying-expert.md`
- Create: `clients/cameron/skills/cross-model-verification.md`
- Create: `clients/cameron/skills/plausible-but-wrong-numbers.md`
- Create: `clients/cameron/skills/silent-data-drop.md`
- Create: `clients/cameron/skills/ai-data-smoothing.md`
- Create: `scripts/extract-portable-skills.sh`

**Step 1: Write the extraction script**

Script reads each Tier 1 + Cameron Tier 2 skill from `~/Desktop/~Working/skills/`, strips:
- References to Jenn-specific stakeholders (Selvin, Jenn's voice)
- FTI project paths and palette references
- Internal tool references (Codex bridge, specific MCP servers)
- Keeps: the methodology, failure patterns, checklists, examples

```bash
#!/bin/bash
# extract-portable-skills.sh
# Copies Tier 1+2 skills, strips Jenn-specific content
SKILLS_SRC="$HOME/Desktop/~Working/skills"
DEST="clients/cameron/skills"

mkdir -p "$DEST"

# Tier 1 — Universal
TIER1=(
  "methodology/operating-loop.md"
  "methodology/build-log-protocol.md"
  "methodology/workspace-hygiene.md"
  "methodology/testifying-expert.md"
  "interlocutor/cross-model-review.md"
  "failure-modes/plausible-but-wrong-numbers.md"
  "failure-modes/silent-data-drop.md"
  "failure-modes/ai-data-smoothing.md"
)

for skill in "${TIER1[@]}"; do
  basename=$(basename "$skill")
  cp "$SKILLS_SRC/$skill" "$DEST/$basename"
done

echo "Extracted ${#TIER1[@]} skills to $DEST"
echo "Manual review needed: strip Jenn-specific references from each file"
```

**Step 2: Run extraction**

Run: `cd ~/Desktop/~Working/~BUILDS/Exploratory/Vela && bash scripts/extract-portable-skills.sh`
Expected: 8 files in `clients/cameron/skills/`

**Step 3: Manually sanitize each skill**

For each extracted file, remove:
- Codex-specific references (Codex bridge, agent routing table)
- FTI project paths
- Jenn stakeholder references
- Keep all methodology, checklists, failure patterns, examples

**Step 4: Commit**

```bash
git add clients/cameron/skills/ scripts/extract-portable-skills.sh
git commit -m "feat: extract portable Tier 1+2 skills for Cameron"
```

---

### Task 2: Cameron's CLAUDE.md Template

**Files:**
- Create: `clients/cameron/CLAUDE.md`

**Step 1: Write the CLAUDE.md template**

This is the file Cameron copies to his project root. It encodes:
- His domain (white papers for HBR submission)
- Reference doc organization rules
- Citation requirements (every claim needs PUBLISHED/DERIVED/ANALYST tag)
- "Before you submit" checklist
- Failure modes loaded by default
- Build log protocol

```markdown
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

## Failure Modes (Always Loaded)
Read these skills before every major writing session:
- `skills/plausible-but-wrong-numbers.md`
- `skills/ai-data-smoothing.md`
- `skills/silent-data-drop.md`

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
```

**Step 2: Commit**

```bash
git add clients/cameron/CLAUDE.md
git commit -m "feat: add Cameron's CLAUDE.md template for white papers"
```

---

### Task 3: Cameron's Workspace Templates

**Files:**
- Create: `clients/cameron/_BUILD_LOG.md`
- Create: `clients/cameron/_WORKSPACE.md`
- Create: `clients/cameron/README.md`

**Step 1: Write _BUILD_LOG.md template**

```markdown
# Build Log — White Papers

> Append-only. Read before starting. Write before stopping.

---

<!-- Copy this template for each entry:

## YYYY-MM-DD | description
**Built**: What was produced
**Canonical**: Current canonical output file(s)
**Changed**: What changed from previous version
**Learned**: Durable insight (if any)

-->
```

**Step 2: Write _WORKSPACE.md template**

```markdown
# Workspace — White Papers

## Canonical Files
- Current draft: `output/[paper-name].md` (or .docx)
- Reference docs: `ref-docs/`

## Archive Rules
- Previous drafts: `output/_archive/[paper-name]_vN_YYYY-MM-DD.md`
- Never keep multiple "current" versions in `output/`
- Lock files (`~$*`) — delete on sight

## Naming Convention
- Canonical: `Paper_Title.md` (unversioned, always latest)
- Archive: `Paper_Title_v2_2026-04-15.md`
```

**Step 3: Write README**

```markdown
# Cameron's Starter Kit

## What's Inside
- `CLAUDE.md` — Your rules file. Copy to your project root.
- `skills/` — Portable methodology files. Copy to your project.
- `_BUILD_LOG.md` — Session history template. Copy to project root.
- `_WORKSPACE.md` — Workspace rules template. Copy to project root.

## Setup
1. Create your project folder: `mkdir ~/white-papers`
2. Copy everything from this folder into it
3. Organize your reference docs into `ref-docs/`
4. Start Claude Code in your project folder
5. Claude will read CLAUDE.md automatically and follow the rules

## The Skills
These are encoded judgment from real project failures:
- **Operating Loop** — Build → Challenge → Resolve → Promote
- **Build Log Protocol** — Cross-session memory via append-only journal
- **Workspace Hygiene** — Folder structure that prevents version confusion
- **Testifying Expert** — Provenance tagging for defensible claims
- **Cross-Model Verification** — Adversarial review before shipping
- **Plausible-but-Wrong Numbers** — Catching AI-generated fake statistics
- **Silent Data Drop** — Catching data that gets filtered away unnoticed
- **AI Data Smoothing** — Catching AI that interpolates volatile data
```

**Step 4: Commit**

```bash
git add clients/cameron/
git commit -m "feat: complete Cameron's starter kit with templates and README"
```

---

### Task 4: Cameron's Setup Deck (Interactive HTML)

**Files:**
- Create: `clients/cameron/setup-guide.html`

**Step 1: Build the interactive setup deck**

Self-contained HTML (same approach as brand-preview.html) using the Vela "Forest at Night" design system. Walks Cameron through:

1. **Choose Your Environment** — CLI vs Cursor vs Web (with pros/cons for white paper writing)
2. **Create Your Project Folder** — exact terminal commands
3. **Organize Reference Documents** — folder structure with examples
4. **Install Your Rules** — copy CLAUDE.md and skills, explain what each does
5. **Your First Session** — what to expect, how the operating loop works
6. **Before You Submit** — the checklist, cross-model verification walkthrough

Uses the constellation map motif — progress shown as stars lighting up.

Style: Uses Vela CSS variables from brand-preview.html (Forest Floor, Star Gold, Ember Copper palette).

**Step 2: Test in browser**

Run: `open clients/cameron/setup-guide.html`
Verify: All 6 sections render, navigation works, constellation progress updates, copy-paste code blocks work

**Step 3: Commit**

```bash
git add clients/cameron/setup-guide.html
git commit -m "feat: add interactive setup deck for Cameron's onboarding"
```

---

## Track B: Vela Site Scaffold

### Task 5: Initialize Next.js Project

**Files:**
- Create: `site/` — Next.js project root

**Step 1: Scaffold Next.js**

```bash
cd ~/Desktop/~Working/~BUILDS/Exploratory/Vela
npx create-next-app@latest site --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

**Step 2: Configure Tailwind with Vela palette**

Add CSS variables to `site/src/app/globals.css`:

```css
:root {
  --forest-floor: #0D1210;
  --deep-canopy: #141E18;
  --understory: #1E2A22;
  --stardust: #263530;
  --star-gold: #D4A843;
  --nebula-amber: #E8A849;
  --ember-copper: #C87B56;
  --moonlight: #F0EDE6;
  --dusk: #8FA797;
  --constellation: #566B5C;
  --lime: #E6F163;
  --amber-warn: #FFB547;
  --meteor-red: #E05252;
}
```

**Step 3: Add fonts**

Install Instrument Serif, DM Sans, JetBrains Mono via `next/font/google` in layout.tsx.

**Step 4: Set dev port**

Configure for port 3002 (3000 = Jenn's site, 3001 = FTI portal).

**Step 5: Verify dev server**

Run: `cd site && PORT=3002 npm run dev`
Expected: Default Next.js page at localhost:3002 with Vela fonts loading

**Step 6: Commit**

```bash
git add site/
git commit -m "feat: scaffold Vela Next.js site with Forest at Night palette"
```

---

### Task 6: Layout + Navigation

**Files:**
- Modify: `site/src/app/layout.tsx`
- Create: `site/src/components/Nav.tsx`
- Create: `site/src/components/ConstellationDivider.tsx`
- Create: `site/src/components/StarfieldBg.tsx`

**Step 1: Build Nav component**

Matches the nav-preview from brand-preview.html:
- Vela wordmark (Instrument Serif) with gold star dot
- Links: Setup, Rules, Sandbox
- Active state: Star Gold text
- Hover: Moonlight text

**Step 2: Build StarfieldBg component**

Client component that generates twinkling star dots on mount (same algorithm as brand-preview.html JS).

**Step 3: Build ConstellationDivider component**

The dot-and-line section divider pattern from brand-preview.html. Accepts prop for number of dots and which are "bright" (gold).

**Step 4: Wire into layout**

Root layout: dark background (Forest Floor), StarfieldBg behind everything, Nav at top, main content area.

**Step 5: Verify**

Run: `PORT=3002 npm run dev`
Expected: Dark forest background, twinkling stars, nav with Vela wordmark

**Step 6: Commit**

```bash
git commit -m "feat: add Vela layout, nav, starfield, constellation divider"
```

---

### Task 7: Landing Page (`/`)

**Files:**
- Modify: `site/src/app/page.tsx`

**Step 1: Build landing page**

Sections (from brand-preview.html hero + rules preview):
1. **Hero** — Vela wordmark, tagline ("Charted, not guessed"), CTA to `/setup`
2. **What This Is** — 3 value props (Portable Rules, Encoded Judgment, Your Own Constellation)
3. **How It Works** — 3-step overview (Get your starter kit → Set up your workspace → Build with methodology)
4. **Rule Preview** — 4 sample rule cards showing operating loop, plausible-wrong-numbers, cross-model verification, build log protocol

**Step 2: Verify**

Check: hero renders, CTA links to /setup, rule cards display, constellation dividers between sections

**Step 3: Commit**

```bash
git commit -m "feat: add Vela landing page with hero, value props, rule preview"
```

---

### Task 8: Rules Library Page (`/rules`)

**Files:**
- Create: `site/src/app/rules/page.tsx`
- Create: `site/src/data/portable-rules.ts`
- Create: `site/src/components/RuleCard.tsx`

**Step 1: Create portable rules data**

TypeScript file with all Tier 1 + Tier 2 rules structured as:

```typescript
interface PortableRule {
  id: string;
  name: string;
  category: 'methodology' | 'failure-mode' | 'verification';
  tier: 1 | 2;
  summary: string;        // 2-3 sentences
  content: string;        // full rule content (markdown)
  useCases: string[];     // which domain kits include this
}
```

**Step 2: Build RuleCard component**

Matches rule-card from brand-preview.html — header with title + category tag, body with summary. Click to expand full content.

**Step 3: Build rules page**

Filter by category (methodology / failure-mode / verification). Show all Tier 1 by default. Tier 2 rules show which domain kits they belong to.

**Step 4: Verify**

Check: all rules render, filter works, expand/collapse works, tags color-coded correctly

**Step 5: Commit**

```bash
git commit -m "feat: add browsable rules library with category filtering"
```

---

### Task 9: Setup Guide Page (`/setup`)

**Files:**
- Create: `site/src/app/setup/page.tsx`
- Create: `site/src/components/ConstellationMap.tsx`
- Create: `site/src/components/SetupStep.tsx`

**Step 1: Build ConstellationMap component**

SVG component showing setup steps as stars with dependency lines (from brand-preview.html). Steps light up gold when completed. Accepts completion state as props.

**Step 2: Build SetupStep component**

Each step rendered as a card (matching ui-card from brand-preview.html):
- Step number with gold dot
- Title + description
- Checklist with checkable items
- Code blocks for terminal commands

**Step 3: Build setup page**

Constellation map at top, steps below. Steps:
1. Choose Your Environment
2. Create Your Project Folder
3. Organize Reference Documents
4. Write Your CLAUDE.md
5. Load Your Skills
6. Start Your Build Log
7. Run Your First Session

Each step includes a "Download" button for the relevant template file.

**Step 4: Verify**

Check: map renders, steps display, checklists interactive, download buttons work

**Step 5: Commit**

```bash
git commit -m "feat: add interactive setup guide with constellation map"
```

---

### Task 10: Sandbox Page (`/sandbox`)

**Files:**
- Create: `site/src/app/sandbox/page.tsx`

**Step 1: Build sandbox page**

Minimal MVP — a text area where users can paste their CLAUDE.md, see it syntax-highlighted, and get feedback on:
- Whether required sections are present (reference docs, citation rules, failure modes, operating loop, build log)
- Missing sections flagged with Meteor Red
- Complete sections flagged with Lime

No AI execution — just structural validation of the CLAUDE.md format.

**Step 2: Verify**

Check: paste a CLAUDE.md, see highlighted sections, missing sections flagged

**Step 3: Commit**

```bash
git commit -m "feat: add CLAUDE.md sandbox with structural validation"
```

---

### Task 11: Deploy to Vercel

**Files:**
- Create: `site/.claude/launch.json`

**Step 1: Configure launch.json**

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "vela-dev",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 3002
    }
  ]
}
```

**Step 2: Deploy**

```bash
cd site
npx vercel --prod --yes
```

Configure: separate Vercel project (NOT ldr-hub, NOT jenn's site). Project name: `vela`.

**Step 3: Verify production**

Check deployed URL loads, all pages render, fonts load.

**Step 4: Commit**

```bash
git commit -m "feat: deploy Vela to Vercel"
```

---

## Execution Order

**Can run in parallel:**
- Track A (Tasks 1-4): Cameron's starter kit
- Track B Tasks 5-6: Site scaffold + layout

**Sequential after scaffold:**
- Task 7 (Landing) → Task 8 (Rules) → Task 9 (Setup) → Task 10 (Sandbox) → Task 11 (Deploy)

**Recommended approach:** Dispatch Track A and Track B scaffold in parallel. Cameron gets his kit fast. Site catches up.
