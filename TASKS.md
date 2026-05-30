# marwandiallo.com — Tasks

Atomic, agent-runnable tasks. Each is small enough to finish + commit in one
session. Pick the top unblocked task, do it, commit, move it to "Done".

**Agent rules**
- Read `PLAN.md` and this file before starting.
- Pick the topmost unchecked task in "Ready". Move it to "In progress" with
  your handle (e.g., `@copilot`).
- Make the change, run `npm run typecheck` and `npm run lint`. Fix issues you
  introduce.
- Commit with a short imperative subject. Push to main when build is clean
  (Vercel auto-deploys; per kickoff rule 5).
- Move the task to "Done" with the commit SHA. Update `PLAN.md` if direction
  shifts.

---

## In progress

- _(none)_

## Ready (ordered, top = next)

### T-16 — Prev / next links on essay footer
- **Files:** `app/writing/[slug]/page.tsx`, possibly a `getAdjacentPosts`
  helper in `lib/writing.ts`.
- **Do:** After the prose body, render a two-column nav with the
  chronologically previous and next essays (by `date`, drafts excluded).
  Match `.feed-card`-style minimalism — small uppercase eyebrow
  ("Previous" / "Next"), title, no summary. Wraps to one column on
  small screens.
- **Done when:** Every essay shows correct prev/next; first essay has
  no prev (skips the cell), last has no next; build clean.

### T-17 — Related-by-tag essays footer
- **Files:** `app/writing/[slug]/page.tsx`, `lib/writing.ts`.
- **Do:** Below prev/next, render up to 3 essays that share at least one
  tag with the current essay (excluding the current one), sorted by
  number of shared tags then date desc. If none, omit the section.
- **Done when:** Essays with shared-tag siblings show a "Related"
  block; essays with no overlap show nothing; build clean.

### T-18 — Skip-to-content link for keyboard users
- **Files:** `app/layout.tsx`, `app/globals.css`.
- **Do:** Insert a visually-hidden anchor as the first focusable element
  pointing to `#main`. Reveal on `:focus`. Add `id="main"` to the
  `<main>` tag.
- **Done when:** Tabbing into the page from address bar surfaces the
  skip link; pressing Enter focuses `<main>`; Lighthouse a11y stays at
  100; build clean.

### T-25 — Drop unused `@tailwindcss/typography`
- **Files:** `package.json`, `postcss.config.mjs` (if it's wired there),
  `app/globals.css` (verify `.prose` is fully custom).
- **Do:** Confirm `@tailwindcss/typography` plugin is not loaded
  anywhere (search `postcss.config.mjs`, `tailwind.config.*`, css
  `@plugin` directives). If unused, remove from `devDependencies` and
  the lockfile. Bundle stays the same; install graph shrinks.
- **Done when:** `npm install` no longer resolves the package; bundle
  byte counts unchanged; build clean.

## Blocked

- _(none)_

## Done

- **T-24** — Aggregate `check` script in `package.json`: `npm run check` runs typecheck → lint → build, exits non-zero on first failure. SHA: _(see commit)_
- **T-23** — RFC 9116 `security.txt` at `app/.well-known/security.txt/route.ts`. Returns `text/plain` with `Contact`, dynamic `Expires` (one year out), `Preferred-Languages`, and `Canonical` fields. SHA: _(see commit)_
- **T-20** — PWA web manifest at `app/manifest.ts` exposing `MetadataRoute.Manifest` with FT salmon `#fff1e5` theme/background, standalone display, and existing SVG icons. Next 15 auto-routes it to `/manifest.webmanifest`. SHA: _(see commit)_
- **T-19** — Wrapped every visible date in `<time dateTime={iso}>` across `/writing`, `/writing/[slug]` (including `updated`), `/writing/tag/[tag]`, and the home `home-feed` writing/project cards. No visual change; SEO/crawler date parsing now unambiguous. SHA: _(see commit)_
- **T-21+T-22** — Added Next 15 `export const viewport: Viewport` to `app/layout.tsx` with `device-width`, `initialScale: 1`, `maximumScale: 5`, and `themeColor` light=`#fff1e5` / dark=`#0a0a0a`. Browser chrome now matches the active palette on mobile. Single source of truth for viewport + theme-color (no more metadata-side `themeColor` conflict). SHA: `f63ddcc`
- **T-26** — Reading-time label unified on `N min` across `app/writing/page.tsx`, `app/writing/tag/[tag]/page.tsx`, and `app/writing/[slug]/page.tsx`. Drops the singular/plural mismatch in essay headers (was `min read`). SHA: `f63ddcc`
- **T-15** — Per-essay dynamic OG image at `app/writing/[slug]/opengraph-image.tsx`. Mirrors the home OG layout (FT salmon `#fff1e5` paper, MD chip, ink/ink-soft/ink-muted) but pulls title, formatted date (prefers `updated`), and up to 3 tags from the post. Uses `next/og` `ImageResponse` on the Node runtime. `generateImageMetadata` was a wrong fit — the parent `[slug]` already parameterizes the route, so dropping it gives a single `og:image` per essay. Verified: `/writing/agent-identity-front/opengraph-image` returns 1200×630 PNG, og:image meta points to the per-essay path. Every direct child of multi-child flex containers carries an explicit `display: flex` per Satori's strict rule. SHA: `04c2ca4`
- **T-14** — Syntax highlighting via `rehype-pretty-code` + `shiki` in the rehype pipeline (themes: `github-light` + `github-dark`, `keepBackground: false` so our `var(--color-bg-elev)` `<pre>` styling stays). Inline `--shiki-light` / `--shiki-dark` CSS vars per token; dark theme is selected via `:root[data-theme="dark"] .prose code span { color: var(--shiki-dark) !important }` so the manual toggle drives it. Verified at runtime on the only language-tagged fence (`ts` block in `i-built-a-scanner-then-scanned-myself`): `<pre data-language="ts">` with per-token highlight. Untagged fences (terminal output) stay as plain `<pre><code>` against `--color-bg-elev`. Shiki runs server-only; client bundle unchanged. SHA: `18f1aef`
- **T-13** — Heading anchors on h2/h3. `lib/writing.ts` `renderMarkdown` migrated from `remark-html` to `remark` → `remarkRehype` → `rehypeSlug` → `rehypeAutolinkHeadings` → `rehypeStringify`. Anchor renders as a small `#` glyph appended to each heading, hidden by default, visible on heading hover or `:focus-within`. Added `scroll-margin-top` to h2/h3 so deep links don't land flush at the viewport edge. Verified at runtime: every h2 now has an `id` slug + `<a class="heading-anchor" href="#slug">`. Removed unused `remark-html` import. SHA: `f7459e6`
- **T-12** — Audited every `<a href="http">` site-wide. Added `target="_blank" rel="noopener noreferrer"` to layout footer (GitHub/LinkedIn/X), about page Diallo Group link, now page /nownownow link, and home page Diallo Group `<Link>`. Added `decorateExternalLinks()` post-process in `lib/writing.ts` `renderMarkdown` so essay-body http(s) anchors also get the rel attributes (remark-html drops them). Verified at runtime: `/`, `/about`, `/now`, `/writing/agent-identity-front` render zero external `<a>` without `noopener`. Lab subdomain project cards stay same-tab (intentional, own-subdomain decision in `home-feed.tsx`). SHA: `acd2c46`
- **T-11** — JSON-LD on `/` (WebSite + Person) and `/about` (Person with `worksFor` + `sameAs` GitHub/LinkedIn/X) via the same nonce-aware `<JsonLd />` helper from T-10. Both routes opted into `force-dynamic` so the JSON-LD nonce matches CSP. SHA: `1425bd9`
- **T-10** — `Article` JSON-LD on essays via a nonce-aware `<JsonLd />` server component (`app/_components/json-ld.tsx`) that reads the per-request nonce from `x-nonce`. Schema includes headline, description, datePublished, dateModified (falls back to date), author Person, mainEntityOfPage, url, keywords from tags. Route opted into `force-dynamic` so the JSON-LD nonce matches the CSP header nonce on every request (verified single-GET: both nonces equal). SHA: `98ca59c`
- **T-09** — Custom 404 page at `app/not-found.tsx`. Eyebrow `404`, title "This page wandered off.", short paragraph, then a four-row link list (Home / Writing / Projects / About) styled like the writing index hover rows. Tokens-only colors so dark mode works automatically. SHA: `63d1752`
- **T-01** — Verified sitemap + RSS include all 7 essays (no fix needed; dates match frontmatter). SHA: `7b1d7df`
- **T-02** — OG image colors aligned to cream palette tokens (`#faf7f0` paper, `#0a0a0a` ink, `#33302e` ink-soft, `#6b6661` ink-muted; dropped legacy red accent). Contrast ≥ 5:1 on all text. SHA: `7b1d7df`
- **T-03** — `/writing` index: real hover affordance (row wash + title underline) since `--color-accent` matches `--color-ink` in light mode; bumped row padding and title size for breathing room with lighter palette. SHA: `b490e33`
- **T-04** — Added optional `updated` frontmatter; surfaced `· updated <date>` in essay header when newer than `date`. Sitemap `lastmod` now prefers `updated`. Reading time was already wired. SHA: `d505875`
- **T-05** — Tag pages under `/writing/tag/[tag]` (11 prerendered); added `tagSlug`/`getAllTags`/`getPostsByTag` helpers; tag chips below each summary on `/writing`; tag URLs added to sitemap. SHA: `e7ec227`
- **T-06** — `/projects` route renders all 9 entries in the same FT card grid as the home feed (reuses `.feed-card` + `CardArtwork`); surfaced in nav and sitemap; "All projects →" link on home, "See projects →" link in `/about`. SHA: `5340c66`
- **T-07** — Lighthouse sweep on `/`, `/writing`, `/writing/agent-identity-front`, `/about` (plus `/projects`). Before → after across perf/a11y/seo/bp: home 78/100/91/100 → 99/100/100/100; writing 99/96/91/100 → 98/100/100/100; essay 98/100/91/100 → 98/100/100/100; about 99/100/91/100 → 99/100/100/100. Fixes: split theme bootstrap into its own async server component so root layout stays sync (was making metadata flush after `</head>`), pinned a baseline `<meta name="description">` directly in `<head>` for crawlers, memoized HomeFeed merge/filter, retuned tag chip touch targets (≥28x28 + 12px gap). Projects bp:96 unchanged — tiny font in aria-hidden card art mockups, intentional. SHA: `fc11d93`
- **T-08** — Dark mode audit across every shipped route (`/`, `/writing`, `/writing/[slug]`, `/writing/tag/[tag]`, `/projects`, `/about`, `/now`). Headless puppeteer scan: zero light-background leaks. Lighthouse a11y in dark mode: 100 across `/`, `/writing`, essay, `/about`, `/projects`. No code changes required — dark token block + per-component overrides already in `app/globals.css` are correct. SHA: `a123149`

## Notes

- Each task is intentionally scoped to ~1 commit. Split if it grows.
- If a task reveals a larger problem, stop, write a new task for it, and
  flag the original as Blocked.
