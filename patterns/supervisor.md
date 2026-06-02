# Supervisor

## When To Use

Use this when one coordinator should own sequencing, artifact state, and quality gates while others handle bounded tasks.

## When Not To Use

Do not use it for simple single-operator work or when the supervisor becomes a bottleneck for every small action.

## Agent Team Shape

One supervisor plus one or more task owners.

## Information Flow

The supervisor owns `.harness/STATE.md`, `.harness/PLAN.md`, and final integration decisions. Task owners report progress, blockers, and outputs back to the supervisor.

## Strengths

- centralized state tracking
- strong gatekeeping
- clear coordination

## Risks

- bottlenecks
- over-centralized decision making

## Example Use Case

A complex feature where one coordinator tracks plan state while multiple contributors own docs, templates, and validation updates.

## Verification Strategy

The supervisor verifies that all task outputs align with the plan before allowing ship or remember steps.
