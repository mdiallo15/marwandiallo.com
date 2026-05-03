# marwandiallo.com — Writing Voice

This is the editorial guide for personal essays at marwandiallo.com. It is
distinct from the Diallo Group institutional voice (see
`Security Consulting Firm/brandvoice.md`). The personal site is FT-inspired:
quiet, evidence-first, structural, never breathless.

If you read the essays in `/content/writing` end-to-end, this document is
what you'd extract.

---

## Tone in one paragraph

Measured. First-person. Evidence-first. Curious rather than certain.
The reader is a peer — a senior engineer, a security architect, a CISO, a
founder — not a beginner who needs to be sold on why the topic matters.
Assume technical literacy; reward it with precise nouns. The voice is
someone who has done the work, made the mistake, and is now telling you
the part nobody writes down.

It is **not** thought-leadership chest-beating. It is not breathless. It
is not "5 things every CISO should know." It is closer to a long-form
field note from someone who is still doing the work.

---

## Headlines

**Style.** Sentence-case fragments or two-clause statements. Concrete
nouns over abstractions. Name the artifact (BEAST, RFC 8693, MCAS, the
agent) when possible.

**Good (in repo today):**

- _Identity Is the Perimeter_
- _Infrastructure Taught Me About AI_
- _I Built a Scanner, Then Scanned Myself_
- _The Agent Identity Front_
- _Agent-Based vs. Network-Probe Scanners: A Coverage Case Study_

**Avoid:**

- Question-as-headline ("Is X the new Y?")
- Listicle counts ("7 things…")
- Rhetorical clickbait ("This one weird trick…")
- Vague provocations without a noun ("When Things Disagree")
- Emoji, all-caps, exclamation points

The headline should let a skeptical reader decide in three seconds
whether the essay is for them. Names of specific systems, CVEs, or
RFCs are good. Adjectives are usually filler.

---

## Section headers

Lowercase, fragmentary, descriptive. Not Title Case. They are signposts,
not advertisements.

**Good:**

- `## Two scanners, two different questions`
- `## The investigation`
- `## The Schannel registry trap`
- `## What AI changes — on both sides`
- `## Standards mapping`
- `## Closing`

**Avoid:**

- `## Introduction` / `## Conclusion` (just write the paragraph)
- `## The 5 Pillars Of Modern Security`
- `## Why You Should Care About X`

---

## Opening paragraphs

Three patterns recur and should keep recurring:

1. **The dichotomy opener.** State two outcomes that look the same but
   aren't. Name the gap.

   > "A vulnerability scanner that returns no findings is one of two
   > things. Either the asset is genuinely clean, or the scanner can't
   > see the class of bug that is actually present."

2. **The artifact opener.** Lead with the concrete thing — a port, a
   CVE, a registry path, a server. Then back out to the lesson.

   > "I ran into a clean version of this gap during a recent
   > proof-of-concept evaluation. Two scanners, the same Windows Server
   > 2022 domain controller, the same week."

3. **The first-person field-note opener.** State what you did, in past
   tense, without preamble.
   > "I spent a weekend turning a Mac into a small consulting firm."

Avoid: "In today's fast-paced world…", "As we all know…", "It is
widely understood that…"

---

## Cadence patterns

Short declarative sentences earn their authority by being short.
Long sentences earn theirs by being structural.

- **Parallel triplets.** "Two scanners. Same week. Different answers."
- **Statement + restatement at higher resolution.** A short sentence
  followed by one that explains the same thing in more precise terms.
- **The pivot sentence.** A one-line paragraph that turns the argument.
  > "Both are useful. Neither is sufficient on its own."

Vary sentence length. Don't write a wall of medium-length sentences;
that's the LLM tell.

---

## Diction

**Prefer.** Specific nouns. Verbs that do work. Numbers when you have
them. The literal name of the tool, RFC, CVE, registry key, port, or
control.

**Avoid (banned list).**

- _leverage_ (use)
- _utilize_ (use)
- _robust_ (sturdy / well-tested / specific)
- _seamless_ (almost always a lie)
- _holistic_ (vague)
- _synergy_ (cut the sentence)
- _cutting-edge / state-of-the-art_ (cut)
- _ecosystem_ (be specific: the AWS console, the npm registry, etc.)
- _paradigm shift_ (cut)
- _deep dive_ (write the dive)
- _world-class_ (cut)
- _unlocks_ (as a verb for capabilities — overused)
- _delve_ (LLM tell)

**Hedge sparingly.** "I think", "in my experience" are fine and earn
trust when used once or twice per essay. Five times per essay reads as
defensive.

---

## Punctuation conventions

- **Em-dashes.** Yes in body prose. No in titles or section headers.
- **Em-dash spacing.** Spaced — like this — not unspaced—like that.
- **Colons in titles.** Allowed when the second clause adds genuinely
  new information (e.g., "Agent-Based vs. Network-Probe Scanners: A
  Coverage Case Study"). Not as a substitute for a weak headline.
- **Footnotes.** No footnotes. If it matters, put it in the body. If
  it doesn't, cut it.
- **Lists.** Use sparingly. Most paragraphs do not need to be a list.
  When you do list, make every item parallel in structure.
- **Bold.** Reserved for the term being defined or the headline of a
  numbered argument. Never for emphasis ("this is **really**
  important").

---

## Evidence patterns

The essays earn authority through specific, primary-source evidence,
not appeals to authority. Patterns to keep using:

- **Anonymized terminal output** in fenced code blocks. Show the actual
  shape of the data; redact host names and IPs.
- **Inline links to vendor / standards documentation** at the moment
  the claim is made — Microsoft Learn, NIST SPs, RFCs, FIRST.org. Not
  a "References" section at the end.
- **Concrete artifact counts.** "4 vulnerability definitions, 64 patch
  definitions" instead of "many entries".
- **Side-by-side disagreement.** When two tools / two opinions / two
  approaches disagree, lay them out plainly and let the reader see the
  delta.

What to avoid: stock screenshots, vendor marketing diagrams, generic
"figure 1" architecture pictures.

---

## Standards / framework citations

When the essay touches a regulated domain, include a short **Standards
mapping** section near the end with one-line ties:

> - **PCI-DSS 4.0 §4.2.1** — requires "strong cryptography and
>   security protocols" for transmission of cardholder data over open
>   public networks. TLS 1.0 and 1.1 do not qualify.

Frameworks worth citing by name when relevant:
NIST CSF 2.0, NIST SP 800-53, NIST SP 800-52, NIST SP 800-40,
NIST SP 800-63, FIDO2 / WebAuthn, OAuth 2.0, RFC 8693, RFC 9068,
PCI-DSS 4.0, HIPAA, ISO 27001, SOC 2, OWASP API Top 10, CIS Controls v8.

The frameworks already say what good looks like. The gap is
implementation. (That's almost always the closing-paragraph beat.)

---

## Closings

Two patterns work and should keep working:

1. **The lesson statement + two concrete actions.** End with one
   paragraph that names the lesson, then a numbered list of two things
   the reader can do this week.
2. **The compressed thesis.** A two- or three-sentence paragraph that
   restates the central argument at higher density than the opening.

Don't close with: "Thanks for reading", "let me know what you think",
or a CTA to subscribe / book a call. The site has its own footer for
that; the essay doesn't need to do the linking.

---

## What an essay is _not_

- It is not a vendor product brief. We don't recommend a single tool.
- It is not a tutorial. We don't write step-by-step howtos here. (Those
  belong in `lab.marwandiallo.com` or in vendor docs we link to.)
- It is not a hot take on a news cycle. If it would read stale in
  six months, don't post it.
- It is not Diallo Group marketing. The personal site is allowed to
  have rougher edges, more first-person, more uncertainty. The firm
  voice is more polished and consensus-seeking.

---

## Quick checklist before publishing

- [ ] Title names a noun (system, CVE, RFC, technique).
- [ ] Section headers are sentence-case fragments.
- [ ] Opens with a dichotomy, an artifact, or a first-person move —
      not "In today's…".
- [ ] At least one piece of primary-source evidence
      (terminal output, doc link, registry path, code).
- [ ] No words from the banned list.
- [ ] No emoji, exclamation points, or all-caps.
- [ ] Standards mapping present if the topic is regulated.
- [ ] Closing is a lesson statement + two actions, or a compressed
      thesis. Not a CTA.
- [ ] Sentence length varies. No wall of medium-length sentences.
- [ ] An expert reader would learn at least one specific thing they
      didn't know.

---

## When you load this file into another tool

Useful prompt openers when handing this guide to another AI / writer:

> "Edit this draft against the marwandiallo.com voice guide. Apply the
> banned-words list, fix the title to name a concrete noun, and rework
> the opener so it leads with an artifact or a dichotomy rather than a
> generic claim. Do not add new content; only edit."

> "Score this draft 0–10 against each section of BRANDVOICE.md and
> list the top three edits."
