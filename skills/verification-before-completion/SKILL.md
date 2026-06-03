# verification-before-completion

## Purpose

Prevent optimistic completion claims by forcing the final status to match the actual evidence.

## When To Use

- before declaring work complete
- when manual checks, partial evidence, or deferred verification could be glossed over
- when shipping pressure makes false confidence more likely

## When Not To Use

- when no relevant work exists yet
- when only brainstorming or planning is happening
- when the verification artifact already contains complete, fresh evidence and no ambiguity remains

## Inputs

- goal and plan artifacts
- verification results
- any review findings or known gaps

## Workflow

1. Re-state the claim being made about the work.
2. Match each part of the claim to evidence or a documented gap.
3. Downgrade the status if any part is unproven, blocked, or waiting on human confirmation.
4. Make ship blockers explicit rather than implied.
5. Leave a final status that no reader could mistake for stronger proof than actually exists.

## Operating Principles

- Claims must not outrun evidence.
- Pending human checks are not passes.
- Missing evidence is a first-class result.
- Short honest verification is better than long optimistic verification.

## Output Contract

This skill must produce:

- a final claim-to-evidence check
- an honest status
- explicit blockers or gaps

## Common Failure Modes

- calling a change done because tests passed but scope was broader
- burying deferred human checks in prose
- letting summary language overclaim past the evidence

## Checklist Before Done

- [ ] The claimed outcome was restated
- [ ] Evidence was matched against the claim
- [ ] Status was downgraded if proof was incomplete
- [ ] Human checks are explicit when required
- [ ] The final wording does not overclaim
