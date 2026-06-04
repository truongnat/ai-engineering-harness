# Harness command behavior

Provider invocation differs (slash, plugin skill, ask `harness-plan`, etc.). **After routing to `.ai-harness/commands/`, behavior is the same** for every provider.

## Core policy

| Rule | Detail |
|------|--------|
| Act when context exists | If local `.harness/` artifacts answer the situation, **synthesize immediately** |
| Ask only when blocked | Clarify only when goal and artifacts are missing or contradictory |
| One closing question max | After delivering value, at most **one** optional next-step question |
| Artifacts before rework | Read `.harness/REVIEW.md`, `.harness/PLAN.md`, `.harness/STATE.md`, `.harness/DISCUSSION.md` before re-running expensive work |
| No fake freshness | State *not verified* if git/base diff was not checked |
| Project scope only | Use this repo's `.ai-harness/` and `.harness/` only |
| No heavy runtime drift | Borrow process ideas freely, but do not introduce framework-style state engines or orchestration into the core harness |

## Summarize vs re-run vs incremental diff

| User need | Command behavior |
|-----------|------------------|
| Discuss existing review | **Summarize + decision** from `.harness/REVIEW.md` — do not ask "summary or fresh review?" |
| Stale review suspected | State freshness unverified or run incremental diff **after** presenting baseline |
| Full re-review | User must ask explicitly or run `harness-verify` / review workflow — not default for discuss |

## `/harness-discuss` (canonical: `harness-discuss`)

**Expected when `.harness/REVIEW.md` exists:**

1. Restate branch/base and that review was found.
2. Verdict, risk, main decision.
3. SHOULD FIX / blockers summary.
4. P0 / verification status.
5. Freshness note (verified or not).
6. Recommendation and update `.harness/DISCUSSION.md`.
7. One closing question (e.g. incremental diff).

**Forbidden:** "What output do you need?", "Should I summarize REVIEW.md?", multiple upfront mode questions.

**Pre-plan mode** (no review): classic scope/goal discussion → `.harness/DISCUSSION.md`.

Before leaving discuss, make the following explicit when they matter:

- goal
- success criteria
- scope boundaries
- constraints
- unresolved risks
- preferred direction

Source contract: [commands/harness-discuss.md](../commands/harness-discuss.md).

## `/harness-run` and `/harness-verify` guardrails

- `harness-run` follows the approved plan in small steps, records deviations, and does not treat self-reporting as verification.
- Worktree isolation is optional and risk-driven, not a hidden default.
- `harness-verify` must record fresh evidence, known gaps, deferred human checks, and ship blockers when relevant.
- `pending human verification` is a valid verification outcome and must not be flattened into `passed`.

## Other commands (short)

| Command | Act-first trigger |
|---------|-------------------|
| `harness-plan` | Read GOAL + DISCUSSION before asking scope |
| `harness-verify` | Read PLAN + STATE before re-asking what to verify |
| `harness-status` | Summarize install + `.harness/` state without menu prompts |

## Related

- [runtime-command-surface.md](runtime-command-surface.md)
- [usage-examples.md](usage-examples.md)
- [distillation-superpowers-gsd.md](distillation-superpowers-gsd.md)
- [forensics-lite.md](forensics-lite.md)
