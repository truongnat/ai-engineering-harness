# Core Loop

## When To Use

Use this as the default workflow when no more specific task workflow is a better fit.

## Command Sequence

`harness-map -> harness-start -> harness-discuss -> harness-plan -> harness-run -> harness-verify -> harness-ship -> harness-remember`

## Required Artifacts

- `.harness/GOAL.md`
- `.harness/STATE.md`
- `.harness/CONTEXT.md`
- `.harness/PLAN.md`
- `.harness/VERIFY.md`
- `.harness/SHIP.md`
- `.harness/REMEMBER.md`

## Recommended Skills

- `using-harness`
- `mapping-codebase`
- `discussing-goals`
- `writing-plans`
- `executing-plans`
- `verification`
- `remembering`

## Verification Expectations

- do not leave `Plan` without a concrete plan
- do not leave `Run` without updated task or state artifacts
- do not leave `Verify` without pass, fail, or partial evidence
- do not leave `Remember` with sensitive data

## Failure Handling

- return to `harness-discuss` if the goal or scope changes
- return to `harness-plan` if execution reveals material plan gaps
- stop shipping if verification is partial or failed

## Completion Criteria

The workflow is complete when the goal is implemented in scope, verified with evidence, summarized for handoff, and followed by durable non-sensitive memory.
