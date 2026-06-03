#!/usr/bin/env node

const api = require("./lib/install-runtime.js");

if (require.main === module) {
  api.main();
}

module.exports = api;
