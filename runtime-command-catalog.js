"use strict";

const fs = require("node:fs");
const path = require("node:path");

const COMMAND_NAMESPACE = "harness";
const CACHE_DIR = ".ai-harness";
const RUNTIME_COMMANDS_DIR = `${CACHE_DIR}/runtime-commands`;

/** @type {readonly { id: string, slash: string, title: string, sourceCommand: string, description: string }[]} */
const HARNESS_COMMANDS = Object.freeze([
  {
    id: "start",
    slash: "/harness:start",
    title: "Harness Start",
    sourceCommand: "commands/harness-start.md",
    description: "Start or resume work on the active goal in this repository."
  },
  {
    id: "map",
    slash: "/harness:map",
    title: "Harness Map",
    sourceCommand: "commands/harness-map.md",
    description: "Map affected codebase areas for the current goal."
  },
  {
    id: "discuss",
    slash: "/harness:discuss",
    title: "Harness Discuss",
    sourceCommand: "commands/harness-discuss.md",
    description: "Discuss scope, constraints, and approach before planning."
  },
  {
    id: "plan",
    slash: "/harness:plan",
    title: "Harness Plan",
    sourceCommand: "commands/harness-plan.md",
    description: "Create or update a project-scoped implementation plan."
  },
  {
    id: "run",
    slash: "/harness:run",
    title: "Harness Run",
    sourceCommand: "commands/harness-run.md",
    description: "Execute the approved plan with evidence-backed progress."
  },
  {
    id: "verify",
    slash: "/harness:verify",
    title: "Harness Verify",
    sourceCommand: "commands/harness-verify.md",
    description: "Verify implementation against gates and proof requirements."
  },
  {
    id: "ship",
    slash: "/harness:ship",
    title: "Harness Ship",
    sourceCommand: "commands/harness-ship.md",
    description: "Ship completed work with status aligned to proof."
  },
  {
    id: "remember",
    slash: "/harness:remember",
    title: "Harness Remember",
    sourceCommand: "commands/harness-remember.md",
    description: "Record durable lessons in project memory."
  },
  {
    id: "status",
    slash: "/harness:status",
    title: "Harness Status",
    sourceCommand: "commands/harness-status.md",
    description: "Summarize harness install and project state for this repo."
  },
  {
    id: "doctor",
    slash: "/harness:doctor",
    title: "Harness Doctor",
    sourceCommand: "commands/harness-doctor.md",
    description: "Check harness readiness for this repository."
  }
]);

const SLASH_COMMANDS = HARNESS_COMMANDS.map((c) => c.slash);

function activationMarkdown() {
  return `# ai-engineering-harness — project activation

This repository uses a **project-local** harness install. Every \`/harness:*\` command applies **only to this repo**.

## Before any /harness:* command

1. Read \`.ai-harness/manifest.json\`.
2. Read this file (\`.ai-harness/activation.md\`).
3. Use only \`.ai-harness/commands/\`, \`.ai-harness/skills/\`, \`.ai-harness/workflows/\`, and \`.ai-harness/patterns/\` under **this** repository.
4. Use only \`.harness/\` for project-specific state (goals, memory, gates).
5. **Do not** use global skills, sibling-repo harness files, or source-pack paths unless the user explicitly asks.

## If install is incomplete

- If \`.ai-harness/\` is missing: stop and tell the user to run \`npx ai-engineering-harness install\`.
- If \`.harness/\` is missing: warn; some commands need project state — offer to init or continue with reduced context.

## Command routing

Slash commands map to \`.ai-harness/runtime-commands/harness-<id>.md\`, which points at the matching \`.ai-harness/commands/harness-<id>.md\` file.

## Namespace

Command namespace: \`${COMMAND_NAMESPACE}\` (e.g. \`/harness:plan\`, \`/harness:verify\`).
`;
}

function renderRuntimeCommandFile(spec) {
  const sourcePath = `.ai-harness/${spec.sourceCommand}`;
  return `# ${spec.slash}

**${spec.title}** — ${spec.description}

This command is **project-scoped** for the repository that contains this \`.ai-harness/\` directory.

## Before doing anything

1. Read \`.ai-harness/manifest.json\`.
2. Read \`.ai-harness/activation.md\`.
3. Read \`${sourcePath}\`.
4. Read relevant artifacts under \`.harness/\` (goals, STATE, PLAN, etc.).
5. Do **not** use global or sibling-repo harness files unless the user explicitly requests it.

## Then

Execute the workflow defined in \`${sourcePath}\` for **this repository only**.
`;
}

function renderClaudeCommandFile(spec) {
  return `---
description: ${spec.title} — project-scoped (${spec.slash})
---

${renderRuntimeCommandFile(spec)}
`;
}

function renderCursorCommandFile(spec) {
  return renderRuntimeCommandFile(spec);
}

function renderCursorCommandsRuleMdc() {
  const lines = [
    "---",
    "description: ai-engineering-harness slash command mappings (fallback — native Cursor slash commands not claimed)",
    "globs:",
    "alwaysApply: true",
    "---",
    "",
    "# Harness slash commands (this repo)",
    "",
    "When the user invokes a harness command (e.g. `/harness:plan`), treat it as **project-scoped** for this repository.",
    "",
    "Always read `.ai-harness/activation.md` first, then the matching file under `.ai-harness/runtime-commands/`, then `.ai-harness/commands/`.",
    "",
    "Do not use global or other-repo harness skills.",
    "",
    "## Command map",
    ""
  ];
  for (const spec of HARNESS_COMMANDS) {
    lines.push(
      `- **${spec.slash}** → read \`.ai-harness/runtime-commands/harness-${spec.id}.md\` → \`.ai-harness/${spec.sourceCommand}\``
    );
  }
  return `${lines.join("\n")}\n`;
}

function renderAgentsCommandAliasesSection() {
  const lines = [
    "",
    "## Harness slash commands (project-scoped)",
    "",
    "This repository exposes deterministic **local** command aliases. They activate **only** this repo's harness:",
    "",
    "1. `.ai-harness/activation.md`",
    "2. `.ai-harness/runtime-commands/harness-<command>.md`",
    "3. `.ai-harness/commands/harness-<command>.md`",
    "4. `.harness/` project state",
    "",
    "Do not use global or sibling-repo harness files unless the user explicitly asks.",
    "",
    "| Command | Local routing |",
    "|---------|---------------|",
    ""
  ];
  for (const spec of HARNESS_COMMANDS) {
    lines.push(
      `| ${spec.slash} | \`.ai-harness/runtime-commands/harness-${spec.id}.md\` → \`.ai-harness/${spec.sourceCommand}\` |`
    );
  }
  return `${lines.join("\n")}\n`;
}

function renderGeminiCommandsReadme() {
  const lines = [
    "# Harness slash commands (Gemini)",
    "",
    "Project-scoped commands for this extension. Read `.ai-harness/activation.md` first.",
    "",
    "| Command | File |",
    "|---------|------|",
    ""
  ];
  for (const spec of HARNESS_COMMANDS) {
    lines.push(`| ${spec.slash} | \`commands/harness-${spec.id}.md\` (in extension) or \`.ai-harness/runtime-commands/harness-${spec.id}.md\` |`);
  }
  return `${lines.join("\n")}\n`;
}

function renderOpencodeCommandAppendix() {
  return [
    "",
    "/* Harness slash commands — project-scoped; read .ai-harness/activation.md first */",
    "/*",
    ...HARNESS_COMMANDS.map(
      (s) =>
        ` * ${s.slash} -> .ai-harness/runtime-commands/harness-${s.id}.md -> .ai-harness/${s.sourceCommand}`
    ),
    " */",
    ""
  ].join("\n");
}

function buildManifest(providerEntrypoints = {}) {
  return {
    package: "ai-engineering-harness",
    commandNamespace: COMMAND_NAMESPACE,
    commandsInstalled: true,
    slashCommands: [...SLASH_COMMANDS],
    runtimeCommandsDir: RUNTIME_COMMANDS_DIR,
    providerCommandEntrypoints: providerEntrypoints
  };
}

function writeFile(targetRoot, relativePath, content, options) {
  const dest = path.join(targetRoot, relativePath);
  const exists = fs.existsSync(dest);
  const action = exists
    ? options.force
      ? options.dryRun
        ? "WOULD OVERWRITE"
        : "OVERWRITE"
      : options.dryRun
        ? "WOULD SKIP"
        : "SKIP"
    : options.dryRun
      ? "WOULD CREATE"
      : "CREATE";

  if (action === "SKIP" || action === "WOULD SKIP") {
    return { action, relativePath };
  }

  if (!options.dryRun) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, content, "utf8");
  }
  return { action, relativePath };
}

function installRuntimeCommandCatalog(targetRoot, options = {}) {
  const opts = { dryRun: false, force: false, ...options };
  const results = [];

  results.push(
    writeFile(targetRoot, `${CACHE_DIR}/activation.md`, activationMarkdown(), opts)
  );
  for (const spec of HARNESS_COMMANDS) {
    results.push(
      writeFile(
        targetRoot,
        `${RUNTIME_COMMANDS_DIR}/harness-${spec.id}.md`,
        renderRuntimeCommandFile(spec),
        opts
      )
    );
  }

  const manifestPath = `${CACHE_DIR}/manifest.json`;
  let existingProviders = {};
  const manifestDest = path.join(targetRoot, manifestPath);
  if (fs.existsSync(manifestDest)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(manifestDest, "utf8"));
      if (parsed.providerCommandEntrypoints && typeof parsed.providerCommandEntrypoints === "object") {
        existingProviders = parsed.providerCommandEntrypoints;
      }
    } catch {
      /* replace invalid manifest */
    }
  }
  const manifest = buildManifest(existingProviders);
  results.push(
    writeFile(targetRoot, manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, {
      ...opts,
      force: true
    })
  );

  return results;
}

function mergeManifestProviders(targetRoot, runtime, paths, options = {}) {
  const cacheDir = path.join(targetRoot, CACHE_DIR);
  if (!fs.existsSync(cacheDir)) {
    return { action: "SKIP", relativePath: `${CACHE_DIR}/manifest.json` };
  }
  const manifestPath = path.join(targetRoot, `${CACHE_DIR}/manifest.json`);
  let manifest = buildManifest();
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = { ...buildManifest(), ...JSON.parse(fs.readFileSync(manifestPath, "utf8")) };
    } catch {
      /* reset */
    }
  }
  manifest.providerCommandEntrypoints = manifest.providerCommandEntrypoints || {};
  manifest.providerCommandEntrypoints[runtime] = paths;
  return writeFile(targetRoot, `${CACHE_DIR}/manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`, {
    ...options,
    force: true
  });
}

function providerCommandPathsForRuntime(runtime, scope) {
  if (scope !== "project") {
    return [];
  }
  switch (runtime) {
    case "claude":
      return [".claude/commands/harness/"];
    case "cursor":
      return [
        ".cursor/rules/ai-engineering-harness-commands.mdc",
        ".cursor/commands/"
      ];
    case "gemini":
      return [".gemini/extensions/ai-engineering-harness/commands/"];
    case "opencode":
      return [".opencode/plugins/ai-engineering-harness.js"];
    case "codex":
    case "generic":
      return ["AGENTS.md"];
    default:
      return [];
  }
}

function installClaudeHarnessCommands(targetRoot, packRoot, options) {
  const results = [];
  for (const spec of HARNESS_COMMANDS) {
    results.push(
      writeFile(
        targetRoot,
        `.claude/commands/harness/${spec.id}.md`,
        renderClaudeCommandFile(spec),
        options
      )
    );
  }
  results.push(mergeManifestProviders(targetRoot, "claude", providerCommandPathsForRuntime("claude", "project"), options));
  return results;
}

function installCursorHarnessCommands(targetRoot, options) {
  const results = [];
  for (const spec of HARNESS_COMMANDS) {
    results.push(
      writeFile(
        targetRoot,
        `.cursor/commands/harness-${spec.id}.md`,
        renderCursorCommandFile(spec),
        options
      )
    );
  }
  results.push(
    writeFile(
      targetRoot,
      ".cursor/rules/ai-engineering-harness-commands.mdc",
      renderCursorCommandsRuleMdc(),
      options
    )
  );
  results.push(mergeManifestProviders(targetRoot, "cursor", providerCommandPathsForRuntime("cursor", "project"), options));
  return results;
}

function appendAgentsCommandAliases(agentsPath, options) {
  const marker = "## Harness slash commands (project-scoped)";
  const harnessMarker = "ai-engineering-harness";
  let content = fs.existsSync(agentsPath) ? fs.readFileSync(agentsPath, "utf8") : "";
  if (content && !content.includes(harnessMarker) && !content.includes(marker)) {
    return {
      action: options.dryRun ? "WOULD SKIP" : "SKIP",
      relativePath: path.basename(agentsPath),
      reason: "no-harness-marker"
    };
  }
  if (content.includes(marker)) {
    const before = content.split(marker)[0].trimEnd();
    content = `${before}\n${renderAgentsCommandAliasesSection()}`;
  } else if (
    fs.existsSync(agentsPath) &&
    !content.includes("ai-engineering-harness") &&
    !options.force
  ) {
    return { action: "SKIP", relativePath: path.basename(agentsPath) };
  } else {
    content = `${content.trimEnd()}\n${renderAgentsCommandAliasesSection()}`;
  }
  if (!options.dryRun) {
    fs.mkdirSync(path.dirname(agentsPath), { recursive: true });
    fs.writeFileSync(agentsPath, content, "utf8");
  }
  return { action: options.dryRun ? "WOULD UPDATE" : "UPDATE", relativePath: path.basename(agentsPath) };
}

function installGeminiHarnessCommands(targetRoot, options) {
  const extRoot = path.join(targetRoot, ".gemini/extensions/ai-engineering-harness");
  const results = [];
  for (const spec of HARNESS_COMMANDS) {
    results.push(
      writeFile(
        targetRoot,
        `.gemini/extensions/ai-engineering-harness/commands/harness-${spec.id}.md`,
        renderRuntimeCommandFile(spec),
        options
      )
    );
  }
  results.push(
    writeFile(
      targetRoot,
      ".gemini/extensions/ai-engineering-harness/commands/README.md",
      renderGeminiCommandsReadme(),
      options
    )
  );
  const geminiMd = path.join(extRoot, "GEMINI.md");
  if (fs.existsSync(geminiMd)) {
    let body = fs.readFileSync(geminiMd, "utf8");
    const marker = "## Harness slash commands";
    if (!body.includes(marker)) {
      body = `${body.trimEnd()}\n\n## Harness slash commands\n\nRead \`.ai-harness/activation.md\` first. Use extension \`commands/harness-*.md\` or \`.ai-harness/runtime-commands/\` for ${SLASH_COMMANDS.join(", ")}.\n`;
      results.push(writeFile(targetRoot, ".gemini/extensions/ai-engineering-harness/GEMINI.md", body, { ...options, force: true }));
    }
  }
  results.push(mergeManifestProviders(targetRoot, "gemini", providerCommandPathsForRuntime("gemini", "project"), options));
  return results;
}

function installOpencodeHarnessCommands(targetRoot, options) {
  const pluginPath = path.join(targetRoot, ".opencode/plugins/ai-engineering-harness.js");
  if (!fs.existsSync(pluginPath)) {
    return [];
  }
  let body = fs.readFileSync(pluginPath, "utf8");
  const marker = "Harness slash commands — project-scoped";
  if (!body.includes(marker)) {
    body = body.replace(
      /export const AiEngineeringHarnessPlugin/,
      `${renderOpencodeCommandAppendix()}export const AiEngineeringHarnessPlugin`
    );
  }
  const results = [
    writeFile(targetRoot, ".opencode/plugins/ai-engineering-harness.js", body, { ...options, force: true })
  ];
  results.push(mergeManifestProviders(targetRoot, "opencode", providerCommandPathsForRuntime("opencode", "project"), options));
  return results;
}

function installProviderCommandSurface(runtime, scope, targetRoot, packRoot, options) {
  if (scope !== "project") {
    return [];
  }
  switch (runtime) {
    case "claude":
      return installClaudeHarnessCommands(targetRoot, packRoot, options);
    case "cursor":
      return installCursorHarnessCommands(targetRoot, options);
    case "gemini":
      return installGeminiHarnessCommands(targetRoot, options);
    case "opencode":
      return installOpencodeHarnessCommands(targetRoot, options);
    case "codex":
    case "generic": {
      const agentsPath = path.join(targetRoot, "AGENTS.md");
      const results = [];
      if (fs.existsSync(agentsPath) || !options.dryRun) {
        results.push(appendAgentsCommandAliases(agentsPath, options));
      }
      results.push(
        mergeManifestProviders(targetRoot, runtime, providerCommandPathsForRuntime(runtime, "project"), options)
      );
      return results;
    }
    default:
      return [];
  }
}

function runtimeCommandCatalogPathsForPlan(providerId, scope) {
  const paths = [];
  if (scope === "project") {
    paths.push(`${RUNTIME_COMMANDS_DIR}/`);
    paths.push(`${CACHE_DIR}/activation.md`);
    paths.push(`${CACHE_DIR}/manifest.json`);
    for (const spec of HARNESS_COMMANDS) {
      switch (providerId) {
        case "claude":
          paths.push(`.claude/commands/harness/${spec.id}.md`);
          break;
        case "cursor":
          paths.push(`.cursor/commands/harness-${spec.id}.md`);
          break;
        case "gemini":
          paths.push(`.gemini/extensions/ai-engineering-harness/commands/harness-${spec.id}.md`);
          break;
        default:
          break;
      }
    }
    if (providerId === "cursor") {
      paths.push(".cursor/rules/ai-engineering-harness-commands.mdc");
    }
    if (providerId === "codex" || providerId === "generic") {
      paths.push("AGENTS.md (command aliases)");
    }
  }
  return [...new Set(paths)];
}

function fileReferencesActivation(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8").includes(".ai-harness/activation.md");
  } catch {
    return false;
  }
}

module.exports = {
  COMMAND_NAMESPACE,
  HARNESS_COMMANDS,
  SLASH_COMMANDS,
  RUNTIME_COMMANDS_DIR,
  activationMarkdown,
  renderAgentsCommandAliasesSection,
  renderRuntimeCommandFile,
  installRuntimeCommandCatalog,
  installProviderCommandSurface,
  providerCommandPathsForRuntime,
  runtimeCommandCatalogPathsForPlan,
  fileReferencesActivation,
  buildManifest
};
