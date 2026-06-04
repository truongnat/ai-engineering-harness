import React from 'react';

interface SceneLabelProps {
  label: string;
  color: string;
}

export const SceneLabel: React.FC<SceneLabelProps> = ({ label, color }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 24,
        left: 60,
        right: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: 6,
          height: 28,
          background: color,
          borderRadius: 3,
          boxShadow: `0 0 12px ${color}88`,
        }}
      />
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color,
          letterSpacing: 3,
          textTransform: 'uppercase' as const,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {label}
      </div>
    </div>
  );
};
