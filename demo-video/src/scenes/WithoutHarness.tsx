import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Terminal } from '../components/Terminal';
import { SceneLabel } from '../components/SceneLabel';

// Frame durations inside this Sequence (750 frames = 25s)
// The Sequence already offsets from the global start,
// so `frame` here is local (0-749).

const fade = (frame: number, start: number, end = start + 20) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

export const WithoutHarness: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in whole scene
  const sceneOpacity = interpolate(frame, [0, 20], [0, 1]);
  // Fade out at end
  const sceneOut = interpolate(frame, [710, 750], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lines: { text: string; color: string; indent?: number; frameStart: number }[] = [
    // 0s — task received
    { text: '$ User: "Add email verification feature"', color: '#79c0ff', frameStart: 20 },
    { text: '→ Agent: "On it!"', color: '#8b949e', indent: 2, frameStart: 40 },

    // ~3s — jumps straight to coding
    { text: '', color: '', frameStart: 80 },
    { text: '// Skipped: no plan, no goal file', color: '#6e7681', frameStart: 85 },
    { text: '// Skipped: no test strategy', color: '#6e7681', frameStart: 100 },
    { text: '', color: '', frameStart: 115 },
    { text: '$ Creating auth/email.js...', color: '#d2a8ff', frameStart: 120 },
    { text: 'function sendVerificationEmail(email) {', color: '#e6edf3', indent: 2, frameStart: 135 },
    { text: "  const token = crypto.randomBytes(32).toString('hex')", color: '#e6edf3', indent: 2, frameStart: 150 },
    { text: '  sendEmail(email, token)   // no error handling', color: '#f85149', indent: 2, frameStart: 165 },
    { text: '}', color: '#e6edf3', indent: 2, frameStart: 180 },

    // ~8s — ship immediately
    { text: '', color: '', frameStart: 220 },
    { text: '$ git add . && git commit -m "email feature"', color: '#79c0ff', frameStart: 230 },
    { text: '$ gh pr create --title "Add email verification"', color: '#79c0ff', frameStart: 260 },
    { text: "  PR body: 'added email'", color: '#6e7681', indent: 2, frameStart: 280 },

    // ~12s — reviewer response
    { text: '', color: '', frameStart: 340 },
    { text: '── Reviewer Comment ──────────────────────', color: '#30363d', frameStart: 350 },
    { text: '❓ "What about rate limiting?"', color: '#ffa657', indent: 2, frameStart: 370 },
    { text: '❓ "No tests at all?"', color: '#ffa657', indent: 2, frameStart: 400 },
    { text: '❓ "What does this token expire?"', color: '#ffa657', indent: 2, frameStart: 430 },
    { text: '❓ "No error handling on sendEmail?"', color: '#ffa657', indent: 2, frameStart: 460 },

    // ~18s — result
    { text: '', color: '', frameStart: 520 },
    { text: '── Result ────────────────────────────────', color: '#30363d', frameStart: 530 },
    { text: '❌  PR REJECTED — needs rework', color: '#f85149', indent: 2, frameStart: 550 },
    { text: '⏱  2 days lost to back-and-forth', color: '#f85149', indent: 2, frameStart: 580 },
    { text: '🔁  3 more review cycles ahead', color: '#f85149', indent: 2, frameStart: 610 },
  ];

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity * sceneOut }}>
      {/* Dark red tint background */}
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, #1a0a0a 0%, #0d1117 100%)' }} />

      <SceneLabel label="WITHOUT HARNESS" color="#f85149" />

      <div style={{ position: 'absolute', top: 80, left: 0, right: 0, bottom: 0, padding: '0 60px' }}>
        <Terminal title="Undisciplined Agent — email feature task">
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                opacity: fade(frame, line.frameStart),
                color: line.color,
                paddingLeft: line.indent ? line.indent * 8 : 0,
                fontFamily: "'Fira Code', 'Menlo', monospace",
                fontSize: 20,
                lineHeight: 1.7,
                whiteSpace: 'pre',
              }}
            >
              {line.text}
            </div>
          ))}
        </Terminal>
      </div>
    </AbsoluteFill>
  );
};
