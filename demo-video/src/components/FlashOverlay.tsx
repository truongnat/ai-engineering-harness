import React from 'react';
import { interpolate, Easing } from 'remotion';

interface FlashOverlayProps {
  frame: number;
  startFrame: number;
  color: string;
  duration?: number;
}

/**
 * Full-screen flash effect — use for dramatic moments (fail / success).
 */
export const FlashOverlay: React.FC<FlashOverlayProps> = ({
  frame,
  startFrame,
  color,
  duration = 20,
}) => {
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 4, startFrame + duration],
    [0, 0.6, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.quad),
    }
  );

  if (frame < startFrame || frame > startFrame + duration) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: color,
        opacity,
        zIndex: 200,
        pointerEvents: 'none',
      }}
    />
  );
};
