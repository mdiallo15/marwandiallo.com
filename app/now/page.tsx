import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm focused on right now.",
};

const blocks = [
  {
    label: "Diallo Group",
    body: "Small advisory practice for mid-market companies that want phishing-resistant identity, not another dashboard. First pilot engagement in motion.",
  },
  {
    label: "Day job",
    body: "Conditional access and identity at Microsoft scale. The boring controls that actually move risk.",
  },
  {
    label: "Building",
    body: "A few small Next.js and React apps in evenings. Half product, half lab — testing where AI coding tools still ship insecure defaults.",
  },
  {
    label: "Watching",
    body: "Agentic identities. AI in the SDLC. The Next.js server/client seam where most teams now leak data without noticing.",
  },
  {
    label: "Reading",
    body: "The Unaccountability Machine. Re-reading Cal Newport on slow productivity.",
  },
  {
    label: "Quiet",
    body: "Running. Coffee at 6am. No meetings before 10.",
  },
];

export default function NowPage() {
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
          Now
        </h1>
        <span className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--color-ink-muted)] tabular-nums pb-2">
          Apr 2026
        </span>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
        {blocks.map((b) => (
          <div
            key={b.label}
            className="group relative rounded-lg p-5 pl-6 bg-[var(--color-bg-elev)]/60 border border-[var(--color-rule)]/80 transition-colors hover:bg-[var(--color-bg-elev)] hover:border-[var(--color-accent-soft)]"
          >
            <span
              aria-hidden
              className="absolute left-0 top-5 bottom-5 w-[2px] rounded-full bg-[var(--color-secondary-soft)] group-hover:bg-[var(--color-accent)] transition-colors"
            />
            <div className="text-[0.66rem] uppercase tracking-[0.24em] text-[var(--color-secondary)] mb-2.5">
              {b.label}
            </div>
            <p className="text-[0.95rem] leading-[1.6] text-[var(--color-ink-soft)]">
              {b.body}
            </p>
          </div>
        ))}
      </section>

      <p className="text-[0.8rem] text-[var(--color-ink-muted)]">
        A{" "}
        <a
          href="https://nownownow.com/about"
          className="underline decoration-[var(--color-rule)] underline-offset-4 hover:decoration-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          /now page
        </a>
        . Updated when the answer changes.
      </p>
    </div>
  );
}
