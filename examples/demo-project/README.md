# Demo Project

This directory shows how a host repository could adopt the harness using a `.harness/` directory instead of a runtime service.

## Example Layout

```text
demo-project/
  .harness/
    PROJECT.md
    GOAL.md
    PLAN.md
    VERIFY.md
    REMEMBER.md
```

## What This Example Demonstrates

- where active artifacts live
- how a goal becomes a plan
- how verification is recorded
- how durable memory is captured safely

## Safety Rule

The example artifacts are intentionally generic. They do not contain secrets, tokens, customer data, or private business data.
