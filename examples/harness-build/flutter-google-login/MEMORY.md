# Memory Profile

> Do not include credentials, tokens, customer data, or private business data.

## Purpose

Define what this project should remember before planning and after shipping for auth-related feature work.

## Current Status

- Status: approved example
- Last updated: 2026-06-02
- Owner: demo harness build

## Memory Categories

- Project facts: guest mode is a supported product path and must remain independently verifiable
- Decisions: optional authentication must not erase guest entry as a fallback
- Root causes: preserve confirmed auth or guest-state regression causes only after verification
- Reusable commands: Flutter test, targeted auth flow checks, and session-boundary checks that future work can reuse
- Constraints: no secrets, tokens, or provider configuration values in memory artifacts
- Hazards: guest-to-login transition, logout state reset, token persistence, stale local session assumptions
- Open questions: whether guest data migration or backend-issued session rules exist
- Verification lessons: signed-in success is not enough; guest and logout paths must be checked independently

## Recall Rules

- Read before planning: prior auth decisions, guest-mode constraints, known session hazards
- Update after shipping: durable auth, guest, and session lessons only
- Do not persist: provider secrets, raw tokens, customer data, copied raw logs, private business detail

## Storage Boundaries

- Shared durable memory: cross-goal auth decisions, hazards, and reusable verification guidance
- Goal-level memory: feature-specific lessons under `goals/google-login/REMEMBER.md`
- Local-only memory: ephemeral exploration notes that should not enter committed artifacts

## Assumptions

- [ ] Shared memory should stay concise enough to read before planning.

## Unknowns

- [ ] Whether session hazards are already documented elsewhere in the host repo

## Human Review

- Status: approved example
- Notes: This memory profile demonstrates recall-before-planning and remember-after-shipping behavior.
