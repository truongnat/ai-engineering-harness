# Memory Safety

## Purpose

This document defines the safety rules for all memory artifacts used by the harness.

## Forbidden Content

The following must never be stored in `.harness/MEMORY.md`, goal-level `REMEMBER.md`, or any related memory artifact:

- secrets and credentials
- API keys and tokens
- customer data
- private business data
- sensitive internal operational details that do not belong in a shared repo artifact

## Safe Storage Rules

- summarize logs instead of copying them
- generalize sensitive lessons before storing them
- store the minimum useful durable context
- review memory artifacts before commit
- prefer abstracted root causes and reusable lessons over raw evidence dumps

## Safe Vs Unsafe Examples

### Safe

- "Android guest session state can be cleared during auth provider reinitialization; verify guest-to-login transition before ship."
- "Use `flutter test` and a targeted manual simulator check for auth flow regressions."
- "Delete API returns 404 after repeated retries when the client reuses stale resource identifiers."

### Unsafe

- "Use production token `abc123...` to reproduce the auth issue."
- "Customer Jane Doe from Acme Corp saw this failure on account 55721."
- "Raw production log: [full payload and identifiers pasted here]."

## Commit Review Rule

Before committing memory artifacts, verify that:

- sensitive data has not been copied in
- logs have been summarized
- customer or internal private details have been removed
- only durable lessons remain

## Generalization Rule

If a lesson is useful but the original evidence is sensitive, rewrite the lesson at the pattern level. Keep the engineering insight, drop the private details.
