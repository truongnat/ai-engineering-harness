# harness-status

## Purpose

Summarize harness install and project state for **this repository only**.

## When To Use

- after install or update
- when unsure whether `.ai-harness/` and `.harness/` are present
- before starting a new goal

## Required Reads

- `.ai-harness/manifest.json`
- `.ai-harness/activation.md`
- `.harness/HARNESS.md` if present
- `.harness/STATE.md` if present

## Step-By-Step Workflow

1. Confirm `.ai-harness/` exists and lists expected slash commands in `manifest.json`.
2. Confirm `.harness/` exists or report that project state is not initialized.
3. List detected provider entrypoints (Cursor rule, Claude, AGENTS.md, etc.) for this repo.
4. Summarize active goal status from `.harness/goals/` if any.
5. Do not inspect other repositories or global skill stores.

## Outputs

- Short status report: cache yes/no, harness state yes/no, recommended next command.
