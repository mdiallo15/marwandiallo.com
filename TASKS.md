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

### T-29 — Reduce-motion respect
- **Files:** `app/globals.css`, `app/_components/theme-toggle.tsx`,
  any component with transition/animation.
- **Do:** Wrap non-essential transitions in
  `@media (prefers-reduced-motion: no-preference) { ... }` or add a
  global override `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; } }`.
- **Done when:** Users with reduce-motion get no transitions; default
  experience unchanged; build clean.

### T-30 — Copy-code button on `<pre>` blocks
- **Files:** new `app/_components/copy-code.tsx` (client) +
  small client wrapper, `lib/writing.ts` (mark `<pre>` for hydration),
  `app/globals.css`.
- **Do:** Either post-process rendered HTML to inject a button or use
  a small client-side script that finds `pre[data-language]` and adds
  a button positioned top-right. Button writes `pre.textContent` to
  the clipboard, swaps label to "Copied" for 1.2s. Keyboard-accessible.
- **Done when:** Every fenced code block has a working copy button;
  no JS error on pages without code; shared bundle increase ≤2 kB.

### T-31 — Footnotes support via `remark-gfm`
- **Files:** `lib/writing.ts`, `app/globals.css`.
- **Do:** `remark-gfm` is already loaded; verify footnote syntax
  (`[^1]` … `[^1]: text`) round-trips through the pipeline. Style the
  generated `<sup>` refs and `<section data-footnotes>` block to match
  the FT palette (small caps eyebrow "Notes", thin rule, smaller text).
- **Done when:** A test essay using footnotes renders linked
  superscripts and a footnotes section; back-references work; build clean.

### T-32 — Print stylesheet for essays
- **Files:** `app/globals.css`.
- **Do:** Inside `@media print { ... }` block: hide nav/footer/theme-toggle/
  skip-link/CardArtwork mockups, force `background: #fff; color: #000;`,
  expand `.prose` to full width, expose `href` next to external anchors
  via `a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 0.8em; }`.
- **Done when:** Print preview of any essay shows clean
  black-on-white text + visible URLs; build clean.

### T-33 — All-tags index page `/writing/tags`
- **Files:** `app/writing/tags/page.tsx` (new), `lib/writing.ts`
  (`getAllTags` already exists).
- **Do:** List every tag with its essay count as a row (`#tag · N`),
  linking to `/writing/tag/<slug>`. Sort by count desc, then alpha.
  Match the writing-index visual rhythm. Add to sitemap.
- **Done when:** `/writing/tags` renders all tags with counts; link
  appears below the writing index ("Browse by tag →"); build clean.

### T-34 — Essay word-count alongside reading-time
- **Files:** `lib/writing.ts`, `app/writing/[slug]/page.tsx`,
  `app/writing/page.tsx`, `app/writing/tag/[tag]/page.tsx`.
- **Do:** Compute `words` from `reading-time`'s `wordCount` (or split
  by `/\s+/`). Surface in the essay header as `· 1,240 words` after
  the date and min. Index pages keep just `N min` to stay tight.
- **Done when:** Every essay header shows date · N min · N words;
  thousands separator on word count; build clean.

### T-35 — Edit-on-GitHub link per essay
- **Files:** `app/writing/[slug]/page.tsx`.
- **Do:** Below the prose body (above prev/next), a small muted
  `Edit on GitHub →` anchor linking to
  `https://github.com/mdiallo15/marwandiallo.com/blob/main/content/writing/<slug>.mdx`.
  `target="_blank" rel="noopener noreferrer"`.
- **Done when:** Every essay has the edit link, opens new tab to the
  raw source; build clean.

### T-36 — Atom feed alongside RSS at `/atom.xml`
- **Files:** `app/atom.xml/route.ts` (new).
- **Do:** Emit Atom 1.0 (`application/atom+xml`) with the same posts
  as `/feed.xml`. `<feed>`, `<title>`, `<id>` = SITE_URL, `<updated>` =
  newest post date, `<link rel="self">`, per-entry `<id>`/`<title>`/
  `<link>`/`<published>`/`<updated>`/`<summary>`/`<author>`.
- **Done when:** `/atom.xml` validates as Atom 1.0; referenced from
  `<head>` alongside RSS; build clean.

### T-37 — Sitemap + RSS auto-discovery `<link>` tags
- **Files:** `app/layout.tsx`.
- **Do:** Add `<link rel="alternate" type="application/rss+xml" href="/feed.xml">`
  and (after T-36) the Atom variant in `<head>`. Confirm sitemap is
  surfaced via robots `Sitemap:` (already true) and as a `<link
  rel="sitemap">` if practical.
- **Done when:** Feed readers auto-discover the feeds from any page;
  build clean.

### T-38 — `humans.txt` at site root
- **Files:** `app/humans.txt/route.ts` (new) or `public/humans.txt`.
- **Do:** RFC-ish `humans.txt` with `/* TEAM */`, `/* SITE */`,
  `/* THANKS */` sections. Lists Marwan as author, links GitHub, names
  the stack (Next.js 15, Tailwind v4, Vercel).
- **Done when:** `curl /humans.txt` returns the file as `text/plain`;
  build clean.

### T-39 — Lab project cards: subdomain badge
- **Files:** `app/_components/home-feed.tsx`, `app/projects/page.tsx`.
- **Do:** When a project's `url` is on a `*.marwandiallo.com` subdomain,
  surface a tiny `LAB` chip in the card footer (uppercase, tracking,
  ink-muted). Reinforces the "own-subdomain → same-tab" rule already
  in code.
- **Done when:** Lab subdomain cards show the chip; external `↗`
  cards don't; build clean.

### T-40 — Bundle-size budget guard in `npm run check`
- **Files:** `scripts/check-bundle.mjs` (new), `package.json`.
- **Do:** Parse `next build`'s "First Load JS shared by all" line via
  a small Node script (or read `.next/build-manifest.json`). Fail if
  the shared chunks exceed 110 kB. Wire as `"check:bundle"` and
  append to `"check"`.
- **Done when:** `npm run check` fails when shared bundle exceeds the
  budget; passes today (current is 102 kB).

### T-41 — Drop unused `@types/*` and audit deps
- **Files:** `package.json`.
- **Do:** Run `npx depcheck --json` (or manual grep) and remove
  anything not referenced. Run `npm audit` and note remaining issues
  in a comment if they're upstream-only.
- **Done when:** `depcheck` reports zero unused dependencies; build
  clean; no functional change.

### T-42 — `prefers-color-scheme` initial-paint default
- **Files:** `app/_components/theme-bootstrap.tsx`, `app/globals.css`.
- **Do:** Confirm the inline bootstrap snippet picks
  `prefers-color-scheme: dark` when no localStorage value exists, and
  flips `data-theme` before first paint to avoid a light-mode flash
  on dark-mode systems.
- **Done when:** First-paint on a dark-mode system shows the dark
  palette with no flash; toggle still overrides; build clean.

### T-43 — Essay `<article>` semantic + ARIA labelling
- **Files:** `app/writing/[slug]/page.tsx`.
- **Do:** Add `aria-labelledby="essay-title"` on `<article>` and
  `id="essay-title"` on the `<h1>`. Wrap the date+reading metadata in
  `<address>` if it represents authorship metadata, or leave as `<div role="doc-subtitle">`.
- **Done when:** Screen reader announces the essay title as the
  article's accessible name; Lighthouse a11y still 100; build clean.

### T-44 — Search-engine-friendly URL trailing-slash policy
- **Files:** `next.config.mjs`, `middleware.ts` if needed.
- **Do:** Pick one (no-trailing-slash, since canonical URLs in metadata
  use it). Set `trailingSlash: false` in `next.config.mjs` (this is the
  default, just make it explicit). Verify sitemap, RSS, and canonical
  all agree.
- **Done when:** `/writing/foo/` 308-redirects to `/writing/foo`; all
  internal links use the canonical form; build clean.

## Blocked

- _(none)_

## Done

- **T-28** — Added `twitter.site: "@marwanbuilds"` to root metadata alongside the existing `creator` + `card: summary_large_image`. Per-essay metadata already cascades title/description; OG image (per-essay `opengraph-image.tsx`) drives the Twitter preview via `summary_large_image`. SHA: `384dead`
- **T-27** — Per-route `alternates.canonical` on `/writing`, `/writing/[slug]`, `/writing/tag/[tag]`, `/about`, `/now`, `/projects`. Root layout already pinned `/`. Next resolves relative paths against `metadataBase` so every HTML response now emits one absolute `<link rel="canonical">`. SHA: `384dead`
- **T-25** — Removed `@tailwindcss/typography` from `package.json` and the `@plugin` line from `app/globals.css`. Verified no `.prose-*` utility classes are used anywhere; the `.prose` ruleset is fully custom. Build clean, shared chunks unchanged. SHA: `3767e16`
- **T-18** — Skip-to-content link as the first focusable element in `app/layout.tsx` (`<a href="#main" class="skip-link">`), revealed on `:focus`/`:focus-visible` via `app/globals.css`. `<main>` got `id="main"`. Tab from the address bar surfaces it; Enter jumps focus to `<main>`. SHA: `3767e16`
- **T-17** — "Related" block on essays via `getRelatedPosts(slug, 3)` in `lib/writing.ts` — ranks other essays by shared-tag count then date desc, excludes the current post and drafts. Section is omitted entirely when overlap is zero. SHA: `3767e16`
- **T-16** — Prev/next nav at the foot of every essay via `getAdjacentPosts(slug)` in `lib/writing.ts`. Two-column on ≥sm, single column below; "Previous" ← / "Next" → eyebrows; missing edges render an `aria-hidden` placeholder so the grid stays balanced. SHA: `3767e16`
- **T-24** — Aggregate `check` script in `package.json`: `npm run check` runs typecheck → lint → build, exits non-zero on first failure. SHA: `29dbcb8`
- **T-23** — RFC 9116 `security.txt` at `app/.well-known/security.txt/route.ts`. Returns `text/plain` with `Contact`, dynamic `Expires` (one year out), `Preferred-Languages`, and `Canonical` fields. SHA: `29dbcb8`
- **T-20** — PWA web manifest at `app/manifest.ts` exposing `MetadataRoute.Manifest` with FT salmon `#fff1e5` theme/background, standalone display, and existing SVG icons. Next 15 auto-routes it to `/manifest.webmanifest`. SHA: `29dbcb8`
- **T-19** — Wrapped every visible date in `<time dateTime={iso}>` across `/writing`, `/writing/[slug]` (including `updated`), `/writing/tag/[tag]`, and the home `home-feed` writing/project cards. No visual change; SEO/crawler date parsing now unambiguous. SHA: `29dbcb8`
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
