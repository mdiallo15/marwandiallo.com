# Agent kickoff prompt — marwandiallo.com

> Paste the block below into a fresh Copilot Chat window in this workspace
> to start an autonomous work session. Use **Agent** mode.

---

## Autonomous operating contract (hardened 2026-06-07)

This contract governs the session; the project-specific steps below are detail.

- **Source of truth = `TASKS.md`.** Any task wording in *this* file is only a
  convenience copy. At session start, reconcile it against `TASKS.md` +
  `git log --oneline -15`; if it points at already-shipped work, refresh the
  stale wording FIRST. Never trust a snapshot blindly.
- **Loop:** pick top unblocked technical task → implement in the established voice
  (`BRANDVOICE.md`, `WRITING_STANDARD.md`) and locked FT-salmon tokens → validate
  (typecheck + lint touched files + `npm run build`; don't commit red) → commit
  → push to `main` → mark Done in `TASKS.md` **with the commit SHA** → next item.
  Keep a visible todo list.
- **Work until done:** when Ready empties, replenish from `PLAN.md` + production
  signals + lint/type debt and continue.
- **Stop** when the sole remaining work is human-gated. For this project that
  explicitly includes any **taste / voice / branding / pricing decision** — flag
  it in the task and skip, do **not** guess. Also stop for a requested essay once
  written. Post a short status of what only the human can decide.
- **Never** invent busywork, re-churn correct code just to commit, mark Done
  without a SHA, fabricate claims, or touch locked design tokens unless the task
  asks. No destructive/irreversible git ops without surfacing first.

---

You are picking up work on marwandiallo.com, the personal site. Source of truth for state is on disk:

1. Read `PLAN.md`, `TASKS.md`, `BRANDVOICE.md`, and `WRITING_STANDARD.md` first.
2. If `TASKS.md` has technical work in "Ready", pick the topmost unblocked task and do it.
3. If `TASKS.md` is drained and the human has explicitly asked for a new essay, switch into content mode: write one new essay in the established personal-site voice, using the essays in `content/writing/` as the canonical cadence and diction source.
4. Match the established voice (`BRANDVOICE.md`, `WRITING_STANDARD.md`) — terse, technical, no marketing fluff.
5. FT salmon palette is locked (`--color-bg: #fff1e5` etc.) — don't touch tokens unless the task asks for it.
6. Run `npm run build` until clean. Match existing bundle sizes.
7. Commit with `Marwan Diallo <hello@marwandiallo.com>` and a clear message. **Push to main when build is clean** — Vercel auto-deploys.
8. Move the completed task to "Done" with the commit SHA. Append a one-line entry to a session log if one exists.
9. Continue to the next technical task whenever it is genuinely unblocked and
   requires no human taste decision. Per the operating contract above, run
   continuously — stop only at the human-gated boundary (a taste/voice/branding/
   pricing call) or after a requested essay is written.

If you find a task that needs a personal opinion / business decision (pricing, copy tone, branding), flag it in the task and skip — don't guess. Continue with the next purely-technical task.

Start now: read `TASKS.md`. If it has a real Ready task, begin there; otherwise, if the human asked for an essay, draft the next essay in the established voice.
