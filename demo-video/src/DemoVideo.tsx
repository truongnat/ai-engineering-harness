import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Intro } from './scenes/Intro';
import { WithoutHarness } from './scenes/WithoutHarness';
import { WithHarness } from './scenes/WithHarness';
import { Result } from './scenes/Result';
import { ProgressBar } from './components/ProgressBar';

// Frame timings (30 fps)
// Scene 0: Intro         0:00 – 0:05   (150 frames)
// Scene 1: Without       0:05 – 0:30   (750 frames)
// Scene 2: With Harness  0:30 – 1:20  (1500 frames)
// Scene 3: Result        1:20 – 1:30   (300 frames)

export const INTRO_START = 0;
export const INTRO_END = 150;       // 5s

export const S1_START = 150;        // 5s
export const S1_END = 900;          // 30s  → 25s duration

export const S2_START = 900;        // 30s
export const S2_END = 2400;         // 80s  → 50s duration

export const S3_START = 2400;       // 80s
export const S3_END = 2700;         // 90s  → 10s duration

export const TOTAL_FRAMES = 2700;

export const DemoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0d1117', fontFamily: "'Fira Code', 'Menlo', 'Monaco', monospace" }}>

      {/* Intro */}
      <Sequence from={INTRO_START} durationInFrames={INTRO_END - INTRO_START}>
        <Intro />
      </Sequence>

      {/* Scene 1: Without Harness */}
      <Sequence from={S1_START} durationInFrames={S1_END - S1_START}>
        <WithoutHarness />
      </Sequence>

      {/* Scene 2: With Harness */}
      <Sequence from={S2_START} durationInFrames={S2_END - S2_START}>
        <WithHarness />
      </Sequence>

      {/* Scene 3: Result */}
      <Sequence from={S3_START} durationInFrames={S3_END - S3_START}>
        <Result />
      </Sequence>

      {/* Progress bar — always on top */}
      <ProgressBar totalFrames={TOTAL_FRAMES} />
    </AbsoluteFill>
  );
};
