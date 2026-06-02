# Runtime Compatibility

`ai-engineering-harness` is runtime-light by design. It does not require a server, orchestrator, or agent framework to be useful.

## Common Model

Across tools, the operating model stays the same:

- read `AGENTS.md`
- use `.harness/` artifacts as the active working state
- follow the command loop
- treat markdown as the source of truth

## Claude Code

Use the harness as repository guidance:

- keep `AGENTS.md` at the repository root
- ask Claude Code to read `.harness/` artifacts first
- use `commands/` and `skills/` as process references during work

Claude Code works well with this repository because it can read markdown artifacts directly and follow explicit operating rules.

## Codex

Use the harness as a shared contract inside the repository:

- keep `.harness/` updated as work progresses
- use commands and templates to make state explicit
- rely on validation and repository review rather than hidden session memory

Codex benefits from the harness because it reduces guesswork and keeps scope and verification visible.

## Cursor

Use the harness as editor-adjacent process documentation:

- keep `AGENTS.md` and `.harness/` in the repository
- reference plans, tasks, and verification notes directly from markdown
- use the harness to separate planning from implementation

Cursor does not need a special runtime adapter to benefit from the markdown operating model.

## Gemini CLI

Use the same repository contract:

- load the active `.harness/` artifacts first
- treat workflows and commands as the procedural guide
- preserve durable lessons in sanitized memory artifacts

Gemini CLI can follow the harness as long as the repository keeps the markdown artifacts current.

## OpenCode

Use the harness as a portable engineering layer:

- copy the harness assets into the repository
- keep the working state in `.harness/`
- drive execution from plans and verification notes rather than prompt-only context

## Compatibility Boundaries

This harness is designed to stay high-level and portable.

It does not assume:

- a specific orchestration runtime
- background daemons
- databases
- a web UI
- a server process

If a tool can read markdown and work inside a repository, it can usually adopt this harness model.
