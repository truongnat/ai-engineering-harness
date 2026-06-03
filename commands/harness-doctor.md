# harness-doctor

## Purpose

Check harness readiness for **this repository** (local install only).

## When To Use

- after install
- when `/harness:*` commands fail or agent uses wrong skills
- before a critical delivery

## Required Reads

- `.ai-harness/manifest.json`
- `.ai-harness/activation.md`

## Step-By-Step Workflow

1. Verify `.ai-harness/` exists.
2. Verify `.ai-harness/runtime-commands/` exists and files reference `activation.md`.
3. Verify `.harness/` exists or warn that project state is missing.
4. Verify provider command entrypoints listed in `manifest.json` exist on disk.
5. Confirm command files reference `.ai-harness/activation.md` (not global paths).
6. Report PASS/WARN/FAIL per check; do not use sibling-repo or global harness files.

## Outputs

- Doctor-style checklist with remediation (e.g. re-run `npx ai-engineering-harness install`).
