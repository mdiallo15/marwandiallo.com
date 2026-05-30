import Link from "next/link";
import type { Metadata } from "next";
import { getAllTags } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse all essay tags.",
  alternates: { canonical: "/writing/tags" },
};

export default function TagsIndex() {
  const tags = getAllTags().sort((a, b) =>
    b.count !== a.count ? b.count - a.count : a.tag.localeCompare(b.tag),
  );

  return (
    <div>
      <Link
        href="/writing"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-12"
      >
        ← Writing
      </Link>
      <section className="mb-14">
        <h1 className="text-[2rem] md:text-[2.4rem] leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)] font-medium">
          Tags
        </h1>
        <p className="mt-3 text-[1rem] leading-[1.55] text-[var(--color-ink-soft)] max-w-[58ch]">
          Every tag, ranked by essay count.
        </p>
      </section>
      <ul className="space-y-0">
        {tags.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/writing/tag/${t.slug}`}
              className="group block py-5 border-t border-[var(--color-rule)] last:border-b transition-colors hover:bg-[var(--color-bg-elev)]"
            >
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                <span className="text-[1.05rem] leading-[1.35] text-[var(--color-ink)] underline decoration-transparent decoration-1 underline-offset-[3px] transition-[text-decoration-color] group-hover:decoration-[var(--color-ink)]">
                  #{t.tag}
                </span>
                <span className="text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-ink-muted)] tabular-nums whitespace-nowrap">
                  {t.count} {t.count === 1 ? "essay" : "essays"}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
