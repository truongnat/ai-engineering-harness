const test = require("node:test");
const assert = require("node:assert/strict");

const { trim } = require("../src/string");

test("trim removes surrounding whitespace", () => {
  assert.equal(trim("  hello  "), "hello");
});
