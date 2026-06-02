# Hierarchical Delegation

Use this pattern when complex work should be decomposed into smaller layers of responsibility with explicit upward reporting.

Best for:
- large features
- cross-cutting refactors
- investigations with nested subtasks

Risk:
- context loss if each layer does not preserve artifact quality
