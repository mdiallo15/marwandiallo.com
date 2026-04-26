/**
 * Inline SVG artwork for each card. Uses currentColor where possible so
 * tiles inherit theme. Each piece is a stylized mockup that hints at what
 * the post or project is about.
 */

interface Props {
  slug: string;
}

export function CardArtwork({ slug }: Props) {
  switch (slug) {
    case "infrastructure-taught-me-about-ai":
      return <StackArtwork />;
    case "consulting-firm-from-a-text-editor":
      return <EditorArtwork />;
    case "identity-is-the-perimeter":
      return <IdentityArtwork />;
    case "secure-by-default-starter":
      return <CodeHeadersArtwork />;
    case "ai-codegen-audit":
      return <DiffArtwork />;
    case "identity-lab":
      return <PasskeyArtwork />;
    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Essay: ten years in infrastructure → AI                                     */
/* Three stacked layers: VMs → containers → agents                              */
/* -------------------------------------------------------------------------- */
function StackArtwork() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="card-art"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="stack-vm" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="stack-c" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="stack-a" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      {/* Layer labels */}
      <text x="22" y="48" className="art-label">
        VMs
      </text>
      <text x="22" y="100" className="art-label">
        Containers
      </text>
      <text x="22" y="152" className="art-label">
        Agents
      </text>

      {/* Layer rows */}
      <g transform="translate(110, 32)">
        <rect width="40" height="28" rx="4" fill="url(#stack-vm)" />
        <rect
          x="48"
          width="40"
          height="28"
          rx="4"
          fill="url(#stack-vm)"
          opacity="0.85"
        />
        <rect
          x="96"
          width="40"
          height="28"
          rx="4"
          fill="url(#stack-vm)"
          opacity="0.7"
        />
        <rect
          x="144"
          width="40"
          height="28"
          rx="4"
          fill="url(#stack-vm)"
          opacity="0.55"
        />
      </g>
      <g transform="translate(110, 84)">
        <rect width="28" height="28" rx="4" fill="url(#stack-c)" />
        <rect
          x="34"
          width="28"
          height="28"
          rx="4"
          fill="url(#stack-c)"
          opacity="0.85"
        />
        <rect
          x="68"
          width="28"
          height="28"
          rx="4"
          fill="url(#stack-c)"
          opacity="0.75"
        />
        <rect
          x="102"
          width="28"
          height="28"
          rx="4"
          fill="url(#stack-c)"
          opacity="0.6"
        />
        <rect
          x="136"
          width="28"
          height="28"
          rx="4"
          fill="url(#stack-c)"
          opacity="0.5"
        />
        <rect
          x="170"
          width="28"
          height="28"
          rx="4"
          fill="url(#stack-c)"
          opacity="0.4"
        />
      </g>
      <g transform="translate(110, 136)">
        <circle cx="14" cy="14" r="14" fill="url(#stack-a)" />
        <circle cx="48" cy="14" r="14" fill="url(#stack-a)" opacity="0.8" />
        <circle cx="82" cy="14" r="14" fill="url(#stack-a)" opacity="0.65" />
        <circle cx="116" cy="14" r="14" fill="url(#stack-a)" opacity="0.5" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Essay: consulting firm from a text editor                                   */
/* Markdown editor with bullet list + cursor                                    */
/* -------------------------------------------------------------------------- */
function EditorArtwork() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="card-art"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Editor frame */}
      <rect
        x="20"
        y="22"
        width="280"
        height="156"
        rx="8"
        className="art-panel"
      />
      {/* Title bar */}
      <rect
        x="20"
        y="22"
        width="280"
        height="22"
        rx="8"
        className="art-panel-bar"
      />
      <circle cx="34" cy="33" r="3.5" fill="#fb7185" />
      <circle cx="46" cy="33" r="3.5" fill="#fbbf24" />
      <circle cx="58" cy="33" r="3.5" fill="#34d399" />
      <text x="148" y="37" className="art-tab">
        firm.md
      </text>

      {/* Markdown content */}
      <text x="36" y="68" className="art-md-h">
        ## clients
      </text>
      <text x="36" y="90" className="art-md-li">
        - ack: scope
      </text>
      <text x="36" y="108" className="art-md-li">
        - send: contract
      </text>
      <text x="36" y="126" className="art-md-li">
        - invoice: net 15
      </text>
      <text x="36" y="148" className="art-md-h">
        ## next
      </text>
      <text x="36" y="166" className="art-md-cursor">
        - write a thing<tspan className="art-caret">|</tspan>
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Essay: identity is the perimeter                                            */
/* Identity ring with token spokes                                             */
/* -------------------------------------------------------------------------- */
function IdentityArtwork() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="card-art"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Center user */}
      <circle cx="160" cy="100" r="22" className="art-ring-center" />
      <circle cx="160" cy="92" r="6" className="art-ring-head" />
      <path d="M 145 116 Q 160 102 175 116 Z" className="art-ring-shoulders" />

      {/* Surrounding ring */}
      <circle
        cx="160"
        cy="100"
        r="62"
        fill="none"
        className="art-ring"
        strokeDasharray="3 5"
      />

      {/* Token nodes */}
      <g className="art-token">
        <circle cx="160" cy="38" r="9" />
        <text x="160" y="42" textAnchor="middle">
          SSO
        </text>
      </g>
      <g className="art-token">
        <circle cx="222" cy="100" r="9" />
        <text x="222" y="104" textAnchor="middle">
          2FA
        </text>
      </g>
      <g className="art-token">
        <circle cx="160" cy="162" r="9" />
        <text x="160" y="166" textAnchor="middle">
          JWT
        </text>
      </g>
      <g className="art-token">
        <circle cx="98" cy="100" r="9" />
        <text x="98" y="104" textAnchor="middle">
          RBAC
        </text>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Project: secure-by-default starter                                          */
/* Code editor showing CSP / headers config                                    */
/* -------------------------------------------------------------------------- */
function CodeHeadersArtwork() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="card-art card-art--dark"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="0" y="0" width="320" height="200" fill="#0f172a" />
      {/* gutter */}
      <rect x="0" y="0" width="32" height="200" fill="#0a0f1f" />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => (
        <text
          key={n}
          x="22"
          y={28 + i * 18}
          textAnchor="end"
          className="art-code-num"
        >
          {n}
        </text>
      ))}
      {/* lines */}
      <text x="40" y="28" className="art-code">
        <tspan className="art-code-key">export</tspan>{" "}
        <tspan className="art-code-key">const</tspan>{" "}
        <tspan className="art-code-var">headers</tspan> = {"{"}
      </text>
      <text x="56" y="46" className="art-code">
        <tspan className="art-code-str">&apos;CSP&apos;</tspan>:{" "}
        <tspan className="art-code-str">&apos;default-src self&apos;</tspan>,
      </text>
      <text x="56" y="64" className="art-code">
        <tspan className="art-code-str">&apos;HSTS&apos;</tspan>:{" "}
        <tspan className="art-code-str">&apos;max-age=63072000&apos;</tspan>,
      </text>
      <text x="56" y="82" className="art-code">
        <tspan className="art-code-str">&apos;X-Frame&apos;</tspan>:{" "}
        <tspan className="art-code-str">&apos;DENY&apos;</tspan>,
      </text>
      <text x="56" y="100" className="art-code">
        <tspan className="art-code-str">&apos;Referrer&apos;</tspan>:{" "}
        <tspan className="art-code-str">&apos;same-origin&apos;</tspan>,
      </text>
      <text x="56" y="118" className="art-code">
        <tspan className="art-code-str">&apos;COOP&apos;</tspan>:{" "}
        <tspan className="art-code-str">&apos;same-origin&apos;</tspan>,
      </text>
      <text x="40" y="136" className="art-code">
        {"}"};
      </text>
      <text x="40" y="160" className="art-code">
        <tspan className="art-code-comment">// safe by default</tspan>
      </text>
      <text x="40" y="178" className="art-code">
        <tspan className="art-code-comment">// not opt-in</tspan>
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Project: AI codegen audit                                                   */
/* Diff viewer with red/green lines                                            */
/* -------------------------------------------------------------------------- */
function DiffArtwork() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="card-art"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="0" y="0" width="320" height="200" fill="#fafafa" />
      {/* removed */}
      <rect x="0" y="20" width="320" height="20" fill="#fee2e2" />
      <text x="14" y="34" className="art-diff-minus">
        -
      </text>
      <text x="32" y="34" className="art-diff-text">
        eval(userInput);
      </text>
      <rect x="0" y="40" width="320" height="20" fill="#fee2e2" />
      <text x="14" y="54" className="art-diff-minus">
        -
      </text>
      <text x="32" y="54" className="art-diff-text">
        innerHTML = data;
      </text>
      {/* added */}
      <rect x="0" y="60" width="320" height="20" fill="#dcfce7" />
      <text x="14" y="74" className="art-diff-plus">
        +
      </text>
      <text x="32" y="74" className="art-diff-text">
        JSON.parse(userInput);
      </text>
      <rect x="0" y="80" width="320" height="20" fill="#dcfce7" />
      <text x="14" y="94" className="art-diff-plus">
        +
      </text>
      <text x="32" y="94" className="art-diff-text">
        textContent = data;
      </text>
      {/* context */}
      <text x="32" y="118" className="art-diff-ctx">
        sanitize(input);
      </text>
      <text x="32" y="136" className="art-diff-ctx">
        return safe;
      </text>
      {/* footer score */}
      <rect x="0" y="160" width="320" height="40" fill="#f1f5f9" />
      <text x="14" y="184" className="art-diff-grade">
        Audit
      </text>
      <text x="270" y="184" className="art-diff-score" textAnchor="end">
        B+
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Project: identity lab — passkey / login mockup                              */
/* -------------------------------------------------------------------------- */
function PasskeyArtwork() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="card-art"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {/* card */}
      <rect
        x="60"
        y="28"
        width="200"
        height="144"
        rx="10"
        className="art-panel"
      />
      <text x="160" y="56" textAnchor="middle" className="art-pk-title">
        Sign in
      </text>
      {/* email */}
      <rect
        x="80"
        y="72"
        width="160"
        height="22"
        rx="5"
        className="art-input"
      />
      <text x="88" y="87" className="art-input-label">
        name@domain.com
      </text>
      {/* divider */}
      <line x1="80" y1="106" x2="240" y2="106" className="art-divider" />
      {/* passkey button */}
      <rect
        x="80"
        y="118"
        width="160"
        height="30"
        rx="6"
        className="art-btn-primary"
      />
      <circle cx="100" cy="133" r="6" fill="#ffffff" opacity="0.95" />
      <rect x="98" y="129" width="4" height="6" rx="1" fill="#1e3a8a" />
      <text x="160" y="138" textAnchor="middle" className="art-btn-text">
        Continue with Passkey
      </text>
      {/* footer */}
      <text x="160" y="164" textAnchor="middle" className="art-pk-foot">
        WebAuthn · FIDO2
      </text>
    </svg>
  );
}
