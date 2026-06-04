# Goal

## Request

- Add Google login without breaking guest mode.

## Desired Outcome

- Target validation should fail on a stale state pointer.

## Boundaries

- In scope: harness artifact structure only.
- Out of scope: application auth behavior.

## Constraints

- [ ] Keep the invalid condition explicit.

## Completion Signal

- Validation reports the missing plan path referenced by state.
