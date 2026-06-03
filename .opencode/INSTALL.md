# OpenCode — ai-engineering-harness

## Native custom commands (project)

OpenCode loads markdown commands from `.opencode/commands/`. Filename becomes the slash name (e.g. `harness-plan.md` → `/harness-plan`).

The npx installer writes project-local command files that route to `.ai-harness/` when you run:

```bash
npx ai-engineering-harness install --provider opencode --yes
```

## Plugin install (package)

Add to `opencode.json`:

```json
{
  "plugin": [
    "ai-engineering-harness@git+https://github.com/truongnat/ai-engineering-harness.git"
  ]
}
```

Or from npm when published:

```json
{
  "plugin": ["ai-engineering-harness@npm:ai-engineering-harness"]
}
```

## Skills

Use OpenCode's native `skill` tool to list/load skills from the plugin package when installed.

## References

- [OpenCode commands docs](https://opencode.ai/docs/commands)
- [provider-native-command-research.md](../docs/provider-native-command-research.md)
