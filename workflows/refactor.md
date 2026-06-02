# Refactor Workflow

## When To Use

Use this for structural improvements that should preserve behavior while improving clarity, maintainability, or boundaries.

## Command Sequence

`harness-map -> harness-start -> harness-discuss -> harness-plan -> harness-run -> harness-verify -> harness-ship -> harness-remember`

## Required Artifacts

- `.harness/GOAL.md`
- `.harness/CONTEXT.md`
- `.harness/PLAN.md`
- `.harness/VERIFY.md`

## Recommended Skills

- `using-harness`
- `mapping-codebase`
- `writing-plans`
- `executing-plans`
- `test-driven-development` when behavior safety needs regression coverage
- `verification`

## Verification Expectations

- invariants are stated before execution
- behavior-preserving checks are run after each meaningful step when practical
- any intentional behavior change is treated as feature work instead

## Failure Handling

- if behavior change becomes necessary, return to discussion and re-scope
- if refactor scope balloons, split it into smaller plans
- if verification coverage is weak, state that risk explicitly

## Completion Criteria

The refactor workflow is complete when the structure is improved, behavior is still supported by evidence, and any new conventions worth keeping are remembered safely.
