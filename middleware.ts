import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Nonce-based CSP — drops 'unsafe-inline' from script-src AND style-src
// by injecting a per-request nonce. Next 15 picks up x-nonce automatically
// and applies it to its own runtime <script>/<style> tags. Tailwind ships
// as external CSS so it doesn't need a nonce.
// Refs:
//   https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
//   https://www.w3.org/TR/CSP3/#directive-report-to
//   https://w3c.github.io/reporting/#header
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://va.vercel-scripts.com`,
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
    "img-src 'self' data: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://vitals.vercel-insights.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
    // Reporting — modern Reporting API + legacy report-uri fallback.
    // Both point at the same endpoint; browsers prefer report-to when
    // the Report-To response header is set (below).
    "report-to csp-endpoint",
    "report-uri /api/csp-report",
  ].join("; ");

  // Report-To header advertises the endpoint group used by report-to.
  // max_age=10886400s ≈ 18 weeks; standard recommendation.
  const reportTo = JSON.stringify({
    group: "csp-endpoint",
    max_age: 10886400,
    endpoints: [{ url: "/api/csp-report" }],
    include_subdomains: true,
  });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Report-To", reportTo);
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
