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
  command: { required: true },
  "exit-code": { required: true },
  summary: { required: true },
  "used-by": { required: false },
};

function recordToolOutput(options) {
  const sessionDir = resolveSessionDir(options.session);
  const exitCode = Number(options["exit-code"]);
  const result = Number.isNaN(exitCode) ? "unknown" : exitCode === 0 ? "passed" : "failed";
  const slug = `${sanitizeSlug(options.command)}-${timestampSlug()}.md`;
  const artifactPath = path.join(sessionDir, "artifacts", "tool-runs", slug);

  writeMarkdownArtifact(artifactPath, [
    "# Tool Run",
    "## Metadata",
    "",
    `command: ${options.command}`,
    `exit_code: ${Number.isNaN(exitCode) ? options["exit-code"] : exitCode}`,
    `result: ${result}`,
    `used_by: ${options["used-by"] || "harness-verify"}`,
    `created_at: ${new Date().toISOString()}`,
    "## Summary",
    "",
    options.summary,
    "## Output Excerpt",
    "",
    "```txt",
    "Full command output was not stored by default.",
    "```",
  ]);

  return {
    ok: true,
    status: "recorded",
    artifact: path.relative(process.cwd(), artifactPath).replace(/\\/g, "/"),
    result,
  };
}

function main() {
  try {
    const options = parseCliArgs(process.argv.slice(2), SPEC);
    if (options.help) {
      printHelp("record-tool-output.js", [
        "Usage:",
        '  node hooks/core/record-tool-output.js --session <path> --command "npm test" --exit-code 0 --summary "All tests passed" [--used-by harness-verify] [--json]',
      ]);
      return;
    }
    const sessionDir = resolveSessionDir(options.session);
    const result = recordToolOutput(options);
    try {
      const exitCode = Number(options["exit-code"]);
      appendHarnessEvent(findHarnessRoot(sessionDir), {
        type: "tool-run",
        command: options.command,
        exit_code: Number.isNaN(exitCode) ? options["exit-code"] : exitCode,
        result: result.result,
        used_by: options["used-by"] || "harness-verify",
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

module.exports = { recordToolOutput };
