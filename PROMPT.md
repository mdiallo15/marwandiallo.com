# marwandiallo.com — kickoff

> **Superseded 2026-07-06.** The operating contract now lives in
> [`CLAUDE.md`](CLAUDE.md), which Claude Code loads automatically — nothing to
> paste. The task wording that used to live here was removed deliberately:
> `TASKS.md` is the single source of truth.

**Status: PARKED** — backlog drained. For a new essay, just ask in a session
(content mode is defined in `CLAUDE.md`). To reactivate technical work, add
tasks to `TASKS.md`, then:

```bash
claude
/goal Work TASKS.md top-down: every Done item has a commit SHA and a green
typecheck + lint + build within bundle budget. Stop when Ready is empty or
only human-taste work remains. Stop after 30 turns.
```

(Legacy Copilot fallback: paste `CLAUDE.md` into Agent-mode chat.)
