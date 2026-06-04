import React from 'react';

interface TerminalProps {
  title: string;
  children: React.ReactNode;
}

export const Terminal: React.FC<TerminalProps> = ({ title, children }) => {
  return (
    <div
      style={{
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: '#21262d',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderBottom: '1px solid #30363d',
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c940' }} />
        </div>
        <div style={{ color: '#8b949e', fontSize: 14, flex: 1, textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
          {title}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px', minHeight: 100 }}>
        {children}
      </div>
    </div>
  );
};
