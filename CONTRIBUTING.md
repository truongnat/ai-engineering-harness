# Contributing

## Project Philosophy

`ai-engineering-harness` is a markdown-first operating model for engineering agents. The repository should stay lightweight, explicit, and easy to adopt without adding runtime complexity.

## Welcome Contributions

Useful contributions include:

- clarifying docs
- improving commands, skills, workflows, and examples
- tightening validation when required files or contracts change
- improving adoption guidance without adding a runtime layer

## Out Of Scope

Please do not add heavy runtime features without explicit roadmap approval, including:

- servers
- databases
- Docker-based platform layers
- orchestration frameworks
- large dependency trees

## Commands And Skills

When adding or editing command documents:

- preserve the required command headings
- keep the guidance operational and practical

When adding or editing skills:

- preserve the required skill headings
- keep skills compact and reusable
- avoid turning packs or skills into encyclopedias

## Validation

If required files change, update `validate.js` accordingly.

Before submitting changes, run:

```bash
node validate.js
```
