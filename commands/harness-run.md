# harness-run

## Purpose

Execute the approved plan in small, surgical steps without silent scope drift.

## When To Use

- after `.harness/PLAN.md` is approved
- when implementation is ready to begin
- when resuming planned work

## Required Reads

- `.harness/PLAN.md`
- `.harness/TASKS.md` if present
- `.harness/GOAL.md`
- `.harness/CONTEXT.md`
- `.harness/STATE.md`
- `.harness/VERIFY.md` if verification expectations already exist

## Skills To Use

- `using-harness`
- `executing-plans`
- `test-driven-development` when behavior changes
- `writing-skills` when adding or revising skills

## Step-By-Step Workflow

1. Re-read `.harness/PLAN.md` before making changes.
2. Execute the next smallest approved task only.
3. Keep changes tightly aligned to the recorded scope.
4. Update `.harness/TASKS.md` and `.harness/STATE.md` as status changes.
5. Record deviations or blockers instead of improvising around them.
6. Prepare verification notes in `.harness/VERIFY.md` as evidence is gathered.
7. Stop and return to `harness-discuss` or `harness-plan` if scope changes materially.

## Output Artifacts

- implemented repository changes
- `.harness/TASKS.md`
- `.harness/STATE.md`
- optional `.harness/VERIFY.md` draft notes

## Completion Gate

The command is complete when the approved planned scope is implemented or explicitly paused, and any deviations are documented rather than hidden.

## Artifact Paths

- Read: `.harness/PLAN.md`, `.harness/TASKS.md`, `.harness/GOAL.md`, `.harness/CONTEXT.md`, `.harness/STATE.md`
- Write: `.harness/TASKS.md`, `.harness/STATE.md`, `.harness/VERIFY.md`

## Stop Conditions

- the next planned task is complete
- a blocker requires re-planning
- scope drift is detected
- verification must run before further work

## Failure Modes

- implementing unplanned work
- expanding scope because a nearby cleanup looks tempting
- failing to update task or state artifacts

## Human Approval

Ask for approval before taking destructive actions, widening scope, or adopting a materially different implementation approach than the one in `.harness/PLAN.md`.

## Notes

`harness-run` follows the plan. It does not authorize new scope by itself.
