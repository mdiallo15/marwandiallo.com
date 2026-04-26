export interface Project {
  slug: string;
  title: string;
  date: string; // ISO — when it was started or last shipped
  summary: string;
  status: "exploring" | "in-progress" | "shipped";
  url?: string; // external link
  /** rough thematic tag — used for the colored corner on the card */
  tag?: "security" | "ai" | "identity" | "infra";
}

// ----------------------------------------------------------------------
// EDIT THESE: rename, replace summaries, fill in real URLs.
// Status drives the small badge color on the card.
// Order matters — newest first.
// ----------------------------------------------------------------------
export const projects: Project[] = [
  {
    slug: "secure-by-default-starter",
    title: "Secure-by-default Next.js Starter",
    date: "2026-04-01",
    summary:
      "Next.js 15 template that boots with nonce-based CSP, the OWASP/CIS header set, rate limiting, Zod input validation, and an audit log helper. Aligned with NIST SP 800-218.",
    status: "shipped",
    url: "https://github.com/mdiallo15/secure-next-starter",
    tag: "security",
  },
  {
    slug: "ai-codegen-audit",
    title: "AI Codegen Audit",
    date: "2026-03-12",
    summary:
      "Zero-dependency CLI that flags the security footguns LLM code generators emit — eval, innerHTML, alg-confused JWTs, hardcoded secrets, weak crypto. CWE-mapped, OWASP-categorized.",
    status: "shipped",
    url: "https://github.com/mdiallo15/ai-codegen-audit",
    tag: "ai",
  },
  {
    slug: "identity-lab",
    title: "Identity Lab",
    date: "2026-02-20",
    summary:
      "Interactive JWT inspector with security findings (alg=none, alg-confusion, missing exp/iss/aud) and a working WebAuthn / passkey registration + sign-in flow.",
    status: "shipped",
    url: "https://github.com/mdiallo15/identity-lab",
    tag: "identity",
  },
];

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => (a.date < b.date ? 1 : -1));
}
