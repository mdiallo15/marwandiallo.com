import Link from "next/link";

interface Item {
  href: string;
  label: string;
}

export function ContextLinks({ items }: { items: Item[] }) {
  return (
    <div className="flex flex-wrap justify-end gap-6 text-[0.78rem] uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="hover:text-[var(--color-ink)] transition-colors"
        >
          {item.label} →
        </Link>
      ))}
    </div>
  );
}
