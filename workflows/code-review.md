# Code Review Workflow

## When To Use

Use this when reviewing an implementation, plan, or set of changed artifacts before acceptance or merge.

## Command Sequence

`harness-start -> harness-map -> harness-verify`

Review work usually feeds into `.harness/REVIEW.md`, then returns to `harness-run` or proceeds to `harness-ship`.

## Required Artifacts

- `.harness/GOAL.md`
- `.harness/PLAN.md`
- `.harness/VERIFY.md` if verification already exists
- `.harness/REVIEW.md`

## Recommended Skills

- `using-harness`
- `mapping-codebase`
- `code-review`
- `verification`

## Verification Expectations

- review findings reference concrete risks
- missing tests or missing evidence are recorded as findings
- if there are no findings, residual risk is still stated

## Failure Handling

- return to `harness-run` if findings require fixes
- return to `harness-plan` if findings expose a plan defect
- stop shipping if review identifies unverified risk

## Completion Criteria

The code review workflow is complete when findings or an explicit no-findings result are written clearly enough for the next action to be obvious.
