# Cursor

## `AGENTS.md`

Keep `AGENTS.md` at the repository root so Cursor sessions can use it as the shared operating contract for planning, execution, and verification.

## `commands/`

Use `commands/` as the practical loop for deciding what the agent should do next. Point Cursor to the specific command document when you want it to map, plan, verify, or remember.

## `skills/`

Use `skills/` as reusable references when the agent needs a strict process for planning, execution, review, or verification.

## `.harness/` Artifacts

Store active project state in `.harness/`. Cursor should read the current goal, context, and plan before implementation and update the relevant artifacts as the task moves forward.

## Recommended First Prompt

> Read `AGENTS.md`, then load `.harness/GOAL.md`, `.harness/STATE.md`, and `.harness/PLAN.md` if they exist. Follow the harness loop and tell me which command should run next.

## Known Limitations

- no Cursor-specific installer is provided
- no generated Cursor configuration is required
- the harness remains document-driven rather than editor-driven

## Safety Reminder

Do not store secrets, tokens, customer data, or private business data in harness artifacts.
