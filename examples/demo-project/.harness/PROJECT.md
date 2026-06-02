# Project

## Name

Flutter Guest Commerce App

## Mission

Let users browse and start using the app immediately, while offering optional account sign-in for synced features.

## Product Or System Summary

A Flutter application with guest mode enabled by default and optional authentication for personalized or synced behavior.

## Constraints

- Technical: keep guest-mode flows working without requiring authentication
- Product: adding Google login must not block anonymous browsing
- Process: no heavy runtime in the harness example
- Safety: no secrets or private business data

## Primary Repositories Or Services

- Repository: `examples/demo-project`
- Mobile app: Flutter client
- Auth provider: Google Sign-In

## Quality Bar

- [x] Planning before implementation
- [x] Verification before completion claims
- [x] Memory sanitized for sensitive data
