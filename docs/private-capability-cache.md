# Private Capability Cache (`.ai-harness/`)

## Purpose

Runtime-native installs (v0.9.1+) place **provider entrypoints** under `.cursor/`, `.claude/`, etc., and **project state** under `.harness/`. They do **not** copy the full capability pack into the product repo root.

Without a local capability source, agents only see thin bootstrap text pointing at empty `.harness/` skeletons. **v0.9.2 Step 2** installs the pack surface into a **private, namespaced cache**:

```txt
.ai-harness/
```

## Why `.ai-harness/` Exists

| Problem | Fix |
|---|---|
| Root copy pollutes product repos | Cache under `.ai-harness/` only |
| Runtime-only install has no `commands/`, `skills/`, … locally | Copy selected pack surface into cache |
| `.harness/` is project-specific state | Keep capabilities separate from goals/profile |

## Difference Between `.ai-harness/` and `.harness/`

| Path | Role |
|---|---|
| `.ai-harness/` | **Capability source** — shared pack: `AGENTS.md`, `commands/`, `skills/`, `workflows/`, `patterns/`, `templates/`, selected `docs/` |
| `.harness/` | **Project state** — this repo's profile, gates, memory, active goals |
| Runtime bootstrap (e.g. `.cursor/rules/ai-engineering-harness.mdc`) | **Provider entrypoint** — tells the agent where to read cache + state |

Agents should read `.ai-harness/AGENTS.md` first, use `.ai-harness/commands/` and `.ai-harness/skills/` for capabilities, then read `.harness/` artifacts for this project.

## Installed Layout

After a **private project** Cursor install (default cache on):

```txt
your-project/
├── .ai-harness/
│   ├── AGENTS.md
│   ├── commands/
│   ├── skills/
│   ├── workflows/
│   ├── patterns/
│   ├── templates/
│   ├── docs/          # selected usage docs only
│   ├── PACK.md
│   └── README.md
├── .harness/
│   ├── HARNESS.md
│   ├── TEAM.md
│   └── …
└── .cursor/
    └── rules/
        └── ai-engineering-harness.mdc
```

Root must **not** contain `commands/`, `skills/`, `workflows/`, or `templates/` from the pack.

## Install Behavior

Implemented in [install-cache.js](../install-cache.js), invoked from [install.sh](../install.sh).

| Flag / setting | Behavior |
|---|---|
| `--install-cache` | Force capability cache install (project scope, non-manual) |
| `--no-install-cache` | Skip cache even for private project |
| Default | **On** for `project` + `private` + runtime-native; **off** for `global`, `manual`, `--legacy-root` |
| Shared visibility | Cache **off** unless `--install-cache` |
| `--dry-run` | Prints `WOULD COPY .ai-harness/...` |
| `--force` | Overwrites existing cache files |

Cache surface (not exhaustive): `AGENTS.md`, `commands/`, `skills/`, `workflows/`, `patterns/`, `templates/`, selected `docs/*`, `PACK.md`, `README.md`, optional `LICENSE`. Excludes `test/`, `examples/`, `node_modules`, `.git`.

## Git Ignore / info-exclude Behavior

Private installs append a delimited block to **`.git/info/exclude`** (not `.gitignore`). When cache is installed, the block includes:

```gitignore
# ai-engineering-harness start
.ai-harness/
.harness/
.cursor/rules/ai-engineering-harness.mdc
# ai-engineering-harness end
```

See [private-install-git-hygiene.md](private-install-git-hygiene.md) and [git-hygiene-policy.md](git-hygiene-policy.md).

## Runtime Bootstrap Behavior

Bootstraps point agents at:

1. `.ai-harness/` — capability source
2. `.harness/` — project state

If `.ai-harness/` is missing, reinstall with private project install (cache is default) or explicit `--install-cache`.

Updated payloads: [runtime/cursor/rules/ai-engineering-harness.mdc](../runtime/cursor/rules/ai-engineering-harness.mdc), [runtime/bootstrap/AGENTS.project.md](../runtime/bootstrap/AGENTS.project.md), Claude/Gemini/OpenCode project stubs.

## Update Behavior

Re-run `install.sh install` with the same flags. Without `--force`, existing cache files are **skipped**. With `--force`, cache files are overwritten. Uninstall/update verbs are designed in [uninstall-update-design.md](uninstall-update-design.md) — not fully implemented in Step 2.

## Uninstall Implications

Removing harness from a repo should delete `.ai-harness/`, `.harness/` (if harness-owned), runtime bootstrap paths, and the info-exclude block. Full uninstall is a **planned** v0.9.2 follow-up.

## Troubleshooting

| Symptom | Likely cause | Action |
|---|---|---|
| Agent says "read .harness TODO only" | No `.ai-harness/` | Reinstall with `--visibility private` or `--install-cache` |
| `git status` shows `.ai-harness/` | Shared install or no exclude | Use `--visibility private` + info-exclude |
| Stale commands/skills | Old cache, skip on re-run | Re-run with `--force` |
| Root has `commands/` | Used `--legacy-root` / manual | Use runtime-native + cache instead |

## Related Docs

- [installer-ux-v0.9.2-plan.md](installer-ux-v0.9.2-plan.md) — Step 2
- [project-state-policy.md](project-state-policy.md)
- [plugin-install-ux.md](plugin-install-ux.md)
