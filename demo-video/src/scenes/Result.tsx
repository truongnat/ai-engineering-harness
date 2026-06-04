import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { FlashOverlay } from '../components/FlashOverlay';

const fade = (frame: number, start: number, end = start + 20) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

interface MetricProps {
  icon: string;
  label: string;
  bad: string;
  good: string;
  frame: number;
  startFrame: number;
  fps: number;
}

const MetricRow: React.FC<MetricProps> = ({ icon, label, bad, good, frame, startFrame, fps }) => {
  const opacity = fade(frame, startFrame);
  const badScale = spring({
    frame: frame - (startFrame + 10),
    fps,
    config: { damping: 14, stiffness: 120 },
    from: 0.8, to: 1,
  });
  const goodScale = spring({
    frame: frame - (startFrame + 25),
    fps,
    config: { damping: 14, stiffness: 120 },
    from: 0.8, to: 1,
  });

  return (
    <div
      style={{
        opacity,
        display: 'grid',
        gridTemplateColumns: '52px 200px 1fr 1fr',
        gap: 0,
        alignItems: 'center',
        padding: '14px 0',
        borderBottom: '1px solid #21262d',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 28, textAlign: 'center' }}>{icon}</div>
      <div style={{ color: '#8b949e', fontSize: 17 }}>{label}</div>

      {/* Bad */}
      <div
        style={{
          transform: `scale(${badScale})`,
          color: '#f85149',
          fontSize: 18,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          paddingLeft: 16,
        }}
      >
        {bad}
      </div>

      {/* Good */}
      <div
        style={{
          transform: `scale(${goodScale})`,
          color: '#56d364',
          fontSize: 18,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          paddingLeft: 16,
        }}
      >
        {good}
      </div>
    </div>
  );
};

const METRICS = [
  { icon: '📋', label: 'PR Status',       bad: '❌ Rejected',       good: '✅ Approved',      startFrame: 80  },
  { icon: '🔁', label: 'Review Cycles',   bad: '3+ back-and-forth', good: 'Zero rework',       startFrame: 115 },
  { icon: '⏱️', label: 'Time to Merge',   bad: '2+ days',           good: 'Same day',          startFrame: 150 },
  { icon: '🧪', label: 'Test Coverage',   bad: '0% (none)',         good: '97% ✓',             startFrame: 185 },
  { icon: '📖', label: 'PR Context',      bad: 'Missing',           good: 'Plan + Evidence',   startFrame: 220 },
  { icon: '🔐', label: 'Security checks', bad: 'Not considered',    good: 'Rate limit, expiry',startFrame: 255 },
];

export const Result: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerFade = fade(frame, 0, 25);

  const titleScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 100 },
    from: 0.85, to: 1,
  });

  const dividerW = interpolate(frame, [50, 110], [0, 1600], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const ctaOpacity = fade(frame, 290, 315);
  const ctaScale = spring({
    frame: frame - 290,
    fps,
    config: { damping: 12, stiffness: 90 },
    from: 0.7, to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        opacity: containerFade,
        background: '#0d1117',
        padding: '50px 100px',
        flexDirection: 'column',
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: fade(frame, 10, 30),
          transform: `scale(${titleScale})`,
          textAlign: 'center',
          marginBottom: 6,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: '#e6edf3',
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            letterSpacing: -1,
          }}
        >
          Before{' '}
          <span style={{ color: '#30363d' }}>vs</span>{' '}
          After
        </div>
        <div style={{ fontSize: 20, color: '#8b949e', marginTop: 8 }}>
          Same task · Same agent · With engineering discipline
        </div>
      </div>

      {/* Gradient divider */}
      <div
        style={{
          width: dividerW,
          height: 2,
          background: 'linear-gradient(90deg, transparent, #f85149 30%, #56d364 70%, transparent)',
          margin: '20px auto 16px',
        }}
      />

      {/* Column headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '52px 200px 1fr 1fr',
          gap: 0,
          paddingBottom: 10,
          borderBottom: '2px solid #30363d',
          opacity: fade(frame, 60, 75),
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}
      >
        <div />
        <div style={{ color: '#8b949e', fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 }}>Metric</div>
        <div style={{ color: '#f85149', fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, paddingLeft: 16 }}>
          Without Harness
        </div>
        <div style={{ color: '#56d364', fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, paddingLeft: 16 }}>
          With Harness
        </div>
      </div>

      {/* Metrics */}
      <div>
        {METRICS.map((m) => (
          <MetricRow key={m.label} {...m} frame={frame} fps={fps} />
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          textAlign: 'center',
          marginTop: 40,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #238636, #2ea043)',
              borderRadius: 12,
              padding: '18px 56px',
              fontSize: 28,
              fontWeight: 700,
              color: '#fff',
              fontFamily: "'Fira Code', 'Menlo', monospace",
              boxShadow: '0 0 50px rgba(46,160,67,0.4)',
              letterSpacing: 1,
            }}
          >
            npx ai-engineering-harness install
          </div>
          <div style={{ color: '#8b949e', fontSize: 16, fontFamily: 'system-ui, sans-serif' }}>
            github.com/truongnat/ai-engineering-harness
          </div>
        </div>
      </div>

      {/* Flash on CTA appear */}
      <FlashOverlay frame={frame} startFrame={290} color="#56d364" duration={15} />
    </AbsoluteFill>
  );
};
