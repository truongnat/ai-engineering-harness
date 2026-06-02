# Harness Build Review Checklist

Use this checklist to review the output of `harness-build` before approving the harness profile.

## Harness Profile

- [ ] `HARNESS.md` states the repository-specific purpose of the harness.
- [ ] `HARNESS.md` defines scope boundaries and does not drift into feature implementation.
- [ ] assumptions and unknowns are explicit.
- [ ] human review points are called out clearly.

## Team Pattern

- [ ] `TEAM.md` names one selected pattern, not a vague mix of patterns.
- [ ] the chosen pattern fits the repository size, risk, and collaboration model.
- [ ] the document explains why simpler alternatives were not chosen.
- [ ] handoff and escalation rules are concrete enough to use.

## Skill Selection

- [ ] `SKILLS.md` selects the smallest sufficient set of core skills.
- [ ] selected skill packs match the host repository's delivery model.
- [ ] excluded skills or packs are listed when omission matters.
- [ ] each selected skill or pack has a clear reason to exist in this profile.

## Workflow Selection

- [ ] `WORKFLOW.md` defines one default workflow for this repository.
- [ ] the command sequence is explicit and practical.
- [ ] execution rules prevent planning, verification, or review from being skipped.
- [ ] the workflow fits the actual pace and risk of the repository.

## Gates

- [ ] `GATES.md` defines quality gates for run, verify, ship, and remember phases.
- [ ] evidence requirements are concrete enough to check.
- [ ] stop conditions are clear.
- [ ] the gates increase discipline without becoming unrealistic ceremony.

## Memory

- [ ] `MEMORY.md` explains what to recall before planning.
- [ ] `MEMORY.md` explains what to remember after shipping.
- [ ] memory types are durable and useful.
- [ ] storage boundaries between project memory and goal memory are clear.

## Safety

- [ ] no artifact includes secrets, tokens, `.env` values, customer data, or private business data.
- [ ] the profile does not imply runtime systems that do not exist.
- [ ] the profile does not add unnecessary team complexity.
- [ ] the profile clearly stops before application code implementation.

## Approval Decision

- [ ] approve as-is
- [ ] approve with small edits
- [ ] request revision before use
- [ ] reject because the profile is generic, unsafe, or mismatched to the repository
