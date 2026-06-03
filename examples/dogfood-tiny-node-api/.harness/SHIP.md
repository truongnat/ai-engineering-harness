# Ship

> Do not include credentials, tokens, customer data, or private business data.

## Summary

Shipped the dogfood `/health` endpoint for `examples/dogfood-tiny-node-api` as documented in this example’s harness artifacts. Scope matches the approved plan.

## Verification Basis

- [x] `npm test` exit code 0 (see `.harness/VERIFY.md`)
- [x] Automated checks cover `/health` 200 JSON and `/` regression
- [ ] Manual `curl` not recorded in VERIFY — not required for ship claim

## Follow-Ups

- [ ] Optional: add CI job that runs `npm test` in this example path
- [ ] Step 4: README polish with terminal transcript/screenshot

## Not Shipped

- [ ] Production deployment or hosting
- [ ] Harness installer run inside this folder (artifacts are illustrative)

## Handoff Notes

Consumers can clone the repo, run `npm test` under `examples/dogfood-tiny-node-api`, and compare `.harness/*` to the documented command flow.
