import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface ProgressBarProps {
  totalFrames: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ totalFrames }) => {
  const frame = useCurrentFrame();
  const progress = frame / totalFrames;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        background: '#21262d',
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, #58a6ff, #56d364)',
          boxShadow: '0 0 8px rgba(88,166,255,0.6)',
          transition: 'none',
        }}
      />
    </div>
  );
};
