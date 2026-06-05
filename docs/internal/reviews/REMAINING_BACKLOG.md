# Remaining Backlog — Review Follow-up

> Consolidated outstanding items from `REVIEW_REPORT_VI.md`, `IMPROVEMENTS_EVALUATION_VI.md`, and `IMPROVEMENTS_STATUS.md`.
> Last updated: 2026-06-05 (after P1 completion, commit `bf237ee`).

## Done (no action)

- 🔴 Critical 1.1–1.4 and 🟠 High 2.1–2.5 (`REVIEW_REPORT_VI`)
- P0 eval harness, P1 telemetry/eval/adoption items (`IMPROVEMENTS_EVALUATION_VI`)
- Catalog split, provider manifests, Husky, coverage gate, changesets, `aih init`, insights, 20-task eval corpus
- Product walkthrough video removed; `AI_Engineering_Harness.mp4` purged from git history
- `main` synced with local (force-push completed when branch protection allowed)

---

## P0 — Infra / ops (ưu tiên cao nhất)

| ID | Item | Source | Action |
| --- | --- | --- | --- |
| OPS-1 | **`NPM_TOKEN` GitHub secret** for automated npm publish | D / release.yml | Add repo secret; verify changesets release workflow |
| OPS-2 | **Confirm CI green on `main`** after latest push | D | Check Actions → all `validate-and-test` matrix jobs |
| OPS-3 | **Branch protection hygiene** | D | Keep required checks; ensure *Allow force pushes* is **off** after history rewrite |
| OPS-4 | **Notify collaborators** to `git fetch && git reset --hard origin/main` if they cloned pre-rewrite history | Ops | One-time comms |

---

## P1 — Product / moat (mở rộng sau batch vừa ship)

| ID | Item | Source | Notes |
| --- | --- | --- | --- |
| PROD-1 | **Eval corpus 20 → 30** golden tasks | A / P3 | Seed script exists; add 10 more real-repo scenarios |
| PROD-2 | **Hosted LLM judge service** | A / P3 | Client hook + `EVAL_JUDGE_ENDPOINT` contract shipped; no bundled judge server |
| PROD-3 | **Live provider evals** (not only deterministic local mutations) | A | Run real agent + harness on subset of corpus in CI/nightly |
| PROD-4 | **Telemetry upload endpoint** | B | `aih insights --upload` ready; need real `HARNESS_TELEMETRY_ENDPOINT` backend |
| PROD-5 | **Automated telemetry→eval regression** | B | `--recommend-evals` is heuristic; wire into scheduled eval runs / dashboard |
| PROD-6 | **Compatibility matrix from live eval results** | F | Matrix is registry-based; annotate pass rates per provider when live evals exist |

---

## P2 — Architecture & quality

| ID | Item | Source | Notes |
| --- | --- | --- | --- |
| ARCH-1 | **Rules engine vs rules content** split | C | Compose/render/validate engine versioned separately from markdown rules |
| ARCH-2 | **Migrate `lib/` to TypeScript** | C / G / P3 | `index.d.ts` exists; incremental migration |
| ARCH-3 | **Remove root shims** (`install.js`, `validate.js`, …) | 3.5 | Planned v1.1.0; document deprecation timeline |
| ARCH-4 | **String-presence tests → behavior tests** | 3.3 / G | `test/run-tests.js` Provider Rules, Session Start, etc. still brittle |
| ARCH-5 | **SemVer / API stability policy** | 3.2 / F | Clarify v1.0 commitment vs `0.x`; align CHANGELOG and breaking-change policy |

---

## P3 — Docs & polish

| ID | Item | Source | Notes |
| --- | --- | --- | --- |
| DOC-1 | **Docs sprawl cleanup** | 3.1 / E | Merge duplicate `install-*`, `runtime-*`; more archive under `docs/internal/` |
| DOC-2 | **Version SSOT everywhere** | E | `sync-site-version.js` exists; matrix/release-notes may still hard-code version |
| DOC-3 | **`CORE_BREAKTHROUGH_VI.md` triage** | New | Decide: internal review only vs integrate into roadmap |
| POL-1 | **`bin/cli-ui.js` shim rename** | 4.3 | Reduce confusion with `lib/cli-ui.js` |
| POL-2 | **`npm warn always-auth`** | 4.1 | Clean global/repo `.npmrc` |
| POL-3 | **Purge `demo-video/` tree from history** (optional) | Hygiene | Source TS remains in old commits; no MP4 blobs; optional `filter-repo` if folder unwanted |

---

## Scorecard (trục IMPROVEMENTS)

| Trục | Score | Gap to target 5/5 |
| --- | :---: | --- |
| A Evals | 4.5/5 | Live agent evals, 30-task corpus, hosted judge |
| B Telemetry | 4.5/5 | Real upload backend, automated regression loop |
| C Architecture | 4/5 | Rules engine split, TypeScript |
| D CI/CD | 4.5/5 | NPM_TOKEN, optional nightly eval job |
| E Docs | 4/5 | Sprawl merge, version SSOT |
| F Adoption | 4/5 | Live matrix, case studies |
| G DX | 4/5 | Behavior tests, TypeScript |

---

## Suggested next sprint (ordered)

1. OPS-1 + OPS-2 (secrets + CI verify)
2. PROD-1 (10 more eval tasks → 30)
3. ARCH-4 (replace top 3 brittle markdown test suites)
4. ARCH-1 or ARCH-2 (pick one structural investment)
5. PROD-4 (stand up minimal telemetry ingest endpoint)

---

## Reference commands

```bash
npm test
npm run test:coverage
npm run format:check
node scripts/seed-p1-eval-corpus.js
node scripts/generate-compatibility-matrix.js
aih eval list
aih insights --recommend-evals
```
