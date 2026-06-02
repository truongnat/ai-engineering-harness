# Goal

> Do not include credentials, tokens, customer data, or private business data.

## Goal

Add Google login to the Flutter app while preserving guest mode as a first-class path.

## Scope

- add sign-in entry and flow integration
- preserve guest entry and guest session behavior
- verify logout and session reset behavior
- touch backend auth boundary only if required for existing session handling

## In Scope

- [ ] map current guest and auth entry points
- [ ] plan the minimal product and state changes
- [ ] verify guest, login, logout, and session behavior

## Out Of Scope

- [ ] full auth system redesign
- [ ] provider secret setup details
- [ ] unrelated profile or account features

## Acceptance Criteria

- guest flow still works
- Google login works
- logout returns the app to the expected state
- token or session behavior is checked at the relevant boundary

## Human Approval

- Status: approved example
- Notes: This is the north-star goal used by the demo harness build.
