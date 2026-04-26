import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllPostSlugs,
  getPost,
  formatDate,
  renderMarkdown,
} from "@/lib/writing";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
    },
  };
}

export default async function WritingPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);

  return (
    <article>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-12"
      >
        ← Back
      </Link>
      <header className="mb-12">
        <h1 className="text-[2rem] md:text-[2.4rem] leading-[1.15] tracking-[-0.025em] text-[var(--color-ink)] font-medium">
          {post.title}
        </h1>
        <div className="mt-4 text-[0.82rem] text-[var(--color-ink-muted)] tabular-nums">
          {formatDate(post.date)} · {post.readingMinutes} min read
        </div>
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
