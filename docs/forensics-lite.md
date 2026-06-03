# Forensics Lite

Use this when a harness workflow produced confusing results, contradictory artifacts, or a verification failure that is not yet understood.

This is intentionally a manual recipe, not a new command.

## When To Use

- `VERIFY.md` and the actual repo state disagree
- a plan was executed but the result looks out of scope
- review findings suggest hidden regressions
- the next correct command is unclear because artifacts contradict each other

## Evidence Order

1. Read the active `.harness/` artifacts in priority order.
2. Check the changed files or diff directly.
3. Re-run the smallest proving command that can confirm or reject the claim.
4. Record the mismatch before attempting corrective edits.

## Minimal Investigation Loop

1. Confirm the intended goal from `.harness/GOAL.md`.
2. Confirm the approved scope from `.harness/PLAN.md`.
3. Check task and state progression in `.harness/TASKS.md` and `.harness/STATE.md`.
4. Compare those artifacts against the actual code or document changes.
5. Re-run the relevant verification command or manual check.
6. Write the real outcome to `.harness/VERIFY.md` or `.harness/REVIEW.md`.
7. Redirect to `harness-discuss`, `harness-plan`, or `harness-run` if the workflow needs correction.

## Questions To Answer

- What was supposed to happen?
- What actually changed?
- What evidence proves the mismatch?
- Is the problem scope drift, missing verification, stale artifacts, or a real implementation bug?
- Which earlier command should the workflow return to?

## Do Not Do

- Do not patch over the mismatch with optimistic prose.
- Do not mark work complete while the contradiction is unresolved.
- Do not rewrite history in artifacts without noting the gap.
- Do not expand scope while diagnosing a failed narrow task.

## Outcome

A good forensics-lite pass leaves:

- one clear problem statement
- one evidence-backed explanation of the mismatch
- one recommended next command in the harness loop
