# harness-verify

## Purpose

Gather fresh evidence that the implemented work meets the goal before any completion or shipping claim.

## When To Use

- after implementation changes
- before any completion claim
- before merge, handoff, or release
- after bugfixes, refactors, and risky documentation changes

## Required Reads

- `.harness/PLAN.md`
- `.harness/GOAL.md`
- `.harness/TASKS.md` if present
- `.harness/REVIEW.md` if present
- `.harness/VERIFY.md` if present

## Skills To Use

- `using-harness`
- `verification`
- `code-review` when inspection is part of the gate

## Step-By-Step Workflow

1. Identify the exact checks that prove the claim.
2. Run the checks fresh.
3. Record command output summaries, manual checks, and anything not run.
4. Compare the evidence against the goal and plan.
5. Write pass, fail, or partial status into `.harness/VERIFY.md`.
6. Stop if evidence is missing, contradictory, or failed.

## Output Artifacts

- `.harness/VERIFY.md`
- updated `.harness/STATE.md`
- optional `.harness/REVIEW.md` if review findings were required

## Completion Gate

The command is complete when the evidence clearly supports the claimed outcome or the exact verification gaps are documented so no one can mistake them for a pass.

## Artifact Paths

- Read: `.harness/PLAN.md`, `.harness/GOAL.md`, `.harness/TASKS.md`, `.harness/REVIEW.md`
- Write: `.harness/VERIFY.md`, `.harness/STATE.md`

## Stop Conditions

- evidence supports the claim
- evidence disproves the claim
- verification is partial and the gap is documented

## Failure Modes

- assuming success because the change looks correct
- reporting only passing checks and hiding skipped checks
- claiming done with stale verification

## Human Approval

Ask for approval if a known verification gap must be accepted for shipping or if a failing result suggests changing scope or rollback strategy.

## Notes

`harness-verify` is evidence collection, not optimism. Partial verification must be labeled as partial.
