import React from 'react';
import { AbsoluteFill } from 'remotion';

interface SplitScreenLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode | null;
  showDivider?: boolean;
}

export const SplitScreenLayout: React.FC<SplitScreenLayoutProps> = ({
  left,
  right,
  showDivider = true,
}) => {
  return (
    <AbsoluteFill style={{ display: 'flex', backgroundColor: '#0f0f0f' }}>
      {/* Left side */}
      <div style={{ flex: 1, borderRight: showDivider ? '2px solid #fff' : 'none' }}>
        {left}
      </div>

      {/* Right side (optional) */}
      {right && <div style={{ flex: 1 }}>{right}</div>}
    </AbsoluteFill>
  );
};
