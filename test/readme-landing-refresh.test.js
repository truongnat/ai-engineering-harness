const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");

test("README does not advertise a product walkthrough video", () => {
  const readme = fs.readFileSync(path.join(repoRoot, "README.md"), "utf8");
  assert.doesNotMatch(readme, /## Watch the walkthrough/);
  assert.doesNotMatch(readme, /AI_Engineering_Harness\.mp4/);
  assert.doesNotMatch(readme, /releases\/latest\/download\/.*\.mp4/);
});

test("landing page omits the walkthrough video section", () => {
  const app = fs.readFileSync(path.join(repoRoot, "site", "src", "App.tsx"), "utf8");
  const sectionPath = path.join(
    repoRoot,
    "site",
    "src",
    "components",
    "VideoWalkthroughSection.tsx"
  );

  assert.doesNotMatch(app, /VideoWalkthroughSection/);
  assert.equal(fs.existsSync(sectionPath), false);
  assert.match(app, /InstallSection/);
});
