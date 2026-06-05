#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const { loadProviderManifests } = require(path.join(repoRoot, "lib", "provider-registry.js"));
const { loadRegistry } = require(path.join(repoRoot, "lib", "evals", "task-registry.js"));

function buildMatrix() {
  const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"));
  const providers = loadProviderManifests(repoRoot);
  const registry = loadRegistry(repoRoot);

  const lines = [
    "# Provider Compatibility Matrix",
    "",
    `Generated from pack version **v${pkg.version}** and eval registry.`,
    "",
    "| Provider | Native slash | Subagents | Status | Eval tasks verified |",
    "| --- | --- | --- | --- | --- |",
  ];

  for (const provider of providers) {
    lines.push(
      `| ${provider.label} | ${provider.nativeSlashCommands ? "yes" : "rules/fallback"} | ${provider.supportsSubagents ? "yes" : "adapter"} | ${provider.status} | deterministic local (${registry.tasks.length} tasks) |`
    );
  }

  lines.push("", "## Eval tasks", "");
  for (const task of registry.tasks) {
    lines.push(`- \`${task.id}\` (${task.mode})`);
  }

  lines.push(
    "",
    "Regenerate:",
    "",
    "```bash",
    "node scripts/generate-compatibility-matrix.js",
    "```",
    ""
  );

  return `${lines.join("\n")}`;
}

function main() {
  const outputPath = path.join(repoRoot, "docs", "compatibility-matrix.md");
  fs.writeFileSync(outputPath, buildMatrix(), "utf8");
  process.stdout.write(`${outputPath}\n`);
}

if (require.main === module) {
  main();
}

module.exports = {
  buildMatrix,
};
