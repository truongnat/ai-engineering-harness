# OpenCode

## `AGENTS.md`

Keep `AGENTS.md` at the repository root so OpenCode can use it as the shared repository contract.

## `commands/`

Use `commands/` as the high-level operating loop. Reference the specific command document that matches the current phase of work instead of relying on implicit workflow.

## `skills/`

Use `skills/` as compact reusable guidance for mapping, discussion, planning, execution, verification, and durable memory capture.

## `.harness/` Artifacts

Keep all active task artifacts in `.harness/` so OpenCode can read the current goal, plan, verification notes, and memory directly from the repository.

## Recommended First Prompt

> Read `AGENTS.md` plus the active `.harness/` artifacts first. Use the harness loop, keep changes surgical, and update markdown artifacts as the work progresses.

## Known Limitations

- no OpenCode-specific installer is added
- no plugin or marketplace packaging is assumed
- the guide is usage-only, not a runtime integration

## Safety Reminder

Do not store secrets, tokens, customer data, or private business data in harness artifacts.
