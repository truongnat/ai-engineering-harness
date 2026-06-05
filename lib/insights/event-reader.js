"use strict";

const fs = require("node:fs");
const path = require("node:path");

function resolveEventsPath(targetRoot) {
  return path.join(targetRoot, ".harness", "history", "events.jsonl");
}

function readEvents(eventsPath) {
  if (!fs.existsSync(eventsPath)) {
    return [];
  }

  const events = [];
  const lines = fs.readFileSync(eventsPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }
    try {
      events.push(JSON.parse(trimmed));
    } catch {
      // Skip malformed lines so local history stays resilient.
    }
  }
  return events;
}

module.exports = {
  readEvents,
  resolveEventsPath,
};
