# Your First 5 Minutes with ai-engineering-harness

This tutorial walks you through your first complete harness loop in ~5 minutes. You'll go from zero to shipping a small disciplined piece of work.

## Prerequisites

- A target repository (any project you own)
- Node.js 18+
- An AI coding agent available (Claude Code, Cursor, Codex, or Gemini CLI)

## Step 1: Install (1 min)

Run the interactive installer:

```bash
cd /path/to/your/project
npx ai-engineering-harness install
```

You'll be prompted to:
1. Select your AI agent provider (Claude, Cursor, Codex, Gemini)
2. Choose install scope (project-local recommended for first time)
3. Confirm the installation plan

**Result:** Your project now has a `.harness/` directory with the project profile and an empty `sessions/` subdirectory ready for work.

## Step 2: Define a Goal (1 min)

Create your first session. Pick a small, achievable goal (not a 2-week project):

**Examples:**
- Add a health check endpoint to a server
- Fix a single bug in a known location
- Add a missing error message
- Write a simple utility function

Open `.harness/sessions/` and create a directory for your session:

```bash
mkdir .harness/sessions/2024-01-15-health-check
```

Now create `.harness/sessions/2024-01-15-health-check/GOAL.md`:

```markdown
# Goal: Add a /health check endpoint

## What
Add a simple GET /health endpoint that returns 200 + JSON status.

## Why
External monitoring tools need a quick health signal without making real API calls.

## How
- Add endpoint to server.js
- Return { status: "ok", timestamp: Date.now() }
- Add basic test
```

**Result:** Your agent now knows exactly what you're building.

## Step 3: Plan (1 min)

Ask your agent to create a detailed plan. In your AI agent, type:

```
/harness-plan
```

Or if your agent doesn't support the slash command, reference the `.harness/` directory and ask it to:
1. Read `.harness/STATE.md` (current state)
2. Read your new GOAL.md
3. Create a detailed plan in `.harness/sessions/2024-01-15-health-check/PLAN-001.md`

The plan should include:
- Exact files to change
- Step-by-step implementation
- Test approach
- Verification steps

**Result:** You have a concrete plan, not a vague intention.

## Step 4: Run (1.5 min)

Ask your agent to execute the plan:

```
/harness-run
```

The agent will:
1. Follow the PLAN-001.md step-by-step
2. Write code
3. Update `.harness/sessions/2024-01-15-health-check/TASKS.md` with progress
4. Test as it goes

**Result:** Your feature is implemented.

## Step 5: Verify (1 min)

Ask your agent to verify the work:

```
/harness-verify
```

The agent will:
1. Run your tests
2. Check that the goal is met
3. Look for edge cases
4. Document all evidence in `VERIFY.md`

**Result:** You have proof that the work is complete and correct.

## Step 6: Ship (30 sec)

Ask your agent to ship:

```
/harness-ship
```

The agent will:
1. Commit the changes with a structured message
2. Create a PR if configured
3. Generate a summary in `SHIP.md`

**Result:** Your feature is ready for review or merged.

## Step 7: Remember (30 sec)

Ask your agent to update project memory:

```
/harness-remember
```

The agent will:
1. Move any useful lessons to `.harness/REMEMBER.md`
2. Update `.harness/STATE.md` with new facts
3. Record decisions for future sessions

**Result:** Your next session starts with context, not amnesia.

---

## What Just Happened?

You just completed a **disciplined engineering loop**:

| Phase | What your agent did | Artifact |
|---|---|---|
| Plan | Read current state, understood the goal, created a detailed plan | PLAN-001.md |
| Run | Followed the plan step-by-step, tracked progress | TASKS.md |
| Verify | Checked the work against the goal with evidence | VERIFY.md |
| Ship | Committed with a real PR message | SHIP.md |
| Remember | Captured lessons for next time | REMEMBER.md + STATE.md |

Your agent **didn't** code first, skip tests, lose context, or forget what it did. It followed an engineering process.

---

## Next: Build on This

Now that you've done one loop, try:

1. **Run it again** with a different goal — notice how fast it is when the harness is familiar
2. **Try `/harness-doctor`** to get a health check of your harness setup
3. **Read the [Adoption Guide](adoption-guide.md)** for deeper customization
4. **Explore [Patterns](../patterns/README.md)** for team collaboration approaches
5. **Check [Skills](../skills/README.md)** to enhance specific phases (code review, TDD, etc.)

---

## Troubleshooting

**"My agent doesn't recognize /harness-* commands"**
→ Your provider doesn't support slash commands. Read the markdown files in `.harness/` to your agent instead and ask it to follow them.

**"The plan looks vague"**
→ Your GOAL.md might be too broad. Try a smaller goal (one endpoint, not three; one bug, not a subsystem).

**"I don't have a test framework set up"**
→ Add minimal tests in VERIFY.md anyway (e.g., "curl http://localhost:3000/health").

**"How do I customize this for my team?"**
→ See [Adoption Guide](adoption-guide.md) section "Customizing for Your Team".

---

## The Big Picture

The harness enforces a simple rule: **plan before code, verify before ship, remember for next time**.

Every loop you run makes the next one faster. After 5-10 sessions, your agent will be operating like a disciplined engineer, not an impatient code generator.

**That's the point.**
