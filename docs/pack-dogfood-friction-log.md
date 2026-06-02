# Pack Dogfood Friction Log

Structured log for `v0.8.0` real capability pack dogfood. Add one entry per friction observed.

Do not paste secrets, tokens, customer data, or private business details. Summarize patterns and redact sensitive names.

## Entries

| Date | Scenario | Friction | Severity | Evidence | Proposed Fix | Classification |
|---|---|---|---|---|---|---|
| | | | low / medium / high | | | |

### Severity

- **low**: annoyance; workaround exists
- **medium**: slows adoption; docs or small doc fix likely
- **high**: blocks scenario completion without manual intervention

### Classification

- **v0.8.x fix**: address in dogfood patch docs or small clarifications before `v0.8.0` ships
- **v0.9 contract candidate**: may require contract freeze or validator change in `v0.9.0`
- **v1 blocker**: must resolve before `v1.0.0`
- **later optional work**: automation, adapters, marketplace—explicitly deferred

## Example Entry (delete when real entries exist)

| Date | Scenario | Friction | Severity | Evidence | Proposed Fix | Classification |
|---|---|---|---|---|---|---|
| YYYY-MM-DD | A | Agent opened source pack instead of target repo | medium | report link | Strengthen runtime guide read-first prompt | v0.8.x fix |
