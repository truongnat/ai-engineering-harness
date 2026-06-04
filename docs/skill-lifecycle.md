# Skill Lifecycle

## Purpose

Define how harness skills are created, used, composed, archived, and optionally promoted.

## Lifecycle

```txt
draft → active → used → archived/disposed → promoted
```

## Locations

| Kind | Path |
|------|------|
| Core skill | `skills/<id>/` |
| Session skill | `.harness/sessions/<session>/skills/<id>/` |
| Promoted skill | `.harness/memory/skills/<id>/` |

## Required skill structure

```txt
SKILL.md
prompt.md
references/
```

Templates:

- `templates/SKILL.md`
- `templates/SESSION_SKILL.md`
- `templates/SKILL_DISPOSAL.md`
- `templates/SKILL_RUN.md`

## Create

Use `workflows/create-skill.md`.

Create a skill when the procedure repeats, domain rules need packaging, or the same logic will be reused.

Do not create a skill for one-off edits or when an existing core skill already fits.

## Use

Record runs with:

```bash
node hooks/core/record-skill-run.js --session <path> --skill <id> --status completed --summary "..."
```

## Compose

Use `workflows/compose-skills.md` to chain skills with stop conditions.

Example workflow: `workflows/review-and-verify.md`

## Dispose

Dispose means **archive/deactivate**, not delete.

```bash
node hooks/core/archive-session-skill.js --session <path> --skill <id> --reason "Session complete"
```

Writes or updates:

```txt
.harness/sessions/<session>/skills/<id>/DISPOSAL.md
```

## Promote

Promote only when a session skill is reusable beyond the current session and the reason is explicit.

Target:

```txt
.harness/memory/skills/<id>/
```

## Related

- [hooks-and-skills-layer.md](hooks-and-skills-layer.md)
