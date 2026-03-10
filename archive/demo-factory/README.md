# Archived Demo Factory

Status: archived / inactive

This folder contains the postponed Demo Factory work that was removed from the active Captiva product flow.

Current rule:
- do not use these scripts, contracts, templates, or docs from the normal runtime/build workflow
- do not reconnect this feature to `package.json`, `build`, `dev`, or the active demo catalog unless reactivation is explicitly requested

Current source of truth for demos:
- `demos/`
- `public/demos/`
- `demos/manifest.json`
- `src/config/demos.generated.json`
- active scripts under `scripts/`

Reason:
- the automatic factory was postponed
- the project currently ships only the curated manual demo catalog

If this feature is reactivated in the future, it should be treated as a new scoped initiative with its own audit, rollout plan, and regression checks.
