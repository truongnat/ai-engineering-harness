# Plan

## Goal

Add Google login to the Flutter app without regressing guest mode.

## Scope

Show a compact but realistic plan for a Flutter auth feature while keeping the harness artifacts readable.

## In Scope

- sign-in surface update
- Google login wiring at the Flutter client layer
- preserving guest-mode entry and navigation
- verification for both guest and Google flows

## Out Of Scope

- backend redesign
- mandatory sign-in
- additional identity providers
- secrets

## Current Understanding

- the app already supports guest access and that path must remain first-class
- Google login is an additive capability, not a replacement for anonymous use

## Assumptions

- a Flutter sign-in screen or onboarding gate already exists
- Google Sign-In package integration is acceptable within the host app

## Affected Areas

- Flutter sign-in or onboarding screen
- auth service or controller layer
- guest-mode navigation guard or session state
- `.harness/VERIFY.md`
- `.harness/REMEMBER.md`

## Proposed Approach

Add a second sign-in option for Google while leaving the guest continuation path visible and unchanged, then verify both entry modes explicitly.

## Tasks

- [ ] Map the current guest-mode entry path and sign-in screen responsibilities
- [ ] Add a Google sign-in action without removing the guest continue action
- [ ] Wire successful Google auth into the existing authenticated session path
- [ ] Verify that guest mode still enters the app without auth
- [ ] Verify that Google login enters the authenticated path cleanly
- [ ] Capture the guest-mode preservation rule in memory

## Verification Strategy

- Command: run Flutter tests or manual flow checks for guest and Google sign-in paths
- Expected result: guest users still reach the app, and Google-authenticated users reach the signed-in experience

## Risks

- auth changes can accidentally make sign-in mandatory
- UI changes can hide the guest path even if it still exists internally

## Rollback Plan

Remove the Google login entry point and restore the previous sign-in surface if guest-mode regression is detected.

## Human Approval

- Status: approved
- Notes: compact adoption example only
