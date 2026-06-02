# Codex

## `AGENTS.md`

Keep `AGENTS.md` at the repository root so Codex can use it as the main operating contract for artifact-first work.

## `commands/`

Use `commands/` to anchor the operating loop. Ask Codex to run the command that matches the current phase instead of jumping directly into implementation.

## `skills/`

Use `skills/` as process references for mapping, planning, execution, verification, and memory capture. They help keep Codex aligned to the same operating model across sessions.

## `.harness/` Artifacts

Keep the working state in `.harness/`, especially `GOAL.md`, `DISCUSSION.md`, `PLAN.md`, `TASKS.md`, `VERIFY.md`, and `REMEMBER.md`. Codex should update them as the task evolves.

## Recommended First Prompt

> Read `AGENTS.md` and the active `.harness/` artifacts first. Use the harness loop, keep tasks small, and do not code before the goal and plan are clear.

## Known Limitations

- no Codex-specific installer or package is added here
- the runtime guide does not assume any hidden memory outside repository artifacts
- artifact quality still depends on keeping `.harness/` current

## Safety Reminder

Do not store secrets, tokens, customer data, or private business data in harness artifacts.
