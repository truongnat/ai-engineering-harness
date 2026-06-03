# Uninstall and Update Design

## Purpose

Specify safe **uninstall** and **update** behavior for `install.sh` in `v0.9.2` without deleting user-owned files or breaking unrelated config.

Design only — implementation after git hygiene and command verbs.

## Uninstall Scope

Uninstall is parameterized by:

- `--runtime` (one or comma-separated)
- `--scope` (`global` | `project`)
- `--target` (project root for project scope)

Uninstall **does not** remove:

- User-edited content outside known harness paths
- Full `opencode.json` unless harness-only file (prefer remove plugin + revert merge — future)
- Arbitrary lines in `.git/info/exclude` or `.gitignore` except harness delimited blocks we created

## Update Scope

Update refreshes **harness-owned** payloads from a pack ref:

- Same paths as install for given runtime + scope
- Default: skip if local file modified unless `--force`
- `--ref` pins tarball version (e.g. `v0.9.2`)

Update does **not**:

- Change exclude/gitignore policy unless `--visibility` / `--ignore-strategy` passed on update (TBD)
- Run uninstall of other runtimes

## Manifest / Ownership Tracking

### v0.9.2 design (minimal)

**No manifest file required** for first implementation.

Ownership rules use:

1. **Exact known paths** per runtime + scope ([runtime-native-install-audit.md](runtime-native-install-audit.md))
2. **Marker comments** inside files we create (e.g. header in `.mdc`, `CLAUDE.md` banner) — optional future
3. **`.git/info/exclude` or `.gitignore` delimited block** — uninstall may remove harness block if empty

### Future (optional)

| Manifest | Use |
|---|---|
| `.harness/install-manifest.json` | **Shared** mode — committed with team harness |
| `.git/ai-engineering-harness/manifest.json` or metadata in exclude header | **Private** mode — not committed; records paths + strategy |

- **Not implemented** in v0.9.2 Step 1.

## Without Manifest Behavior

For each known path:

| Path state | Uninstall action |
|---|---|
| Exists, matches pack template checksum or marker | Delete file or remove harness section |
| Exists, user modified (heuristic: differs from template + no `--force`) | Skip; print path |
| Missing | Skip silently |
| Directory (`.harness/`, extension dir) | Remove only harness scaffold files listed in init; **do not** delete whole `.harness/goals/` user goals without `--force` |

Conservative rule: **when in doubt, skip and print**.

## Safe Delete Rules

### Always safe to delete (project, with `--force` or unmodified template)

- `.cursor/rules/ai-engineering-harness.mdc`
- `.opencode/plugins/ai-engineering-harness.js` (if no local edits detected)
- `.claude/CLAUDE.md` only if installer-created banner present (impl detail)
- `.gemini/extensions/ai-engineering-harness/` tree if installer-created

### Never delete without explicit `--force`

- Entire `.harness/goals/<id>/` with user content
- `AGENTS.md` if user had pre-existing file (install skipped originally)
- `opencode.json` — only strip harness plugin entry via JSON merge revert (future); v0.9.2 may skip `opencode.json` uninstall

### Global uninstall

- Remove files under home paths that match install paths for runtime
- Never touch project repo except optional exclude/gitignore block cleanup on project uninstall

## `.git/info/exclude` Block Cleanup

On `uninstall --scope project` (private installs):

1. If harness delimited block exists in `.git/info/exclude`, remove paths for uninstalled runtimes.
2. If block empty, remove start/end markers.
3. Never remove non-harness lines.

Preferred cleanup target for default private strategy.

## `.gitignore` Block Cleanup (only if explicitly created)

Same rules as exclude, but **only** when install used `--ignore-strategy gitignore`.

Do not remove `.gitignore` harness block if install only used `info-exclude`.

Dry-run prints would-remove lines for both.

## Version Pinning

`update --ref v0.9.2`:

1. Download tarball at ref
2. Re-run `install-runtime.js` equivalent for listed runtimes
3. Re-run init only if `--init-harness` passed on update (optional flag)

Default ref: current install ref if detectable, else `main` with warning.

## Dry Run

```bash
sh install.sh uninstall --runtime cursor --scope project --dry-run
sh install.sh update --runtime cursor --scope project --ref v0.9.2 --dry-run
```

Output:

- `WOULD DELETE` / `WOULD SKIP (modified)` / `WOULD UPDATE`
- Gitignore lines would remove

## Examples

**Uninstall Cursor from project:**

```bash
sh install.sh uninstall --runtime cursor --scope project --target . --yes
```

**Update Cursor rules from tag:**

```bash
sh install.sh update --runtime cursor --scope project --ref v0.9.2 --force --yes
```

**Uninstall global Gemini extension:**

```bash
sh install.sh uninstall --runtime gemini --scope global --yes
```

## Related Docs

- [install-command-model.md](install-command-model.md)
- [git-hygiene-policy.md](git-hygiene-policy.md)
- [installer-ux-v0.9.2-plan.md](installer-ux-v0.9.2-plan.md)
