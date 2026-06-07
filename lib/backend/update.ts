/** In-process update orchestrator. */

import { runInstall } from "./install-orchestrator";

export interface UpdateContext {
  packRoot: string;
  target: string;
  provider: string;
  scope: string;
  visibility: string;
  dryRun: boolean;
  /** Ignored — update always uses force=true. Present for forward-compat parity. */
  force?: boolean;
}

export interface UpdateResult {
  ok: boolean;
  messages: string[];
}

export function runUpdate(ctx: UpdateContext): UpdateResult {
  const messages: string[] = [];

  if (ctx.provider === "manual") {
    messages.push("error: Manual fallback update is not supported. Re-run install instead.");
    return { ok: false, messages };
  }

  if (ctx.scope === "global") {
    const notice = "Global update is planned but not implemented in this step.";
    if (ctx.dryRun) {
      process.stdout.write("\n--- Update ---\n");
      process.stdout.write(`${notice}\n`);
      messages.push(`notice: ${notice}`);
      return { ok: true, messages };
    }
    messages.push(`error: ${notice}`);
    return { ok: false, messages };
  }

  return runInstall(
    {
      packRoot: ctx.packRoot,
      target: ctx.target,
      provider: ctx.provider,
      scope: ctx.scope,
      visibility: ctx.visibility,
      dryRun: ctx.dryRun,
      initHarness: false,
      installCache: true,
      force: true,
    },
    {
      runtimeBannerVerb: "update",
    }
  );
}
