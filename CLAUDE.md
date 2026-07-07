# marwandiallo.com — operating contract

**Status: PARKED (2026-06 — backlog drained).**
Do not invent new work. Act only on an explicit ask (most likely a new essay),
a production signal (failed Vercel build/deploy), or new tasks in `TASKS.md`.

Personal site. Voice: terse, technical, no marketing fluff — defined in
`BRANDVOICE.md` + `WRITING_STANDARD.md`; essays in `content/writing/` are the
canonical cadence and diction source.

## Source of truth

`TASKS.md` is the backlog; `PLAN.md` is strategy. No snapshots exist anywhere
else by design. Session start: read `TASKS.md` + `git log --oneline -15`.

## Loop (when active)

Pick top unblocked technical Ready item → implement in the established voice
and locked tokens → validation gate (use the `verify-before-commit` skill) →
`/code-review` the diff → commit as `Marwan Diallo <hello@marwandiallo.com>` →
**push to `main`** (authorized; Vercel auto-deploys) → mark Done in `TASKS.md`
with the SHA + session-log line → next item.

Content mode: write an essay only when Marwan explicitly asks for one, then stop
after it's written.

## Validation gate

- `npm run typecheck`
- `npm run lint` (or `npx eslint <touched files>`)
- `npm run build` — bundle budget 420 kB raw / ~110 kB gzipped, enforced by
  `scripts/check-bundle.mjs`

## Hard rules

- **FT salmon palette is locked** (`--color-bg: #fff1e5` etc.) — never touch
  design tokens unless the task explicitly asks.
- Any **taste / voice / branding / pricing** decision is human-gated: flag it in
  the task and skip — do not guess.
- Never fabricate claims. Never mark Done without a SHA. No busywork.
- No destructive/irreversible git ops without surfacing first.

## Stop conditions

- Ready is empty and replenishment yields nothing genuinely useful.
- Only human-gated (taste) work remains, or the requested essay is written.

## Kickoff (when reactivated)

```
/goal Work TASKS.md top-down: every Done item has a commit SHA and a green
typecheck + lint + build within bundle budget. Stop when Ready is empty or
only human-taste work remains. Stop after 30 turns.
```
