# Capability Pack Manifest

## Pack Name

ai-engineering-harness

## Pack Version

v0.9.2

## Pack Type

plugin-like markdown capability pack

## Purpose

Help AI coding agents consume engineering discipline inside target repositories through commands, skills, workflows, patterns, templates, harness profiles, and structural validation—without treating the source pack repository as the product work tree.

## Included Surface

- `AGENTS.md`
- `commands/`
- `skills/`
- `workflows/`
- `patterns/`
- `templates/`
- selected adoption and validation docs under `docs/` (see installed-surface contract)
- `install.js`
- `validate.js`
- `LICENSE`
- `README.md`
- `PACK.md`

Project runtime-native installs use:

```txt
aih.sh            lifecycle dispatcher
provider file     runtime entrypoint
.ai-harness/      capability cache
.harness/         project state
```

Legacy `install.js` / manual root copy remains available only as fallback, not as the primary consumption model.

## Consumption Modes

- `aih.sh` project runtime-native install (recommended)
- `aih.sh` global runtime-native install where supported
- legacy `install.js` or manual root copy (fallback only)
- vendored harness directory inside target repository
- global agent capability folder (runtime-dependent)
- release archive (manual versioned snapshot)
- future plugin or package registry (not implemented)

## Runtime Compatibility

Documented consumption guidance for:

- Claude Code
- Cursor
- Codex
- Gemini CLI
- OpenCode

Current project install model is:

- provider-specific entrypoint
- `.ai-harness/` as shared capability source
- `.harness/` as project-specific state

No compiled runtime adapters are included in this pack.

## Validation Commands

Source pack verification:

```bash
node validate.js
npm test
node validate.js --target test/fixtures/valid-target-profile --profile-only
node validate.js --target test/fixtures/valid-target-goal --goal google-login
```

After install into a target repository:

```bash
node validate.js --target <path> --profile-only
node validate.js --target <path> --goal <goal-id>
```

## Safety Boundaries

- markdown is the source of truth
- do not store secrets, tokens, or private business data in harness artifacts
- validation is structural only and does not prove application correctness
- do not add runtime adapters or server behavior under the name of packaging
- keep product work and `.harness/` state in the target repository

## Non-Goals

- npm package publishing
- marketplace automation
- runtime adapters or compiled plugins
- server, database, or background systems
- semantic validation or deep repository scanning
- archive generation automation in v0.7.0 planning scope
