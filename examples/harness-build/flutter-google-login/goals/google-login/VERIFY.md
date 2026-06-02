# Verify

> Do not include credentials, tokens, customer data, or private business data.

## Goal

Prove that Google login can be added without breaking guest mode or session expectations.

## Verification Commands

- Command: `flutter test`
- Purpose: run targeted automated checks where available

- Command: targeted auth or widget tests
- Purpose: verify login-related state transitions if the host repo provides them

## Manual Verification

- confirm guest flow still enters the app
- confirm Google login succeeds
- confirm logout returns to the expected state
- confirm token or session behavior is checked at the relevant app or API boundary
- confirm simulator or device walkthrough is recorded

## Regression Checks

- guest mode remains visible and reachable
- login does not erase guest-mode capability
- logout clears or resets state as expected
- stale session state is not silently reused

## Not Run

- provider-specific end-to-end checks that require real credentials
- platform matrix checks not available in the demo

## Result

- Status: example pending execution
- Ship gate: blocked until the listed evidence exists

## Evidence

- This demo intentionally records the expected evidence model rather than fake execution output.

## Remaining Risks

- backend session rules may require deeper checks if the real app relies on API-issued auth state
