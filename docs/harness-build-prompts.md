# Harness Build Prompts

Copy and paste these prompts when using `harness-build` with an AI coding agent.

## New Repository Adoption

> Read TARGET.md, AGENTS.md, commands/harness-build.md, docs/system-positioning.md, docs/team-architecture-selection.md, docs/memory-model.md, docs/memory-safety.md, docs/sdlc-execution-model.md, docs/harness-build-contract.md, and docs/skill-system.md. Then run harness-build for this repository. Produce .harness/HARNESS.md, TEAM.md, SKILLS.md, WORKFLOW.md, GATES.md, and MEMORY.md. Do not implement application code.

## Existing Repository With Partial `.harness/`

> Read TARGET.md, AGENTS.md, commands/harness-build.md, the existing .harness/ artifacts, docs/system-positioning.md, docs/team-architecture-selection.md, docs/memory-model.md, docs/memory-safety.md, and docs/sdlc-execution-model.md. Update the harness profile in place. Keep correct existing decisions, fill gaps, document assumptions, and do not implement application code.

## Feature-Specific Harness Profile

> Read TARGET.md, AGENTS.md, commands/harness-build.md, the existing .harness/ artifacts if present, and the repository docs relevant to this feature. Build or refine a harness profile optimized for the upcoming feature work. Keep the team pattern, workflow, skills, gates, and memory rules specific to this repository and feature scope. Do not implement application code.

## Bugfix-Specific Harness Profile

> Read TARGET.md, AGENTS.md, commands/harness-build.md, the existing .harness/ artifacts if present, and the docs or incidents relevant to this bug area. Build or refine a harness profile optimized for debugging and safe verification. Emphasize review, regression checking, and memory safety. Do not implement application code.

## Reviewing An Existing Harness Profile

> Read TARGET.md, AGENTS.md, docs/harness-build-contract.md, docs/harness-build-review-checklist.md, and the current .harness/HARNESS.md, TEAM.md, SKILLS.md, WORKFLOW.md, GATES.md, and MEMORY.md. Review the current harness profile, list gaps or risks, and recommend the smallest safe revisions. Do not implement application code.

## Updating A Stale Harness Profile

> Read TARGET.md, AGENTS.md, commands/harness-build.md, docs/harness-build-contract.md, docs/harness-build-review-checklist.md, and the current .harness/ profile artifacts. Refresh the profile for the repository's current state, remove stale assumptions, tighten the selected skills and workflow, and stop before application code.
