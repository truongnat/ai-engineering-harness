# PLAN

## Goal

Add a health check endpoint without changing existing behavior.

## Scope

Create a compact plan for a tiny repository.

## In Scope

- a minimal goal artifact set
- validation commands for profile and goal artifacts
- verification notes that do not overclaim runtime behavior

## Out Of Scope

- application implementation
- runtime smoke tests
- installer behavior changes

## Current Understanding

- this example is about artifact quality, not shipping a running app

## Success Criteria

- the plan is specific enough to execute in a target repo
- validation commands are named explicitly
- verification wording stays honest about what was not run

## Assumptions

- the adopting repo will run validation after copying or adapting the artifacts

## Affected Areas

- File or artifact: goal-local `PLAN.md`, `TASKS.md`, `VERIFY.md`
- Reason: show a minimal but disciplined artifact loop

## Tasks

- Task: define the goal contract
- Why now: the target repo needs a clear objective before execution
- Affected files or artifacts: `GOAL.md`, `PLAN.md`
- Verification for this task cluster: review the artifact headings and scope for completeness

- Task: define validation commands
- Why now: structural checks are the main proving mechanism in this tiny example
- Affected files or artifacts: `PLAN.md`, `VERIFY.md`
- Verification for this task cluster: commands point to real validator entrypoints

- Task: prepare verification notes
- Why now: the example must not imply runtime checks that were never run
- Affected files or artifacts: `VERIFY.md`
- Verification for this task cluster: known gaps and pending checks are explicit

## Approval Checkpoints

- Checkpoint: example plan is ready for target-repo adaptation
- Trigger: scope, tasks, and validation commands are explicit
- Approval needed from: example maintainer
- Notes: recorded in Approval Status

## Verification Strategy

- run profile validation
- run goal validation

## Risks

- missing required headings
- mixing planning with implementation

## Approval Status

status: approved
approved_by: example maintainer
approved_at: example
notes: Required before run.

## Human Approval

See Approval Status above.
