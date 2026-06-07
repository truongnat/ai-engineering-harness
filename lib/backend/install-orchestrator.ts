/** In-process install orchestrator. */

import { applyPrivateIgnore } from "./git-hygiene";
import { initHarnessProfile } from "./harness-skeleton";
import { installCapabilityCache } from "../install-cache";
import { installRuntime } from "../install-runtime";
import { isRuntimeNative } from "../cli-providers";
import { isGitRepo } from "../provider-detection";
import type { RuntimeId } from "../install-runtime";

export interface InstallContext {
  packRoot: string;
  target: string; // absolute target dir
  provider: string; // provider/runtime id
  scope: string; // "project" | "global"
  visibility: string; // "private" | "shared"
  dryRun: boolean;
  initHarness: boolean;
  installCache: boolean;
  force?: boolean;
}

export interface InstallResult {
  ok: boolean;
  messages: string[];
}

interface InstallRunOptions {
  runtimeBannerVerb?: "install" | "update";
}

/** Resolve the effective ignore strategy from scope/visibility. */
function resolveIgnoreStrategy(scope: string, visibility: string): string {
  if (scope === "global") {
    return "none";
  }
  if (visibility === "shared") {
    return "none";
  }
  // project + private
  return "info-exclude";
}

/** Run the full install dispatch sequence in-process. */
export function runInstall(ctx: InstallContext, options: InstallRunOptions = {}): InstallResult {
  const messages: string[] = [];
  const force = ctx.force ?? false;

  try {
    const ignoreStrategy = resolveIgnoreStrategy(ctx.scope, ctx.visibility);

    const gitRepo = isGitRepo(ctx.target);
    if (ignoreStrategy === "info-exclude" && gitRepo) {
      process.stdout.write("\n--- Git exclude (private) ---\n");
    }
    applyPrivateIgnore({
      targetAbs: ctx.target,
      provider: ctx.provider,
      initHarness: ctx.initHarness,
      installCache: ctx.installCache,
      scope: ctx.scope,
      visibility: ctx.visibility,
      dryRun: ctx.dryRun,
      ignoreStrategy,
    });
    if (ignoreStrategy === "info-exclude" && gitRepo) {
      process.stdout.write("--- Git exclude complete ---\n\n");
    }
    messages.push("git-hygiene: ok");

    if (ctx.scope === "project" && ctx.installCache) {
      process.stdout.write("\n--- Capability cache (.ai-harness/) ---\n");
      const cacheResults = installCapabilityCache({
        packRoot: ctx.packRoot,
        target: ctx.target,
        dryRun: ctx.dryRun,
        force,
      });
      process.stdout.write("--- Capability cache complete ---\n\n");
      messages.push(`cache: ${cacheResults.length} entries`);
    }

    if (ctx.initHarness && ctx.scope === "project") {
      initHarnessProfile({
        targetAbs: ctx.target,
        dryRun: ctx.dryRun,
        force,
      });
      messages.push("harness-skeleton: ok");
    }

    const verb = options.runtimeBannerVerb ?? "install";
    const runtime = ctx.provider === "manual" ? "generic" : ctx.provider;
    if (isRuntimeNative(runtime)) {
      process.stdout.write(`\n--- Runtime-native ${verb} ---\n`);
      installRuntime({
        packRoot: ctx.packRoot,
        runtime: runtime as RuntimeId,
        scope: ctx.scope as "project" | "global",
        target: ctx.target,
        dryRun: ctx.dryRun,
        force,
      });
      process.stdout.write(`\nRuntime '${ctx.provider}' install finished.\n`);
      messages.push(`runtime-native(${ctx.provider}): ok`);
    }

    return { ok: true, messages };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    messages.push(`error: ${message}`);
    return { ok: false, messages };
  }
}
