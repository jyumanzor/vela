# Build-Time Enforcement

Use this skill when a rule is important enough that it should run automatically instead of living only in memory.

## Purpose

Good operating rules fail when they depend on someone remembering them under deadline pressure. Build-time enforcement turns repeatable checks into scripts, hooks, or validation steps that run before work ships.

## When To Use

- A mistake has happened more than once.
- A file, citation, route, export, or data contract must exist before delivery.
- A checklist item can be verified by code.
- A project has multiple agents or multiple sessions touching the same output.

## Enforcement Ladder

1. **Document the rule** in `CLAUDE.md`, `_WORKSPACE.md`, or a skill file.
2. **Add a lightweight check** that can run locally.
3. **Run the check before shipping** through `npm run lint`, `npm run build`, a test script, or a project-specific verifier.
4. **Record failures** in `_BUILD_LOG.md` so the rule improves instead of disappearing.

## Good Checks

- Required source files exist.
- Generated output matches the expected route list.
- No placeholder text remains.
- Every cited number has a provenance tag.
- Every exported file lands in the canonical folder.
- No stale lock files or duplicate current outputs remain.

## Bad Checks

- Checks that only repeat subjective style preferences.
- Checks so strict that people bypass them.
- Checks that print noise but do not name the exact failure.

## Closeout

Before marking a deliverable done, name:

- what rule was enforced
- where the enforcement runs
- what failure it catches
- how to re-run it later
