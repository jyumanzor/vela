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
