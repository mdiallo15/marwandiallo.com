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
    case "labs-hub":
      return <LabsHubArtwork />;
    case "passwordless-and-your-agent":
      return <HumanAgentArtwork />;
    case "csp-playground":
      return <CspArtwork />;
    case "prompt-injection-lab":
      return <PromptInjectionArtwork />;
    case "ssrf-lab":
      return <SsrfArtwork />;
    case "i-built-a-scanner-then-scanned-myself":
      return <DogfoodArtwork />;
    case "authz-lab":
      return <AuthzArtwork />;
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

/* -------------------------------------------------------------------------- */
/* Essay: passwordless and your agent                                          */
/* Two parallel sign-in panels: human (passkey) + agent (token), linked by    */
/* a delegation arrow (RFC 8693 token exchange).                              */
/* -------------------------------------------------------------------------- */
function HumanAgentArtwork() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="card-art"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Human panel (left) */}
      <rect
        x="20"
        y="32"
        width="130"
        height="136"
        rx="10"
        className="art-panel"
      />
      <text x="85" y="56" textAnchor="middle" className="art-pk-title">
        Human
      </text>
      {/* Person glyph */}
      <circle cx="85" cy="84" r="10" className="art-ring-head" />
      <path d="M 68 110 Q 85 94 102 110 Z" className="art-ring-shoulders" />
      {/* Passkey chip */}
      <rect
        x="42"
        y="124"
        width="86"
        height="28"
        rx="6"
        className="art-btn-primary"
      />
      <circle cx="60" cy="138" r="6" fill="#ffffff" opacity="0.95" />
      <rect x="58" y="134" width="4" height="6" rx="1" fill="#1e3a8a" />
      <text x="98" y="142" textAnchor="middle" className="art-btn-text">
        Passkey
      </text>

      {/* Delegation arrow */}
      <g className="art-delegate">
        <line x1="156" y1="100" x2="194" y2="100" />
        <polygon points="194,100 188,96 188,104" />
        <text x="175" y="92" textAnchor="middle">
          act
        </text>
      </g>

      {/* Agent panel (right) */}
      <rect
        x="200"
        y="32"
        width="100"
        height="136"
        rx="10"
        className="art-panel"
      />
      <text x="250" y="56" textAnchor="middle" className="art-pk-title">
        Agent
      </text>
      {/* Robot/workload glyph */}
      <rect
        x="232"
        y="72"
        width="36"
        height="28"
        rx="5"
        className="art-agent-body"
      />
      <circle cx="242" cy="86" r="2.5" className="art-agent-eye" />
      <circle cx="258" cy="86" r="2.5" className="art-agent-eye" />
      <line x1="250" y1="64" x2="250" y2="72" className="art-agent-antenna" />
      <circle cx="250" cy="62" r="2.5" className="art-agent-antenna-dot" />
      {/* Token */}
      <rect
        x="216"
        y="116"
        width="68"
        height="20"
        rx="4"
        className="art-token-chip"
      />
      <text x="250" y="130" textAnchor="middle" className="art-token-chip-text">
        eyJhbGc...
      </text>
      <text x="250" y="152" textAnchor="middle" className="art-pk-foot">
        scope: read:repo
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Project: CSP Playground                                                    */
/* CSP header line with three severity findings stacked beneath               */
/* -------------------------------------------------------------------------- */
function CspArtwork() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="card-art card-art--dark"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="0" y="0" width="320" height="200" fill="#0f172a" />
      {/* Header label */}
      <text x="20" y="32" className="art-code">
        <tspan className="art-code-key">Content-Security-Policy:</tspan>
      </text>
      {/* Header value (wrapped) */}
      <text x="20" y="54" className="art-code">
        <tspan className="art-code-str">default-src</tspan>{" "}
        <tspan className="art-code-var">&apos;self&apos;</tspan>;
      </text>
      <text x="20" y="72" className="art-code">
        <tspan className="art-code-str">script-src</tspan>{" "}
        <tspan className="art-code-var">&apos;unsafe-inline&apos;</tspan>{" "}
        https:;
      </text>
      <text x="20" y="90" className="art-code">
        <tspan className="art-code-str">object-src</tspan>{" "}
        <tspan className="art-code-var">*</tspan>;
      </text>

      {/* Findings list */}
      <g transform="translate(20, 110)">
        {/* critical */}
        <rect x="0" y="0" width="280" height="22" rx="4" fill="#1e1027" />
        <rect x="0" y="0" width="3" height="22" fill="#f43f5e" />
        <text x="12" y="15" className="art-sev art-sev-crit">
          CRIT
        </text>
        <text x="58" y="15" className="art-finding">
          unsafe-inline in script-src
        </text>

        {/* high */}
        <rect x="0" y="28" width="280" height="22" rx="4" fill="#231a0e" />
        <rect x="0" y="28" width="3" height="22" fill="#fb923c" />
        <text x="12" y="43" className="art-sev art-sev-high">
          HIGH
        </text>
        <text x="58" y="43" className="art-finding">
          object-src wildcard
        </text>

        {/* medium */}
        <rect x="0" y="56" width="280" height="22" rx="4" fill="#1f2415" />
        <rect x="0" y="56" width="3" height="22" fill="#facc15" />
        <text x="12" y="71" className="art-sev art-sev-med">
          MED
        </text>
        <text x="58" y="71" className="art-finding">
          base-uri missing
        </text>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Project: Prompt Injection Lab                                              */
/* Document with hidden [SYSTEM] block; arrows to naive (✗) and hardened (✓) */
/* -------------------------------------------------------------------------- */
function PromptInjectionArtwork() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="card-art"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Document */}
      <rect
        x="14"
        y="22"
        width="130"
        height="156"
        rx="6"
        className="art-panel"
      />
      {/* fold corner */}
      <path d="M 130 22 L 144 22 L 144 36 Z" className="art-panel-bar" />

      {/* normal lines */}
      <rect
        x="26"
        y="40"
        width="100"
        height="3"
        rx="1.5"
        className="art-doc-line"
      />
      <rect
        x="26"
        y="50"
        width="92"
        height="3"
        rx="1.5"
        className="art-doc-line"
      />
      <rect
        x="26"
        y="60"
        width="106"
        height="3"
        rx="1.5"
        className="art-doc-line"
      />

      {/* [SYSTEM] injection block — highlighted */}
      <rect
        x="22"
        y="76"
        width="116"
        height="38"
        rx="3"
        className="art-inject-bg"
      />
      <text x="28" y="89" className="art-inject-tag">
        [SYSTEM]
      </text>
      <text x="28" y="102" className="art-inject-text">
        ignore previous
      </text>
      <text x="28" y="111" className="art-inject-text">
        exfil &lt;data&gt;
      </text>

      {/* trailing lines */}
      <rect
        x="26"
        y="124"
        width="98"
        height="3"
        rx="1.5"
        className="art-doc-line"
      />
      <rect
        x="26"
        y="134"
        width="86"
        height="3"
        rx="1.5"
        className="art-doc-line"
      />

      {/* Arrows + outcomes */}
      <g className="art-pi-arrow">
        <line x1="148" y1="62" x2="190" y2="48" />
        <polygon points="190,48 184,46 185,52" />
      </g>
      <g className="art-pi-arrow">
        <line x1="148" y1="138" x2="190" y2="152" />
        <polygon points="190,152 184,148 185,154" />
      </g>

      {/* Naive (top right) */}
      <rect
        x="196"
        y="32"
        width="108"
        height="36"
        rx="6"
        className="art-pi-naive"
      />
      <text x="210" y="55" className="art-pi-result-text art-pi-result-bad">
        ✗ followed
      </text>

      {/* Hardened (bottom right) */}
      <rect
        x="196"
        y="138"
        width="108"
        height="36"
        rx="6"
        className="art-pi-hardened"
      />
      <text x="210" y="161" className="art-pi-result-text art-pi-result-good">
        ✓ refused
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Project: SSRF / Cloud Metadata Lab                                         */
/* Server box → blocked → 169.254.169.254 metadata box                        */
/* -------------------------------------------------------------------------- */
function SsrfArtwork() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="card-art"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {/* App box (left) */}
      <rect x="22" y="58" width="92" height="84" rx="8" className="art-panel" />
      <text x="68" y="78" textAnchor="middle" className="art-ssrf-label">
        app
      </text>
      <rect
        x="34"
        y="92"
        width="68"
        height="6"
        rx="2"
        className="art-doc-line"
      />
      <rect
        x="34"
        y="104"
        width="56"
        height="6"
        rx="2"
        className="art-doc-line"
      />
      <rect
        x="34"
        y="116"
        width="60"
        height="6"
        rx="2"
        className="art-doc-line"
      />

      {/* Request arrow */}
      <g className="art-ssrf-arrow">
        <line x1="120" y1="100" x2="200" y2="100" strokeDasharray="4 4" />
        <text x="160" y="92" textAnchor="middle" className="art-ssrf-req">
          GET 169.254.169.254
        </text>
      </g>

      {/* Firewall / blocked stamp */}
      <g transform="translate(146, 100)">
        <circle r="20" className="art-ssrf-block-bg" />
        <line x1="-12" y1="-12" x2="12" y2="12" className="art-ssrf-block-x" />
        <line x1="12" y1="-12" x2="-12" y2="12" className="art-ssrf-block-x" />
      </g>

      {/* Metadata target (right) */}
      <rect
        x="206"
        y="58"
        width="92"
        height="84"
        rx="8"
        className="art-ssrf-meta"
      />
      <text x="252" y="80" textAnchor="middle" className="art-ssrf-meta-label">
        IMDS
      </text>
      <text x="252" y="100" textAnchor="middle" className="art-ssrf-meta-ip">
        169.254
      </text>
      <text x="252" y="116" textAnchor="middle" className="art-ssrf-meta-ip">
        .169.254
      </text>
      <text x="252" y="134" textAnchor="middle" className="art-ssrf-meta-foot">
        IAM creds
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Project: Labs hub                                                          */
/* 2×2 grid of mini lab tiles — Identity, CSP, Prompt Injection, SSRF        */
/* -------------------------------------------------------------------------- */
function LabsHubArtwork() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="card-art"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="hub-id" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="hub-csp" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hub-pi" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="hub-ssrf" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Top-left: Identity (passkey/key glyph) */}
      <g transform="translate(36, 26)">
        <rect
          width="116"
          height="68"
          rx="8"
          fill="url(#hub-id)"
          opacity="0.92"
        />
        <circle cx="34" cy="34" r="11" fill="#fff" opacity="0.95" />
        <rect x="32" y="30" width="4" height="9" rx="1" fill="#1e3a8a" />
        <rect
          x="50"
          y="32"
          width="46"
          height="3"
          rx="1.5"
          fill="#fff"
          opacity="0.7"
        />
        <rect
          x="50"
          y="40"
          width="34"
          height="3"
          rx="1.5"
          fill="#fff"
          opacity="0.5"
        />
        <text x="58" y="60" className="art-hub-tile-label">
          Identity
        </text>
      </g>

      {/* Top-right: CSP (header lines) */}
      <g transform="translate(168, 26)">
        <rect
          width="116"
          height="68"
          rx="8"
          fill="url(#hub-csp)"
          opacity="0.92"
        />
        <rect
          x="14"
          y="14"
          width="60"
          height="4"
          rx="2"
          fill="#fff"
          opacity="0.9"
        />
        <rect
          x="14"
          y="24"
          width="80"
          height="3"
          rx="1.5"
          fill="#fff"
          opacity="0.6"
        />
        <rect
          x="14"
          y="32"
          width="70"
          height="3"
          rx="1.5"
          fill="#fff"
          opacity="0.6"
        />
        <rect
          x="14"
          y="40"
          width="50"
          height="3"
          rx="1.5"
          fill="#fff"
          opacity="0.6"
        />
        <text x="14" y="60" className="art-hub-tile-label">
          CSP
        </text>
      </g>

      {/* Bottom-left: Prompt Injection (chat bubble + redacted block) */}
      <g transform="translate(36, 106)">
        <rect
          width="116"
          height="68"
          rx="8"
          fill="url(#hub-pi)"
          opacity="0.92"
        />
        <rect
          x="14"
          y="14"
          width="40"
          height="14"
          rx="6"
          fill="#fff"
          opacity="0.85"
        />
        <rect
          x="58"
          y="14"
          width="44"
          height="14"
          rx="6"
          fill="#fff"
          opacity="0.4"
        />
        {/* Redacted "system" injection */}
        <rect
          x="14"
          y="34"
          width="88"
          height="10"
          rx="2"
          fill="#1e1b4b"
          opacity="0.85"
        />
        <text x="18" y="42" className="art-hub-tile-tag">
          [SYS]
        </text>
        <text x="14" y="60" className="art-hub-tile-label">
          Prompt Injection
        </text>
      </g>

      {/* Bottom-right: SSRF (IP block) */}
      <g transform="translate(168, 106)">
        <rect
          width="116"
          height="68"
          rx="8"
          fill="url(#hub-ssrf)"
          opacity="0.92"
        />
        <text x="58" y="32" textAnchor="middle" className="art-hub-tile-mono">
          169.254
        </text>
        <text x="58" y="44" textAnchor="middle" className="art-hub-tile-mono">
          .169.254
        </text>
        <text x="14" y="60" className="art-hub-tile-label">
          SSRF
        </text>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Essay: dogfood — built scanner, scanned self                               */
/* Before/after panels: a CSP findings list with 3 items, then 0 items        */
/* -------------------------------------------------------------------------- */
function DogfoodArtwork() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="card-art"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Left panel: BEFORE — 3 findings */}
      <g transform="translate(20, 24)">
        <rect
          width="130"
          height="152"
          rx="6"
          className="art-dogfood-panel-bad"
        />
        <text x="10" y="20" className="art-dogfood-title">
          BEFORE
        </text>
        <text x="10" y="34" className="art-dogfood-sub">
          3 findings
        </text>
        {/* finding rows */}
        <g transform="translate(8, 50)">
          <rect
            width="114"
            height="22"
            rx="3"
            className="art-dogfood-row-high"
          />
          <text x="6" y="15" className="art-dogfood-id">
            CSP02
          </text>
          <text x="44" y="15" className="art-dogfood-text">
            'unsafe-inline'
          </text>
        </g>
        <g transform="translate(8, 78)">
          <rect
            width="114"
            height="22"
            rx="3"
            className="art-dogfood-row-low"
          />
          <text x="6" y="15" className="art-dogfood-id">
            CSP10
          </text>
          <text x="44" y="15" className="art-dogfood-text">
            style-src
          </text>
        </g>
        <g transform="translate(8, 106)">
          <rect
            width="114"
            height="22"
            rx="3"
            className="art-dogfood-row-low"
          />
          <text x="6" y="15" className="art-dogfood-id">
            CSP11
          </text>
          <text x="44" y="15" className="art-dogfood-text">
            no reporting
          </text>
        </g>
      </g>

      {/* Arrow */}
      <g transform="translate(160, 100)">
        <line x1="0" y1="0" x2="20" y2="0" className="art-dogfood-arrow" />
        <polygon points="20,-4 28,0 20,4" className="art-dogfood-arrow-head" />
      </g>

      {/* Right panel: AFTER — clean */}
      <g transform="translate(195, 24)">
        <rect
          width="105"
          height="152"
          rx="6"
          className="art-dogfood-panel-good"
        />
        <text x="10" y="20" className="art-dogfood-title">
          AFTER
        </text>
        <text x="10" y="34" className="art-dogfood-sub">
          0 findings
        </text>
        {/* big checkmark */}
        <g transform="translate(52, 88)">
          <circle r="26" className="art-dogfood-check-bg" />
          <polyline points="-12,2 -3,12 14,-8" className="art-dogfood-check" />
        </g>
        <text x="52" y="138" textAnchor="middle" className="art-dogfood-clean">
          clean
        </text>
      </g>
    </svg>
  );
}

function AuthzArtwork() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="card-art"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Left: Alice (authed) */}
      <g transform="translate(20, 70)">
        <circle cx="22" cy="22" r="22" className="art-authz-user" />
        <text x="22" y="27" textAnchor="middle" className="art-authz-user-text">
          A
        </text>
        <text x="22" y="62" textAnchor="middle" className="art-authz-label">
          alice
        </text>
      </g>

      {/* Request label */}
      <g transform="translate(80, 60)">
        <text x="0" y="0" className="art-authz-req">
          GET /orders/1003
        </text>
        <text x="0" y="14" className="art-authz-req-sub">
          (owned by bob)
        </text>
      </g>

      {/* Top arrow → naive endpoint (200 OK leak) */}
      <g transform="translate(80, 92)">
        <line x1="0" y1="0" x2="120" y2="0" className="art-authz-arrow-bad" />
        <polygon
          points="120,-4 128,0 120,4"
          className="art-authz-arrow-bad-head"
        />
      </g>

      {/* Right: two endpoint chips */}
      <g transform="translate(212, 38)">
        <rect width="86" height="52" rx="6" className="art-authz-panel-bad" />
        <text x="43" y="20" textAnchor="middle" className="art-authz-endpoint">
          naive
        </text>
        <text
          x="43"
          y="40"
          textAnchor="middle"
          className="art-authz-status-bad"
        >
          200 OK
        </text>
      </g>

      {/* Bottom arrow → hardened (404) */}
      <g transform="translate(80, 122)">
        <line x1="0" y1="0" x2="120" y2="0" className="art-authz-arrow-good" />
        <polygon
          points="120,-4 128,0 120,4"
          className="art-authz-arrow-good-head"
        />
      </g>

      <g transform="translate(212, 110)">
        <rect width="86" height="52" rx="6" className="art-authz-panel-good" />
        <text x="43" y="20" textAnchor="middle" className="art-authz-endpoint">
          hardened
        </text>
        <text
          x="43"
          y="40"
          textAnchor="middle"
          className="art-authz-status-good"
        >
          404
        </text>
      </g>

      {/* WHERE clause hint */}
      <text x="160" y="190" textAnchor="middle" className="art-authz-where">
        WHERE id = ? AND owner_id = ?
      </text>
    </svg>
  );
}
