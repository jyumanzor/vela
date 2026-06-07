# Skill: Workspace Hygiene

## When to Load
Any project with iterative outputs or multiple build directories. Especially important for report/white paper projects where versions proliferate. If you open a project folder and can't tell what's canonical within 5 seconds, this skill applies.

## The Problem

Iterative build projects rot fast. The failure state looks like this: multiple Office lock files (`~$*.docx`), several versioned drafts with no clear winner, scattered reference documents, and no way to tell which file is the current deliverable. An agent starting work on this folder would have to guess — and guessing is how you overwrite the right file or build on top of the wrong one.

This skill encodes the folder structure rules that prevent that state.

## Naming Convention

Three tiers, strictly enforced:

**Canonical output** — `{Name}.{ext}`
- Unversioned. Always the latest. This is the file you hand to someone.
- Example: `HBR_White_Paper_Draft.docx`

**Versioned archive copies** — `{Name}_v{N}_{YYYY-MM-DD}.{ext}`
- Lives in the delivery folder's `_archive/` subfolder, not in the project root.
- The version number increments. The date disambiguates when versions happen on the same day.
- Example: `Clean/_archive/HBR_White_Paper_Draft_v3_2026-03-20.docx`

**Agent-specific builds** — `{Name}_v{N}_{YYYY-MM-DD}_{agent}.{ext}`
- Only when both agents produce competing variants in the same session.
- Once one is chosen as canonical, the other goes to the delivery folder's `_archive/`.
- Example: `Clean/_archive/HBR_White_Paper_Draft_v4_2026-03-22_claude.docx`

### What Never Goes in the Root
- Previous versions in the delivery folder (they go to `Clean/_archive/` or equivalent)
- Lock files (`~$*`) — delete on sight
- Scratch files, test outputs, debug dumps — archive under the relevant output/build area or delete
- Multiple files that could plausibly be "the deck" — only one canonical copy lives in the output folder

## Folder Structure

Every project that produces iterative deliverables gets this structure:

```
{Project}/
├── _BUILD_LOG.md          # Append-only build journal (see build-log-protocol.md)
├── _WORKSPACE.md          # Folder map + canonical output table
├── Clean/                 # Final outputs only — what you'd hand to someone
│   ├── {Canonical}.{ext}
│   └── _archive/
│       ├── {Name}_v1_2026-03-15.ext
│       └── {Name}_v2_2026-03-18.ext
├── Ref Docs/              # Reference materials — input, not output
│   ├── source_data.xlsx
│   └── client_brief.pdf
└── deck/                  # Build system (if applicable — scripts, HTML sources)
    ├── package.json
    ├── node_modules/
    └── slides/
```

### Folder Rules

1. **`_BUILD_LOG.md` and `_WORKSPACE.md` at every project root.** The build log tracks what happened. The workspace file tracks what's where. Both are mandatory.

2. **Delivery-folder `_archive/`** — Previous versions go here with date suffixes. Never delete archive files unless disk space is critical. The archive is your undo history.

3. **`Ref Docs/` or `_ref/`** — Input materials. Reports you're referencing, data files, client briefs. Separate from output. If it wasn't produced by an agent, it goes here.

4. **Lock files (`~$*`)** — Delete on sight. Never commit. These are Office temp files created when a document is open. They contain no useful data and clutter `ls` output. If you see one, remove it immediately.

5. **`node_modules/`** — ONE per project, not per sub-build. If you have three deck directories each with their own `node_modules/`, consolidate. If there's a legitimate reason for separate installs (incompatible dependency versions), document it in `_WORKSPACE.md` with the specific reason. "I didn't think about it" is not a reason.

6. **Dead code and abandoned scripts** — Archive them under the relevant build folder or document why they remain. Don't leave dead `generate_v2_old.js` files in the working directory. If it's not being used, it's noise.

7. **Loose document artifacts** — If an Office/PDF file is not actively in use, it should not sit loose in the project tree. Put it in a named storage area such as `Ref Docs/`, `docs/`, `Clean/`, or `_archive/`. If a newer version exists, archive the older one instead of leaving both in active folders.

## The _WORKSPACE.md Template

```markdown
# Workspace — {Project Name}

## Canonical Outputs
| File | Location | Description | Last Updated |
|------|----------|-------------|-------------|
| HBR_White_Paper_Draft.docx | Clean/ | Current editable draft | 2026-03-22 |
| HBR_White_Paper_FINAL.pdf | Clean/ | PDF export for submission | 2026-03-22 |

## Folder Map
- `Clean/` — Final outputs only. What gets handed to someone.
- `Clean/_archive/` — Previous output versions with date suffixes.
- `Ref Docs/` — Input materials (source data, client briefs, reference reports).
- `deck/` — Build system (HTML sources, export scripts, node_modules).

## Dependencies
- `deck/node_modules/` — pptxgenjs, puppeteer (single install, shared by all export scripts)

## Cleanup Rules
- Lock files (`~$*`): delete immediately, never commit
- Previous canonical versions: move to `Clean/_archive/` with date suffix before promoting new version
- Duplicate `node_modules/`: consolidate or document reason for separation here
- Files over 30 days in root without being canonical: archive or delete
```

### _WORKSPACE.md Rules

- The Canonical Outputs table is the contract. If someone asks "where's the latest deck?", this table answers it.
- Update the table every time canonical changes. This is not optional.
- The Folder Map should be accurate enough that a new agent can navigate the project without guessing.
- If `_WORKSPACE.md` contradicts `_BUILD_LOG.md`, the build log wins (it's append-only and timestamped). Fix the workspace file.

## Cleanup Triggers

An agent should run workspace cleanup when:

1. **Starting a new session on a project.** Read `_WORKSPACE.md`, scan the directory, check for lock files, stale files in root, or files that should be in the delivery folder's `_archive/`. Clean before you build.

2. **After completing a build.** The previous canonical version moves to `Clean/_archive/` with a date suffix. The new output takes the canonical name. Update `_WORKSPACE.md`. This is part of the build, not a separate step.

3. **When root folder item count exceeds 15 files.** This is the signal that the project has drifted. Stop, reorganize, archive stale files, update the workspace doc.

4. **When you see lock files.** Immediately. Don't finish your task first. Delete them now. They breed confusion about which files are "in use."

## Cleanup Procedure

When triggered, run this sequence:

1. Delete all lock files (`~$*`)
2. Scan the delivery folder for non-canonical outputs and move them to `Clean/_archive/`. Archive stray root-level artifacts only if they are not active source files.
3. Check for duplicate `node_modules/` directories. If found, document or consolidate
4. Verify the Canonical Outputs table in `_WORKSPACE.md` matches reality
5. Log the cleanup in `_BUILD_LOG.md` (even cleanup gets an entry)

## Session Contract

Every session follows these rules identically. The deal:

- **Before building**: read `_WORKSPACE.md` to know what's canonical and where things are
- **After building**: update `_WORKSPACE.md` canonical table, archive previous version, log in `_BUILD_LOG.md`
- **When in doubt**: the canonical file is the one listed in `_WORKSPACE.md`. Not the newest file by timestamp. Not the biggest file. The one in the table.

If an agent finds a project without `_WORKSPACE.md` or `_BUILD_LOG.md`, create them both before doing any other work. Retroactively fill in what you can determine from file timestamps and contents.

## Anti-Patterns

- **"I'll clean up later."** You won't. The next agent won't know it needs cleaning. Clean now.
- **Versioned files in the delivery folder root.** `Deck_v1.pptx`, `Deck_v2.pptx`, `Deck_v3_FINAL.pptx`, `Deck_v3_FINAL_REAL.pptx`. This is the failure state this skill prevents. One canonical file in the output folder. Everything else in `Clean/_archive/`.
- **Orphaned build directories.** Three `deck/` variants from three different approaches, all with `node_modules/`. Pick the one that works, archive or delete the rest, document in `_WORKSPACE.md`.
- **No workspace file.** An agent shows up, sees 20 files, picks the wrong one as the starting point, builds on top of an old version. The workspace file costs 2 minutes to create and prevents hours of rework.
