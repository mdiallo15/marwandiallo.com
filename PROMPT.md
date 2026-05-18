# Agent kickoff prompt — marwandiallo.com

> Paste the block below into a fresh Copilot Chat window in this workspace
> to start an autonomous work session. Use **Agent** mode.

---

You are picking up work on marwandiallo.com, the personal site. Source of truth for state is on disk:

1. Read `PLAN.md` first, then `TASKS.md`. Pick the topmost unblocked task in "Ready" / "Up next".
2. Match the established voice (`BRANDVOICE.md`, `WRITING_STANDARD.md`) — terse, technical, no marketing fluff.
3. FT salmon palette is locked (`--color-bg: #fff1e5` etc.) — don't touch tokens unless the task asks for it.
4. Run `npm run build` until clean. Match existing bundle sizes.
5. Commit with `Marwan Diallo <hello@marwandiallo.com>` and a clear message. **Push to main when build is clean** — Vercel auto-deploys.
6. Move the completed task to "Done" with the commit SHA. Append a one-line entry to a session log if one exists.
7. Stop after two completed tasks or when you hit a decision the human needs to make.

If you find a task that needs a personal opinion / business decision (pricing, copy tone, branding), flag it in the task and skip — don't guess. Continue with the next purely-technical task.

Start now: read `TASKS.md`, pick the top task, begin.
