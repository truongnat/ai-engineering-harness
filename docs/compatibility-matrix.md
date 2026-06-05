# Provider Compatibility Matrix

Generated from pack version **v1.0.1** and eval registry.

| Provider | Native slash | Subagents | Status | Eval tasks verified |
| --- | --- | --- | --- | --- |
| Claude Code | yes | yes | native-plugin | deterministic local (2 tasks) |
| Codex | rules/fallback | adapter | plugin-packaging | deterministic local (2 tasks) |
| Cursor | rules/fallback | adapter | plugin-ready | deterministic local (2 tasks) |
| Gemini CLI | rules/fallback | adapter | native-command-files | deterministic local (2 tasks) |

## Eval tasks

- `example-health-report` (workflow-discipline)
- `sample-bugfix` (bugfix)

Regenerate:

```bash
node scripts/generate-compatibility-matrix.js
```
