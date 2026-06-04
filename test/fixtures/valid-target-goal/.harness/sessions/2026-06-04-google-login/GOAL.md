# Goal

## Request

- Add Google login without breaking guest mode.

## Desired Outcome

- The host repository has a valid session-based harness artifact set for this workstream.

## Boundaries

- In scope: session-local harness artifacts only.
- Out of scope: application auth code.

## Constraints

- [ ] Keep validation structural only.
- [ ] Route active work through `.harness/STATE.md`.

## Completion Signal

- `node validate.js --target <path> --goal 2026-06-04-google-login` passes.
