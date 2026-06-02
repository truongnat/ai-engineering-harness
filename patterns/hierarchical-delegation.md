# Hierarchical Delegation

## When To Use

Use this when complex work must be decomposed into nested responsibility layers with explicit upward reporting.

## When Not To Use

Do not use it for small tasks or when the hierarchy would add more overhead than clarity.

## Agent Team Shape

A top-level coordinator delegates to area leads, who may delegate to narrowly scoped workers.

## Information Flow

Each layer receives a bounded task and must report status, findings, and outputs upward. The top layer owns the authoritative `.harness/` artifacts.

## Strengths

- scales to larger cross-cutting work
- creates clear responsibility boundaries

## Risks

- context loss between layers
- duplicated work if boundaries are not explicit

## Example Use Case

A large repository adoption where one lead owns docs, another owns templates, and another owns validation and CI.

## Verification Strategy

Each layer verifies its owned output before handoff, and the top layer verifies the integrated result again.
