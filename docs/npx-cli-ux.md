# NPX CLI UX

## Purpose

`npx ai-engineering-harness` is the **primary** install UX for v0.10.x (experimental). Interactive wizard similar to `npx skills add`: header, detected hints, keyboard selection, plan, confirm.

**Fallbacks:** `aih.sh`, `install.sh`, `aih.ps1` — see [simple-cli-ux.md](simple-cli-ux.md).

## Primary command

```bash
npx ai-engineering-harness install
```

Aliases: `npx aih install`, `aih install` (global/link).

## Detection is recommendation only

Hints (`.cursor/`, `.claude/`, `.gemini/`, `.opencode/`, harness `AGENTS.md`) mark providers **(recommended)** and may preselect in the wizard. The CLI **never** silently installs based on detection alone.

## Install wizard

1. Package version, target, git repo
2. Detected provider hints (informational)
3. Multi-select providers (space / enter)
4. Install mode: project private | project shared | global
5. Init `.harness/`?
6. Install `.ai-harness/` cache?
7. Plan + non-Git warning for private mode
8. Confirm
9. Backend: bundled `aih.sh` per provider

```txt
Will install:
  .ai-harness/
  .harness/
  .cursor/rules/ai-engineering-harness.mdc
  .git/info/exclude block

Will not modify:
  .gitignore
  root commands/
  root skills/
  root workflows/
  root templates/
  root patterns/
```

## Update / uninstall

```bash
npx ai-engineering-harness update
npx ai-engineering-harness uninstall
```

Interactive: select **installed** providers. Uninstall defaults keep `.ai-harness/` and `.harness/`; optional full cleanup maps to `aih.sh --all`.

## Non-interactive

```bash
npx ai-engineering-harness install --provider cursor --yes
npx ai-engineering-harness install --provider cursor,claude --yes --dry-run
npx ai-engineering-harness uninstall --provider cursor --yes
npx ai-engineering-harness uninstall --all --yes
```

| Flag | Purpose |
|------|---------|
| `--provider` | Primary; comma-separated (`--runtime` alias) |
| `--scope` | `project` \| `global` |
| `--visibility` | `private` \| `shared` |
| `--target`, `--ref`, `--dry-run`, `--yes`, `--all` | See `npx ai-engineering-harness --help` |

Without `--provider` in non-interactive mode: `No provider selected. Pass --provider cursor or run interactively.`

## Windows

- Primary: `npx ai-engineering-harness install`
- Backend needs `sh` — Git Bash or WSL
- Missing `sh`: `Git Bash or WSL is required for the shell backend in v0.10.x. Native JS backend is planned.`
- `aih.ps1` is experimental fallback only

## npm package

Published as `ai-engineering-harness`. See [npm-publish.md](npm-publish.md). Tarball excludes `test/` and `examples/`.

## Limitations

- Antigravity disabled in wizard
- Stable runtime support not claimed
- Manual + runtime-native cannot combine in one install

## Related

- [v0.10.0-release-notes.md](v0.10.0-release-notes.md)
- [private-install-git-hygiene.md](private-install-git-hygiene.md)
