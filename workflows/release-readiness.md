# Release Readiness Workflow

## Purpose

Decide whether verified work is ready to ship or must remain blocked.

## Skills Used

1. verification
2. gatekeeper

## Steps

### Step 1 — Confirm Verification

Use skill: `verification`

Require:

- active session `VERIFY.md`
- explicit status
- evidence or tool-run artifacts

Hook:

- `guard-phase.js --command harness-ship`

### Step 2 — Gate Decision

Use skill: `gatekeeper`

Output:

- allow ship, block ship, or defer

## Stop Conditions

Stop if VERIFY evidence is missing, stale, or contradictory.

## Dispose Rules

Archive session-only skills after handoff. Do not delete disposed skills.

## Related

- [review-and-verify.md](review-and-verify.md)
