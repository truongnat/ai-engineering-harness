---
id: tool-discovery
name: Tool Discovery Skill
status: active
scope: core
version: 1
can_block: true
can_write: false
inputs:
  - session context
  - repository tools
outputs:
  - TOOL_CONTEXT.md
tools:
  - discover-tools
  - rg
  - git
---

# tool-discovery

## Purpose

Detect available local tools and route work by capability instead of tool-name memory.

## When To Use

- before verification or review when tool choice matters
- when `.harness/TOOL_CONTEXT.md` is missing or stale
- at the start of a composed review-and-verify workflow

## When Not To Use

- when `.harness/TOOL_CONTEXT.md` is already current for this session
- when the task needs no external tooling

## Inputs

- active session context
- optional existing `TOOL_CONTEXT.md`

## Procedure

1. Read `.harness/TOOL_CONTEXT.md` if present.
2. Otherwise run `node scripts/discover-tools.js --markdown`.
3. Update or create `.harness/TOOL_CONTEXT.md`.
4. Route by capability, not by guessed tool names.

## Output Contract

Produce or refresh `.harness/TOOL_CONTEXT.md` with detected tools and routing guidance.

## Blocking Conditions

Return blocked when a required capability has no safe fallback and the next step depends on it.

## Common Failure Modes

- assuming a tool exists without detection
- treating missing optional tools as hard failure by default

## References

- `references/routing-table.md`
- `prompt.md`
