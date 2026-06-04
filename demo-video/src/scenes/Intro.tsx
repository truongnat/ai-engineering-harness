import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, from: 0.5, to: 1 });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1]);

  const taglineOpacity = interpolate(frame, [25, 50], [0, 1]);
  const taglineY = interpolate(frame, [25, 50], [20, 0], { easing: Easing.out(Easing.quad) });

  const subtitleOpacity = interpolate(frame, [50, 75], [0, 1]);
  const subtitleY = interpolate(frame, [50, 75], [20, 0], { easing: Easing.out(Easing.quad) });

  // Fade out at end
  const containerOpacity = interpolate(frame, [120, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        opacity: containerOpacity,
        background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {/* Logo / badge */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          background: 'linear-gradient(135deg, #58a6ff, #3d8bef)',
          borderRadius: 16,
          padding: '16px 32px',
          fontSize: 28,
          fontWeight: 700,
          color: '#fff',
          letterSpacing: 2,
          boxShadow: '0 0 60px rgba(88,166,255,0.3)',
        }}
      >
        aih
      </div>

      {/* Title */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontSize: 52,
          fontWeight: 800,
          color: '#e6edf3',
          textAlign: 'center',
          lineHeight: 1.2,
          maxWidth: 900,
        }}
      >
        ai-engineering-harness
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 26,
          color: '#8b949e',
          textAlign: 'center',
          maxWidth: 700,
        }}
      >
        Engineering discipline for AI coding agents
      </div>

      {/* Divider */}
      <div
        style={{
          opacity: subtitleOpacity,
          width: interpolate(frame, [60, 100], [0, 500], { extrapolateRight: 'clamp' }),
          height: 2,
          background: 'linear-gradient(90deg, transparent, #58a6ff, transparent)',
          marginTop: 8,
        }}
      />

      {/* Bottom caption */}
      <div
        style={{
          opacity: interpolate(frame, [90, 120], [0, 1]),
          fontSize: 18,
          color: '#3d8bef',
          letterSpacing: 3,
          textTransform: 'uppercase' as const,
        }}
      >
        Before &amp; After
      </div>
    </AbsoluteFill>
  );
};
