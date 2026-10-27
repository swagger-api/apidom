---
name: add-spec-version
description: End-to-end orchestrator for adding a new API specification or specification version to ApiDOM (e.g. AsyncAPI 3.1, OpenAPI 3.3, Arazzo 1.1, a brand-new spec, or standalone JSON Schema dialects such as 2020-12) in four phases, each ending in its own stacked pull request: 1 namespace, 2 parser adapters, 3 apidom-reference, 4 apidom-ls. Builds a parent-vs-new field map from the official spec, chains /add-namespace, /add-parser-adapter, /add-reference-support, /update-ls-config and /review-ls-changes, and gates every phase (build, types, lint, tests, redefined-field check, URL/anchor check). Can start at any phase; it first checks that earlier phases are complete and refuses to skip ahead. Use whenever the user wants to "add support for" a spec version, continue such work at a given phase, or plan it, even if they don't name the individual skills.
disable-model-invocation: false
user-invocable: true
---

# Add Specification Version (Orchestrator)

Adding a spec version touches up to ~700 files across 6+ packages. This skill splits the work into four phases that follow the package dependency order. Each phase ends with one pull request, and a phase can't start until the previous one is complete.

| Phase | Package(s) | Skill | PR (AsyncAPI 2.6 example) |
|-------|------------|-------|---------------------------|
| 1 | `apidom-ns-*` | `/add-namespace` (new) or `references/phase-checklists.md` (extend) | #2535 |
| 2 | `apidom-parser-adapter-*`, `apidom-parser` | `/add-parser-adapter` | #2536 |
| 3 | `apidom-reference` | `/add-reference-support` | #2537 |
| 4 | `apidom-ls` (+ playground) | `/update-ls-config`, `/review-ls-changes` | #2538, Jira SWG-19146 |

**Complete** means the phase's PR is open or merged, or its code is on `main`. PRs are stacked: phase n targets phase n-1's branch while that PR is open (see `references/pr-workflow.md`).

The review of PR #5110 (OAS 3.2) found three recurring defect classes; the gates exist to catch them in the phase that introduces them:

1. **Wrong field set**: parent fields redefined (`Components.pathItems`), fields that don't exist (`Components.webhooks`), new fields missed (`Encoding.prefixEncoding`, `OAuthFlow.deviceAuthorizationUrl`, ...). Gate: field map plus `check-redefined-fields.mjs`.
2. **Incomplete propagation**: a new field exists on the element but not in `specification.ts`, `replace-empty-element`, dereference visitors or LS config. Gate: per-phase field-map coverage.
3. **Bad links and messages**: unverified dialect/schema URLs and doc anchors, ad-hoc lint messages. Gate: `verify-urls.mjs` and pattern checks.

## Bundled Tools

| Tool | Use |
|------|-----|
| `scripts/phase-status.mjs --spec {spec} --version {x.y.z} [--phase n]` | Which phases are complete (code on `main`, PR open/merged, code only, missing), the next phase, its branch name and the branch to start it from. Exit 1 when a phase before `--phase n` is not done (without `--phase`: a gap, e.g. phase 3 missing while phase 4 is done). `--field` when the document's version field differs from the spec id; `--no-version-field` for specs without one (A2A; auto-detected); `--base` to compare against another ref. For JSON Schema, `--version` is the dialect id (`--spec json-schema --version 2020-12`). |
| `scripts/check-redefined-fields.mjs <packages/apidom-ns-X>` | Getters (with or without return type) duplicating an ancestor element. `REDEFINED` = remove (exit 1); `RETYPED` = same type name, now this namespace's own class: keep when the refractor produces it; `OVERRIDE` = keep only if the version changed the type; `REMOVED` = throwing getter for a dropped field. |
| `scripts/verify-urls.mjs <paths...>` or `--diff main` | Fetches every URL and checks `#anchors` (markdown sources and static HTML pages: missing anchor is `BROKEN`). `--diff` covers committed, uncommitted and untracked changes; `--timeout` per request (15 s). `BROKEN` fails the gate (exit 1); `UNVERIFIED` (incl. timeouts) needs a manual look. |
| `scripts/find-unwired.sh <parent-id> <new-id>` | Files (packages, root `package.json` and `README.md`) mentioning the parent version but not the new one (new variant); exit 1 when any. Documented ignore list for known false positives (`--all` disables it). |
| `scripts/check-ls-coverage.mjs <ns-package> <ls-config-dir>` | Per element (name resolved through parent namespaces) and own field (`--inherited` for all): meta registered, documentation entry, completion item, type rule, allowed-fields entry; placeholder lint rules (`STUB`); linter functions that don't exist (`UNKNOWN-FN`); lint file names that don't match their linter function. Warns on a stale apidom-ls build (`--source` reads the .ts files). Lists required-field rules for comparison with the field map. |
| `scripts/check-test-parity.mjs <new-test> <sibling-test> --mask <words>` | Test cases (`describe`/`context`/`specify`/`it` outline, incl. `.skip`/`.only`) present in the sibling package's test file but missing in the new one; `--mask` words match whole words. Exit 1 on `MISSING` or `.only`. |
| `references/field-map-template.md` | Tracking document and field map structure. |
| `references/phase-checklists.md` | Per-phase file checklists for the extend and new variants, with worked examples. |
| `references/pr-workflow.md` | Branch names, PR titles and body, stacking and rebasing. |
| `references/integration-points.md` | Files outside the new packages that must change (new variant), by phase. |
| `references/json-schema-dialects.md` | JSON Schema dialects: identifiers, keyword map from the meta-schemas (no Fixed Fields tables), extra integration points, the phase 4 exit check, gate adjustments. |

Run scripts from the repo root: `node .claude/skills/add-spec-version/scripts/<script>`.

## Step 0: Where to Start (every invocation)

1. Identify spec, full version (`3.1.0`), parent version, and the **variant**:
   - **Extend**: the version goes into an existing namespace and adapters (AsyncAPI 2.6 into `asyncapi-2`, AsyncAPI 3.1 into `asyncapi-3`).
   - **New**: own namespace and adapter packages (OpenAPI 3.2 as `openapi-3-2`, a brand-new spec).
   `references/phase-checklists.md` explains how to decide. A JSON Schema dialect is always new
   (`--spec json-schema`, version = dialect id such as `2020-12`); read
   `references/json-schema-dialects.md` now, it changes the preparation, integration points and
   gates below.
2. Identify the requested phase: the one the user named, or the next incomplete one.
3. `git fetch origin`, then run `phase-status.mjs`.
4. **If any phase before the requested one is not complete, stop.** Report the status table and which phase is missing, and offer to run that phase first. Don't start the requested phase, even partially. Two exceptions, both requiring the user to confirm:
   - `CODE ONLY`: the earlier phase's code exists locally but has no PR. Offer to finish its gate and open its PR first.
   - The earlier phase was done under another branch name: the script lists open PRs mentioning the version. Once the user confirms which PR covers the phase, stack on that PR's branch and record it in the tracking doc.
5. Read the tracking doc `ADD-{SPEC}-{VERSION}.md` at the repo root if it exists. If it doesn't (e.g. starting at phase 3 in a new session), rebuild the field map (Preparation below) before continuing; phases 3 and 4 need it for coverage checks.
6. Create the phase branch from the `FROM` printed by the script (`references/pr-workflow.md`).

## Preparation: Specification Research and Field Map

Done once, before phase 1 (or when resuming without a tracking doc). The tracking doc stays uncommitted.

1. **Pin the version.** List the spec's releases (GitHub releases or tags of the spec repository, and the versions the spec site serves) and target the latest patch release of the requested line. PR #5182 was written against A2A 1.0.0 while 1.0.1 was out, and had to be upgraded during review. Record the exact version and the source URL in the tracking doc.
2. Fetch the **official** specification source for that exact version, preferably raw markdown, and the parent version's. Release notes and summaries miss fields; Fixed Fields tables are the source of truth. For extend-variant minor releases, also read the release notes for new bindings or extensions (AsyncAPI 3.1 only added the ROS 2 binding).
3. **Read the changes page** ("What's new", changelog, migration guide) for removals and renames. They often aren't visible in the new tables: A2A 1.0 removed the implicit and password OAuth flows, which PR #5182 still implemented. Every removed object or field becomes a `REMOVED` row.
4. Build the field map per `references/field-map-template.md`: every object, every field, with type (including fixed value sets and formats such as URL), required flag and `NEW` / `CHANGED-TYPE` / `REMOVED` / `INHERITED` status. Cross-check `INHERITED` against the parent namespace's element files. Fields come only from the Fixed Fields tables of this version: not from the JSON Schema, examples, other versions or similar specs (PR #5182 invented `AgentCard.url` and missed `AgentSkill.id`). JSON Schema dialects have no such tables: their keywords come from the vocabulary meta-schemas (`references/json-schema-dialects.md` section 2). Mark fields whose names clash with ApiDOM element properties (`id`, `meta`, `content`, ...); `add-namespace` gives them renamed accessors.
5. List every object in the Objects table, and every helper element the namespace will need that isn't a spec object (NCEs, string lists) as `INTERNAL`. Each namespace element and each LS config directory must trace back to one row; anything else is invented (PR #5182 documented a Security Requirement object the spec doesn't define).
6. Record every external URL (dialect, meta-schema, JSON Schema files, doc base URLs) and run `verify-urls.mjs` on the tracking doc. Never derive a URL from a pattern. For the LS documentation base URL and anchor form, add or check the spec's row in "Documentation URLs per Spec" (`update-ls-config/references/completion-and-documentation.md`).
7. **Checkpoint:** show the user the NEW / CHANGED-TYPE / REMOVED rows and the URL list, and get confirmation before generating code.

## Phase 1: Namespace

1. **New**: run `/add-namespace` with the field map. **Extend**: apply "Phase 1 / Extend" in `references/phase-checklists.md`. Either way only `NEW` and `CHANGED-TYPE` fields get getters; `REMOVED` fields get a throwing getter (see `apidom-ns-asyncapi-3/src/elements/Server.ts`).
2. **Gate 1**:
   - `cd packages/apidom-ns-{...} && npm run build && npm run typescript:check-types && npm run lint && npm test`
   - `check-redefined-fields.mjs packages/apidom-ns-{...}`: 0 `REDEFINED`; every `OVERRIDE` justified by the field map.
   - Field-map coverage: every `NEW` field is in (a) its element, (b) `refractor/specification.ts` with the right visitor, (c) `replace-empty-element` when its value is an object/array/element (array items and map values included). Grep each field name; list misses in the tracking doc. Every element traces to a field-map object or an `INTERNAL` row.
   - No copied features the spec lacks (Reference/`$ref` predicates, `x-*` extension visitors), no copied comments naming another spec.
   - Tests mirror the sibling namespace's (`check-test-parity.mjs` per test file) and set every field; README has the sibling's sections; CHANGELOG is header-only.
   - No duplicate element files carried over from the parent, no element for a field that lives elsewhere.
   - `verify-urls.mjs packages/apidom-ns-{...}/src`: 0 `BROKEN`.
3. Open PR 1 (`references/pr-workflow.md`), then ask whether to continue with phase 2.

## Phase 2: Parser Adapters

1. Run `/add-parser-adapter`: Phases 1-5 and 7-9 for the new variant, Phase 6 (extend existing adapters) for the extend variant.
2. **Gate 2**:
   - Build, types, lint and tests of both adapters and `apidom-parser`.
   - Detection is exclusive: new-version documents are detected by the intended adapters only. New variant: the parent's adapters reject the new version and vice versa. Extend variant: other specs' adapters reject it (their negative tests now use the new version).
   - `grep -rn "{previous latest version}"` over the adapters, `apidom-parser` tests and READMEs: every remaining hit is intentional.
   - New variant: `check-test-parity.mjs` against the sibling adapter's `test/adapter.ts`; READMEs have the sibling's sections; `detect` runs the regex before format detection.
3. Open PR 2 on top of PR 1, then ask whether to continue with phase 3.

## Phase 3: apidom-reference

1. Run `/add-reference-support` with the field map.
2. **Gate 3**:
   - `cd packages/apidom-reference && npm run build && npm run typescript:check-types && npm run lint && npm test`
   - New variant: every apidom-reference item in `references/integration-points.md` is done; parent-version documents are still parsed by the parent's parser.
   - Dereference handles every `NEW` field that can hold a Reference Object or `$ref`, and nothing more.
   - README lists the new version's media types (`grep -c "version={version}" packages/apidom-reference/README.md` > 0).
3. Open PR 3 on top of PR 2, then ask whether to continue with phase 4.

## Phase 4: apidom-ls

1. **New**: run `/update-ls-config` with the field map, then the LS and playground items in `references/integration-points.md`. **Extend**: apply "Phase 4 / Extend" in `references/phase-checklists.md` (the SWG-19146 task list is the model), using `/update-ls-config` for new objects such as bindings.
2. Run `/review-ls-changes` in a fresh subagent that only gets the spec name/version and the branch, so it reviews against the spec rather than against what was just written. Fix every finding.
3. **Gate 4**:
   - `cd packages/apidom-ls && npm run build && npm run typescript:check-types && npm run lint && npm test`
   - `check-ls-coverage.mjs packages/apidom-ns-{...} packages/apidom-ls/src/config/{spec} --ignore {INTERNAL elements}` reports 0 problems (build apidom-ls first). Its `required` lines match the field map's Required column.
   - JSON Schema dialects: coverage and rule expectations per `references/json-schema-dialects.md` section 6 (`--inherited`, no `--required` or error-level allowed-fields rules), and its section 5 exit check passes.
   - Field-map coverage: every `NEW` field has a completion item, a documentation entry (or, for an object-valued field documented in its own element directory, a line in the header comment) and lint rules (allowed-fields, `--type`, `--required` when required, `--equals` for enums). No config for `REMOVED` objects of this version.
   - Lint messages follow existing patterns (`should always have a '{field}'`, `'{field}' must be a {type}`); new codes in `codes.ts` are unique.
   - Older versions don't accept what's new (e.g. AsyncAPI 3.0.0 documents don't accept `ros2` bindings); a test proves it.
   - `verify-urls.mjs --diff main`: 0 `BROKEN`.
   - Unwired check: `find-unwired.sh {parent-id} {new-id}` (new) or `grep -rn "'{previous version}'" packages/apidom-ls/src` (extend). Wire each hit or record why it's intentionally old-version-only.
   - Full monorepo: `npm run build`, `npm run typescript:check-types`, `npm run lint`, `npm test` from the root (use `LERNA_CONCURRENCY` / `CPU_CORES` from `.env` if needed).
4. Open PR 4 on top of PR 3.

## Hand-off

Report the four PRs (URL, base, state), gate results per phase, open `UNVERIFIED` URLs, and field-map rows deliberately left out with the reason. Remind the user that PRs must be merged in order, and that `references/pr-workflow.md` covers retargeting after a merge.

## Working Notes

- Phases are strictly sequential; within a phase, independent element groups or LS config directories can be split across parallel subagents, each with its field-map rows.
- When a gate fails, fix it in the phase that owns the file. If that phase's PR is already open, commit on its branch and rebase the stack (`references/pr-workflow.md`); downstream phases copy upstream mistakes.
- Pushing, opening PRs and force-pushing are outward-facing: confirm each with the user.
- Brand-new spec (no parent): every field is `NEW`, and the redefined-field check mostly guards against redefining `ObjectElement` basics.
- Project rules in `CLAUDE.md` (Conventional Commits, `.ts` import extensions, single quotes) and `packages/apidom-ls/CLAUDE.md` (lint rule and test patterns) apply throughout.
