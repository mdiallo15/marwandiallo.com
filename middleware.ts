import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Nonce-based CSP — drops 'unsafe-inline' from script-src by injecting
// a per-request nonce + strict-dynamic. Next 15 picks up x-nonce
// automatically and applies it to its own runtime <script> tags.
// Ref: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://va.vercel-scripts.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://vitals.vercel-insights.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

// Skip prefetches and static asset routes — CSP only matters for HTML.
export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|opengraph-image|twitter-image|icon|apple-icon|robots.txt|sitemap.xml|feed.xml).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
