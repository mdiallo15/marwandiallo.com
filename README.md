# marwandiallo.com

Personal site. Minimal, serif, text-first. Writing lives in `content/writing/*.mdx`.

## Stack

- Next.js 15 (App Router, RSC)
- Tailwind v4
- MDX via `next-mdx-remote/rsc`
- `rehype-pretty-code` + Shiki for syntax highlighting
- Deployed on Vercel

## Develop

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — Next dev server.
- `npm run build` — Production build.
- `npm run typecheck` — TypeScript noEmit.
- `npm run check` — Typecheck + build + bundle-size guard.
- `npm run check:bundle` — Standalone bundle-size guard.

### Bundle budget

`scripts/check-bundle.mjs` reads `.next/build-manifest.json` and sums the
raw on-disk bytes of `rootMainFiles` (shared chunks loaded on every
route). Fails the build when the total exceeds `BUDGET_KB` (currently
**420 kB raw**, roughly equivalent to ~110 kB gzipped — Next's "First
Load JS" line). Bump `BUDGET_KB` in the script if you intentionally add
a heavy shared dep.

## Publish a new essay

1. Drop a new `.mdx` file into `content/writing/`.
2. Frontmatter:
   ```yaml
   ---
   title: "Essay title"
   date: "2026-04-23"
   summary: "One-line summary."
   tags: ["security"]
   ---
   ```
3. `git commit && git push`. Vercel rebuilds.

Drafts: set `draft: true` in frontmatter. Hidden in production, visible in dev.
