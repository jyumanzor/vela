# Vela Site Implementation Plan (Revised)

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the Vela platform — a standalone Next.js site with browsable rules, tool comparison, client sandboxes, background agents, and curated explainers from Jenn's published writing.

**Architecture:** Next.js 15+ App Router, Tailwind CSS 4, Anthropic API for agents. Client sandboxes are dynamic route segments (`/[client]/*`). Agent results via API routes. Explainers curated from Jenn's site posts.

**Tech Stack:** Next.js 15+, React 19, TypeScript, Tailwind CSS 4, Anthropic SDK (`@anthropic-ai/sdk`), CSS variables for Forest at Night palette. Port 3002.

---

## Phase 1: Foundation (Site scaffold + global pages)

### Task 1: Scaffold Next.js + Design System

**Files:**
- Create: `site/` (Next.js project root)
- Modify: `site/src/app/globals.css` (Vela palette)
- Modify: `site/src/app/layout.tsx` (fonts, dark bg, metadata)
- Create: `site/.claude/launch.json`

**Steps:**
1. `npx create-next-app@latest site --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm`
2. Add Vela CSS variables to globals.css (all 13 palette colors)
3. Configure fonts via `next/font/google`: Instrument Serif, DM Sans, JetBrains Mono
4. Set body background to Forest Floor, default text to Moonlight
5. Create launch.json for port 3002
6. Verify: `cd site && PORT=3002 npm run dev`

### Task 2: Global Layout + Components

**Files:**
- Modify: `site/src/app/layout.tsx`
- Create: `site/src/components/Nav.tsx`
- Create: `site/src/components/StarfieldBg.tsx`
- Create: `site/src/components/ConstellationDivider.tsx`
- Create: `site/src/components/Footer.tsx`

**Steps:**
1. Nav: Vela wordmark (Instrument Serif) + gold star dot. Links: Rules, Tools, Explainers. Client link if client context exists.
2. StarfieldBg: client component, generates twinkling gold dots on mount.
3. ConstellationDivider: dot-and-line pattern, configurable bright dots.
4. Footer: VELA + "Charted, not guessed." tagline.
5. Layout: StarfieldBg behind everything, Nav at top, `<main>` with padding.

### Task 3: Landing Page (`/`)

**Files:**
- Modify: `site/src/app/page.tsx`

**Sections:**
1. Hero: Vela wordmark, tagline "Portable rules. Background agents. Your own constellation." CTA → /rules
2. Three value props: Methodology (skills that prevent failure), Agents (run methodology on your work), Tools (right tool for each task)
3. How It Works: Get starter kit → Set up workspace → Agents check your work
4. Rule preview: 4 sample rule cards (operating loop, plausible-wrong-numbers, cross-model, build log)
5. "Software 2.0 for knowledge workers" framing section

---

## Phase 2: Content Layer (Rules, Tools, Explainers)

### Task 4: Rules Data + Library Page (`/rules`)

**Files:**
- Create: `site/src/data/portable-rules.ts`
- Create: `site/src/app/rules/page.tsx`
- Create: `site/src/components/RuleCard.tsx`

**Steps:**
1. Create TypeScript data file with all 13 Tier 1 rules + Tier 2 domain kits. Each rule:
   ```typescript
   interface PortableRule {
     id: string;
     name: string;
     category: 'methodology' | 'failure-mode' | 'verification';
     tier: 1 | 2;
     domainKit?: 'writing' | 'frontend' | 'data';
     summary: string;
     content: string; // full sanitized content
     applicableTo: string[]; // use cases
   }
   ```
2. RuleCard component: header + category tag + summary. Click to expand full content.
3. Rules page: filter by category (methodology / failure-mode / verification) and domain kit. Pill filters at top.

### Task 5: Tool Comparison Page (`/tools`)

**Files:**
- Create: `site/src/app/tools/page.tsx`
- Create: `site/src/data/tools.ts`

**Steps:**
1. Tool data with strengths, weaknesses, use cases per audience:
   - Claude Code: writing strengths for writers, frontend strengths for builders
   - Codex: review strengths for writers, background task strengths for builders
   - Cursor: IDE strengths for all
2. Comparison grid with cards (matching brand-preview.html style).
3. "When to use" decision tree — interactive: answer 2-3 questions, get recommendation.
4. Setup links: Claude Code → /[client]/setup, Codex → /[client]/setup

### Task 6: Explainers Page (`/explainers`)

**Files:**
- Create: `site/src/app/explainers/page.tsx`
- Create: `site/src/data/explainers.ts`

**Steps:**
1. Explainer data — curated posts from Jenn's site, organized by category:
   - Why Methodology Matters (3 posts)
   - Validation Patterns (3 posts)
   - Cross-Model Verification (2 posts)
   - Data Quality (2 posts)
   - System Architecture (3 posts)
2. Each explainer: title, one-line summary, category tag, link to jennumanzor.com source
3. Page: filterable grid. Category pills at top.
4. Visual architecture breakdowns as inline SVG diagrams (operating loop flow, skills→CLAUDE.md pipeline)

---

## Phase 3: Client Sandbox

### Task 7: Client Sandbox Layout (`/[client]`)

**Files:**
- Create: `site/src/app/[client]/layout.tsx`
- Create: `site/src/app/[client]/page.tsx` (dashboard)
- Create: `site/src/data/clients.ts`

**Steps:**
1. Client data file — initially just Cameron:
   ```typescript
   interface Client {
     slug: string;
     name: string;
     domain: string; // "white-papers"
     domainKit: 'writing' | 'frontend' | 'data';
     skills: string[]; // loaded skill IDs
     setupComplete: boolean;
   }
   ```
2. Client layout: adds sidebar nav (Setup, Skills, Explainers, Downloads, Agents, Tasks)
3. Dashboard: progress overview, loaded skills count, recent agent runs, quick links

### Task 8: Client Setup Page (`/[client]/setup`)

**Files:**
- Create: `site/src/app/[client]/setup/page.tsx`

**Steps:**
1. Tabbed setup: Claude Code | Codex tabs
2. Content adapted from setup-guide.html — same sections but rendered as React components
3. Progress tracking with constellation map
4. Download buttons for starter kit files (same Blob download pattern)

### Task 9: Client Skills Page (`/[client]/skills`)

**Files:**
- Create: `site/src/app/[client]/skills/page.tsx`

**Steps:**
1. Shows only skills loaded for this client (filtered from portable-rules.ts)
2. Same RuleCard component as /rules but filtered to client's tier 1 + tier 2 kit
3. "Why you have this" context per skill (e.g., "Loaded because you're writing white papers")

### Task 10: Client Explainers Page (`/[client]/explainers`)

**Files:**
- Create: `site/src/app/[client]/explainers/page.tsx`

**Steps:**
1. Filtered to client's domain — Cameron sees writing/research/citation posts, NOT frontend posts
2. Same explainer cards as /explainers but curated subset

### Task 11: Client Downloads Page (`/[client]/downloads`)

**Files:**
- Create: `site/src/app/[client]/downloads/page.tsx`

**Steps:**
1. Starter kit zip download (all files bundled)
2. Individual file downloads: CLAUDE.md, skills, templates
3. Each file shows preview of contents before download
4. "What's inside" explanation panel

---

## Phase 4: Agent Layer

### Task 12: Agent Infrastructure

**Files:**
- Create: `site/src/app/api/agents/[agentId]/route.ts`
- Create: `site/src/lib/agents.ts` (agent registry + runner)
- Create: `site/src/data/agents.ts` (agent definitions)

**Steps:**
1. Agent registry — defines available agents:
   ```typescript
   interface AgentDefinition {
     id: string;
     name: string;
     persona: string;
     skillSource: string; // skill file content embedded
     inputType: 'document' | 'argument' | 'data';
     outputFormat: 'findings' | 'verdicts' | 'checklist';
   }
   ```
2. Generic API route that accepts `{ agentId, document, client }`, loads the agent's skill as system prompt, calls Anthropic API, returns structured findings.
3. Result storage — JSON files per client in `site/src/data/agent-results/[client]/`

### Task 13: Citation Checker Agent (First Agent)

**Files:**
- Modify: `site/src/data/agents.ts` (add definition)
- Create: `site/src/data/agent-skills/citation-checker.md` (system prompt)

**Steps:**
1. System prompt based on testifying-expert.md — scans document for factual claims, tags each as PUBLISHED/DERIVED/ANALYST/UNCITED.
2. Test with a sample document — verify structured output.
3. Wire into API route.

### Task 14: Daubert Verification Agent

**Files:**
- Create: `site/src/data/agent-skills/daubert-verification.md`

**Steps:**
1. System prompt from sanitized daubert-verification-agent.md
2. Four-test admissibility check: methodology, peer review, error rate, standards
3. Returns ADMISSIBLE / INADMISSIBLE / PERJURY RISK per claim

### Task 15: Additional Agents (Devil's Advocate, Holistic Reviewer, Argument Reviewer)

**Files:**
- Create: `site/src/data/agent-skills/devils-advocate.md`
- Create: `site/src/data/agent-skills/holistic-reviewer.md`
- Create: `site/src/data/agent-skills/argument-reviewer.md`

### Task 16: Agent Launcher UI (`/[client]/agents`)

**Files:**
- Create: `site/src/app/[client]/agents/page.tsx`
- Create: `site/src/components/AgentCard.tsx`
- Create: `site/src/components/AgentRunner.tsx`

**Steps:**
1. Agent cards — one per available agent, shows name, persona, what it does
2. AgentRunner — upload area (paste text or upload .md/.txt), agent selector, "Run" button
3. Loading state with constellation animation
4. Results display — structured findings with severity tags

### Task 17: Task History UI (`/[client]/tasks`)

**Files:**
- Create: `site/src/app/[client]/tasks/page.tsx`

**Steps:**
1. List of past agent runs — agent name, date, summary, status
2. Click to expand full findings
3. Filter by agent type

---

## Phase 5: Ship

### Task 18: Deploy to Vercel

**Steps:**
1. `cd site && npx vercel --prod --yes`
2. Configure as new project `vela` (NOT ldr-hub, NOT jenn-site)
3. Verify all pages render, agents work, downloads function
4. Set up environment variable for ANTHROPIC_API_KEY

---

## Execution Order

**Phase 1 (foundation):** Tasks 1-3 — sequential
**Phase 2 (content):** Tasks 4-6 — can parallelize 4+5, then 6
**Phase 3 (sandbox):** Tasks 7-11 — sequential (7 first, then 8-11 can parallelize)
**Phase 4 (agents):** Tasks 12-17 — 12 first, then 13-15 parallel, then 16-17
**Phase 5 (ship):** Task 18

**Estimated task count:** 18 tasks across 5 phases
**Critical path:** Tasks 1 → 2 → 3 → 4 → 7 → 12 → 16 → 18
