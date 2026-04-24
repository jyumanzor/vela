# Build Log -- Music Site

> Append-only. Read before starting. Write before stopping.

---

## 2026-04-24 | codex | Built the first local Matt music archive seed
**Task**: Turn the planned Matt music project into a usable local Next.js app.
**Built**: `site/package.json`; `site/package-lock.json`; `site/src/app/page.tsx`; `site/src/app/recordings/page.tsx`; `site/src/app/recordings/[id]/page.tsx`; `site/src/app/sessions/page.tsx`; `site/src/app/collaborators/page.tsx`; `site/src/components/`; `site/src/data/recordings.ts`; `site/public/studio-wave.svg`; `site/src/app/globals.css`; `_WORKSPACE.md`; `_BUILD_LOG.md`
**Fixed**: Created the archive structure around recordings, session notes, statuses, moods, genres, collaborators, and a no-audio-attached state. Added a custom waveform visual and moved the palette away from a one-note sepia studio look. Added a PostCSS override so `npm audit --omit=dev` reports zero vulnerabilities while staying on Next 16.2.3.
**Verified**: `npm run lint` passed. `npm run build` passed and statically generated all current pages and recording detail routes.
**Learned**: The app should stay framed as a private workshop, not a public artist site, until Matt decides what is shareable. Audio should remain absent or local-only until that rule is explicit.
**Next step**: Replace sample rows in `site/src/data/recordings.ts` with Matt-approved real notes, then add local-only audio references only if the storage rule is clear.
