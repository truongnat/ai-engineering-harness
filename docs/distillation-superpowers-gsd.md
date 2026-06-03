# Distillation Matrix: Superpowers + GSD

This repository borrows discipline from stronger systems without inheriting their full runtime shape.

## Source Posture

| Source | Role in this distillation |
|---|---|
| `obra/superpowers` | Primary source for lightweight behavior discipline around discussion, planning, isolation, review, and verification |
| `gsd-build/get-shit-done` | Historical source for artifact rigor, verification gates, and failure investigation patterns |
| `open-gsd/gsd-core` | Follow-up source only when current GSD behavior needs to be checked beyond the archived repository |

## Keep

| Source idea | Why it fits `ai-engineering-harness` |
|---|---|
| Clarify the goal before coding | Matches markdown-first planning and artifact-first behavior |
| Small ordered tasks with explicit verification | Improves `PLAN.md` quality without adding runtime dependencies |
| Evidence over claims | Already aligned with `VERIFY.md`; worth strengthening |
| Optional worktree isolation | Useful safety tool when kept optional and lightweight |
| Independent review as a gate | Fits `REVIEW.md` and command contracts without new orchestration |
| Honest blocked/pending verification states | Prevents overclaiming in `VERIFY.md` and `SHIP.md` |
| Lightweight failure forensics guidance | Helps operators recover without adding new commands |

## Adapt

| Source idea | Adaptation in this repo |
|---|---|
| Superpowers brainstorming | Use as a lightweight skill and discuss-phase expectation, not a universal mandatory runtime |
| Superpowers TDD pressure | Keep as an existing skill and plan/run guidance, not a hard automation layer |
| Superpowers review loops | Keep one optional review artifact/gate, not multi-agent review choreography |
| GSD verification statuses | Narrow to template and command semantics suitable for `.harness/VERIFY.md` |
| GSD human checkpoints | Represent as deferred human checks and ship blockers instead of phase-engine checkpoints |
| GSD forensics | Document a manual troubleshooting pattern instead of introducing `/gsd-forensics` style commands |

## Reject

| Source idea | Why it is intentionally rejected |
|---|---|
| `.planning/` parallel state tree | Conflicts with the existing `.harness/` contract |
| Workstreams, workspace inventories, graph intelligence | Too heavy for the repo's lightweight posture |
| Dynamic routing and agent mesh orchestration | Turns the harness into a framework instead of a markdown kit |
| SDK/state engines for planning state | Adds runtime complexity that v1 is explicitly avoiding |
| Mandatory autonomous subagent execution | Not portable across providers and too opinionated for this pack |
| Large command namespace expansion | Expands surface area faster than the repo can validate and support |

## Resulting Design Rule

When a strong external idea appears, absorb it only if it can be expressed as one or more of:

- a clearer markdown artifact contract
- a lightweight command rule
- a narrow reusable skill
- a validator-enforced document requirement

If the idea needs a new state engine, orchestration runtime, or provider-specific automation to make sense, it does not belong in this repo's core.
