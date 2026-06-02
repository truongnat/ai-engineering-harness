# Roadmap

## V1: Markdown-First Operating System

- establish the central operating contract in `AGENTS.md`
- standardize operational command documents
- provide compact reusable skills
- define practical workflows and team patterns
- provide safe, fillable `.harness/` templates
- document concepts, architecture, artifact layout, and quality gates
- ship lightweight validation scripts and GitHub Actions CI

## V2: Runtime Adapters And Richer Validation

- V2-lite: adoption docs and installer helpers for copying harness assets into host repositories
- optional editor installers and bootstrap helpers
- stronger structural validation and markdown linting
- optional sync helpers for copying harness assets into host repos
- optional artifact generators that still preserve markdown as the source of truth

## V3: Optional Memory Backend And Automation

- optional memory backend integrations
- optional remote skill or template registry
- optional automation layers for artifact lifecycle management

Heavy runtime systems remain out of scope for v1. Any future automation should support the markdown operating model rather than replace it.
