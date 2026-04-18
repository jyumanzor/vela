# Cinque — Build Log

Project-level journal. Newest entries at top.

---

## 2026-04-16 — Wordmark color fix + map-click Lightbox + first deploy

**What changed:**
- `fix(wordmark)` — all 4 CINQUE wordmark render sites (Nav, homepage hero, Footer, About headline) switched from `color:var(--maroon) #7A3344` to `color:var(--cream) #FAF7F2`. Maroon was reading as low-contrast pink on the dark `--patent` bg.
- `feat(page)` — map marker click now opens the existing Lightbox at the first photo of that country within the full `allPhotos` archive. Pill buttons below the map retain their original scroll-to-section behavior; only the map-marker click was changed. New `handleMapCountryClick` in `src/app/page.tsx`.
- `docs` — Codex session authored recovery notes for `AGENTS.md` + `README.md` (canonical paths, working protocol, "no remote yet" rule). Committed separately with Codex attribution.

**Deploy:**
- `main` fast-forward merged from `feat/map-click-lightbox` at commit `90daf9a`, pushed to `github.com/jyumanzor/cinque-photos-site`.
- Vercel auto-deployed to `cinque-photos.vercel.app`. Verified HTTP 200 post-deploy; live HTML confirms hero `h1` uses `var(--cream)`.
- Vercel build-handoff window returned HTTP 401 for ~30s before 200 landed — normal transition state, not an auth gate.

**Branch cleanup:**
- `fix/wordmark-cream-all` deleted (local only, never pushed) — its single commit `776ceaf` was cherry-picked onto the map branch as `5ffa156` before being merged.
- `feat/map-click-lightbox` still exists on origin. Can be deleted now that it's merged, or kept as an audit anchor.

**Coordination note (Codex):**
- A parallel Codex session touched `AGENTS.md` + `README.md` during the restore. Their edits are now committed to main. If the Codex session tries to commit the same files, it needs to `git pull` first or it'll hit a merge conflict. Both sessions now own this repo — worth deciding which one drives next.

**Open:**
- Globe / SVG orthographic map upgrade — user wants to eventually swap the flat Leaflet map for a 3D-feeling globe. Deferred to a future `feat/svg-globe` branch off main.
- `docs/plans/` still empty.
- `vela-io` GitHub org still doesn't exist; Cinque repo lives under personal account `jyumanzor` for now.

---

## 2026-04-15 — Project restore + scaffold

**What happened:**
- Jenn asked to resume Cinque edits. Discovered the Developer copy at `~/Developer/~Working/~BUILDS/Exploratory/Vela/Clients/Cinque/site/` was a stub (only `node_modules`, `.vercel`, `next-env.d.ts`). Full source existed only in iCloud mirror.
- Restored via `rsync -a` from iCloud → Developer, excluding `node_modules`, `.vercel`, `.next`, `.DS_Store`.
  - `site/`: 125 files / ~77 MB (src/, public/photos, configs, CLAUDE.md, AGENTS.md, package.json, etc.)
  - `assets/`: ~76 MB raw photo archive (france, italy, uk, us, unknown) + `photo-manifest.json`
  - `docs/plans/`: empty (iCloud source also empty)
- Post-restore inventory confirmed byte-for-byte parity between iCloud and Developer: 126 files / 76,756,372 bytes in `site/`, 91 files in `assets/`, 0 delta.

**Learned:**
- iCloud is archive/fallback only — active dev surface is `~/Developer/~Working`. If the Developer bytes go missing again, iCloud is the restore source. Do not delete the iCloud mirror.
- Cinque is hosted under Vela (`vela-io.vercel.app`). Hosting model (subpath vs subdomain vs separate Vercel project) is still TBD.

**What's canonical:**
- `site/` — deploy root, needs its own git repo.
- `assets/` — raw archive, stays outside the repo.
- `_WORKSPACE.md` — workspace rules for the whole Cinque project envelope.

**Scaffolding added this session:**
- `_WORKSPACE.md` — canonical paths, archive rules, hosting context, open questions.
- `_BUILD_LOG.md` — this file.
- Git init pending — `site/` to be initialized as its own repo. No remote yet (waiting on Vela hosting model decision).

**Setup completed this session (after initial scaffold):**
- Hosting clarified — Cinque is a **standalone Vercel project** at `cinque-photos.vercel.app`, not a subpath of `vela-io.vercel.app`. Vela is the umbrella brand / hub site, each client deploys independently.
- GitHub repo created: `https://github.com/jyumanzor/cinque-photos-site` (private). `main` pushed with initial commit `4ba6e2b`. Personal-account pattern for now; transfer to a `vela-io` org later if/when that org exists (gh token lacks `admin:org` scope, so org creation needs manual browser step).
- Vercel link established: `.vercel/project.json` populated, Vercel project `jenns-projects-2137afa0/cinque-photos` is now auto-connected to the GitHub repo. Future `git push origin main` will trigger a Vercel deploy.
- **Map task** from the prior session is already complete — `src/components/MapView.tsx` fully implements the Leaflet spec (CartoDB Positron No Labels tiles, bordeaux DivIcon markers, `onCountryClick` scroll-to-section, scroll-wheel zoom disabled, bottom-right zoom control). Deps (`leaflet`, `react-leaflet`, `@types/leaflet`) installed in `package.json`. `src/app/page.tsx:112` imports it via `next/dynamic` with `ssr: false`.

**Open questions for next session:**
1. What edits is Jenn actually resuming? Map is done. Unclear what's next — portfolio? services? shop? copy tweaks?
2. Is `docs/plans/` supposed to have content? Empty on both iCloud and Developer — possibly a gap vs. Jenn's memory.
3. `vela-io` GitHub org — create it manually in browser when convenient, then `gh repo transfer jyumanzor/cinque-photos-site vela-io` to move Cinque under it.
4. Branch protection / CI on the new repo — deferred, not urgent for a one-person site.
