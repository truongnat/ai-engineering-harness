# harness-map

## Purpose

Map the host repository, active `.harness/` artifacts, affected code areas, and current constraints before deeper work.

## When To Use

- at the start of a session in an unfamiliar repository
- before `harness-discuss` or `harness-plan`
- when `.harness/STATE.md` looks stale
- when impact scope is unclear

## Required Reads

- `AGENTS.md`
- `.harness/PROJECT.md` if present
- `.harness/STATE.md` if present
- `.harness/CONTEXT.md` if present
- `.harness/GOAL.md` if present
- `.harness/REMEMBER.md` if present

## Skills To Use

- `using-harness`
- `mapping-codebase`
- `remembering` when prior durable decisions affect the task

## Step-By-Step Workflow

1. Read the active `.harness/` artifacts before inspecting code.
2. Inventory the repository structure and identify likely entry points, boundaries, or ownership areas.
3. Determine which code, docs, or configs are likely to be affected by the active goal.
4. Separate observed facts from inferred structure.
5. Capture open questions, risks, and missing context in `.harness/CONTEXT.md` or `.harness/STATE.md`.
6. Stop once the repository is mapped well enough to discuss or plan without guessing.

## Output Artifacts

- `.harness/CONTEXT.md`
- `.harness/STATE.md`
- optional map summary in the session notes

## Completion Gate

The command is complete when the relevant repository areas, active artifacts, likely impact zones, and major unknowns are explicit enough to support discussion or planning without invented facts.

## Artifact Paths

- Read: `.harness/PROJECT.md`, `.harness/STATE.md`, `.harness/CONTEXT.md`, `.harness/GOAL.md`, `.harness/REMEMBER.md`
- Write: `.harness/CONTEXT.md`, `.harness/STATE.md`

## Stop Conditions

- repository structure is mapped enough for planning
- unresolved conflicts in artifacts have been surfaced
- further inspection would be speculative rather than useful

## Failure Modes

- reading code before reading active artifacts
- inferring architecture without evidence
- mapping too broadly and losing task focus

## Human Approval

Ask for approval if the repository map shows the task is much broader than originally stated or if the active goal appears inconsistent with the current codebase state.

## Notes

`harness-map` is about situational awareness. It should not produce a plan and should not start implementation.
