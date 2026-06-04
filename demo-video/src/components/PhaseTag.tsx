import React from 'react';

interface PhaseTagProps {
  label: string;
  color: string;
  opacity: number;
}

export const PhaseTag: React.FC<PhaseTagProps> = ({ label, color, opacity }) => {
  return (
    <div
      style={{
        opacity,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: `${color}22`,
        border: `1px solid ${color}55`,
        borderRadius: 6,
        padding: '4px 14px',
        marginBottom: 8,
        marginTop: 4,
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }} />
      <span
        style={{
          color,
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "'Fira Code', 'Menlo', monospace",
          letterSpacing: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
};
