# Provider command matrix

| Provider | Native support status | Packaging path | Install method | Invocation | Dogfood | Next step |
|----------|----------------------|----------------|----------------|------------|---------|-------------|
| Claude Code | native-plugin + project command files | `.claude-plugin/plugin.json`, `.claude/commands/` | `/plugin install …` or npx project install | `/harness-plan`; plugin `/ai-engineering-harness:<skill>` TBD | partial | Marketplace + verify plugin namespace |
| Cursor | plugin-ready | `.cursor-plugin/plugin.json` | `/add-plugin ai-engineering-harness` (pending publish) | Plugin commands from pack `./commands/` when installed | no | Publish to Cursor plugin marketplace |
| OpenCode | native-command-files | `.opencode/commands/` | npx install + optional `opencode.json` plugin | `/harness-plan` | partial | Dogfood TUI `/harness-plan` |
| Gemini | extension context | `gemini-extension.json` | `gemini extensions install <git-url>` | none (ask harness:plan) | partial | Confirm extension skill loading |
| Codex | plugin-packaging | `.codex-plugin/plugin.json` + `skills/` | `/plugins` marketplace once published | plugin skills (no `/harness:*` claim) | pending | Submit marketplace + dogfood |
| Generic | fallback-only | `AGENTS.md` | npx install | ask harness:plan | partial | AGENTS bootstrap only |
| Antigravity | planned | — | — | — | no | Research |

## Manifest fields (project `.ai-harness/manifest.json`)

Per provider in `commandSurface.providers.<id>`:

- `mode` — e.g. `plugin-packaging`, `native-command-files`, `fallback-only`
- `nativeCommands` / `nativeSlashCommands` — boolean
- `fallbackActivation` — boolean (`.ai-harness/` routing)
- `pluginManifest` — e.g. `.codex-plugin/plugin.json` for Codex
- `actualInvocation` — string or null
- `installMethod` — human-readable

## Related

- [provider-native-command-research.md](provider-native-command-research.md)
