# Gemini CLI

## `AGENTS.md`

Keep `AGENTS.md` at the repository root so Gemini CLI can use it as the repository-level contract for the harness loop.

## `commands/`

Use `commands/` as the procedural reference for what to do next. Point Gemini CLI at the relevant command document when you want structured mapping, planning, running, or verification behavior.

## `skills/`

Use `skills/` as concise operating references. They help keep Gemini CLI aligned with the same planning and verification discipline as other tools.

## `.harness/` Artifacts

Keep active state in `.harness/` and have Gemini CLI read those files first. The important part is not the CLI itself, but that the repository artifacts remain the source of truth.

## Recommended First Prompt

> Read `AGENTS.md` and the current `.harness/` artifacts before doing anything else. Use the harness command loop to choose the next step and keep markdown as the source of truth.

## Known Limitations

- no Gemini-specific adapter is included
- no special runtime integration is required
- command discipline still depends on the repository artifacts being accurate

## Safety Reminder

Do not store secrets, tokens, customer data, or private business data in harness artifacts.
