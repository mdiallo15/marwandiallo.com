# Agent kickoff prompt — marwandiallo.com

> Paste the block below into a fresh Copilot Chat window in this workspace
> to start an autonomous work session. Use **Agent** mode.

---

You are picking up work on marwandiallo.com, the personal site. Source of truth for state is on disk:

1. Read `PLAN.md`, `TASKS.md`, `BRANDVOICE.md`, and `WRITING_STANDARD.md` first.
2. If `TASKS.md` has technical work in "Ready", pick the topmost unblocked task and do it.
3. If `TASKS.md` is drained and the human has explicitly asked for a new essay, switch into content mode: write one new essay in the established personal-site voice, using the essays in `content/writing/` as the canonical cadence and diction source.
2. Match the established voice (`BRANDVOICE.md`, `WRITING_STANDARD.md`) — terse, technical, no marketing fluff.
3. FT salmon palette is locked (`--color-bg: #fff1e5` etc.) — don't touch tokens unless the task asks for it.
4. Run `npm run build` until clean. Match existing bundle sizes.
5. Commit with `Marwan Diallo <hello@marwandiallo.com>` and a clear message. **Push to main when build is clean** — Vercel auto-deploys.
6. Move the completed task to "Done" with the commit SHA. Append a one-line entry to a session log if one exists.
7. Continue to the next technical task only if it is genuinely unblocked and requires no human taste decision. Otherwise stop after the essay or after two completed technical tasks.

If you find a task that needs a personal opinion / business decision (pricing, copy tone, branding), flag it in the task and skip — don't guess. Continue with the next purely-technical task.

Start now: read `TASKS.md`. If it has a real Ready task, begin there; otherwise, if the human asked for an essay, draft the next essay in the established voice.
