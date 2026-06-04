---
id: gatekeeper
name: Gatekeeper Skill
status: active
scope: core
version: 1
can_block: true
can_write: false
inputs:
  - VERIFY.md
  - REVIEW.md
  - ship blockers
outputs:
  - gate decision
  - BLOCKED.md or ship-ready note
tools:
  - read-only inspection
---

# gatekeeper

## Purpose

Decide whether the next command is allowed based on available evidence.

## When To Use

- before `harness-ship`
- after verification and optional review
- when a explicit allow/block decision is required

## When Not To Use

- before verification exists
- when the operator has not requested a ship or gate decision

## Inputs

- active session `VERIFY.md`
- optional review artifact
- documented ship blockers

## Procedure

1. Read verification status and evidence.
2. Read review findings if present.
3. Decide allow, block, or defer.
4. Return a structured gate decision for the main agent.

## Output Contract

Return allow/block/defer with explicit reason and next command.

## Blocking Conditions

Block when verification is pending, blocked, stale, or lacks evidence.

## Common Failure Modes

- approving ship from confidence instead of artifacts
- ignoring documented ship blockers

## References

- `references/gate-contract.md`
- `prompt.md`
