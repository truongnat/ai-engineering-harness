---
title: Delegated Workers Design
date: 2026-06-04
status: approved
---

# Delegated Workers Design

## Goal

Introduce a strict harness-level delegated worker contract that can run across providers while still using native agent or subagent features when a provider supports them.

The target outcome is:

- the harness has one portable worker model
- Claude can use native subagents first
- Cursor and Codex can follow through adapters
- `harness-verify` and `harness-ship` consume a uniform result envelope instead of provider-specific behavior

## Problem

The repository already has command contracts, prompt templates, and provider-specific runtime surfaces, but it does not yet have a portable abstraction for delegated execution.

That creates several gaps:

- provider-native agent or subagent features cannot be adopted cleanly without leaking provider semantics into harness core
- review, verification, and gate decisions still depend too much on freeform conversation behavior
- there is no standard lifecycle artifact for delegated work
- providers without native subagents cannot participate in a shared delegation model

The core problem is not "how do we add Claude subagents?" but "how do we let the harness delegate focused work in a portable way while still using native capabilities when available?"

## Design Decision

Add a new core surface named `workers/`.

This surface defines canonical delegated workers owned by the harness, while provider adapters decide how each worker executes on a given runtime.

The system becomes:

1. `workers/registry.js`
   Canonical worker metadata:
   - worker id
   - role
   - execution mode
   - write permissions
   - dispatch rules
   - required inputs
   - result schema
   - provider support
   - definition path

2. `workers/*.md`
   Canonical worker specs:
   - frontmatter metadata
   - worker prompt or operating contract
   - required checks
   - forbidden actions
   - required output envelope

3. `templates/WORKER_RUN.md`
   Lifecycle artifact for each delegated run:
   - metadata
   - task
   - result envelope
   - full result
   - main agent decision
   - next command

4. provider adapters
   Provider-specific execution layers:
   - Claude uses native `.claude/agents/*.md` where appropriate
   - Cursor uses adapter-level delegation surfaces
   - Codex uses adapter-level delegation surfaces
   - other runtimes can use fallback execution while preserving the same contract

## Core Principles

- The harness owns the worker contract.
- Providers own execution adapters.
- Workers are one-shot task runners.
- Only the main agent may dispatch workers.
- Workers must not dispatch other workers.
- Native subagents are an implementation detail, not the core contract.
- Every worker run must produce a lifecycle artifact and a common result envelope.

## Scope

- add a canonical `workers/` surface
- add a worker registry plus Markdown worker definitions
- add a shared `Agent Result` envelope contract
- add a `WORKER_RUN.md` lifecycle artifact template
- add validation for worker metadata, structure, and provider support declarations
- add provider adapter documentation and initial integration guidance
- implement Claude as the first native adapter target
- define Cursor and Codex as adapter targets after Claude

## Non-Goals

- no full workflow graph engine
- no nested worker dispatch
- no background orchestration framework in v1
- no requirement that every provider support native named subagents
- no attempt to convert every harness activity into a worker immediately

## Worker Model

Workers are one-shot delegated task runners.

Rules:

- a worker receives a bounded task from the main agent
- a worker completes once it returns its final report
- a worker does not keep long-lived conversational ownership of the goal
- a worker does not spawn other workers
- a worker may be read-only or write-enabled depending on its role

This model fits the harness command loop because it keeps orchestration centralized while still allowing focused delegated execution.

## Initial Worker Set

v1 should define four canonical workers:

- `reviewer`
  - one-shot
  - read-only
  - reviews implementation against goal, plan, diff, and quality expectations

- `verifier`
  - one-shot
  - may run verification commands and inspect evidence
  - does not modify implementation by default

- `gatekeeper`
  - one-shot
  - read-only
  - decides whether the next command is allowed based on available evidence

- `fixer`
  - one-shot
  - write-enabled
  - applies bounded fixes only when explicitly dispatched by the main agent

These four workers cover the first practical delegation needs without turning the harness into a general orchestration framework.

## Registry Structure

`workers/registry.js` should be the technical source of truth for runtime code and validation.

Each worker entry should include:

- `id`
- `role`
- `mode`
- `writeAccess`
- `canDispatch`
- `requiredInputs`
- `resultSchema`
- `providerSupport`
- `definitionPath`

Recommended support values:

- `native`
- `adapter`
- `fallback`
- `unsupported`

`canDispatch` must be `false` for all v1 workers.

## Worker Definition Files

Each worker should be defined as Markdown plus frontmatter.

Example structure:

```md
---
id: reviewer
role: review
mode: one-shot
writeAccess: none
canDispatch: false
requiredInputs:
  - goal
  - plan
  - changed_files
  - verification_status
resultSchema: agent-result-v1
providerSupport:
  claude: native
  cursor: adapter
  codex: adapter
---

You are the harness reviewer worker.

...
```

The body should define:

- what the worker is responsible for
- what it must check
- what it must never do
- how it must report results

## Result Envelope

Every worker run must return a shared `Agent Result` envelope.

Base contract:

```md
### Agent Result

worker: reviewer
status: completed | issues-found | blocked | failed
ready_to_continue: yes | no | with-fixes
next_command: harness-run | harness-verify | harness-ship | harness-discuss
severity: none | minor | important | critical

### Summary

...

### Findings

...

### Next Recommendation

...
```

Worker-specific sections may follow the common envelope.

Examples:

- reviewer
  - `### Strengths`
  - `### Issues`
  - `### Assessment`

- verifier
  - `### Checks Run`
  - `### Exit Codes`
  - `### Evidence`
  - `### Known Gaps`

- gatekeeper
  - `### Decision`
  - `### Blocking Reason`

- fixer
  - `### Changes Made`
  - `### Risks`
  - `### Follow-up Verification`

This envelope is a harness convention, not a provider API guarantee.

## Lifecycle Artifact

Every delegated run must be written using `templates/WORKER_RUN.md`.

Recommended fields:

- `worker`
- `provider`
- `execution_mode`
- `status`
- `started_at`
- `completed_at`
- `goal_ref`
- `inputs_summary`

And sections for:

- task
- result envelope
- full result
- main agent decision
- next allowed command

This artifact is the bridge between delegated execution and the harness command loop.

## Provider Support Model

Provider adapters should preserve the canonical worker contract while mapping execution into provider-native behavior where possible.

### Claude

Claude is the first and best native target.

The adapter should render supported workers to:

```txt
.claude/agents/*.md
```

Claude remains subject to the harness contract:

- use canonical worker ids
- keep main agent as orchestrator
- require the shared result envelope
- do not allow nested worker dispatch

### Cursor

Cursor is an adapter target for v1.

It may not have an equivalent named-subagent file surface that matches Claude exactly. The adapter may therefore use command, prompt, or conversation-level delegation patterns while still enforcing:

- the same worker inputs
- the same result envelope
- the same lifecycle artifact

### Codex

Codex is also an adapter target for v1.

Its integration may use repo-local instruction surfaces or prompt-driven delegation instead of a Claude-style subagent file. The core requirement is still contract preservation rather than surface symmetry.

### Other Providers

Other providers may start as fallback targets. They can still participate in delegated execution if the main agent follows the worker spec and records the run honestly.

## Support Levels

The support levels should mean:

- `native`
  Provider has a first-class execution surface that maps directly to the worker abstraction.

- `adapter`
  Provider does not expose the same native worker surface but can still run the worker through a controlled delegation pattern.

- `fallback`
  Provider lacks a clean delegated mechanism; the main agent simulates the worker run while preserving the same artifact and envelope contract.

- `unsupported`
  The worker should not be offered on that provider yet.

## Validation Requirements

Validation must require:

- `workers/registry.js` exists
- all canonical workers exist in the registry
- every registry worker has a matching `workers/<id>.md`
- frontmatter metadata exists and matches registry expectations
- every worker definition includes the shared `Agent Result` envelope
- all v1 workers declare `canDispatch: false`
- write-enabled workers are explicitly marked
- provider support declarations are present and valid
- provider docs do not overclaim native support where only adapter support exists

Claude-target validation should additionally require the generated or installed native worker surface when validating Claude-native execution support.

## Command Integration

The harness command loop should consume worker results rather than provider-specific conversations.

Expected integration points:

- `harness-run`
  - may dispatch `fixer` only when bounded remediation is appropriate

- `harness-verify`
  - may dispatch `reviewer` and `verifier`

- `harness-ship`
  - may dispatch `gatekeeper`

The command layer should read worker lifecycle artifacts and result envelopes rather than assuming a specific provider conversation format.

## Rollout

Recommended implementation order:

1. Add the core worker contract
   - `workers/registry.js`
   - `workers/*.md`
   - `templates/WORKER_RUN.md`
   - validation and docs

2. Add the Claude adapter
   - render worker definitions to `.claude/agents/*.md`
   - document native support level honestly

3. Add Cursor and Codex adapters
   - preserve contract even if execution remains adapter-level rather than native-level

4. Expand worker-aware command integration
   - verify
   - ship
   - bounded fixer usage

## Risks

- the abstraction becomes too abstract and stops helping real provider execution
- provider adapters drift away from canonical worker specs
- write-enabled workers create unclear trust boundaries
- the repository overclaims portable native support before adapter behavior is proven

## Mitigations

- keep v1 worker inventory small
- keep worker metadata centralized in the registry
- keep worker prompts canonical in Markdown definitions
- make lifecycle artifacts mandatory
- distinguish `native` from `adapter` support explicitly in docs and validation
- forbid nested worker dispatch in v1

## Recommendation

Implement a strict portable worker contract first, then ship Claude as the first native adapter while preparing Cursor and Codex as adapter targets.

This gives the repository a real delegated execution model without locking the harness core to a single provider's subagent semantics.
