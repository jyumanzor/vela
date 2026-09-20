# Vela consolidation verification

Scope: public collection, project detail pages, private workspace index, authenticated Jenn workspace, and migrated AI use-case lab. Source deployment for the lab: strategy-jenn-os commit 7a0c7e868baa2a64bc2c249e8e4abb7336d8b0d4. Import excludes the unrelated newer intern-program working tree.

Run from site/: npm test (requires Chrome), npm run lint, npm run build. The Playwright server uses explicitly local fixture credentials, not production passwords. .env.local supplies the pre-existing local Supabase setup through an ignored symlink.

Measured widths: 390, 768, 1440, 1920; browser scale 1; catalog/detail title envelopes and 16–18px body checked; minimum 24px outer gutter; zero horizontal overflow. All 12 captured route/viewport layouts passed broad-region collision checks.

Independent geometry/UX review: PASS WITH DEBT for inspected layouts. No visible application-content collisions, clipping, or broken reading order. Source and rendered contracts use broad region boxes, not exhaustive glyph outlines; universal geometry conformance is not claimed. Shared navigation/menu and auth interactions are tested separately. Screenshots contain a development-only Next indicator.

Public screenshot assets in site/public/portfolio are captures of five already-public project homepages dated September 20, 2026. No private dashboard capture is published. Paused project pages have no live-site button. Doldol remains in the collection by explicit user direction; Cinque stays paused.

Private lab observation constants are server-only and passed after cookie validation. Missing signing configuration fails closed. Admin password, wrong password, sign-out, and client isolation are covered by browser tests; no login tokens or credentials are stored in screenshots or receipts.

Private lab notes are held in encrypted Vercel production configuration VELA_PRIVATE_LAB_CONTENT because the Vela GitHub repository is public. The server-only loader reads them after authentication; the repository contains only types and an empty fallback. The initial draft branch briefly contained migrated observations before they were removed from branch history. No passwords or credentials were included.


## Production release — September 20, 2026

Merged PR #1 into main (c6c2e54). Production deployment dpl_3h4n3Qz4794v6f3vLfqcjKbTKSaX completed READY and is aliased at https://vela-io.vercel.app. Public homepage returns HTTP 200 with the new collection; signed-out lab access redirects to the password gate. Vela-io was unpaused for this release. Final account inventory: 12 projects retained, 7 active and 5 paused. Doldol, Cinque Photos, old Vela, strategy-jenn-os, and Carina remain paused.

Production post-login verification is deferred: the existing admin password is non-readable Vercel sensitive configuration and no saved Vela auth artifact exists under ~/.jenn-os/auth. Local fixture tests verify successful admin login, lab routing, wrong-password rejection, client isolation, and sign-out. This is not evidence of successful production login. Next verification: Jenn signs in at /access/jenn/workspace with the existing password, then verify /access/jenn/workspace/lab and save an authorized local session outside the repository. No password was reset.

The initial draft's removed lab notes may remain accessible through old commit hashes or remote caches; rewriting the draft branch does not guarantee complete removal from GitHub.
