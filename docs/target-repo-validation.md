# Target Repository Validation

This document defines the future lightweight validation mode for a host repository that has adopted `ai-engineering-harness` and produced `.harness/` profile artifacts.

## What Target Repo Validation Means

Target repo validation means checking whether a host repository contains the minimum adopted harness structure and profile artifacts needed to operate the harness safely and consistently.

The validator should focus on structural contract checks, not application correctness.

## What It Should Check

The future validation mode should check:

- required root files exist in the host repository
- `.harness/` exists
- required harness profile artifacts exist
- optional project context artifacts are recognized when present
- optional goal-level artifacts follow the expected artifact set when a goal is being reviewed
- obvious structural gaps are reported with clear, actionable messages
- safety boundaries are preserved during validation output

## What It Should Not Check

The future validation mode should not:

- judge whether application code is correct
- prove that the selected workflow or team pattern is the best possible choice
- scan arbitrary large files or perform repository-wide content analysis
- print secrets, tokens, customer data, or private business data
- act like a linter for the product codebase
- imply that a passing structural check proves the repository is ready to ship

## Required Root Files In A Host Repo

Minimum future checks at the repository root:

- `AGENTS.md` exists
- `.harness/` exists

These are the minimum entry points for an adopted target repository.

## Required `.harness/` Profile Artifacts

The future profile-level validator should check for:

- `.harness/HARNESS.md`
- `.harness/TEAM.md`
- `.harness/SKILLS.md`
- `.harness/WORKFLOW.md`
- `.harness/GATES.md`
- `.harness/MEMORY.md`

These files define the adopted operating model for the host repository.

## Optional Project Context Artifacts

The validator should recognize these as optional but useful project context:

- `.harness/PROJECT.md`
- `.harness/STATE.md`
- `.harness/CONTEXT.md`
- `.harness/ROADMAP.md`

Missing optional context artifacts should not fail validation by default unless a future mode explicitly requires them.

## Optional Goal-Level Artifacts

When a goal is present or a goal-specific mode is requested, the future validator should look for:

- `.harness/goals/<goal-id>/GOAL.md`
- `.harness/goals/<goal-id>/PLAN.md`
- `.harness/goals/<goal-id>/TASKS.md`
- `.harness/goals/<goal-id>/VERIFY.md`
- `.harness/goals/<goal-id>/REMEMBER.md`

Goal-level validation should remain scoped to the requested goal and should not assume that every repository always has active goals.

## Safety Checks

Target repo validation should be structural and contract-focused.

Safety rules:

- validation should never print secrets
- validation should not scan arbitrary large files
- validation should not judge implementation correctness
- validation should avoid echoing file contents unless a future mode explicitly needs a short safe excerpt
- validation output should name missing or malformed artifacts by path, not by sensitive content

## Validation Output Shape

The future validator should stay simple and predictable.

Recommended output shape:

- one summary line: pass or fail
- a flat list of missing or invalid paths
- optional warnings for missing optional context files
- exit code `0` on pass
- non-zero exit code on failure

Example shape:

```txt
Target repository validation failed:
- Missing required path: .harness/TEAM.md
- Missing required path: .harness/GATES.md
- Warning: optional path not found: .harness/ROADMAP.md
```

## Recommended Failure Messages

Recommended failure style:

- `Missing required path: AGENTS.md`
- `Missing required path: .harness/`
- `Missing required path: .harness/HARNESS.md`
- `Missing required path: .harness/goals/google-login/PLAN.md`
- `Goal artifact set is incomplete for: google-login`
- `Profile artifacts exist, but goal validation was requested and no goal artifacts were found for: google-login`

Recommended warning style:

- `Warning: optional path not found: .harness/PROJECT.md`
- `Warning: optional path not found: .harness/ROADMAP.md`

## Future CLI Shape

These CLI examples describe future design intent only. They are not implemented in this step.

Possible future commands:

- `node validate.js`
- `node validate.js --target ../my-project`
- `node validate.js --target ../my-project --goal google-login`
- `node validate.js --target ../my-project --profile-only`

Intended meanings:

- `node validate.js`
  - validate this harness repository itself
- `node validate.js --target ../my-project`
  - validate a host repository that adopted the harness
- `node validate.js --target ../my-project --goal google-login`
  - validate the host repository and the named goal artifact set
- `node validate.js --target ../my-project --profile-only`
  - validate only the profile-level adopted harness artifacts

## Non-Goals

This future mode is not intended to become:

- a runtime platform
- a deep repository scanner
- a product-code quality judge
- a secret detection engine
- a replacement for human review
- a proof that a repository is implementation-complete or production-ready
