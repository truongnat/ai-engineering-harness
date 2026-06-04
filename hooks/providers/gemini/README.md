# Gemini Hook Fallback

Gemini does **not** claim native harness lifecycle hooks in this install.

Use extension context (`GEMINI.md`), prompt templates, and portable core hooks when explicit recording is required.

```bash
node hooks/core/guard-phase.js --command harness-verify --session .harness/sessions/<id> --json
```
