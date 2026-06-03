# Architecture

This repository uses markdown-first architecture rather than runtime orchestration.

It may borrow engineering discipline from larger systems, but it does so by tightening documents, skills, and validation rules instead of adding a long-running control plane.

## Why Markdown First

Markdown is portable across editors, repos, and agent tools. It keeps plans, reviews, verification, and memory visible in version control instead of hiding state inside prompts or runtime services.

## Why No Heavy Runtime In V1

Version 1 is intentionally light:

- no `src/core`
- no agent server
- no LangGraph
- no database
- no Redis
- no Neo4j
- no Meilisearch
- no Docker
- no web UI

The goal of v1 is to standardize engineering behavior, not to introduce a platform dependency. The only code layer is lightweight install and validation helpers plus CI.

That means this repo intentionally does not absorb:

- parallel state trees such as `.planning/`
- workspace inventories or graph intelligence
- autonomous subagent meshes
- framework-style SDKs for active planning state

## System Layers

1. `AGENTS.md` sets the operating contract.
2. `commands/` provides command-level runbooks.
3. `skills/` provides reusable capabilities.
4. `workflows/` provides task-class sequences.
5. `patterns/` provides coordination decisions.
6. `templates/` provides durable artifact formats.
7. `docs/` explains the system and host-repo adoption.
8. `examples/demo-project/` shows how a host repo can use `.harness/`.

## Host Repository Model

Host repositories are expected to keep active engineering artifacts under `.harness/`.

Typical flow:

1. The host repo carries application code and tests.
2. `.harness/` stores the goal, plan, tasks, verification notes, and memory.
3. Agents read `.harness/` first, then inspect code.
4. Agents update `.harness/` as work progresses.

This keeps the harness close to the work without creating a separate service or storage system.
