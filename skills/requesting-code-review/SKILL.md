# requesting-code-review

## Purpose

Request an independent review pass that checks scope fidelity, risk, and missing verification before the work is accepted.

## When To Use

- after meaningful implementation steps
- before shipping non-trivial work
- when the plan or workflow expects an explicit review gate

## When Not To Use

- before any inspectable work exists
- when the task is still in goal clarification or planning
- when a review would add no information beyond immediate self-checking

## Inputs

- goal and plan artifacts
- changed files or diff
- current verification evidence

## Workflow

1. Frame the review against the goal and planned scope.
2. Ask for findings, not reassurance.
3. Require missing verification to be called out explicitly.
4. Record findings or a no-findings result in `.harness/REVIEW.md` when review is part of the workflow.
5. Feed blockers back into planning, execution, or verification as appropriate.

## Operating Principles

- Review is a gate, not a compliment request.
- Scope drift and missing evidence are review issues.
- Findings should be actionable and severity-oriented.
- No-findings is still a documented outcome.

## Output Contract

This skill must produce:

- a concrete review request frame
- findings or a no-findings decision
- clear blockers or follow-up actions when needed

## Common Failure Modes

- asking for a style pass instead of a risk pass
- hiding missing verification from the reviewer
- treating self-approval as independent review

## Checklist Before Done

- [ ] Review scope was tied to goal and plan
- [ ] Findings were requested in actionable form
- [ ] Missing verification was part of the review
- [ ] Outcome is documented clearly
- [ ] Blockers are routed to the next command
