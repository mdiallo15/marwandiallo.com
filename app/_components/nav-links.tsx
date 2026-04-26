"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/writing", label: "Writing" },
  { href: "/now", label: "Now" },
  { href: "/about", label: "About" },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-7 text-[var(--color-ink-muted)]">
      {items.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link"
            data-active={active ? "true" : "false"}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
