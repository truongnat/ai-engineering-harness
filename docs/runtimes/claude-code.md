# Claude Code

## `AGENTS.md`

Keep `AGENTS.md` at the repository root so Claude Code can use it as the main operating contract.

## `commands/`

Reference `commands/` as the step-by-step operating loop. Use the command documents to decide whether the next action is map, discuss, plan, run, verify, ship, or remember.

## `skills/`

Reference `skills/` as compact reusable guidance for mapping, planning, execution, verification, and memory capture.

## `.harness/` Artifacts

Keep active artifacts such as `.harness/GOAL.md`, `.harness/PLAN.md`, and `.harness/VERIFY.md` current. Claude Code should read them before touching code and update them as work progresses.

## Recommended First Prompt

> Read `AGENTS.md` and the active `.harness/` artifacts first. Use the harness command loop to determine the next step before making changes.

## Known Limitations

- this repository does not install Claude-specific tooling
- the guides do not assume any Claude marketplace or plugin packaging
- markdown discipline still depends on the operator keeping `.harness/` current

## Safety Reminder

Do not store secrets, tokens, customer data, or private business data in harness artifacts.
