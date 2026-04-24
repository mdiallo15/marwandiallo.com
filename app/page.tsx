import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/writing";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 8);

  return (
    <div>
      <section className="mb-16 text-[1.05rem] leading-[1.75] text-[var(--color-ink-soft)]">
        <p className="text-[var(--color-ink)] mb-5">
          I'm Marwan. I work on security at a Fortune 500 tech company, and I'm
          building{" "}
          <Link
            href="https://security.diallogroup.io"
            className="hover:text-[var(--color-accent)]"
          >
            Diallo Group
          </Link>{" "}
          — a consulting firm I operate from a text editor.
        </p>
        <p className="mb-5">
          I came up through infrastructure — Active Directory, Exchange, VMware,
          the unglamorous layer that keeps companies alive. Security was a
          detour that became the job. Ten years in, I still think identity is
          the most interesting problem in the field.
        </p>
        <p>
          I was born in Guinea. Most of what I write is eventually about that —
          the gap between places that have infrastructure and places that don't,
          and what it means to build in both.
        </p>
      </section>

      <section>
        <h2 className="text-[0.75rem] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mb-6 font-sans">
          Writing
        </h2>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-4 no-underline"
              >
                <span className="group-hover:text-[var(--color-accent)]">
                  {post.title}
                </span>
                <span className="text-[0.8rem] text-[var(--color-ink-muted)] tabular-nums font-sans whitespace-nowrap">
                  {formatDate(post.date)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {posts.length >= 6 && (
          <div className="mt-6">
            <Link
              href="/writing"
              className="text-[0.9rem] text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]"
            >
              all writing →
            </Link>
          </div>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-[0.75rem] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mb-6 font-sans">
          Elsewhere
        </h2>
        <ul className="space-y-2 text-[var(--color-ink-soft)]">
          <li>
            <a
              href="https://security.diallogroup.io"
              className="hover:text-[var(--color-accent)]"
            >
              Diallo Security Advisors
            </a>{" "}
            — my firm
          </li>
          <li>
            <a
              href="https://github.com/mdiallo15"
              className="hover:text-[var(--color-accent)]"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/marwandiallo/"
              className="hover:text-[var(--color-accent)]"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="mailto:hello@marwandiallo.com"
              className="hover:text-[var(--color-accent)]"
            >
              hello@marwandiallo.com
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
