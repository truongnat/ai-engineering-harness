# Remember

> Do not include credentials, tokens, customer data, or private business data.

## Date

2026-06-03

## Project

ai-engineering-harness — `examples/dogfood-tiny-node-api`

## Problem

The pack needed proof-of-value: show that harness phases (plan → approve → run → verify → ship) produce inspectable artifacts with real evidence, not placeholder VERIFY prose.

## Root Cause

Earlier releases emphasized markdown contracts without a checked-in end-to-end example with passing tests recorded in VERIFY.

## Decision

Add a zero-dependency Node micro-API dogfood target and commit `.harness/` artifacts with `status: passed` only after `npm test` actually passed.

## Solution

`/health` implemented in `src/server.js`; tests in `test/health.test.js`; VERIFY cites exit code 0 and subtest names from a real run.

## Commands

- [x] `npm test` in `examples/dogfood-tiny-node-api`

## Edge Cases

- Test server binds ephemeral port via `listen(0)` to avoid collisions in parallel runs.

## Reuse Guidance

Use this folder as the canonical v0.11.0 dogfood reference before expanding to larger sample apps.

## Sensitive Data Check

- [x] No credentials
- [x] No tokens
- [x] No customer data
- [x] No private business data
