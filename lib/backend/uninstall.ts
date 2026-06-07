/**
 * Uninstall orchestrator.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { uninstallPathsForProvider, HARNESS_MARKER } from "./constants";
import { removeIgnoreBlock } from "./git-hygiene";
import { isGitRepo } from "../provider-detection";

export interface UninstallContext {
  targetAbs: string;
  provider: string;
  scope: string; // "project" | "global"
  dryRun: boolean;
  removeCache: boolean;
  removeState: boolean;
  all: boolean;
}

export interface UninstallResult {
  ok: boolean;
  messages: string[];
}

function fileContainsHarnessMarker(filePath: string): boolean {
  if (!fs.existsSync(filePath)) return false;
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return content.includes(HARNESS_MARKER);
  } catch {
    return false;
  }
}

/** Remove a file only when its ownership policy allows it. */
function removeFileIfHarnessOwned(
  rel: string,
  ownership: "marker" | "claude-settings" | "always",
  targetAbs: string,
  dryRun: boolean
): void {
  const absPath = path.join(targetAbs, rel);

  if (!fs.existsSync(absPath)) {
    process.stdout.write(`SKIP ${rel}\n`);
    return;
  }

  if (ownership === "marker" && !fileContainsHarnessMarker(absPath)) {
    process.stdout.write(`SKIP ${rel} (not clearly harness-owned)\n`);
    return;
  }

  if (ownership === "claude-settings") {
    process.stdout.write(`SKIP ${rel} (not clearly harness-owned)\n`);
    return;
  }

  if (dryRun) {
    process.stdout.write(`WOULD REMOVE ${rel}\n`);
    return;
  }

  if (fs.statSync(absPath).isDirectory()) {
    fs.rmSync(absPath, { recursive: true, force: true });
  } else {
    fs.unlinkSync(absPath);
  }
  process.stdout.write(`REMOVE ${rel}\n`);
}

/** Remove a directory when requested. */
function removeDirIfRequested(
  rel: string,
  shouldRemove: boolean,
  targetAbs: string,
  dryRun: boolean
): void {
  if (!shouldRemove) {
    if (dryRun) {
      process.stdout.write(`WOULD KEEP ${rel}\n`);
    } else {
      process.stdout.write(`KEEP ${rel}\n`);
    }
    return;
  }

  const absPath = path.join(targetAbs, rel);
  if (!fs.existsSync(absPath)) {
    process.stdout.write(`SKIP ${rel}\n`);
    return;
  }

  if (dryRun) {
    process.stdout.write(`WOULD REMOVE ${rel}\n`);
    return;
  }

  fs.rmSync(absPath, { recursive: true, force: true });
  process.stdout.write(`REMOVE ${rel}\n`);
}

/** Remove provider-owned files plus optional cache/state directories. */
export function runUninstall(ctx: UninstallContext): UninstallResult {
  const messages: string[] = [];

  if (ctx.scope === "global") {
    if (ctx.dryRun) {
      process.stdout.write("\n--- Uninstall ---\n");
      process.stdout.write("Global uninstall is planned but not implemented in this step.\n");
      return {
        ok: true,
        messages: ["Global uninstall is planned but not implemented in this step."],
      };
    }
    return {
      ok: false,
      messages: ["Global uninstall is planned but not implemented in this step."],
    };
  }

  const removeCache = ctx.all || ctx.removeCache;
  const removeState = ctx.all || ctx.removeState;

  process.stdout.write("\n--- Uninstall ---\n");

  const paths = uninstallPathsForProvider(ctx.provider);
  for (const rel of paths) {
    if (!rel) continue;

    let ownership: "marker" | "claude-settings" | "always";
    if (rel === "AGENTS.md") {
      ownership = "marker";
    } else if (rel === ".claude/settings.json") {
      ownership = "claude-settings";
    } else {
      ownership = "always";
    }

    removeFileIfHarnessOwned(rel, ownership, ctx.targetAbs, ctx.dryRun);
  }

  removeDirIfRequested(".ai-harness", removeCache, ctx.targetAbs, ctx.dryRun);
  removeDirIfRequested(".harness", removeState, ctx.targetAbs, ctx.dryRun);

  if (isGitRepo(ctx.targetAbs)) {
    removeIgnoreBlock({ targetAbs: ctx.targetAbs, dryRun: ctx.dryRun });
  } else {
    process.stdout.write("SKIP .git/info/exclude\n");
  }

  process.stdout.write("--- Uninstall complete ---\n");
  messages.push("uninstall: ok");
  return { ok: true, messages };
}
