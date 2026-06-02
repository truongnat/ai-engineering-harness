# Supervisor

Use this pattern when one coordinator should own sequencing, context, and quality gates while others handle bounded tasks.

Best for:
- multi-step initiatives
- work requiring centralized state tracking
- teams that need one source of coordination truth

Risk:
- over-centralization can slow local decision making
