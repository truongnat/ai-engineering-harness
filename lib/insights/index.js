"use strict";

const path = require("node:path");
const { readEvents, resolveEventsPath } = require("./event-reader");
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

module.exports = {
  buildInsights,
  formatInsightsText,
  readEvents,
  resolveEventsPath,
  summarizeEvents,
};
