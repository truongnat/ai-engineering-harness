# Release Archive Model

## Purpose

Design a future-friendly release archive distribution model for `ai-engineering-harness` without adding package publishing or build automation.

## Why Release Archives

Release archives give users a versioned pack snapshot without requiring them to treat the source repository as their working project.

They fit the plugin-like capability-pack model while staying markdown-first and runtime-light.

## What A Release Archive Should Contain

A release archive should contain the capability-pack surface needed for adoption:

- `PACK.md` as the pack manifest (name, version, included surface, validation commands)
- `AGENTS.md`
- `commands/`
- `skills/`
- `workflows/`
- `patterns/`
- `templates/`
- selected adoption and validation docs
- `install.js`
- `validate.js`
- `LICENSE`
- `README.md`

## What A Release Archive Should Not Contain

A release archive should not contain:

- private or local artifacts
- generated state
- runtime, server, or database files
- maintenance-only repository files unless explicitly useful
- anything that implies server or runtime behavior

Archive generation is not implemented in this step.

## Suggested Archive Shape

```txt
ai-engineering-harness-vX.Y.Z/
├── PACK.md
├── AGENTS.md
├── commands/
├── skills/
├── workflows/
├── patterns/
├── templates/
├── docs/
│   ├── adoption-guide.md
│   ├── harness-build-usage.md
│   ├── install-to-profile-walkthrough.md
│   ├── target-repo-validation.md
│   ├── validation-troubleshooting.md
│   └── small-repo-memory.md
├── install.js
├── validate.js
├── LICENSE
└── README.md
```

## Manual Packaging Flow

Maintainers preparing a release archive should follow [manual-packaging-guide.md](manual-packaging-guide.md).

That guide covers `PACK.md` version updates, pack verification, validation commands, and optional manual archive assembly without archive generation automation.

## How Users Would Consume It

Users would:

1. download the versioned archive
2. extract it locally
3. treat the extracted folder as a pack snapshot
4. run `install.js` or copy the installed surface into the target repository
5. create `.harness/` profile and goal artifacts in the target repository
6. run target validation there

## Relationship To install.js

`install.js` remains the current mechanism for copying the installed surface into a target repository.

A future release archive should contain `install.js` so users can consume the same pack snapshot without cloning the canonical source repository.

## Versioning Expectations

- archive names should match released versions such as `vX.Y.Z`
- archive contents should reflect the installed-surface contract for that version
- users should be able to reason about pack behavior from the release version alone

## Safety Boundaries

- keep markdown as the source of truth
- do not imply runtime adapters or server behavior
- keep the archive focused on the capability-pack surface
- exclude private, local, and generated artifacts

## Future Automation Boundary

This step only defines the model.

It does not add:

- archive generation
- package publishing automation
- marketplace automation
- build automation
