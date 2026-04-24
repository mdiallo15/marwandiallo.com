import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm working on right now.",
};

export default function NowPage() {
  return (
    <article className="prose">
      <h1>Now</h1>
      <p className="text-[var(--color-ink-muted)] text-[0.9rem] font-sans not-prose">
        Updated April 2026. This page follows the{" "}
        <a
          href="https://nownownow.com/about"
          className="hover:text-[var(--color-accent)]"
        >
          /now
        </a>{" "}
        convention — a snapshot, not a résumé.
      </p>

      <h2>Work</h2>
      <p>
        Leading a small security team at a Fortune 500 tech company. Our current
        focus is reducing mean time to containment on identity-driven incidents
        and getting signal out of a Sentinel instance that nobody trusts yet.
      </p>

      <h2>Diallo Group</h2>
      <p>
        Just launched <a href="https://security.diallogroup.io">security.diallogroup.io</a>.
        Shipped a client portal with passkeys, admin MFA, and an audit log that
        I'd be happy to defend in a SOC 2 interview. Most of it written solo at
        night, paired with Claude.
      </p>

      <h2>Reading</h2>
      <ul>
        <li>Kahneman, <em>Thinking, Fast and Slow</em> — re-read</li>
        <li>Ben Horowitz, <em>The Hard Thing About Hard Things</em></li>
        <li>Anthropic's interpretability papers, on and off</li>
      </ul>

      <h2>Learning</h2>
      <ul>
        <li>Agentic AI threat modeling — new territory, mostly mine to figure out</li>
        <li>Fulani language, slowly</li>
      </ul>

      <h2>Quiet</h2>
      <p>
        Trying to write more and post less. Trying to close the laptop earlier.
        Trying to get back to Guinea before the end of the year.
      </p>
    </article>
  );
}
