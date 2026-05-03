import Link from "next/link";
import { getAllPosts } from "@/lib/writing";
import { getAllProjects } from "@/lib/projects";
import { HomeFeed } from "./_components/home-feed";

export default function HomePage() {
  const posts = getAllPosts();
  const projects = getAllProjects();

  return (
    <div>
      {/* Hero — Fredrika layout: name+tagline left, links right */}
      <section className="mb-16 flex items-start justify-between gap-8">
        <div className="max-w-[560px]">
          <h1 className="text-[1.05rem] leading-[1.4] tracking-[-0.01em] text-[var(--color-ink)] font-medium mb-3">
            Marwan Diallo
          </h1>
          <p className="text-[1.05rem] leading-[1.5] text-[var(--color-ink-soft)]">
            Security architect by trade, builder by habit. Currently watching
            the AI coding stack ship insecure defaults. Founder of{" "}
            <Link
              href="https://security.diallogroup.io"
              className="text-[var(--color-ink)] underline decoration-[var(--color-rule)] underline-offset-[5px] hover:decoration-[var(--color-ink)]"
            >
              Diallo Group
            </Link>
            .
          </p>
        </div>

        {/* Social links — plain text, stacked, right-aligned */}
        <nav
          aria-label="Social"
          className="flex flex-col items-end gap-1 text-[0.95rem] text-[var(--color-ink-soft)] shrink-0"
        >
          <a
            href="https://x.com/marwanbuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-ink)] transition-colors"
          >
            X
          </a>
          <a
            href="https://github.com/mdiallo15"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-ink)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/marwandiallo/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-ink)] transition-colors"
          >
            LinkedIn
          </a>
        </nav>
      </section>

      {/* Feed — analog tabs over essays + projects */}
      <HomeFeed posts={posts} projects={projects} />
    </div>
  );
}
