# Remember

> Do not include credentials, tokens, customer data, or private business data.

## Date

2026-06-02

## Project

Flutter app with optional Google login and guest mode

## Problem

Optional authentication features often regress guest-mode entry or leave stale session state after logout.

## Root Cause

To be filled after real execution. Promote only confirmed causes, not guesses.

## Decision

Treat guest mode as a protected acceptance criterion separate from login success.

## Solution

Verify guest, login, logout, and session boundaries independently. Do not treat successful sign-in as proof that the feature is complete.

## Commands

- `flutter test`
- targeted auth-related tests if available
- manual simulator or device walkthrough for guest, login, and logout flows

## Edge Cases

- guest-to-login transition preserves expected state
- logout does not strand the app in a broken intermediate state
- backend session assumptions match client behavior

## Reuse Guidance

Reuse this memory pattern for future optional-auth work: protect fallback paths explicitly and verify them independently.

## Sensitive Data Check

- No secrets, tokens, credentials, customer data, or private business data stored.
