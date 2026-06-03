# Runtime Install Payloads

Files here are installed by `install-runtime.js` (from `install.sh`) into **provider-specific entrypoints**. They do **not** copy the full capability pack into the product repo root.

## Three-layer model (project scope)

```txt
<runtime entrypoint>  →  adapter (this directory)
.ai-harness/          →  capability source (install-cache.js)
.harness/             →  project state (--init-harness)
```

Every project runtime-native install should run **cache + optional harness init + runtime payload**. Entrypoints only tell the agent where to read; without `.ai-harness/` there is no local `commands/`, `skills/`, or `workflows/`.

| Layer | Examples |
|---|---|
| Entrypoint | `.cursor/rules/ai-engineering-harness.mdc`, `.claude/CLAUDE.md`, `AGENTS.md`, `.gemini/extensions/.../GEMINI.md`, `.opencode/plugins/...js` |
| Capability | `.ai-harness/AGENTS.md`, `commands/`, `skills/`, `workflows/`, … |
| State | `.harness/HARNESS.md`, goals, memory |

## Payload map

| Path | Runtime |
|---|---|
| `bootstrap/` | Codex, generic → project `AGENTS.md` |
| `cursor/rules/` | Cursor; **windsurf** aliases to cursor until separate payload exists |
| `claude/` | Claude Code project/global |
| `gemini/` | Gemini CLI extension |
| `opencode/plugins/` | OpenCode plugin bootstrap message |

See [docs/private-capability-cache.md](../docs/private-capability-cache.md) and [docs/runtime-install-matrix-research.md](../docs/runtime-install-matrix-research.md).
