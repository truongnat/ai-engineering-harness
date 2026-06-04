# Concepts

This repository defines a markdown-first operating system for engineering agents. It enforces an operating contract instead of relying on agent improvisation.

## Mental Model

Think of the harness as a **discipline layer** that sits between your AI agent and your code:

```
┌─────────────────────────────────────────────────────────────┐
│ Your AI Agent (Claude, Cursor, Codex, Gemini)              │
├─────────────────────────────────────────────────────────────┤
│ HARNESS DISCIPLINE LAYER                                    │
│ - Phase Gates (blocks skipping steps)                       │
│ - Session Memory (preserves context)                        │
│ - Evidence Requirements (proves completion)                 │
│ - Artifact-First (reads/writes markdown)                    │
├─────────────────────────────────────────────────────────────┤
│ Your Code Repository                                        │
└─────────────────────────────────────────────────────────────┘
```

Without the harness: Agent reads requirements → codes immediately → optimistically tests → ships.

With the harness: Agent reads requirements → maps context → discusses approach → plans in detail → codes step-by-step → verifies with evidence → ships with summary → remembers lessons.

The harness makes the second path the default and the first path impossible.

---

## Core Concepts

### Command

A **command** is an operator-facing entry point into the harness loop. Each command defines:
- What to read before starting
- What to do
- What artifacts to write
- When to stop (blocking conditions)
- What not to assume

**Example:** `harness-plan` reads the GOAL and STATE, asks the agent to create a detailed plan, writes PLAN-001.md, and stops if the plan is vague.

**The 8 canonical commands:**
1. `harness-map` — Understand current state
2. `harness-start` — Restore session context
3. `harness-discuss` — Analyze and decide approach
4. `harness-plan` — Write detailed implementation plan
5. `harness-run` — Execute the plan step-by-step
6. `harness-verify` — Verify with evidence
7. `harness-ship` — Commit and handoff
8. `harness-remember` — Store durable lessons

### Artifact

An **artifact** is a markdown record of engineering state. Artifacts live in `.harness/` so they can be:
- Read by humans and agents
- Reviewed in pull requests
- Diffed to track decisions
- Updated collaboratively

**Example artifacts:**
- `GOAL.md` — What we're building/fixing
- `PLAN-001.md` — Detailed implementation steps
- `VERIFY.md` — Evidence of completion (test output, screenshots, etc.)
- `REMEMBER.md` — Lessons for future sessions

**Why markdown?** It's universal, version-controllable, reviewable, and readable in any editor. No proprietary formats, no lock-in.

### Harness

The **harness** is the discipline system that enforces artifact-first, phase-gated work:

- **Artifact-first** — Agent reads existing artifacts before creating new ones
- **Phase-gated** — Agent cannot skip from goal directly to code; must plan first
- **Evidence-based** — Agent proves completion with real test output, not claims
- **Memory-driven** — Agent preserves decisions for future sessions

The harness is not a tool; it's a **operating contract** between you and your agent. It says: "Follow this discipline, and I'll help you stay unblocked and deliver quality work."

### Skill

A **skill** is a reusable capability contract. It teaches agents when and how to execute a technique.

**Structure:**
- **When To Use** — Situations where this skill applies
- **When Not To Use** — Anti-patterns to avoid
- **Workflow** — Step-by-step execution
- **Evidence** — What proves the skill was executed correctly
- **Blocking Conditions** — When to stop and escalate

**Examples:**
- `code-review` — How to review code changes critically
- `test-driven-development` — How to write tests before code
- `verification` — How to verify with real evidence
- `using-git-worktrees` — How to isolate branches safely

Skills are **optional** (you can work without them) but **powerful** (they dramatically improve quality).

### Workflow

A **workflow** is an end-to-end sequence for a class of work: feature, bugfix, refactor, incident, code review.

**Workflows combine:**
- Commands (the sequence to follow)
- Skills (the techniques to apply)
- Verification expectations (what must be true)
- Failure handling (what to do if stuck)

**Example workflow for "Feature":**
```
Map → Start → Discuss → Plan → Run → Verify → Ship
      └──────────────────────────────────┘
         Skills: brainstorming, planning,
         TDD, code-review, verification
```

**Example workflow for "Bugfix":**
```
Map → Start → Discuss → Plan → Run → Verify → Ship
      └──────────────────────────────────┘
         Skills: root-cause analysis,
         minimal-fix, regression-testing
```

### Memory

**Memory** is durable context an agent saves for later sessions. It persists decisions, constraints, lessons, and project facts.

**What memory stores:**
- Technical decisions and their rationale
- Architectural constraints
- Root causes of past bugs
- Known gotchas and workarounds
- Team conventions
- Tool setup instructions

**What memory must NOT store:**
- Secrets, tokens, API keys
- Customer data or private business data
- Personally identifiable information
- Credentials of any kind

**Memory locations:**
- `REMEMBER.md` — Lessons from the current session
- `MEMORY.md` — Project-level durable knowledge
- `STATE.md` — Current codebase state (test status, deployment info, etc.)

Memory survives the agent's shutdown and context reset. The next session starts with full context, not amnesia.

### Quality Gate

A **quality gate** is a condition that blocks premature progress. Gates enforce discipline at critical junctures:

| Gate | Enforces | Blocks |
|---|---|---|
| Planning gate | Can't code without a plan | Skipping discussion/planning |
| Verification gate | Can't ship without evidence | Optimistic claims |
| Review gate | Can't merge without approval | Shipping untested code |
| Memory gate | Can't close session with secrets | Leaking credentials to durable storage |

Gates make it **impossible** to skip discipline, not just impolite.

### Agent Team Pattern

An **agent team pattern** is a coordination shape for how agents (or agents + humans) work together:

**Examples:**
- **Hierarchical Delegation** — Manager agent breaks work into tasks, assigns to specialist agents
- **Producer-Reviewer** — One agent produces, another reviews independently
- **Supervisor** — One agent oversees others and decides next steps
- **Fan-Out-Fan-In** — One agent parallelizes work, collects results

Patterns are **decision guides**, not runtime systems. They tell agents how to coordinate without requiring special infrastructure.

---

## How They Connect

### The Operating Loop

```
                    ┌─────────────────────┐
                    │  harness-start      │ Restore session
                    └──────────┬──────────┘
                               │
                    ┌─────────────────────┐
                    │  harness-map        │ Understand state
                    └──────────┬──────────┘
                               │
         ┌─────────────────────────────────────────┐
         │  harness-discuss + Skills               │ Analyze & decide
         │  (brainstorming, root-cause, etc.)     │
         └─────────────────┬───────────────────────┘
                           │
         ┌─────────────────────────────────────────┐
         │  harness-plan + Skills                  │ Write detailed plan
         │  (planning, estimation, etc.)           │
         └─────────────────┬───────────────────────┘
                           │ [Quality Gate: plan must be detailed]
                           │
         ┌─────────────────────────────────────────┐
         │  harness-run + Skills                   │ Execute step-by-step
         │  (TDD, git-worktrees, etc.)             │
         └─────────────────┬───────────────────────┘
                           │
         ┌─────────────────────────────────────────┐
         │  harness-verify + Skills                │ Prove completion
         │  (testing, regression-checks, etc.)     │
         └─────────────────┬───────────────────────┘
                           │ [Quality Gate: evidence required]
                           │
         ┌─────────────────────────────────────────┐
         │  harness-ship + Skills                  │ Commit & handoff
         │  (report-writing, PR-messaging, etc.)   │
         └─────────────────┬───────────────────────┘
                           │
         ┌─────────────────────────────────────────┐
         │  harness-remember                       │ Store lessons
         │  (write REMEMBER.md, update MEMORY.md)  │
         └─────────────────────────────────────────┘
                           │
              ┌────────────┴──────────────┐
              │ Next Session Starts Here  │
              │ (with full context)       │
              └──────────────────────────┘
```

### Artifacts Flow Through the Loop

```
Session Start:
  └─ Read: GOAL.md, STATE.md, MEMORY.md

Discuss:
  └─ Write: DISCUSSION.md

Plan:
  └─ Write: PLAN-001.md

Run:
  └─ Write: TASKS.md (progress log)

Verify:
  └─ Write: VERIFY.md (evidence)

Ship:
  └─ Write: SHIP.md (summary)
  └─ Commit with PR message

Remember:
  └─ Write: REMEMBER.md (lessons)
  └─ Update: STATE.md (new facts)
```

---

## Why This Works

### 1. Phase Discipline Forces Thinking

Without planning gates, agents skip to code immediately. With gates, they must think through the problem first.

**Result:** Fewer wrong implementations, better understanding.

### 2. Session Memory Preserves Context

Without memory, each session starts from scratch. With memory, context accumulates.

**Result:** Faster iterations, fewer repeated mistakes.

### 3. Artifacts Enable Review & Collaboration

Code changes are hard to review mid-execution. Artifacts (PLAN.md, VERIFY.md) are reviewable before execution.

**Result:** Humans can steer the agent before expensive work is done.

### 4. Quality Gates Make Discipline Non-Negotiable

"Best practice" guidelines are ignored. Gates make it impossible to proceed without evidence.

**Result:** Verification is not optional.

---

## Next Steps

To understand how these concepts map to practice:

- **Read [Harness Commands](harness-command-behavior.md)** — How each command works
- **Read [Workflows](../workflows/README.md)** — Real workflows for features, bugfixes, etc.
- **Read [Skills](../skills/README.md)** — Real skills and when to use them
- **Read [Patterns](../patterns/README.md)** — Coordination patterns for teams
- **Try [First 5 Minutes](first-5-minutes.md)** — Experience the full loop hands-on
