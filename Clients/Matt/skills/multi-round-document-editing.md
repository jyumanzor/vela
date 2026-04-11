# Multi-Round Document Editing

## When to Load

Any work process that involves multiple rounds of edits on the same deliverable — policy docs, reports, decks, templates. Especially when a reviewer returns markup and you need to produce a clean version.

## The Problem

Multi-round editing on documents (especially Word .docx) fails when:
- The agent treats each round as a mechanical patch instead of understanding the editorial direction
- Structural changes (table rewrites, section deletions) get applied via XML surgery instead of holistic rebuild
- Each round introduces new artifacts that require another round to fix
- The agent claims "DONE" without verifying the output actually contains what was promised
- Comments and changelog noise accumulate instead of getting resolved

## Before Starting Any Round

### 1. Read the Full Markup First (Do Not Start Editing)

Read every comment and every tracked change before touching the document. Write a one-paragraph summary answering:
- What kind of document does the reviewer want? (shorter? more operational? different structure?)
- What's the editorial direction, not just the line items?
- What content should be CUT vs what should stay?

### 2. Ask Three Questions Before Touching the Doc

1. **What sections should be cut vs kept?** (Don't preserve content the reviewer clearly wanted removed)
2. **Should structural changes (tables, numbering, annexure reorganization) follow the reviewer's direction or stay as-is?**
3. **What goes in comments vs what gets resolved silently?** (Comments in a deliverable = open items only, never "DONE" notes)

### 3. Decide the Approach BEFORE Starting

| Situation | Right Approach |
|-----------|---------------|
| Text-only changes (rename, rephrase, fix typos) | XML-level edit: unpack, edit, repack (1 round max) |
| Structural changes (table rewrites, section moves, annexure renumbering) | Tell the user what to change in Word, or use Word MCP tool |
| Mixed: some text, some structural | Separate them. Do text changes in XML. Give the user a checklist for structural changes. |
| Reviewer rewrote large sections | Don't try to merge. Build from the reviewer's version as the new base. |

**If it needs more than 2 unpack/repack cycles, the approach is wrong.** Stop. Re-assess.

## During Editing

### The One-Round Rule

Every edit round must:
1. Make ALL planned changes in a single pass
2. Verify every change by grepping the output for expected content
3. Render a visual check (PDF export + page images) before declaring done
4. Never claim a change is "DONE" without evidence it's in the output

### Verification Checklist

Before declaring any round complete:
- [ ] Grep for every piece of content you said you added (signature clause, glossary, etc.)
- [ ] Grep for every piece of content you said you removed (old section titles, duplicate tables)
- [ ] Check table row/column counts match what you intended
- [ ] Render PDF and visually inspect every page
- [ ] Count comments — are there ONLY open items? No "DONE" notes?

### Comment Discipline

| Comment Type | Include? |
|-------------|----------|
| Open decision for someone else (e.g., "OPEN: Needs decision on X") | Yes |
| Action item the user needs to do (e.g., "Add signature clause here") | Yes |
| Resolution note ("Asked X. DONE — implemented in Section Y") | **No** — this is noise |
| Changelog entry ("Changed term A to term B throughout") | **No** — belongs in build log, not doc |

### What NOT to Do

- **Don't add content the user didn't ask for.** A glossary, extra examples, expanded sections — if the reviewer's direction was "make it shorter," don't add material.
- **Don't preserve content just because it wasn't explicitly deleted.** Read the editorial direction. If the reviewer cut similar content elsewhere, the pattern is "cut," not "keep."
- **Don't use 6 rounds when 1 checklist would do.** If the changes are structural (table layouts, section ordering, annexure numbering), a precise Word-editing checklist the user follows manually is faster than XML surgery.

## After Editing

### Output Contract

Every completed round delivers:
1. The edited .docx file(s)
2. A rendered PDF for visual verification
3. A diff summary: what changed, what was verified, what's still open
4. The file opened for the user (`open` command)

### Build Log Entry

Append to `_BUILD_LOG.md`:
- What changed (specific, not vague)
- What was verified (grep results, page counts, visual check)
- What's still open (with owner)
- Lessons learned (what would you do differently?)

## Key Principle

> The agent's highest-value contribution in multi-round document editing is **reading the reviewer's intent and producing a clear action plan** — not being the one who manipulates XML. A 20-minute manual Word edit beats a 3-hour automated pipeline that produces artifacts. Know when to hand the user a checklist instead of a broken .docx.

## Anti-Patterns

| Anti-Pattern | What Happens | Fix |
|-------------|-------------|-----|
| "Accept all tracked changes" on structural edits | Table cells concatenate old+new text | Never accept-all on structural changes. Use reviewer's version as new base. |
| Multiple unpack/repack cycles | Each cycle compounds errors | One round max. If broken, restart from clean base. |
| "DONE" comments in deliverable | Noise. Recipient doesn't need a changelog. | Only open items in comments. Resolution notes go in build log. |
| Preserving content reviewer cut | Doc stays long when reviewer wanted short | Read editorial direction. Cut what the pattern says to cut. |
| Claiming changes without verification | "Added signature clause" but it's not there | Grep the output. Visual check. Evidence before assertions. |
| XML surgery on tables | Merged cells, broken formatting, stale artifacts | Let the user edit tables in Word. Tables are Word's strongest feature and XML's worst. |
