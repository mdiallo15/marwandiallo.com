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
    slug: "agent-identity-lab",
    title: "Agent Identity Lab",
    date: "2026-05-02",
    summary:
      "RFC 8693 token exchange in motion. Pick a passkey-authenticated user, an agent (with one of four attestation surfaces), scopes, a TTL — see the delegated token, the act claim, the audit-log line. Plus an 8-rule drift detector on a fixture inventory and a six-surface attestation primer.",
    status: "shipped",
    url: "https://lab.marwandiallo.com/agent-identity",
    tag: "ai",
  },
  {
    slug: "labs-hub",
    title: "Labs",
    date: "2026-04-27",
    summary:
      "Six hands-on security playgrounds in one place: phishing-resistant identity, agent identity / RFC 8693 delegation, Content Security Policy, prompt injection, SSRF / cloud metadata, and IDOR / BOLA. Each lab pairs a working tool or simulator with the failure modes I've seen in production.",
    status: "shipped",
    url: "https://lab.marwandiallo.com",
    tag: "security",
  },
  {
    slug: "authz-lab",
    title: "AuthZ Lab — IDOR / BOLA",
    date: "2026-04-27",
    summary:
      "OWASP API Top 10 #1 made tangible. Pick a user, ask for someone else's order, and watch the naive endpoint hand it over while the hardened one returns 404 — not 403, because 403 leaks existence. Plus an 8-rule pattern catalog with SARIF export.",
    status: "shipped",
    url: "https://lab.marwandiallo.com/authz",
    tag: "security",
  },
  {
    slug: "ssrf-lab",
    title: "SSRF / Cloud Metadata Lab",
    date: "2026-04-26",
    summary:
      "Why 169.254.169.254 is the most-attacked IP on the internet. URL-bypass analyzer (decimal, hex, octal, alias hostnames), the five canonical SSRF targets, and the four hardening layers that actually contain blast radius.",
    status: "shipped",
    url: "https://lab.marwandiallo.com/ssrf",
    tag: "infra",
  },
  {
    slug: "prompt-injection-lab",
    title: "Prompt Injection Lab",
    date: "2026-04-26",
    summary:
      "Backendless naive-vs-hardened agent simulator. Six attacker-crafted documents (direct override, exfil-via-image, fake tool boundaries, white-on-white, on-behalf-of confusion), a 10-rule detector, and a defense playbook ranked by impact.",
    status: "shipped",
    url: "https://lab.marwandiallo.com/prompt-injection",
    tag: "ai",
  },
  {
    slug: "csp-playground",
    title: "CSP Playground",
    date: "2026-05-03",
    summary:
      "A real iframe enforcing whatever Content-Security-Policy you paste, with every violation piped into a console mirror. Ten preset bypass scenarios — JSONP-on-allowlist, dangling-markup, 'strict-dynamic' without a nonce, eval, wildcards — plus a 12-rule paste-or-scan analyzer that exports to SARIF for GitHub Code Scanning.",
    status: "shipped",
    url: "https://lab.marwandiallo.com/csp",
    tag: "security",
  },
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
      "Phishing-resistant authentication, hands-on. WebAuthn passkey demo, JWT analyzer with 8 alg-confusion / PII findings, and explainers for phishing-resistant MFA and agent / workload identity.",
    status: "shipped",
    url: "https://lab.marwandiallo.com/identity",
    tag: "identity",
  },
];

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => (a.date < b.date ? 1 : -1));
}
