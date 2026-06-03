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

## Current Understanding

- [ ] This dogfood example proves the workflow-artifact loop with a tiny HTTP route change.

## Success Criteria

- [ ] `GET /health` returns 200 JSON with `{"status":"ok"}`
- [ ] `GET /` keeps its existing behavior
- [ ] verification evidence is recorded without overclaiming

## Assumptions

- [ ] The demo remains intentionally narrow and Node-only.

## Affected Areas

- File or artifact: `src/server.js`
- Reason: add the `/health` route
- File or artifact: `test/health.test.js`
- Reason: verify `/health` and guard `/`
- File or artifact: `.harness/VERIFY.md`
- Reason: record evidence for the dogfood workflow

## Proposed Approach

1. Add `/health` handler returning 200 + `{"status":"ok"}`.
2. Add test asserting status and body.
3. Run `npm test` and capture evidence in VERIFY.

## Tasks

- Task: Implement `/health` in `src/server.js`
- Why now: This is the smallest code change that satisfies the feature goal.
- Affected files or artifacts: `src/server.js`
- Verification for this task cluster: `node --test test/health.test.js` should fail before the handler exists and pass after it is added.

- Task: Add `/health` and root regression coverage
- Why now: Verification should prove both the new route and the no-regression claim.
- Affected files or artifacts: `test/health.test.js`
- Verification for this task cluster: `node --test test/health.test.js` passes with both subtests.

- Task: Capture final evidence in `.harness/VERIFY.md`
- Why now: The demo is about workflow artifacts, not just code edits.
- Affected files or artifacts: `.harness/VERIFY.md`
- Verification for this task cluster: `npm test` output is summarized accurately in VERIFY.

## Approval Checkpoints

- Checkpoint: Plan approval before implementation
- Trigger: Route, test, and evidence scope are explicit
- Approval needed from: dogfood maintainer
- Notes: Recorded below in Approval Status

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
