# Plan

## Goal

- Add session-native target validation coverage for the Google login workstream.

## Scope

- Target fixture artifacts and validator behavior only.

## In Scope

- [ ] STATE routing
- [ ] session-local goal artifacts
- [ ] structural validation only

## Out Of Scope

- [ ] production auth behavior

## Current Understanding

- [ ] The CLI flag remains `--goal`, but the validated artifact set now lives under `.harness/sessions/<session-id>/`.

## Success Criteria

- [ ] Target goal validation passes for this fixture.

## Assumptions

- [ ] Session id doubles as the current validation id passed to `--goal`.

## Affected Areas

- File or artifact: `.harness/STATE.md`
- Reason: routes the active session and current plan

## Proposed Approach

- Validate the active session selected in state and require a numbered plan file.

## Tasks

- Task: create session-local artifacts
- Why now: target validation must stop relying on the legacy flat goal directory
- Affected files or artifacts: `.harness/sessions/2026-06-04-google-login/*`
- Verification for this task cluster: run `node validate.js --target <path> --goal 2026-06-04-google-login`

## Approval Checkpoints

- Checkpoint: session contract accepted
- Trigger: before implementation proceeds
- Approval needed from: fixture maintainer
- Notes: approved in fixture

## Verification Strategy

- Command: `node validate.js --target <path> --goal 2026-06-04-google-login`
- Expected result: target goal validation passes

## Risks

- [ ] State routing may drift from actual session files.

## Rollback Plan

- Restore the previous fixture layout if session validation is reverted.

## Approval Status

status: approved
approved_by: fixture
approved_at: 2026-06-04
notes: Session-native fixture for target validation.

## Human Approval

Use **Approval Status** above as the canonical approval record.

- Notes: none

## Blocking Questions

If this plan cannot proceed safely, stop and record the blocker instead of improvising.

1. What approval or decision is still missing?
2. Which command should the operator run next?
3. What artifact or evidence is required before execution?
