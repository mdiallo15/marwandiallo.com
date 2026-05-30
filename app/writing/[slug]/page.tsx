import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getPost,
  formatDate,
  renderMarkdown,
} from "@/lib/writing";
import { JsonLd } from "@/app/_components/json-ld";

const SITE_URL = "https://marwandiallo.com";

interface Props {
  params: Promise<{ slug: string }>;
}

// Dynamic so the per-request CSP nonce on the JSON-LD <script> tag matches
// the nonce middleware injects in the response header. SSG would freeze a
// build-time nonce that CSP would then block.
export const dynamic = "force-dynamic";

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

  const url = `${SITE_URL}/writing/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: "Marwan Diallo",
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    keywords: post.tags?.join(", "),
  };

  return (
    <article>
      <JsonLd data={articleSchema} />
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
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min
          {post.updated && post.updated !== post.date && (
            <span> · updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>
          )}
        </div>
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
