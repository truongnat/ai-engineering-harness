# IMPROVEMENTS_EVALUATION_VI — Completion Status

> Tracker for `IMPROVEMENTS_EVALUATION_VI.md` (2026-06-05). Updated after implementation pass.

## Summary

| Trục | Before | After | Notes |
| --- | :---: | :---: | --- |
| A Evals | 1/5 | **3.5/5** | Foundation + CI regression; 2 tasks; LLM-judge & 15–30 corpus deferred |
| B Telemetry | 2/5 | **3.5/5** | `aih insights` + hook JSONL; opt-in remote deferred |
| C Architecture | 3/5 | **3.5/5** | Provider manifests; catalog module split deferred to v1.1 |
| D CI/CD | 3/5 | **4.5/5** | Coverage, dependabot, changesets, smoke install, branch protection doc |
| E Docs | 2/5 | **4/5** | 3-tier layout, ADRs, Diátaxis index, v0 archive |
| F Adoption | 2/5 | **3.5/5** | `aih init`, README moat, compatibility matrix |
| G DX | 3/5 | **4/5** | Husky, CONTRIBUTING DoD, coverage gate; full TS migrate deferred |

## P0 ✅

- [x] Eval harness + A/B baseline
- [x] CI required checks documented (`.github/BRANCH_PROTECTION.md`)

## P1 ✅ / partial

- [x] `aih insights`
- [x] Changesets + coverage gate
- [x] Docs 3-tier + archive v0 + ADRs

## P2 ✅ / partial

- [x] Provider declarative manifests (`providers/*.json`)
- [ ] Full `runtime-command-catalog.js` module split (roadmap in `lib/RUNTIME_CATALOG_REFACTORING.md`)
- [x] `aih init` quickstart

## P3 — deferred

- [ ] Migrate `lib/` to TypeScript
- [ ] 15–30 golden eval tasks
- [ ] LLM-as-judge rubric (deterministic `response-contract-v1` seeded)
- [ ] Opt-in anonymized telemetry upload

## Commands added

```bash
aih eval list|run|report
aih insights [--json]
aih init [--provider <id>] [--yes]
npm run test:coverage
node scripts/generate-compatibility-matrix.js
node scripts/sync-site-version.js
```
