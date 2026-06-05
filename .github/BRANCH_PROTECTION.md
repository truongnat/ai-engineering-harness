# Branch Protection (required for `main`)

Configure in GitHub: **Settings → Branches → Branch protection rules → `main`**.

## Required status checks

Enable **Require status checks to pass before merging** and select:

- `validate-and-test (ubuntu-latest, 18)`
- `validate-and-test (ubuntu-latest, 20)`
- `validate-and-test (macos-latest, 18)`
- `validate-and-test (macos-latest, 20)`
- `validate-and-test (windows-latest, 18)`
- `validate-and-test (windows-latest, 20)`

Job name may appear as `CI / validate-and-test` depending on GitHub UI.

## Recommended settings

- Require a pull request before merging (1 approval for external contributors)
- Require branches to be up to date before merging
- Do not allow bypassing the above settings (except repository admins)

## Why

Prevents merging when lint, format, validate, tests, eval regression, coverage, or install smoke checks fail.
