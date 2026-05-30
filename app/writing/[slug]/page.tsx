import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getPost,
  formatDate,
  renderMarkdown,
  getAdjacentPosts,
  getRelatedPosts,
} from "@/lib/writing";
import { JsonLd } from "@/app/_components/json-ld";
import { CopyCodeButtons } from "@/app/_components/copy-code";

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
    alternates: { canonical: `/writing/${post.slug}` },
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
  const { previous, next } = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post.slug);

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
    <article aria-labelledby="essay-title">
      <JsonLd data={articleSchema} />
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-12"
      >
        ← Back
      </Link>
      <header className="mb-12">
        <h1 id="essay-title" className="text-[2rem] md:text-[2.4rem] leading-[1.15] tracking-[-0.025em] text-[var(--color-ink)] font-medium">
          {post.title}
        </h1>
        <div className="mt-4 text-[0.82rem] text-[var(--color-ink-muted)] tabular-nums">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min · {post.words.toLocaleString("en-US")} words
          {post.updated && post.updated !== post.date && (
            <span> · updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>
          )}
        </div>
      </header>
      <CopyCodeButtons />
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="mt-12">
        <a
          href={`https://github.com/mdiallo15/marwandiallo.com/blob/main/content/writing/${post.slug}.mdx`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[0.82rem] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          Edit on GitHub ↗
        </a>
        <p className="mt-3 text-[0.82rem] text-[var(--color-ink-muted)]">
          If this resonated, the next essay lives in{" "}
          <Link href="/writing" className="underline decoration-[var(--color-rule)] underline-offset-[3px] hover:text-[var(--color-ink)] hover:decoration-[var(--color-ink)] transition-colors">
            the feed
          </Link>
          .
        </p>
      </div>
      {(previous || next) && (
        <nav
          aria-label="Adjacent essays"
          className="mt-20 pt-8 border-t border-[var(--color-rule)] grid gap-6 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/writing/${previous.slug}`}
              className="group block"
            >
              <span className="block text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                ← Previous
              </span>
              <span className="mt-2 block text-[1rem] leading-[1.4] text-[var(--color-ink)] underline decoration-transparent decoration-1 underline-offset-[3px] transition-[text-decoration-color] group-hover:decoration-[var(--color-ink)]">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden />
          )}
          {next ? (
            <Link
              href={`/writing/${next.slug}`}
              className="group block sm:text-right"
            >
              <span className="block text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                Next →
              </span>
              <span className="mt-2 block text-[1rem] leading-[1.4] text-[var(--color-ink)] underline decoration-transparent decoration-1 underline-offset-[3px] transition-[text-decoration-color] group-hover:decoration-[var(--color-ink)]">
                {next.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden />
          )}
        </nav>
      )}
      {related.length > 0 && (
        <section
          aria-label="Related essays"
          className="mt-12 pt-8 border-t border-[var(--color-rule)]"
        >
          <h2 className="text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-ink-muted)] font-medium">
            Related
          </h2>
          <ul className="mt-4 space-y-0">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/writing/${r.slug}`}
                  className="group block py-4 border-t border-[var(--color-rule)] last:border-b transition-colors hover:bg-[var(--color-bg-elev)]"
                >
                  <div className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                    <span className="text-[1rem] leading-[1.4] text-[var(--color-ink)] underline decoration-transparent decoration-1 underline-offset-[3px] transition-[text-decoration-color] group-hover:decoration-[var(--color-ink)]">
                      {r.title}
                    </span>
                    <span className="text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-ink-muted)] tabular-nums whitespace-nowrap">
                      <time dateTime={r.date}>{formatDate(r.date)}</time>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
