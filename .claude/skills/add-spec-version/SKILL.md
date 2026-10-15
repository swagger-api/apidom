---
name: add-spec-version
description: End-to-end orchestrator for adding a new API specification or specification version to ApiDOM (e.g. OpenAPI 3.3, AsyncAPI 3.1, Arazzo 1.1, a brand-new spec). Builds a parent-vs-new field map from the official spec, then chains /add-namespace, /add-parser-adapter, /update-ls-config and /review-ls-changes with verification gates (build, types, lint, tests, redefined-field check, URL/anchor check) between stages, and finishes the cross-package wiring (apidom-reference, apidom-ls parser factory and JSON Schema validation, playground, root scripts). Use whenever the user wants to "add support for" a spec version across the monorepo, plan such work, or resume a partially done spec addition, even if they don't name the individual skills.
disable-model-invocation: false
user-invocable: true
---

# Add Specification Version (Orchestrator)

Adding a spec version touches ~700 files across 6+ packages. The individual skills know how to build each piece; this skill makes sure the pieces agree with the specification and with each other, and that mistakes are caught at the stage that introduced them instead of in PR review.

The review of PR #5110 (OAS 3.2) found three recurring defect classes. Every gate below exists to catch one of them early:

1. **Wrong field set**: parent fields redefined (`Components.pathItems`), fields that don't exist (`Components.webhooks`), and many new fields missed (`Encoding.prefixEncoding`, `OAuthFlow.deviceAuthorizationUrl`, `Xml.nodeType`, ...). Gate: the field map plus `check-redefined-fields.mjs`.
2. **Incomplete propagation**: a new field exists on the element but not in the refractor `specification.ts`, the `replace-empty-element` plugin, LS completion/docs/lint, or dereference visitors. Gate: per-stage field-map coverage check.
3. **Bad links and messages**: unverified dialect/schema URLs and doc anchors, ad-hoc lint messages. Gate: `verify-urls.mjs` and pattern checks.

## Bundled Tools

| Tool | Use |
|------|-----|
| `scripts/check-redefined-fields.mjs <packages/apidom-ns-X>` | Lists getters that duplicate an ancestor element. `REDEFINED` = same type as parent (remove). `OVERRIDE` = narrowed return type (keep only if the version changed the type). `REMOVED` = throwing getter for a dropped field. |
| `scripts/verify-urls.mjs <paths...>` or `--diff main` | Fetches every URL and checks `#anchors` against the real page (GitHub `.md` sources are checked against raw markdown). `BROKEN` fails the gate, `UNVERIFIED` (rate limit, client-rendered anchor) needs a manual look. |
| `scripts/find-unwired.sh <parent-id> <new-id>` | Files that mention the parent version (e.g. `openapi-3-1`) but not the new one: forgotten wiring candidates. |
| `references/field-map-template.md` | Structure of the tracking document / field map. |
| `references/integration-points.md` | Every file outside the new packages that must change, with the OAS 3.2 commit as a worked example. |

Run scripts from the repo root with `node .claude/skills/add-spec-version/scripts/<script>`.

## Workflow

Keep a tracking document at the repo root, `ADD-{SPEC}-{VERSION}.md` (do not commit it). It holds the field map, stage status and gate results, so work can resume in a later session. When resuming, read it first and continue at the first stage not marked done.

### Stage 0: Specification research and field map

1. Identify spec name, version, parent version (if any), and the namespace/package names that will result (`apidom-ns-{spec}-{version}`, `apidom-parser-adapter-{spec}-{json|yaml}-{version}`).
2. Fetch the **official** specification source, preferably raw markdown (e.g. `https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/versions/3.2.0.md`), and the parent version's source. Summaries, blog posts and changelogs miss fields; the Fixed Fields tables are the source of truth.
3. Build the field map following `references/field-map-template.md`: for every object, every field with type, required flag, and status `NEW` / `CHANGED-TYPE` / `REMOVED` / `INHERITED` relative to the parent. Cross-check `INHERITED` against the parent namespace's element files (`packages/apidom-ns-{parent}/src/elements/`), because ApiDOM's parent may already have a field the parent spec added in a patch release.
4. Record every external URL the implementation will need (spec dialect, meta-schema, JSON Schema files, doc base URLs) and run `verify-urls.mjs` on the tracking doc. Never invent a URL from a pattern; PR #5110 shipped `.../oas/3.2/dialect/base`, which returns 404.
5. **Checkpoint:** show the user the NEW / CHANGED-TYPE / REMOVED rows and the URL list, and get confirmation before generating code. A wrong field map multiplies into hundreds of wrong files.

### Stage 1: Namespace package

1. Run the `/add-namespace` workflow (invoke the `add-namespace` skill), feeding it the field map. Only `NEW` and `CHANGED-TYPE` fields get getters; `REMOVED` fields get a throwing getter (see `apidom-ns-asyncapi-3/src/elements/Server.ts`).
2. **Gate 1** (all must pass before Stage 2):
   - `cd packages/apidom-ns-{spec}-{version} && npm run build && npm run typescript:check-types && npm run lint && npm test`
   - `node .claude/skills/add-spec-version/scripts/check-redefined-fields.mjs packages/apidom-ns-{spec}-{version}` reports 0 `REDEFINED`, and every `OVERRIDE` is justified by the field map.
   - Field-map coverage: every `NEW` field appears in (a) its element getter/setter, (b) `refractor/specification.ts` fixed fields with the right visitor (object vs array vs map vs element), (c) the `replace-empty-element` plugin when the field's value is an object/array/element. Check by grepping each field name; list misses in the tracking doc.
   - No duplicate element files carried over from the parent (e.g. `OpenApi3-1.ts` inside the 3.2 package) and no element for a field that lives elsewhere in the hierarchy.
   - `verify-urls.mjs packages/apidom-ns-{spec}-{version}/src` reports 0 `BROKEN`.

### Stage 2: Parser adapters and apidom-reference

1. Run the `/add-parser-adapter` workflow for the new namespace.
2. **Gate 2**:
   - Build and test both adapter packages and `apidom-reference`.
   - Detection is exclusive: the new adapters detect `{version}` documents, and the parent version's adapters do **not** (check the parent `detectionRegExp`, e.g. `3\.1\.(?:[1-9]\d*|0)`, against a sample of the new version). Add a test for this if missing.
   - Every apidom-reference integration point in `references/integration-points.md` (parsers, resolve/dereference/bundle strategies, `saturated.ts`, `package.json` exports and dependencies) is done.
   - Dereference visitor handles every `NEW` field that can hold a Reference Object or `$ref`, and nothing more (PR #5110 added reference handling to `additionalOperations`, which can't contain references).

### Stage 3: Language service

1. Run the `/update-ls-config` workflow, feeding it the field map.
2. Complete the LS wiring that `update-ls-config` doesn't cover: `parser-factory.ts`, `utils/utils.ts` detection, JSON Schema validation provider and schema files, `package.json` dependencies (see `references/integration-points.md`).
3. **Gate 3**:
   - `cd packages/apidom-ls && npm run build && npm run typescript:check-types && npm run lint && npm test`
   - Field-map coverage: every `NEW` field has a completion item, documentation entry, and lint rules (allowed-fields, `--type`, `--required` when required).
   - Lint messages follow the existing patterns (`should always have a '{field}'`, `'{field}' must be a {type}`); new codes in `codes.ts` are unique.
   - `node .claude/skills/add-spec-version/scripts/verify-urls.mjs --diff main` reports 0 `BROKEN` for documentation links. This checks anchors against the spec source, so it settles anchor-format questions empirically.

### Stage 4: Review against the specification

1. Run the `/review-ls-changes` workflow on the branch. It works best in a fresh subagent that only gets the spec name/version and branch, so it reviews against the spec rather than against what was just written.
2. Fix every finding, re-run Gate 3, record results in the tracking doc.

### Stage 5: Remaining wiring and full verification

1. Apply the remaining items from `references/integration-points.md` (playground, root `package.json` `unlink` list, READMEs, `package-lock.json` via `npm i`).
2. Run `scripts/find-unwired.sh {parent-id} {new-id}`; wire each listed file or record why it is intentionally parent-only.
3. Full monorepo verification from the repo root: `npm run build`, `npm run typescript:check-types`, `npm run lint`, `npm test`. Use `LERNA_CONCURRENCY` / `CPU_CORES` from `.env` if the machine struggles.
4. Final `verify-urls.mjs --diff main` and `check-redefined-fields.mjs` runs; paste the summary lines into the tracking doc.

### Stage 6: Hand-off

Summarize per stage what was created, gate results, open `UNVERIFIED` URLs, and any field-map rows deliberately left out (with reason). Propose one commit per stage using Conventional Commits, e.g. `feat(ns-openapi-3-3): add OpenAPI 3.3 namespace`, `feat(reference): add OpenAPI 3.3 parsers and strategies`, `feat(ls): add OpenAPI 3.3 support`. Commit only when the user asks.

## Working Notes

- Stages are sequential: adapters depend on the built namespace, and LS depends on adapters. Within a stage, independent element groups or LS config directories can be split across parallel subagents; give each the relevant field-map rows.
- When a gate fails, fix it in the stage that owns the file rather than patching downstream; downstream stages copy upstream mistakes.
- If the spec is brand new (no parent), every field is `NEW`; the redefined-field check then mostly guards against redefining `ObjectElement` basics.
- Project-wide rules in `CLAUDE.md` (Conventional Commits, `.ts` import extensions, single quotes) and `packages/apidom-ls/CLAUDE.md` (lint rule and test patterns) apply throughout.
