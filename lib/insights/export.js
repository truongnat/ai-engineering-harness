"use strict";

const crypto = require("node:crypto");
const { summarizeEvents } = require("./summarize");

function mapToObject(rows) {
  return Object.fromEntries(rows);
}

function buildAnonymizedExport(summary, options = {}) {
  const aggregate = {
    totalEvents: summary.totalEvents,
    skills: mapToObject(summary.skills),
    guardBlocks: mapToObject(summary.guardBlocks),
    guardPasses: mapToObject(summary.guardPasses),
    tools: summary.tools.map((entry) => ({
      command: entry.command,
      count: entry.count,
      failures: entry.failures,
    })),
    subagents: mapToObject(summary.subagents),
  };

  const payload = {
    schema: "harness-insights-export-v1",
    generatedAt: new Date().toISOString(),
    anonymized: options.anonymize !== false,
    aggregate,
  };

  if (options.includeFingerprint) {
    payload.fingerprint = crypto
      .createHash("sha256")
      .update(JSON.stringify(aggregate))
      .digest("hex")
      .slice(0, 16);
  }

  return payload;
}

module.exports = {
  buildAnonymizedExport,
};
