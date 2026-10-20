# Claude Code Skills for ApiDOM

This directory contains Claude Code skills for common development tasks in the ApiDOM monorepo.

## Recent Updates

**2026-10-20** (PR #5264 review, AsyncAPI 3.1.0 LS):

- `/update-ls-config`: rules for fields that can hold references list the dereferenced element name next to the `referenced-element` value (`[['server', 'channel-servers']]`); values that depend on a parent field use a `parent` condition path (ROS 2 `role` / Operation `action`), with the general rule limited by `apilintKeysContainsValue` so each invalid value gets one diagnostic; no `--type` rule next to `--equals`, with the codes renumbered when a field's first rule is dropped; messages name an object only if the namespace has an element for it; completion fixtures go in `test/fixtures/completion/`, and Phase 8 shows how to run one test file.
- `/review-ls-changes`: four new lessons and checks for the above, including a snippet that finds `--type` rules next to `--equals` (it flags both `role--type.ts` files from the commit that was reviewed).
- `/add-namespace`: `referenced-element` is the target's element name, used the same way in every visitor.
- FOLLOW-UPS: 5.8 implemented in the review follow-up (the README example that contradicts its field table is an upstream error); new 5.10 for the AsyncAPI 3 `referenced-element` values.

**2026-10-16** (lessons from adding AsyncAPI 3.1.0, PRs #5261-#5264):

- `verify-urls.mjs`: GitHub directory links are checked against the directory's `README.md` (AsyncAPI binding links such as `bindings/blob/master/kafka#server` were false `BROKEN`s); an unbalanced `)` ends a URL, so markdown table cells glued to a link (`[x](url)|Next`) aren't part of it; `--new-only` with `--diff` skips links carried over by rewritten lines; `--list` prints the collected URLs without fetching.
- `/add-spec-version`: the field map gains `CHANGED-TEXT` (prose-only changes) and `DECIDE` rows (spec vs. JSON Schema disagreements), resolved at the checkpoint; gates compare against the PR base, accept only new findings, and require adapter tests to actually run; other specs' negative tests stay unchanged; the reviewer runs on committed work.
- Extend checklists: bindings that exist only from a version, version-scoped completion values and docs, renamed range files with their identifiers, real version-pattern rules, apidom-reference README sections for an undocumented family.
- `/update-ls-config` and `/review-ls-changes`: AsyncAPI v3.x doc anchors are checkable, binding links point at README files, range rules need a number guard, codes for a second rule use `+1`, and three new review lessons (prose-only changes, field-dependent value sets, keys new in one version).

**2026-10-15**:

- PR #5259 review: `--equals` and `--format-uri` / `--format-email` rules are required, not advisory, in both `/update-ls-config` and `/review-ls-changes` (new Issue 11); type rules are checked for every field, not only required ones; `/add-namespace` documents the `pipe(assocPath, dissocPath)` way of extending a parent specification (JSON Schema dialects) next to listing every object.
- Lessons from the PR #5182 (A2A) review, 92 comments: new `check-ls-coverage.mjs` (per element and field: meta, docs, completion, type/allowed-fields rules, placeholder rules, rule names) and `check-test-parity.mjs` (test cases missing compared with a sibling package); `verify-urls.mjs` now fails on missing anchors of static HTML spec pages; `/add-namespace` gained the replace-empty-element plugin step, copy-then-prune, root element naming, reserved field names and sibling-parity tests; CHANGELOGs stay header-only; `/update-ls-config` requires docs, completion and type rules for every field and has a per-spec documentation URL table.

- `/add-spec-version` now works in four phases, each ending in its own stacked PR: namespace, parser adapters, apidom-reference, apidom-ls. It can start at any phase and first checks (`scripts/phase-status.mjs`) that earlier phases are complete.
- New `/add-reference-support` skill takes over the apidom-reference wiring from `/add-parser-adapter`.
- `/add-parser-adapter` and `/add-reference-support` support the extend variant: a version added to an existing namespace (e.g. AsyncAPI 2.6, AsyncAPI 3.1).

**2026-10-14**:

- New `/add-spec-version` orchestrator chains the four skills below with verification gates and bundles helper scripts (redefined-field check, URL/anchor check, unwired-file audit).
- Every skill now follows progressive disclosure: a short `SKILL.md` with the workflow, and detailed templates in `references/`, loaded only when a phase needs them.
- Every skill has `evals/evals.json` with an eval that replays a real review (PR #5110 OAS 3.2, PR #5104 AsyncAPI 3) or planted defects. See "Evaluating Skills" below.

**2026-01-28**: Skills enhanced based on the OpenAPI 3.2.0 implementation (visitor patterns, reference integration, language service scale, testing patterns).

## Skill Layout

```
{skill}/
├── SKILL.md        # workflow, critical rules, checklist (loaded on invocation)
├── references/     # templates and detailed guidance (read when a phase says so)
├── scripts/        # deterministic helpers (add-spec-version only)
└── evals/          # eval prompts, assertions and fixtures
```

## Available Skills

### `/add-spec-version` - Add a Specification Version End to End

Orchestrates adding a new spec or spec version across the monorepo in four phases. Use this as the entry point; it calls the skills below.

| Phase | Package(s) | Skill | PR |
|-------|------------|-------|----|
| 1 | `apidom-ns-*` | `/add-namespace` (or extend checklist) | `feat/{spec}-{version}/phase-1` |
| 2 | parser adapters, `apidom-parser` | `/add-parser-adapter` | `.../phase-2`, stacked on phase 1 |
| 3 | `apidom-reference` | `/add-reference-support` | `.../phase-3`, stacked on phase 2 |
| 4 | `apidom-ls`, playground | `/update-ls-config`, `/review-ls-changes` | `.../phase-4`, stacked on phase 3 |

1. Builds a field map (new / changed / removed / inherited fields per object) from the official spec and the parent namespace, and asks for confirmation
2. Each phase ends in one PR; a phase starts only when the previous one's PR is open or merged (or its code is on `main`). Invoking it at a later phase (e.g. "do phase 3 for AsyncAPI 3.1") first checks the earlier phases and stops if one is missing
3. Gates every phase: build, types, lint, tests, field-map coverage, plus the bundled scripts:
   - `scripts/phase-status.mjs`: which phases are complete, the next phase, its branch and base
   - `scripts/check-redefined-fields.mjs`: getters that duplicate a parent element
   - `scripts/verify-urls.mjs`: URLs and `#anchors` that don't resolve
   - `scripts/find-unwired.sh`: files that mention the parent version but not the new one
   - `scripts/check-ls-coverage.mjs`: LS completion, docs and lint coverage per namespace element and field
   - `scripts/check-test-parity.mjs`: test cases a sibling package has and the new one lacks
4. Handles both variants: a new namespace package (OpenAPI 3.2) and a version added to an existing namespace (AsyncAPI 2.6, PRs #2535-#2538; AsyncAPI 3.1, PRs #5261-#5264)

Progress lives in an uncommitted `ADD-{SPEC}-{VERSION}.md` tracking doc, so work can resume across sessions.

### `/add-namespace` - Add Namespace Package

Creates a complete namespace package for a new API specification version.

**Usage:**
```
/add-namespace
```

Claude will guide you through:
1. Gathering specification information
2. Creating the package structure
3. Generating all required files
4. Setting up tests
5. Building and validating the package

**When to use:**
- Adding support for a new API specification (e.g., RAML, API Blueprint)
- Adding a new version of an existing spec that gets its own namespace package (e.g., OpenAPI 3.3 or 4.0); versions that go into an existing namespace use `/add-spec-version`'s extend checklist

**What it creates:**
- Complete `packages/apidom-ns-{spec}-{version}/` directory
- All element classes with proper types
- Visitor implementations
- Predicates for type checking
- Test structure with examples
- Configuration files (package.json, tsconfig, vite, api-extractor)

**Prerequisites:**
- Thoroughly understand the specification document
- Identify if you can base on an existing namespace
- List all element types and their properties

### `/add-parser-adapter` - Add Parser Adapter Packages

Creates JSON and YAML parser adapter packages for a namespace, or extends existing adapters for a version added to an existing namespace.

**Usage:**
```
/add-parser-adapter
```

Claude will:
1. Discover namespaces without parser adapters (or detect the extend variant)
2. Present options for which namespace to add parsers for
3. Generate both JSON and YAML parser adapter packages, or update detection tests, fixtures and READMEs of existing ones
4. Build and test the adapters and `apidom-parser`

**When to use:**
- After creating a new namespace with `/add-namespace`
- When an existing namespace lacks parser adapters
- When a new version was added to an existing namespace (e.g. AsyncAPI 2.6)

**What it creates:**
- `packages/apidom-parser-adapter-{spec}-json-{version}/` package
- `packages/apidom-parser-adapter-{spec}-yaml-{version}/` package
- Complete tests for both adapters

apidom-reference integration is done by `/add-reference-support`.

**Prerequisites:**
- Target namespace package must exist
- Namespace package must be built
- Know the specification version field name (e.g., "openapi", "asyncapi")

### `/add-reference-support` - Add apidom-reference Support

Makes a spec version parseable, resolvable, dereferenceable and bundleable through apidom-reference.

- **New namespace**: parse parsers wrapping the adapters, resolve/dereference/bundle strategies, `saturated.ts` registrations, `package.json` dependencies and exports, tests, README
- **Version in an existing namespace**: README media types, fixture and parser test bumps, dereference handling for new referenceable fields (AsyncAPI 2.6, PR #2537)

**Prerequisites:** namespace and both adapters exist and are built.

### `/update-ls-config` - Update Language Service Config

Updates apidom-ls configuration for a namespace package by generating completion, documentation, and lint configurations.

**Usage:**
```
/update-ls-config
```

Claude will:
1. Analyze the selected namespace package structure
2. Extract element definitions and properties
3. Generate autocomplete configuration
4. Generate hover documentation configuration
5. Generate validation/lint rules
6. Integrate with apidom-ls configuration

**When to use:**
- After creating a new namespace package
- After updating an existing namespace with new elements
- When IDE support (autocomplete, hover, validation) is needed for a specification version

**What it creates:**
- `packages/apidom-ls/src/config/{spec}/{version}/` directory structure
- `completion.ts` - Autocomplete suggestions for all properties
- `documentation.ts` - Hover documentation for complex properties
- `lint/` directory - Validation rules for type checking and required fields
- `meta.ts` - Aggregates all configuration
- Updates to target-specs.ts and main config files

**Prerequisites:**
- Namespace package must exist and be built
- Parser adapter packages should exist (recommended)
- Access to specification documentation for generating docs

### `/review-ls-changes` - Review Language Service Changes

Reviews apidom-ls changes on a branch against the official specification (lint rules, documentation values, completion, URL anchors) and produces a findings report with spec citations.

## Evaluating Skills

Each `evals/evals.json` follows the skill-creator schema plus a `fixture` field that names the repository state the eval runs against:

| Skill | Eval | Fixture |
|-------|------|---------|
| add-namespace | OAS 3.2 element field set (PR #5110 review findings); A2A namespace conventions (PR #5182 review findings) | `git worktree add <dir> ef97b5c32^`, `215034538^` |
| add-parser-adapter | OAS 3.2 adapters; AsyncAPI 2.6 adapter extension (PR #2536) | `ef97b5c32^`, `35c7e8f0d` |
| add-reference-support | OAS 3.2 reference wiring plan; AsyncAPI 2.6 reference extension (PR #2537) | `ef97b5c32^`, `c2d643904` |
| update-ls-config | AsyncAPI 3 Operation Reply lint rules (PR #5104 review findings); A2A LS coverage (PR #5182 review findings) | `c201bb1f8^`, `6644586cb` |
| review-ls-changes | 8 planted defects in OAS 3.2 LS config | branch from `main` + the patch (copy it to `/tmp` first, it isn't on `main`; see the eval's `fixture.note`) |
| add-spec-version | OAS 3.2 field map and phase plan; phase gating (AsyncAPI 3.1 at phase 3); AsyncAPI 2.6 phase 4 plan; **unseen:** Arazzo 1.1 plan (extend), Overlay 1.2 plan (brand-new spec) | `ef97b5c32^`, `f85f39593`, `36cbf2f73`, `f85f39593`, `f85f39593` |

Run them with the `skill-creator` skill: one subagent with the skill and one baseline (previous skill version, or no skill) per eval, working read-only in the fixture worktree and writing to an outputs directory outside the repo. Most assertions are checkable by script (getter names, regexes, file names, message patterns).

Fixture worktrees are old commits: they have no `.claude/skills`, no `node_modules` and no builds. Call the scripts by their path in the main checkout, and expect `check-ls-coverage.mjs` to fall back to pattern mode there.

Caveat: the root `CLAUDE.md` and the skills themselves mention most OAS 3.2, AsyncAPI 2.6 and A2A findings, so those evals measure regressions more than ability. The Arazzo 1.1 and Overlay evals use versions that no skill or `CLAUDE.md` mentions; they are the ones that show whether the workflow generalizes. Keep it that way: don't copy their answers into the skills.

## Using Skills

Skills are invoked using slash commands in Claude Code:

```bash
/add-spec-version
```

Claude may also pick a skill on its own when a request matches its `description`. For end-to-end "add support for {spec} {version}" requests that is `/add-spec-version`, which calls the other skills phase by phase.

## Creating New Skills

1. Create `.claude/skills/{skill-name}/SKILL.md` with frontmatter:

   ```markdown
   ---
   name: my-skill
   description: What the skill does and when to use it, including phrasings that don't name the skill.
   ---
   ```

2. Keep `SKILL.md` to the workflow, the rules and a checklist (well under 500 lines). Put templates and long examples in `references/`, and say in `SKILL.md` at which step each reference file is read. Put deterministic checks in `scripts/`.
3. Add `evals/evals.json` with at least one eval on a fixture commit, and run it with `skill-creator` against a baseline.

### YAML Frontmatter Fields

- `name`: Command name for the skill (required)
- `description`: What the skill does - Claude uses this to decide when to apply it (recommended)
- `disable-model-invocation`: Set to `true` to prevent Claude auto-triggering (default: `false`; omit when using the default)
- `user-invocable`: Set to `false` to hide from `/` menu (default: `true`; omit when using the default)
- `allowed-tools`: Tools Claude can use without asking permission (optional)
- `model`: Specific model to use when skill is active (optional)
- `context`: Set to `fork` to run in isolated subagent context (optional)
- `agent`: Subagent type like `Explore`, `Plan`, `general-purpose` (optional)

## Skill Development Guidelines

Lessons from the 2026-10-15 audit, which found templates that no longer matched the code and rules that contradicted each other:

1. **Templates come from real files.** Copy a template from an existing package and name that file next to it, so the next maintainer can diff the two. Never write a template from memory: the audit found invented `target-specs.ts`, `linterParams` and completion-condition shapes, and one of them had already been copied into the A2A config.
2. **Never name a function, script, flag or file that you haven't checked exists.** apidom-ls silently ignores unknown completion condition functions, so an invented name produces no error, only wrong behaviour.
3. **One rule, one place.** When a rule lives in `CLAUDE.md` or `packages/apidom-ls/CLAUDE.md`, point to it instead of restating it. Copies drift and end up contradicting each other.
4. **Prefer a script over a prose check** when the check is mechanical, and keep `add-spec-version/scripts/test/smoke.sh` passing after changing a script.
5. **Questions need a fallback.** Skills also run as subagents (from `/add-spec-version`) that can't ask the user, so each "ask the user" step says where to infer the answer from (tracking doc, branch, field map).
6. **Lessons go into rules, answers don't.** Add the general lesson from a review (e.g. "fields come only from Fixed Fields tables"), not the specific answer for one spec version, or the evals stop measuring anything.

## Related Documentation

- **CLAUDE.md**: Project-specific instructions for Claude Code
- **packages/apidom-ls/CLAUDE.md**: Lint rule and test patterns for apidom-ls
- **FOLLOW-UPS.md**: Open decisions and probable bugs found while working on the skills
