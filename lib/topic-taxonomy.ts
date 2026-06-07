export const TOPICS = [
  {
    slug: "identity",
    label: "Identity",
    description:
      "Human identity, agent identity, delegation, authentication, and directory controls.",
  },
  {
    slug: "ai-security",
    label: "AI Security",
    description:
      "Agent risk, browser agents, prompt injection, and the security edge cases around AI systems.",
  },
  {
    slug: "vulnerability-management",
    label: "Vulnerability Management",
    description:
      "Scanner coverage, hardening, exposure visibility, and the operational side of finding and fixing risk.",
  },
  {
    slug: "application-security",
    label: "Application Security",
    description:
      "Hands-on labs and tooling for web security failures, API authorization, CSP, and secure-by-default builds.",
  },
  {
    slug: "cloud-infrastructure",
    label: "Cloud / Infrastructure",
    description:
      "Infrastructure lessons, SSRF and metadata exposure, and the security shape of modern platforms.",
  },
  {
    slug: "supply-chain",
    label: "Supply Chain",
    description:
      "SBOM semantics, software inventory, dependency identity, and supply-chain visibility.",
  },
  {
    slug: "building",
    label: "Building",
    description:
      "Firm-building, operating choices, and the mechanics of building security work in public.",
  },
] as const;

export type TopicSlug = (typeof TOPICS)[number]["slug"];

export interface TopicDef {
  slug: TopicSlug;
  label: string;
  description: string;
}

export function isTopicSlug(value: string): value is TopicSlug {
  return TOPICS.some((topic) => topic.slug === value);
}

export function getTopic(slug: string): TopicDef | null {
  return TOPICS.find((topic) => topic.slug === slug) ?? null;
}
