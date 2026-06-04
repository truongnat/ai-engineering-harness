import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Terminal } from '../components/Terminal';
import { SceneLabel } from '../components/SceneLabel';
import { PhaseTag } from '../components/PhaseTag';

// This Sequence runs for 1500 frames (50s)

const fade = (frame: number, start: number, end = start + 20) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

interface LineSpec {
  text: string;
  color: string;
  indent?: number;
  frameStart: number;
}

// Each phase block
const PHASE_BLOCKS: {
  phase: string;
  color: string;
  labelFrame: number;
  lines: LineSpec[];
}[] = [
  {
    phase: 'harness-start',
    color: '#58a6ff',
    labelFrame: 15,
    lines: [
      { text: '$ aih start', color: '#79c0ff', frameStart: 20 },
      { text: '→ Reading .harness/PROJECT.md', color: '#8b949e', indent: 2, frameStart: 40 },
      { text: '→ Restoring session state...', color: '#8b949e', indent: 2, frameStart: 55 },
      { text: '✓ Goal: Add email verification feature', color: '#56d364', indent: 2, frameStart: 70 },
      { text: '✓ Context loaded (3 prior decisions)', color: '#56d364', indent: 2, frameStart: 85 },
    ],
  },
  {
    phase: 'harness-discuss',
    color: '#d2a8ff',
    labelFrame: 150,
    lines: [
      { text: '$ aih discuss', color: '#d2a8ff', frameStart: 160 },
      { text: '→ Writing .harness/sessions/DISCUSSION.md', color: '#8b949e', indent: 2, frameStart: 175 },
      { text: '  Approach: JWT token, 24h expiry', color: '#e6edf3', indent: 2, frameStart: 195 },
      { text: '  Risk: Email service downtime → retry queue', color: '#ffa657', indent: 2, frameStart: 215 },
      { text: '  Rate limit: 5 attempts / 15 min', color: '#e6edf3', indent: 2, frameStart: 235 },
      { text: '✓ Approach agreed, risks logged', color: '#56d364', indent: 2, frameStart: 255 },
    ],
  },
  {
    phase: 'harness-plan',
    color: '#ffa657',
    labelFrame: 320,
    lines: [
      { text: '$ aih plan', color: '#ffa657', frameStart: 330 },
      { text: '→ Writing .harness/sessions/PLAN.md', color: '#8b949e', indent: 2, frameStart: 345 },
      { text: '  Task 1: JWT token generator (tests first)', color: '#e6edf3', indent: 2, frameStart: 365 },
      { text: '  Task 2: Email send with retry (3×)', color: '#e6edf3', indent: 2, frameStart: 380 },
      { text: '  Task 3: /verify-email callback route', color: '#e6edf3', indent: 2, frameStart: 395 },
      { text: '  Task 4: Rate limiter middleware', color: '#e6edf3', indent: 2, frameStart: 410 },
      { text: '✓ Plan approved — 4 tasks, 2h estimate', color: '#56d364', indent: 2, frameStart: 430 },
    ],
  },
  {
    phase: 'harness-run',
    color: '#56d364',
    labelFrame: 510,
    lines: [
      { text: '$ aih run', color: '#56d364', frameStart: 520 },
      { text: '→ Tracking in .harness/sessions/TASKS.md', color: '#8b949e', indent: 2, frameStart: 535 },
      { text: '  [✓] Task 1 — token.test.js → token.js', color: '#56d364', indent: 2, frameStart: 570 },
      { text: '  [✓] Task 2 — email.test.js → email.js', color: '#56d364', indent: 2, frameStart: 640 },
      { text: '  [✓] Task 3 — verify route + integration test', color: '#56d364', indent: 2, frameStart: 720 },
      { text: '  [✓] Task 4 — rate-limit.test.js → middleware', color: '#56d364', indent: 2, frameStart: 800 },
      { text: '$ npm test', color: '#79c0ff', frameStart: 870 },
      { text: '  Tests: 12/12 passing  Coverage: 97%', color: '#56d364', indent: 2, frameStart: 890 },
    ],
  },
  {
    phase: 'harness-verify',
    color: '#39d353',
    labelFrame: 960,
    lines: [
      { text: '$ aih verify', color: '#39d353', frameStart: 970 },
      { text: '→ Writing .harness/sessions/VERIFY.md', color: '#8b949e', indent: 2, frameStart: 985 },
      { text: '  ✓ All 12 tests passing', color: '#56d364', indent: 2, frameStart: 1005 },
      { text: '  ✓ Coverage: 97% (gate: 80%)', color: '#56d364', indent: 2, frameStart: 1025 },
      { text: '  ✓ Rate limiting: 5 req/15min verified', color: '#56d364', indent: 2, frameStart: 1045 },
      { text: '  ✓ Retry queue: tested with mock failure', color: '#56d364', indent: 2, frameStart: 1065 },
      { text: '  ✓ Token expiry: 24h tested', color: '#56d364', indent: 2, frameStart: 1085 },
      { text: '  STATUS: PASS ✓', color: '#56d364', indent: 2, frameStart: 1110 },
    ],
  },
  {
    phase: 'harness-ship',
    color: '#58a6ff',
    labelFrame: 1200,
    lines: [
      { text: '$ aih ship', color: '#58a6ff', frameStart: 1210 },
      { text: '→ Generating PR_MESSAGE.md', color: '#8b949e', indent: 2, frameStart: 1230 },
      { text: '  What: Email verification — token + retry + rate limit', color: '#e6edf3', indent: 2, frameStart: 1250 },
      { text: '  Tests: 12/12 ✓  Coverage: 97% ✓', color: '#56d364', indent: 2, frameStart: 1275 },
      { text: '  Plan: .harness/sessions/PLAN.md', color: '#8b949e', indent: 2, frameStart: 1295 },
      { text: '  Decisions: token JWT, retry ×3, rate-limit 5/15m', color: '#8b949e', indent: 2, frameStart: 1315 },
      { text: '$ gh pr create --body-file PR_MESSAGE.md', color: '#79c0ff', frameStart: 1360 },
      { text: '  PR #87 opened', color: '#56d364', indent: 2, frameStart: 1395 },
      { text: '✓ Reviewer can see plan, evidence, decisions', color: '#56d364', indent: 2, frameStart: 1425 },
      { text: '✓ APPROVED same day — zero rework', color: '#56d364', indent: 2, frameStart: 1460 },
    ],
  },
];

export const WithHarness: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneOpacity = interpolate(frame, [0, 20], [0, 1]);
  const sceneOut = interpolate(frame, [1460, 1500], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scrolling: after frame 600 start scrolling up
  const scrollY = interpolate(frame, [600, 1450], [0, -900], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity * sceneOut }}>
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, #040d06 0%, #0d1117 100%)' }} />

      <SceneLabel label="WITH HARNESS" color="#56d364" />

      <div style={{ position: 'absolute', top: 80, left: 0, right: 0, bottom: 0, padding: '0 60px', overflow: 'hidden' }}>
        <div style={{ transform: `translateY(${scrollY}px)`, transition: 'none' }}>
          <Terminal title="Harnessed Agent — email feature task">
            {PHASE_BLOCKS.map((block) => (
              <div key={block.phase} style={{ marginBottom: 20 }}>
                {/* Phase tag */}
                <PhaseTag
                  label={block.phase}
                  color={block.color}
                  opacity={fade(frame, block.labelFrame)}
                />
                {/* Lines */}
                {block.lines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      opacity: fade(frame, line.frameStart),
                      color: line.color,
                      paddingLeft: line.indent ? line.indent * 8 : 0,
                      fontFamily: "'Fira Code', 'Menlo', monospace",
                      fontSize: 19,
                      lineHeight: 1.65,
                      whiteSpace: 'pre',
                    }}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            ))}
          </Terminal>
        </div>
      </div>
    </AbsoluteFill>
  );
};
