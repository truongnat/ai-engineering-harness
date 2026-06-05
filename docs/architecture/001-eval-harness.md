# ADR 001: Eval Harness Foundation

## Status

Accepted — 2026-06-05

## Context

The harness claimed engineering discipline benefits without measurable proof. We needed repeatable A/B comparisons between `with-harness` and `without-harness` runs.

## Decision

- Add `evals/` registry + fixtures + rubrics as data
- Add `lib/evals/` engine for deterministic checks, scoring, and reports
- Expose `aih eval list|run|report` and run `sample-bugfix` in CI

## Consequences

- Foundation is local/deterministic first; live provider orchestration and LLM-as-judge are follow-ups
- Eval artifacts live under `artifacts/runs/` (gitignored)
