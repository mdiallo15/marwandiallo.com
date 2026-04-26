import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { ThemeToggle } from "./_components/theme-toggle";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marwan Diallo — Security Architect & Builder",
    template: "%s — Marwan Diallo",
  },
  description:
    "Security architect by trade, builder by habit. Notes from the seam between AI coding tools, identity, and the production reality of shipping secure software.",
  openGraph: {
    type: "website",
    siteName: "Marwan Diallo",
    title: "Marwan Diallo — Security Architect & Builder",
    description:
      "Security architect by trade, builder by habit. Notes from the seam between AI coding tools, identity, and the production reality of shipping secure software.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@x_marwan_",
    title: "Marwan Diallo — Security Architect & Builder",
    description:
      "Security architect by trade, builder by habit. Notes from the seam between AI coding tools, identity, and the production reality of shipping secure software.",
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Marwan Diallo" }],
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Prevent FOUC — apply theme before paint */}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
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
                  href="mailto:hello@marwandiallo.com"
                  className="hover:text-[var(--color-accent)]"
                >
                  Email
                </a>
                <a
                  href="/feed.xml"
                  className="hover:text-[var(--color-accent)]"
                >
                  RSS
                </a>
              </div>
              <span className="tabular-nums">© {new Date().getFullYear()}</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
