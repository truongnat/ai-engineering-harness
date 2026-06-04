import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';

const fade = (frame: number, start: number, end = start + 25) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

interface MetricRowProps {
  label: string;
  bad: string;
  good: string;
  frame: number;
  startFrame: number;
}

const MetricRow: React.FC<MetricRowProps> = ({ label, bad, good, frame, startFrame }) => {
  const opacity = fade(frame, startFrame);
  const slideX = interpolate(frame, [startFrame, startFrame + 25], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${slideX}px)`,
        display: 'grid',
        gridTemplateColumns: '220px 1fr 1fr',
        gap: 20,
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid #21262d',
      }}
    >
      <div style={{ color: '#8b949e', fontSize: 18 }}>{label}</div>
      <div
        style={{
          color: '#f85149',
          fontSize: 18,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {bad}
      </div>
      <div
        style={{
          color: '#56d364',
          fontSize: 18,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {good}
      </div>
    </div>
  );
};

export const Result: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerOpacity = fade(frame, 0);

  const titleOpacity = fade(frame, 20);
  const headerOpacity = fade(frame, 40);

  const dividerWidth = interpolate(frame, [40, 90], [0, 1700], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CTA at the end
  const ctaScale = spring({ frame: frame - 230, fps, config: { damping: 14, stiffness: 100 }, from: 0.8, to: 1 });
  const ctaOpacity = interpolate(frame, [230, 255], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const metrics: Omit<MetricRowProps, 'frame'>[] = [
    { label: 'PR Status', bad: '❌ Rejected', good: '✅ Approved', startFrame: 80 },
    { label: 'Review Cycles', bad: '🔁 3+ cycles', good: '✅ Zero rework', startFrame: 110 },
    { label: 'Review Time', bad: '⏱ 2 days', good: '⚡ Same day', startFrame: 140 },
    { label: 'Test Coverage', bad: '🔴 0% (none)', good: '🟢 97%', startFrame: 170 },
    { label: 'Context in PR', bad: '📭 Missing', good: '📋 Complete', startFrame: 200 },
  ];

  return (
    <AbsoluteFill
      style={{
        opacity: containerOpacity,
        background: '#0d1117',
        padding: '60px 80px',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 42,
          fontWeight: 800,
          color: '#e6edf3',
          textAlign: 'center',
          marginBottom: 8,
          fontFamily: "'Fira Code', 'Menlo', monospace",
        }}
      >
        Before vs After
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 20,
          color: '#8b949e',
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        Same task · Same agent · With engineering discipline
      </div>

      {/* Divider line */}
      <div
        style={{
          width: dividerWidth,
          height: 2,
          background: 'linear-gradient(90deg, transparent, #58a6ff, transparent)',
          marginBottom: 30,
          alignSelf: 'center',
        }}
      />

      {/* Column headers */}
      <div
        style={{
          opacity: headerOpacity,
          display: 'grid',
          gridTemplateColumns: '220px 1fr 1fr',
          gap: 20,
          marginBottom: 8,
          paddingBottom: 12,
          borderBottom: '2px solid #30363d',
          fontFamily: "'Fira Code', 'Menlo', monospace",
        }}
      >
        <div style={{ color: '#8b949e', fontSize: 16, textTransform: 'uppercase', letterSpacing: 2 }}>Metric</div>
        <div style={{ color: '#f85149', fontSize: 16, textTransform: 'uppercase', letterSpacing: 2 }}>Without Harness</div>
        <div style={{ color: '#56d364', fontSize: 16, textTransform: 'uppercase', letterSpacing: 2 }}>With Harness</div>
      </div>

      {/* Metric rows */}
      <div style={{ fontFamily: "'Fira Code', 'Menlo', monospace" }}>
        {metrics.map((m) => (
          <MetricRow key={m.label} {...m} frame={frame} />
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          marginTop: 60,
          textAlign: 'center',
          fontFamily: "'Fira Code', 'Menlo', monospace",
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #238636, #2ea043)',
            borderRadius: 12,
            padding: '18px 48px',
            fontSize: 26,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: 1,
            boxShadow: '0 0 40px rgba(46,160,67,0.4)',
          }}
        >
          npx ai-engineering-harness install
        </div>
        <div style={{ color: '#8b949e', marginTop: 16, fontSize: 18 }}>
          github.com/truongnat/ai-engineering-harness
        </div>
      </div>
    </AbsoluteFill>
  );
};
