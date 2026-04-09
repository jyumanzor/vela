# Operating Loop — Builder → Challenger → Memory

> The best pattern is: make something, attack it, preserve what survived.
> This skill formalizes the loop so any agent runs the same operating rhythm.

---

## The Loop

```
ROUTE → BUILD → CHALLENGE → RESOLVE → PROMOTE
  ↑                                       |
  └───────────────────────────────────────┘
```

Every non-trivial deliverable runs through all five steps. Trivial work (typo fixes, config changes, single-line edits) skips to BUILD and ships.

---

## Step 1: ROUTE

Before touching code or content, decide three things:

### Who builds?

| Signal | Builder | Why |
|--------|---------|-----|
| Research, analysis, multi-file work, skill writing | Primary agent (e.g., Claude Code) | Best at context-heavy, cross-file reasoning |
| Quick implementation, bug fix, background task | Secondary agent (if available) | Frees the primary for other work |
| Either could do it | Whoever is already in context | Context switching costs more than marginal quality |

### What kind of challenge?

| Risk Level | Challenge Type | Method |
|------------|---------------|--------|
| **Numbers someone will present** | Adversarial + Arithmetic | Have a second model (or person) check provenance and math |
| **Methodology choice with alternatives** | Cross-model critique | Paste output to a different model with a critique prompt |
| **Classification, scoring, or ranking** | Parallel generation | Both models produce independently, diff the outputs |
| **Pipeline or system being built to spec** | Acceptance criteria | One model writes tests, another builds, a third validates |
| **Boilerplate, config, simple CRUD** | None | Ship it. Not everything needs a challenger. |

### Decision: does this need challenge at all?

Skip challenge when ALL of these are true:
- No numbers that will be cited or presented
- No methodology choices with meaningful alternatives
- No stakeholder will scrutinize the output
- The implementation is obvious (only one reasonable approach)

If any one is false, route to challenge. When in doubt, challenge. The cost of a quick adversarial review is near zero. The cost of shipping a plausible-but-wrong number is not.

---

## Step 2: BUILD

One agent produces the deliverable. Before starting, declare the output contract.

### Output Contract Format

The builder states — at the top of the work, not after the fact:

```
OUTPUT CONTRACT
─────────────────────────────────
Producing: [what — file name, format, purpose]
Verify these claims: [specific assertions the challenger should check]
Verify these numbers: [any computed values, counts, percentages]
Assumptions made: [choices that could reasonably go another way]
Not in scope: [what this deliverable intentionally does NOT cover]
```

**Why this matters:** Without a contract, the challenger reviews everything equally. With a contract, the challenger knows exactly where to apply pressure. This is the difference between "looks good to me" and "your claim on line 47 is unsupported."

### Contract Examples

**Data pipeline:**
```
Producing: exposure-scores.csv (412 roles × 8 columns)
Verify: row count matches input (412), no silent drops, percentages sum per role
Verify numbers: aggregate exposure rate should be 35-45% based on prior runs
Assumptions: using O*NET 2024 task definitions, not 2023
Not in scope: department-level rollups (separate deliverable)
```

**Presentation deck:**
```
Producing: methodology deck, 27 slides, PDF + PPTX export
Verify: all slide text renders without clipping, fonts match brand palette
Verify numbers: none (content deck, not data deck)
Assumptions: co-presenter notes included on slides 8-12
Not in scope: speaker guide (separate export)
```

**Analysis memo:**
```
Producing: AI adoption risk memo, 3 pages
Verify claims: each statistic cites a source, no unsupported assertions
Verify numbers: dollar savings range uses sensitivity bounds, not point estimate
Assumptions: client headcount = 2,400 (from intake form, not verified)
Not in scope: implementation timeline
```

---

## Step 3: CHALLENGE

Use the tool that matches the routing decision from Step 1.

### Challenge Methods

| Method | What It Does | When |
|--------|-------------|------|
| **Adversarial review** | A second model critiques the output with provenance checks and arithmetic verification | Default for anything with numbers or claims |
| **Cross-model critique** | Paste output to a different model with a critique prompt. Different training data catches different blind spots. | When you want a genuinely independent read |
| **Parallel generation** | Both models produce independently from the same input. Compare the outputs. | Classification, scoring, ranking — where model-dependence is the question |

### Challenge Prompt Templates

**For adversarial review (paste to a second model):**
```
Review this output against its stated contract:

CONTRACT: [paste the output contract from Step 2]

OUTPUT: [paste the deliverable or summary]

Find: (1) claims not supported by the contract's stated sources,
(2) numbers that don't reconcile, (3) assumptions that weren't declared
in the contract but were made anyway, (4) the single weakest point
a skeptic would attack first.
```

**For parallel generation:**
Give both models the same input and instructions. Compare outputs side by side.

Agreement > 90% → robust. 70-90% → investigate disagreements. < 70% → methodology is underspecified.

**For acceptance criteria (multi-model compound):**

This is the strongest protocol. Multiple models, separate roles, zero overlap:

```
Step 1 — SPEC (Model A):
  "Given these requirements: [requirements].
  Write acceptance criteria: what must be true, edge cases that could break,
  forbidden outputs that must never appear."

Step 2 — BUILD (Model B):
  Implement to spec. Must pass the acceptance criteria from Step 1.

Step 3 — VALIDATE (Model C, or Model A again):
  Challenge the output against the CRITERIA from Step 1
  — not against the original requirements, against the CRITERIA.
```

Why three models: the model that defines "correct" is not the model that builds, and neither is the model that validates. This prevents the self-confirming validation loop where the same model writes tests for its own code.

**When to use:** Pipelines, data systems, anything where a subtle bug would be invisible to a single model. Overkill for a UI fix. Essential for a deliverable with numbers.

---

## Step 4: RESOLVE

The challenger produces findings. Now decide what to do with each one.

### Resolve Format

For every finding from the challenge step, record one of three verdicts:

```
RESOLVE LOG
─────────────────────────────────
Finding: [quote the specific critique]
Verdict: ACCEPTED | REJECTED | UNRESOLVED
Action: [what changed, or why it didn't]
```

### Verdict Rules

**ACCEPTED** — The critique is valid. Fix the deliverable.
- Actually fix it. Don't just acknowledge it.
- If the fix changes the output contract, update the contract.

**REJECTED** — The critique is wrong or inapplicable.
- State WHY it's wrong. "I disagree" is not a verdict.
- Good: "The challenger flagged the 38% figure as unsourced, but it's derived from Table 3 of the Frey & Osborne paper (p. 269). The derivation chain is: 702 occupations × 0.38 mean probability = 267 high-risk roles."
- This is where you build the defense. If the same question comes from a stakeholder later, this is your answer.

**UNRESOLVED** — The models disagree and you can't determine who's right.
- Do NOT silently side with one model. Make the disagreement visible.
- Good: "Claude classifies 'project coordination' as 45% AI-exposable. ChatGPT says 22%. The difference is whether 'coordination' means scheduling (automatable) or relationship management (not). This needs domain expert input."
- Unresolved findings get flagged in the build log. They don't disappear.

### The Anti-Pattern: Silent Resolution

The most common failure is reading the critique, mentally agreeing with some parts, fixing a few things, and moving on without recording what happened. This means:
- The same critique will surface again next time
- You can't tell stakeholders what was challenged and what survived
- The system doesn't learn

If you ran a challenge, you write a resolve log. No exceptions.

---

## Step 5: PROMOTE

Two outputs from every loop iteration:

### Build Log Entry (always)

Append to `_BUILD_LOG.md` using the standard format. Include:
- What was built (the deliverable)
- What was challenged (which tool, which protocol)
- What was resolved (ACCEPTED/REJECTED/UNRESOLVED counts)
- Any unresolved disagreements (flagged for future sessions)

### Skill Extraction (when durable)

A finding becomes a skill when:
1. It would change how you approach the NEXT project (not just this one)
2. It's been validated — the fix actually worked
3. It's not project-specific configuration

Write it to your skills directory using the existing directory structure.

**Promote test:** "If I forgot this and hit the same problem in 3 months, would I be frustrated that I didn't write it down?" If yes, promote. If it's just session context, the build log is enough.

---

## When to Run the Full Loop vs. Partial

| Situation | Steps to Run |
|-----------|-------------|
| Deliverable going to a stakeholder | All 5 |
| Code change with tests passing | BUILD → quick adversarial review → PROMOTE if learned something |
| Exploratory analysis, no audience yet | BUILD → PROMOTE (challenge later when it matters) |
| Fixing a bug someone reported | BUILD → verify fix → PROMOTE if root cause was non-obvious |
| Writing a skill file | BUILD → cross-model adversarial review of the skill itself → RESOLVE → PROMOTE |

---

## Tools Reference

| Component | Role in Loop | Strength |
|-----------|-------------|----------|
| Second model (any — ChatGPT, Gemini, etc.) | CHALLENGE (adversarial) / SPEC (acceptance criteria) | Independent model, different training data |
| Parallel generation (both models same task) | CHALLENGE (parallel generation) | Structured diff, agreement rate |
| `_BUILD_LOG.md` | PROMOTE (session journal) | Cross-session continuity, append-only |
| `skills/` directory | PROMOTE (knowledge library) | Durable lessons, loaded before work starts |

### Multi-Model Isolation

The key principle is structural role separation:

| Role | Assignment |
|------|-----------|
| **Spec-writer** | Model A — writes acceptance criteria, defines "correct" |
| **Builder** | Model B — implements to spec |
| **Validator** | Model C (or A) — challenges the output against the spec |

The rule: no model occupies more than one role per deliverable. The model that defines correct is not the model that builds, and neither is the model that validates.

---

*See also: `cross-model-review.md` (the 3 challenge protocols), `build-log-protocol.md` (the promote format)*
