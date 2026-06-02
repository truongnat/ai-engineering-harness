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

- a concrete feature request for a Flutter app
- how a goal becomes a scoped plan
- how verification is recorded before claiming success
- how a durable lesson is captured without storing secrets

## Safety Rule

The example artifacts are intentionally generic. They do not contain secrets, tokens, customer data, or private business data.

## Scenario

The compact flow models this task:

`Add Google login to a Flutter app while preserving guest mode.`

The `.harness/` artifacts show how to keep guest access explicit, avoid scope drift into backend redesign, and verify both sign-in paths before shipping.
