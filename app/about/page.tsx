import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Marwan Diallo — security leader, founder, Guinean.",
};

export default function AboutPage() {
  return (
    <article className="prose">
      <h1>About</h1>

      <p>
        I grew up between continents. Born in Guinea, raised between West Africa
        and the States, I now live in Raleigh, North Carolina. The two places
        explain most of my choices.
      </p>

      <p>
        My career started in infrastructure — Active Directory, Exchange,
        VMware, Cisco. The layer nobody thinks about until it breaks. I
        migrated a lot of mailboxes. I learned that the most boring systems are
        usually the ones holding the building up.
      </p>

      <p>
        I drifted into security because the interesting incidents always started
        at identity, and identity was what I already knew. I've been a security
        analyst, engineer, architect, and manager. I hold CISSP, Microsoft's
        Security Architect Expert and AZ-500, and AWS Solutions Architect.
        Today I lead security at a Fortune 500 tech company by day and build{" "}
        <a href="https://security.diallogroup.io">Diallo Group</a> the rest of
        the time.
      </p>

      <p>
        Diallo Group is a consulting firm I run from a text editor. The
        first practice is security and compliance advisory; the long arc is a
        hub-and-spoke institution — training, cloud, compliance tooling,
        eventually Guinea. I'm not in a hurry.
      </p>

      <h2>What I think about</h2>
      <ul>
        <li>Identity as the actual perimeter</li>
        <li>What agentic AI does to the threat model</li>
        <li>How one person can run an institution now</li>
        <li>The 40-year infrastructure gap between Raleigh and Conakry</li>
        <li>Sprint discipline as a personal practice</li>
      </ul>

      <h2>Credentials</h2>
      <ul>
        <li>CISSP — ISC²</li>
        <li>Microsoft Cybersecurity Architect Expert (SC-100)</li>
        <li>Microsoft Azure Security Engineer (AZ-500)</li>
        <li>AWS Solutions Architect – Associate</li>
      </ul>

      <h2>Say hello</h2>
      <p>
        <a href="mailto:hello@marwandiallo.com">hello@marwandiallo.com</a> —
        always happy to hear from security folks, builders, and anyone working
        on anything in West Africa.
      </p>
    </article>
  );
}
