import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // ISO
  summary?: string;
  tags?: string[];
  draft?: boolean;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
}

export async function renderMarkdown(md: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(md);
  return String(file);
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
        summary: data.summary ? String(data.summary) : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
        draft: Boolean(data.draft),
        readingMinutes: Math.max(1, Math.round(rt.minutes)),
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

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
