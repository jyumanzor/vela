# Claude Handoff Notes

> Load this when an agent is handing a project, live situation, or page brief to Claude and wants Claude to build or update the visual surface quickly without rediscovering the whole context.

## Core Rule

If Claude's job is "put up the page," do not hand off chaos.

Create or refresh a single project-local file named:

`claude-handoff-notes.md`

Put it in the project root next to `_WORKSPACE.md` and `_BUILD_LOG.md`.

## What The Handoff Note Must Do

The note should let Claude answer three questions fast:

1. What exactly should I build?
2. What facts are non-negotiable?
3. How should the information be structured on the page?

## Required Sections

Use this order:

### 1. Objective
- One sentence on the job to be done.
- Example: "Turn the client opportunity into an internal situation-room page for review."

### 2. Canonical Inputs
- Absolute paths to the current source-of-truth files.
- Include existing HTML, layout briefs, transcripts, spreadsheets, decks, or notes Claude should trust first.
- If email or other live sources were already read, summarize the key message threads here instead of forcing Claude to reopen everything.

### 3. Non-Negotiable Facts
- Flat bullets only.
- Use absolute dates.
- Separate verified facts from assumptions.
- Include names, entities, deadlines, party lists, and any "must not get wrong" claims.

### 4. Open Questions
- List unresolved items Claude should preserve as open rather than smoothing over.
- Good examples: missing document, unverified fit, unclear jurisdiction, unknown final staffing choice.

### 5. What Information To Present
- This is the content contract for the page.
- For business-development / live-situation pages, default to:
  - current stage
  - dated timeline
  - player map
  - ask / scope summary
  - candidate or staffing matrix
  - immediate next steps with ownership
  - known vs inferred
  - explicit open questions

### 6. How To Present It
- Give Claude the narrative order, not just the facts.
- Specify the page sequence.
- Example:
  - status rail first
  - then timeline
  - then players
  - then decision rubric
  - then next actions
- Call out what to avoid: card soup, vague prose, fake certainty, burying the lead, flattening politics into generic process.

### 7. Sensitivity Rules
- State what is private, internal, or not for display.
- If personal context exists, say whether it is background-only or page-visible.
- Default rule: private relationship context stays out of shared pages unless explicitly requested.

### 8. Update Protocol
- Say what should trigger a refresh of the note.
- Example triggers:
  - new client email
  - new candidate CV
  - new conflict party
  - new meeting outcome

### 9. Claude Prompt Block
- End with a ready-to-send prompt block.
- Make it explicit which files to read first and what output Claude should produce.

## Hook Process

- Canonical filename: `claude-handoff-notes.md`
- Canonical location: project root
- Session-start tooling should surface this file when present
- Refresh it when new evidence changes the facts or page structure
- Keep it short enough to scan in under two minutes
- If the pattern proves reusable beyond one project, promote it using operational inheritance

## Anti-Patterns

- Dumping raw emails with no synthesis
- Mixing verified facts and advice in the same bullets
- Asking Claude to infer the page structure from a messy artifact pile
- Hiding the current canonical HTML / deck / doc paths
- Omitting the "what not to show" boundary on sensitive situations

## Minimal Template

```markdown
# Claude Handoff Notes — {Project}

## Objective
- {One-sentence build objective}

## Canonical Inputs
- `{absolute/path/to/current.html}` — {why it matters}
- `{absolute/path/to/layout.md}` — {why it matters}

## Non-Negotiable Facts
- {dated fact}
- {dated fact}

## Open Questions
- {unknown that should stay visible}

## What To Present
- {section}
- {section}

## How To Present It
- {ordering rule}
- {visual rule}
- {avoidance rule}

## Sensitivity Rules
- {private/background-only rule}

## Update Protocol
- {what should trigger note refresh}

## Prompt For Claude
Read `CLAUDE.md`, `skills/_index.md`, then this file, then the canonical inputs above. Build/update the page using the non-negotiable facts exactly, keep open questions visible, and do not smooth over unresolved staffing or evidence gaps.
```
