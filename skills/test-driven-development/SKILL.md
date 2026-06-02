# test-driven-development

## Purpose

Introduce or change behavior by defining evidence first, then implementing the smallest change that satisfies it.

## When To Use

- For feature work that changes behavior
- For bug fixes
- For refactors that need regression protection

## When Not To Use

- For pure documentation changes
- For structure-only repository scaffolding with no behavioral code path
- When verification is inherently manual and cannot be automated yet

## Workflow

1. Define the failing check or expected behavior first.
2. Run it and confirm the failure is meaningful.
3. Implement the smallest change that should pass.
4. Re-run the check and confirm it passes.
5. Refactor only while keeping evidence green.

## Operating Principles

- Evidence comes before implementation.
- Failures should be intentional, not accidental.
- The smallest passing change is usually best.
- Regression protection matters more than elegance.

## Output Format

- failing-check note
- minimal implementation summary
- passing verification note

## Checklist Before Done

- [ ] Behavior was defined before implementation
- [ ] The initial failure was observed when applicable
- [ ] The minimal change was made
- [ ] The relevant checks now pass
