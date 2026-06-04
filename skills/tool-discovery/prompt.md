Run tool discovery for this repository session.

1. Read `.harness/TOOL_CONTEXT.md` if it exists.
2. Otherwise run `node scripts/discover-tools.js --markdown`.
3. Write or refresh `.harness/TOOL_CONTEXT.md`.
4. Prefer CodeGraph for repo structure when installed.
5. Stop with blocked output if a required capability has no safe fallback.
