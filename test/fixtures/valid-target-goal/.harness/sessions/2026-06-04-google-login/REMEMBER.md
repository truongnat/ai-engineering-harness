# Remember

## Date

- 2026-06-04

## Project

- valid-target-goal fixture

## Problem

- Target validation previously depended on legacy `.harness/goals/<goal-id>/`.

## Root Cause

- The validator and fixtures were not migrated when session memory became the working default.

## Decision

- Keep `--goal` for CLI compatibility, but validate a session id under `.harness/sessions/`.

## Solution

- Route through `.harness/STATE.md` and validate the session-local artifact set named by the CLI argument.

## Commands

- `node validate.js --target <path> --goal 2026-06-04-google-login`

## Edge Cases

- Session id and legacy goal label may differ during migration.

## Reuse Guidance

- Reuse this layout when building target-repo fixtures for active workstreams.

## Sensitive Data Check

- [x] No credentials
- [x] No tokens
- [x] No customer data
- [x] No private business data
