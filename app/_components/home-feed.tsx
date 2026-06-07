"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/writing";
import type { Project } from "@/lib/projects";
import { CardArtwork } from "./card-artwork";

type Tab = "all" | "writing" | "building";

type FeedItem =
  | { kind: "writing"; data: PostMeta }
  | { kind: "project"; data: Project };

interface Props {
  posts: PostMeta[];
  projects: Project[];
}

function isLabProject(project: Project): boolean {
  return !!project.url && /(^|\.)marwandiallo\.com($|\/)/.test(project.url);
}

export function HomeFeed({ posts, projects }: Props) {
  const [tab, setTab] = useState<Tab>("all");
  const newestWritingSlug = posts[0]?.slug;
  const newestLabSlug = projects.find(isLabProject)?.slug;

  const all = useMemo<FeedItem[]>(() => {
    const merged: FeedItem[] = [
      ...posts.map<FeedItem>((p) => ({ kind: "writing", data: p })),
      ...projects.map<FeedItem>((p) => ({ kind: "project", data: p })),
    ].sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );

    // Pin the Labs hub to the front of the All view so the entry point
    // to the lab subdomain is the first thing visitors see.
    const labsIdx = merged.findIndex(
      (i) => i.kind === "project" && i.data.slug === "labs-hub",
    );
    return labsIdx > 0
      ? [
          merged[labsIdx],
          ...merged.slice(0, labsIdx),
          ...merged.slice(labsIdx + 1),
        ]
      : merged;
  }, [posts, projects]);

  const filtered = useMemo(
    () =>
      all.filter((item) => {
        if (tab === "all") return true;
        if (tab === "writing") return item.kind === "writing";
        if (tab === "building") return item.kind === "project";
        return true;
      }),
    [all, tab],
  );

  return (
    <section className="mb-24">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="seg-tabs" role="tablist" aria-label="Feed filter">
          <span aria-hidden className="seg-tabs__indicator" data-tab={tab} />
          <TabButton tab="all" active={tab} onClick={setTab}>
            All
          </TabButton>
          <TabButton tab="writing" active={tab} onClick={setTab}>
            Writing
          </TabButton>
          <TabButton tab="building" active={tab} onClick={setTab}>
            Building
          </TabButton>
        </div>
        <div className="flex flex-wrap justify-end gap-6 text-[0.78rem] uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
          <Link
            href="/writing"
            className="hover:text-[var(--color-ink)] transition-colors"
          >
            All writing →
          </Link>
          <Link
            href="/projects"
            className="hover:text-[var(--color-ink)] transition-colors"
          >
            All projects →
          </Link>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((item) =>
          item.kind === "writing" ? (
            <WritingCard
              key={`w-${item.data.slug}`}
              post={item.data}
              isNew={item.data.slug === newestWritingSlug}
            />
          ) : (
            <ProjectCard
              key={`p-${item.data.slug}`}
              project={item.data}
              isNew={item.data.slug === newestLabSlug}
            />
          ),
        )}
      </ul>
    </section>
  );
}

function TabButton({
  tab,
  active,
  onClick,
  children,
}: {
  tab: Tab;
  active: Tab;
  onClick: (t: Tab) => void;
  children: React.ReactNode;
}) {
  const isActive = active === tab;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => onClick(tab)}
      className="seg-tabs__btn"
      data-active={isActive}
    >
      <span>{children}</span>
    </button>
  );
}

function isoDate(iso: string): string {
  return iso.slice(0, 10);
}

function WritingCard({ post, isNew }: { post: PostMeta; isNew: boolean }) {
  return (
    <li>
      <Link
        href={`/writing/${post.slug}`}
        className="feed-card"
        data-kind="writing"
      >
        <div className="feed-card__top">
          <span className="feed-card__title-top">{post.title}</span>
          <span className="feed-card__date tabular-nums">
            <time dateTime={post.date}>{isoDate(post.date)}</time>
          </span>
        </div>
        <span
          aria-hidden
          className="feed-card__visual"
          {...(isNew ? { "data-new": "true" } : {})}
        >
          {isNew && <span className="feed-card__new-badge">New</span>}
          <CardArtwork slug={post.slug} />
        </span>
      </Link>
    </li>
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
    // Same-tab nav for our own subdomains; new tab for external (GitHub, etc.)
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
