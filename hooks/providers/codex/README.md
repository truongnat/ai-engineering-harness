# Codex Hook Fallback

Codex does **not** claim native harness lifecycle hooks in this install.

Use `AGENTS.md`, prompt templates, and portable core hooks invoked manually or from CI when needed.

```bash
node hooks/core/record-tool-output.js --session .harness/sessions/<id> --command "npm test" --exit-code 0 --summary "Passed"
```
