# Build Log — Vela

> Append-only. Both agents read before starting and write after non-trivial work.

---

## 2026-04-11 | codex | Reviewed Vela and rebuilt Cinque around trust, preview honesty, and launch readiness
**Task**: Code review the current Vela build with emphasis on the Cinque photography surface, then apply the highest-value fixes for an emerging photographer sharing work online.
**Built**: `_WORKSPACE.md`; `_BUILD_LOG.md`; `Clients/Cinque/site/src/data/site.ts`; `Clients/Cinque/site/src/components/PhotoFrame.tsx`
**Fixed**: Removed fabricated biography/contact/press/service details from the Cinque surface and centralized trust-sensitive copy in `Clients/Cinque/site/src/data/site.ts`. Reworked the home, about, contact, services, footer, and gallery pages to speak honestly about a growing portfolio instead of pretending the site is already a fully credentialed commercial studio. Added image-aware gallery rendering so real files can drop in later while the current preview state still shows meaningful fallback cards. Fixed Cinque nav readability on the dark hero and removed its React lint failure. Fixed the main Vela app lint/build blockers in `site/src/app/dashboard/tasks/page.tsx`, `site/src/components/StarfieldBg.tsx`, and `site/src/app/dashboard/agents/page.tsx`.
**Canonical outputs**: `site/`; `Clients/Cinque/site/`; `Clients/Cinque/site/src/data/site.ts`; `Clients/Cinque/site/src/data/galleries.ts`
**Learned**: For creative portfolios, fabricated credibility signals are worse than sparse content. A young photographer is better served by a clear preview-state surface, honest positioning, and room for the work to grow than by invented press logos, pricing, gear lists, or contact handles. Also, the cleanest way to keep Cinque trustworthy is to route all brand/contact/service claims through one data file instead of hardcoding them page-by-page.
**Next step**: Add real image assets and real contact methods to `Clients/Cinque/site/src/data/galleries.ts` and `Clients/Cinque/site/src/data/site.ts`, then consider replacing the temporary `<img>`-based `PhotoFrame` fallback with a `next/image` setup once the final asset strategy is settled. Main Vela still has a non-blocking Next 16 warning that `middleware.ts` should move to the newer `proxy` convention.

## 2026-04-13 | codex | Settled continuity after the Cinque palette and pricing update
**Task**: Clear the watchdog continuity gap by recording the current April 13 Cinque commit in the repo-root build log.

**Built**:
- `_BUILD_LOG.md`

**Fixed**:
- The repo had a same-day head commit newer than the last continuity entry. The log now records the current Cinque-facing change set instead of relying on git history alone.

**Canonical outputs**:
- `Clients/Cinque/site/src/app/globals.css`
- `Clients/Cinque/site/src/components/Nav.tsx`
- `Clients/Cinque/site/src/app/services/page.tsx`
- `Clients/Cinque/site/src/app/about/page.tsx`
- `Clients/Cinque/site/src/app/page.tsx`

**Learned**:
- Repo-root continuity should acknowledge client-specific commits even when the code change itself was already committed. The watchdog follows the trust surface, not just the raw git graph.

**Next step**:
- Confirm the new Cinque pricing/contact framing before any broader public share, since the April 13 commit moved the site from generic services language into explicit hobby-level pricing.

## 2026-04-13 | codex | Documented the actual Vercel mapping for Vela, Cinque, and Doldol
**Task**: Correct the repo continuity docs after deploy-link confusion by recording which local app roots map to which live Vercel projects and aliases.
**Built**: `_WORKSPACE.md`; `_BUILD_LOG.md`
**Fixed**: The workspace docs described the canonical app roots but not the live deploy map. They now explicitly record that `site/` and `Clients/Cinque/site/` both point to Vercel project `site`, that `cinque-photos.vercel.app` is an alias on that project, and that `Clients/Doldol POC/doldol-tattoo/` points to Vercel project `doldol.studio`.
**Canonical outputs**: `_WORKSPACE.md`; `site/.vercel/project.json`; `Clients/Cinque/site/.vercel/project.json`; `Clients/Doldol POC/doldol-tattoo/.vercel/project.json`
**Learned**: For multi-surface repos, continuity docs need a deploy map, not just a folder map. Otherwise old folder names and branded domains make it too easy to misread which project is actually live.
**Next step**: If Vela keeps growing client surfaces, add one small deployment table per active app root whenever a new Vercel project or alias is introduced.

## 2026-04-13 | codex | Traced the broken Vela onboarding path across Vercel and Supabase setup assumptions
**Task**: Validate the current launch checklist for `vela-io` by checking the local app link target, live Vercel projects, Production env state, and the Supabase seed flow before running any onboarding steps.
**Built**: `_WORKSPACE.md`; `_BUILD_LOG.md`
**Fixed**: Replaced an unsafe assumption chain with concrete deployment facts. `site/` is still linked locally to Vercel project `site`, not `vela-io`, so `vercel env add` from that folder would write to the wrong project. Separate Vercel projects `vela` and `vela-io` do exist, but as of 2026-04-13 both branded aliases returned 404 shell deployments. A temp-linked CLI check also showed `vela-io` currently has no Vercel environment variables, while `site` has the Supabase public vars only.
**Canonical outputs**: `_WORKSPACE.md`; `docs/supabase-seed.sql`; `site/src/app/dashboard/layout.tsx`
**Learned**: In Vercel, branded project names and branded domains are not enough to prove an app is actually deployed there. The operational truth is the combination of local `.vercel/project.json`, `vercel inspect <domain>`, and project-level env state. Also, the current dashboard fallback shows Cameron's hardcoded client data when an authenticated user has no seeded `clients` row, so "sign up first, seed later" is not a neutral sequence.
**Next step**: Link and deploy the Vela platform app to the intended `vela-io` project, add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and the real `ANTHROPIC_API_KEY` there, set Supabase Auth Site URL to `https://vela-io.vercel.app`, then create user accounts and run `docs/supabase-seed.sql` with real UUIDs or replace the UUID placeholders with an email-driven lookup flow.

## 2026-04-13 | codex | Made the pre-seed dashboard state honest for new Vela users
**Task**: Remove the misleading hardcoded-client fallback from the dashboard shell so a signed-up but unseeded user no longer sees Cameron's data.
**Built**: `site/src/app/dashboard/layout.tsx`; `_BUILD_LOG.md`
**Fixed**: When `clients.user_id` had no Supabase match, the dashboard layout used `clients[0]` and rendered Cameron's hardcoded identity. The layout now keeps `client` null and shows the existing "Your sandbox is being set up" state instead.
**Canonical outputs**: `site/src/app/dashboard/layout.tsx`
**Learned**: Prototype fallbacks that impersonate a real seeded account become launch blockers the moment onboarding depends on sign-up-before-seed. Pre-seed states need to be visibly incomplete, not plausibly wrong.
**Next step**: Apply the same honest-empty-state pattern to the remaining dashboard pages if they ever load outside the layout guard, then replace the UUID-placeholder seed flow with an email-based lookup to reduce onboarding friction.

## 2026-04-13 | codex | Seeded the missing public Supabase envs onto the `vela-io` Vercel project
**Task**: Use a temp-linked Vercel working directory to target the actual `vela-io` project and add the Production Supabase public env vars without disturbing the repo's existing `site/` link.
**Built**: `_BUILD_LOG.md`
**Fixed**: `vela-io` previously had no environment variables at all. It now has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Production, matching the values already used in `site/.env.local`.
**Canonical outputs**: `site/.env.local`; Vercel project `vela-io` Production env state
**Learned**: For multi-project Vercel teams, the safest way to write env vars to a non-linked target is a temp directory plus `vercel link --project <name>`; this avoids accidentally retargeting the repo's checked-in `.vercel/project.json`.
**Next step**: Add the real `ANTHROPIC_API_KEY` to `vela-io`, deploy the platform app there, then set Supabase Auth Site URL and run the user-signup/seed sequence against the actual live login route.

## 2026-04-24 | codex | Restored public access for the archived Doldol tattoo site
**Task**: Make the Doldol site accessible again without spending extra time polishing the archived Vela client surfaces.
**Built**: `_WORKSPACE.md`; `_BUILD_LOG.md`; `Clients/Doldol POC/doldol-tattoo/src/app/layout.tsx`; `Clients/Doldol POC/doldol-tattoo/public/robots.txt`; `Clients/Doldol POC/doldol-tattoo/public/sitemap.xml`; `Clients/Doldol POC/RESUME_HERE.md`; `Clients/Doldol POC/doldol-tattoo/docs/STATUS.md`; `Clients/Doldol POC/doldol-tattoo/docs/SITEMAP.md`
**Fixed**: Deployed the Doldol app to Vercel production and made the stable public URL `https://doldolstudio.vercel.app/`. Updated metadata, robots, sitemap, and local status docs to point at the accessible URL instead of the currently unresolved `https://doldol.studio/` domain.
**Canonical outputs**: `https://doldolstudio.vercel.app/`; Vercel deployment `dpl_3Dc4YHow2TZVLniQnVV6V5uNZ6js`; Doldol local docs under `Clients/Doldol POC/`
**Verified**: `npm run build` passes locally. Vercel production deploy completed successfully. `curl -I -L https://doldolstudio.vercel.app/` returns HTTP 200. `/robots.txt` and `/sitemap.xml` serve the new `doldolstudio.vercel.app` URLs. Smoke checks passed for `/`, `/flash`, `/studio`, `/book`, `/aftercare`, `/faqs`, `/process`, `/touch-up`, `/quiz`, and `/work`. `curl https://doldol.studio/` still fails DNS resolution.
**Learned**: Vercel can show `doldol.studio` as an alias even while the public domain remains unusable; the real accessibility proof is DNS plus a public HTTP check. `Clients/Doldol POC/` is ignored by this repo, so the live Vercel deployment and local Doldol docs are the practical continuity record unless the POC gets tracked separately.
**Next step**: Connect the registrar/DNS for `doldol.studio` to Vercel or transfer/domain-verify it under the current Vercel team, then re-check `https://doldol.studio/` from public DNS.

## 2026-04-24 | codex | Made Bri access real on the Vela platform
**Task**: Answer the follow-up audit for Matt, Cinque, Bri/Bree, and Jenn's portfolio by prioritizing a real access path for Bri.
**Built**: `site/src/app/access/bri/page.tsx`; `site/src/data/clients.ts`; `docs/supabase-seed.sql`; `_WORKSPACE.md`; `_BUILD_LOG.md`
**Fixed**: Added a public Bri access page at `https://vela-io.vercel.app/access/bri`, added Bri to the Vela static client model, and added a Bri seed block to `docs/supabase-seed.sql` so a signed-up Bri account can be linked to the correct dashboard profile. Relinked `site/` from the ambiguous historical Vercel project `site` to the intended `vela-io` project, patched `vela-io` from `framework: null` to `framework: nextjs`, and deployed the real Vela platform to production.
**Canonical outputs**: `https://vela-io.vercel.app/`; `https://vela-io.vercel.app/access/bri`; Vercel deployment `dpl_GaT2cQaNoT7qKFnrfDutYe6EyQP2`
**Verified**: `npm run lint` passed. `npm run build` passed with the known non-blocking Next 16 middleware-to-proxy warning. Vercel production deploy completed and the build manifest includes `/access/bri`. Public smoke checks return HTTP 200 for `/`, `/access/bri`, and `/login?redirectTo=/dashboard`; `/dashboard` returns the expected HTTP 307 to `/login?redirectTo=%2Fdashboard`.
**Learned**: `vela-io.vercel.app` was not failing because of app code; the Vercel project had no Next framework setting, so successful builds produced empty outputs and the alias stayed 404. For Vela, the first deployment check is now `.vercel/project.json` plus `vercel api /v9/projects/<name>` framework/output settings, not just a green build log.
**Next step**: After Bri signs up, copy the real Supabase Auth UUID into the Bri block in `docs/supabase-seed.sql` and run it in Supabase. Matt remains a starter-kit-only workspace with no built `site/` folders, and Cinque is already live at `https://cinque-photos.vercel.app/`.

## 2026-04-24 | codex | Graduated Matt's pinned music project from plan to local seed
**Task**: Improve the pinned client/project surfaces after Bri access by making Matt's first project tangible without touching private health data.
**Built**: `site/src/app/access/matt/page.tsx`; `site/src/data/clients.ts`; `Clients/Matt/music-site/site/`; `_WORKSPACE.md`; `_BUILD_LOG.md`; `Clients/Matt/_BUILD_LOG.md`; `Clients/Matt/music-site/_WORKSPACE.md`; `Clients/Matt/music-site/_BUILD_LOG.md`
**Fixed**: Added a public Matt access page at `https://vela-io.vercel.app/access/matt`, marked Matt's music scaffold as in progress in Vela's static client model, and created the full local Next.js seed for the music archive. The seed includes home, recordings, recording detail, sessions, collaborators, sample-only recording data, a custom waveform visual asset, and an audited dependency lock. Health dashboard work remains deferred until privacy boundaries are explicit.
**Canonical outputs**: `https://vela-io.vercel.app/access/matt`; `Clients/Matt/music-site/site/`; Vercel deployment `dpl_2joSJkQPo5p4RvnUwU1WCXaNnF59`
**Verified**: Matt music seed `npm run lint` passed. Matt music seed `npm run build` passed and generated `/`, `/recordings`, four recording detail pages, `/sessions`, and `/collaborators`. Vela platform `npm run lint` passed. Vela platform `npm run build` passed with the known non-blocking Next 16 middleware-to-proxy warning and includes `/access/matt`. Vercel production deploy completed and aliased to `https://vela-io.vercel.app`. Public smoke checks returned HTTP 200 for `/`, `/access/matt`, `/access/bri`, and `/login?redirectTo=/dashboard`; `/dashboard` returned the expected HTTP 307 to `/login?redirectTo=%2Fdashboard`.
**Learned**: Pinned projects should graduate in order: access surface, local seed, then real data. Music is the right first Matt project because sample data is useful and low-risk; health requires a stronger local-first rule before anything real enters the app.
**Next step**: Replace the sample recordings with Matt's real notes only after deciding whether audio files stay local-only. After Matt signs up, seed the Supabase user. Build the health dashboard only with sample data until the privacy boundary is settled.

## 2026-06-03 | claude | Sleek client-hub redesign + Cameron/Rishmika hubs
**Task**: Improve Cameron + Rishmika client resources and make the design sleeker (Apple/Oura register). Scope expanded mid-session to full client *hubs*: intake, scheduling, skills, Claude Code start-here chapters + direct links, FAQ/knowledge base, repos/templates/agents/hooks to inspect, and a cited best-in-class comparison vs other harnesses (LangGraph etc.).
**Built**: `site/src/components/access/primitives.tsx` (new shared design system: AccessShell, Hero, AnchorNav, Section, Card, CardGrid, StepList, Tags, StatStrip, LinkList, FAQ, GhostCTA, Bullets, ClosingCTA); `site/src/data/access-content.ts` (new shared content: verified Claude Code doc links, FAQ, harness comparison + synthesis); `site/src/app/access/cameron/page.tsx` (new hub); `site/src/app/access/rishmika/page.tsx` (new hub); `site/src/data/clients.ts` (added Rishmika, frontend kit); `site/src/app/globals.css` (additive sleek tokens — hairlines, radii, hover/reduced-motion CSS, scoped to access/* so the marketing site is untouched).
**Design moves**: narrow 940px column; hairline dividers (`rgba(240,237,230,0.07)`) instead of `1px solid` boxes everywhere; one accent per page (Cameron gold, Rishmika ember-copper) instead of the gold+copper+lime+amber rainbow; 18px radii + pill CTAs; soft card elevation that lifts on hover; one mono eyebrow per section. Kept the Vela forest-night brand + Instrument/DM Sans/JetBrains fonts.
**Research (subagents)**: claude-code-guide agent returned start-here chapters + canonical skills/subagents/hooks/MCP/settings doc URLs. general-purpose agent verified LangGraph / OpenAI Agents SDK / CrewAI / Claude Agent SDK against primary docs and produced an even-handed synthesis (skills+hooks = best-in-class on policy guarantees; LangGraph stronger on durable typed state). Both cited in `access-content.ts`.
**Canonical outputs**: `/access/cameron`, `/access/rishmika` on branch `claude/vela-client-resources-sleek`. NOT yet deployed.
**Verified**: `next dev` (webpack) on :3015 — both routes HTTP 200, all sections present, no error markers. Playwright headless screenshots (desktop + mobile, via 127.0.0.1 to dodge the IPv6 localhost issue) confirm the sleek aesthetic and clean mobile stacking. Webpack required because Turbopack rejects the node_modules symlink in a linked worktree ("points out of filesystem root").
**Learned**: (1) Turbopack won't follow a node_modules symlink that escapes the worktree root; use `next dev --webpack` for symlinked-deps worktrees. (2) Headless Chromium resolves `localhost`→`::1` while Next binds IPv4; screenshot via `127.0.0.1`. (3) The OS-layer repo was on `codex/inspect-claude-changes` mid-session — the per-write cross-repo ownership hook correctly blocked a `.claude/launch.json` edit there, so `preview_start` was unavailable; fell back to Playwright CLI screenshots.
**Update (same day)**: Retrofitted `/access/bri` and `/access/matt` onto the primitives — all four hubs now unified. Per-client accents: Cameron gold, Rishmika copper, Bri lime, Matt nebula-amber. Matt keeps his two project tracks (Music live, Health planned) as a `#projects` section. Both verified HTTP 200, all sections present, screenshots confirm the accents render on dark. Frontend tips/helpers are inlined in both Bri and Rishmika (symmetric); a later pass could hoist them into `access-content.ts`.
**Next step**: (a) DONE — bri + matt retrofitted.

## 2026-06-03 | claude | Deployed the four sleek hubs to vela-io production
**Task**: Ship the redesigned `/access/{cameron,rishmika,bri,matt}` hubs to production so `vela-io.vercel.app/access/*` shows the new design (Jenn is texting a client the link).
**Pre-ship gates**: All 16 external doc/repo links HEAD-checked → HTTP 200 (no dead links on client pages). `tsc --noEmit` clean. `eslint` caught 9 `react/no-unescaped-entities` errors (raw apostrophes in JSX) that would have failed the Vercel build — fixed by switching to typographic curly apostrophes (’), which also upgrades the type. Em dashes intentionally kept (Jenn declined to strip them twice; her ban is email-scoped).
**Deploy**: `vercel --prod` from the worktree `site/` (linked to project `vela-io` via copied `.vercel/project.json`). Build completed on Vercel in 31s. Deployment `dpl_33zRBGNqyJSwgwNoDKGE5r5DFT1y`, aliased to `https://vela-io.vercel.app`. NOTE: this is a CLI deploy of branch `claude/vela-client-resources-sleek`; git `main` is NOT updated — integrate the branch to keep git and prod in sync.
**Verified live**: `/access/cameron`, `/access/rishmika`, `/access/bri`, `/access/matt` all HTTP 200 and serve new-design markers ("How this approach compares", "Read these first", "Your two projects", curly apostrophe). Homepage `/` still 200. Local `next build` can't run in the worktree (Turbopack rejects the node_modules symlink); Vercel build is unaffected (fresh install).
**Next step**: Wire real intake form + scheduler links when Jenn provides them. Integrate `claude/vela-client-resources-sleek` → `main` so git matches prod. Consider hoisting frontend tips/helpers into `access-content.ts` (currently inlined in Bri + Rishmika).

## 2026-06-04 | claude | Strengthened the frontend design (depth + celestial identity)
**Task**: "Strengthen frontend design." The first pass was calm but tonally flat (every section on the same near-black with plain hairline dividers — the "page looks flat" failure from color-and-layout.md). Add craft and depth without losing restraint, leaning into Vela's celestial identity (it's a constellation; tagline "Charted, not guessed").
**Built** (all in shared primitives + globals — zero page edits, propagates to all four hubs): `globals.css` (`.access-card` base styling moved off inline so `:hover` actually works — found a latent bug where inline bg/border outranked the `:hover` rules, so only the lift applied; added gradient depth + working hover shadow + `.access-card-glow`; `.access-hero-constellation` float + mobile hide + reduced-motion guard). `primitives.tsx`: Card (gradient depth, accent crown-glow via `color-mix`, fixed hover), SectionRule (fading hairline anchored by one glowing accent star, replacing flat top-borders), Hero (accent radial halo + faint Vela constellation SVG filling the open right side), ClosingCTA (final accent glow), slightly larger/tighter section headings.
**Per-client theming**: halo, constellation, card glow, and section star all use the page accent via `color-mix(in oklab, <accent> N%, transparent)`, so Cameron=gold, Rishmika=copper, Bri=lime, Matt=amber all theme correctly. 13% mix keeps even lime subtle.
**Verified**: lint clean, `/access/cameron` HTTP 200 with `access-hero-constellation` + `access-card-glow` markers present. Screenshots (Cameron hero + full, Bri lime hero) confirm depth, celestial rhythm, and tasteful accent halos.
**Deployed**: `vercel --prod` 2026-06-04, deployment `dpl_FHvxKBiERZqcrbQJP8UKX8tu8T72`, aliased to `https://vela-io.vercel.app`. Verified live: all four `/access/*` routes HTTP 200 with the constellation/card-glow markers; homepage 200; production screenshot confirms the hero halo + constellation render end-to-end.
**Next step**: Same open items — wire intake/scheduler links when Jenn provides them; integrate `claude/vela-client-resources-sleek` → `main` so git matches prod (prod is now two CLI deploys ahead of main). (b) Wire real intake form + scheduler (Tally/Cal.com) into the "Working together" section — currently descriptive placeholders, no fake buttons. (c) Verify the `code.claude.com/docs/en/*` slugs resolve before sharing externally. (d) Decide on em dashes in web microcopy (the no-em-dash rule is email-scoped; pages currently use them). (e) Reskin Cameron's standalone `setup-guide.html` to match, or fold it into the hub. (f) Deploy preview once approved.
