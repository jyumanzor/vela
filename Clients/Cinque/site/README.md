# Cinque Site

Recovered Next.js site for Cinque.

## Recovery Status

- Canonical working copy: `/Users/jennumanzor/Desktop/~Working/~BUILDS/Exploratory/Vela/Clients/Cinque/site`
- Backing location: `/Users/jennumanzor/Developer/~Working/~BUILDS/Exploratory/Vela/Clients/Cinque/site`
- Fallback archive copy: `/Users/jennumanzor/Library/Mobile Documents/com~apple~CloudDocs/Desktop/~Working/~BUILDS/Exploratory/Vela/Clients/Cinque/site`
- Recovery verification on April 15, 2026:
  - Source files matched the iCloud copy exactly after excluding `.git`, `node_modules`, `.next`, `.vercel`, and `tsconfig.tsbuildinfo`
  - `npm ci` completed successfully
  - `npm run build` completed successfully

## Important Rules

- Work from the Desktop alias path or the Developer path above. They point to the same live workspace.
- Do not work from the CloudDocs path.
- Do not delete the CloudDocs fallback copy until this repo has an intentional upstream backup.
- This repo currently has no configured git remote. Treat it as a recovered local repo until a deliberate remote decision is made.

## Getting Started

```bash
git status -sb
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser while developing.

## Common Commands

```bash
npm run dev
npm run build
npm run lint
```
