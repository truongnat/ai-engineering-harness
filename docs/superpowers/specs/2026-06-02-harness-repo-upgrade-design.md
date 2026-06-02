# Harness Repository Upgrade Design

## Goal

Upgrade the repository from a valid scaffold into a practical operating system for real AI coding agents without introducing a heavy runtime.

## Design Decision

The canonical host-repository artifact layout is `.harness/`. This repository remains markdown-first and runtime-light, but its commands, templates, examples, and docs should all point to `.harness/` as the standard place where working artifacts live.

## Scope

- strengthen `AGENTS.md` into the central operating contract
- make command documents operational and artifact-aware
- make skills strict, compact, and reusable
- turn templates into safe, fillable artifacts
- upgrade workflows and patterns into practical decision guides
- document the `.harness/` layout and quality gates
- add a realistic example project skeleton
- add `.gitignore` and GitHub Actions validation CI

## Non-Goals

- no `src/core`
- no agent runtime or server
- no database, search backend, orchestration framework, Docker, or web UI
- no conversion into a TypeScript framework

## Architecture

The repository stays document-centric:

1. `AGENTS.md` defines non-negotiable behavior.
2. `commands/` gives agents entry points into the operating loop.
3. `skills/` defines reusable capabilities with clear boundaries.
4. `workflows/` combines commands and skills for common task classes.
5. `patterns/` guides delegation and coordination choices.
6. `templates/` defines durable artifact formats for `.harness/`.
7. `docs/` explains the system, layout, and roadmap.
8. lightweight Node and CI checks validate structure only.

## Risks

- docs can become too abstract and lose operational value
- commands can overlap if stop conditions and artifact ownership are vague
- memory artifacts can become unsafe if sensitive-data rules are not explicit

## Mitigations

- write each artifact as an operator-facing contract
- define where to read, where to write, and when to stop
- add explicit safety guidance for secrets and private business data
