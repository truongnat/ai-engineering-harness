#!/usr/bin/env node
"use strict";

const path = require("node:path");
const {
  appendHarnessEvent,
  emitResult,
  exitFromResult,
  findHarnessRoot,
  parseCliArgs,
  printHelp,
  resolveSessionDir,
  sanitizeSlug,
  timestampSlug,
  writeMarkdownArtifact,
} = require("./_util.js");

const SPEC = {
  session: { required: true },
  agent: { required: true },
  status: { required: true },
  summary: { required: true },
  "ready-to-continue": { required: false },
  "next-command": { required: false },
};

function recordSubagentResult(options) {
  const sessionDir = resolveSessionDir(options.session);
  const slug = `${sanitizeSlug(options.agent)}-${timestampSlug()}.md`;
  const artifactPath = path.join(sessionDir, "subagents", slug);

  writeMarkdownArtifact(artifactPath, [
    "# Subagent Run",
    "## Metadata",
    "",
    `agent: ${options.agent}`,
    `status: ${options.status}`,
    `ready_to_continue: ${options["ready-to-continue"] || "unknown"}`,
    `created_at: ${new Date().toISOString()}`,
    "## Task",
    "",
    options.summary,
    "## Result",
    "",
    "Paste the worker Agent Result envelope here when available.",
    "## Main Agent Decision",
    "",
    `next_command: ${options["next-command"] || "harness-verify"}`,
  ]);

  return {
    ok: true,
    status: "recorded",
    artifact: path.relative(process.cwd(), artifactPath).replace(/\\/g, "/"),
  };
}

function main() {
  try {
    const options = parseCliArgs(process.argv.slice(2), SPEC);
    if (options.help) {
      printHelp("record-subagent-result.js", [
        "Usage:",
        '  node hooks/core/record-subagent-result.js --session <path> --agent harness-reviewer --status issues-found --summary "Review complete" [--json]',
      ]);
      return;
    }
    const sessionDir = resolveSessionDir(options.session);
    const result = recordSubagentResult(options);
    try {
      appendHarnessEvent(findHarnessRoot(sessionDir), {
        type: "subagent-run",
        agent: options.agent,
        status: options.status,
        ready_to_continue: options["ready-to-continue"] || null,
        next_command: options["next-command"] || null,
      });
    } catch {
      // Event logging is best-effort when harness root cannot be resolved.
    }
    emitResult(result, options.json);
    exitFromResult({ ok: true });
  } catch (error) {
    emitResult({ ok: false, reason: error.message }, process.argv.includes("--json"));
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { recordSubagentResult };
