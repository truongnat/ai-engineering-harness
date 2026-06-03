/**
 * OpenCode plugin: remind the agent to use .harness/ profile artifacts.
 * Installed to .opencode/plugins/ or ~/.config/opencode/plugins/
 */
export const AiEngineeringHarnessPlugin = async () => {
  return {
    "session.created": async () => {
      // Lightweight bootstrap; full skills live in the pack repo, not the product root.
      console.log(
        "[ai-engineering-harness] Read .ai-harness/AGENTS.md and use .ai-harness/commands/, " +
          ".ai-harness/skills/, .ai-harness/workflows/. Read .harness/ for project state."
      );
    }
  };
};
