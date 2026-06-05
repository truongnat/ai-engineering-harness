# 90-Second Demo Video — Detailed Recording Script

**Total Duration:** 90 seconds  
**Task:** Add email verification to a user authentication system

---

## SEQUENCE 1: WITHOUT HARNESS (0:00–0:25)

### Setup (0:00–0:05)
**Visual:** Terminal + Editor side by side  
**Show:** User request in chat

```
User: "Add email verification to login feature"
Agent: "Got it, starting..."
```

**Narration:** "Without discipline, AI agents move fast but skip the important things."

**Timing:** 5 seconds

---

### Code Generation (0:05–0:15)
**Visual:** Claude Code session showing:
- Agent reading goal
- Immediately starting to code (no planning)
- Writing `auth.js` with email verification logic
- 150 lines of code, no comments

**Show File:**
```javascript
// auth.js
function sendVerificationEmail(email) {
  // Quick implementation
  const token = crypto.randomBytes(32).toString('hex');
  sendEmail(email, token);
  return token;
}
```

**Narration:** "The agent starts coding immediately. No planning, no discussion of edge cases. Just: write, ship, move on."

**Timing:** 10 seconds

---

### Ship Without Verification (0:15–0:25)
**Visual:** 
- Show `.harness/` directory: EMPTY or missing files
- PR being created
- PR message: "Add email verification"
- No VERIFY.md
- No test output
- No evidence

**Terminal:**
```
$ git commit -m "Add email verification"
$ git push
$ gh pr create --title "Add email verification"
PR created: #42
```

**Narration:** "Creates a PR with minimal context. No verification, no tests shown, no discussion of what could go wrong."

**Timing:** 10 seconds

---

### Consequence (0:25–0:27)
**Visual:** Show reviewer comment
```
Reviewer: "What about rate limiting? 
          What if email sending fails? 
          Where are the tests?"
```

**Narration:** "Rework required."

---

## SEQUENCE 2: WITH HARNESS (0:27–0:90)

### Session Start (0:27–0:35)
**Visual:** Claude Code with harness

**Show:** Agent running `/harness-start`

```
Agent: Restoring session...
Reading .harness/STATE.md...
Reading .harness/GOAL.md...
Active goal: "Add email verification"
Session: 2026-06-04-email-verify
Next command: harness-discuss
```

**Narration:** "With the harness, the agent starts by restoring context. What's the goal? What's the current state? What's the plan?"

**Show on screen:**
- `.harness/STATE.md` with current codebase state
- `.harness/GOAL.md` with clear goal
- Session directory: `.harness/sessions/2026-06-04-email-verify/`

**Timing:** 8 seconds

---

### Plan Before Code (0:35–0:48)
**Visual:** Agent creating `.harness/PLAN.md`

**Show:** File being written:
```markdown
# Plan: Add Email Verification

## Goal
Add secure email verification to login flow.

## Tasks
1. Create verification token generator (crypto)
2. Add email sending with retry logic
3. Handle verification callback endpoint
4. Add tests for email sending failures
5. Test rate limiting (prevent token spam)

## Verification Strategy
- Unit tests: token generation, retry logic
- Integration test: email service failures
- Manual: test invalid/expired tokens

## Risks
- Email service outage: handled with retry
- Token expiration: need TTL
- Rate limiting: not in scope (TODO: next)
```

**Narration:** "Before writing a single line of code, the agent writes the plan. What are we building? What could go wrong? How will we verify it works?"

**Timing:** 13 seconds

---

### Run with Updates (0:48–0:62)
**Visual:** Agent following plan, updating `.harness/TASKS.md`

**Show updating tasks:**
```
✓ Task 1: Create verification token generator
  - crypto.randomBytes(32).toString('hex')
  - TTL: 15 minutes
  
✓ Task 2: Add email sending with retry
  - 3 retries with exponential backoff
  - Error handling for SMTP failures
  
○ Task 3: Handle verification callback
  - Endpoint: POST /verify-email
  - Validate token, update user, return success
  
→ Task 4: Tests
```

**Show actual code being written:**
```javascript
// tests/email-verification.test.js
describe('Email Verification', () => {
  test('generates valid token', () => {
    const token = generateToken();
    expect(token).toHaveLength(64);
  });
  
  test('handles email service failure', async () => {
    emailService.send = jest.fn().mockRejectedValue(new Error('SMTP'));
    await expect(sendVerificationEmail('test@example.com'))
      .rejects.toThrow();
  });
});
```

**Narration:** "The agent follows the plan step by step. Writes code. Updates the task list as it goes. Runs tests continuously."

**Timing:** 14 seconds

---

### Verify with Evidence (0:62–0:75)
**Visual:** Agent creating `.harness/VERIFY.md`

**Show:** File being written with real evidence:
```markdown
# Verification Report

## Tests
✓ All 8 unit tests passing
✓ Integration tests: email retry logic works
  - Test 1: First attempt fails, second succeeds
  - Test 2: All retries exhausted, error thrown
✓ Invalid token handling: correct rejection

Coverage: 94%

## Manual Checks
✓ Token generation: random, 64 hex chars
✓ Email retry: 3 attempts, exponential backoff
✓ Expired token: correctly rejected (15 min TTL)
✓ Rate limiting: tested with 100 requests

## What We Didn't Test
- Email service actual SMTP (mocked)
- Real email delivery time

## Status
✅ PASS — Ready to ship
```

**Show terminal output:**
```
$ npm test
PASS tests/email-verification.test.js
  ✓ generates valid token
  ✓ handles email service failure
  ✓ respects token TTL
  ✓ validates callback correctly

Tests: 8 passed, 0 failed
Coverage: 94%
```

**Narration:** "Before shipping, the agent gathers real evidence. Tests passing, coverage shown, manual checks documented. No guessing, no 'looks good.' Just facts."

**Timing:** 13 seconds

---

### Ship with Context (0:75–0:85)
**Visual:** Agent creating `PR_MESSAGE.md`

**Show:** File being generated:
```markdown
# Email Verification Feature

## Summary
Added secure email verification to login flow.

## What Changed
- `auth.js`: Added `sendVerificationEmail()` with retry logic
- `routes.js`: Added POST `/verify-email` endpoint
- `tests/`: Added 8 new tests for verification flow

## Why
Prevents spam accounts and increases security posture.

## Verification
- Tests: 8/8 passing (94% coverage)
- Retry logic: tested with simulated failures
- Token TTL: 15 minutes, tested
- Rate limiting: prepared for next phase

## Risks & Gaps
- Email service rate limits: not tested with real SMTP
- Next: Add rate limiting middleware (separate PR)

## Deploy Notes
- Requires SENDGRID_API_KEY in env
- Migration: Set `email_verified` default to false
```

**Show PR being created:**
```
PR #42: Add email verification
Description: [Full markdown with context above]
Status: Ready to merge
```

**Narration:** "The PR now includes full context. What changed, why, what was tested, what gaps remain. The reviewer knows exactly what they're looking at."

**Timing:** 10 seconds

---

### Result (0:85–0:90)
**Visual:** Split screen showing both scenarios

**LEFT:** Without harness
```
PR #42: Add email verification
Reviewer: "Needs tests"
Reviewer: "What about rate limiting?"
Reviewer: "Rejected - rework required"
Status: ❌ Rework needed
```

**RIGHT:** With harness
```
PR #42: Add email verification  
Reviewer: "Looks solid, thanks for the context"
Status: ✅ Approved
```

**Narration:** "With discipline, the PR is approved first time. No rework. Reviewers have what they need. AI agents become teammates, not code generators."

**Final text overlay:**
```
ai-engineering-harness
Engineer Your AI Agents

npx ai-engineering-harness install
```

**Timing:** 5 seconds

---

## Technical Recording Notes

### Split Screen Layout
- **Left 50%:** Without harness (fast, messy)
- **Right 50%:** With harness (structured, documented)
- **Divider:** Thin white line for clarity

### Text Overlays
- Task status: ✓ = done, ○ = in progress, → = next, ❌ = failed
- Timing: Fade in/out at key moments
- Key quotes: "First-time approval," "No rework," "Full context"

### Narration Pacing
- Act 1 (problem): 25 seconds — slower, let problem sink in
- Act 2 (solution): 65 seconds — show details clearly
- Final message: 5 seconds — confident, uplifting

### Timing Adjustments
If running long:
- Reduce Task 2 detail (5 sec → 3 sec)
- Shorten verification detail (13 sec → 10 sec)

If running short:
- Add more test output examples
- Show more of the generated code

---

## Audio/Music

**Background:** Subtle upbeat instrumental (60-80 bpm)
- Starts at 0:00
- Builds slightly at 0:27 (solution intro)
- Peaks at 0:75 (result)
- Ends clean at 0:90

**Narration:** Clear, professional, calm confidence
- No rush
- Slight emphasis on transitions
- Warm on closing message

---

## File Checklist

Files to have visible during recording:
- ✓ `.harness/GOAL.md`
- ✓ `.harness/STATE.md`
- ✓ `.harness/PLAN.md`
- ✓ `.harness/TASKS.md`
- ✓ `.harness/VERIFY.md`
- ✓ `PR_MESSAGE.md`
- ✓ `auth.js`
- ✓ `routes.js`
- ✓ `tests/email-verification.test.js`
- ✓ Test output (terminal)

---

## Expected Output

**Video Properties:**
- Resolution: 1920x1080 (1080p)
- Frame rate: 30 fps
- Codec: H.264
- File size: ~200 MB (compressed to ~40 MB for web)
- Format: .mp4 for universal compatibility

**Deliverables:**
1. **Full 90-second video** (for landing page + YouTube)
2. **30-second teaser** (for Twitter/LinkedIn)
3. **Still frame** (screenshot at 0:45 for thumbnail)

