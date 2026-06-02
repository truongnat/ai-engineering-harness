# Target Repository Validation Prompts

Copy and paste these prompts when asking an AI coding agent to review an adopted host repository harness profile.

## Review Current `.harness/` Profile

> Read AGENTS.md, .harness/HARNESS.md, TEAM.md, SKILLS.md, WORKFLOW.md, GATES.md, and MEMORY.md. Review the current adopted harness profile for structural completeness, internal consistency, and safety. Do not judge application code correctness.

## Check Profile Consistency

> Read AGENTS.md and the current .harness profile artifacts. Check whether HARNESS.md, TEAM.md, SKILLS.md, WORKFLOW.md, GATES.md, and MEMORY.md agree on the repository's operating model, risk level, workflow, and review burden. List structural inconsistencies only.

## Check Memory Safety

> Read AGENTS.md, docs/memory-model.md, docs/memory-safety.md, and .harness/MEMORY.md. Review the adopted memory profile for unsafe retention, secret exposure risk, and unclear storage boundaries. Do not print sensitive content.

## Check If Selected Team Pattern Still Fits

> Read AGENTS.md, .harness/HARNESS.md, and .harness/TEAM.md. Review whether the selected team pattern still fits this repository's current scope, delivery model, and verification burden. Recommend the smallest safe adjustment if it no longer fits.

## Check Goal Artifacts Before Implementation

> Read AGENTS.md, the current .harness profile artifacts, and .harness/goals/<goal-id>/GOAL.md, PLAN.md, TASKS.md, VERIFY.md, and REMEMBER.md. Check whether the goal artifact set is structurally complete and aligned with the selected workflow and gates. Do not implement application code.

## Check Verification Artifacts Before Ship

> Read AGENTS.md, .harness/GATES.md, .harness/WORKFLOW.md, and the current goal's VERIFY.md and REMEMBER.md. Review whether the recorded verification artifacts are structurally complete enough for the selected gates before ship. Report gaps without claiming implementation correctness.
