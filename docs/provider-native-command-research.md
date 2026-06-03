# Provider-native command research

This document records **verified** provider mechanisms. Project-local markdown paths invented by installers are **not** native slash commands unless listed here.

## Reference: obra/superpowers

[obra/superpowers](https://github.com/obra/superpowers) ships provider plugin manifests at the **package root**, not fake project slash paths:

| Artifact | Role |
|----------|------|
| `.cursor-plugin/plugin.json` | `skills`, `commands`, `hooks` → Cursor `/add-plugin superpowers` |
| `.claude-plugin/plugin.json` | Claude marketplace plugin |
| `.codex-plugin/` | Codex plugin packaging |
| `gemini-extension.json` | `gemini extensions install <url>` |
| `.opencode/INSTALL.md` | OpenCode plugin array + native commands |

Cursor manifest (upstream): `commands: "./commands/"`, `skills: "./skills/"` — see [plugin.json](https://github.com/obra/superpowers/blob/main/.cursor-plugin/plugin.json).

## Claude Code

**Source:** [Claude Code — slash commands / skills](https://docs.anthropic.com/en/docs/claude-code/slash-commands)

| Mechanism | Path / action | Invocation |
|-----------|---------------|------------|
| Project command file | `.claude/commands/deploy.md` | `/deploy` |
| Project skill | `.claude/skills/deploy/SKILL.md` | `/deploy` (skill) |
| Plugin skill | `my-plugin/skills/review/SKILL.md` | `/my-plugin:review` (namespaced) |

**ai-engineering-harness:**

- Pack: `.claude-plugin/plugin.json` + repo `commands/`, `skills/`
- Project npx install: `.claude/commands/harness-plan.md` → **`/harness-plan`** (hyphen, per filename rule)
- **`/harness:plan` not claimed** unless plugin namespace dogfooded

## Cursor

**Source:** Superpowers README — `/add-plugin superpowers` or marketplace; [`.cursor-plugin/plugin.json`](https://github.com/obra/superpowers/blob/main/.cursor-plugin/plugin.json) declares `commands`, `skills`, `agents`, `hooks`.

**ai-engineering-harness:**

- Pack: `.cursor-plugin/plugin.json` → `./commands/`, `./skills/`
- **Do not** treat project `.cursor/commands/harness-*.md` as native (removed)
- npx project install: `.cursor/rules/*.mdc` = **fallback activation** for `.ai-harness/`
- Marketplace publish: **pending** — packaging-ready

## OpenCode

**Source:** [OpenCode — Commands](https://opencode.ai/docs/commands)

| Mechanism | Path | Invocation |
|-----------|------|------------|
| Project markdown command | `.opencode/commands/test.md` | `/test` |

**ai-engineering-harness:**

- Project install: `.opencode/commands/harness-plan.md` → **`/harness-plan`**
- `opencode.json` may include `"plugin": ["ai-engineering-harness@git+..."]` per [.opencode/INSTALL.md](../.opencode/INSTALL.md)

## Gemini CLI

**Source:** Superpowers — `gemini extensions install <git-url>`; extension manifest `gemini-extension.json` + `GEMINI.md`.

**ai-engineering-harness:**

- Pack root `gemini-extension.json`
- Project/runtime: `.gemini/extensions/ai-engineering-harness/` with manifest + context
- **No** invented `commands/*.md` slash claim under extension

## Codex

**Sources:**

- [openai/plugins](https://github.com/openai/plugins) — required `.codex-plugin/plugin.json`; optional `skills/`, `commands/`, `agents/`, `hooks.json`
- [build-web-apps example](https://github.com/openai/plugins/tree/main/plugins/build-web-apps) — `skills: "./skills/"` + `interface` block
- [Superpowers README](https://github.com/obra/superpowers) — Codex install: `/plugins` → search → Install Plugin

**ai-engineering-harness:**

- Pack: `.codex-plugin/plugin.json` + repo `skills/` (no fake `.codex/commands/`)
- **Not** a project-local `/harness:*` slash provider
- `npx install --provider codex`: `AGENTS.md` + `.ai-harness/` **fallback only**
- Native: install plugin via Codex `/plugins` when marketplace entry exists

See [codex-plugin-support.md](codex-plugin-support.md).

## Local catalog (always)

Regardless of provider:

```txt
.ai-harness/runtime-commands/harness-<id>.md
.ai-harness/activation.md
```

Canonical names: `harness:plan`, … — use when asking the agent on fallback-only providers.

## Related

- [provider-command-matrix.md](provider-command-matrix.md)
- [runtime-command-surface.md](runtime-command-surface.md)
