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

- **T-01** — Verified sitemap + RSS include all 7 essays (no fix needed; dates match frontmatter). SHA: `da2d7f2`
- **T-02** — OG image colors aligned to cream palette tokens (`#faf7f0` paper, `#0a0a0a` ink, `#33302e` ink-soft, `#6b6661` ink-muted; dropped legacy red accent). Contrast ≥ 5:1 on all text. SHA: `da2d7f2`

## Notes

- Each task is intentionally scoped to ~1 commit. Split if it grows.
- If a task reveals a larger problem, stop, write a new task for it, and
  flag the original as Blocked.
