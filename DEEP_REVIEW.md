# ai-engineering-harness — Deep Review

> Date: 2026-06-07  
> Version: `v1.0.1` (HEAD `cf01f38`)  
> Reviewer: Claude Code (claude-sonnet-4-6)  
> Scope: Full second-pass audit after sub-agent fixes — code archaeology, architectural integrity, content quality, type safety, consistency

---

## What this review covers

The previous two review cycles (PROJECT_REVIEW and CORE_REVIEW) focused on surface bugs and missing features. This review answers three questions the sub-agent did not fully address:

1. **Why are there still deprecated things?**
2. **Why do source files still reference `aih.sh` like it's alive?**
3. **Is the markdown content quality actually good enough?**

The answer to all three: No. Below is the evidence.

---

## Part I — The `aih.sh` Archaeological Debt

### What the problem is

Every `lib/backend/*.ts` file was written as a TypeScript port of a shell script (`aih.sh`) that no longer governs this project. The port is complete and working. But the sub-agent left all the line-number cross-references in place — every function, every module header, every JSDoc still says "Mirrors aih.sh", "Ports aih.sh", "Replaces the aih.sh dispatch sequence". These references are not documentation. They are archaeology. They say nothing useful about what the code does now.

**Count of occurrences across production source:**

| File | `aih.sh` mentions |
|---|---|
| `lib/backend/status-doctor.ts` | 17 |
| `lib/backend/harness-skeleton.ts` | 14 |
| `lib/backend/git-hygiene.ts` | 10 |
| `lib/backend/uninstall.ts` | 6 |
| `lib/backend/install-orchestrator.ts` | 3 |
| `lib/backend/constants.ts` | 3 |
| `lib/backend/update.ts` | 1 |
| **Total** | **54** |

### Examples of what readers actually see

`lib/backend/status-doctor.ts:1-18`:
```typescript
/**
 * In-process status and doctor reporting.
 *
 * Ports the shell functions from aih.sh:
 *   - runtime_list_count (145-153)
 *   - detect_runtimes_from_target (154-176)
 *   - is_git_repo (200-202)
 *   - has_harness_exclude_block (208-211)
 *   - runtime_references_cache (317-340)
 *   - doctor_plan_status (341-358)
 *   - doctor_verify_has_concrete_tests (360-364)
 *   - doctor_verify_has_concrete_evidence (366-370)
 *   - doctor_verify_status (372-386)
 *   - workflow_phase_line (388-434)
 *   - print_workflow_summary (436-555)
 *   - print_status (1234-1285)
 *   - run_doctor (1287-1462)
 */
```

`lib/backend/harness-skeleton.ts:1-18`:
```typescript
/**
 * Mirrors the shell functions in aih.sh:
 *   - write_target_file         (1479-1511)
 *   - harness_skeleton_harness_md   (1513-1549)
 *   - harness_skeleton_team_md      (1551-1583)
 *   ...10 more entries...
 */
```

`lib/backend/harness-skeleton.ts:416-428` (mid-function comment):
```typescript
/**
 * Mirrors aih.sh write_target_file (1479-1511).
 * ...
 * NOTE: All skeleton file content strings end with a trailing `\n`...
 * The original shell functions in aih.sh use `$()` command substitution
 * which silently strips the final newline. A byte-for-byte diff against
 * shell-generated output will therefore show a 1-byte difference.
 */
```

`lib/backend/constants.ts:6,20,58`:
```typescript
/** Provider command surface paths (relative to target). Mirrors aih.sh harness_provider_command_paths. */
/** Paths to ignore for a provider install. Mirrors aih.sh harness_ignore_paths_for_runtime. */
/** Paths removed on uninstall for a provider. Mirrors aih.sh runtime_paths_for_uninstall (aih.sh:281-315). */
```

### Why this matters for a solo project

This is a solo project. There is no team to maintain backward compatibility with. There is no external `aih.sh` that consumers depend on. The shell script cross-references serve exactly one purpose: they document a migration that already happened. That migration history belongs in git log, not in production source. A fresh reader who encounters these comments has two choices:

1. Find `aih.sh` to understand the code — but it no longer governs anything.
2. Ignore the comments and read the code directly — which is what they should have been doing all along.

**What needs to happen:** Strip all `aih.sh` cross-references from module headers, function JSDoc, and inline comments. Replace with clean, forward-facing descriptions of what each function actually does today.

---

## Part II — The Deprecated Module That Wasn't Removed

### `lib/install-legacy.ts`

The file opens with this block:

```typescript
/**
 * DEPRECATED: Use node bin/aih.js install instead.
 *
 * This module provides flat-root installation (all files to target/).
 * It is maintained for backward compatibility only.
 *
 * Transition timeline:
 * - v1.0.x: Both paths supported (deprecation warning shown)
 * - v1.1.0: Legacy path removed
 */
```

The current version is `v1.0.1`. The removal deadline was `v1.1.0`. This module:

- Is **still imported** by `lib/backend/install-orchestrator.ts:19`
- Is **still called** in the production install path (`install-orchestrator.ts:141`) as the fallback for the "manual" provider
- Is **still exported** via the public package API (the `.` export covers the entire library)
- Is **still required by tests**: `test/run-tests.js:11` and `test/package-manifest.test.js:121-124`
- Is **still in `tsconfig.lib.json`** include list
- Emits a runtime deprecation warning via `emitDeprecationWarning()` — every "manual" install prints warning noise to stderr

### What the install-orchestrator actually does

```typescript
// lib/backend/install-orchestrator.ts:139-158
} else {
  // Manual/legacy fallback path
  installHarness({            // ← calls the DEPRECATED function
    target: ctx.target,
    ...
  });
  messages.push("manual-install: ok");
  if (ctx.initHarness) {
    initHarnessProfile({ ... });
    messages.push("harness-skeleton (manual): ok");
  }
}
```

The `else` branch is reached when `isRuntimeNative(ctx.provider)` returns false. The `isRuntimeNative` function covers: cursor, claude, codex, gemini, generic, opencode. So the only provider that falls through to legacy is `"manual"`.

**The "manual" provider is in `ACTIVE_PROVIDER_IDS`** (checked in `lib/cli-providers.ts`) and therefore appears in the CLI provider picker. Users can select it. When they do, they get the deprecated flat-root copy that drops 30+ files into the target directory and prints deprecation warnings.

### Why keeping this hurts the project

The project's core positioning is "professional workflow guardrails." Having a deprecated install path that triggers deprecation warnings undermines that claim. The `manual` provider as a concept is valid (no AI tool installed, just markdown workflows), but it does not need a flat-root file copy — it can just write the `.harness/` skeleton and `AGENTS.md` directly.

**What needs to happen:** Remove `lib/install-legacy.ts` entirely. Wire the "manual" provider to call `initHarnessProfile` + write `AGENTS.md` directly, without any flat-root copy. Update tests and tsconfig accordingly.

---

## Part III — Surviving Code Inconsistencies

These issues were not in the previous reviews and were not addressed by the sub-agent.

---

### D-1 — `HARNESS_MARKER` constant has three independent definitions

**Expected:** One canonical definition, imported everywhere.  
**Reality:**

| File | Definition |
|---|---|
| `lib/backend/constants.ts:4` | `export const HARNESS_MARKER = "ai-engineering-harness"` |
| `lib/provider-detection.ts:4` | `const HARNESS_MARKER = "ai-engineering-harness"` (module-private) |
| `lib/catalog/command-installation.ts:280` | `const harnessMarker = "ai-engineering-harness"` (local) |
| `lib/catalog/command-installation.ts:307` | string literal `"ai-engineering-harness"` (hardcoded) |

`constants.ts:3` even has a comment noting the duplication: _"lib/cli-detect.ts has a local duplicate that should migrate to import this during the CLI rewire task."_ That migration task was never done — and it spread to a third file. The comment itself is a TODO embedded in production source, which is now stale because `cli-detect.ts` was refactored to re-export from `provider-detection.ts`, but `provider-detection.ts` still has its own copy.

If the marker string ever changes, three places need updating and only one will be caught by grep-for-the-constant.

---

### D-2 — `status-doctor.ts` still has the git worktree bug

`lib/backend/git-hygiene.ts` was fixed with `resolveGitDir()`. But `lib/backend/status-doctor.ts:58-68` has its own internal copy of `hasHarnessExcludeBlock` that was NOT updated:

```typescript
/** Mirrors aih.sh has_harness_exclude_block (208-211). */
function hasHarnessExcludeBlock(targetAbs: string): boolean {
  const excludeFile = path.join(targetAbs, ".git", "info", "exclude");
  if (!fs.existsSync(excludeFile)) return false;
  // ...
}
```

In a git worktree, `.git` is a file. `path.join(targetAbs, ".git", "info", "exclude")` constructs a path through a regular file. `fs.existsSync` returns false (path doesn't exist), so the function always returns `false` — the doctor check at line 486 would always print `WARN .git/info/exclude harness block missing` even when the block was correctly written by `applyPrivateIgnore`.

The fix in `git-hygiene.ts` was incomplete because this duplicate function was not updated.

---

### D-3 — `install-orchestrator.ts:82` uses raw `existsSync` instead of `isGitRepo`

```typescript
const isGitRepo = fs.existsSync(path.join(ctx.target, ".git"));
```

There is a well-defined `isGitRepo(targetRoot)` function in `lib/provider-detection.ts` that correctly handles worktrees (it checks both file and directory). The orchestrator reimplements the check as a one-liner, bypassing the abstraction. For worktrees this happens to work (file exists), but it is inconsistent with the rest of the codebase and will break if the logic ever changes.

---

### D-4 — `uninstall.ts:174` duplicates git-presence check

```typescript
if (fs.existsSync(path.join(ctx.targetAbs, ".git"))) {
  removeIgnoreBlock({ targetAbs: ctx.targetAbs, dryRun: ctx.dryRun });
}
```

`removeIgnoreBlock` already handles the "not a git repo" case internally — it returns `{ action: "skip" }` when the exclude file is absent. The guard here is redundant and uses the same raw `existsSync` pattern instead of `isGitRepo`.

---

### D-5 — `mode-mutations.ts` reads registry from disk twice per eval run

```typescript
function applyModeMutation(...): void {
  const registry = loadMutationRegistry(packRoot);  // disk read
  ...
}

function mutationMetrics(...): { ... } {
  const registry = loadMutationRegistry(packRoot);  // disk read again
  ...
}
```

Both functions are called in sequence inside `runMode`. The registry file is read twice per mode, four times total per A/B run. The file is small, but `JSON.parse` on every call is unnecessary. A module-level cache keyed on `packRoot` would eliminate the redundancy.

---

### D-6 — `README.md` badge shows stale coverage threshold

The README badge at line 7:
```
![Coverage](https://img.shields.io/badge/coverage-lib%2065%25%2B-0f766e)
```

Coverage threshold was raised from 65% to 75% in the previous review cycle. The badge was not updated and still advertises the lower standard to every visitor.

---

### D-7 — `lib/cli-commands/install.ts:135` has a hardcoded warning string about git repo

```typescript
"\nwarning: target is not a Git repo; private .git/info/exclude cannot be updated."
```

This string is duplicated in at least three places (`cli-commands/install.ts:135`, `cli-commands/install.ts:212`, `cli-plan.ts:107`). If the message changes, three spots need updating. Should be a constant or derived from a shared helper.

---

## Part IV — Markdown Content Quality

### Context

The harness sells itself as a "markdown-first operating contract." The skeleton files it writes to new users' repositories are the first thing those users read. If those files are shallow, the product impression is shallow.

### Findings

**The skeleton files are entirely placeholder prose.** Every `.harness/*.md` file generated by `initHarnessProfile` consists of headings followed by one-line instructions to "describe" or "record" the content. There is no example, no constraint, no minimum viable content. What a user receives:

`WORKFLOW.md` skeleton:
```markdown
## Selected Workflow
Describe the workflow pattern in use for this repository.

## Command Sequence
List the command sequence that the repository expects operators to follow.
```

`GATES.md` skeleton:
```markdown
## Quality Gates
List the gates that must pass before shipping or remembering lessons.

## Evidence Requirements
Describe the evidence required for verification and shipping decisions.
```

This is empty scaffolding. A user opening these files for the first time has no model of what "a good WORKFLOW.md looks like" or "what counts as a quality gate entry." The skeleton teaches nothing about the product it represents.

**Comparison with what a strong skeleton would do:**

A strong `WORKFLOW.md` skeleton would include a filled-in example with placeholder values clearly marked (e.g., `[PROJECT NAME]`), at least one concrete example of a command sequence, and a `## Stop Conditions` section with a non-trivial example. The user should be able to replace placeholders rather than invent structure from scratch.

A strong `GATES.md` skeleton would include at least two example gate entries — one about test coverage, one about verify evidence — so the user understands the expected level of specificity.

---

### S-1 — `HARNESS.md` skeleton is too abstract

The generated file starts:
```markdown
## Purpose
Describe the repository-specific harness operating model, the artifacts it owns, and the workflow it enforces.

## Operating Model
Describe the command loop, artifact update rules, and any repository-specific exceptions.
```

No user can fill this in correctly without having already internalized what "harness operating model" means. The skeleton should include a filled example (even if it's for a hypothetical project) so the user can see and replace. Current state teaches nothing.

---

### S-2 — `DECISIONS.md` skeleton has a good structure but incomplete entry template

The template section is:
```markdown
### DECISION-000
- Date:
- Status: proposed | accepted | superseded
- Area:
- Decision:
```

Missing: `Rationale:`, `Alternatives considered:`, `Consequences:`. A decision log entry without rationale is just a log of outcomes, not engineering memory. The template should enforce the minimum useful fields.

---

### S-3 — `MEMORY.md` skeleton has no example of a concrete memory entry

The skeleton says "Describe what long-lived memory this repository should retain" and "List the types of memory this repository captures." But a developer cannot infer what a memory entry looks like from this. There is no example. The harness's own `memory/` directory (used for Claude Code memory) could serve as a reference for what good memory entries look like.

---

### S-4 — `HAZARDS.md` skeleton is entirely vague

The generated file (visible in `skeletonHazardsMd`) says things like "Describe the known risks and hazards that apply to this repository." A hazard log without a concrete example entry format is just a blank page with a title.

---

### S-5 — `WORKFLOW.md` skeleton missing the concrete loop example

The primary selling point of this product is the `Start → Discuss → Plan → Run → Verify → Ship → Remember` loop. That exact loop should appear in the generated `WORKFLOW.md` under "Command Sequence" with a concrete example of what each step produces. The skeleton currently does not include this.

---

## Summary Table

| # | Severity | Category | Finding |
|---|---|---|---|
| A-1 | 🔴 | Code archaeology | 54 `aih.sh` cross-references across all `lib/backend/*.ts` files |
| A-2 | 🔴 | Deprecated code | `lib/install-legacy.ts` still imported and called in production path |
| A-3 | 🔴 | Deprecated code | "manual" provider in active providers still routes to deprecated flat-root copy |
| D-1 | 🟠 | Consistency | `HARNESS_MARKER` constant defined in 3 separate places |
| D-2 | 🟠 | Bug | `status-doctor.ts:hasHarnessExcludeBlock` still hardcodes `.git/info/exclude` — worktree bug not fixed here |
| D-3 | 🟡 | Consistency | `install-orchestrator.ts` uses raw `existsSync` instead of `isGitRepo` |
| D-4 | 🟡 | Consistency | `uninstall.ts` redundant git-presence guard using raw pattern |
| D-5 | 🟡 | Performance | `mode-mutations.ts` reads registry JSON from disk twice per eval run |
| D-6 | 🟡 | Stale | README badge advertises 65% coverage, threshold is now 75% |
| D-7 | 🟡 | DRY | Git repo warning string duplicated in 3 CLI files |
| S-1 | 🟠 | Content | `HARNESS.md` skeleton is abstract placeholders, no example to replace |
| S-2 | 🟠 | Content | `DECISIONS.md` template missing Rationale, Alternatives, Consequences |
| S-3 | 🟠 | Content | `MEMORY.md` skeleton has no example entry |
| S-4 | 🟠 | Content | `HAZARDS.md` skeleton has no concrete entry format or example |
| S-5 | 🟠 | Content | `WORKFLOW.md` skeleton missing the canonical loop + concrete example |

---

## Recommended Fix Order

### Sprint 1 — Remove the archaeology and the deprecated path

These are the changes that most directly contradict the project's brand as a clean, professional tool.

1. **Strip all `aih.sh` cross-references** from all `lib/backend/*.ts` module headers and function JSDoc. Replace with clean forward-facing descriptions. (~54 comment lines to edit across 7 files)

2. **Remove `lib/install-legacy.ts`** entirely. Update `install-orchestrator.ts` to handle the "manual" provider with a direct `initHarnessProfile` + `AGENTS.md` write — no flat-root copy, no 30-file dump, no deprecation warning.

3. **Update `tsconfig.lib.json` and tests** to remove all references to `install-legacy`.

### Sprint 2 — Fix the consistency gaps

4. **Consolidate `HARNESS_MARKER`**: `provider-detection.ts` and `catalog/command-installation.ts` should import from `lib/backend/constants.ts`. Delete local copies and the stale migration TODO comment.

5. **Fix `status-doctor.ts:hasHarnessExcludeBlock`**: use `resolveGitDir` from `git-hygiene.ts` (or import it) instead of hardcoding `path.join(targetAbs, ".git", "info", "exclude")`.

6. **Replace raw `existsSync` git checks** in `install-orchestrator.ts:82` and `uninstall.ts:174` with `isGitRepo()`.

7. **Cache mutation registry** in `mode-mutations.ts`: `const registryCache = new Map<string, MutationRegistry>()` keyed on `packRoot`.

8. **Update README badge** from `65%+` to `75%+`.

### Sprint 3 — Elevate skeleton content

9. **Rewrite all 5 skeleton files** with filled examples, not abstract instructions. Each file should teach by showing, not by prompting.

10. **`DECISIONS.md` template**: add `Rationale:`, `Alternatives considered:`, `Consequences:` to the entry template.

---

*End of deep review. All file:line references verified against HEAD `cf01f38`.*
