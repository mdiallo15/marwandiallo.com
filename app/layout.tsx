import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "./_components/theme-toggle";
import { ThemeBootstrap } from "./_components/theme-bootstrap";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE_URL = "https://marwandiallo.com";
const SITE_DESCRIPTION =
  "Security architect by trade, builder by habit. Notes from the seam between AI coding tools, identity, and the production reality of shipping secure software.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marwan Diallo — Security Architect & Builder",
    template: "%s — Marwan Diallo",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Marwan Diallo",
    title: "Marwan Diallo — Security Architect & Builder",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@marwanbuilds",
    title: "Marwan Diallo — Security Architect & Builder",
    description: SITE_DESCRIPTION,
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Eagerly emit a baseline <meta name="description"> in <head>.
            Next.js 15 streams the `metadata` flush after </head> when
            the root layout is dynamic (middleware reads cause this).
            Crawlers (and Lighthouse SEO) won't see the metadata-exported
            description otherwise. Per-route metadata still overrides
            via OpenGraph + dynamic <head> updates. */}
        <meta name="description" content={SITE_DESCRIPTION} />
        {/* Prevent FOUC — apply theme before paint. The bootstrap is a
            small async server component so the root layout itself stays
            sync and metadata can be hoisted into <head>. */}
        <ThemeBootstrap />
      </head>
      <body>
        <ThemeToggle />
        <div className="mx-auto w-full max-w-[1280px] px-6 pt-10 pb-20 md:px-16 md:pt-14 lg:px-24">
          <main>{children}</main>
          <footer className="mt-24 pt-6 border-t border-[var(--color-rule)] text-[0.8rem] text-[var(--color-ink-muted)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <a
                  href="https://github.com/mdiallo15"
                  className="hover:text-[var(--color-accent)]"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/marwandiallo/"
                  className="hover:text-[var(--color-accent)]"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/marwanbuilds"
                  className="hover:text-[var(--color-accent)]"
                >
                  X
                </a>
                <a
                  href="/feed.xml"
                  className="hover:text-[var(--color-accent)]"
                >
                  RSS
                </a>
              </div>
              <span className="tabular-nums">
                © {new Date().getFullYear()} Marwan Diallo. Code under MIT.
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
