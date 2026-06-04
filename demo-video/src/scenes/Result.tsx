import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

const STYLES = {
  container: {
    display: 'flex',
    flexDirection: 'row' as const,
    backgroundColor: '#0f0f0f',
    height: '100%',
  },
  half: {
    flex: 1,
    padding: 60,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    fontFamily: 'Menlo, Monaco, monospace',
    fontSize: 18,
    lineHeight: 1.8,
  },
  leftHalf: {
    backgroundColor: '#2a1a1a',
    borderRight: '4px solid #333',
  },
  rightHalf: {
    backgroundColor: '#1a2a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: 30,
  },
  leftTitle: {
    color: '#ff6b6b',
  },
  rightTitle: {
    color: '#51cf66',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  label: {
    color: '#95a5a6',
    minWidth: 200,
  },
  bad: {
    color: '#ff6b6b',
    fontWeight: 'bold' as const,
  },
  good: {
    color: '#51cf66',
    fontWeight: 'bold' as const,
  },
  cta: {
    marginTop: 60,
    fontSize: 20,
    textAlign: 'center' as const,
    color: '#fff',
    fontWeight: 'bold' as const,
  },
};

export const Result: React.FC = () => {
  const frame = useCurrentFrame();

  const leftOpacity = interpolate(frame, [0, 30], [0, 1], { easing: Easing.ease });
  const rightOpacity = interpolate(frame, [60, 90], [0, 1], { easing: Easing.ease });
  const ctaOpacity = interpolate(frame, [120, 150], [0, 1], { easing: Easing.ease });

  return (
    <AbsoluteFill style={STYLES.container}>
      {/* Left: Without Harness */}
      <div style={{ ...STYLES.half, ...STYLES.leftHalf, opacity: leftOpacity }}>
        <div style={{ ...STYLES.title, ...STYLES.leftTitle }}>WITHOUT HARNESS</div>

        <div style={STYLES.row}>
          <div style={STYLES.label}>PR Status:</div>
          <div style={STYLES.bad}>❌ Rework Required</div>
        </div>

        <div style={STYLES.row}>
          <div style={STYLES.label}>Review Time:</div>
          <div style={STYLES.bad}>Long</div>
        </div>

        <div style={STYLES.row}>
          <div style={STYLES.label}>Rework Cycles:</div>
          <div style={STYLES.bad}>Multiple</div>
        </div>

        <div style={STYLES.row}>
          <div style={STYLES.label}>Reviewer Trust:</div>
          <div style={STYLES.bad}>Low</div>
        </div>

        <div style={STYLES.row}>
          <div style={STYLES.label}>Context:</div>
          <div style={STYLES.bad}>Missing</div>
        </div>
      </div>

      {/* Right: With Harness */}
      <div style={{ ...STYLES.half, ...STYLES.rightHalf, opacity: rightOpacity }}>
        <div style={{ ...STYLES.title, ...STYLES.rightTitle }}>WITH HARNESS</div>

        <div style={STYLES.row}>
          <div style={STYLES.label}>PR Status:</div>
          <div style={STYLES.good}>✓ Approved</div>
        </div>

        <div style={STYLES.row}>
          <div style={STYLES.label}>Review Time:</div>
          <div style={STYLES.good}>Quick</div>
        </div>

        <div style={STYLES.row}>
          <div style={STYLES.label}>Rework Cycles:</div>
          <div style={STYLES.good}>Zero</div>
        </div>

        <div style={STYLES.row}>
          <div style={STYLES.label}>Reviewer Trust:</div>
          <div style={STYLES.good}>High</div>
        </div>

        <div style={STYLES.row}>
          <div style={STYLES.label}>Context:</div>
          <div style={STYLES.good}>Complete</div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ ...STYLES.cta, opacity: ctaOpacity, position: 'absolute' as const, bottom: 60, left: 0, right: 0 }}>
        <div style={{ color: '#51cf66', marginBottom: 10 }}>ai-engineering-harness</div>
        <div style={{ fontSize: 24, color: '#fff' }}>npx ai-engineering-harness install</div>
      </div>
    </AbsoluteFill>
  );
};
