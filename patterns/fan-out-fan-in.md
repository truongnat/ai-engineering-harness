# Fan-Out Fan-In

## When To Use

Use this when independent subtasks can run in parallel and later be recombined into one verified result.

## When Not To Use

Do not use it when tasks share the same write surface, depend tightly on each other, or lack a stable integration contract.

## Agent Team Shape

One coordinator plus multiple parallel contributors with disjoint scopes.

## Information Flow

The coordinator defines task boundaries and expected outputs up front. Contributors work independently and return artifacts or changes for final integration.

## Strengths

- parallel throughput
- efficient for independent research or disjoint edits

## Risks

- overlapping scopes can create merge or consistency problems
- weak integration contracts can waste the parallelism benefit

## Example Use Case

One agent rewrites templates, another updates workflows, and a third updates docs, all under the same top-level plan.

## Verification Strategy

Verify each branch result locally, then verify the integrated outcome again after fan-in.
