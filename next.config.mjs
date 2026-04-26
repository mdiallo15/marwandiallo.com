/** @type {import('next').NextConfig} */

// Security headers — aligns with OWASP Secure Headers Project,
// CIS Apache/Nginx benchmarks, and NIST SP 800-218 (PW.4) guidance.
// CSP is set per-request in middleware.ts (nonce-based).
const securityHeaders = [
  // Force TLS — HSTS with preload-eligible config
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Disallow MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Clickjacking protection (legacy header for older browsers; CSP handles modern)
  { key: "X-Frame-Options", value: "DENY" },
  // Referrer minimization
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable powerful browser features we don't use
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
  },
  // Cross-origin opener — keep window isolated
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // CORP set to cross-origin so social card scrapers (Twitter, FB,
  // LinkedIn, Slack) can fetch /opengraph-image. No private data here.
  { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // remove X-Powered-By: Next.js fingerprint
  async headers() {
    // Skip strict headers in dev — Next.js HMR needs eval/ws/inline
    // styles that production builds don't. Headers ship in prod only.
    if (process.env.NODE_ENV !== "production") {
      return [];
    }
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};
export default nextConfig;
