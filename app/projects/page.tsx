import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects, type Project } from "@/lib/projects";
import { CardArtwork } from "@/app/_components/card-artwork";
import { getAllTopicsWithCounts } from "@/lib/topic-browse";
import { getTopic } from "@/lib/topic-taxonomy";
import { ContextLinks } from "@/app/_components/context-links";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've shipped. Labs, tools, starters.",
  alternates: { canonical: "/projects" },
};

function isoDate(iso: string): string {
  return iso.slice(0, 10);
}

function isLabProject(project: Project): boolean {
  return !!project.url && /(^|\.)marwandiallo\.com($|\/)/.test(project.url);
}

export default function ProjectsPage() {
  const projects = getAllProjects();
  const newestLabSlug = projects.find(isLabProject)?.slug;
  const topics = getAllTopicsWithCounts().filter((topic) => topic.projectCount > 0);
  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-12"
      >
        ← Back
      </Link>
      <div className="mb-10">
        <ContextLinks items={[{ href: "/projects", label: "All projects" }]} />
      </div>
      <section className="mb-14 flex items-end justify-between">
        <h1 className="text-[2rem] md:text-[2.4rem] leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)] font-medium">
          Projects
        </h1>
        <span className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--color-ink-muted)] tabular-nums pb-2">
          {String(projects.length).padStart(2, "0")} shipped
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
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            isNew={project.slug === newestLabSlug}
          />
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

function ProjectCard({ project, isNew }: { project: Project; isNew: boolean }) {
  const isLab = isLabProject(project);
  const inner = (
    <>
      <div className="feed-card__top">
        <span className="feed-card__title-top">
          {project.title}
          {project.url && !isLab && (
            <span aria-hidden className="feed-card__arrow">
              {" "}
              ↗
            </span>
          )}
          {isLab && (
            <span className="feed-card__chip" aria-label="Lab project on a marwandiallo.com subdomain">
              LAB
            </span>
          )}
        </span>
        <span className="feed-card__date tabular-nums">
          <time dateTime={project.date}>{isoDate(project.date)}</time>
        </span>
      </div>
      <span className="mt-2 inline-flex text-[0.68rem] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
        {getTopic(project.topic)?.label ?? project.topic}
      </span>
      <span
        aria-hidden
        className="feed-card__visual"
        data-tag={project.tag}
        {...(isNew ? { "data-new": "true" } : {})}
      >
        {isNew && <span className="feed-card__new-badge">New</span>}
        <CardArtwork slug={project.slug} />
      </span>
    </>
  );

  if (project.url) {
    const isOwn = isLab;
    return (
      <li>
        <a
          href={project.url}
          {...(isOwn ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className="feed-card"
          data-kind="project"
          data-tag={project.tag}
        >
          {inner}
        </a>
      </li>
    );
  }
  return (
    <li>
      <div
        className="feed-card feed-card--static"
        data-kind="project"
        data-tag={project.tag}
      >
        {inner}
      </div>
    </li>
  );
}
