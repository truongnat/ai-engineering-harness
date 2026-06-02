# Backend Pack

## Purpose

Route API, service, and persistence work toward the most relevant core skills, commands, and checks.

## When To Use

- APIs, services, business logic, persistence
- auth boundaries and request handling
- data consistency or contract-sensitive changes

## Recommended Core Skills

- `mapping-codebase`
- `writing-plans`
- `executing-plans`
- `verification`
- `code-review`

## Recommended Commands

- `harness-map`
- `harness-discuss`
- `harness-plan`
- `harness-run`
- `harness-verify`

## Key Checks

- contract compatibility
- input validation
- error handling
- idempotency where relevant
- data consistency and boundary safety

## Verification Expectations

- targeted tests
- integration checks when the host repo supports them
- migration or persistence safety review if relevant

## When Not To Use

- UI-only work
- purely mobile presentation work
- documentation-only changes

## Notes

If persistence or auth changes are risky, make rollback and verification explicit in the plan.
