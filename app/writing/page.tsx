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
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Writing</h1>
      <p className="text-[var(--color-ink-muted)] mb-10 text-[0.95rem]">
        {posts.length} {posts.length === 1 ? "essay" : "essays"}. Occasional.
      </p>
      <ul className="space-y-5">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group block no-underline"
            >
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                <span className="group-hover:text-[var(--color-accent)]">
                  {post.title}
                </span>
                <span className="text-[0.8rem] text-[var(--color-ink-muted)] tabular-nums font-sans whitespace-nowrap">
                  {formatDate(post.date)} · {post.readingMinutes} min
                </span>
              </div>
              {post.summary && (
                <p className="mt-1 text-[0.92rem] text-[var(--color-ink-soft)]">
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
