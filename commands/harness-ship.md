# harness-ship

## Purpose

Finalize verified work, summarize the result, and prepare clean handoff notes.

## When To Use

- after `harness-verify`
- before merge, PR submission, or task closure
- when a reliable handoff summary is required

## Required Reads

- `.harness/PLAN.md`
- `.harness/VERIFY.md`
- `.harness/REVIEW.md` if present
- `.harness/STATE.md`
- `.harness/REMEMBER.md` if present

## Skills To Use

- `using-harness`
- `verification`
- `remembering`
- `code-review` when final inspection is needed

## Step-By-Step Workflow

1. Confirm that `.harness/VERIFY.md` supports the current status.
2. Summarize what changed, why it changed, and what was verified.
3. Record follow-ups, deferred work, and residual risk honestly.
4. Write the handoff summary into `.harness/SHIP.md`.
5. Transition to `harness-remember` for durable lessons.

## Output Artifacts

- `.harness/SHIP.md`
- updated `.harness/STATE.md`
- follow-up list if needed

## Completion Gate

The command is complete when the work is verified, summarized, and handed off without hidden assumptions about status, risk, or next steps.

## Artifact Paths

- Read: `.harness/PLAN.md`, `.harness/VERIFY.md`, `.harness/REVIEW.md`, `.harness/STATE.md`
- Write: `.harness/SHIP.md`, `.harness/STATE.md`

## Stop Conditions

- the summary matches the evidence
- follow-ups are explicit
- the work is ready for memory capture

## Failure Modes

- shipping with stale verification
- hiding residual risk
- writing a summary that overstates confidence

## Human Approval

Ask for approval if shipping requires accepting residual risk, deferred verification, or an incomplete scope.

## Notes

`harness-ship` depends on `harness-verify`. It should not be used to upgrade an unverified implementation into a claimed success.
