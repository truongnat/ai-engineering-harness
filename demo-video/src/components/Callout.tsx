import React from 'react';
import { interpolate, spring, useVideoConfig, Easing } from 'remotion';

interface CalloutProps {
  text: string;
  type: 'danger' | 'success' | 'info' | 'warning';
  frame: number;
  startFrame: number;
  endFrame?: number;
  /** position relative to parent */
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
}

const TYPE_STYLES = {
  danger:  { bg: '#3a0a0a', border: '#f85149', color: '#f85149', icon: '🚨' },
  success: { bg: '#0a2a0a', border: '#56d364', color: '#56d364', icon: '🎉' },
  info:    { bg: '#0a1a3a', border: '#58a6ff', color: '#58a6ff', icon: '💡' },
  warning: { bg: '#2a1a00', border: '#ffa657', color: '#ffa657', icon: '⚠️' },
};

export const Callout: React.FC<CalloutProps> = ({
  text,
  type,
  frame,
  startFrame,
  endFrame,
  top, left, right, bottom,
}) => {
  const { fps } = useVideoConfig();

  const scaleIn = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12, stiffness: 150 },
    from: 0.7,
    to: 1,
  });

  const opacityIn = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacityOut = endFrame
    ? interpolate(frame, [endFrame - 15, endFrame], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  const opacity = Math.min(opacityIn, opacityOut);

  const s = TYPE_STYLES[type];

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top, left, right, bottom,
        opacity,
        transform: `scale(${scaleIn})`,
        transformOrigin: 'center center',
        background: s.bg,
        border: `2px solid ${s.border}`,
        borderRadius: 10,
        padding: '12px 20px',
        zIndex: 50,
        boxShadow: `0 0 30px ${s.border}55, 0 4px 20px rgba(0,0,0,0.5)`,
        maxWidth: 400,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 24 }}>{s.icon}</span>
        <span
          style={{
            color: s.color,
            fontSize: 18,
            fontWeight: 700,
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            lineHeight: 1.4,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
