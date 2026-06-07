# Skill: Build Log Protocol

## When to Load
Any project where you (or multiple agents) work on iterative deliverables — drafts, reports, white papers, tools — where version history matters. If you come back to a project after a break and can't tell what happened last session, load this.

## The Problem

Session memory is zero by default. You finish a session, start a new one, and the agent has no idea what was built, what broke, what the canonical output is, or what was learned.

The fix is inline-with-the-work capture: a single append-only file that lives in the project directory, gets written at the end of every build session, and gets read at the start of every new one. No separate pipeline. No external tooling. Just a markdown file the agent already knows how to read and write.

## The _BUILD_LOG.md Template

Every project that qualifies gets this file at the root. Copy this template exactly.

```markdown
# Build Log — {Project Name}

> Append-only. Both agents write. Both agents read before starting.

---

## YYYY-MM-DD | {agent} | {description}
**Built**: What was produced (file names, formats)
**Canonical**: The current canonical output file(s)
**Changed**: What changed from previous version
**Fixed**: What broke and how it was fixed (if applicable)
**Learned**: Durable insight (if any — only write if it would change future behavior)
**Skill candidate**: Yes/No — if this learning should become a shared skill file
```

### Field Rules

**Built** — File names and formats. Be specific. `HBR_Draft_v3.docx` not "the paper." If the session was refactoring or cleanup rather than producing a deliverable, say what was changed and where.

**Canonical** — The single source of truth for the current output. This field is sacred. Anyone reading the log should be able to find the latest deliverable from this field alone. If canonical changed (e.g., file was renamed or moved), say both the old and new path.

**Changed** — Delta from the previous version. Not a restatement of what was built — what is *different*. "Added CPI provenance panel to slide 14" not "Built the deck with CPI info."

**Fixed** — Only if something broke. Include the root cause and the fix, not just the symptom. "pptxgenjs table cells inherited parent fontSize instead of applying per-cell — fixed by setting fontSize explicitly on every cell object" not "fixed font size bug."

**Learned** — Only write this if it would change future behavior. The test: would an agent reading this insight do something different on the next project? If yes, write it. If it's just "this was tricky," skip it.

- Good: "Puppeteer PDF export silently truncates files over ~800 lines. Chunked write strategy required for large HTML decks."
- Bad: "Had some issues with PDF export."
- Good: "pptxgenjs `valign: 'middle'` is ignored on table cells — use explicit y-positioning instead."
- Bad: "Alignment was hard to get right."

**Skill candidate** — Yes only if the learning is portable across projects. A general formatting insight is portable. "This specific paper needs 12 sections" is not.

## Rules

1. **Every build session MUST append an entry before ending.** No exceptions. If you didn't produce anything, log what you investigated and why.
2. **Read the log before starting any work on a project.** The log tells you what's canonical, what's been tried, and what broke. Skipping the read is how you repeat someone else's mistakes.
3. **The "Canonical" field is the contract.** If you change what's canonical (rename, move, replace), update this field. If a reader can't find the current output from the log, the log has failed.
4. **"Learned" must be actionable, not descriptive.** The litmus test: could you turn this into an if/then rule? "If generating pptxgenjs tables, then set fontSize on every cell explicitly" passes. "Had some font issues" does not.
5. **If "Skill candidate: Yes", the next agent extracts it.** Don't let insights die in a build log. The extraction pipeline (below) is how build logs feed the skills library.
6. **Entries are never edited or deleted.** Append corrections as new entries. The log is a timeline, not a living document. If a previous entry was wrong, the correction entry says so explicitly: "Correcting YYYY-MM-DD entry: the canonical file is actually X, not Y."
7. **Agent name must be explicit.** Use "claude" or whatever model name applies — not "AI," "assistant," or "agent." When reviewing the log later, you need to know who did what.
8. **One entry per session, not per file.** If a session produces 5 files, that's one entry with all 5 listed under Built. Don't fragment the timeline.
9. **Stakeholder format preferences belong in the log when they change build behavior.** If you learn that a reviewer consistently needs a certain medium to evaluate work, log it as a durable insight.

## Skill Extraction Pipeline

When an agent reads a build log and sees "Skill candidate: Yes" on a previous entry:

1. Read the learned insight carefully
2. Check if a relevant skill already exists in your skills directory
3. If yes — update the existing skill with the new learning (add a section, extend a checklist, add a failure case)
4. If no — create a new skill file in the skills directory
5. Mark the build log entry as extracted by appending to that entry:
   ```
   **Extracted**: → skills/{category}/{name}.md
   ```

This is the mechanism that turns project-specific pain into cross-project knowledge. Build logs are where insights are born. Skill files are where they live permanently.

## Example Entry

```markdown
## 2026-03-22 | claude | Rebuilt project analysis deck with sourcing panel
**Built**: Clean/Analysis_Deck.pptx (22 slides, 1920x1080)
**Canonical**: Clean/Analysis_Deck.pptx
**Changed**: Added data provenance panel (slide 14), replaced flat table with gradient bar fills, fixed slide 8 legend overlap
**Fixed**: Library table cells ignored parent fontSize — root cause: fontSize must be set per-cell in the options object, not at the cell level. Fixed by setting fontSize explicitly on every cell.
**Learned**: When generating tables programmatically, cell formatting is per-text-run, not per-cell. Always set formatting at the most specific level, not the container level.
**Skill candidate**: Yes — portable to any programmatic document generation
```

## Anti-Patterns

- **Log after the fact from memory.** Write the entry during the session while context is fresh, not as a "oh I should log that" afterthought.
- **Skip the log because "it was a small change."** Small changes are how canonical paths drift silently. If you touched a file, log it.
- **Write a novel.** Each field should be 1-3 lines. If Learned needs a paragraph, it's a skill file, not a log entry.
- **Use the log as a TODO list.** The log records what happened, not what should happen. TODOs go in `_WORKSPACE.md` or the project's CLAUDE.md.
