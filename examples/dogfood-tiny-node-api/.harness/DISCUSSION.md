# Discussion

> Do not include credentials, tokens, customer data, or private business data.

## Goal Clarification

The dogfood target is a dependency-free Node `http` server. The feature is a standard liveness probe endpoint.

## Constraints

- [ ] No npm dependencies beyond Node built-ins
- [ ] Keep `src/server.js` small and readable
- [ ] Verification must use real `npm test` output

## Options Considered

### Option 1 — Inline route in `server.js`

- Summary: add `GET /health` branch next to existing `/` handler.
- Tradeoffs: simplest; easy to test with `node --test`.

### Option 2 — Router package

- Summary: add Express or similar.
- Tradeoffs: rejected — violates lightweight dogfood scope.

## Agreed Direction

Implement Option 1: one additional branch in `src/server.js` and extend `test/health.test.js`.

## Open Questions

- [ ] None — scope is fixed for dogfood.
