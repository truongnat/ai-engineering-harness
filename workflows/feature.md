# Feature Workflow

## When To Use

Use this for new capabilities, user-visible behavior changes, or meaningful internal features.

## Command Sequence

`harness-map -> harness-start -> harness-discuss -> harness-plan -> harness-run -> harness-verify -> harness-ship -> harness-remember`

## Required Artifacts

- `.harness/GOAL.md`
- `.harness/REQUIREMENTS.md`
- `.harness/DISCUSSION.md`
- `.harness/PLAN.md`
- `.harness/TASKS.md` when the work spans multiple steps
- `.harness/VERIFY.md`

## Recommended Skills

- `using-harness`
- `discussing-goals`
- `writing-plans`
- `executing-plans`
- `test-driven-development` when behavior changes
- `verification`

## Verification Expectations

- acceptance criteria in `.harness/REQUIREMENTS.md` are checked directly
- behavior changes have regression protection where practical
- anything not run is documented in `.harness/VERIFY.md`

## Failure Handling

- reduce scope if the feature is too large for one plan
- re-plan if implementation uncovers a materially different design need
- stop before ship if any acceptance criterion is still unknown or unverified

## Completion Criteria

The feature workflow is complete when scope is implemented in small tasks, acceptance criteria are verified, follow-ups are recorded, and durable lessons are captured safely.
