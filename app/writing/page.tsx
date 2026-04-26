import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/writing";

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
      <ul className="space-y-1">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group block py-5 border-t border-[var(--color-rule)] last:border-b"
            >
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                <span className="text-[1.02rem] text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </span>
                <span className="text-[0.75rem] text-[var(--color-ink-muted)] tabular-nums whitespace-nowrap">
                  {formatDate(post.date)} · {post.readingMinutes} min
                </span>
              </div>
              {post.summary && (
                <p className="mt-2 text-[0.92rem] leading-[1.55] text-[var(--color-ink-soft)] max-w-[540px]">
                  {post.summary}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
