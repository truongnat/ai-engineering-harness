import React from 'react';
import { interpolate, spring, useVideoConfig, Easing } from 'remotion';

interface AgentMessageProps {
  role: 'user' | 'agent' | 'system' | 'error' | 'success';
  text: string;
  frame: number;
  startFrame: number;
  highlight?: boolean;
}

const ROLE_STYLES = {
  user: { bg: '#21262d', border: '#30363d', icon: '👤', nameColor: '#8b949e', name: 'You' },
  agent: { bg: '#0d1b2e', border: '#1a3a5c', icon: '🤖', nameColor: '#58a6ff', name: 'AI Agent' },
  system: { bg: '#161b22', border: '#2a2a4e', icon: '⚙️', nameColor: '#8b949e', name: 'System' },
  error: { bg: '#2a0a0a', border: '#6e1a1a', icon: '❌', nameColor: '#f85149', name: 'Error' },
  success: { bg: '#0a2a0a', border: '#1a6e1a', icon: '✅', nameColor: '#56d364', name: 'Done' },
};

export const AgentMessage: React.FC<AgentMessageProps> = ({
  role,
  text,
  frame,
  startFrame,
  highlight = false,
}) => {
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const slideY = interpolate(frame, [startFrame, startFrame + 20], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const scale = highlight
    ? spring({ frame: frame - startFrame, fps, config: { damping: 10, stiffness: 120 }, from: 0.95, to: 1 })
    : 1;

  const style = ROLE_STYLES[role];

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${slideY}px) scale(${scale})`,
        background: highlight ? style.bg.replace('0a', '1a') : style.bg,
        border: `1px solid ${highlight ? style.border.replace('1a', '4a') : style.border}`,
        borderRadius: 8,
        padding: '10px 14px',
        marginBottom: 8,
        boxShadow: highlight ? `0 0 20px ${style.border}66` : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <span style={{ fontSize: 14 }}>{style.icon}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: style.nameColor }}>{style.name}</span>
      </div>
      <div
        style={{
          fontSize: 13,
          color: role === 'error' ? '#f85149' : role === 'success' ? '#56d364' : '#e6edf3',
          lineHeight: 1.6,
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          whiteSpace: 'pre-wrap',
        }}
      >
        {text}
      </div>
    </div>
  );
};
