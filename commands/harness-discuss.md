# harness-discuss

## Purpose

Clarify the goal, scope, constraints, and tradeoffs before planning.

## When To Use

- when the request is ambiguous
- when scope is too large or under-specified
- when there are multiple viable approaches
- before planning non-trivial work

## Required Reads

- `.harness/GOAL.md`
- `.harness/REQUIREMENTS.md` if present
- `.harness/STATE.md` if present
- `.harness/CONTEXT.md` if present
- `.harness/REMEMBER.md` if present

## Skills To Use

- `using-harness`
- `discussing-goals`
- `remembering` when prior decisions constrain the solution

## Step-By-Step Workflow

1. Restate the request in precise engineering language.
2. Separate confirmed requirements from unknowns and assumptions.
3. Identify scope boundaries, success criteria, and constraints.
4. Compare the realistic options and recommend the leanest viable approach.
5. Record the agreed direction in `.harness/DISCUSSION.md`.
6. Stop before planning if the goal or scope is still materially unclear.

## Output Artifacts

- `.harness/DISCUSSION.md`
- updated `.harness/GOAL.md` or `.harness/REQUIREMENTS.md` if needed
- clarified scope and success criteria

## Completion Gate

The command is complete when the goal, boundaries, assumptions, and preferred approach are explicit enough to write a plan without inventing requirements.

## Artifact Paths

- Read: `.harness/GOAL.md`, `.harness/REQUIREMENTS.md`, `.harness/STATE.md`, `.harness/CONTEXT.md`, `.harness/REMEMBER.md`
- Write: `.harness/DISCUSSION.md`, `.harness/GOAL.md`, `.harness/REQUIREMENTS.md`

## Stop Conditions

- scope and success criteria are explicit
- the recommended approach is recorded
- remaining unknowns are small enough for planning

## Failure Modes

- planning while key requirements are still unknown
- silently expanding scope
- mixing confirmed facts with assumptions

## Human Approval

Ask for approval when choosing between materially different approaches, reducing scope, or deferring work that changes the original request.

## Notes

`harness-discuss` exists to reduce ambiguity. It should not become a plan or an implementation log.
