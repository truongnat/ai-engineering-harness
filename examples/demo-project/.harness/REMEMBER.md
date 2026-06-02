# Remember

## Date

2026-06-02

## Project

Demo Project

## Problem

New adopters need a visible example of how `.harness/` should be used.

## Root Cause

Structure alone is not enough; agents need to see artifact flow in practice.

## Decision

Provide a compact example artifact set instead of adding runtime tooling.

## Solution

Add a minimal `.harness/` directory with representative project, goal, plan, verify, and remember artifacts.

## Commands

- `harness-start`
- `harness-plan`
- `harness-verify`
- `harness-remember`

## Edge Cases

- Avoid filling example artifacts with fake production details

## Reuse Guidance

Copy the structure, then replace content with real project artifacts in the host repository.

## Sensitive Data Check

- [x] No credentials
- [x] No tokens
- [x] No customer data
- [x] No private business data
