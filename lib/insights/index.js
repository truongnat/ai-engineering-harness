"use strict";

const path = require("node:path");
const { readEvents, resolveEventsPath } = require("./event-reader");
const { buildAnonymizedExport } = require("./export");
const { formatInsightsText, summarizeEvents } = require("./summarize");

function buildInsights(targetRoot) {
  const resolvedTarget = path.resolve(targetRoot || ".");
  const eventsPath = resolveEventsPath(resolvedTarget);
  const events = readEvents(eventsPath);
  const summary = summarizeEvents(events);

  return {
    target: resolvedTarget,
    eventsPath,
    events,
    summary,
    output: formatInsightsText(summary, eventsPath),
  };
}

function buildInsightsExport(targetRoot, options = {}) {
  const insights = buildInsights(targetRoot);
  return buildAnonymizedExport(insights.summary, {
    includeFingerprint: true,
    ...options,
  });
}

module.exports = {
  buildInsights,
  buildInsightsExport,
  buildAnonymizedExport,
  formatInsightsText,
  readEvents,
  resolveEventsPath,
  summarizeEvents,
};
