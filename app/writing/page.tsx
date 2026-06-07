import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, tagSlug, type PostMeta } from "@/lib/writing";
import { getAllTopicsWithCounts } from "@/lib/topic-browse";
import { getTopic } from "@/lib/topic-taxonomy";
import { ContextLinks } from "@/app/_components/context-links";
import { CardArtwork } from "@/app/_components/card-artwork";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays on security, building, and Guinea.",
  alternates: { canonical: "/writing" },
};

interface Props {
  searchParams: Promise<{ tag?: string }>;
}

export default async function WritingIndex({ searchParams }: Props) {
  const { tag } = await searchParams;
  const filter = tag?.trim().toLowerCase();
  const all = getAllPosts();
  const posts = filter
    ? all.filter((p) => p.tags?.some((t) => tagSlug(t) === filter))
    : all;
  const activeTag = filter
    ? all.flatMap((p) => p.tags ?? []).find((t) => tagSlug(t) === filter)
    : null;
  const topics = getAllTopicsWithCounts().filter((topic) => topic.writingCount > 0);
  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-12"
      >
        ← Back
      </Link>
      <div className="mb-10">
        <ContextLinks
          items={[
            { href: "/topics", label: "All topics" },
            { href: "/writing", label: "All writing" },
          ]}
        />
      </div>
      <section className="mb-14 flex items-end justify-between">
        <h1 className="text-[2rem] md:text-[2.4rem] leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)] font-medium">
          Writing
        </h1>
        <span className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--color-ink-muted)] tabular-nums pb-2">
          {String(posts.length).padStart(2, "0")} essays
        </span>
      </section>
      <div className="mb-8 flex flex-wrap gap-2 text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topics/${topic.slug}`}
            className="rounded-full border border-[var(--color-rule)] px-3 py-2 hover:text-[var(--color-ink)] hover:border-[var(--color-ink-muted)] transition-colors"
          >
            {topic.label}
          </Link>
        ))}
      </div>
      {activeTag && (
        <div className="mb-8 flex items-center gap-2 text-[0.78rem]">
          <span className="text-[var(--color-ink-muted)] uppercase tracking-[0.12em]">
            Filtered:
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] px-3 py-1 text-[var(--color-ink)]">
            #{activeTag}
            <Link
              href="/writing"
              aria-label="Clear tag filter"
              className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors text-[1rem] leading-none"
            >
              ×
            </Link>
          </span>
        </div>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <WritingCard key={post.slug} post={post} />
        ))}
      </ul>
      <div className="mt-10">
        <ContextLinks
          items={[
            { href: "/topics", label: "Topics" },
            { href: "/writing", label: "All writing" },
            { href: "/projects", label: "All projects" },
          ]}
        />
      </div>
    </div>
  );
}

function isoDate(iso: string): string {
  return iso.slice(0, 10);
}

function WritingCard({ post }: { post: PostMeta }) {
  return (
    <li>
      <Link href={`/writing/${post.slug}`} className="feed-card" data-kind="writing">
        <div className="feed-card__top">
          <span className="feed-card__title-top">{post.title}</span>
          <span className="feed-card__date tabular-nums">
            <time dateTime={post.date}>{isoDate(post.date)}</time>
          </span>
        </div>
        {post.topic && (
          <span className="mt-2 inline-flex text-[0.68rem] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
            {getTopic(post.topic)?.label ?? post.topic}
          </span>
        )}
        <span aria-hidden className="feed-card__visual">
          <CardArtwork slug={post.slug} />
        </span>
      </Link>
    </li>
  );
}
