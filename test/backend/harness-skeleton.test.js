const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { initHarnessProfile } = require("../../dist/lib/backend/harness-skeleton.js");

const EXPECTED = [
  "HARNESS.md",
  "TEAM.md",
  "SKILLS.md",
  "WORKFLOW.md",
  "GATES.md",
  "MEMORY.md",
  "DECISIONS.md",
  "HAZARDS.md",
  "INDEX.md",
  "goals/.gitkeep",
];

test("initHarnessProfile creates the full .harness skeleton", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "hs-"));
  const result = initHarnessProfile({ targetAbs: dir, dryRun: false });
  for (const rel of EXPECTED) {
    assert.equal(fs.existsSync(path.join(dir, ".harness", rel)), true, `${rel} should exist`);
  }
  // each markdown stub is non-empty and ends with a newline
  const harness = fs.readFileSync(path.join(dir, ".harness", "HARNESS.md"), "utf8");
  assert.ok(harness.length > 0 && harness.endsWith("\n"));
  // result tracks created files
  assert.equal(result.created.length, EXPECTED.length);
  assert.equal(result.skipped.length, 0);
});

test("initHarnessProfile dryRun creates nothing", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "hs-"));
  initHarnessProfile({ targetAbs: dir, dryRun: true });
  assert.equal(fs.existsSync(path.join(dir, ".harness")), false);
});

test("initHarnessProfile does not overwrite an existing file unless forced", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "hs-"));
  fs.mkdirSync(path.join(dir, ".harness"), { recursive: true });
  fs.writeFileSync(path.join(dir, ".harness", "HARNESS.md"), "MINE\n");
  const result = initHarnessProfile({ targetAbs: dir, dryRun: false });
  assert.equal(fs.readFileSync(path.join(dir, ".harness", "HARNESS.md"), "utf8"), "MINE\n");
  // HARNESS.md should be in skipped, the rest created
  assert.ok(result.skipped.includes(".harness/HARNESS.md"));
  assert.equal(result.created.length, EXPECTED.length - 1);
});

test("initHarnessProfile overwrites an existing file when force=true", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "hs-"));
  fs.mkdirSync(path.join(dir, ".harness"), { recursive: true });
  fs.writeFileSync(path.join(dir, ".harness", "HARNESS.md"), "MINE\n");
  initHarnessProfile({ targetAbs: dir, dryRun: false, force: true });
  const content = fs.readFileSync(path.join(dir, ".harness", "HARNESS.md"), "utf8");
  assert.notEqual(content, "MINE\n");
  assert.ok(content.includes("# Harness Profile"));
});
