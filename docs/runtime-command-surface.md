# Runtime Command Surface

## Why commands exist

Installing `.ai-harness/` gives the agent files to read, but does not tell the tool **which** command to run in a repo with many global skills or multiple projects.

Project-scoped **`/harness:*`** commands route to this repository only:

```txt
.ai-harness/activation.md
  → .ai-harness/runtime-commands/harness-<id>.md
  → .ai-harness/commands/harness-<id>.md
  → .harness/ project state
```

## Command namespace

| Command | Purpose |
|---------|---------|
| `/harness:start` | Start or resume active goal |
| `/harness:map` | Map affected codebase |
| `/harness:discuss` | Discuss scope before plan |
| `/harness:plan` | Create/update plan |
| `/harness:run` | Execute approved plan |
| `/harness:verify` | Verify against gates |
| `/harness:ship` | Ship with proof |
| `/harness:remember` | Update durable memory |
| `/harness:status` | Summarize harness state |
| `/harness:doctor` | Readiness checks |

## Provider support matrix

| Provider | Native slash | Install path | Notes |
|----------|--------------|--------------|-------|
| Claude Code | Yes (project) | `.claude/commands/harness/*.md` | `/harness:plan` via Claude command files |
| Cursor | Fallback | `.cursor/commands/harness-*.md` + `.cursor/rules/ai-engineering-harness-commands.mdc` | Native Cursor slash not claimed stable |
| Codex / Generic | Alias | `AGENTS.md` command table | Maps to `.ai-harness/runtime-commands/` |
| Gemini | Alias | `.gemini/extensions/.../commands/` | Extension commands + GEMINI.md |
| OpenCode | Alias | Plugin comment map | Points agent to runtime-commands |
| Antigravity | — | planned | Not implemented |

## Local activation rule

Every command file instructs the agent to:

1. Read `.ai-harness/manifest.json`
2. Read `.ai-harness/activation.md`
3. Use only local `.ai-harness/` and `.harness/`
4. Refuse or warn if cache/state is missing
5. Never default to global or sibling-repo harness files

## Manifest

`.ai-harness/manifest.json` records:

- `commandNamespace`: `harness`
- `slashCommands`: full list
- `providerCommandEntrypoints`: paths per provider

## Troubleshooting

| Symptom | Action |
|---------|--------|
| Agent picks wrong skill | Run `/harness:plan` or reinstall; check activation.md |
| Command not found (Claude) | Reinstall; verify `.claude/commands/harness/plan.md` |
| Cursor ignores slash | Use rule fallback or ask: "run /harness:plan using this repo .ai-harness" |
| Doctor fails runtime-commands | `npx ai-engineering-harness update` |

## Related

- [npx-cli-ux.md](npx-cli-ux.md)
- [private-capability-cache.md](private-capability-cache.md)
