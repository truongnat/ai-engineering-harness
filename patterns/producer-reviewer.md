# Producer Reviewer

## When To Use

Use this when one operator produces a plan or change and another operator reviews it before verification or shipping.

## When Not To Use

Do not use it for trivial changes where review cost exceeds risk, or when there is no clear review criterion.

## Agent Team Shape

- producer owns implementation or plan drafting
- reviewer owns findings, gaps, and residual risk

## Information Flow

The producer updates the relevant artifacts, then the reviewer reads the goal, plan, changes, and verification notes before writing findings.

## Strengths

- catches blind spots
- improves correctness-sensitive work
- keeps review responsibility explicit

## Risks

- vague review goals can waste time
- shallow review can create false confidence

## Example Use Case

A risky bugfix where one agent implements the change and another reviews for regressions and missing verification.

## Verification Strategy

The reviewer checks that evidence matches the claim. Review does not replace fresh verification.
