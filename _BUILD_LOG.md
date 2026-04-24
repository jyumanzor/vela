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
