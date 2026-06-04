"use strict";

const fs = require("node:fs");
const path = require("node:path");

function printHelp(scriptName, lines) {
  console.log(`${scriptName}\n\n${lines.join("\n")}`);
}

function parseCliArgs(argv, spec) {
  const options = { json: false, help: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    if (arg === "--json") {
      options.json = true;
      continue;
    }
    if (!arg.startsWith("--")) {
      continue;
    }
    const key = arg.slice(2);
    if (!Object.prototype.hasOwnProperty.call(spec, key)) {
      throw new Error(`Unknown argument: ${arg}`);
    }
    const def = spec[key];
    if (def.type === "boolean") {
      options[key] = true;
      continue;
    }
    const value = argv[index + 1];
    if (value === undefined || value.startsWith("--")) {
      throw new Error(`Missing value for ${arg}`);
    }
    options[key] = value;
    index += 1;
  }

  if (options.help) {
    return options;
  }

  for (const [key, def] of Object.entries(spec)) {
    if (def.required && (options[key] === undefined || options[key] === "")) {
      throw new Error(`Missing required --${key}`);
    }
  }

  return options;
}

function emitResult(result, jsonMode) {
  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }
  if (result.ok) {
    console.log(result.summary || "ok");
  } else {
    console.error(result.reason || result.summary || "blocked");
  }
}

function exitFromResult(result) {
  process.exit(result.ok ? 0 : 1);
}

function resolveSessionDir(sessionArg, cwd = process.cwd()) {
  const sessionPath = path.resolve(cwd, sessionArg);
  if (!fs.existsSync(sessionPath)) {
    throw new Error(`Session path not found: ${sessionArg}`);
  }
  return sessionPath;
}

function findHarnessRoot(sessionDir) {
  let current = sessionDir;
  while (current !== path.dirname(current)) {
    const harnessDir = path.join(current, ".harness");
    if (fs.existsSync(harnessDir)) {
      return path.dirname(harnessDir);
    }
    if (path.basename(current) === ".harness") {
      return path.dirname(current);
    }
    current = path.dirname(current);
  }
  throw new Error("Could not locate repository root from session path");
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function extractField(content, fieldName) {
  const match = content.match(new RegExp(`^${fieldName}:\\s*(.*)$`, "im"));
  return match ? match[1].trim() : null;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function timestampSlug(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, "-");
}

function sanitizeSlug(value) {
  return String(value).replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "record";
}

function writeMarkdownArtifact(filePath, sections) {
  ensureDir(path.dirname(filePath));
  const body = sections.filter(Boolean).join("\n\n");
  fs.writeFileSync(filePath, `${body.trim()}\n`, "utf8");
  return filePath;
}

module.exports = {
  emitResult,
  ensureDir,
  exitFromResult,
  extractField,
  findHarnessRoot,
  parseCliArgs,
  printHelp,
  readText,
  resolveSessionDir,
  sanitizeSlug,
  timestampSlug,
  writeMarkdownArtifact
};
