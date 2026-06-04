#!/usr/bin/env node
"use strict";

const path = require("node:path");
const {
  emitResult,
  exitFromResult,
  parseCliArgs,
  printHelp,
  resolveSessionDir,
  sanitizeSlug,
  timestampSlug,
  writeMarkdownArtifact
} = require("./_util.js");

const SPEC = {
  session: { required: true },
  skill: { required: true },
  status: { required: true },
  summary: { required: true }
};

function recordSkillRun(options) {
  const sessionDir = resolveSessionDir(options.session);
  const slug = `${sanitizeSlug(options.skill)}-${timestampSlug()}.md`;
  const artifactPath = path.join(sessionDir, "skill-runs", slug);

  writeMarkdownArtifact(artifactPath, [
    "# Skill Run",
    "## Metadata",
    "",
    `skill: ${options.skill}`,
    `status: ${options.status}`,
    `created_at: ${new Date().toISOString()}`,
    "## Summary",
    "",
    options.summary,
    "## Outputs",
    "",
    "- Record skill outputs in session artifacts or linked files."
  ]);

  return {
    ok: true,
    status: "recorded",
    artifact: path.relative(process.cwd(), artifactPath).replace(/\\/g, "/")
  };
}

function main() {
  try {
    const options = parseCliArgs(process.argv.slice(2), SPEC);
    if (options.help) {
      printHelp("record-skill-run.js", [
        "Usage:",
        "  node hooks/core/record-skill-run.js --session <path> --skill verification --status completed --summary \"Checks recorded\" [--json]"
      ]);
      return;
    }
    const result = recordSkillRun(options);
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

module.exports = { recordSkillRun };
