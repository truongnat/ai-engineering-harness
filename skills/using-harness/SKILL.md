# using-harness

## Purpose

Apply the harness operating contract to the current session.

## When To Use

- at the beginning of a task
- when resuming work
- when process drift or scope drift is likely

## When Not To Use

- when no engineering action will follow
- when a stricter repository contract overrides this harness

## Workflow

1. Read the active `.harness/` artifacts before acting.
2. Confirm the current goal, scope, and next command.
3. Check whether a plan exists for any non-trivial change.
4. Keep work aligned to the active plan and update state as needed.
5. Block completion claims until verification exists.
6. Capture only durable, safe memory after shipping.

## Operating Principles

- Artifacts outrank assumptions.
- Do not invent project facts.
- Plans precede implementation.
- Small surgical changes beat broad rewrites.
- Evidence outranks confidence.
- Durable decisions should be remembered safely.

## Output Format

- current state summary
- chosen next command
- missing artifact or risk list

## Checklist Before Done

- [ ] Relevant artifacts were read first
- [ ] The current goal and scope are explicit
- [ ] The next command is clear
- [ ] A plan exists before implementation
- [ ] Verification expectations are known
- [ ] No sensitive data is being written to memory
