# ADR 002: Declarative Provider Manifests

## Status

Accepted — 2026-06-05

## Context

Provider capabilities were embedded in `runtime-command-catalog.js`, making multi-provider support harder to audit and extend.

## Decision

- Store provider metadata in `providers/<id>.json` validated by `providers/schema.json`
- Load manifests via `lib/provider-registry.js`
- Keep `runtime-command-catalog.js` as install/render engine until v1.1 module split

## Consequences

- Adding a provider starts with a manifest file, then catalog/install wiring
- Compatibility matrix is generated from manifests + eval registry
