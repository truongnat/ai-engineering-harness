# Project

## Purpose

Describe the host repository context for the demo harness build.

## Project Summary

- Product: Flutter mobile application
- Goal area: optional Google login while preserving guest mode
- Backend involvement: auth or session boundary may be touched if the app depends on an API-issued session
- Risk profile: medium because guest access and signed-in state must coexist safely

## Delivery Constraints

- guest mode must remain available
- auth redesign is out of scope unless required and approved
- no secrets or provider configuration values belong in harness artifacts

## Current Unknowns

- whether Google sign-in is client-only or API-backed
- how session persistence is currently implemented
- whether logout already clears guest-derived local state correctly

## Human Review

- Status: demo example
- Notes: This is a sample harness-build output, not a live project record.
