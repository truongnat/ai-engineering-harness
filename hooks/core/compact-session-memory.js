#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const {
  emitResult,
  exitFromResult,
  findHarnessRoot,
  parseCliArgs,
  printHelp,
  readText,
  resolveSessionDir,
  writeMarkdownArtifact
} = require("./_util.js");

const SPEC = {
  session: { required: true },
  apply: { type: "boolean", required: false }
};

function extractLessons(sessionDir) {
  const lessons = [];
  for (const fileName of ["REMEMBER.md", "SHIP.md", "BLOCKED.md"]) {
    const filePath = path.join(sessionDir, fileName);
    if (!fs.existsSync(filePath)) {
      continue;
    }
    const content = readText(filePath);
    const lines = content.split("\n").map((line) => line.trim()).filter((line) => line.startsWith("- "));
    for (const line of lines.slice(0, 5)) {
      lessons.push(line.replace(/^-\s*/, ""));
    }
  }
  return lessons.filter(Boolean);
}

function compactSessionMemory(options) {
  const sessionDir = resolveSessionDir(options.session);
  const repoRoot = findHarnessRoot(sessionDir);
  const memoryPath = path.join(repoRoot, ".harness", "MEMORY.md");
  const lessons = extractLessons(sessionDir);

  const suggestion = [
    "# Harness Memory Suggestion",
    "",
    "## Durable Lessons",
    "",
    ...(lessons.length > 0 ? lessons.map((line) => `- ${line}`) : ["- No durable lessons extracted from this session yet."]),
    "",
    "## Known Hazards",
    "",
    "- Do not ship when VERIFY.md status is blocked or pending.",
    "",
    `generated_at: ${new Date().toISOString()}`
  ].join("\n");

  const suggestionPath = path.join(sessionDir, "artifacts", "memory-suggestion.md");
  writeMarkdownArtifact(suggestionPath, [suggestion]);

  if (options.apply) {
    let memory = fs.existsSync(memoryPath) ? readText(memoryPath) : "# Harness Memory\n\n## Durable Lessons\n\n";
    if (!memory.includes("## Durable Lessons")) {
      memory += "\n## Durable Lessons\n\n";
    }
    for (const lesson of lessons) {
      if (!memory.includes(lesson)) {
        memory = `${memory.trim()}\n- ${lesson}\n`;
      }
    }
    fs.writeFileSync(memoryPath, memory, "utf8");
  }

  return {
    ok: true,
    status: options.apply ? "applied" : "suggested",
    suggestion: path.relative(process.cwd(), suggestionPath).replace(/\\/g, "/"),
    lessonCount: lessons.length
  };
}

function main() {
  try {
    const options = parseCliArgs(process.argv.slice(2), SPEC);
    if (options.help) {
      printHelp("compact-session-memory.js", [
        "Usage:",
        "  node hooks/core/compact-session-memory.js --session <path> [--apply] [--json]",
        "",
        "Reads session REMEMBER/SHIP/BLOCKED and suggests durable memory updates.",
        "Does not erase history."
      ]);
      return;
    }
    const result = compactSessionMemory(options);
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

module.exports = { compactSessionMemory };
