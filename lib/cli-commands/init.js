"use strict";

const fs = require("node:fs");
const path = require("node:path");

const { detectRecommendedProviders } = require("../cli-detect");
const { resolveTargetAbs } = require("../cli-command-helpers");
const { runInstallWizard } = require("./install");

const INIT_DEMO_GOAL = `# Init Demo Goal

Complete the harness quickstart by confirming install and running one deterministic eval task.

## Steps
1. Confirm \`.harness/\` exists after init.
2. Run \`aih eval list\` from the pack root to see sample tasks.
3. Optionally run \`aih eval run sample-bugfix --yes\` to preview A/B eval output.
`;

async function runInitWizard(packRoot, options) {
  const targetAbs = resolveTargetAbs(options.target);
  if (!fs.existsSync(targetAbs)) {
    throw new Error(`Target directory does not exist: ${targetAbs}`);
  }

  const recommended = detectRecommendedProviders(targetAbs);
  const providers =
    options.providers.length > 0
      ? options.providers
      : recommended.length > 0
        ? [recommended[0]]
        : ["cursor"];

  const initOptions = {
    ...options,
    command: "install",
    providers,
    yes: true,
    scope: options.scope || "project",
    visibility: options.visibility || "private",
  };

  process.stdout.write(
    `Initializing harness in ${targetAbs} for provider(s): ${providers.join(", ")}\n`
  );

  const status = await runInstallWizard(packRoot, initOptions);
  if (status !== 0) {
    return status;
  }

  const harnessDir = path.join(targetAbs, ".harness");
  if (!fs.existsSync(harnessDir)) {
    throw new Error("Init completed but .harness/ was not created.");
  }

  const demoGoalPath = path.join(harnessDir, "GOAL.md");
  if (!fs.existsSync(demoGoalPath)) {
    fs.writeFileSync(demoGoalPath, `${INIT_DEMO_GOAL}\n`, "utf8");
  }

  process.stdout.write("\nInit complete.\n");
  process.stdout.write("Next:\n");
  process.stdout.write("  npx ai-engineering-harness status\n");
  process.stdout.write("  npx ai-engineering-harness eval list\n");
  process.stdout.write("  npx ai-engineering-harness eval run sample-bugfix --yes\n");
  process.stdout.write(`See docs/first-5-minutes.md and docs/insights.md\n`);

  return 0;
}

module.exports = {
  runInitWizard,
};
