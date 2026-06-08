import fs from "node:fs";
import path from "node:path";

import type { ParseOptions } from "../cli-args";
import { resolveTargetAbs } from "../cli-command-helpers";
import { parseProjectAnalysis } from "../stack-detect";
import { writeDomainSkillSurface } from "../domain-skill-generation";

function readAnalysisInput(options: ParseOptions): string {
  if (options.analysisFile) {
    const resolved = path.isAbsolute(options.analysisFile)
      ? options.analysisFile
      : path.resolve(process.cwd(), options.analysisFile);
    if (!fs.existsSync(resolved)) {
      throw new Error(`Domain analysis file does not exist: ${resolved}`);
    }
    return fs.readFileSync(resolved, "utf8");
  }

  if (process.stdin.isTTY) {
    throw new Error("Provide --analysis-file or pipe project analysis JSON on stdin.");
  }

  const input = fs.readFileSync(0, "utf8");
  if (!input.trim()) {
    throw new Error("Project analysis JSON is required on stdin.");
  }
  return input;
}

function printWriteResult(
  selectedDomains: string[],
  result: { created: string[]; overwritten: string[]; skipped: string[] }
): void {
  const lines: string[] = [];
  lines.push(
    `Domain skills generated for: ${selectedDomains.length ? selectedDomains.join(", ") : "(none)"}`
  );
  lines.push("");

  const sections = [
    ["Created", result.created],
    ["Overwritten", result.overwritten],
    ["Skipped", result.skipped],
  ] as const;

  for (const [label, paths] of sections) {
    lines.push(`${label} (${paths.length})`);
    if (paths.length === 0) {
      lines.push("  (none)");
    } else {
      for (const p of paths) {
        lines.push(`  - ${p}`);
      }
    }
    lines.push("");
  }

  process.stdout.write(`${lines.join("\n").trimEnd()}\n`);
}

async function runDomainsCommand(packRoot: string, options: ParseOptions): Promise<number> {
  const targetAbs = resolveTargetAbs(options.target);
  if (!fs.existsSync(targetAbs)) {
    throw new Error(`Target directory does not exist: ${targetAbs}`);
  }

  const analysisText = readAnalysisInput(options);
  const analysis = parseProjectAnalysis(analysisText);
  const result = writeDomainSkillSurface(packRoot, targetAbs, analysis.domains, {
    packRoot,
    targetAbs,
    dryRun: options.dryRun,
    force: options.force,
  });

  printWriteResult(analysis.domains, result);
  return 0;
}

export { runDomainsCommand };
