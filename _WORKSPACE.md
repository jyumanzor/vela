# Workspace — Vela

## Canonical Working Roots

- Platform app: `site/`
- Client apps: `Clients/<client>/site/`
- Planning docs: `docs/plans/`
- Shared scripts: `scripts/`

## Current Canonical Surfaces

- Main Vela platform: `site/`
- Active photography client surface: `Clients/Cinque/site/`
- Cameron onboarding/reference surface: `Clients/Cameron/`

## Content And Data Canonicals

- Cinque site-wide positioning, contact-state, and service copy live in `Clients/Cinque/site/src/data/site.ts`
- Cinque collection structure and preview-photo metadata live in `Clients/Cinque/site/src/data/galleries.ts`
- Vela platform route source remains the `site/src/` tree

## Naming And Cleanup

- Unversioned `site/` folders are canonical app roots, not scratch copies
- Keep one dependency install per app root; do not create duplicate `node_modules/` trees inside iteration folders
- Superseded planning docs should move into `docs/_archive/` if they need to be retained
- Superseded client-specific artifacts should move into `Clients/<client>/_archive/` instead of sitting beside the active app

## Notes

- `Clients/Cinque/` is currently an untracked client surface inside the Vela repo; treat it as active work, not disposable scratch output
- When updating Cinque, preserve the current visual direction and use `src/data/site.ts` for trust-sensitive content rather than scattering hardcoded claims across pages

