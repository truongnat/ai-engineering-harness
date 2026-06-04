# Tool Discovery And Routing

## Why This Exists

The harness tells agents to inspect, search, review, and verify work. Without a discovery layer, agents tend to rely on memory and default to weaker tools even when stronger local tools are available.

This layer makes tool choice explicit:

- discover what exists
- route by capability instead of by tool name
- degrade gracefully when optional tools are missing
- block only when required capabilities have no safe fallback

## Capability-Based Routing

The system routes by capability first:

- `code-search`
- `diff-review`
- `history-review`
- `parallel-work`
- `document-to-markdown`
- `repo-structure`
- `dependency-scan`

That keeps the harness flexible when local tool names change over time.

## Optional Tools

Optional tools are best-effort only.

- Missing `markitdown` should not fail the harness unless a rich document is required.
- Missing CodeGraph should fall back to file tree and import scans. See https://github.com/colbymchenry/codegraph
- Missing `git-nexus` should fall back to standard git commands.

## Blocked Output

The harness should return `Blocked` when:

- the task requires a capability with no safe fallback
- the user must provide missing document text
- routing would otherwise require risky guessing

## Examples

### Code Search

Preferred:

```bash
rg "harness-run"
```

Fallback:

```bash
git grep -n "harness-run"
grep -R "harness-run" .
```

### Diff Review

Preferred:

```bash
git diff --stat
git diff HEAD~1..HEAD
```

Fallback:

- ask the user for the review range or pasted diff

### Document Conversion

Preferred:

```bash
markitdown spec.pdf > .harness/context/spec.md
```

Fallback:

- ask the user for extracted text

### Code Graph

Preferred tool: [CodeGraph](https://github.com/colbymchenry/codegraph)

Install:

```bash
npm i -g @colbymchenry/codegraph
codegraph install
cd your-project
codegraph init -i
```

Example queries:

```bash
codegraph search UserService
codegraph callers handleRequest
codegraph status
```

Fallback when CodeGraph is unavailable:

```bash
rg "import |from |require\\("
```

### Git Worktree Usage

Preferred when isolation helps:

```bash
git worktree list
git worktree add ../repo-review main
```

Fallback:

- use a normal branch or stash workflow
