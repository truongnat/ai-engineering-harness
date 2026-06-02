# harness-verify

## Purpose

Gather fresh evidence that the work behaves as intended before any completion claim, handoff, or ship step.

## When To Use

- After implementation changes
- Before summarizing work as complete
- Before shipping or merging
- After bug fixes or refactors with risk of regression

## Required Reads

- active plan and task artifacts
- review notes if present
- prior verification expectations and success criteria

## Skills To Use

- `using-harness`
- `verification`
- `code-review` when inspection is part of the gate

## Step-By-Step Workflow

1. Identify the commands or checks that prove the work.
2. Run the relevant validation, tests, or manual checks fresh.
3. Compare the results against the planned success criteria.
4. Record failures, gaps, or residual risk explicitly.
5. Update the verification artifact with evidence and status.
6. Only proceed to ship when the evidence supports the claim.

## Output Artifacts

- verification notes
- command results summary
- residual risk statement if needed

## Completion Gate

The command is complete when the current evidence supports the claimed outcome or when any remaining verification gaps are documented clearly enough that no one mistakes them for a pass.
