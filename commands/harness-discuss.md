# harness-discuss

## Purpose

Synthesize existing harness artifacts and produce a **decision-oriented discussion** — clarify goals before planning, or interpret review/plan/status when those artifacts already exist.

**Discuss means synthesize and decide, not ask the user what mode they want.**

## When To Use

- before planning non-trivial work (goal/scope still forming)
- when `.harness/REVIEW.md` exists and the team needs a merge/ship decision discussion
- when `.harness/PLAN.md` or `.harness/STATUS.md` exists and direction needs reconciliation
- when scope is ambiguous **and** no actionable artifact exists yet

## Required Reads (in order)

1. `.harness/STATE.md` if present (branch, base, active goal)
2. `.harness/GOAL.md`
3. `.harness/REQUIREMENTS.md` if present
4. `.harness/CONTEXT.md` if present
5. `.harness/REMEMBER.md` if present
6. **If present, read immediately (do not skip):**
   - `.harness/REVIEW.md`
   - `.harness/PLAN.md`
   - `.harness/DISCUSSION.md`
   - `.harness/STATUS.md`

## Action-first policy (mandatory)

**Do not ask for clarification when sufficient local context exists.**

Sufficient context includes any of:

- `.harness/REVIEW.md` with verdict, risks, or findings
- `.harness/PLAN.md` with scope and tasks
- `.harness/DISCUSSION.md` with an agreed direction
- `.harness/GOAL.md` plus `.harness/STATE.md` with a clear active goal

When sufficient context exists:

1. **Produce the discussion output immediately** (see templates below).
2. **Do not** ask whether to summarize, re-run review, or what output format the user wants.
3. **Do not** ask multiple choice questions up front.
4. **At most one** closing question (see Closing question).

Ask clarifying questions **only** when:

- no goal and no review/plan/discussion artifact exists, or
- artifacts contradict each other materially and you cannot state a safe assumption.

## Branch and freshness

If `.harness/STATE.md` or git context gives `branch` and `base`:

- State them in the opening line.
- **Freshness:** run a non-destructive check if possible (`git log`, `git diff --stat` against base). If you cannot verify, say explicitly: *freshness was not verified* — do not claim the review is current.

## Mode A — `.harness/REVIEW.md` exists (review decision discuss)

Do **not** duplicate the full review. Synthesize for decisions:

1. Short restatement of what was found (branch, base, review path, date if in file).
2. **Current verdict** and risk level from the review.
3. **Main decision** — merge/ship/hold in one sentence.
4. **SHOULD FIX / blockers** — numbered summary (top items only if many).
5. **P0 / verification status** — call out unchecked or failed gates.
6. **Freshness** — verified or not verified (see above).
7. **Recommendation** — one of: use existing review as baseline; run incremental diff; fix blockers first; return to plan.
8. Update or append `.harness/DISCUSSION.md` with this synthesis.
9. **Closing question (max one):** e.g. *Would you like me to run an incremental diff against `<base>` now?*

**Forbidden when REVIEW.md exists:**

- "What output do you need?"
- "Should I summarize REVIEW.md or run a fresh review?"
- "Is REVIEW.md sufficient?" when the file is readable and non-empty

### Example shape (review decision)

```md
## Harness Discuss — Review Decision

I found an existing review for `<branch>` against `<base>` at `.harness/REVIEW.md`.

**Current verdict:** …  
**Risk:** …

### Main decision

…

### SHOULD FIX items

1. …

### P0 / staging verification

…

### Freshness

…

### Recommendation

…

Would you like me to run an incremental diff against `<base>` now?
```

## Step-By-Step Workflow

1. Read required `.harness/` artifacts (including REVIEW/PLAN/STATUS if present).
2. If `.harness/REVIEW.md` exists → follow **Mode A** below (review decision discuss).
3. Else → follow **Mode B** (pre-plan goal/scope discuss).
4. Write or update `.harness/DISCUSSION.md`.
5. End with at most one closing question.

## Mode B — No REVIEW.md; goal/scope discussion (pre-plan)

Use when planning is next and requirements are not yet locked:

1. Restate the request in precise engineering language.
2. Separate confirmed requirements from unknowns and assumptions.
3. Identify scope boundaries, success criteria, and constraints.
4. Compare realistic options; recommend the leanest viable approach.
5. Record in `.harness/DISCUSSION.md`.
6. Stop before planning only if goal or scope is **still materially unclear** after reading artifacts.

## Skills To Use

- `using-harness`
- `discussing-goals`
- `remembering` when prior decisions constrain the solution

## Output Artifacts

- `.harness/DISCUSSION.md` (required on every successful run)
- updated `.harness/GOAL.md` or `.harness/REQUIREMENTS.md` when pre-plan mode changes scope

## Completion Gate

- **Review mode:** decision-oriented synthesis delivered; DISCUSSION.md updated; at most one closing question.
- **Pre-plan mode:** goal, boundaries, assumptions, and preferred approach are explicit enough to write a plan without inventing requirements.

## Artifact Paths

- Read: `.harness/GOAL.md`, `.harness/REQUIREMENTS.md`, `.harness/STATE.md`, `.harness/CONTEXT.md`, `.harness/REMEMBER.md`, `.harness/REVIEW.md`, `.harness/PLAN.md`, `.harness/DISCUSSION.md`, `.harness/STATUS.md`
- Write: `.harness/DISCUSSION.md`, `.harness/GOAL.md`, `.harness/REQUIREMENTS.md`

## Stop Conditions

- synthesis or clarified direction is recorded in `.harness/DISCUSSION.md`
- user received actionable discussion, not a menu of modes

## Failure Modes

- asking what the user wants when `.harness/REVIEW.md` (or plan/status) already answers the situation
- duplicating entire REVIEW.md instead of synthesizing
- claiming branch freshness without evidence
- planning or implementing inside discuss

## Human Approval

Ask for approval when choosing between materially different approaches or waiving SHOULD FIX blockers — not when merely summarizing an existing review.

## Notes

`harness-discuss` reduces ambiguity **by acting on existing artifacts first**. It is not a passive intake form. See [docs/harness-command-behavior.md](../docs/harness-command-behavior.md).
