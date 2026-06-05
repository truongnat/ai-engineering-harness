# TARGET.md

## Purpose

Define the product intent for `ai-engineering-harness` so release, packaging, install, and documentation work stay aligned.

## Product Target

`ai-engineering-harness` is a markdown-first workflow kit for AI coding agents. It should help repositories enforce:

- session restoration before implementation
- explicit planning before code changes
- evidence-based verification before completion claims
- durable handoff and memory after shipping

## Supported Delivery Modes

- npm package for `npx ai-engineering-harness ...`
- repository-local install via `aih.sh`
- provider-specific fallback surfaces such as `AGENTS.md`, rules files, and command catalogs

## Quality Expectations

- release artifacts must pass repository validation, tests, lint, and format checks
- packaged files must exist and be intentionally shipped
- install entrypoints must default to checksum verification when downloading remote scripts
- release-facing documentation must use stable absolute links for externally consumed assets

## Non-Goals

- acting as a hosted orchestration service
- replacing human approval for risky changes
- claiming identical native command support across all providers

## Release Discipline

- tag only from a clean, verified tree
- keep source-pack artifacts and target-repository artifacts clearly separated
- prefer small, reviewable changes over process-heavy rewrites
