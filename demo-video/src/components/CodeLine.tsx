import React from 'react';
import { interpolate, Easing } from 'remotion';

interface CodeLineProps {
  lineNum: number;
  code: string;
  color?: string;
  frame: number;
  startFrame: number;
  isHighlighted?: boolean;
  isNew?: boolean;
  indent?: number;
}

const TOKEN_COLORS: Record<string, string> = {
  keyword: '#c586c0',    // purple: const, function, return, async, await
  string: '#ce9178',     // orange: strings
  comment: '#6a9955',    // green: comments
  number: '#b5cea8',     // light green: numbers
  type: '#4ec9b0',       // teal: types
  func: '#dcdcaa',       // yellow: function names
  prop: '#9cdcfe',       // light blue: properties
  default: '#d4d4d4',    // light gray: default
};

// Very naive syntax highlighter for visual effect
function highlightCode(code: string): React.ReactNode {
  if (code.startsWith('//') || code.startsWith('#')) {
    return <span style={{ color: TOKEN_COLORS.comment }}>{code}</span>;
  }

  // keywords
  const keywords = /\b(const|let|var|function|async|await|return|import|from|export|if|else|try|catch|throw|new|this|class|extends|interface|type)\b/g;

  let result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = keywords.exec(code)) !== null) {
    if (match.index > lastIndex) {
      result.push(<span key={lastIndex}>{code.slice(lastIndex, match.index)}</span>);
    }
    result.push(<span key={match.index} style={{ color: TOKEN_COLORS.keyword }}>{match[0]}</span>);
    lastIndex = keywords.lastIndex;
  }

  if (lastIndex < code.length) {
    result.push(<span key={lastIndex}>{code.slice(lastIndex)}</span>);
  }

  return result.length > 0 ? <>{result}</> : <span>{code}</span>;
}

export const CodeLine: React.FC<CodeLineProps> = ({
  lineNum,
  code,
  color,
  frame,
  startFrame,
  isHighlighted = false,
  isNew = false,
  indent = 0,
}) => {
  const opacity = interpolate(frame, [startFrame, startFrame + 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.linear),
  });

  // New lines slide in from left
  const slideX = isNew
    ? interpolate(frame, [startFrame, startFrame + 20], [-20, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
      })
    : 0;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${slideX}px)`,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 16,
        height: 22,
        background: isHighlighted ? '#264f78' : 'transparent',
        borderLeft: isNew ? '2px solid #56d364' : '2px solid transparent',
        transition: 'none',
      }}
    >
      {/* Line number */}
      <span
        style={{
          width: 40,
          textAlign: 'right',
          paddingRight: 16,
          color: '#4a4a4a',
          fontSize: 13,
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        {lineNum}
      </span>

      {/* Code */}
      <span
        style={{
          fontSize: 14,
          fontFamily: "'Fira Code', 'Consolas', 'Menlo', monospace",
          color: color || '#d4d4d4',
          paddingLeft: indent * 16,
          whiteSpace: 'pre',
        }}
      >
        {color ? code : highlightCode(code)}
      </span>
    </div>
  );
};
