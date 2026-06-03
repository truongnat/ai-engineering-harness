# Plan

> Do not include credentials, tokens, customer data, or private business data.

## Goal

Add `GET /health` without regressing `GET /`.

## Scope

Touch only `src/server.js` and `test/health.test.js`.

## In Scope

- [ ] JSON health response on `/health`
- [ ] regression test for `/`
- [ ] record verification in `.harness/VERIFY.md`

## Out Of Scope

- [ ] Process manager, Docker, or CI wiring in this demo

## Proposed Approach

1. Add `/health` handler returning 200 + `{"status":"ok"}`.
2. Add test asserting status and body.
3. Run `npm test` and capture evidence in VERIFY.

## Tasks

- [ ] Implement `/health` in `src/server.js`
- [ ] Add `/health` test case
- [ ] Run `npm test` and update VERIFY with results

## Verification Strategy

- Command: `npm test`
- Expected result: exit code 0; tests include `/health` 200 JSON check

## Risks

- [ ] Accidentally changing `/` behavior when adding routing

## Rollback Plan

Revert `src/server.js` and `test/health.test.js` if tests fail.

## Approval Status

status: approved
approved_by: dogfood maintainer
approved_at: 2026-06-03
notes: Approved for v0.11.0 Step 3 dogfood demo.

## Human Approval

See Approval Status above.
