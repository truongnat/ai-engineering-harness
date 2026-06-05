# 90-Second Demo Video Plan

**Objective:** Show before/after comparison of AI agent behavior: undisciplined vs harnessed.

**Target Length:** 90 seconds  
**Format:** Screen recording with narration + text overlays  
**Goal:** Convert developers from "interesting" to "I'm using this now"

---

## Story Arc

### Act 1: The Problem (20 sec)
**"Without discipline, agents skip the important stuff."**

Show an agent starting a feature request:
- Agent reads goal briefly
- Starts coding immediately
- Creates PR with no verification
- PR notes: "Done"
- Tests: Not run
- Commit message: vague
- Review feedback: "What was this supposed to do?"

**Narration:** "Without process, AI agents move fast but miss critical steps. They skip planning, skip verification, create PRs with no context."

### Act 2: The Cost (15 sec)
**Show the waste:**
- PR gets rejected: "Need more context"
- Rework required
- Developer has to explain decisions
- Time wasted

**Narration:** "This means rework, lost context, and frustrated reviewers."

### Act 3: The Solution (35 sec)
**"The harness enforces engineering discipline."**

Same task, with harness:

1. **Session Start** (3 sec)
   - Agent restores context: goal, state, active session
   - Reads AGENTS.md for phase rules

2. **Discuss & Plan** (8 sec)
   - Agent writes DISCUSSION.md with assumptions
   - Creates PLAN.md with tasks, verification strategy
   - Stops before coding

3. **Run with Evidence** (8 sec)
   - Agent follows plan
   - Updates TASKS.md as it goes
   - Runs tests continuously

4. **Verify Rigorously** (8 sec)
   - Agent writes VERIFY.md with evidence
   - Test results: shown
   - Manual checks: documented
   - Change summary: real

5. **Ship with Context** (8 sec)
   - PR MESSAGE.md: generated from plan + changes + verification
   - REPORT.md: what changed, why, what was tested
   - No guessing. Pure evidence.

**Result:** PR is accepted first time. Reviewer knows exactly what changed and why.

### Act 4: The Impact (20 sec)
**Before vs After:**

| Metric | Without | With Harness |
|---|---|---|
| PR rejection rate | High | Low |
| Rework cycles | Multiple | Zero |
| Review time | Long (context missing) | Short (context included) |
| Agent session time | Fast but wasteful | Structured but reliable |
| Developer confidence | Low | High |

**Closing Narration:** "Discipline isn't overhead. It's force multiplier. Better code, happier teams, AI agents you can trust."

**CTA:** "Install the harness. Let agents be engineers, not code generators."

---

## Visual Assets to Show

### Before (Undisciplined)

```
User: Build a login feature
Agent: Ok, starting...
> Writes login.js (200 lines)
> Creates PR
> PR message: "login feature"

Review: "What about error handling?"
Agent: "Oh, I'll add that..."
```

Then show:
- VERIFY.md: Empty
- Tests: Not run
- Commit: "wip: login"
- No session memory

### After (Harnessed)

```
User: Build a login feature
Agent: Session Start...
Reading AGENTS.md, SESSION.md...
Active goal: "Complete login feature"

Agent: Creating PLAN.md...
- Task 1: Add email validation (line 42)
- Task 2: Handle retry logic
- Verify: Run tests, check 401 handling
- Risks: Rate limiting not implemented

Agent: Running plan...
✓ Task 1 complete
✓ Task 2 complete
✓ Tests passing (98% coverage)

Agent: Creating VERIFY.md...
Evidence:
- Test output: All passing
- Manual check: 401/403 handled
- Coverage: 98%

Agent: Creating PR_MESSAGE.md...
[Detailed context, changes, verification evidence]

User: Reviews PR
Result: Approved first time
```

---

## Production Steps

1. **Record Session A (Undisciplined)**
   - Use Claude without harness in Claude Code
   - Show quick code generation
   - Create minimal PR
   - Show confusion/rework

2. **Record Session B (Harnessed)**
   - Use Claude with harness in Claude Code
   - Show DISCUSSION.md, PLAN.md creation
   - Show test-driven implementation
   - Show VERIFY.md with evidence
   - Show PR_MESSAGE.md generated with context

3. **Edit Together**
   - Split screen: left = without, right = with harness
   - Overlay text annotations
   - Add narration
   - Add captions for key points
   - Background music: upbeat, professional

4. **Optimize for Platforms**
   - YouTube: Full 90 seconds
   - GitHub README: 90 second version
   - Landing page: Embed
   - Twitter: 30-second teaser

---

## Key Messages to Communicate

1. **The Problem is Real**
   - AI agents are fast but undisciplined
   - They skip verification, planning, documentation
   - This causes rework and lost context

2. **The Solution is Elegant**
   - Simple phase loop: map → plan → run → verify → ship
   - No new tools; works with Claude, Cursor, Codex, Gemini
   - Agents become engineers, not code generators

3. **The ROI is Clear**
   - First-time PR acceptance
   - No rework cycles
   - Reviewers have full context
   - Teams can trust AI work

4. **It's Ready Now**
   - `npx ai-engineering-harness install`
   - Works immediately
   - No learning curve for experienced developers

---

## Technical Setup

### Recording Tools
- **Primary:** Claude Code + Terminal (side-by-side)
- **Screen recording:** OBS Studio or native Mac/Windows tools
- **Editing:** Final Cut Pro, DaVinci Resolve, or Adobe Premiere
- **Narration:** GarageBand or Audacity

### Demo Project
- Use `examples/dogfood-tiny-node-api` as the base
- Feature: "Add user email verification"
- Scope: Small enough for 90 seconds, substantive enough to show value

### File Artifacts to Show
- `.harness/GOAL.md`
- `.harness/PLAN.md`
- `.harness/TASKS.md`
- `.harness/VERIFY.md`
- `PR_MESSAGE.md` (generated)

---

## Timeline

| Phase | Time | Owner |
|---|---|---|
| Script finalization | 30 min | Product/Marketing |
| Record Session A (undisciplined) | 20 min | Developer |
| Record Session B (harnessed) | 30 min | Developer |
| Edit + color grade | 60 min | Video editor |
| Add narration + captions | 45 min | Editor |
| Export + optimize | 15 min | Editor |
| **Total** | **2.5–3 hours** | — |

---

## Success Criteria

✅ Demo clearly shows before/after difference  
✅ Narration is concise and compelling  
✅ Visuals are easy to follow (not too fast)  
✅ No jargon; accessible to managers and developers  
✅ CTA is clear: "Install the harness"  
✅ Video length: ~90 seconds  
✅ Quality: Professional (could be on product landing page)

---

## Distribution

1. **GitHub README** — Embed at top with play button
2. **Landing page** (https://ai-engineering-harness.dev) — Hero video
3. **Twitter/LinkedIn** — 30-second teaser + link
4. **Community** — Product Hunt, HackerNews comments
5. **Docs** — Link in QUICK_REFERENCE.md

---

## Expected Impact

- **CTR:** 5-15% of README viewers click video
- **Conversion:** 20-30% of video viewers try install
- **GitHub Stars:** +50-100 after video goes live
- **Adoption:** 3-5x faster onboarding time

This is the **highest-ROI single marketing action** for the project.

