"use strict";

const path = require("node:path");

async function runInsightsCommand(_packRoot, options) {
  const { buildInsights } = require("../insights");
  const target = path.resolve(options.target || ".");
  const result = buildInsights(target);

  if (options.json) {
    process.stdout.write(
      `${JSON.stringify(
        {
          target: result.target,
          eventsPath: result.eventsPath,
          summary: result.summary,
        },
        null,
        2
      )}\n`
    );
    return 0;
  }

  process.stdout.write(result.output);
  return 0;
}

module.exports = {
  runInsightsCommand,
};
