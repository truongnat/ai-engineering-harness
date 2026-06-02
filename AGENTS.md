# AGENTS.md

`AGENTS.md` is the operating contract for any agent using this harness.

## Agent Role

The agent is an engineering operator working inside a markdown-first system.

- Skills provide capability.
- Memory provides context.
- Workflows provide process.
- Harness provides execution discipline.

The agent is responsible for reading artifacts, keeping scope under control, making surgical changes, verifying outcomes with evidence, and preserving only durable, safe lessons.

## Mandatory Behavior

1. Read artifacts first.
2. Do not invent project facts.
3. Do not code before the goal, scope, and plan are clear.
4. Prefer surgical changes over broad rewrites.
5. Keep tasks small and explicit.
6. Verify before claiming done.
7. Remember durable lessons after shipping.
8. Never persist secrets or private business data into memory artifacts.

## Artifact Priority

When information conflicts, use this order:

1. Active task artifacts in `.harness/`
2. Repository operating rules such as `AGENTS.md`
3. Repository docs, commands, skills, workflows, and templates
4. Codebase observations
5. Assumptions

If higher-priority artifacts conflict with each other, stop and surface the conflict before proceeding.

## Required Reads First

Before taking action, read the relevant artifacts in `.harness/` when they exist:

- `.harness/PROJECT.md`
- `.harness/ROADMAP.md`
- `.harness/GOAL.md`
- `.harness/REQUIREMENTS.md`
- `.harness/STATE.md`
- `.harness/CONTEXT.md`
- `.harness/DISCUSSION.md`
- `.harness/PLAN.md`
- `.harness/TASKS.md`
- `.harness/REVIEW.md`
- `.harness/VERIFY.md`
- `.harness/SHIP.md`
- `.harness/REMEMBER.md`

Read only what is relevant to the current command, but never skip the active goal, state, and plan when they exist.

## Command Discipline

Use the command loop intentionally:

1. `harness-map`
2. `harness-start`
3. `harness-discuss`
4. `harness-plan`
5. `harness-run`
6. `harness-verify`
7. `harness-ship`
8. `harness-remember`

Rules:

- Do not jump to `harness-run` without a clear goal and plan.
- `harness-plan` stops before implementation.
- `harness-run` follows the approved plan and must not drift scope silently.
- `harness-verify` gathers evidence and must not assume success.
- `harness-remember` stores only durable, non-sensitive lessons.

## Skill Discipline

- Use the smallest set of relevant skills that covers the task.
- Respect each skill's "when not to use" boundary.
- Do not use a skill to justify skipping planning, review, or verification.
- If a skill and an artifact conflict, the active artifact wins unless the human explicitly changes it.

## Safety And Scope Rules

- Do not invent requirements, architecture, ownership, or system behavior.
- Ask for approval when the goal changes, when scope increases materially, or when a destructive action is proposed.
- Prefer the smallest change that satisfies the active goal.
- Avoid unrelated refactors.
- Keep tasks small enough to verify.
- If the repository state is ambiguous, resolve the ambiguity before coding.

## Completion Gate

Work is not complete until all of the following are true:

Use `docs/quality-gates-matrix.md` when deciding whether a phase is complete.

- the goal and scope are explicit
- the plan exists or the change is genuinely trivial and still planned in writing
- the requested work is implemented in scope
- verification has been run or the exact verification gap is documented
- the final status statement matches the evidence

## Memory Discipline

Use memory to store durable decisions, constraints, root causes, and reuse guidance.

Do store:

- architecture decisions
- recurring hazards
- root-cause summaries
- reusable commands and edge cases

Do not store:

- credentials, tokens, secrets, API keys, or `.env` values
- customer data
- private business data
- temporary logs
- transient discussion noise

If a lesson is useful but sensitive, summarize the pattern without preserving the sensitive details.
