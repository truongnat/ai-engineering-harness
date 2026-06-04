# Verification

## Goal

Validate the session-native target goal contract.

## Status

status: passed
freshness: fixture snapshot 2026-06-04
summary: state routing and session-local artifacts are structurally complete.

## Tests Run

| Command | Exit Code | Result | Notes |
|---|---:|---|---|
| `node validate.js --target <path> --goal 2026-06-04-google-login` | 0 | passed | Session-local artifact set validates |

## Manual Checks

| Step | Expected | Observed | Result |
|---|---|---|---|
| Inspect `STATE.md` | Active session points at `sessions/2026-06-04-google-login` | Matches fixture | passed |

## Deferred Human Checks

| Check | Why automation is insufficient | Owner | Blocking for ship? | Status |
|---|---|---|---|---|
| Real auth flow | This fixture only proves harness structure | adopting maintainer | yes | pending |

## Evidence

- Commands executed: `node validate.js --target <path> --goal 2026-06-04-google-login`
- Files inspected: `.harness/STATE.md`, `.harness/sessions/2026-06-04-google-login/*`
- Link, log, or snippet: exit code zero

## Known Gaps

- No application behavior evidence is included in this fixture.

## Ship Blockers

- Behavioral verification in the real host repository remains required before any ship claim.
