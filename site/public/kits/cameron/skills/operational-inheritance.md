# Operational Inheritance

> Load this when a useful structure, workflow, page pattern, or decision framework should carry forward into your operating system instead of dying inside one project folder.

## What This Is

**Operational inheritance** — the practice of promoting reusable patterns from individual projects into your shared system so future work inherits the improvement by default.

Plain-English synonyms:

- systematization
- institutionalization
- pattern promotion

## When To Load

Load this skill when you hear language like:

- "make this carry forward"
- "put this into the system"
- "don't let this die here"
- "this should live beyond this project"
- "the agent should know this pattern next time"

Also load it when:

- the same structure would help a second project
- a project-local rule should become a shared skill
- a useful framework belongs in architecture docs or build guidance

## Core Rule

Do not leave durable structure trapped in the artifact that happened to produce it.

If a pattern is reusable, promote it deliberately into the layer that future work will actually read.

## Promotion Ladder

Choose the smallest set of layers that makes the pattern inheritable:

### 1. Project Layer

Use when the pattern is still specific to one live artifact.

- project handoff notes
- project `_WORKSPACE.md`
- project `_BUILD_LOG.md`

### 2. Shared Skill Layer

Use when the lesson is portable across projects.

- add or update a file in your shared skills directory
- add it to your skills index

### 3. Operating Rule Layer

Use when agents should absorb the pattern before starting work.

- update your `CLAUDE.md` or equivalent agent instructions
- update session hooks or protocol scripts if the pattern should be surfaced automatically

### 4. Architecture / Explanation Layer

Use when the pattern changes how your system should be explained, taught, or defended.

- update system docs
- update architecture diagrams if it affects the system story

### 5. Public Teaching Layer

Use only after the internal rule is stable.

- create a blog post or other public explainer if the lesson is worth publishing

## Decision Rules

Promote the pattern when at least one of these is true:

- you would waste time rediscovering it in the future
- an agent would otherwise rebuild the same reasoning from scratch
- the pattern changes how work should be structured, not just how one file looks
- the lesson improves legibility, control, verification, or reuse across projects

Keep it local when:

- it is still experimental
- it depends on one project's politics or file layout
- it has not yet survived real reuse

## Minimum Carry-Forward Package

When promoting a pattern, try to leave all of these behind:

1. A name for the pattern
2. A short rule for when it applies
3. The canonical file or skill path
4. The trigger or hook that should surface it
5. A build-log entry saying what is now canonical

## Anti-Patterns

- Leaving the insight only in a chat transcript
- Writing a project note but never promoting the reusable part
- Creating several overlapping docs with no canonical home
- Publishing a public explanation before the internal workflow exists
- Calling something "shared" without adding it to the skill index or operating docs

## Example

A client project produced a reusable handoff pattern:

- project-local handoff notes captured what the agent should build
- the reusable method became a shared skill file
- the session protocol was updated to surface that file automatically

That is operational inheritance: a one-project solution promoted until future work inherits it.
