import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // ISO
  updated?: string; // ISO
  summary?: string;
  tags?: string[];
  draft?: boolean;
  readingMinutes: number;
  words: number;
}

export interface Post extends PostMeta {
  content: string;
}

export async function renderMarkdown(md: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["heading-anchor"],
        ariaLabel: "Link to this section",
        tabIndex: -1,
      },
      content: { type: "text", value: "#" },
    })
    .use(rehypePrettyCode, {
      // Two themes — Shiki emits both as inline CSS variables. The
      // `[data-theme="dark"]` selector below in globals.css picks the
      // dark variant when our manual toggle flips. Server-side only.
      theme: { light: "github-light", dark: "github-dark" },
      keepBackground: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);
  return decorateExternalLinks(String(file));
}

/**
 * Add `target="_blank" rel="noopener noreferrer"` to every absolute-URL
 * anchor in rendered essay HTML. `remark-html` doesn't add these by
 * default, so we post-process the string. Only http(s) hrefs are
 * touched; in-page anchors and relative links are left alone.
 */
function decorateExternalLinks(html: string): string {
  return html.replace(/<a\s+([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/gi,
    (match, pre: string, href: string, post: string) => {
      const attrs = `${pre} ${post}`.toLowerCase();
      const hasTarget = /\btarget\s*=/.test(attrs);
      const hasRel = /\brel\s*=/.test(attrs);
      if (hasTarget && hasRel) return match;
      const targetAttr = hasTarget ? "" : ' target="_blank"';
      const relAttr = hasRel ? "" : ' rel="noopener noreferrer"';
      return `<a ${pre}href="${href}"${post}${targetAttr}${relAttr}>`;
    },
  );
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

function readPost(slug: string): Post | null {
  const exts = [".mdx", ".md"];
  for (const ext of exts) {
    const full = path.join(CONTENT_DIR, slug + ext);
    if (fs.existsSync(full)) {
      const raw = fs.readFileSync(full, "utf8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);
      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? new Date().toISOString()),
        updated: data.updated ? String(data.updated) : undefined,
        summary: data.summary ? String(data.summary) : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
        draft: Boolean(data.draft),
        readingMinutes: Math.max(1, Math.round(rt.minutes)),
        words: rt.words,
        content,
      };
    }
  }
  return null;
}

export function getPost(slug: string): Post | null {
  const p = readPost(slug);
  if (!p) return null;
  if (p.draft && process.env.NODE_ENV === "production") return null;
  return p;
}

export function getAllPosts(): PostMeta[] {
  return getAllPostSlugs()
    .map((slug) => readPost(slug))
    .filter(
      (p): p is Post =>
        !!p && !(p.draft && process.env.NODE_ENV === "production"),
    )
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content: _c, ...meta }) => {
      void _c;
      return meta;
    });
}

/**
 * Adjacent posts in chronological order (newest first). `previous` is
 * the older essay, `next` is the newer one. Returns `null` for missing
 * neighbors at the edges.
 */
export function getAdjacentPosts(slug: string): {
  previous: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { previous: null, next: null };
  // posts[] is newest-first, so the older essay sits at i+1.
  return {
    previous: posts[i + 1] ?? null,
    next: posts[i - 1] ?? null,
  };
}

/**
 * Up to `limit` essays sharing at least one tag with `slug`, ranked by
 * shared-tag count then date desc. Excludes the current post.
 */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const posts = getAllPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current || !current.tags?.length) return [];
  const currentTags = new Set(current.tags);
  return posts
    .filter((p) => p.slug !== slug && p.tags?.some((t) => currentTags.has(t)))
    .map((p) => ({
      post: p,
      shared: (p.tags ?? []).filter((t) => currentTags.has(t)).length,
    }))
    .sort((a, b) =>
      b.shared !== a.shared ? b.shared - a.shared : a.post.date < b.post.date ? 1 : -1,
    )
    .slice(0, limit)
    .map(({ post }) => post);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** URL-safe tag slug. Lowercase, alnum + dashes only. */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, { tag: string; count: number }>();
  for (const post of getAllPosts()) {
    for (const t of post.tags ?? []) {
      const key = tagSlug(t);
      const cur = counts.get(key);
      if (cur) cur.count += 1;
      else counts.set(key, { tag: t, count: 1 });
    }
  }
  return Array.from(counts.entries())
    .map(([slug, v]) => ({ slug, tag: v.tag, count: v.count }))
    .sort((a, b) => (b.count - a.count) || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(slug: string): PostMeta[] {
  return getAllPosts().filter((p) =>
    (p.tags ?? []).some((t) => tagSlug(t) === slug),
  );
}
