# harness-plan

## Purpose

Translate the agreed goal into an explicit, reviewable implementation plan.

## When To Use

- after `harness-discuss`
- before implementation or content changes
- when an existing plan is missing, stale, or invalidated

## Required Reads

- `.harness/GOAL.md`
- `.harness/DISCUSSION.md` if present
- `.harness/CONTEXT.md`
- `.harness/STATE.md`
- relevant workflow and template documents

## Skills To Use

- `using-harness`
- `writing-plans`
- `mapping-codebase` when affected areas need more detail

## Step-By-Step Workflow

1. Restate the approved goal and scope.
2. Identify the files, systems, and `.harness/` artifacts that will change.
3. Break the work into small ordered tasks.
4. Define verification strategy and any not-run risks.
5. Record assumptions, dependencies, rollback considerations, and approval points.
6. Write the plan to `.harness/PLAN.md` and update `.harness/TASKS.md` if task tracking is needed.
7. Stop before implementation.

## Output Artifacts

- `.harness/PLAN.md`
- `.harness/TASKS.md`
- updated `.harness/STATE.md`

## Completion Gate

The command is complete when `.harness/PLAN.md` contains concrete ordered work, explicit scope, verification strategy, approval points, and implementation has not yet started.

## Artifact Paths

- Read: `.harness/GOAL.md`, `.harness/DISCUSSION.md`, `.harness/CONTEXT.md`, `.harness/STATE.md`
- Write: `.harness/PLAN.md`, `.harness/TASKS.md`, `.harness/STATE.md`

## Stop Conditions

- the plan is complete enough for execution
- approval points are explicit
- implementation has not begun

## Failure Modes

- writing a vague plan with no verification
- mixing planning with implementation
- omitting out-of-scope or rollback considerations

## Human Approval

Ask for approval before leaving `harness-plan` if the plan changes scope materially, introduces risky operations, or requires a tradeoff the human has not accepted.

## Notes

`harness-plan` is a hard stop before `harness-run`. If the plan is not clear enough to execute, the command is not complete.
