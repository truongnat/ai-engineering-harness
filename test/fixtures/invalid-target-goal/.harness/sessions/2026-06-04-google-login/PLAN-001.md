# Plan

## Goal

- Demonstrate a broken session pointer.

## Scope

- Invalid fixture only.

## In Scope

- [ ] stale `current_plan` state

## Out Of Scope

- [ ] fixing the fixture

## Current Understanding

- [ ] `STATE.md` points to a missing plan file on purpose.

## Success Criteria

- [ ] Validation fails.

## Assumptions

- [ ] The validator trusts `current_plan` as the canonical routing field.

## Affected Areas

- File or artifact: `.harness/STATE.md`
- Reason: intentionally stale pointer

## Proposed Approach

- Leave `PLAN-001.md` present while state points elsewhere.

## Tasks

- Task: keep the mismatch visible
- Why now: exercise the failure path
- Affected files or artifacts: `STATE.md`, `PLAN-001.md`
- Verification for this task cluster: run the validator

## Approval Checkpoints

- Checkpoint: none
- Trigger: fixture authoring
- Approval needed from: none
- Notes: invalid by design

## Verification Strategy

- Command: `node validate.js --target <path> --goal 2026-06-04-google-login`
- Expected result: failure naming the missing `PLAN-404.md`

## Risks

- [ ] None beyond fixture confusion.

## Rollback Plan

- Point state back to `PLAN-001.md`.

## Approval Status

status: approved
approved_by: fixture
approved_at: 2026-06-04
notes: Invalid by design.

## Human Approval

Use **Approval Status** above as the canonical approval record.

- Notes: none

## Blocking Questions

If this plan cannot proceed safely, stop and record the blocker instead of improvising.

1. What approval or decision is still missing?
2. Which command should the operator run next?
3. What artifact or evidence is required before execution?
