import Link from "next/link";
import type { Metadata } from "next";
import { getAllTopicsWithCounts } from "@/lib/topic-browse";

export const metadata: Metadata = {
  title: "Topics",
  description: "Browse writing and labs by topic.",
  alternates: { canonical: "/topics" },
};

export default function TopicsIndex() {
  const topics = getAllTopicsWithCounts();

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-12"
      >
        ← Back
      </Link>
      <section className="mb-14">
        <h1 className="text-[2rem] md:text-[2.4rem] leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)] font-medium">
          Topics
        </h1>
        <p className="mt-3 text-[1rem] leading-[1.55] text-[var(--color-ink-soft)] max-w-[60ch]">
          Browse essays and labs by the security area they speak to. Use this as
          the higher-level shelf; tags stay available for the narrower cuts.
        </p>
      </section>
      <ul className="space-y-0">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/topics/${topic.slug}`}
              className="group block py-5 border-t border-[var(--color-rule)] last:border-b transition-colors hover:bg-[var(--color-bg-elev)]"
            >
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                <span className="text-[1.05rem] leading-[1.35] text-[var(--color-ink)] underline decoration-transparent decoration-1 underline-offset-[3px] transition-[text-decoration-color] group-hover:decoration-[var(--color-ink)]">
                  {topic.label}
                </span>
                <span className="text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-ink-muted)] tabular-nums whitespace-nowrap">
                  {topic.totalCount} items
                </span>
              </div>
              <p className="mt-2.5 text-[0.92rem] leading-[1.6] text-[var(--color-ink-soft)] max-w-[58ch]">
                {topic.description}
              </p>
              <p className="mt-2 text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-ink-muted)]">
                {topic.writingCount} essays · {topic.projectCount} labs/projects
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
