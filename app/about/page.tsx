import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Marwan Diallo — security engineer, founder, writer.",
};

const roles = [
  {
    years: "2023 –",
    title: "Sr. Security Engineer",
    org: "Microsoft",
    note: "Cloud & Azure.",
  },
  {
    years: "2019 – 23",
    title: "Security Engineer",
    org: "BNY Mellon",
    note: "Financial services.",
  },
  {
    years: "2015 – 19",
    title: "Infrastructure & Security",
    org: "New York State",
    note: "Public sector.",
  },
];

const thinking = [
  "Identity is the actual security perimeter.",
  "Most \u201CAI-powered\u201D security tools are priced like a theory.",
  "The slow way is usually the fast way.",
  "Infrastructure that exists is not infrastructure that works.",
];

export default function AboutPage() {
  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-12"
      >
        ← Back
      </Link>
      {/* Intro — tight, two paragraphs */}
      <section className="mb-20">
        <h1 className="text-[2rem] md:text-[2.4rem] leading-[1.15] tracking-[-0.025em] text-[var(--color-ink)] font-medium">
          A security engineer who came up through infrastructure.
        </h1>
        <div className="mt-8 text-[1.02rem] leading-[1.72] text-[var(--color-ink-soft)] space-y-4 max-w-[560px]">
          <p>
            Active Directory, Exchange, VMware — the unglamorous layer that
            keeps companies alive. Security was a detour that became the job.
            Ten years in, I still think identity is the most interesting problem
            in the field.
          </p>
          <p>
            On the side I run{" "}
            <a
              href="https://security.diallogroup.io"
              className="text-[var(--color-ink)] underline decoration-[var(--color-rule)] underline-offset-[5px] hover:decoration-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Diallo Group
            </a>
            — a small advisory practice helping mid-market companies retire
            phishing instead of managing it. Identity-first programs, the kind
            of work I've done inside teams for a decade, just packaged for
            companies that don't have a CISO yet.
          </p>
          <p>
            I came up writing code before I came up writing policies. Computer
            science at SUNY Albany, then years on infrastructure, then security.
            Lately I've been coding again — evenings and weekends — small
            Next.js and React apps that mostly exist so I can see where AI
            coding tools still ship insecure defaults. The offensive instinct
            from the security side meets the builder instinct from the
            engineering side. Both stay sharper that way.
          </p>
        </div>
      </section>

      {/* Roles timeline */}
      <section className="mb-16">
        <h2 className="text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-muted)] mb-5">
          Roles
        </h2>
        <ul>
          {roles.map((r) => (
            <li
              key={r.years}
              className="grid grid-cols-[5.5rem_1fr] gap-4 py-4 border-t border-[var(--color-rule)] last:border-b"
            >
              <span className="text-[0.78rem] tabular-nums text-[var(--color-secondary)] pt-0.5">
                {r.years}
              </span>
              <div>
                <div className="text-[0.98rem] text-[var(--color-ink)]">
                  {r.title} ·{" "}
                  <span className="text-[var(--color-ink-soft)]">{r.org}</span>
                </div>
                <div className="text-[0.85rem] text-[var(--color-ink-muted)] mt-0.5">
                  {r.note}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Thinking — pulled out into visual bullets */}
      <section className="mb-16">
        <h2 className="text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-muted)] mb-5">
          Thinking about
        </h2>
        <ul className="space-y-3">
          {thinking.map((t, i) => (
            <li
              key={i}
              className="flex gap-3 text-[0.98rem] leading-[1.55] text-[var(--color-ink-soft)]"
            >
              <span className="text-[var(--color-accent)] tabular-nums text-[0.8rem] pt-1 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Credentials — pills */}
      <section className="mb-16">
        <h2 className="text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-muted)] mb-5">
          Credentials
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            "CISSP",
            "Microsoft SC-100",
            "AZ-500",
            "AWS Solutions Architect",
          ].map((c) => (
            <span
              key={c}
              className="text-[0.8rem] px-3 py-1 rounded-full border border-[var(--color-rule)] text-[var(--color-ink-soft)] bg-[var(--color-bg-elev)]"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Off-hours */}
      <section className="mb-16">
        <h2 className="text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-muted)] mb-5">
          Off-hours
        </h2>
        <dl className="grid grid-cols-[6.5rem_1fr] gap-y-3 gap-x-4 text-[0.95rem] leading-[1.55]">
          <dt className="text-[var(--color-secondary)] text-[0.78rem] uppercase tracking-[0.18em] pt-0.5">
            Building
          </dt>
          <dd className="text-[var(--color-ink-soft)]">
            Small Next.js and React apps. Vibe-coding the way most of the
            internet now does — partly to enjoy it, partly to map where AI tools
            still skip secure-by-default.
          </dd>
          <dt className="text-[var(--color-secondary)] text-[0.78rem] uppercase tracking-[0.18em] pt-0.5">
            Watching
          </dt>
          <dd className="text-[var(--color-ink-soft)]">
            Agentic identities, the next attack surface. The seam between server
            and client rendering. Where the AI coding stack is still quietly
            insecure by default.
          </dd>
          <dt className="text-[var(--color-secondary)] text-[0.78rem] uppercase tracking-[0.18em] pt-0.5">
            Reading
          </dt>
          <dd className="text-[var(--color-ink-soft)]">
            History, systems thinking, the occasional novel. Recently:{" "}
            <em>The Unaccountability Machine</em>.
          </dd>
          <dt className="text-[var(--color-secondary)] text-[0.78rem] uppercase tracking-[0.18em] pt-0.5">
            Running
          </dt>
          <dd className="text-[var(--color-ink-soft)]">
            Slow miles before the world wakes up.
          </dd>
          <dt className="text-[var(--color-secondary)] text-[0.78rem] uppercase tracking-[0.18em] pt-0.5">
            Guinea
          </dt>
          <dd className="text-[var(--color-ink-soft)]">
            Thinking about what AI changes for the country I came from. The tech
            gap is real, but it might also be the first generation that closes
            faster than it widens.
          </dd>
        </dl>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-muted)] mb-5">
          Education
        </h2>
        <ul>
          <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-4 border-t border-[var(--color-rule)] last:border-b">
            <span className="text-[0.78rem] tabular-nums text-[var(--color-secondary)] pt-0.5">
              2011 – 15
            </span>
            <div>
              <div className="text-[0.98rem] text-[var(--color-ink)]">
                B.S. Computer Science ·{" "}
                <span className="text-[var(--color-ink-soft)]">
                  SUNY Albany
                </span>
              </div>
              <div className="text-[0.85rem] text-[var(--color-ink-muted)] mt-0.5">
                Teaching assistant, intro CS. Started writing code before I
                started writing policies.
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
