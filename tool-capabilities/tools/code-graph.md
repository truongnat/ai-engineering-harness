# code graph

## Purpose

Provide repository-structure understanding beyond plain text search using a pre-indexed local knowledge graph.

## Recommended Tool

Use [CodeGraph](https://github.com/colbymchenry/codegraph) — pre-indexed code knowledge graph for Claude Code, Cursor, Codex, Gemini, and other agents. 100% local, MCP-backed.

Install:

```bash
# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.sh | sh

# Windows (PowerShell)
irm https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.ps1 | iex

# or npm
npm i -g @colbymchenry/codegraph
```

Wire up agents and initialize a project:

```bash
codegraph install
cd your-project
codegraph init -i
```

## Detect

```bash
codegraph --version
codegraph status
```

A project is ready when `.codegraph/` exists and `codegraph status` reports a healthy index.

## Use When

- repository structure matters more than raw text matches
- dependency, call flow, or ownership boundaries are unclear
- cross-file navigation needs stronger context than grep alone
- impact analysis before a change is helpful

## Do Not Use When

- the repo is small enough for file tree plus search
- CodeGraph is not installed or the project is not initialized
- the task only needs a single obvious file match

## Example Commands

```bash
codegraph search UserService
codegraph callers handleRequest
codegraph impact AuthService.login
codegraph status
```

Via MCP (when configured): `codegraph_explore`, `codegraph_search`, `codegraph_callers`, `codegraph_callees`, `codegraph_impact`.

## Fallback

- inspect the file tree
- scan imports, requires, and exports with `rg`
- use `git grep` when `rg` is unavailable

## Blocking Conditions

- do not block by default; fall back to file tree plus import scan unless the user explicitly requires graph-based analysis
