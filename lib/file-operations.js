"use strict";

const fs = require("node:fs");
const path = require("node:path");

/**
 * Ensure a directory exists, creating it recursively if needed.
 * Respects dry-run mode for safe preview execution.
 *
 * @param {string} dirPath - Full path to directory
 * @param {boolean} [dryRun=false] - If true, don't actually create
 * @returns {void}
 *
 * @example
 * ```javascript
 * ensureDirectory('./output', false); // Creates directory
 * ensureDirectory('./output', true);  // Dry run - shows what would happen
 * ```
 */
function ensureDirectory(dirPath, dryRun) {
  if (dryRun || fs.existsSync(dirPath)) {
    return;
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

/**
 * Write a file with optional dry-run and force overwrite flags.
 * Logs each file operation (CREATE, SKIP, OVERWRITE) for visibility.
 *
 * @param {string} filePath - Full path to file
 * @param {string} content - File content to write
 * @param {Object} [options] - Configuration options
 * @param {boolean} [options.dryRun=false] - If true, show plan without writing
 * @param {boolean} [options.force=false] - If true, overwrite existing files
 * @param {Function} [logFn=console.log] - Optional logging function
 * @returns {void}
 *
 * @example
 * ```javascript
 * // Create a new file
 * writeFileWithDryRun('output.txt', 'content', { dryRun: false });
 *
 * // Dry run - show what would happen
 * writeFileWithDryRun('output.txt', 'content', { dryRun: true });
 *
 * // Overwrite existing file
 * writeFileWithDryRun('output.txt', 'content', { force: true });
 *
 * // Custom logging
 * writeFileWithDryRun('output.txt', 'content', {}, (msg) => {
 *   console.log(`[FILE] ${msg}`);
 * });
 * ```
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
 * Log a file operation action (CREATE, SKIP, OVERWRITE, etc.).
 * Simple helper for consistent logging across installation operations.
 *
 * @param {string} action - Action name (e.g., 'CREATE', 'SKIP', 'OVERWRITE')
 * @param {string} relativePath - Path to display (typically relative to project root)
 * @returns {void}
 *
 * @example
 * ```javascript
 * logAction('CREATE', 'AGENTS.md');
 * logAction('SKIP', 'commands/harness-start.md');
 * ```
 */
function logAction(action, relativePath) {
  console.log(`${action} ${relativePath}`);
}

module.exports = {
  ensureDirectory,
  writeFileWithDryRun,
  logAction,
};
