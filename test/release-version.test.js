const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"));
const version = pkg.version;

test("release-facing files read version from package.json", () => {
  const lock = JSON.parse(fs.readFileSync(path.join(repoRoot, "package-lock.json"), "utf8"));
  const readme = fs.readFileSync(path.join(repoRoot, "README.md"), "utf8");
  const docsIndex = fs.readFileSync(path.join(repoRoot, "docs", "README.md"), "utf8");
  const notesPath = path.join(repoRoot, "docs", `v${version}-release-notes.md`);

  assert.equal(lock.version, version);
  assert.equal(lock.packages[""].version, version);
  assert.match(readme, new RegExp(`v${version.replace(/\./g, "\\.")}`));
  assert.match(docsIndex, new RegExp(version.replace(/\./g, "\\.")));
  assert.ok(fs.existsSync(notesPath), `docs/v${version}-release-notes.md must exist`);

  const notes = fs.readFileSync(notesPath, "utf8");
  assert.match(notes, new RegExp(`# v${version.replace(/\./g, "\\.")}`));
});

test("sync-site-version script exists", () => {
  assert.ok(fs.existsSync(path.join(repoRoot, "scripts", "sync-site-version.js")));
});
