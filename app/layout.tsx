import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const SITE_URL = "https://marwandiallo.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marwan Diallo",
    template: "%s — Marwan Diallo",
  },
  description:
    "Security leader and founder. Notes on identity, infrastructure, and the long arc of building.",
  openGraph: {
    type: "website",
    siteName: "Marwan Diallo",
    title: "Marwan Diallo",
    description:
      "Security leader and founder. Notes on identity, infrastructure, and the long arc of building.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@marwandiallo",
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Marwan Diallo" }],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto w-full max-w-[640px] px-5 pt-10 pb-24 md:pt-16">
          <nav className="mb-14 flex items-center justify-between text-[0.95rem]">
            <Link
              href="/"
              className="no-underline font-semibold tracking-tight hover:text-[var(--color-accent)]"
            >
              Marwan Diallo
            </Link>
            <div className="flex items-center gap-5 text-[var(--color-ink-soft)]">
              <Link href="/writing" className="no-underline hover:text-[var(--color-accent)]">
                Writing
              </Link>
              <Link href="/now" className="no-underline hover:text-[var(--color-accent)]">
                Now
              </Link>
              <Link href="/about" className="no-underline hover:text-[var(--color-accent)]">
                About
              </Link>
            </div>
          </nav>
          <main>{children}</main>
          <footer className="mt-24 pt-8 border-t border-[var(--color-rule)] text-[0.85rem] text-[var(--color-ink-muted)] flex items-center justify-between">
            <span>Raleigh, NC · Conakry, GN</span>
            <span>
              <a href="/feed.xml" className="no-underline">
                rss
              </a>
            </span>
          </footer>
        </div>
      </body>
    </html>
  );
}
