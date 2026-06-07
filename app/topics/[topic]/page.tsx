import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatDate } from "@/lib/writing";
import { getProjectsByTopic, getPostsByTopic } from "@/lib/topic-browse";
import { getAllTopicsWithCounts } from "@/lib/topic-browse";
import { getTopic, isTopicSlug } from "@/lib/topic-taxonomy";

interface Props {
  params: Promise<{ topic: string }>;
}

export function generateStaticParams() {
  return getAllTopicsWithCounts().map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const match = getTopic(topic);
  if (!match) return {};
  return {
    title: `${match.label} — Topics`,
    description: `${match.description} Essays and labs in this topic.`,
    alternates: { canonical: `/topics/${match.slug}` },
  };
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  if (!isTopicSlug(topic)) notFound();
  const match = getTopic(topic);
  if (!match) notFound();

  const posts = getPostsByTopic(topic);
  const projects = getProjectsByTopic(topic);

  return (
    <div>
      <Link
        href="/topics"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-12"
      >
        ← Topics
      </Link>
      <section className="mb-14 flex items-end justify-between gap-6">
        <div>
          <h1 className="text-[2rem] md:text-[2.4rem] leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)] font-medium">
            {match.label}
          </h1>
          <p className="mt-3 text-[1rem] leading-[1.55] text-[var(--color-ink-soft)] max-w-[60ch]">
            {match.description}
          </p>
        </div>
        <span className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--color-ink-muted)] tabular-nums pb-2 whitespace-nowrap">
          {String(posts.length).padStart(2, "0")} essays · {String(projects.length).padStart(2, "0")} labs
        </span>
      </section>

      {posts.length > 0 && (
        <section className="mb-16">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="text-[1.15rem] leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)] font-medium">
              Writing
            </h2>
            <Link
              href="/writing"
              className="text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              All writing →
            </Link>
          </div>
          <ul className="space-y-0">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group block py-6 border-t border-[var(--color-rule)] last:border-b transition-colors hover:bg-[var(--color-bg-elev)]"
                >
                  <div className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                    <span className="text-[1.05rem] leading-[1.35] text-[var(--color-ink)] underline decoration-transparent decoration-1 underline-offset-[3px] transition-[text-decoration-color] group-hover:decoration-[var(--color-ink)]">
                      {post.title}
                    </span>
                    <span className="text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-ink-muted)] tabular-nums whitespace-nowrap">
                      <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min
                    </span>
                  </div>
                  {post.summary && (
                    <p className="mt-2.5 text-[0.92rem] leading-[1.6] text-[var(--color-ink-soft)] max-w-[58ch]">
                      {post.summary}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <div className="mb-5 flex items-end justify-between">
            <h2 className="text-[1.15rem] leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)] font-medium">
              Labs & Projects
            </h2>
            <Link
              href="/projects"
              className="text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              All projects →
            </Link>
          </div>
          <ul className="space-y-0">
            {projects.map((project) => (
              <li key={project.slug}>
                <a
                  href={project.url}
                  className="group block py-6 border-t border-[var(--color-rule)] last:border-b transition-colors hover:bg-[var(--color-bg-elev)]"
                  {...(project.url?.includes("marwandiallo.com")
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <div className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                    <span className="text-[1.05rem] leading-[1.35] text-[var(--color-ink)] underline decoration-transparent decoration-1 underline-offset-[3px] transition-[text-decoration-color] group-hover:decoration-[var(--color-ink)]">
                      {project.title}
                    </span>
                    <span className="text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-ink-muted)] tabular-nums whitespace-nowrap">
                      <time dateTime={project.date}>{formatDate(project.date)}</time>
                    </span>
                  </div>
                  <p className="mt-2.5 text-[0.92rem] leading-[1.6] text-[var(--color-ink-soft)] max-w-[58ch]">
                    {project.summary}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
