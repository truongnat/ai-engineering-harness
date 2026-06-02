const fs = require("fs");
const path = require("path");

const root = __dirname;

const requiredFiles = [
  "README.md",
  "AGENTS.md",
  "package.json",
  "install.js",
  "validate.js",
  "commands/harness-map.md",
  "commands/harness-start.md",
  "commands/harness-discuss.md",
  "commands/harness-plan.md",
  "commands/harness-run.md",
  "commands/harness-verify.md",
  "commands/harness-ship.md",
  "commands/harness-remember.md",
  "skills/README.md",
  "skills/using-harness/SKILL.md",
  "skills/mapping-codebase/SKILL.md",
  "skills/discussing-goals/SKILL.md",
  "skills/writing-plans/SKILL.md",
  "skills/executing-plans/SKILL.md",
  "skills/test-driven-development/SKILL.md",
  "skills/code-review/SKILL.md",
  "skills/verification/SKILL.md",
  "skills/remembering/SKILL.md",
  "skills/writing-skills/SKILL.md",
  "workflows/README.md",
  "workflows/core-loop.md",
  "workflows/feature.md",
  "workflows/bugfix.md",
  "workflows/refactor.md",
  "workflows/code-review.md",
  "workflows/incident.md",
  "patterns/README.md",
  "patterns/pipeline.md",
  "patterns/producer-reviewer.md",
  "patterns/fan-out-fan-in.md",
  "patterns/expert-pool.md",
  "patterns/supervisor.md",
  "patterns/hierarchical-delegation.md",
  "templates/PROJECT.md",
  "templates/REQUIREMENTS.md",
  "templates/ROADMAP.md",
  "templates/STATE.md",
  "templates/CONTEXT.md",
  "templates/GOAL.md",
  "templates/DISCUSSION.md",
  "templates/PLAN.md",
  "templates/TASKS.md",
  "templates/REVIEW.md",
  "templates/VERIFY.md",
  "templates/SHIP.md",
  "templates/REMEMBER.md",
  "docs/concepts.md",
  "docs/architecture.md",
  "docs/command-loop.md",
  "docs/artifact-layout.md",
  "docs/quality-gates.md",
  "docs/roadmap.md"
];

const commandHeadings = [
  "## Purpose",
  "## When To Use",
  "## Required Reads",
  "## Skills To Use",
  "## Step-By-Step Workflow",
  "## Output Artifacts",
  "## Completion Gate"
];

const skillHeadings = [
  "## Purpose",
  "## When To Use",
  "## When Not To Use",
  "## Workflow",
  "## Operating Principles",
  "## Output Format",
  "## Checklist Before Done"
];

function assertExists(relativePath, failures) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`Missing required path: ${relativePath}`);
  }
}

function assertHeadings(relativePath, headings, failures) {
  const fullPath = path.join(root, relativePath);
  const content = fs.readFileSync(fullPath, "utf8");
  for (const heading of headings) {
    if (!content.includes(heading)) {
      failures.push(`${relativePath} is missing heading: ${heading}`);
    }
  }
}

const failures = [];

for (const relativePath of requiredFiles) {
  assertExists(relativePath, failures);
}

if (failures.length === 0) {
  for (const relativePath of requiredFiles.filter((file) => file.startsWith("commands/"))) {
    assertHeadings(relativePath, commandHeadings, failures);
  }

  for (const relativePath of requiredFiles.filter((file) => file.endsWith("/SKILL.md"))) {
    assertHeadings(relativePath, skillHeadings, failures);
  }
}

if (failures.length > 0) {
  console.error("Harness validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Harness validation passed. Checked ${requiredFiles.length} required files.`);
