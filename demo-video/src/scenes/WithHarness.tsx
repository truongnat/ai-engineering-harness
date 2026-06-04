import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { IDELayout } from '../components/IDELayout';
import { AgentMessage } from '../components/AgentMessage';
import { CodeLine } from '../components/CodeLine';
import { Callout } from '../components/Callout';
import { FlashOverlay } from '../components/FlashOverlay';
import { SceneLabel } from '../components/SceneLabel';
import { PhaseTag } from '../components/PhaseTag';

// 1500 frames = 50s

const fade = (frame: number, start: number, end = start + 15) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

const FILE_TREE_BY_PHASE = (frame: number) => [
  { name: 'my-project', type: 'folder' as const, indent: 0 },
  { name: '.harness', type: 'folder' as const, indent: 1, highlight: frame >= 50 },
  { name: 'sessions', type: 'folder' as const, indent: 2 },
  { name: 'GOAL.md', type: 'new' as const, indent: 3, highlight: frame >= 50 && frame < 350 },
  { name: 'DISCUSSION.md', type: 'new' as const, indent: 3, highlight: frame >= 350 && frame < 560 },
  { name: 'PLAN.md', type: 'new' as const, indent: 3, highlight: frame >= 560 && frame < 800 },
  { name: 'TASKS.md', type: 'new' as const, indent: 3, highlight: frame >= 800 && frame < 1100 },
  { name: 'VERIFY.md', type: 'new' as const, indent: 3, highlight: frame >= 1100 && frame < 1300 },
  { name: 'PR_MESSAGE.md', type: 'new' as const, indent: 3, highlight: frame >= 1300 },
  { name: 'src', type: 'folder' as const, indent: 1 },
  { name: 'auth', type: 'folder' as const, indent: 2 },
  { name: 'email.ts', type: 'file' as const, indent: 3, highlight: frame >= 800 },
  { name: 'email.test.ts', type: 'new' as const, indent: 3, highlight: frame >= 800 && frame < 1100 },
];

const CODE_LINES = [
  { code: '// email.ts — test-first, fully verified', color: '#6a9955' },
  { code: '' },
  { code: 'const MAX_ATTEMPTS = 5', color: '#d4d4d4' },
  { code: 'const WINDOW_MS   = 15 * 60 * 1000  // 15 min', color: '#d4d4d4' },
  { code: '' },
  { code: 'export async function sendVerification(', color: '#d4d4d4' },
  { code: '  email: string, opts?: VerifyOptions', color: '#9cdcfe' },
  { code: '): Promise<VerifyToken> {', color: '#d4d4d4' },
  { code: '  await rateLimiter.check(email, MAX_ATTEMPTS, WINDOW_MS)', color: '#d4d4d4' },
  { code: "  const token = await createJWT(email, '24h')", color: '#d4d4d4' },
  { code: '  await retry(() => mailer.send(email, token), 3)', color: '#d4d4d4' },
  { code: '  return { token, expiresAt: Date.now() + 86400000 }', color: '#d4d4d4' },
  { code: '}', color: '#d4d4d4' },
  { code: '' },
  { code: '// ✅ 12/12 tests passing — coverage: 97%', color: '#56d364' },
];

interface AgentMsg {
  role: 'user' | 'agent' | 'system' | 'success';
  text: string;
  startFrame: number;
  highlight?: boolean;
}

const AGENT_MESSAGES: AgentMsg[] = [
  { role: 'user', text: 'Add email verification to the auth system', startFrame: 10 },
  // harness-start
  { role: 'agent', text: '📋 Running: harness-start\n\nReading .harness/PROJECT.md...\n✓ Goal set — session created', startFrame: 40 },
  // harness-discuss
  { role: 'agent', text: '💬 Running: harness-discuss\n\nApproach: JWT token, 24h expiry\nRisk: email outage → retry ×3\nRate limit: 5/15min\n\n✓ DISCUSSION.md written', startFrame: 350 },
  // harness-plan
  { role: 'agent', text: '🗺️  Running: harness-plan\n\nTask 1: Rate limiter\nTask 2: JWT token helper\nTask 3: Email with retry\nTask 4: Integration tests\n\n✓ PLAN.md approved', startFrame: 560 },
  // harness-run
  { role: 'agent', text: '⚙️  Running: harness-run\n\n[✓] rate-limit.test.ts → middleware.ts\n[✓] token.test.ts → token.ts\n[✓] email.test.ts → email.ts\n[✓] Integration tests\n\n$ npm test → 12/12 ✓  97% coverage', startFrame: 800 },
  // harness-verify
  { role: 'agent', text: '🔍 Running: harness-verify\n\n✓ All 12 tests passing\n✓ Coverage 97% (gate: 80%)\n✓ Rate limit tested\n✓ Retry logic tested\n✓ Token expiry tested\n\nSTATUS: PASS', startFrame: 1100, highlight: true },
  // harness-ship
  { role: 'success', text: '🚀 Running: harness-ship\n\nPR_MESSAGE.md generated ✓\nPlan + evidence attached ✓\n\n$ gh pr create --body-file PR_MESSAGE.md\n✓ PR #88 — APPROVED same day!', startFrame: 1350, highlight: true },
];

export const WithHarness: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneIn = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneOut = interpolate(frame, [1460, 1500], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // which phase label to show
  const phases = [
    { label: 'harness-start',   color: '#58a6ff', frame: 40 },
    { label: 'harness-discuss', color: '#d2a8ff', frame: 350 },
    { label: 'harness-plan',    color: '#ffa657', frame: 560 },
    { label: 'harness-run',     color: '#56d364', frame: 800 },
    { label: 'harness-verify',  color: '#39d353', frame: 1100 },
    { label: 'harness-ship',    color: '#58a6ff', frame: 1350 },
  ];

  // Active phase tag
  let activePhase = phases[0];
  for (const p of phases) {
    if (frame >= p.frame) activePhase = p;
  }

  const editorContent = (
    <div>
      {/* Phase indicator in editor */}
      <div style={{ paddingLeft: 56, marginBottom: 8 }}>
        <PhaseTag
          label={activePhase.label}
          color={activePhase.color}
          opacity={1}
        />
      </div>
      {CODE_LINES.map((line, i) => (
        <CodeLine
          key={i}
          lineNum={i + 1}
          code={line.code}
          color={line.color}
          frame={frame}
          startFrame={820 + i * 18}
          isNew={i >= 2 && i <= 12}
          isHighlighted={i === 14 && frame >= 1100}
        />
      ))}
    </div>
  );

  const agentPanel = (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
      {AGENT_MESSAGES.map((msg, i) => (
        <AgentMessage
          key={i}
          role={msg.role}
          text={msg.text}
          frame={frame}
          startFrame={msg.startFrame}
          highlight={msg.highlight}
        />
      ))}
    </div>
  );

  const bottomPanel = (
    <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, lineHeight: 1.8 }}>
      <div style={{ color: '#8b949e', opacity: fade(frame, 800) }}>$ npm test</div>
      <div style={{ color: '#56d364', opacity: fade(frame, 880) }}>  ✓ rate-limiter (3 tests)</div>
      <div style={{ color: '#56d364', opacity: fade(frame, 910) }}>  ✓ token helper  (4 tests)</div>
      <div style={{ color: '#56d364', opacity: fade(frame, 940) }}>  ✓ email sender  (3 tests)</div>
      <div style={{ color: '#56d364', opacity: fade(frame, 970) }}>  ✓ integration   (2 tests)</div>
      <div style={{ color: '#56d364', fontWeight: 700, opacity: fade(frame, 1000) }}>
        Tests: 12/12 passing   Coverage: 97%
      </div>
    </div>
  );

  return (
    <AbsoluteFill style={{ opacity: sceneIn * sceneOut }}>
      <SceneLabel label="WITH HARNESS" color="#56d364" />

      <div style={{ position: 'absolute', inset: 0, top: 60 }}>
        <IDELayout
          fileTree={FILE_TREE_BY_PHASE(frame)}
          editorContent={editorContent}
          agentPanel={agentPanel}
          bottomPanel={bottomPanel}
          activeFile="src/auth/email.ts"
          editorTitle="Explorer — harness active"
        />
      </div>

      {/* Phase callouts */}
      <Callout
        text="Session + goal created first"
        type="info"
        frame={frame}
        startFrame={50}
        endFrame={340}
        top="35%"
        left="38%"
      />

      <Callout
        text="Plan written before any code!"
        type="info"
        frame={frame}
        startFrame={570}
        endFrame={790}
        top="35%"
        left="38%"
      />

      <Callout
        text="All 12 tests passing ✓"
        type="success"
        frame={frame}
        startFrame={1010}
        endFrame={1340}
        top="35%"
        left="38%"
      />

      <Callout
        text="PR Approved same day! 🎉"
        type="success"
        frame={frame}
        startFrame={1420}
        top="35%"
        left="38%"
      />

      {/* Green flash on approval */}
      <FlashOverlay frame={frame} startFrame={1420} color="#56d364" duration={20} />
    </AbsoluteFill>
  );
};
