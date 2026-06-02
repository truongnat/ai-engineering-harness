const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const exportPaths = [
  "AGENTS.md",
  "commands",
  "skills",
  "workflows",
  "patterns",
  "templates",
  "docs/concepts.md",
  "docs/command-loop.md",
  "docs/artifact-layout.md",
  "docs/quality-gates.md",
  "docs/adoption-guide.md",
  "docs/usage-examples.md",
  "docs/host-repo-checklist.md",
  "docs/runtime-compatibility.md"
];

function parseArgs(argv) {
  const options = {
    target: process.cwd(),
    dryRun: false,
    force: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--target") {
      const value = argv[index + 1];
      if (!value) {
        throw new Error("Missing value for --target");
      }
      options.target = value;
      index += 1;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--force") {
      options.force = true;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    ...options,
    target: path.resolve(options.target)
  };
}

function listFiles(relativePath) {
  const sourcePath = path.join(root, relativePath);
  const stats = fs.statSync(sourcePath);

  if (stats.isFile()) {
    return [relativePath];
  }

  const files = [];

  for (const entry of fs.readdirSync(sourcePath, { withFileTypes: true })) {
    const childRelativePath = path.join(relativePath, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(childRelativePath));
    } else if (entry.isFile()) {
      files.push(childRelativePath);
    }
  }

  return files;
}

function ensureDirectory(filePath, dryRun) {
  const dirPath = path.dirname(filePath);
  if (dryRun || fs.existsSync(dirPath)) {
    return;
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

function installHarness(options) {
  const files = exportPaths.flatMap(listFiles).sort();
  const results = [];

  for (const relativePath of files) {
    const sourcePath = path.join(root, relativePath);
    const destinationPath = path.join(options.target, relativePath);
    const exists = fs.existsSync(destinationPath);

    if (exists && !options.force) {
      results.push({
        action: options.dryRun ? "WOULD SKIP" : "SKIP",
        relativePath,
        reason: "exists"
      });
      continue;
    }

    results.push({
      action: options.dryRun ? "WOULD COPY" : "COPY",
      relativePath,
      reason: exists ? "overwrite" : "new"
    });

    if (!options.dryRun) {
      ensureDirectory(destinationPath, false);
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }

  return results;
}

function formatResults(results) {
  return results.map((result) => `${result.action} ${result.relativePath}`).join("\n");
}

function summarizeResults(results) {
  return results.reduce(
    (summary, result) => {
      if (result.action.endsWith("COPY")) {
        summary.copied += 1;
      } else if (result.action.endsWith("SKIP")) {
        summary.skipped += 1;
      }
      return summary;
    },
    {
      copied: 0,
      skipped: 0,
      failed: 0
    }
  );
}

function formatSummary(options, summary) {
  return [
    "Install summary:",
    `- target: ${options.target}`,
    `- mode: ${options.dryRun ? "dry-run" : "write"}`,
    `- copied: ${summary.copied}`,
    `- skipped: ${summary.skipped}`,
    `- failed: ${summary.failed}`
  ].join("\n");
}

function formatNextSteps(options) {
  if (options.dryRun) {
    return [
      "Next steps:",
      "1. Review the files marked WOULD COPY.",
      `2. Run: node install.js --target ${options.target}`,
      "3. After install, create .harness/ profile artifacts."
    ].join("\n");
  }

  return [
    "Next steps:",
    "1. Open the target repository.",
    "2. Read AGENTS.md.",
    "3. Create .harness/HARNESS.md, TEAM.md, SKILLS.md, WORKFLOW.md, GATES.md, and MEMORY.md.",
    "4. Use docs/harness-build-usage.md for the profile creation flow.",
    `5. Validate: node validate.js --target ${options.target} --profile-only`
  ].join("\n");
}

function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const results = installHarness(options);
  const summary = summarizeResults(results);

  console.log(formatResults(results));
  console.log(formatSummary(options, summary));
  console.log(formatNextSteps(options));

  return results;
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  exportPaths,
  formatResults,
  formatNextSteps,
  formatSummary,
  installHarness,
  listFiles,
  main,
  parseArgs,
  summarizeResults
};
