#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const {
  emitResult,
  exitFromResult,
  parseCliArgs,
  printHelp,
  resolveSessionDir,
  writeMarkdownArtifact
} = require("./_util.js");

const SPEC = {
  session: { required: true },
  skill: { required: true },
  reason: { required: true },
  "promote-candidate": { required: false }
};

function archiveSessionSkill(options) {
  const sessionDir = resolveSessionDir(options.session);
  const skillDir = path.join(sessionDir, "skills", options.skill);
  const skillFile = path.join(skillDir, "SKILL.md");
  if (!fs.existsSync(skillFile)) {
    throw new Error(`Session skill not found: ${options.skill}`);
  }

  const disposalPath = path.join(skillDir, "DISPOSAL.md");
  writeMarkdownArtifact(disposalPath, [
    "# Skill Disposal",
    "## Skill",
    "",
    `id: ${options.skill}`,
    "## Final Status",
    "",
    "status: archived",
    "## Reason",
    "",
    options.reason,
    "## Reuse Decision",
    "",
    `promote_candidate: ${String(options["promote-candidate"] || "false").toLowerCase()}`,
    "## Archived At",
    "",
    new Date().toISOString().slice(0, 10)
  ]);

  let skillContent = fs.readFileSync(skillFile, "utf8");
  if (/^status:\s/m.test(skillContent)) {
    skillContent = skillContent.replace(/^status:\s.*$/m, "status: archived");
  } else {
    skillContent = skillContent.replace(/^---\n([\s\S]*?)---\n/, (match, body) => {
      return `---\n${body.trim()}\nstatus: archived\n---\n`;
    });
  }
  fs.writeFileSync(skillFile, skillContent, "utf8");

  return {
    ok: true,
    status: "archived",
    skill: options.skill,
    disposal: path.relative(process.cwd(), disposalPath).replace(/\\/g, "/")
  };
}

function main() {
  try {
    const options = parseCliArgs(process.argv.slice(2), SPEC);
    if (options.help) {
      printHelp("archive-session-skill.js", [
        "Usage:",
        "  node hooks/core/archive-session-skill.js --session <path> --skill <id> --reason \"Session complete\" [--promote-candidate false] [--json]",
        "",
        "Dispose means archive/deactivate, not delete."
      ]);
      return;
    }
    const result = archiveSessionSkill(options);
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

module.exports = { archiveSessionSkill };
