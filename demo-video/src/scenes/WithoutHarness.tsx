import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing } from 'remotion';

const STYLES = {
  container: {
    padding: 40,
    fontFamily: 'Menlo, Monaco, monospace',
    color: '#e0e0e0',
    backgroundColor: '#1a1a1a',
    fontSize: 14,
    lineHeight: 1.6,
  } as const,
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: 20,
    color: '#ff6b6b',
  },
  command: {
    color: '#4ecdc4',
    marginBottom: 10,
  },
  output: {
    color: '#95a5a6',
    marginLeft: 10,
    marginBottom: 10,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
};

export const WithoutHarness: React.FC = () => {
  const frame = useCurrentFrame();

  // Timing for different sections
  const userRequestOpacity = interpolate(frame, [0, 30], [0, 1], { easing: Easing.ease });
  const codeOpacity = interpolate(frame, [150, 180], [0, 1], { easing: Easing.ease });
  const prOpacity = interpolate(frame, [450, 480], [0, 1], { easing: Easing.ease });
  const reviewOpacity = interpolate(frame, [600, 630], [0, 1], { easing: Easing.ease });

  return (
    <AbsoluteFill style={STYLES.container}>
      <div style={STYLES.title}>WITHOUT HARNESS</div>

      {/* User Request */}
      <div style={{ ...STYLES.section, opacity: userRequestOpacity }}>
        <div style={STYLES.command}>$ User: "Add email verification"</div>
        <div style={STYLES.output}>Agent: "Got it, starting..."</div>
      </div>

      {/* Code Generation */}
      <div style={{ ...STYLES.section, opacity: codeOpacity }}>
        <div style={STYLES.command}>// auth.js</div>
        <div style={STYLES.output}>function sendVerificationEmail(email) {'{'}</div>
        <div style={STYLES.output}>  const token = crypto.randomBytes(32)</div>
        <div style={STYLES.output}>  sendEmail(email, token)</div>
        <div style={STYLES.output}>  return token</div>
        <div style={STYLES.output}>{'}'}</div>
        <div style={{ ...STYLES.output, color: '#ffb3ba' }}>✗ No tests</div>
        <div style={{ ...STYLES.output, color: '#ffb3ba' }}>✗ No verification</div>
      </div>

      {/* PR Created */}
      <div style={{ ...STYLES.section, opacity: prOpacity }}>
        <div style={STYLES.command}>$ git push && gh pr create</div>
        <div style={STYLES.output}>PR #42: Add email verification</div>
        <div style={STYLES.output}>Description: "email feature"</div>
      </div>

      {/* Reviewer Feedback */}
      <div style={{ ...STYLES.section, opacity: reviewOpacity }}>
        <div style={{ ...STYLES.title, color: '#ffb3ba', fontSize: 18 }}>Reviewer:</div>
        <div style={STYLES.output}>"What about rate limiting?"</div>
        <div style={STYLES.output}>"Where are the tests?"</div>
        <div style={STYLES.output}>"Need more context"</div>
        <div style={{ ...STYLES.output, color: '#ff6b6b', marginTop: 10 }}>❌ REWORK REQUIRED</div>
      </div>
    </AbsoluteFill>
  );
};
