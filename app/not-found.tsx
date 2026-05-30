import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-12"
      >
        ← Back
      </Link>
      <header className="mb-10">
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--color-ink-muted)] tabular-nums mb-4">
          404
        </p>
        <h1 className="text-[2rem] md:text-[2.4rem] leading-[1.1] tracking-[-0.025em] text-[var(--color-ink)] font-medium">
          This page wandered off.
        </h1>
        <p className="mt-5 text-[1rem] leading-[1.65] text-[var(--color-ink-soft)] max-w-[58ch]">
          Nothing lives at that URL. It may have been moved, renamed, or
          never existed in the first place. Try one of these instead.
        </p>
      </header>
      <ul className="border-t border-[var(--color-rule)]">
        {[
          { href: "/", label: "Home", note: "Recent writing and projects." },
          { href: "/writing", label: "Writing", note: "Every essay, by date." },
          { href: "/projects", label: "Projects", note: "Things I’ve built." },
          { href: "/about", label: "About", note: "Background and current work." },
        ].map((row) => (
          <li
            key={row.href}
            className="border-b border-[var(--color-rule)]"
          >
            <Link
              href={row.href}
              className="group block py-5 transition-colors hover:bg-[var(--color-bg-elev)]"
            >
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                <span className="text-[1.05rem] leading-[1.35] text-[var(--color-ink)] underline decoration-transparent decoration-1 underline-offset-[3px] transition-[text-decoration-color] group-hover:decoration-[var(--color-ink)]">
                  {row.label}
                </span>
                <span className="text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-ink-muted)] whitespace-nowrap">
                  →
                </span>
              </div>
              <p className="mt-1.5 text-[0.92rem] leading-[1.6] text-[var(--color-ink-soft)] max-w-[58ch]">
                {row.note}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
