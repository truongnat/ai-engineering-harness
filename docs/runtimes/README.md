# Runtime Guides

These guides explain how to use the markdown-first harness with specific agent tools without adding adapters, plugins, or runtime code.

## Included Guides

- [Session Start Checklist](../session-start-checklist.md)
- [Claude Code](claude-code.md)
- [Codex](codex.md)
- [Cursor](cursor.md)
- [Gemini CLI](gemini-cli.md)
- [OpenCode](opencode.md)

## Shared Model

Across runtimes:

- keep `AGENTS.md` at the repository root
- keep active project artifacts in `.harness/`
- treat `commands/` as the operating loop
- treat `skills/` as reusable behavior references
- keep markdown as the source of truth

## Safety Reminder

Do not store secrets, tokens, customer data, or private business data in harness artifacts.
