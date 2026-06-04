# Cursor Hook Fallback

Cursor does **not** claim Claude-style native lifecycle hooks in this harness.

Use:

- `.cursor/rules/*.mdc` for phase and blocking guardrails
- prompt templates for skill/workflow guidance
- manual invocation of `hooks/core/*.js` when you want portable guard/record behavior

Example:

```bash
node hooks/core/guard-phase.js --command harness-ship --session .harness/sessions/<id> --json
```
