const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const childProcess = require("node:child_process");

const target = path.join(process.env.RUNNER_TEMP || os.tmpdir(), "aih-smoke-install");
fs.mkdirSync(target, { recursive: true });

const result = childProcess.spawnSync(
  process.execPath,
  ["bin/aih.js", "install", "--provider", "generic", "--yes", "--target", target, "--dry-run"],
  {
    stdio: "inherit",
  }
);

process.exit(result.status ?? 1);
