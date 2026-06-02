# Skill Selection

> Do not include credentials, tokens, customer data, or private business data.

## Purpose

Define the smallest sufficient skill set for this harness profile.

## Current Status

- Status: approved example
- Last updated: 2026-06-02
- Owner: demo harness build

## Selected Core Skills

- Skill: `using-harness`
- Why selected: enforces artifact-first behavior and phase discipline

- Skill: `mapping-codebase`
- Why selected: required to locate guest flow, auth boundary, and session handling before planning

- Skill: `discussing-goals`
- Why selected: needed to make guest mode a protected acceptance criterion

- Skill: `writing-plans`
- Why selected: required to define a minimal feature plan before any code change

- Skill: `executing-plans`
- Why selected: keeps implementation aligned with the approved plan

- Skill: `verification`
- Why selected: required to gather evidence for guest flow, login flow, logout flow, and session behavior

- Skill: `code-review`
- Why selected: needed to challenge regressions around state and auth boundaries

- Skill: `remembering`
- Why selected: needed to preserve durable auth and guest-mode lessons after ship

## Selected Skill Packs

- Pack: `mobile`
- Why selected: the primary user-facing change is in Flutter app flow, UI state, and platform behavior

- Pack: `backend`
- Why selected: auth API or session boundary may be involved even if the main feature is mobile-first

## Excluded Skills Or Packs

- Item: `debugging`
- Reason not selected: this is framed as feature delivery, not bug investigation; add only if auth or guest state behavior becomes unclear during mapping

## Assumptions

- [ ] Existing core skills are sufficient; no new skill should be invented for this scenario.

## Unknowns

- [ ] Whether the backend pack remains necessary after mapping confirms where session truth lives

## Human Review

- Status: approved example
- Notes: Skill selection follows the anti-bloat rule: smallest sufficient set only.
