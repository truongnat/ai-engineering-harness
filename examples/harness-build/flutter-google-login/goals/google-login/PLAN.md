# Plan

> Do not include credentials, tokens, customer data, or private business data.

## Goal

Add Google login while preserving guest mode and validating session behavior.

## Scope

Bound the work to the smallest change set that introduces Google login without turning guest mode into a broken or hidden path.

## In Scope

- [ ] map current auth and guest-state boundaries
- [ ] add login entry and flow
- [ ] preserve guest mode in onboarding or entry surfaces
- [ ] verify logout and session transitions

## Out Of Scope

- [ ] broad backend auth redesign
- [ ] account migration logic unless required and approved

## Current Understanding

- [ ] Guest mode already exists and must remain separately testable.
- [ ] Auth or session persistence may involve backend interaction even if the UI is Flutter-only.

## Assumptions

- [ ] Existing navigation can support both guest and signed-in paths.
- [ ] Logout should return the app to a predictable guest-capable state.

## Affected Areas

- File or artifact: auth entry UI and navigation
- Reason: add Google login without removing guest path

- File or artifact: session or token boundary
- Reason: confirm state persistence and reset behavior

## Proposed Approach

- map guest and auth flow boundaries first
- implement the smallest feature path for Google login
- keep guest entry explicit
- verify login, guest, logout, and session behavior independently

## Tasks

- [ ] Task 1: map existing guest and auth boundaries
- [ ] Task 2: add Google login entry and state transitions
- [ ] Task 3: verify guest, login, logout, and session behavior

## Verification Strategy

- Command: targeted Flutter tests or existing auth-related tests
- Expected result: no regression in guest path and expected success for login and logout

- Command: manual simulator or device auth flow walkthrough
- Expected result: guest, login, and logout flows behave as planned

## Risks

- [ ] guest state may be overwritten when auth state initializes
- [ ] logout may leave stale local session data
- [ ] backend-issued session may not align with client assumptions

## Rollback Plan

Remove or disable the new login path if guest or session behavior cannot be made safe within scope.

## Human Approval

- Status: approved example
- Notes: Re-plan and seek approval if auth architecture changes are needed.
