# First Site — Claude Code Instructions

## Project Context

Build a real website, portfolio, or focused interface. The work should feel designed, not generated: clear hierarchy, intentional color, readable spacing, and a first screen that tells the visitor what matters.

## Reference Material

Store source material in `ref/`:

- `ref/screenshots/` — reference images, inspiration, current surfaces
- `ref/content/` — page copy, notes, audience details
- `ref/brand/` — colors, fonts, logos, moodboards
- `ref/feedback/` — comments and review notes

## Design Rules

- Build the actual usable page, not a generic landing page first.
- Use visual hierarchy before decoration.
- Keep colors purposeful: one primary accent, supporting neutrals, and no low-contrast accent text.
- Text must fit cleanly inside buttons, pills, cards, tabs, and panels.
- Run a review pass before calling the page done.

## Skills To Load

- `skills/operating-loop.md`
- `skills/build-log-protocol.md`
- `skills/workspace-hygiene.md`
- `skills/frontend-system.md`
- `skills/design-craft.md`
- `skills/color-and-layout.md`
- `skills/spacing-enforcement.md`
- `skills/text-breathing-room.md`
- `skills/holistic-review.md`
- `skills/testing-ai-output.md`
- `skills/cross-model-review.md`
- `skills/claude-handoff-notes.md`
- `skills/operational-inheritance.md`

## Build Loop

Every page runs through:

1. **Frame**: name the audience, page job, and five-second takeaway.
2. **Build**: implement the page using the existing project style.
3. **Review**: run the reviewer agents for hierarchy, layout, copy, and fit.
4. **Fix**: address the concrete findings.
5. **Log**: update `_BUILD_LOG.md`.

## Done Checklist

- [ ] The page has one clear job.
- [ ] The first screen makes that job obvious.
- [ ] Buttons and links say what happens when clicked.
- [ ] Text fits every container.
- [ ] Colors have enough contrast.
- [ ] Mobile and desktop both work.
- [ ] `_BUILD_LOG.md` records what changed.
