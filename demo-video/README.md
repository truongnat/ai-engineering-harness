# 90-Second Demo Video — Built with Remotion

This directory contains the **programmatic video composition** for the ai-engineering-harness demo. Video is written as **React code**, making it:

- 📝 Version-controlled
- 🔄 Reproducible
- 🎨 Customizable
- 🚀 Automatable

---

## What It Shows

**90-second before/after demo:**
- **Without Harness** (0:00–0:25): Agent skips planning, ships without verification, requires rework
- **With Harness** (0:25–0:85): Agent plans, implements, verifies, ships with full context
- **Result** (0:85–0:90): Side-by-side comparison showing the impact

---

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Install Dependencies

```bash
cd demo-video
npm install
# or
yarn install
```

### Preview the Video

```bash
npm run dev
```

This opens Remotion Studio where you can:
- Preview the video in real-time
- Scrub through the timeline
- Adjust timing and colors
- Preview at different resolutions

### Render the Video

```bash
# Full quality (may take 5-10 minutes)
npm run render

# Fast render (lower quality, for testing)
npm run render:fast
```

Output video: `out/DemoVideo.mp4`

---

## Project Structure

```
demo-video/
├── src/
│   ├── index.tsx           # Remotion root + composition setup
│   ├── DemoVideo.tsx       # Main video orchestrator
│   ├── scenes/
│   │   ├── WithoutHarness.tsx    # Scene 1: Undisciplined agent
│   │   ├── WithHarness.tsx       # Scene 2: Harnessed agent
│   │   └── Result.tsx            # Scene 3: Side-by-side comparison
│   └── components/
│       └── SplitScreenLayout.tsx  # Reusable layout component
├── package.json            # Dependencies
├── tsconfig.json          # TypeScript config
└── README.md             # This file
```

---

## Video Timing

All timing is in **frames** at **30 fps**:

| Phase | Start | Duration | Seconds |
|---|---|---|---|
| Without Harness | 0 | 750 | 0:00–0:25 |
| With Harness | 750 | 1800 | 0:25–0:85 |
| Result | 2550 | 150 | 0:85–0:90 |
| **Total** | — | 2700 | **0:00–1:30** |

To adjust timing:
1. Edit `src/DemoVideo.tsx` — change `SCENE_*_START` and `SCENE_*_END` constants
2. Edit individual scenes (`src/scenes/*.tsx`) — update `interpolate()` frame ranges

---

## Customization

### Colors

Edit color values in each scene file. Current palette:

- **Success:** `#51cf66` (green)
- **Error:** `#ff6b6b` (red)
- **Info:** `#4ecdc4` (cyan)
- **Text:** `#e0e0e0` (light gray)
- **Background:** `#0f0f0f` (near black)

### Text & Content

All text is hardcoded in `src/scenes/*.tsx`. To change:

1. Open the relevant scene file
2. Update the JSX text content
3. Adjust timing if needed (see "Video Timing" above)
4. Test in Remotion Studio: `npm run dev`

### Animation Timing

Each element uses Remotion's `interpolate()` for fade-in/out:

```typescript
const opacity = interpolate(
  frame,
  [startFrame, endFrame],   // When to animate
  [0, 1],                   // From transparent to opaque
  { easing: Easing.ease }   // Smooth easing
);
```

Adjust `startFrame` and `endFrame` to change when elements appear.

---

## Export Settings

Current render settings (in `package.json` scripts):

```bash
--codec=h264          # H.264 video codec (universal compatibility)
--audio-codec=aac     # AAC audio codec
--concurrency=4       # Use 4 CPU cores for rendering
--height=1080         # 1080p resolution
--width=1920          # Full HD width
```

To add narration/music:
1. Render the video without audio first
2. Edit in Final Cut Pro, DaVinci Resolve, or Adobe Premiere
3. Add narration + background music
4. Export final version

---

## Adding Narration

Remotion videos can include audio. To add narration:

1. **Record narration** separately (GarageBand, Audacity, etc.)
2. **Place audio file** in `src/assets/narration.mp3`
3. **Import in DemoVideo.tsx:**

```typescript
import { Audio } from 'remotion';

// Inside DemoVideo component:
<Audio src={require('./assets/narration.mp3')} />
```

4. **Adjust timing** to match narration

---

## Troubleshooting

### Video renders but looks wrong

1. Check `npm run dev` preview first
2. Verify frame numbers in timing constants
3. Check color values and opacity interpolations

### Render is very slow

1. Use `npm run render:fast` for testing
2. Reduce `--concurrency` if CPU-bound
3. Reduce `--height` and `--width` for testing

### Remotion crashes

1. Clear node_modules: `rm -rf node_modules && npm install`
2. Update Remotion: `npm install remotion@latest`
3. Check for TypeScript errors: `npx tsc --noEmit`

---

## Distribution

### For GitHub README

Embed the video:

```markdown
[![Watch the demo](demo-video/thumbnail.jpg)](demo-video/out/DemoVideo.mp4)
```

### For Landing Page

Host on:
- **YouTube** (link from README)
- **Vercel/Netlify** (embed as iframe)
- **GitHub Releases** (attached asset)

### For Social Media

Create a 30-second teaser:

```bash
# Trim first 900 frames (30 seconds) in Remotion or FFmpeg
ffmpeg -i out/DemoVideo.mp4 -vf "scale=1080:1920" -t 30 demo-teaser.mp4
```

---

## Next Steps

1. **Preview:** Run `npm run dev` and review timing/content
2. **Customize:** Adjust colors, text, and timing to match your brand
3. **Render:** Run `npm run render` to generate final video (5-10 min)
4. **Post-Process:** Add narration/music in video editor
5. **Distribute:** Embed in README, landing page, social media

---

## Technical Notes

- **Framework:** Remotion 4.0+
- **Language:** TypeScript/React
- **Output:** MP4 (H.264 + AAC)
- **Resolution:** 1920x1080 @ 30fps
- **Duration:** 90 seconds (2700 frames)
- **File Size:** ~40 MB (final, compressed)

---

## License

Same as ai-engineering-harness (MIT). Use, modify, and share freely.

