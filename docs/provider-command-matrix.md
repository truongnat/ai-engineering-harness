# Provider command matrix

Active scope (v0.11.0): Claude, Cursor, Codex, Gemini — **not OpenCode**.

| Provider | Native support status | Packaging path | Install method | Invocation | Dogfood | Next step |
|----------|----------------------|----------------|----------------|------------|---------|-------------|
| Claude Code | native-plugin + project command files | `.claude-plugin/plugin.json`, `.claude/commands/` | `/plugin install …` or npx project install | `/harness-plan` for workflow commands where project command files exist; plugin skills documented separately | partial | Primary polish + marketplace |
| Cursor | native-command-files + rules | `.cursor-plugin/plugin.json`, `.cursor/commands/`, `.cursor/rules/` | `/add-plugin` (pending publish) or npx project install | `/harness-plan` from project command files | no | Secondary polish + marketplace |
| Codex | plugin-packaging | `.codex-plugin/plugin.json` + `skills/` | `/plugins` marketplace once published | plugin skills (no `/harness-*` claim) | pending | Marketplace submit |
| Gemini | native-command-files + extension context | `gemini-extension.json`, `.gemini/extensions/ai-engineering-harness/` | `gemini extensions install <git-url>` or project extension dir | `GEMINI.md` context; ask harness-plan | partial | Extension dogfood |

## Removed from active scope

| Provider | Notes |
|----------|-------|
| OpenCode | Removed v0.11.0 — was experimental; use `aih.sh uninstall --runtime opencode` only for legacy cleanup |

## Manifest fields (project `.ai-harness/manifest.json`)

Per provider in `commandSurface.providers.<id>`:

- `mode` — e.g. `plugin-packaging`, `native-plugin`, `fallback-only`
- `nativeCommands` / `nativeSlashCommands` — boolean
- `fallbackActivation` — boolean (`.ai-harness/` routing)
- `workflowInvocation` — verified workflow command entrypoint only
- `pluginSkillNamespace` — provider-specific plugin skill surface, documented separately from workflow commands

## Related

- [provider-rule-configuration.md](provider-rule-configuration.md)
- [provider-native-command-research.md](provider-native-command-research.md)
- [harness-command-behavior.md](harness-command-behavior.md)

## Provider rule adapters

| Provider | Rule entrypoints | Native `/harness-*` | Subagents | Rule mode |
|----------|------------------|--------------------:|----------:|-----------|
| Claude Code | `.claude/CLAUDE.md`, `.claude/commands/`, `.claude/agents/` | Yes | Yes | claude-project |
| Cursor | `.cursor/commands/`, `.cursor/rules/` | Yes | No | cursor-rules |
| Codex | `AGENTS.md` | No | No | agents-md |
| Gemini | `.gemini/extensions/ai-engineering-harness/GEMINI.md` | No | No | gemini-extension |
| Generic | `AGENTS.md` | No | No | agents-md |

Core fragments: `rules/core/`. Renderer: `lib/provider-rule-renderer.js`.
