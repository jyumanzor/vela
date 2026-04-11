# Matt's Workspace -- Claude Code Instructions

## Who I Am
Musician and health-conscious builder. Using Claude Code and Codex to build two personal projects.

## Active Projects
- `music-site/` -- Personal site to organize recordings, sessions, and collaborations
- `health-dashboard/` -- Track nutrition, blood work, PT/rehab, and mobility

## Operating Loop
Every non-trivial feature: BUILD -> CHALLENGE -> RESOLVE -> PROMOTE
- BUILD: Write the feature
- CHALLENGE: Review for gaps (use Codex for a second perspective)
- RESOLVE: Fix what the review found
- PROMOTE: Record in _BUILD_LOG.md what was learned

## Skills (Always Loaded)
Read these before starting a build session:
- `skills/operating-loop.md`
- `skills/build-log-protocol.md`
- `skills/workspace-hygiene.md`
- `skills/testifying-expert.md` (for health data claims -- cite sources)
- `skills/cross-model-review.md`
- `skills/plausible-but-wrong-numbers.md`

## Build Log
Maintain `_BUILD_LOG.md` in each project root.
Append after every session. Read before every session.

## Privacy
Health data stays local. Never commit real blood test values, weight, or medical data to a public repo. Use .gitignore for /data/ folders containing personal health information.

## Workspace Structure
```
matt-workspace/
├── CLAUDE.md              <- this file
├── _BUILD_LOG.md          <- global session history
├── skills/                <- portable methodology
├── music-site/            <- seed project 1
│   ├── CLAUDE.md          <- music-specific rules
│   ├── _BUILD_LOG.md
│   └── site/              <- Next.js project (you build this)
└── health-dashboard/      <- seed project 2
    ├── CLAUDE.md          <- health-specific rules
    ├── _BUILD_LOG.md
    └── site/              <- Next.js project (you build this)
```
