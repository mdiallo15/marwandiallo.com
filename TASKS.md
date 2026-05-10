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

### T-07 — Lighthouse + a11y sweep
- **Files:** none initially; report findings in PR description / commit body.
- **Do:** Run Lighthouse against `/`, `/writing`, one essay, `/about`. Capture
  scores. Fix anything < 95 perf/a11y/SEO that has a low-risk change.
- **Done when:** All four pages score >= 95 in perf, a11y, SEO; commit lists
  before/after.

## Blocked

- _(none)_

## Done

- **T-01** — Verified sitemap + RSS include all 7 essays (no fix needed; dates match frontmatter). SHA: `7b1d7df`
- **T-02** — OG image colors aligned to cream palette tokens (`#faf7f0` paper, `#0a0a0a` ink, `#33302e` ink-soft, `#6b6661` ink-muted; dropped legacy red accent). Contrast ≥ 5:1 on all text. SHA: `7b1d7df`
- **T-03** — `/writing` index: real hover affordance (row wash + title underline) since `--color-accent` matches `--color-ink` in light mode; bumped row padding and title size for breathing room with lighter palette. SHA: `b490e33`
- **T-04** — Added optional `updated` frontmatter; surfaced `· updated <date>` in essay header when newer than `date`. Sitemap `lastmod` now prefers `updated`. Reading time was already wired. SHA: `d505875`
- **T-05** — Tag pages under `/writing/tag/[tag]` (11 prerendered); added `tagSlug`/`getAllTags`/`getPostsByTag` helpers; tag chips below each summary on `/writing`; tag URLs added to sitemap. SHA: `e7ec227`
- **T-06** — `/projects` route renders all 9 entries in the same FT card grid as the home feed (reuses `.feed-card` + `CardArtwork`); surfaced in nav and sitemap; "All projects →" link on home, "See projects →" link in `/about`. SHA: `5340c66`

## Notes

- Each task is intentionally scoped to ~1 commit. Split if it grows.
- If a task reveals a larger problem, stop, write a new task for it, and
  flag the original as Blocked.
