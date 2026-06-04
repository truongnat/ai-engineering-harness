import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion';
import { WithoutHarness } from './scenes/WithoutHarness';
import { WithHarness } from './scenes/WithHarness';
import { Result } from './scenes/Result';
import { SplitScreenLayout } from './components/SplitScreenLayout';

// Timings in frames (30fps = 1 second = 30 frames)
const SCENE_1_START = 0;      // 0:00 - Without harness
const SCENE_1_END = 750;      // 0:25

const SCENE_2_START = 750;    // 0:25 - With harness
const SCENE_2_END = 2550;     // 0:85

const SCENE_3_START = 2550;   // 0:85 - Result
const SCENE_3_END = 2700;     // 0:90

export const DemoVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f' }}>
      {/* Phase 1: Without Harness (0:00–0:25) */}
      <Sequence from={SCENE_1_START} durationInFrames={SCENE_1_END - SCENE_1_START}>
        <SplitScreenLayout
          left={<WithoutHarness />}
          right={null}
          showDivider={false}
        />
      </Sequence>

      {/* Phase 2: With Harness (0:25–0:85) */}
      <Sequence from={SCENE_2_START} durationInFrames={SCENE_2_END - SCENE_2_START}>
        <SplitScreenLayout
          left={<WithHarness />}
          right={null}
          showDivider={false}
        />
      </Sequence>

      {/* Phase 3: Result Comparison (0:85–0:90) */}
      <Sequence from={SCENE_3_START} durationInFrames={SCENE_3_END - SCENE_3_START}>
        <Result />
      </Sequence>
    </AbsoluteFill>
  );
};
