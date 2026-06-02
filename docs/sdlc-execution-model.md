# SDLC Execution Model

## Purpose

This document defines how the harness moves from a goal to tasks to verified work using explicit lifecycle states and durable artifacts.

## Goal Lifecycle

- `proposed`
- `discussed`
- `planned`
- `executing`
- `verifying`
- `shipped`
- `remembered`

A goal should move forward only when the current phase has enough evidence to justify the next one.

## Task Lifecycle

- `pending`
- `in_progress`
- `blocked`
- `reviewing`
- `verified`
- `done`

Tasks are smaller than goals and should be explicit enough that one task can be reviewed or retried without destabilizing the entire goal.

## Execution Loop

`plan → task → execute → review → verify → ship → remember`

Use this loop inside the broader harness command loop. The command loop governs phase discipline. The execution loop governs work delivery within a goal.

## Review And Retry Loop

1. Execute one task or a small batch of tightly related tasks.
2. Review the result against plan, scope, and changed artifacts.
3. If the result is incomplete, unsafe, or out of scope, retry with a smaller correction rather than broadening the task.
4. If the plan is no longer valid, stop execution and return to planning.

## Verification Loop

1. Define what evidence is required before the task or goal is considered complete.
2. Run the relevant checks.
3. Record what passed, what failed, and what was not run.
4. If verification reveals a real issue, move back to execution or planning instead of claiming success.

## State Artifact Expectations

Use artifacts to make state visible:

- `.harness/GOAL.md` or goal-level `GOAL.md` for objective and scope
- `.harness/PLAN.md` or goal-level `PLAN.md` for ordered approach
- `.harness/TASKS.md` for the task list and statuses
- goal-level `TASK.md` files when individual tasks need explicit records
- `EXECUTION.md` for active progress, deviations, blockers, and next step
- `VERIFY.md` for evidence and not-run items
- `SHIP.md` for handoff and release summary
- `REMEMBER.md` for durable lessons

## When To Stop And Ask For Human Approval

Stop and ask for human approval when:

- scope must change materially
- risky or irreversible operations are proposed
- the selected workflow or team pattern no longer fits
- verification cannot be completed as planned
- constraints or assumptions in memory conflict with the intended change
- the work touches sensitive policy, security, or business-risk boundaries

## Practical Rule

Keep tasks small, keep state visible, and do not let execution outrun the plan or the evidence.
