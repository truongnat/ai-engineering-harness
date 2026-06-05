# Walkthrough video

The product walkthrough is hosted as a **GitHub Release asset**, not in the git repository. This keeps clones fast and avoids shipping a 40MB+ binary in history.

## Watch

- README link (canonical URL from `media/walkthrough-video.json`)
- Landing page embedded player (`site/src/components/VideoWalkthroughSection.tsx`)

## Maintainer: publish or replace video

1. Obtain `AI_Engineering_Harness.mp4` locally (export or prior release download).
2. Upload to the matching release tag:

```bash
node scripts/publish-walkthrough-video.js --tag v1.0.1 --file ./AI_Engineering_Harness.mp4
```

3. If the release tag changes, update `media/walkthrough-video.json` when pinning a specific tag URL, or keep `releases/latest/download/...` for a rolling link.

## Policy

- Do **not** commit `*.mp4` files to this repository (`*.mp4` is gitignored).
- `test/media-policy.test.js` enforces that no MP4 paths are tracked.

## History purge (one-time maintainer)

If large MP4 blobs were previously committed, rewrite history and prune:

```bash
sh scripts/purge-media-from-history.sh
```

Then push rewritten history:

```bash
git push --force-with-lease origin main
git push --force-with-lease origin --tags
```

Coordinate with collaborators before force-pushing.
