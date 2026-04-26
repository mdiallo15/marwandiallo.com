/** @type {import('next').NextConfig} */

// Security headers — aligns with OWASP Secure Headers Project,
// CIS Apache/Nginx benchmarks, and NIST SP 800-218 (PW.4) guidance.
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
  // Content Security Policy
  // - 'unsafe-inline' on script-src is required for the FOUC theme bootstrap
  //   inline script in app/layout.tsx; everything else is locked down.
  // - 'unsafe-inline' on style-src needed for Tailwind/Next inline styles.
  // - data: in img-src for the inline SVGs / favicon.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://vitals.vercel-insights.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  // Cross-origin isolation — relaxed since we have no cross-origin needs
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // remove X-Powered-By: Next.js fingerprint
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};
export default nextConfig;
