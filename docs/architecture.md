# Architecture

This repository uses document architecture rather than runtime architecture.

## Layers

1. `AGENTS.md` sets mandatory behavior.
2. `commands/` defines operator-facing entry points.
3. `skills/` defines reusable capabilities.
4. `workflows/` defines end-to-end process sequences.
5. `patterns/` defines coordination shapes.
6. `templates/` defines persistent artifact structures.
7. `docs/` explains the system and its intent.

## Runtime Stance

The only executable layer in v1 is lightweight Node-based installation and validation. There is no process manager, no task engine, and no hidden state machine.
