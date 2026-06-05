# IMPROVEMENTS_EVALUATION_VI — Completion Status

> Tracker for `IMPROVEMENTS_EVALUATION_VI.md` (2026-06-05). Updated after implementation pass.

## Summary

| Trục | Before | After | Notes |
| --- | :---: | :---: | --- |
| A Evals | 1/5 | **4/5** | 5 golden tasks + rubric judge stub; 15–30 corpus & live LLM judge deferred |
| B Telemetry | 2/5 | **4/5** | `aih insights --export` + config opt-in; remote upload deferred |
| C Architecture | 3/5 | **4/5** | Provider manifests + catalog split (`lib/catalog/`) |
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
- [x] `runtime-command-catalog.js` split → `lib/catalog/{provider-command-metadata,command-rendering,command-installation}.js`
- [x] `aih init` quickstart

## P3 — deferred

- [ ] Migrate `lib/` to TypeScript
- [ ] 15–30 golden eval tasks (5 sample tasks seeded)
- [ ] Live LLM-as-judge (deterministic rubric + stub fallback shipped)
- [ ] Remote anonymized telemetry upload (`HARNESS_TELEMETRY_ENDPOINT`)

## Commands added

```bash
aih eval list|run|report
aih insights [--json] [--export]
aih init [--provider <id>] [--yes]
npm run test:coverage
node scripts/generate-compatibility-matrix.js
node scripts/sync-site-version.js
node scripts/split-catalog.js   # one-time catalog split helper
```

## Eval tasks (sample-suite)

| Task | Mode |
| --- | --- |
| `sample-bugfix` | bugfix |
| `sample-string-trim` | bugfix |
| `sample-config-patch` | bugfix |
| `example-health-report` | workflow-discipline |
| `sample-response-contract` | workflow-discipline |
