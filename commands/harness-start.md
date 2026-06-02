# harness-start

## Purpose

Start a session by loading the active `.harness/` state and deciding which command should run next.

## When To Use

- at the start of a new task
- when resuming paused work
- when switching to a different subsystem or repository area

## Required Reads

- `AGENTS.md`
- `.harness/PROJECT.md` if present
- `.harness/GOAL.md` if present
- `.harness/STATE.md` if present
- `.harness/CONTEXT.md` if present
- `.harness/PLAN.md` if present

## Skills To Use

- `using-harness`
- `mapping-codebase`
- `discussing-goals` when the goal is still ambiguous

## Step-By-Step Workflow

1. Read the active goal, state, context, and plan artifacts before touching code.
2. Confirm whether the task is new, resumed, blocked, or ready for verification.
3. Decide which harness command should run next.
4. Refresh `.harness/STATE.md` if the recorded status is stale.
5. Stop with a clear next action instead of drifting into implementation.

## Output Artifacts

- `.harness/STATE.md`
- session start summary
- chosen next command

## Completion Gate

The command is complete when the session has a clear current state, the relevant artifacts are loaded, and the next command is explicit.

## Artifact Paths

- Read: `.harness/PROJECT.md`, `.harness/GOAL.md`, `.harness/STATE.md`, `.harness/CONTEXT.md`, `.harness/PLAN.md`
- Write: `.harness/STATE.md`

## Stop Conditions

- the next command is chosen
- the recorded state matches reality
- no implementation has started implicitly

## Failure Modes

- treating `harness-start` as implementation
- skipping stale state artifacts
- assuming the previous session ended cleanly

## Human Approval

Ask for approval if the previously recorded plan is invalid and a materially different direction is required.

## Notes

Use `harness-start` to restore discipline at session boundaries. It should be short and explicit.
