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

### T-13 — Heading anchors on essay h2/h3
- **Files:** `lib/writing.ts` (add `rehype-slug` + `rehype-autolink-headings`
  through a remark→rehype pipeline), `app/globals.css` (anchor-link styling).
- **Do:** Switch `renderMarkdown` to `remark` → `remark-rehype` →
  `rehype-slug` → `rehype-autolink-headings` → `rehype-stringify`. Anchor
  link is a small `#` glyph, hidden by default, visible on heading hover
  and on `:focus-within`. Add `scroll-margin-top` so deep links land
  below sticky nav.
- **Done when:** Hovering an h2 reveals a `#` link; clicking it copies
  the anchored URL to clipboard (or just navigates — pick the simpler);
  every essay still renders; build clean.

### T-14 — Syntax highlighting for code blocks (Shiki)
- **Files:** `lib/writing.ts`, `package.json`, `README.md`.
- **Do:** Add `rehype-pretty-code` + `shiki` to deps. Wire into the
  rehype pipeline from T-13 with a quiet theme pair (e.g.,
  `github-light` and `github-dark`) so dark mode picks up the dark
  variant via `data-theme` attribute selectors. Update `README.md`
  Stack section to match what is actually installed.
- **Done when:** Any fenced code block in an essay renders highlighted;
  switching theme swaps the highlight; build clean; bundle didn't
  bloat the client (Shiki should be server-side only).

### T-15 — Per-essay dynamic OG image
- **Files:** `app/writing/[slug]/opengraph-image.tsx` (new).
- **Do:** Mirror the design of `app/opengraph-image.tsx` but pull title,
  date, and tags from the post. Use `next/og`'s `ImageResponse`. Same
  FT salmon palette tokens. `generateImageMetadata` from
  `getAllPostSlugs` so each essay prerenders its image.
- **Done when:** `/writing/agent-identity-front/opengraph-image` returns
  a 1200×630 PNG with the essay title; OG metadata for that route
  references it; build clean.

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

### T-19 — Semantic `<time datetime>` markup on dates
- **Files:** `app/writing/[slug]/page.tsx`, `app/writing/page.tsx`,
  `app/writing/tag/[tag]/page.tsx`, `app/_components/home-feed.tsx`.
- **Do:** Replace plain text date spans with `<time
  dateTime={post.date}>`. Same for `updated`. Visual rendering
  unchanged.
- **Done when:** Dates use `<time>`; SEO date crawl is unambiguous;
  build clean.

### T-20 — PWA web manifest
- **Files:** `app/manifest.ts` (new), reference in `app/layout.tsx`
  metadata if not auto-detected.
- **Do:** Emit a `MetadataRoute.Manifest` with `name`, `short_name`,
  `start_url`, `display: "standalone"`, `theme_color`,
  `background_color` (FT salmon `#fff1e5`), and the existing icons.
- **Done when:** `/manifest.webmanifest` returns valid JSON; Lighthouse
  PWA-style installability checks improve; build clean.

### T-21 — `theme-color` meta for browser chrome (light + dark)
- **Files:** `app/layout.tsx` metadata.
- **Do:** Add `themeColor` to the exported `metadata` with two entries:
  `media: "(prefers-color-scheme: light)"` → `#fff1e5`,
  `media: "(prefers-color-scheme: dark)"` → `#0a0a0a`. Note that the
  manual toggle still wins inside the page, but the browser address
  bar will use the system value.
- **Done when:** Mobile browsers show the correct chrome color; build
  clean.

### T-22 — Explicit `viewport` export
- **Files:** `app/layout.tsx`.
- **Do:** Add the `export const viewport: Viewport = {...}` block per
  Next 15 conventions (`width: "device-width"`, `initialScale: 1`,
  `maximumScale: 5`). Keep `theme-color` here if the metadata-side
  doesn't apply (Next 15 prefers viewport export).
- **Done when:** Viewport meta is emitted exactly once; no duplicate
  warnings; build clean.

### T-23 — Add `/.well-known/security.txt`
- **Files:** `app/.well-known/security.txt/route.ts` (new) or static
  `public/.well-known/security.txt`.
- **Do:** Emit RFC 9116 fields: `Contact: mailto:hello@marwandiallo.com`,
  `Expires: <one year out, ISO>`, `Preferred-Languages: en`,
  `Canonical: https://marwandiallo.com/.well-known/security.txt`.
  Return as `text/plain`.
- **Done when:** `curl https://marwandiallo.com/.well-known/security.txt`
  returns the file; build clean.

### T-24 — Aggregate `npm run check` script
- **Files:** `package.json`.
- **Do:** Add `"check": "npm run typecheck && npm run lint && npm run build"`.
  Update kickoff guidance in `PROMPT.md` if helpful (don't change rules).
- **Done when:** `npm run check` runs all three; exits non-zero on the
  first failure; documented in `README.md`.

### T-25 — Drop unused `@tailwindcss/typography`
- **Files:** `package.json`, `postcss.config.mjs` (if it's wired there),
  `app/globals.css` (verify `.prose` is fully custom).
- **Do:** Confirm `@tailwindcss/typography` plugin is not loaded
  anywhere (search `postcss.config.mjs`, `tailwind.config.*`, css
  `@plugin` directives). If unused, remove from `devDependencies` and
  the lockfile. Bundle stays the same; install graph shrinks.
- **Done when:** `npm install` no longer resolves the package; bundle
  byte counts unchanged; build clean.

### T-26 — Reading-time pluralization fix
- **Files:** `app/writing/page.tsx`, `app/writing/[slug]/page.tsx`,
  `app/_components/home-feed.tsx`, anywhere `min read` is rendered.
- **Do:** When `readingMinutes === 1`, render `1 min read`; otherwise
  `N min read`. Or, more concisely, always `N min` and drop the noun.
  Pick the one already used by 5/7 callsites and unify.
- **Done when:** No singular/plural mismatch on any route; build clean.

## Blocked

- _(none)_

## Done

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
