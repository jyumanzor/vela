# Vela consolidation verification

Scope: public collection, project detail pages, private workspace index, authenticated Jenn workspace, and migrated AI use-case lab. Source deployment for the lab: strategy-jenn-os commit 7a0c7e868baa2a64bc2c249e8e4abb7336d8b0d4. Import excludes the unrelated newer intern-program working tree.

Run from site/: npm test (requires Chrome), npm run lint, npm run build. The Playwright server uses explicitly local fixture credentials, not production passwords. .env.local supplies the pre-existing local Supabase setup through an ignored symlink.

Measured widths: 390, 768, 1440, 1920; browser scale 1; catalog/detail title envelopes and 16–18px body checked; minimum 24px outer gutter; zero horizontal overflow. All 12 captured route/viewport layouts passed broad-region collision checks.

Independent geometry/UX review: PASS WITH DEBT for inspected layouts. No visible application-content collisions, clipping, or broken reading order. Source and rendered contracts use broad region boxes, not exhaustive glyph outlines; universal geometry conformance is not claimed. Shared navigation/menu and auth interactions are tested separately. Screenshots contain a development-only Next indicator.

Public screenshot assets in site/public/portfolio are captures of five already-public project homepages dated September 20, 2026. No private dashboard capture is published. Paused project pages have no live-site button. Doldol remains in the collection by explicit user direction; Cinque stays paused.

Private lab observation constants are server-only and passed after cookie validation. Missing signing configuration fails closed. Admin password, wrong password, sign-out, and client isolation are covered by browser tests; no login tokens or credentials are stored in screenshots or receipts.

Private lab notes are held in encrypted Vercel production configuration VELA_PRIVATE_LAB_CONTENT because the Vela GitHub repository is public. The server-only loader reads them after authentication; the repository contains only types and an empty fallback. The initial draft branch briefly contained migrated observations before they were removed from branch history. No passwords or credentials were included.
