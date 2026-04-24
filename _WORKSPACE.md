# Workspace — Vela

## Canonical Working Roots

- Platform app: `site/`
- Client apps: `Clients/<client>/site/`
- Planning docs: `docs/plans/`
- Shared scripts: `scripts/`

## Current Canonical Surfaces

- Main Vela platform: `site/`
- Bri access surface: `site/src/app/access/bri/page.tsx`
- Active photography client surface: `Clients/Cinque/site/`
- Active tattoo studio client surface: `Clients/Doldol POC/doldol-tattoo/`
- Cameron onboarding/reference surface: `Clients/Cameron/`

## Content And Data Canonicals

- Cinque site-wide positioning, contact-state, and service copy live in `Clients/Cinque/site/src/data/site.ts`
- Cinque collection structure and preview-photo metadata live in `Clients/Cinque/site/src/data/galleries.ts`
- Vela platform route source remains the `site/src/` tree

## Deployment Map

- `site/` is linked to Vercel project `vela-io` (`prj_N5rbi0jLvTnwueb8S3P6WG8etrF4`) and deploys to `https://vela-io.vercel.app/`
- `Clients/Cinque/site/` is linked to Vercel project `cinque-photos` (`prj_JfKgyI6KoZ2QTL244rR35G9G4gOl`) and deploys to `https://cinque-photos.vercel.app/`
- Vercel project `site` (`prj_CmLa7fWz2BRXzvIwKkIkY5ZT8yQr`) is historical/ambiguous in this workspace; do not use it as the Vela platform target without re-checking
- `Clients/Doldol POC/doldol-tattoo/` is linked to Vercel project `doldol.studio` (`prj_q1iK6b16OqCYzMlXlZrxxkNFhdjl`)
- As of 2026-04-24, Doldol is publicly accessible at `https://doldolstudio.vercel.app/`; `https://doldol.studio/` is aliased in Vercel but does not resolve in public DNS yet
- Separate Vercel project `vela` also exists under the same team, but no local app root in this repo is currently linked to it

## Naming And Cleanup

- Unversioned `site/` folders are canonical app roots, not scratch copies
- Keep one dependency install per app root; do not create duplicate `node_modules/` trees inside iteration folders
- Superseded planning docs should move into `docs/_archive/` if they need to be retained
- Superseded client-specific artifacts should move into `Clients/<client>/_archive/` instead of sitting beside the active app

## Notes

- `Clients/Cinque/` is currently an untracked client surface inside the Vela repo; treat it as active work, not disposable scratch output
- `Clients/Doldol POC/` is currently ignored by git; treat the live Vercel deployment and local Doldol docs as the canonical accessibility record unless the project gets its own tracked repo
- When updating Cinque, preserve the current visual direction and use `src/data/site.ts` for trust-sensitive content rather than scattering hardcoded claims across pages
- Do not infer separate Vercel projects from branded domains alone. Check `.vercel/project.json` and `vercel inspect <domain>` first, since client domains may be aliases on another project
- Before any Vercel deploy or env write, inspect the local `.vercel/project.json`; this workspace has had multiple similarly named projects (`site`, `vela`, `vela-io`, `cinque-photos`) and the local link is the operational truth
