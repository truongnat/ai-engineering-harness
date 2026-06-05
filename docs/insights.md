# Insights

`aih insights` summarizes local harness telemetry from `.harness/history/events.jsonl`.

Hooks append append-only JSON events when they record:

- phase guard decisions (`guard-phase`)
- skill runs (`record-skill-run`)
- tool runs (`record-tool-output`)
- subagent runs (`record-subagent-result`)

## Commands

```bash
aih insights
aih insights --target <path>
aih insights --target <path> --json
```

## Example output

```text
Harness Insights (/path/to/project/.harness/history/events.jsonl)
Events: 12

Skills:
  verification: 4

Phase guard blocks:
  harness-run: 2

Tools:
  npm test: 3 (1 failed)

Subagents:
  reviewer: 2
```

Events stay local and gitignored. Use insights to spot which guards, skills, and tools dominate your sessions before tuning rules or evals.
