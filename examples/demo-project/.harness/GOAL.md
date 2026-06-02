# Goal

## Request

Add Google login to the Flutter app while preserving guest mode.

## Desired Outcome

Users can continue into the app as guests, or choose Google login from the sign-in surface without breaking existing guest access.

## Boundaries

- In scope: login UI entry point, auth flow wiring, guest-mode preservation, verification notes
- Out of scope: backend account migration, Apple login, subscription logic redesign

## Constraints

- Preserve the current guest-mode path
- Do not force sign-in at app launch
- Do not include any secrets or private business data

## Completion Signal

The example shows a realistic flow from goal to plan to verification to memory for this feature request.
