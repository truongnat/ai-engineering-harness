# Workflow Profile

> Do not include credentials, tokens, customer data, or private business data.

## Purpose

Define the workflow this project should use for this feature.

## Current Status

- Status: approved example
- Last updated: 2026-06-02
- Owner: demo harness build

## Selected Workflows

- Work type: feature
- Workflow: `feature`
- Why selected: the request adds a user-facing capability with explicit acceptance criteria and bounded implementation scope

## Execution Model

- Goal lifecycle: proposed → discussed → planned → executing → verifying → shipped → remembered
- Task lifecycle: pending → in_progress → blocked → reviewing → verified → done
- Review and retry loop: retry inside task scope if guest/login/session behavior fails checks; re-plan if scope or architecture changes
- Verification loop: collect targeted automated and manual evidence, record not-run items, and block ship if guest mode or auth regression remains unclear

## Command Expectations

- Required start command: `harness-start`
- Required planning command: `harness-plan`
- Required verification command: `harness-verify`

## Escalation Rules

- Human approval is required when: auth architecture changes, backend scope expands materially, or data migration is needed
- Stop and re-plan when: guest mode can no longer remain independent, token handling needs redesign, or verification reveals a broader session problem

## Assumptions

- [ ] The feature workflow is sufficient without converting to incident or refactor workflow.

## Unknowns

- [ ] Whether a follow-up refactor workflow is needed after the feature if auth boundaries are messy

## Human Review

- Status: approved example
- Notes: This example keeps the workflow intentionally feature-oriented and scope-controlled.
