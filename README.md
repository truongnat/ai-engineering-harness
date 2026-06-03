<div align="center">

# ⚙️ ai-engineering-harness

### Runtime-native engineering discipline for AI coding agents

![Version](https://img.shields.io/badge/version-v0.10.8%20experimental-2563eb)
![License](https://img.shields.io/badge/license-MIT-16a34a)
![Markdown First](https://img.shields.io/badge/markdown-first-7c3aed)
![Stable Runtime Support](https://img.shields.io/badge/stable%20runtime%20support-no-ef4444)

**Plan → Build → Verify → Ship → Remember**

A markdown capability pack for AI coding agents — install with an interactive wizard, keep generated files out of your repo root.

[Quickstart](#-quickstart) · [Commands](#-commands) · [Installed layout](#-installed-layout) · [Docs](#-docs)

</div>

---

## What is this?

`ai-engineering-harness` installs a **local capability cache** (`.ai-harness/`), **project state** (`.harness/`), and a **runtime entrypoint** (Cursor rules, Claude instructions, etc.) without copying `commands/` and `skills/` into your project root.

> [!IMPORTANT]
> **v0.10.x is experimental.** Stable per-runtime support is **not** claimed. The install wizard lets you **choose** providers — detection only recommends; it does not auto-install.

---

## 🚀 Quickstart

Inside your target project:

```bash
npx ai-engineering-harness install
```

Verify:

```bash
npx ai-engineering-harness status
npx ai-engineering-harness doctor
```

Non-interactive:

```bash
npx ai-engineering-harness install --provider cursor --yes
```

The wizard uses [@clack/prompts](https://github.com/natemoo-re/clack) for a polished terminal flow (intro, multiselect, plan, spinner, outro). See [docs/terminal-wizard-ux.md](docs/terminal-wizard-ux.md) and [docs/npx-cli-ux.md](docs/npx-cli-ux.md).

## Command support

Provider-native commands use **plugin packaging** at the npm package root (`.cursor-plugin/`, `.claude-plugin/`, etc.). Project `npx install` adds **activation** (`.ai-harness/`) plus provider-native paths where documented.

| Provider | Command mode | Invocation |
|----------|--------------|------------|
| Claude Code | native plugin + project command files | `/harness-plan` (project file); `/plugin install` for pack skills |
| Cursor | plugin packaging ready / marketplace pending | `/add-plugin ai-engineering-harness` when published; else rules → `.ai-harness/` |
| OpenCode | native command files | `/harness-plan` (`.opencode/commands/harness-plan.md`) |
| Gemini | extension context | no universal slash — `gemini extensions install` + ask **harness:plan** |
| Codex | plugin skills via `/plugins` (marketplace pending) | no project-local `/harness:*` — see [codex-plugin-support.md](docs/codex-plugin-support.md) |
| Generic | fallback only | `AGENTS.md` + ask **harness:plan** |

Local catalog (always): `.ai-harness/runtime-commands/` — canonical `harness:plan`, not a universal `/harness:plan` slash.

See [docs/provider-command-matrix.md](docs/provider-command-matrix.md) and [docs/provider-native-command-research.md](docs/provider-native-command-research.md).

## Command behavior

Harness commands use **existing local artifacts first**. For example, `harness:discuss` summarizes and discusses `.harness/REVIEW.md` when present, instead of asking what to do next. Policy: [docs/harness-command-behavior.md](docs/harness-command-behavior.md).

---

## What gets installed

| Path | Role |
|------|------|
| `.ai-harness/` | Capability cache (`commands/`, `skills/`, workflows, templates) |
| `.harness/` | Project state (goals, memory, gates) |
| Provider entrypoint | e.g. `.cursor/rules/ai-engineering-harness.mdc` |
| `.git/info/exclude` | Private mode only — local ignore block (not `.gitignore`) |

Root `commands/`, `skills/`, `workflows/`, and `templates/` are **not** created at the project root.

---

## 🧰 Commands

| Command | Purpose |
|---------|---------|
| `npx ai-engineering-harness install` | Interactive wizard → install |
| `npx ai-engineering-harness status` | Local install summary |
| `npx ai-engineering-harness doctor` | Readiness checks |
| `npx ai-engineering-harness update` | Refresh cache + entrypoints |
| `npx ai-engineering-harness uninstall` | Remove entrypoints (optional full cleanup) |

Aliases: `npx aih install`, `aih install` (after global install/link).

---

## 🔌 Runtime support

| Provider | Install | Stable claim |
|----------|---------|--------------|
| Cursor | ✅ experimental | No |
| Claude Code | ✅ experimental | No |
| Codex / Generic | ✅ experimental | No |
| Gemini | ✅ experimental | No |
| OpenCode | ✅ experimental | No |
| Manual fallback | legacy root copy | No |
| Antigravity | planned (disabled in wizard) | No |

---

## 📚 Docs

| Topic | Doc |
|-------|-----|
| NPX wizard | [docs/npx-cli-ux.md](docs/npx-cli-ux.md) |
| Slash commands | [docs/runtime-command-surface.md](docs/runtime-command-surface.md) |
| v0.10.2 release | [docs/v0.10.2-release-notes.md](docs/v0.10.2-release-notes.md) |
| npm publish | [docs/npm-publish.md](docs/npm-publish.md) |
| Git hygiene | [docs/private-install-git-hygiene.md](docs/private-install-git-hygiene.md) |
| Capability cache | [docs/private-capability-cache.md](docs/private-capability-cache.md) |
| Shell fallback | [docs/simple-cli-ux.md](docs/simple-cli-ux.md) |

---

## Shell fallback

For CI, air-gapped, or no Node:

```bash
sh aih.sh install --runtime cursor --scope project --visibility private --yes
```

```bash
curl -fsSL https://raw.githubusercontent.com/truongnat/ai-engineering-harness/main/aih.sh | sh -s -- install --runtime cursor --yes
```

- `install.sh` — compatibility wrapper around `aih.sh`
- `aih.ps1` — experimental Windows bootstrap (downloads `aih.sh`, requires Git Bash / WSL for `sh`)

Windows: prefer `npx ai-engineering-harness install`; if `sh` is missing, install [Git for Windows](https://git-scm.com/download/win) or use WSL.

---

## Maintainers

```bash
git clone https://github.com/truongnat/ai-engineering-harness.git
cd ai-engineering-harness
node validate.js
npm test
```

Publish: [docs/npm-publish.md](docs/npm-publish.md)

---

## Status

- Current: **v0.10.2** (experimental) — [release notes](docs/v0.10.2-release-notes.md)
- Primary UX: `npx ai-engineering-harness install`
- Stable runtime support: **No**

[CONTRIBUTING.md](CONTRIBUTING.md) · [SECURITY.md](SECURITY.md)
