# Remember

## Date

- 2026-06-04

## Project

- invalid-target-goal fixture

## Problem

- A stale `current_plan` pointer can make a session look present while still being unusable.

## Root Cause

- Root state drifted away from the actual session-local plan files.

## Decision

- Fail validation instead of guessing another plan file.

## Solution

- Keep `current_plan` aligned with a real `PLAN-###.md` file.

## Commands

- `node validate.js --target <path> --goal 2026-06-04-google-login`

## Edge Cases

- Migrating sessions may leave stale plan names behind.

## Reuse Guidance

- Use this fixture to confirm validation follows `STATE.md`.

## Sensitive Data Check

- [x] No credentials
- [x] No tokens
- [x] No customer data
- [x] No private business data
