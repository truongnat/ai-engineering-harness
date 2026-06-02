# harness-remember

## Purpose

Capture durable, reusable, non-sensitive lessons after verified work ships.

## When To Use

- after verified work ships
- after root causes or tradeoffs become clear
- when future sessions would benefit from a durable note

## Required Reads

- `.harness/PLAN.md`
- `.harness/VERIFY.md`
- `.harness/SHIP.md`
- `.harness/REMEMBER.md` if present
- `.harness/STATE.md`

## Skills To Use

- `using-harness`
- `remembering`
- `code-review` when the memory depends on verified findings

## Step-By-Step Workflow

1. Review the verified outcome, not just the implementation steps.
2. Extract the durable lesson, decision, root cause, or hazard.
3. Remove transient details and anything sensitive.
4. Write the memory into `.harness/REMEMBER.md`.
5. Confirm the note is safe, durable, and reusable.

## Output Artifacts

- `.harness/REMEMBER.md`
- updated `.harness/STATE.md`
- durable decision summary

## Completion Gate

The command is complete when a future operator can recover the important lesson without replaying the whole session and without exposing sensitive information.

## Artifact Paths

- Read: `.harness/PLAN.md`, `.harness/VERIFY.md`, `.harness/SHIP.md`, `.harness/STATE.md`
- Write: `.harness/REMEMBER.md`, `.harness/STATE.md`

## Stop Conditions

- the lesson is durable
- the note contains no secrets or private business data
- the memory is useful for future sessions

## Failure Modes

- saving transient execution noise
- storing credentials, tokens, customer data, or private business data
- writing memory before the outcome is verified

## Human Approval

Ask for approval if the only useful lesson depends on sensitive business context that cannot be safely generalized.

## Notes

`harness-remember` is not a transcript archive. It is a durable knowledge filter.
