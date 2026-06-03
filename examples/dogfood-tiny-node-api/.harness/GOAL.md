# Goal

> Do not include credentials, tokens, customer data, or private business data.

## Goal

Add a `GET /health` endpoint to the tiny Node API without breaking the existing root route.

## Scope

Single-file server change plus a focused test. No new dependencies.

## In Scope

- `GET /health` returns HTTP 200 and JSON `{"status":"ok"}`
- `GET /` continues to respond as before
- automated test coverage for `/health`

## Out Of Scope

- Authentication, metrics, or deployment changes
- Additional routes beyond `/health`

## Acceptance Criteria

- `npm test` exits 0
- `GET /health` returns status 200 with `{"status":"ok"}`
- `GET /` still returns the existing root body
