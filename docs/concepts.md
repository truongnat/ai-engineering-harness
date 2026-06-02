# Concepts

This repository defines a markdown-first operating system for engineering agents. The core units are small and composable.

## Skill

A skill is a reusable capability contract. It tells an agent when to use a technique, when not to use it, how to execute it, what output to produce, and what must be true before the skill is considered complete.

## Workflow

A workflow is an end-to-end sequence for a class of work such as a feature, bugfix, refactor, review, or incident. Workflows combine commands, skills, artifacts, and verification expectations.

## Harness

Harness is the discipline layer. It stops agents from improvising blindly by enforcing artifact-first work, planning before implementation, scope control, verification before completion claims, and memory after shipping.

## Memory

Memory is the durable context an agent saves for later sessions. It should preserve decisions, constraints, root causes, and reuse guidance. It must never preserve secrets, credentials, customer data, or private business data.

## Artifact

An artifact is a markdown record of engineering state. In host repositories, artifacts live under `.harness/` so they can be read, reviewed, diffed, and updated alongside code.

## Command

A command is an operator-facing entry point into the harness loop. Commands define what to read, what to do, what to write, when to stop, and what not to assume.

## Agent Team Pattern

An agent team pattern is a coordination shape such as pipeline, producer-reviewer, or fan-out-fan-in. Patterns are decision guides, not runtime systems.

## Quality Gate

A quality gate is a condition that blocks premature progress. Examples include requiring a plan before `harness-run`, requiring evidence before `harness-ship`, and requiring a sensitive-data check before `harness-remember`.
