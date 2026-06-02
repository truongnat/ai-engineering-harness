# Remember

## Date

2026-06-02

## Project

Flutter Guest Commerce App

## Problem

Authentication features often regress guest-mode access by making sign-in the default or only visible path.

## Root Cause

Login work tends to focus on the authenticated path and accidentally demotes anonymous navigation.

## Decision

Treat guest mode as a preserved product requirement whenever adding optional authentication.

## Solution

Keep "Continue as guest" explicit in the goal, plan, and verification artifacts whenever adding Google sign-in.

## Commands

- `harness-discuss`
- `harness-plan`
- `harness-run`
- `harness-verify`
- `harness-remember`

## Edge Cases

- Login succeeds but guest button disappears from the UI
- Login fails and the app traps the user instead of allowing guest entry

## Reuse Guidance

When adding optional auth to any app, state the preserved anonymous path explicitly and verify it as a first-class acceptance criterion.

## Sensitive Data Check

- [x] No credentials
- [x] No tokens
- [x] No customer data
- [x] No private business data
