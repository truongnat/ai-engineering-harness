# brainstorming

## Purpose

Shape a vague request into an implementation-ready direction before detailed planning starts.

## When To Use

- when the goal is real but the solution shape is still fuzzy
- before `writing-plans` on non-trivial feature or refactor work
- when multiple realistic approaches need a concise tradeoff discussion

## When Not To Use

- when the goal, constraints, and preferred approach are already documented clearly
- when the work is already approved and ready for `executing-plans`
- when the task is only verification or review

## Inputs

- current request
- active goal or discussion artifacts
- repo constraints, hazards, and prior decisions when present

## Workflow

1. Restate the problem in concrete engineering terms.
2. Separate confirmed requirements from assumptions.
3. Compare a small number of realistic approaches.
4. Recommend one option and explain why it best fits the current repo.
5. Hand off the clarified direction to discussion or planning artifacts.

## Operating Principles

- Clarify before committing.
- Prefer the smallest viable approach.
- Keep tradeoffs explicit and short.
- Do not invent requirements to make the design feel complete.

## Output Contract

This skill must produce:

- a clarified problem statement
- explicit constraints and success criteria
- a recommended approach with tradeoffs

## Common Failure Modes

- turning brainstorming into implementation
- offering many weak options instead of a recommendation
- treating assumptions as settled requirements

## Checklist Before Done

- [ ] The problem is stated concretely
- [ ] Constraints and success criteria are explicit
- [ ] Alternatives were compared briefly
- [ ] One approach was recommended
- [ ] The result is ready for planning
