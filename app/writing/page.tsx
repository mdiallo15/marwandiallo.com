import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, formatDate, tagSlug } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays on security, building, and Guinea.",
};

export default function WritingIndex() {
  const posts = getAllPosts();
  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-12"
      >
        ← Back
      </Link>
      <section className="mb-14 flex items-end justify-between">
        <h1 className="text-[2rem] md:text-[2.4rem] leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)] font-medium">
          Writing
        </h1>
        <span className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--color-ink-muted)] tabular-nums pb-2">
          {String(posts.length).padStart(2, "0")} essays
        </span>
      </section>
      <ul className="space-y-0">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="group border-t border-[var(--color-rule)] last:border-b py-6 transition-colors hover:bg-[var(--color-bg-elev)]"
          >
            <Link
              href={`/writing/${post.slug}`}
              className="block"
            >
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                <span className="text-[1.05rem] leading-[1.35] text-[var(--color-ink)] underline decoration-transparent decoration-1 underline-offset-[3px] transition-[text-decoration-color] group-hover:decoration-[var(--color-ink)]">
                  {post.title}
                </span>
                <span className="text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-ink-muted)] tabular-nums whitespace-nowrap">
                  {formatDate(post.date)} · {post.readingMinutes} min
                </span>
              </div>
              {post.summary && (
                <p className="mt-2.5 text-[0.92rem] leading-[1.6] text-[var(--color-ink-soft)] max-w-[58ch]">
                  {post.summary}
                </p>
              )}
            </Link>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/writing/tag/${tagSlug(t)}`}
                    className="inline-flex items-center min-h-[28px] min-w-[28px] py-1.5 hover:text-[var(--color-ink)] transition-colors"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
