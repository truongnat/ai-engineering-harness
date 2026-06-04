"use strict";

const fs = require("node:fs");
const path = require("node:path");

/**
 * Ensure directory exists, respecting dryRun mode.
 * @param {string} dirPath - Directory to create
 * @param {boolean} dryRun - If true, don't actually create
 */
function ensureDirectory(dirPath, dryRun) {
  if (dryRun || fs.existsSync(dirPath)) {
    return;
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

/**
 * Write file with dryRun support.
 * @param {string} filePath - Full path to file
 * @param {string} content - File content
 * @param {Object} options - { dryRun, force }
 * @param {Function} logFn - Optional log function (default: console.log)
 */
function writeFileWithDryRun(filePath, content, options = {}, logFn = console.log) {
  const { dryRun = false, force = false } = options;
  const exists = fs.existsSync(filePath);

  if (exists && !force) {
    logFn(`${dryRun ? "WOULD SKIP" : "SKIP"} ${filePath}`);
    return;
  }

  if (exists && force) {
    logFn(`${dryRun ? "WOULD OVERWRITE" : "OVERWRITE"} ${filePath}`);
  } else {
    logFn(`${dryRun ? "WOULD CREATE" : "CREATE"} ${filePath}`);
  }

  if (!dryRun) {
    ensureDirectory(path.dirname(filePath), false);
    fs.writeFileSync(filePath, content, "utf8");
  }
}

/**
 * Log file action (CREATE, SKIP, OVERWRITE, etc.)
 * @param {string} action - Action name
 * @param {string} relativePath - Path to display
 */
function logAction(action, relativePath) {
  console.log(`${action} ${relativePath}`);
}

module.exports = {
  ensureDirectory,
  writeFileWithDryRun,
  logAction,
};
