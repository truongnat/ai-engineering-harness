# code-review

## Purpose

Inspect changes for bugs, regressions, risk, and missing verification before work is accepted or shipped.

## When To Use

- Before shipping non-trivial work
- When reviewing a plan or implementation
- When independent risk checking is needed

## When Not To Use

- When no changes have been made
- When the task is only early-stage goal clarification

## Workflow

1. Read the goal, plan, and changed artifacts.
2. Compare the change against expected behavior and scope.
3. Look for correctness, regression, and maintainability risks.
4. Identify missing tests or missing evidence.
5. Record findings in severity order.

## Operating Principles

- Findings matter more than summaries.
- Risk should be concrete and evidence-based.
- Review the change against requirements, not just style.
- Missing verification is a finding.

## Output Format

- findings list
- open questions
- residual risk statement

## Checklist Before Done

- [ ] Goal and scope were reviewed
- [ ] Changed artifacts were inspected
- [ ] Risks were identified or ruled out
- [ ] Missing verification was called out if present
