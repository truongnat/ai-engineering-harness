import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { DemoVideo } from './DemoVideo';

const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DemoVideo"
      component={DemoVideo}
      durationInFrames={2700} // 90 seconds at 30fps
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

registerRoot(RemotionRoot);
