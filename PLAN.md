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

- `5340c66` — `/projects` route, nav entry, home + about cross-links.
- `e7ec227` — Tag pages `/writing/tag/[tag]` + chips on the index.
- `d505875` — Optional `updated` frontmatter + essay header stamp + sitemap lastmod.
- `b490e33` — `/writing` index hover affordance + spacing tune for cream palette.
- _T-02_ — OG image colors realigned to cream palette tokens; legacy red dot dropped.
- _T-01_ — Verified sitemap + RSS list all 7 essays with correct dates (no fix needed).
- `120e143` — X handle updated to `@marwanbuilds`.
- `e83d341` — Palette lightened, dropped chroma toward Claude-style cream.
- `5a4f2b4` — FT paper toned one notch toward white.
- `abe4895` — CSP Playground project entry bumped to v2 (sandbox + 10 bypasses).
- `53444d7` — Favicon repainted to FT-tan paper + black MD wordmark.

## Next up

_Pick one and start. Move to "In progress" when picked up._

- [ ] Decide next direction: **content** (new essay) vs **site polish** vs **feature**.
- [ ] Content: draft next essay (topic TBD — candidates below).

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
