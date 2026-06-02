# Team Architecture

> Do not include credentials, tokens, customer data, or private business data.

## Purpose

Define the project-specific collaboration shape for this feature.

## Current Status

- Status: approved example
- Last updated: 2026-06-02
- Owner: demo harness build

## Selected Pattern

- Pattern: Producer-Reviewer
- Why this pattern fits: the feature is scoped enough for one implementation stream, but auth and guest-state regressions require independent review and verification discipline
- Why simpler patterns were not enough: a single unreviewed execution path is too risky for shared guest and authenticated state

## Roles

- Role: Producer
- Responsibility: map auth and guest boundaries, implement the planned change, and document verification evidence
- Boundaries: do not redesign auth architecture without approval

- Role: Reviewer
- Responsibility: inspect scope drift, state handling, verification evidence, and regression risk across guest, login, logout, and session behavior
- Boundaries: do not widen scope into unrelated auth cleanup

## Handoff Rules

- Planning handoff: producer proposes plan, reviewer checks scope and verification depth before run
- Review handoff: producer summarizes changed areas and expected behaviors, reviewer checks for regressions and missing evidence
- Verification handoff: producer records checks run and not run items, reviewer confirms the evidence is sufficient for ship

## Escalation Rules

- Ask for human approval when: session model changes, guest data migration is required, or backend auth behavior must change materially
- Re-select pattern when: the work splits into separate mobile, backend, and migration tracks that can no longer be handled in one implementation stream

## Assumptions

- [ ] One implementation stream is enough if backend changes remain bounded.

## Unknowns

- [ ] Whether reviewer needs separate backend auth context depending on API coupling

## Human Review

- Status: approved example
- Notes: Producer-Reviewer is preferred over Pipeline here because the main risk is correctness and regression review, not multi-stage delivery complexity.
