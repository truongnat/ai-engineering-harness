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

## Success Criteria

- guest users can still enter the app without authentication
- Google users can enter the authenticated path cleanly
- verification makes any unrun manual checks explicit

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

- Task: Map the current guest-mode entry path and sign-in responsibilities
- Why now: protecting the existing guest flow is the highest regression risk
- Affected files or artifacts: sign-in screen, auth controller/service
- Verification for this task cluster: a reviewer can trace the guest path without finding hidden auth requirements

- Task: Add Google sign-in without removing guest continuation
- Why now: the feature is additive, not a redesign
- Affected files or artifacts: sign-in surface, auth action wiring
- Verification for this task cluster: UI and state logic still expose both entry modes

- Task: Verify both entry modes and capture the lesson
- Why now: the feature is not done if one mode works and the other regresses
- Affected files or artifacts: `.harness/VERIFY.md`, `.harness/REMEMBER.md`
- Verification for this task cluster: guest and Google flows each have explicit checks

## Approval Checkpoints

- Checkpoint: auth scope remains additive
- Trigger: plan stays out of backend redesign and mandatory sign-in scope
- Approval needed from: example maintainer
- Notes: compact adoption example only

## Verification Strategy

- Command: run Flutter tests or manual flow checks for guest and Google sign-in paths
- Expected result: guest users still reach the app, and Google-authenticated users reach the signed-in experience

## Risks

- auth changes can accidentally make sign-in mandatory
- UI changes can hide the guest path even if it still exists internally

## Rollback Plan

Remove the Google login entry point and restore the previous sign-in surface if guest-mode regression is detected.

## Approval Status

status: approved
approved_by: example maintainer
approved_at: example
notes: compact adoption example only

## Human Approval

See Approval Status above.
