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
      "A Next.js 15 template with CSP, security headers, audit logging, rate limiting, and a sane server/client boundary on day one. Built because most starters don't.",
    status: "in-progress",
    tag: "security",
  },
  {
    slug: "ai-codegen-audit",
    title: "AI Codegen Audit",
    date: "2026-03-12",
    summary:
      "A small CLI that grades AI-generated React/Next code against a checklist drawn from OWASP and real production failures. Runs locally — no code leaves the machine.",
    status: "exploring",
    tag: "ai",
  },
  {
    slug: "identity-lab",
    title: "Identity Lab",
    date: "2026-02-20",
    summary:
      "WebAuthn and passkey reference flows with the rough edges left in. Where I work out the things I'd otherwise have to learn the expensive way at a client.",
    status: "in-progress",
    tag: "identity",
  },
];

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => (a.date < b.date ? 1 : -1));
}
