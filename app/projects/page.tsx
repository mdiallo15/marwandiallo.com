import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects, type Project } from "@/lib/projects";
import { CardArtwork } from "@/app/_components/card-artwork";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've shipped. Labs, tools, starters.",
};

function isoDate(iso: string): string {
  return iso.slice(0, 10);
}

export default function ProjectsPage() {
  const projects = getAllProjects();
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
          Projects
        </h1>
        <span className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--color-ink-muted)] tabular-nums pb-2">
          {String(projects.length).padStart(2, "0")} shipped
        </span>
      </section>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <>
      <div className="feed-card__top">
        <span className="feed-card__title-top">
          {project.title}
          {project.url && (
            <span aria-hidden className="feed-card__arrow">
              {" "}
              ↗
            </span>
          )}
        </span>
        <span className="feed-card__date tabular-nums">
          {isoDate(project.date)}
        </span>
      </div>
      <span aria-hidden className="feed-card__visual" data-tag={project.tag}>
        <CardArtwork slug={project.slug} />
      </span>
    </>
  );

  if (project.url) {
    const isOwn = /(^|\.)marwandiallo\.com($|\/)/.test(project.url);
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
