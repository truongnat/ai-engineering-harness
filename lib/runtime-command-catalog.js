"use strict";

const { PROVIDER_RULE_ADAPTERS } = require("./provider-rule-renderer.js");
const metadata = require("./catalog/provider-command-metadata.js");
const rendering = require("./catalog/command-rendering.js");
const installation = require("./catalog/command-installation.js");

module.exports = {
  ...metadata,
  ...rendering,
  ...installation,
  PROVIDER_RULE_ADAPTERS,
};
