"use client";

import { useState } from "react";
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

export function HomeFeed({ posts, projects }: Props) {
  const [tab, setTab] = useState<Tab>("all");

  const all: FeedItem[] = [
    ...posts.map<FeedItem>((p) => ({ kind: "writing", data: p })),
    ...projects.map<FeedItem>((p) => ({ kind: "project", data: p })),
  ].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  const filtered = all.filter((item) => {
    if (tab === "all") return true;
    if (tab === "writing") return item.kind === "writing";
    if (tab === "building") return item.kind === "project";
    return true;
  });

  return (
    <section className="mb-24">
      {/* Analog segmented tabs */}
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

      <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((item) =>
          item.kind === "writing" ? (
            <WritingCard key={`w-${item.data.slug}`} post={item.data} />
          ) : (
            <ProjectCard key={`p-${item.data.slug}`} project={item.data} />
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

function WritingCard({ post }: { post: PostMeta }) {
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
            {isoDate(post.date)}
          </span>
        </div>
        <span aria-hidden className="feed-card__visual">
          <CardArtwork slug={post.slug} />
        </span>
      </Link>
    </li>
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
    return (
      <li>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
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
