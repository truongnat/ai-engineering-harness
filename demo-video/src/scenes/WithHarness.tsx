import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

const STYLES = {
  container: {
    padding: 40,
    fontFamily: 'Menlo, Monaco, monospace',
    color: '#e0e0e0',
    backgroundColor: '#1a1a1a',
    fontSize: 13,
    lineHeight: 1.5,
  } as const,
  title: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginBottom: 15,
    color: '#51cf66',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    marginTop: 15,
    marginBottom: 8,
    color: '#69db7c',
  },
  command: {
    color: '#4ecdc4',
    marginBottom: 5,
  },
  output: {
    color: '#95a5a6',
    marginLeft: 10,
    marginBottom: 5,
  },
  success: {
    color: '#51cf66',
  },
  section: {
    marginTop: 12,
    marginBottom: 12,
  },
};

export const WithHarness: React.FC = () => {
  const frame = useCurrentFrame();
  const frameOffset = frame; // Adjusted to local timing

  const sessionStartOpacity = interpolate(frameOffset, [0, 30], [0, 1], { easing: Easing.ease });
  const planOpacity = interpolate(frameOffset, [300, 330], [0, 1], { easing: Easing.ease });
  const runOpacity = interpolate(frameOffset, [900, 930], [0, 1], { easing: Easing.ease });
  const verifyOpacity = interpolate(frameOffset, [1500, 1530], [0, 1], { easing: Easing.ease });
  const shipOpacity = interpolate(frameOffset, [1950, 1980], [0, 1], { easing: Easing.ease });

  return (
    <AbsoluteFill style={STYLES.container}>
      <div style={STYLES.title}>WITH HARNESS</div>

      {/* Session Start */}
      <div style={{ ...STYLES.section, opacity: sessionStartOpacity }}>
        <div style={STYLES.subtitle}>harness-start</div>
        <div style={STYLES.command}>$ Restoring session...</div>
        <div style={STYLES.output}>Reading .harness/GOAL.md</div>
        <div style={STYLES.output}>Reading .harness/PLAN.md</div>
        <div style={STYLES.output}>Active goal: "Add email verification"</div>
        <div style={{ ...STYLES.output, ...STYLES.success }}>✓ Session ready</div>
      </div>

      {/* Plan Phase */}
      <div style={{ ...STYLES.section, opacity: planOpacity }}>
        <div style={STYLES.subtitle}>harness-plan</div>
        <div style={STYLES.command}>.harness/PLAN.md</div>
        <div style={STYLES.output}>- Task 1: Token generator</div>
        <div style={STYLES.output}>- Task 2: Email retry logic</div>
        <div style={STYLES.output}>- Task 3: Verification callback</div>
        <div style={STYLES.output}>- Verify: Unit tests + integration</div>
        <div style={STYLES.output}>- Risk: Email service outage</div>
        <div style={{ ...STYLES.output, ...STYLES.success }}>✓ Ready to code</div>
      </div>

      {/* Run Phase */}
      <div style={{ ...STYLES.section, opacity: runOpacity }}>
        <div style={STYLES.subtitle}>harness-run</div>
        <div style={STYLES.command}>.harness/TASKS.md</div>
        <div style={{ ...STYLES.output, ...STYLES.success }}>✓ Token generator</div>
        <div style={{ ...STYLES.output, ...STYLES.success }}>✓ Email with retry</div>
        <div style={{ ...STYLES.output, ...STYLES.success }}>✓ Callback endpoint</div>
        <div style={STYLES.command}>$ npm test</div>
        <div style={{ ...STYLES.output, ...STYLES.success }}>Tests: 8/8 passing</div>
        <div style={{ ...STYLES.output, ...STYLES.success }}>Coverage: 94%</div>
      </div>

      {/* Verify Phase */}
      <div style={{ ...STYLES.section, opacity: verifyOpacity }}>
        <div style={STYLES.subtitle}>harness-verify</div>
        <div style={STYLES.command}>.harness/VERIFY.md</div>
        <div style={{ ...STYLES.output, ...STYLES.success }}>✓ All tests passing</div>
        <div style={{ ...STYLES.output, ...STYLES.success }}>✓ Coverage: 94%</div>
        <div style={{ ...STYLES.output, ...STYLES.success }}>✓ Rate limiting ready</div>
        <div style={{ ...STYLES.output, ...STYLES.success }}>✓ Error handling tested</div>
        <div style={{ ...STYLES.output, ...STYLES.success }}>Status: PASS</div>
      </div>

      {/* Ship Phase */}
      <div style={{ ...STYLES.section, opacity: shipOpacity }}>
        <div style={STYLES.subtitle}>harness-ship</div>
        <div style={STYLES.command}>PR_MESSAGE.md</div>
        <div style={STYLES.output}>What: Email verification feature</div>
        <div style={STYLES.output}>Why: Increase security</div>
        <div style={STYLES.output}>Tested: 8/8 tests ✓</div>
        <div style={STYLES.output}>Coverage: 94% ✓</div>
        <div style={{ ...STYLES.output, ...STYLES.success }}>✓ Ready for merge</div>
      </div>
    </AbsoluteFill>
  );
};
