# Quick Reference Guide

Bookmark this. You'll come back to it often.

---

## The 8-Command Loop

```
START → DISCUSS → PLAN → RUN → VERIFY → SHIP → REMEMBER
```

| Command | What to do | Read | Write |
|---|---|---|---|
| **start** | Restore session + map context | GOAL, STATE, MEMORY | SESSION state, context |
| **map** | Manual context refresh | Code, docs, commands | CONTEXT.md |
| **discuss** | Analyze and decide | GOAL, CONTEXT | DISCUSSION.md |
| **plan** | Write implementation plan | DISCUSSION | PLAN-001.md |
| **run** | Execute the plan | PLAN-001.md | TASKS.md |
| **verify** | Prove it works | Code, tests | VERIFY.md |
| **ship** | Commit and handoff | VERIFY.md | SHIP.md, PR |
| **remember** | Store lessons | SESSION artifacts | REMEMBER.md |

---

## Artifact Cheat Sheet

**Project Level (persistent):**
- `PROJECT.md` — Project name, team, owner
- `STATE.md` — Current codebase state (test pass/fail, deployment status)
- `MEMORY.md` — Durable lessons (gotchas, conventions, root causes)
- `REQUIREMENTS.md` — Acceptance criteria

**Session Level (one per active goal):**
- `GOAL.md` — What we're building/fixing (1-2 paragraphs max)
- `DISCUSSION.md` — Analysis of approach (what we considered, why we chose this)
- `PLAN-001.md` — Step-by-step implementation (each step should be <1 hour)
- `TASKS.md` — Progress log (what was done, blockers, next step)
- `VERIFY.md` — Proof it works (test output, screenshots, evidence)
- `SHIP.md` — Release notes and summary (optional)

---

## Common Workflows

### Building a Feature

```
harness-start
harness-discuss           ← Decide: build from scratch or extend existing?
harness-plan              ← Break into small tasks (<1 hour each)
harness-run               ← Code, test as you go
harness-verify            ← Regression testing, edge cases
harness-ship              ← Commit with PR notes
harness-remember          ← Update STATE.md with new design info
```

**Key skill:** `test-driven-development` (write test before code)

### Fixing a Bug

```
harness-start
harness-discuss           ← Reproduce bug, understand root cause
harness-plan              ← Write minimal fix (don't refactor)
harness-run               ← Apply fix, write regression test
harness-verify            ← Confirm bug is gone
harness-ship
harness-remember          ← Document root cause in MEMORY.md
```

**Key skill:** `root-cause-analysis` (understand why, not just what)

### Code Review

```
harness-start
harness-discuss           ← Analyze: does it solve the problem?
                           ← Is it secure? Maintainable? Tested?
harness-plan              ← List feedback items
harness-run               ← Write detailed review comments
harness-verify            ← Re-check the PR
harness-ship              ← Post review, discuss findings
```

**Key skill:** `code-review` (critical thinking, not nitpicking)

### Refactoring

```
harness-start
harness-discuss           ← Why refactor? What's the benefit?
harness-plan              ← Atomic changes (each commit works)
harness-run               ← Refactor piece by piece
harness-verify            ← All tests still pass? No behavior change?
harness-ship
harness-remember          ← Why was old code hard to maintain?
```

**Key skill:** `minimal-scope` (refactor only what's needed)

---

## When to Use Skills

| Goal | Skill |
|---|---|
| Write a plan | `writing-plans` |
| Verify with evidence | `verification` |
| Remember lessons | `remembering` |
| Work with git branches | `using-git-worktrees` |
| Test-first coding | `test-driven-development` |
| Understand a codebase | `mapping-codebase` |
| Review code critically | `code-review` |
| Find root causes | `root-cause-analysis` |

Skills are optional but powerful. Read one before a phase if stuck.

---

## Quality Gates (What Blocks Progress)

| Gate | Enforces | Symptom |
|---|---|---|
| **Planning** | Can't code without detailed plan | "Agent starts coding without a plan" |
| **Verification** | Can't ship without evidence | "Agent claims it works without testing" |
| **Review** | Can't merge without approval | "Agent ships untested code" |
| **Memory** | Can't close with secrets | "Credentials in REMEMBER.md" |

Gates make discipline non-negotiable.

---

## Minimum Viable Session

If you're in a hurry:

```bash
# 1. Define goal (1 min)
echo "# Goal: Add X feature" > .harness/sessions/$(date +%Y-%m-%d-x)/GOAL.md

# 2. Plan (2 min)
harness-plan

# 3. Code (5-60 min depending on scope)
harness-run

# 4. Test (2 min)
harness-verify

# 5. Ship (1 min)
harness-ship

# 6. Remember (1 min)
harness-remember
```

**Total: 12 minutes** for a small feature (including coding time).

---

## Troubleshooting

**"Agent skipped planning and started coding"**
→ That's the planning gate working. Make the agent read PLAN.md requirement in the command rule.

**"Verification evidence is weak"**
→ Use real test output, not claims. VERIFY.md should show actual test runs, not "I think it works."

**"I lost context between sessions"**
→ That's why harness-remember exists. Make sure to run it and update MEMORY.md.

**"Multiple goals are happening at once"**
→ Each gets its own session directory. `.harness/sessions/2024-01-15-feature/` and `.harness/sessions/2024-01-15-bugfix/` can run in parallel.

**"The plan is too vague"**
→ Each step should be <1 hour of work. If step 3 says "refactor auth" (multi-day), split it.

---

## Keyboard Shortcuts (Provider-Specific)

### Claude Code
```
/harness-start     → Restore session
/harness-plan      → Write plan
/harness-run       → Execute
/harness-verify    → Test
/harness-ship      → Commit
/harness-remember  → Save lessons
```

### Cursor, Codex, Gemini
Same commands exist but as markdown files. Paste them to the agent, it reads and follows them.

### All Providers
```
aih status         → Check harness health
aih doctor         → Diagnose problems
aih help           → View available commands
```

---

## Pro Tips

### 1. Small Scopes Win
A feature completed in one 30-minute loop > a feature that takes 3 days and gets restarted multiple times.

### 2. Session Names Matter
Bad: `2024-01-15-work`  
Good: `2024-01-15-auth-redirect-bugfix`

Names help you find sessions later and understand what each one did.

### 3. DISCUSSION.md Is Underrated
Spending 5 minutes writing DISCUSSION.md prevents 30 minutes of wrong code. Write it every time.

### 4. Evidence, Not Claims
Bad: `Done and verified` in VERIFY.md  
Good: `✓ Unit tests: 24/24 passed` + actual test output

### 5. Remember the Root Cause
Bad: `Fixed bug in auth.js`  
Good: `Fixed bug in auth.js because tokens weren't cached — added TTL check in memory module`

Future you (or team members) will thank you.

### 6. Reuse Artifacts Across Sessions
If you're fixing related bugs, copy DISCUSSION.md and PLAN.md from the first session as a template.

### 7. Use Templates, Not Freeform
GOAL.md, PLAN.md, VERIFY.md have structure for a reason. Don't skip sections.

---

## Next Steps

- **Just getting started?** Read [Your First 5 Minutes](docs/first-5-minutes.md)
- **Need deep dives?** Check [docs/README.md](docs/README.md) for full documentation index
- **Confused about a concept?** See [Concepts](docs/concepts.md)
- **Want to customize?** Read [Adoption Guide](docs/adoption-guide.md)

---

**Print this page. Tape it next to your monitor. Reference it every time you start a session.**
