# Essay writing standard — marwandiallo.com

A house style for long-form posts on the site. The goal is essays that read as
researched, structured, and human-written, with enough depth that an
advanced reader gets new value and a layperson can still follow.

## Structure (Who / What / Where / When / Why / How)

1. **Opening — the why, not the what.**
   Start with a problem, observation, or question. If the essay covers
   something I built, lead with the motivation, not the artifact.
   Avoid exact counts in the opening (use "a set of", not "four"); the
   reader should feel the work was the point, not the deliverable size.

2. **Context — what and where this fits.**
   One paragraph naming the thing in plain terms, anchored to a known
   reference (an OWASP project, a NIST control family, an established
   tool). Specificity is credibility.

3. **Narrative — who and when.**
   One concrete person or moment to ground the story. Reviewers, peers,
   or invited eyes ("a friend I asked to review") read better than vague
   "somebody asked" framings, and signal a security-minded posture.

4. **Technical body — how.**
   For each finding, rule, or concept that gets a code identifier
   (e.g. CSP02), open with one plain sentence defining what it is and
   why it matters before showing the fix. End each finding with a one-
   to-two-sentence note on what an attacker would have done and what the
   fix prevents.

5. **Standards mapping.**
   Cross-reference findings to at least one of: OWASP Top 10, OWASP API
   Top 10, CWE, CIS Controls v8, NIST SP 800-53. One anchor per finding
   is enough.

6. **Scope — where this is limited.**
   Honest list of what the work doesn't do. No marketing.

7. **Closing — next step, not moral.**
   End on a concrete action the reader can take. One link, one invitation.

## Voice rules

- ≤ 5 em-dashes per essay; reserve for genuine asides.
- "Not X, but Y" parallel construction at most once per essay.
- Magic-three triplets ("X. Y. Z.") at most once per essay.
- No bolded aphorisms in section closings.
- At least one concrete grounding detail per essay (a name, a moment, a
  tool open in a tab). It should feel observed, not narrated.
- Every assertion has either a code artifact, a citation, or a standards
  reference behind it. Researched piece, not published notes.

## Anti-patterns (sounds like AI)

- Opening with a project announcement ("A few weeks ago I shipped...").
- Triplet rhythms used for emphasis more than once.
- Closing each section on a tidy aphorism.
- "Reader, I had not" / "I am genuinely glad" register shifts.
- Capitalised abstractions used as proper nouns ("AuthZ bugs are
  different from AuthN bugs in one crucial way").
- "It's not X, it's Y" parallelism repeated within a section.
