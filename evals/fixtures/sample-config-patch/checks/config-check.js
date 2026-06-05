const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("config.json uses boolean enabled flag", () => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "config.json"), "utf8"));
  assert.equal(config.enabled, true);
});
