I'll analyze this repo comprehensively as an AI engineering expert. Let me first understand the project structure, then run parallel deep-dive analyses.

Now I'll spawn 4 parallel analysis agents to cover the repo from different angles.

I've launched 4 parallel deep-dive analysis agents covering:

1. **Architecture & Code Quality** — CLI structure, error handling, tests, security, technical debt
2. **Content & Documentation** — 445 markdown files audit, information architecture, onboarding
3. **Provider & Ecosystem** — multi-provider strategy depth (Claude, Cursor, Codex, Gemini, OpenCode)
4. **Competitive & Market Positioning** — value prop, naming, examples, community readiness

Waiting for all agents to complete their analysis before compiling the consolidated report...

Architecture & Code Quality analysis is complete. Waiting for the remaining 3 agents...

Competitive & Market analysis is also complete. 2/4 done — waiting for Content/Documentation and Provider/Ecosystem agents...

Content & Documentation audit is complete. 3/4 done — waiting for the final Provider & Ecosystem analysis...

All 4 analysis agents are complete. Here's the consolidated report:

---

# AI Engineering Harness v1.0.0 — Expert Review Report

## Executive Summary

**ai-engineering-harness** is a genuinely novel project with a real insight: AI coding agents need engineering discipline, not just coding ability. The markdown-first operating model (phase gates, session memory, evidence-based verification) is well-architected and unique in the ecosystem. However, the project is **significantly under-marketed, over-documented, and Claude-centric** despite claiming multi-provider support. The 445:59 markdown-to-code ratio reflects that markdown IS the product — but ~60 files are stale internal process artifacts that dilute the signal.

**Overall Score: 5.5/10** — strong foundation, needs polish to reach its potential.

---

## Strengths (What's Working Well)

| Area | Details |
|---|---|
| **Core operating model** | The 8-phase command loop (Map→Start→Discuss→Plan→Run→Verify→Ship→Remember) with blocking gates is genuinely unique. No other tool enforces phase discipline on AI agents. |
| **Agent system prompt** | `agent-system/SYSTEM_PROMPT.md` + `RESPONSE_CONTRACT.md` are tight behavioral contracts that turn agents into disciplined operators. |
| **Command definitions** | All 10 `commands/harness-*.md` files follow a flawless template: Purpose, Preconditions, Steps, Outputs, Gates, Failure Conditions. Best-written files in the repo. |
| **Core rules fragment system** | `rules/core/*.md` with `<!-- @core -->` marker injection ensures every provider gets the same discipline. Real code sharing. |
| **Minimal dependencies** | Single dep (`@clack/prompts`). Extremely lightweight for a published npm package. |
| **Honest provider tiering** | The code explicitly tiers providers as primary/secondary/experimental. No false universality claims in the architecture. |
| **Validation system** | `lib/validate/` is well-decomposed (12 files) with proper separation of concerns. |
| **Dogfood coverage** | 10+ dogfood reports across all active providers. The team eats their own cooking. |
| **Interactive CLI UX** | `@clack/prompts` integration provides clean multiselect, spinners, and formatted output. |

---

## Findings by Tier

### TIER 1 — Critical (Must Fix)

| # | Category | Finding | Impact |
|---|---|---|---|
| C1 | **Content** | `TARGET.md` frozen at v0.1.0/v0.2.0 — describes features as "missing" that exist in v1.0.0 | New contributors/agents get a deeply wrong picture of the project |
| C2 | **Content** | `PACK.md` references v0.10.x as current state in a v1.0.0 project | Same as above |
| C3 | **Docs** | `docs/` has 155+ files at the top level with zero navigation — no index, no categories, no README | Users cannot find what they need; internal planning docs mixed with user guides |
| C4 | **Provider** | Codex has zero detection logic in `cli-detect.js` — `detectRecommendedProviders()` and `detectInstalledProviders()` are blind to Codex | Diagnostic system silently ignores Codex installs |
| C5 | **Provider** | Feature gap: Claude gets 8 commands + 4 workers + 4 hook events; every other provider gets 0+0+0 | The "multi-provider" claim is aspirational, not realized |

### TIER 2 — High (Fix Soon)

| # | Category | Finding | Impact |
|---|---|---|---|
| H1 | **Testing** | Single test file (523 lines), no framework, no isolation, no `beforeEach`/`afterEach` | Fragile tests, can't run individually |
| H2 | **Testing** | Zero test coverage for CLI commands, detection, UI, `deepMerge`, install-runtime paths | Core user-facing code is untested |
| H3 | **Security** | `aih.sh` curl-pipe-to-shell install with no checksum verification | Compromised GitHub account = arbitrary code execution |
| H4 | **Types** | Zero TypeScript, zero JSDoc, no `.d.ts` files for the public API | Consumers get no autocomplete or type checking |
| H5 | **CI/CD** | CI runs only on Ubuntu + Node 20 despite Windows-specific code and `aih.sh` targeting macOS/Linux | Cross-platform bugs slip through |
| H6 | **Content** | `workflows/bugfix.md` and `core-loop.md` use deprecated flat-root artifact paths; `adoption-guide.md` shows flat layout instead of session-based | Users following docs get wrong file structure |
| H7 | **Content** | Phase discipline rules duplicated across 7 files (AGENTS.md, SYSTEM_PROMPT, phase-guards, blocking, command-guardrails, command-loop, quality-gates-matrix) | Maintenance burden + contradiction risk |
| H8 | **Content** | No guided onboarding tutorial — from install to first productive session | High cognitive friction despite low install friction |
| H9 | **Provider** | Cursor hooks file (`hooks-cursor.json`) is empty `{"hooks":[]}` despite plugin manifest declaring it | Dead reference, signals incomplete work |
| H10 | **Provider** | All plugin manifest versions (0.10.6/0.10.7) are stale vs v1.0.0 | Stale metadata shipped with the package |

### TIER 3 — Medium (Plan to Fix)

| # | Category | Finding | Impact |
|---|---|---|---|
| M1 | **Code** | `runtime-command-catalog.js` is a 774-line god module (30 exports mixing metadata, rendering, installation) | Hard to maintain, hard to test |
| M2 | **Code** | 4 duplicated file-write-with-dry-run implementations across install/runtime/cache/legacy | Inconsistent behavior, maintenance burden |
| M3 | **Code** | `--provider` vs `--runtime` naming confusion in CLI args | Users read docs that say one but CLI accepts both |
| M4 | **Code** | Silent `catch {}` blocks swallow manifest JSON corruption in `runtime-command-catalog.js:281,522` | Corrupt manifests silently overwritten |
| M5 | **Code** | Legacy install path (`lib/install-legacy.js`) maintained alongside runtime install | Two install codepaths to maintain |
| M6 | **CI/CD** | No linting (ESLint/Prettier) in CI | Style drift, unused variables undetected |
| M7 | **CI/CD** | No npm publish workflow or version-tag validation | Manual publish, version mismatch risk |
| M8 | **Content** | `docs/concepts.md` (36 lines) and `docs/architecture.md` (56 lines) too terse to explain the system | Newcomers can't grok the big picture |
| M9 | **Content** | `harness-command-behavior.md` references nonexistent `.harness/STATUS.md` (should be `STATE.md`) | Wrong file reference in docs |
| M10 | **Market** | No `keywords`, `repository`, `homepage`, `bugs` in `package.json` | Invisible on npm search |
| M11 | **Market** | Target audience never explicitly stated in README or landing page | "Who is this for?" is unanswered |
| M12 | **Market** | No demo video, GIF, or asciinema recording anywhere | Abstract value prop, nothing visual |

### TIER 4 — Low (Nice to Have)

| # | Category | Finding | Impact |
|---|---|---|---|
| L1 | Code | Inconsistent `"use strict"` across CommonJS files | Sloppy-mode bugs possible |
| L2 | Code | `hooks/` listed twice in `package.json` files array | Harmless but sloppy |
| L3 | Code | `listFiles` recursion has no depth guard or symlink cycle detection | Edge case in deep trees |
| L4 | Code | Synchronous file I/O everywhere (acceptable for CLI) | Not a real problem |
| L5 | Content | Security warnings repeated across 6+ files | Defensible but creates maintenance surface |
| L6 | Market | CTA on landing page is "Read the README" — weak conversion | Users bounce at GitHub |

---

## Provider Support Reality Matrix

| Capability | Claude | Cursor | Codex | Gemini |
|---|---|---|---|---|
| Slash commands | 8 native | 0 | 0 | 0 |
| Workers/subagents | 4 native | 0 | 0 | 0 |
| Lifecycle hooks | 4 event types | Empty file | Manual | Manual |
| Rule files installed | 9 | 3 | 1 | 1 |
| Provider detection | Yes | Yes | **NO** | Yes |
| Plugin published | Repo-based | Pending | Pending | Pending |
| Dogfood tested | Yes | Yes | Yes | Yes |
| **Integration grade** | **A** | **C+** | **D** | **D** |

---

## Upgrade Roadmap (Prioritized)

### Phase 1 — Foundation (Week 1-2)
| Task | Fixes | Effort |
|---|---|---|
| Update `TARGET.md` and `PACK.md` to v1.0.0 reality | C1, C2 | 2h |
| Create `docs/README.md` index + reorganize into subdirs (`docs/internal/`, `docs/releases/`, `docs/guides/`) | C3 | 4h |
| Add Codex detection to `cli-detect.js` | C4 | 1h |
| Sync all plugin manifest versions to 1.0.0 | H10 | 30min |
| Fix stale artifact paths in workflows and adoption guide | H6 | 2h |
| Add `keywords`, `repository`, `homepage` to `package.json` | M10 | 15min |

### Phase 2 — Quality (Week 3-4)
| Task | Fixes | Effort |
|---|---|---|
| Migrate tests to a proper framework (vitest/node:test with `describe`) | H1 | 4h |
| Add CLI command test coverage | H2 | 8h |
| Add cross-platform CI matrix (Ubuntu/macOS/Windows × Node 18/20) | H5 | 2h |
| Add ESLint + Prettier to CI | M6 | 2h |
| Split `runtime-command-catalog.js` into 3 modules | M1 | 4h |
| Extract shared `writeFileWithDryRun()` utility | M2 | 2h |

### Phase 3 — Market (Week 5-6)
| Task | Fixes | Effort |
|---|---|---|
| Create "First 5 Minutes" tutorial | H8 | 4h |
| Record a 90-second demo video/GIF | M12 | 4h |
| Add "Who is this for?" section to README + landing page | M11 | 2h |
| Add before/after comparison (undisciplined agent vs harnessed) | M12 | 3h |
| Strengthen landing page CTA (install command, not "Read README") | L6 | 1h |
| Add issue templates, PR template, CODE_OF_CONDUCT | Community | 2h |

### Phase 4 — Provider Parity (Week 7-8)
| Task | Fixes | Effort |
|---|---|---|
| Implement Cursor hooks (at minimum phase-guard hook) | H9 | 4h |
| Add checksum verification to `aih.sh` remote install | H3 | 3h |
| Add JSDoc types to public API + ship `.d.ts` | H4 | 8h |
| Research + implement Antigravity provider adapter | Opportunity | 6h |
| Consolidate phase-discipline rules into single source of truth | H7 | 4h |

---

## Ideas to Increase Attractiveness

### Tier S — High Impact, Achievable
| Idea | Why it works |
|---|---|
| **90-second before/after demo video** | Visual proof is 10× more convincing than docs. Show: agent without harness (skips tests, no PR notes) → same agent with harness (structured plan, evidence, PR_MESSAGE.md) |
| **"First 5 Minutes" tutorial** | Reduce cognitive friction from "interesting" to "I'm using it" |
| **Lean into `aih` as the brand** | "ai-engineering-harness" is 23 chars and unmemorable. `aih` is punchy |
| **Blog post: "Why your AI agent needs an engineering process"** | Content marketing drives GitHub stars more than code |

### Tier A — Medium Impact
| Idea | Why it works |
|---|---|
| **Project template library** (Next.js, Express, FastAPI, React Native) | Lower the "what do I put in `.harness/`?" barrier |
| **VS Code extension** showing harness status in sidebar | IDE presence = daily visibility |
| **Comparison pages** (aih vs CLAUDE.md alone, vs .cursorrules, vs aider) | SEO + decision-making aid |
| **Submit to awesome-lists** (awesome-claude, awesome-ai-tools, awesome-cursor) | Discovery in established communities |

### Tier B — Long-term Differentiators
| Idea | Why it works |
|---|---|
| **Agent transcript replay/audit** | Compliance angle for teams: "what did the agent actually do?" |
| **Metrics dashboard** (sessions completed, verification rate, phases skipped) | Measurable outcomes → "must-have" status |
| **Team features** (shared `.harness/` state, merge-friendly markdown) | Unlocks team adoption, not just individual |
| **Measurable outcomes claim** ("PR rejection rate dropped 40%→15%") | Even anecdotal evidence is powerful |

---

## The One Thing

> **The single highest-ROI action: Record a 90-second before/after demo showing an undisciplined agent vs a harnessed one, and embed it in the README and landing page.** This alone would convert more visitors than any code change.

The project has genuine technical depth and a novel insight. The gap is not in the engineering — it's in the storytelling. A developer needs to *feel* the difference in 30 seconds, not read 445 markdown files to understand it.