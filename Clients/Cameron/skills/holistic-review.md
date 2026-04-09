# Holistic Review — Iterative Deliverable Coherence Check

> Every iterative deliverable accumulates drift. This skill catches it before the stakeholder does.

---

## When to Load

- Before declaring "done" on any multi-session deliverable
- After 3+ rounds of edits on the same artifact
- When scope changed mid-stream (consolidations, reorders, additions)
- When switching agents (one agent to another, agent to manual edits, agent to new session)
- On explicit request (`/holistic-review`)

## Auto-Trigger Conditions

A session-end hook should check:
1. Has this session edited a deliverable file 3+ times?
2. Has the deliverable been through 2+ prior sessions (check `_BUILD_LOG.md`)?
3. Did the session involve structural changes (slide deletion, reordering, consolidation)?

If any condition is true, suggest holistic review before closing. Not mandatory, but visible.

---

## The Three Passes

### Pass 1: Brief Fidelity — "Did we deliver what was asked?"

**Inputs:** Re-read ALL of these before scoring:
- Original instructions / brief
- Reference documents (research docs, source materials)
- Stakeholder commentary (emails, chat messages, inline asks from the user)
- Build log entries that changed scope (`_BUILD_LOG.md`)
- Any mid-stream direction changes

**Process:**
1. Extract every discrete ask into a **requirements ledger** — one row per ask
2. Include implicit asks (if the brief says "polished like our training decks," that implies brand compliance)
3. Score each:
   - Delivered — evidence exists in current artifact
   - Partially delivered — present but incomplete or drifted
   - Missing — asked for but not in current artifact
   - Superseded — explicitly replaced by a later direction
   - Added — not in original brief, added during iteration
4. Any missing or partial item becomes an action item

**Anti-pattern:** Don't score against the *first* brief only. Score against the *latest agreed direction*. If a reviewer said "consolidate slides 14+15" that supersedes the original structure.

### Pass 2: Structural Coherence — "Does it flow as one piece?"

**Read the deliverable end-to-end as a naive reader.** Not shape-by-shape — the way the audience will experience it.

Check:
- [ ] **Narrative arc:** Does each section follow logically from the previous? Are there dead-end slides that don't connect forward?
- [ ] **Visual system consistency:** Same fonts, colors, spacing, card styles across ALL sections. No Frankenstein seams where one build style meets another.
- [ ] **Ordering:** After insertions/deletions, is the sequence still optimal? Would a reorder improve the teaching flow?
- [ ] **Transitions:** Do section dividers still make sense? Are there orphaned "transition" slides that now separate nothing?
- [ ] **Numbering/references:** Page numbers sequential? Slide numbers match footer? Cross-references still valid?
- [ ] **Density balance:** Are some slides packed while others are sparse? Redistribute if needed.
- [ ] **Chrome consistency:** Headers, footers, accent lines, title bars — identical treatment on every content slide.

**For decks specifically:**
- [ ] Does the Agenda slide match the actual slide sequence?
- [ ] Do discussion/transition slides still sit in the right place after consolidation?
- [ ] Are "Key Takeaways" or closing slides still accurate after content changes?

**For documents specifically:**
- [ ] Do section headers match the table of contents?
- [ ] Are cross-references (figure numbers, page references) still correct?
- [ ] Is the executive summary still accurate after body changes?

### Pass 3: Stakeholder Simulation — "What will they flag?"

**Depth depends on stakes:**

| Audience | Depth | Time |
|----------|-------|------|
| Internal / draft review | Quick scan | 2-3 min |
| Client-facing / external presentation | Full simulation | 5-10 min |
| Published / permanent record | Full simulation + adversarial | 10-15 min |

**Quick scan checks:**
- [ ] Names spelled correctly (especially stakeholder names)
- [ ] Dates current (not stale from original)
- [ ] Branding compliant (colors, fonts, confidentiality marks)
- [ ] No placeholder text ("TBD", "TODO", "[Last Name]")
- [ ] No embarrassing artifacts (track changes visible, comments showing, draft watermarks)

**Full simulation adds:**
- [ ] Walk through as each known stakeholder — what would they flag? What would the audience question?
- [ ] Check against stakeholder's known preferences (loaded from stakeholder skills if available)
- [ ] Check professional standards for the context (legal presentation, training deck, etc.)
- [ ] Simulate the "first 30 seconds" — what does the audience see when they first open it? Does it inspire confidence?
- [ ] Check for consistency promises — if the agenda says 9 topics, are there 9 topics?

**Adversarial adds:**
- [ ] What's the weakest slide/section? Why?
- [ ] If an opposing expert saw this, what would they attack?
- [ ] Are any claims unsupported? Any data without sources?

---

## Output Format

```markdown
# Holistic Review: [Deliverable Name]
## [Date] | [Reviewer] | Version: [filename or commit]

### Pass 1: Brief Fidelity
| # | Original Ask | Source | Status | Evidence | Action |
|---|-------------|--------|--------|----------|--------|

### Pass 2: Structural Coherence
| Issue | Severity | Location | Fix |
|-------|----------|----------|-----|

### Pass 3: Stakeholder Simulation
| Stakeholder | Likely Flag | Severity | Preemptive Fix |
|-------------|------------|----------|----------------|

### Priority Actions
1. [Highest impact first]
2. ...

### Verdict
[ ] Ready to deliver
[ ] Needs N fixes before delivery
[ ] Needs structural rework
```

---

## Integration Points

### With Build Log
After running a holistic review, append a summary entry to `_BUILD_LOG.md`:
```
## [Date] | Holistic Review
**Reviewed**: [filename]
**Passes**: Brief Fidelity (N issues), Structural Coherence (N issues), Stakeholder Sim (N flags)
**Verdict**: [Ready / Needs fixes / Needs rework]
**Actions taken**: [list]
```

### With Stakeholder Skills
If stakeholder-specific skills exist, load them during Pass 3 to simulate with encoded preferences rather than generic heuristics.

### With Workspace Hygiene
The holistic review should also check: is `_WORKSPACE.md` current? Does it reflect the actual canonical output? Are archive rules being followed?

---

## Common Drift Patterns

These are the failure modes this skill catches:

| Pattern | Example | Pass |
|---------|---------|------|
| **Silent requirement drop** | "Add photos" was asked, photos were attempted but didn't render, nobody checked | Brief Fidelity |
| **Orphaned transition** | Slide 15 was a bridge to slides 16-19; after consolidation, the bridge leads nowhere | Structural Coherence |
| **Frankenstein seam** | Slides 1-13 have navy headers at y=0.00", slides 14-18 have headers at y=0.18" | Structural Coherence |
| **Stale reference** | Agenda says "9 topics" but deck now has 7 after consolidation | Structural Coherence |
| **Visual hierarchy flip** | Lead presenter's bio smaller than supporting presenters after a rebuild | Stakeholder Simulation |
| **Date rot** | Original date wasn't updated everywhere after edits | Brief Fidelity |
| **Scope creep unchecked** | Discussion slides were added but Agenda was never updated to reflect them | Structural Coherence |
| **Credential accuracy** | Bio says "CPA, CBV, CFE" but CV says "CPA, CBV, ABV, CFE" — ABV was dropped | Brief Fidelity |

---

*Origin: A multi-round deck build where six build passes (python-pptx, HTML-to-PPTX, PptxGenJS, short deck, manual edits, Claude edits) accumulated drift that no single session caught. Every rule above is a real gap found in retrospective analysis.*
