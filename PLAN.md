# marwandiallo.com — Plan & Notes

Living doc. Update as work lands. Keep entries short. Newest at top.

---

## Current state (May 2026)

- **Branch:** `main` clean, deployed via Vercel.
- **Stack:** Next.js 15 App Router, Tailwind v4, MDX via `next-mdx-remote/rsc`,
  `rehype-pretty-code` + Shiki.
- **Routes shipped:** `/` (home), `/about`, `/now`, `/writing`,
  `/feed.xml`, `sitemap`, `robots`, OG image, favicons.
- **Content:** 7 essays in `content/writing/`.
- **Lib:** `projects.ts`, `writing.ts`.
- **Docs:** `README.md`, `BRANDVOICE.md`, `WRITING_STANDARD.md`.

## Recently completed

- `120e143` — X handle updated to `@marwanbuilds`.
- `e83d341` — Palette lightened, dropped chroma toward Claude-style cream.
- `5a4f2b4` — FT paper toned one notch toward white.
- `abe4895` — CSP Playground project entry bumped to v2 (sandbox + 10 bypasses).
- `53444d7` — Favicon repainted to FT-tan paper + black MD wordmark.

## Next up

_Pick one and start. Move to "In progress" when picked up._

- [ ] Decide next direction: **content** (new essay) vs **site polish** vs **feature**.
- [ ] Content: draft next essay (topic TBD — candidates below).
- [ ] Site: audit `/writing` index typography + spacing post-palette change.
- [ ] Site: verify OG image renders correctly with new cream palette.
- [ ] Feature: project index page or dedicated `/projects` route (currently only `lib/projects.ts`).
- [ ] SEO: confirm `sitemap.ts` and `feed.xml` include all 7 essays after recent changes.

## In progress

- _(none)_

## Backlog / ideas

- Essay candidates: follow-up to "Agent Identity Front"; field note on
  Schannel registry trap; short on RFC 8693 token-exchange in practice.
- `/projects` route surfacing `lib/projects.ts` entries with same FT card style.
- Reading-time + last-updated stamps on essay pages (deps already installed).
- Tag pages under `/writing/tag/[tag]`.
- Dark mode pass that respects the cream paper aesthetic.
- Lighthouse + a11y sweep after palette work.

## Conventions

- Commit per logical change; short imperative subject lines.
- Update this file when finishing or starting non-trivial work.
- Drafts: `draft: true` in MDX frontmatter (hidden in prod).
- Voice: see `BRANDVOICE.md`. Standards: see `WRITING_STANDARD.md`.
