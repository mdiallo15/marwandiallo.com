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
