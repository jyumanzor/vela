# Vela — Design Document

> A standalone agent platform for onboarding people to Claude Code with portable Jenn OS methodology.
> Original: 2026-04-02 | Revised: 2026-04-08 (agent layer, tool comparison, explainers, expanded skills)

---

## What Vela Is

An agent platform with a content layer. People Jenn helps get:
1. **Portable methodology** — skills, failure modes, validation patterns extracted from real project failures
2. **Background agents** — run Jenn OS methodology on their work as automated services
3. **Tool guidance** — when to use Claude Code vs Codex vs Cursor, with setup for each
4. **Curated explainers** — evidence and teaching from Jenn's published writing

Not a course. Not docs. A working system that runs methodology on your behalf.

**Audience:** 10-50 curated users. Content must stand alone without 1:1 onboarding.

**First client:** Cameron — writing white papers for Harvard Business Review.

**Framing:** Software 2.0 infrastructure for knowledge workers. Skills are training data. CLAUDE.md is the program. Agents are the runtime. Validation loop is the test suite.

---

## The Three-Tier Rule Separation

### Tier 1 — Universal (every Vela user gets these, 13 skills)

| Rule | Source | Category |
|------|--------|----------|
| Operating Loop | `methodology/operating-loop.md` | Methodology |
| Build Log Protocol | `methodology/build-log-protocol.md` | Methodology |
| Workspace Hygiene | `methodology/workspace-hygiene.md` | Methodology |
| Testifying Expert | `methodology/testifying-expert.md` | Methodology |
| Operational Inheritance | `methodology/operational-inheritance.md` | Methodology |
| Claude Handoff Notes | `methodology/claude-handoff-notes.md` | Methodology |
| Holistic Review | `methodology/holistic-review.md` | Methodology |
| Testing AI Output | `methodology/testing-ai-output.md` | Methodology |
| Build-Time Enforcement (pattern) | `methodology/build-time-enforcement.md` | Methodology |
| Cross-Model Verification | `interlocutor/cross-model-review.md` | Verification |
| Plausible-but-Wrong Numbers | `failure-modes/plausible-but-wrong-numbers.md` | Failure Mode |
| Silent Data Drop | `failure-modes/silent-data-drop.md` | Failure Mode |
| AI Data Smoothing | `failure-modes/ai-data-smoothing.md` | Failure Mode |

### Tier 2 — Domain Kits (loaded per use case)

**Writing Kit** (Cameron, white papers, research):
- Multi-Round Document Editing
- Word Document Review
- Word DOCX Editorial Pipeline
- PDF Export Quality

**Frontend Kit** (web builders):
- All frontend/ skills
- Color & Layout, Design Craft, Spacing Enforcement

**Data Kit** (analysts, pipelines):
- Data Provenance Explorer
- Self-Contained HTML Explorer
- Background Research Deck
- Forbidden String Leak

### Tier 3 — Jenn Only (never ships)
- FTI palette, Selvin's validation, Jenn's voice, chart preferences
- Stakeholder files, Hello Sunshine pipeline, expert report formatting
- Site-specific hooks and paths

---

## Architecture

### Four Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    VELA PLATFORM                             │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐ │
│  │   CONTENT    │  │   AGENTS     │  │    TOOLS          │ │
│  │              │  │              │  │                    │ │
│  │ Rules library│  │ Citation     │  │ Claude Code setup  │ │
│  │ Explainers   │  │ Daubert      │  │ Codex setup        │ │
│  │ Architecture │  │ Devil's Adv  │  │ Cursor setup       │ │
│  │ visuals      │  │ Holistic Rev │  │ Comparison matrix  │ │
│  │ Downloads    │  │ Argument Rev │  │                    │ │
│  └──────────────┘  └──────────────┘  └───────────────────┘ │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              CLIENT SANDBOXES                         │   │
│  │  /cameron  /[future-client]  /[future-client]        │   │
│  │  Dashboard, agents, skills, explainers, downloads     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Rule Flow: Jenn OS → Vela → Client

```
JENN'S MACHINE                  VELA                           CLIENT
┌─────────────────┐            ┌──────────────┐              ┌─────────────────┐
│ ~/skills/ (53)   │            │ Tier 1+2     │              │ Local workspace │
│                  │──export──▶│ (13+ skills) │──download──▶│   CLAUDE.md     │
│ Automation hooks │──extract─▶│ Agent configs│──service───▶│   skills/       │
│ Agent personas   │──deploy──▶│ Background   │──results───▶│   Dashboard     │
│                  │            │ agents       │              │                 │
│ Tier 3 (Jenn)   │            │              │              │                 │
│ STAYS HERE      │            │ Explainers   │              │                 │
│                  │            │ (from site)  │              │                 │
└─────────────────┘            └──────────────┘              └─────────────────┘
```

---

## Site Map

### Global Pages

| Page | Purpose |
|------|---------|
| `/` | Landing — Software 2.0 for knowledge workers. What Vela is, Karpathy-adjacent framing. |
| `/rules` | Browsable rules library — all Tier 1 + Tier 2 skills, filterable by category and domain kit |
| `/tools` | Tool comparison — Claude Code vs Codex vs Cursor. Strengths, weaknesses, when to use each. Context-aware: writers see writing strengths, builders see frontend strengths. |
| `/explainers` | Curated content from Jenn's published writing — evidence and teaching behind the methodology |

### Client Sandbox (`/[client]`)

| Page | Purpose |
|------|---------|
| `/cameron` | Dashboard — progress, active project, loaded rules, recent agent runs |
| `/cameron/setup` | Setup guides — tabbed: Claude Code \| Codex. Full install + config for both. |
| `/cameron/skills` | HIS loaded skills (Tier 1 + his Tier 2 kit), browsable with full content |
| `/cameron/explainers` | Curated subset — only posts relevant to his use case (writing, not frontend) |
| `/cameron/downloads` | Starter kit zip + individual files |
| `/cameron/agents` | Agent launcher — pick an agent, upload work, see results |
| `/cameron/tasks` | Task history — past agent runs with findings |

---

## Background Agents

### Available Agents

| Agent | Persona | Skill Source | Input | Output |
|-------|---------|-------------|-------|--------|
| **Daubert Verification** | Expert witness defense attorney | `agents/daubert-verification-agent.md` | Document with data claims | ADMISSIBLE / INADMISSIBLE / PERJURY RISK per value |
| **Devil's Advocate** | Three personas: opposing counsel, arithmetic auditor, competing firm | devil-advocate plugin | Argument or deliverable | CRITICAL / SIGNIFICANT / MINOR findings + 3 hardest questions |
| **Citation Checker** | Provenance auditor | `testifying-expert.md` | Draft text | Uncited claims flagged, each tagged PUBLISHED / DERIVED / ANALYST |
| **Holistic Reviewer** | Naive reader doing end-to-end coherence check | `holistic-review.md` | Multi-draft deliverable + build log | Brief Fidelity ledger, Structural Coherence gaps, Stakeholder Simulation |
| **Argument Reviewer** | Adversarial second model | `cross-model-review.md` | Argument or analysis | Logical gaps, unsupported claims, weak reasoning |

### Agent Technical Architecture

**MVP: API routes on the Vela site.** Next.js API routes that call the Anthropic API with skill content as system prompt.

```
POST /api/agents/citation-checker
Body: { document: "...", client: "cameron" }

→ Calls Anthropic API with testifying-expert.md as system prompt
→ Returns structured findings as JSON
→ Results stored and shown on /cameron/tasks
```

Each agent is ~50-100 lines of API route code. The skill file IS the agent's brain.

**Future: Claude Agent SDK** for more complex multi-step agents (Daubert requires multiple passes).

---

## Tool Comparison Page

### Claude Code
- **Best at:** Professional writing, research synthesis, long-context reasoning, file management, front-end/design, all-around versatility
- **Setup:** CLI install + CLAUDE.md + skills folder
- **Cameron's use:** Primary tool — writing drafts, organizing refs, build log, adversarial review

### Codex (OpenAI)
- **Best at:** Conceptual review, catching logical bugs/inconsistencies, background tasks, parallel execution
- **Setup:** Separate instructions (Vela provides)
- **Cameron's use:** Secondary — "review my argument for logical gaps while I keep writing in Claude"

### Cursor / VS Code
- **Best at:** IDE-integrated editing, quick inline changes, visual diff
- **Setup:** Extension install
- **Cameron's use:** Optional — if he wants a visual editor for markdown

### Context-Aware Display
Tips shown only when relevant to client's use case:
- Cameron (writing): sees writing strengths, citation patterns, argument review
- Frontend builder: sees design strengths, component generation, CSS debugging
- Data analyst: sees pipeline strengths, data validation, Excel formatting

---

## Explainers — Curated from Jenn's Site

### Why Methodology Matters
- "AI at Work: What the Evidence Actually Shows" — 86% of executives report no measurable impact
- "GPTs are GPTs" — how exposure ≠ dollar impact
- "Building With Agents" — the operating layer compounds, not model tricks

### Validation Patterns
- "Validating AI Output" — 7 principles for catching errors
- "Enforcement Over Knowledge" — 78% of bugs had existing rules
- "Provenance Theater" — when safety labels are made of paper

### Cross-Model Verification
- "Cross-Model Interlocutor" — MCP server for adversarial review
- "A Working Protocol for Claude and Codex" — two-agent shared memory

### Data Quality
- "If a Number Is on the Page, It Needs a Source" — metrics as derived data
- "Tag It, Badge It, Block the Export" — provenance guard system

### System Architecture
- "The CLAUDE.md Hierarchy" — three-tier context system
- "Skills as Loadable Context" — encoded judgment > suggestions
- "The Models Are Interchangeable. The Architecture Isn't." — why Vela exists

### Visual Architecture Breakdowns
Interactive constellation-style diagrams (not walls of text) explaining:
- How a Next.js project is structured
- How the skills → CLAUDE.md → agent pipeline works
- How the operating loop flows in practice

---

## Auto-Features (Extracted from Jenn OS Automation)

| Feature | Jenn OS Source | Vela Form |
|---------|---------------|-----------|
| Pre-commit quality gate | PreToolUse hook + preflight-check.js | Background agent: "Check my work before I finalize" |
| Post-write audit | PostToolUse hook + audit script | Real-time quality checking during sessions |
| Session-end capture | Stop hook + auto-commit | Build log auto-populated when Cameron finishes |
| Session-start context | SessionStart hook + context loader | Dashboard shows "here's where you left off" |
| Holistic review trigger | Auto-detects 3+ edit rounds | Agent suggests: "You've revised this 4 times — want a coherence check?" |

---

## Design System: "Forest at Night"

(Unchanged from original — see palette, typography, constellation motif sections)

### Palette
Forest Floor `#0D1210`, Deep Canopy `#141E18`, Understory `#1E2A22`, Stardust `#263530`, Star Gold `#D4A843`, Nebula Amber `#E8A849`, Ember Copper `#C87B56`, Moonlight `#F0EDE6`, Dusk `#8FA797`, Constellation `#566B5C`, Lime `#E6F163`, Amber `#FFB547`, Meteor Red `#E05252`

### Typography
Instrument Serif (display), DM Sans (body), JetBrains Mono (code/system)

---

## Tech Stack

- **Framework:** Next.js 15+, React 19, TypeScript
- **Hosting:** Vercel, separate project
- **Styling:** Tailwind CSS 4 + CSS variables
- **Agents:** Anthropic API via Next.js API routes (MVP), Claude Agent SDK (future)
- **Data:** Skills as markdown, processed at build time. Agent results stored in JSON/DB.
- **Port:** 3002 (3000 = Jenn's site, 3001 = FTI portal)

---

## Brand Preview

Working prototype: `brand-preview.html`

## Cameron's Starter Kit (Delivered)

Complete at: `clients/cameron/`
- 8 sanitized skill files (needs 5 more from revised Tier 1)
- CLAUDE.md template for white papers
- _BUILD_LOG.md and _WORKSPACE.md templates
- Interactive setup deck HTML (needs Codex section)
- README
