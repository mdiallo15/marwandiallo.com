# marwandiallo.com — Tasks

Atomic, agent-runnable tasks. Each is small enough to finish + commit in one
session. Pick the top unblocked task, do it, commit, move it to "Done".

**Agent rules**
- Read `PLAN.md` and this file before starting.
- Pick the topmost unchecked task in "Ready". Move it to "In progress" with
  your handle (e.g., `@copilot`).
- Make the change, run `npm run typecheck` and `npm run lint`. Fix issues you
  introduce.
- Commit with a short imperative subject. Do not push unless asked.
- Move the task to "Done" with the commit SHA. Update `PLAN.md` if direction
  shifts.

---

## In progress

- _(none)_

## Ready (ordered, top = next)

### T-01 — Verify sitemap + RSS include all 7 essays
- **Files:** `app/sitemap.ts`, `app/feed.xml/route.ts` (or equivalent), `lib/writing.ts`.
- **Do:** Run `npm run build`, fetch `/sitemap.xml` and `/feed.xml` from `npm run start`,
  confirm all 7 MDX slugs appear with correct `lastmod`/`pubDate`. Fix any
  missing or stale entries.
- **Done when:** Both feeds list every non-draft essay; dates match frontmatter.

### T-02 — OG image audit against new cream palette
- **Files:** `app/opengraph-image.tsx`, `app/globals.css` (read only).
- **Do:** Render the OG image locally (`/opengraph-image`), confirm background
  matches current `--paper` token and text contrast passes WCAG AA. Adjust
  colors only — no layout changes.
- **Done when:** OG image visually matches site palette and contrast >= 4.5:1.

### T-03 — `/writing` index typography pass post-palette change
- **Files:** `app/writing/page.tsx`, related component(s) under `app/_components/`.
- **Do:** Review spacing, line-height, and link affordance on the index list
  against the lighter palette. Tighten only what is visibly off. No new deps.
- **Done when:** Index reads cleanly at 1280px and 390px widths; no regressions
  on essay detail pages.

### T-04 — Add reading-time + last-updated on essay pages
- **Files:** `lib/writing.ts`, `app/writing/[slug]/page.tsx` (or equivalent).
- **Deps:** `reading-time` already installed.
- **Do:** Compute reading time from MDX body; surface `date` (and optional
  `updated` frontmatter) in the article header in the existing FT style.
- **Done when:** Each essay shows "X min read · Apr 23, 2026" under the title.

### T-05 — Tag pages under `/writing/tag/[tag]`
- **Files:** new `app/writing/tag/[tag]/page.tsx`, `lib/writing.ts`,
  `app/sitemap.ts`.
- **Do:** Generate static params from unique tags in frontmatter. Page lists
  matching essays using the same card style as `/writing`. Add tag links
  beneath each essay title on the index.
- **Done when:** All tags render at `/writing/tag/<slug>`, included in sitemap.

### T-06 — `/projects` route surfacing `lib/projects.ts`
- **Files:** new `app/projects/page.tsx`, possibly new card component.
- **Do:** Render entries from `lib/projects.ts` using FT card style consistent
  with the home page. Link from the home and `/about`.
- **Done when:** `/projects` lists all entries; nav surfaces it.

### T-07 — Lighthouse + a11y sweep
- **Files:** none initially; report findings in PR description / commit body.
- **Do:** Run Lighthouse against `/`, `/writing`, one essay, `/about`. Capture
  scores. Fix anything < 95 perf/a11y/SEO that has a low-risk change.
- **Done when:** All four pages score >= 95 in perf, a11y, SEO; commit lists
  before/after.

## Blocked

- _(none)_

## Done

- _(none yet — move completed tasks here with commit SHA)_

## Notes

- Each task is intentionally scoped to ~1 commit. Split if it grows.
- If a task reveals a larger problem, stop, write a new task for it, and
  flag the original as Blocked.
