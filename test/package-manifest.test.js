const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");

test("package.json files entries exist on disk", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"));
  for (const entry of pkg.files) {
    if (entry.startsWith("!")) {
      continue;
    }
    const normalized = entry.replace(/\/$/, "");
    assert.ok(fs.existsSync(path.join(repoRoot, normalized)), `Missing packaged path: ${entry}`);
  }
});
