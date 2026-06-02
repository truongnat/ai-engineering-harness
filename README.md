# ai-engineering-harness

Markdown-first engineering discipline for AI coding agents.

License: [MIT](LICENSE) | Validation: GitHub Actions `Validate` | Release: [`v0.1.0`](docs/v0.1.0-release-notes.md)

`ai-engineering-harness` is a markdown-first harness design system for AI-assisted engineering work. It helps agents operate with explicit plans, durable artifacts, quality gates, and memory instead of improvising from a single prompt.

See [TARGET.md](TARGET.md) for the long-term project target.

## What It Is

- A markdown-first harness design system for engineering agents.
- A disciplined way for agents to plan, execute, verify, ship, and remember.
- A portable model that works with Claude Code, Codex, Cursor, Gemini, OpenCode, or any agent that can read repository files.

## What It Is Not

- Not a framework
- Not a runtime
- Not a server
- Not an orchestration platform
- Not a database-backed memory system

## Why It Exists

- Agents lose context.
- Agents code before planning.
- Agents skip verification.
- Agents forget previous fixes.
- Agents need durable project-specific artifacts.

## Core Loop

`Map → Start → Discuss → Plan → Run → Verify → Ship → Remember`

Start with [`commands/`](commands/) and use the loop as the default operating path.

## Core Model

| Layer | Purpose |
|---|---|
| Skills | capability |
| Memory | context |
| Workflows | process |
| Team Patterns | collaboration structure |
| Quality Gates | evidence discipline |
| Harness Profile | project-specific operating context |

## Quick Start

```bash
git clone https://github.com/truongnat/ai-engineering-harness.git
cd ai-engineering-harness
node validate.js
node install.js --target ../my-project --dry-run
node install.js --target ../my-project
```

Then:

1. Read [AGENTS.md](AGENTS.md).
2. Create or review `.harness/` artifacts in the host repo.
3. Start with [`commands/harness-start.md`](commands/harness-start.md).
4. Move through the command loop with evidence at each phase.

## Start Here

| Need | Read |
|---|---|
| Long-term direction | [TARGET.md](TARGET.md) |
| Agent operating contract | [AGENTS.md](AGENTS.md) |
| Adoption into another repo | [docs/adoption-guide.md](docs/adoption-guide.md) |
| Runtime overview | [docs/runtime-compatibility.md](docs/runtime-compatibility.md) |
| Runtime-specific guides | [docs/runtimes/README.md](docs/runtimes/README.md) |
| Quality gates | [docs/quality-gates-matrix.md](docs/quality-gates-matrix.md) |
| Session startup | [docs/session-start-checklist.md](docs/session-start-checklist.md) |
| Examples | [examples/demo-project/](examples/demo-project/) and [examples/workflows/](examples/workflows/) |

## Adoption

- [Adoption Guide](docs/adoption-guide.md)
- [Adoption Smoke Test](docs/adoption-smoke-test.md)
- [Usage Examples](docs/usage-examples.md)
- [Host Repo Checklist](docs/host-repo-checklist.md)

## Release

- [CHANGELOG.md](CHANGELOG.md)
- [docs/v0.1.0-release-notes.md](docs/v0.1.0-release-notes.md)
- [docs/release-checklist.md](docs/release-checklist.md)
- [docs/versioning.md](docs/versioning.md)

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before changing commands, skills, docs, or validation rules. For security concerns, use [SECURITY.md](SECURITY.md) and do not disclose sensitive details publicly.
