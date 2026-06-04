import React from 'react';

const VS_DARK = {
  bg: '#1e1e1e',
  sidebar: '#252526',
  titleBar: '#323233',
  tabBar: '#2d2d2d',
  activeTab: '#1e1e1e',
  border: '#3c3c3c',
  text: '#cccccc',
  dimText: '#858585',
  accent: '#569cd6',
  activityBar: '#333333',
};

interface FileTreeItem {
  name: string;
  type: 'file' | 'folder' | 'new';
  indent?: number;
  highlight?: boolean;
}

interface IDELayoutProps {
  fileTree: FileTreeItem[];
  editorContent: React.ReactNode;
  agentPanel: React.ReactNode;
  bottomPanel?: React.ReactNode;
  activeFile?: string;
  editorTitle?: string;
}

export const IDELayout: React.FC<IDELayoutProps> = ({
  fileTree,
  editorContent,
  agentPanel,
  bottomPanel,
  activeFile = 'auth/email.ts',
  editorTitle = 'Explorer',
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: VS_DARK.bg,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        fontSize: 13,
        color: VS_DARK.text,
      }}
    >
      {/* Title Bar */}
      <div
        style={{
          background: VS_DARK.titleBar,
          height: 30,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 12,
          gap: 6,
          borderBottom: `1px solid ${VS_DARK.border}`,
          flexShrink: 0,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c940' }} />
        <div style={{ flex: 1, textAlign: 'center', color: VS_DARK.dimText, fontSize: 12 }}>
          my-project — Visual Studio Code
        </div>
      </div>

      {/* Main area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Activity Bar */}
        <div
          style={{
            width: 48,
            background: VS_DARK.activityBar,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 8,
            gap: 16,
            borderRight: `1px solid ${VS_DARK.border}`,
            flexShrink: 0,
          }}
        >
          {['📁', '🔍', '🌿', '🐛', '🧩'].map((icon, i) => (
            <div
              key={i}
              style={{
                fontSize: 20,
                opacity: i === 0 ? 1 : 0.4,
                cursor: 'pointer',
                padding: 4,
                borderLeft: i === 0 ? '2px solid #fff' : '2px solid transparent',
              }}
            >
              {icon}
            </div>
          ))}
        </div>

        {/* Sidebar — File Explorer */}
        <div
          style={{
            width: 220,
            background: VS_DARK.sidebar,
            borderRight: `1px solid ${VS_DARK.border}`,
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '8px 12px',
              fontSize: 11,
              letterSpacing: 1,
              color: VS_DARK.dimText,
              textTransform: 'uppercase',
            }}
          >
            {editorTitle}
          </div>
          {fileTree.map((item, i) => (
            <div
              key={i}
              style={{
                padding: `3px 12px 3px ${12 + (item.indent || 0) * 16}px`,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: item.highlight ? '#2a3f5f' : 'transparent',
                borderLeft: item.highlight ? '2px solid #569cd6' : '2px solid transparent',
                color: item.type === 'new' ? '#89d185' : item.highlight ? '#fff' : VS_DARK.text,
                fontSize: 13,
              }}
            >
              <span style={{ fontSize: 14 }}>
                {item.type === 'folder' ? '📂' : item.type === 'new' ? '✨' : '📄'}
              </span>
              {item.name}
            </div>
          ))}
        </div>

        {/* Editor + Agent Panel */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Editor */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Tab bar */}
            <div
              style={{
                background: VS_DARK.tabBar,
                height: 35,
                display: 'flex',
                alignItems: 'center',
                borderBottom: `1px solid ${VS_DARK.border}`,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  padding: '0 16px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  background: VS_DARK.activeTab,
                  borderRight: `1px solid ${VS_DARK.border}`,
                  borderTop: '1px solid #007acc',
                  fontSize: 13,
                  color: VS_DARK.text,
                  gap: 8,
                }}
              >
                <span>📄</span> {activeFile}
              </div>
            </div>
            {/* Code area */}
            <div
              style={{
                flex: 1,
                overflow: 'hidden',
                background: VS_DARK.bg,
                padding: '12px 0',
              }}
            >
              {editorContent}
            </div>
          </div>

          {/* Agent Panel */}
          <div
            style={{
              width: 480,
              background: '#1a1a2e',
              borderLeft: `1px solid #2a2a4e`,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {/* Agent header */}
            <div
              style={{
                padding: '10px 16px',
                background: '#16213e',
                borderBottom: '1px solid #2a2a4e',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: 'linear-gradient(135deg, #58a6ff, #3d8bef)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                }}
              >
                🤖
              </div>
              <span style={{ color: '#e6edf3', fontWeight: 600, fontSize: 14 }}>AI Agent</span>
              <span style={{ color: '#8b949e', fontSize: 12, marginLeft: 'auto' }}>aih v1.0</span>
            </div>
            {/* Agent content */}
            <div style={{ flex: 1, overflow: 'hidden', padding: 16 }}>
              {agentPanel}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Terminal Panel */}
      {bottomPanel && (
        <div
          style={{
            height: 160,
            background: '#1a1a1a',
            borderTop: `1px solid ${VS_DARK.border}`,
            padding: '8px 16px',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <div style={{ color: VS_DARK.dimText, fontSize: 12, marginBottom: 6 }}>TERMINAL</div>
          {bottomPanel}
        </div>
      )}
    </div>
  );
};
