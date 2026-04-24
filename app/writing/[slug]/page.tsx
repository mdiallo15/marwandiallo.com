import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import {
  getAllPostSlugs,
  getPost,
  formatDate,
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

  return (
    <article>
      <header className="mb-10">
        <h1 className="text-[1.7rem] font-semibold tracking-tight leading-[1.25] mb-3">
          {post.title}
        </h1>
        <div className="text-[0.85rem] text-[var(--color-ink-muted)] font-sans tabular-nums">
          {formatDate(post.date)} · {post.readingMinutes} min read
        </div>
      </header>
      <div className="prose">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: { dark: "github-dark-dimmed", light: "github-light" },
                    keepBackground: false,
                  },
                ],
              ],
            },
          }}
        />
      </div>
      <footer className="mt-20 pt-8 border-t border-[var(--color-rule)] text-[0.9rem] text-[var(--color-ink-muted)]">
        <Link href="/writing" className="no-underline hover:text-[var(--color-accent)]">
          ← all writing
        </Link>
      </footer>
    </article>
  );
}
