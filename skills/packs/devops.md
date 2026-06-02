# DevOps Pack

## Purpose

Route deployment, CI/CD, infrastructure config, and observability work toward the most relevant core skills, commands, and checks.

## When To Use

- CI/CD changes
- deployment config
- Dockerfiles or infra configuration in host repos
- observability or environment-sensitive changes

## Recommended Core Skills

- `mapping-codebase`
- `writing-plans`
- `executing-plans`
- `verification`
- `code-review`

## Recommended Commands

- `harness-map`
- `harness-discuss`
- `harness-plan`
- `harness-run`
- `harness-verify`
- `harness-remember`

## Key Checks

- secrets safety
- rollback path
- environment differences
- health checks and logs
- deployment blast radius

## Verification Expectations

- dry-run or config validation when available
- build or pipeline verification
- smoke checks after change where relevant

## When Not To Use

- feature work limited to application logic or UI
- documentation-only changes

## Notes

Treat secrets handling as a first-class safety concern and keep them out of harness artifacts.
