# Harness Init Usage

## Purpose

Document **project-local** `.harness/` scaffolding via [install.sh](../install.sh). This is shared across all runtimes before runtime-native install modes land.

## Project Scope Only

- `.harness/` is created **inside the target repository** only.
- **Global** scope with `--init-harness` is **rejected**.
- There is **no** `~/.harness/` or shared global harness state.

## Commands

Dry-run (no writes, no network for non-manual runtimes):

```bash
sh install.sh --runtime claude --scope project --target . --init-harness --dry-run --yes
```

Write scaffold:

```bash
sh install.sh --runtime claude --scope project --target . --init-harness --yes
```

Manual fallback + harness init (downloads pack, then scaffolds `.harness/`):

```bash
sh install.sh --runtime manual --target . --init-harness --dry-run
```

Non-interactive **requires** explicit `--init-harness` (no silent scaffold). Interactive **project** scope may prompt to init after scope selection.

## Generated Files

Minimal structural skeletons (required `##` headings only):

| Path | Role |
|---|---|
| `.harness/HARNESS.md` | Operating model |
| `.harness/TEAM.md` | Team pattern |
| `.harness/SKILLS.md` | Skill selection |
| `.harness/WORKFLOW.md` | Command sequence |
| `.harness/GATES.md` | Quality gates |
| `.harness/MEMORY.md` | Memory policy |
| `.harness/goals/.gitkeep` | Goals directory placeholder |
| `AGENTS.md` | Created **only if missing** (minimal stub for profile validation) |

Fill content after init. Do not store secrets in `.harness/`.

## Dry Run

Prints `WOULD CREATE`, `WOULD SKIP`, or `WOULD OVERWRITE` per file. No filesystem writes.

## Existing Files

| Situation | Behavior |
|---|---|
| File exists, no `--force` | `SKIP` (or `WOULD SKIP` in dry-run) |
| File exists, `--force` | `OVERWRITE` (or `WOULD OVERWRITE`) |
| File missing | `CREATE` (or `WOULD CREATE`) |

## Force

`--force` applies to `.harness/` profile files and `AGENTS.md` when created by init. Manual `install.js` fallback respects `--force` separately.

## Global Scope Rejection

```bash
sh install.sh --runtime claude --scope global --init-harness --yes
```

Exits with:

```txt
Global install cannot create shared .harness state. Run project install inside each repo.
```

## Validate After Init

From the **source pack** (maintainer clone):

```bash
node validate.js --target <path-to-product-repo> --profile-only
```

Checks `.harness/` paths and required headings per [frozen-target-profile-contract.md](frozen-target-profile-contract.md).

## Commit Policy

Installer does **not** modify `.gitignore`. Teams choose whether to commit `.harness/` (often yes for shared operating model). See [project-state-policy.md](project-state-policy.md).

## Related

- [interactive-installer-design.md](interactive-installer-design.md)
- [install-sh-usage.md](install-sh-usage.md)
- [project-state-policy.md](project-state-policy.md)
