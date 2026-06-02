# Pipeline

## When To Use

Use a pipeline when work should move through clear sequential stages with explicit handoffs and quality gates.

## When Not To Use

Do not use it when tasks are highly interdependent and need constant back-and-forth or when most work can proceed safely in parallel.

## Agent Team Shape

One operator or one stage owner per step, with each stage handing artifacts to the next stage.

## Information Flow

Artifacts move forward in order:

`map -> discuss -> plan -> run -> verify -> ship -> remember`

Each stage should update the relevant `.harness/` artifact before the next stage starts.

## Strengths

- clear accountability
- strong quality gates
- easy progress tracking

## Risks

- stage bottlenecks
- delayed feedback if problems are discovered late

## Example Use Case

A feature request that needs clear discovery, planning, implementation, review, and verification steps.

## Verification Strategy

Each stage confirms that its artifact is complete before handing off. `Verify` remains the final evidence gate.
