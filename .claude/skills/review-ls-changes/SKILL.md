---
name: review-ls-changes
description: Reviews branch or PR changes in packages/apidom-ls against the official API specification (OpenAPI, AsyncAPI, A2A, Arazzo, etc.), checking lint rules (required, type, enum/format, allowed-fields, targetSpecs scoping), documentation values, completion files, element config coverage, and documentation URL anchors for correctness and completeness, then produces a structured findings report with spec citations. Use whenever LS config changes need spec-compliance verification, even if the user just says "review my LS changes" or "check the lint rules". Not for JSON Schema dialect configs.
---

# Review Language Service Changes Skill

## Overview

This skill verifies that the language service configuration for a given specification namespace is correct and complete. It covers:

- **Lint rules**: `*--required.ts` rules exist exactly for the fields the spec marks as required (none for optional fields); every field, required or optional, has a type rule, plus `--equals` / `--format-*` rules where the spec fixes its values or format; allowed-fields lists are complete and accurate
- **Documentation values**: Field descriptions, required/optional labels, and linked text accurately reflect the spec
- **Documentation URL anchors**: Links resolve to real spec sections
- **Element config coverage**: Every element type registered in the namespace is also registered in `config.ts`

The skill encodes lessons learned from production reviews of multiple specification namespaces.

### Reference Files

Read these on demand, at the step that points to them — not all up front:

| File | Contents | Read when |
|---|---|---|
| `references/spec-field-extraction.md` | Source-of-truth rules, curl+Python extraction scripts, required-field formats, raw Markdown sources, mandatory table verification | Phase 2 (before fetching any spec content) and before reporting any Issue 1 finding |
| `references/lint-rule-checks.md` | Implementation-map commands, detailed criteria for checks 4.1–4.8, `targetSpecs` grep commands | Phases 3 and 4 |
| `references/docs-completion-anchor-checks.md` | Documentation value checks, completion file commands, anchor format table | Phases 5 and 6 |
| `references/key-lessons.md` | Recurring mistake patterns from past reviews | Before Phase 4, and whenever a finding seems borderline |

## When to Use

Use this skill when:
- A new specification namespace has been wired into `apidom-ls`
- An existing namespace has been updated and the LS config changes need verification
- A PR review is in progress and spec compliance needs to be confirmed
- You need a structured gap analysis before submitting a PR

## When NOT to Use

- **JSON Schema dialects** (`packages/apidom-ls/src/config/json-schema/`, Draft 4/6/7, 2019-09, 2020-12): the rules are spread across several specifications (core, validation, hyper-schema, ...) and keyword constraints are expressed in prose within each keyword's description (e.g. [2020-12 Validation §6.1.1](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-validation-01#section-6.1.1)) rather than in Fixed Fields tables. The table-driven field map this skill relies on does not apply; review such changes manually against each relevant specification.

## Prerequisites

1. **Know the authoritative spec URL** — the single source of truth, e.g.:
   - A2A 1.0: `https://a2a-protocol.org/latest/specification/`
   - OpenAPI 3.2: `https://spec.openapis.org/oas/v3.2.0`
   - AsyncAPI 3.0: `https://www.asyncapi.com/docs/reference/specification/v3.0.0`
2. **Know the config directory** — e.g. `packages/apidom-ls/src/config/a2a/`
3. **Know the namespace package** — e.g. `packages/apidom-ns-a2a-1/`
4. **The monorepo must be built** (`npm run build` from root)

## CRITICAL: Source of Truth

**Always verify against the official specification page**, not secondary sources (definitions pages, proto files, JSON schemas). These secondary sources can diverge from the spec in required/optional designations.

**Always use the last occurrence** of a section heading — earlier occurrences are usually the table of contents, not the actual content. Extraction scripts and fetch strategies are in `references/spec-field-extraction.md`.

## Skill Instructions

### Phase 1: Collect Context

Ask the user (or infer from the current branch/diff) for:

1. **Specification URL** — the authoritative spec page
2. **Config directory** — e.g. `packages/apidom-ls/src/config/a2a/`
3. **Namespace package** — e.g. `packages/apidom-ns-a2a-1/`
4. **Scope** — all elements or specific ones (default: all)
5. **Base and decisions** — the branch's base (for stacked PRs the previous phase's branch, not `main`) and any decisions already made with the user (e.g. fields deliberately taken from the JSON Schema). Review only what the base doesn't contain, and report contradictions to recorded decisions, not the decisions themselves. If the working tree has uncommitted changes, review the committed content (`git show {sha}:{path}`) and say so in the report.

### Phase 2: Build the Spec Field Map

**Read `references/spec-field-extraction.md` now**, before fetching any spec content.

1. Identify how the spec marks required fields (separate `Required` column, `REQUIRED` marker in the description, or prose only) by inspecting one known object first.
2. Fetch every object definition. Prefer the raw Markdown source; fall back to curl+Python extraction when `WebFetch` truncates. Take the **last** occurrence of each heading.
3. For each object record: exact camelCase field name, Required (Yes / No), Type, and **NEW vs INHERITED** when the spec extends a parent version (cross-check against the parent version's element files).
4. Confirm each extraction contains the actual Fixed Fields table rows with required-status information — not the TOC entry.
5. Note conditionally required fields separately; they need conditional rules, not plain `--required.ts`.
6. Diff the prose of the new and parent versions as well (notes, value lists, "MAY be extended" sentences): prose-only changes need documentation updates even when no table row changed (AsyncAPI 3.1's Operation `messages` note).
7. For objects specified outside the spec (AsyncAPI bindings), the binding README is the source; the official JSON Schema is secondary. Note where they disagree and present such findings with both readings rather than as a plain defect. When the README's own example contradicts its Fixed Fields table, the table wins; the example is an upstream error.

Key pitfalls: objects referenced only as a field type (no section, no field table) have no verifiable required status; union / `oneOf` alternatives are not individually required, and "MUST contain exactly one of" does not make any variant required.

### Phase 3: Build the Implementation Map

**Read the "Phase 3 Detail" section of `references/lint-rule-checks.md`** for the exact commands.

1. List all element configs, lint rules, `allowed-fields.ts`, `*--required.ts`, `*--type.ts`, `*--equals.ts`, `*--format-*.ts`, and `completion.ts` files under the config directory.
2. Read `config.ts` and list the namespace's element types (`this.element = `).
3. Verify **each discriminated-union subtype** has its own `config.ts` key.
4. Check the spec changelog for removed objects; keep their config dirs if an older supported version still defines them, but verify `targetSpecs` scoping.
5. Run the mechanical coverage check first and turn its output into findings (Issues 2, 3, 5, 7, 8, 10); then spend the manual review on what it can't see (required-ness, values, scoping):
   ```bash
   node .claude/skills/add-spec-version/scripts/check-ls-coverage.mjs \
     packages/apidom-ns-{spec}-{version} packages/apidom-ls/src/config/{spec} --ignore {internal elements}
   ```
   `NO-META` = Issue 3, `NO-DOCS` = Issue 5, `NO-TYPE` = Issue 7, `NO-COMPL` = Issue 8, `NAMING`/`STUB` = Issue 10. Build apidom-ls (`npm run build:es`) first; without the built `config.mjs` helper-generated completion items are missed.

### Phase 4: Check Lint Rules

**Read the "Phase 4 Detail" section of `references/lint-rule-checks.md`** for full criteria and commands, and `references/key-lessons.md` for recurring patterns. Check:

- [ ] **4.1 Incorrect required-field rules** — every `*--required.ts` matches a field the spec marks required; no required rules for fields of objects without their own definition. **Self-check gate:** before reporting, re-fetch and quote the raw Fixed Fields table row (see `references/spec-field-extraction.md`). A finding with no quoted raw row is **not admissible**.
- [ ] **4.2 Missing required-field rules** — every spec-required field has `{field}--required.ts` (watch for `*--type.ts` without a paired `*--required.ts`).
- [ ] **4.3 Allowed-fields accuracy** — `linterParams[0]` has no extra and no missing fields; version-scoped files (e.g. `allowed-fields-3-2.ts`) contain new AND carried-over fields.
- [ ] **4.4 Target spec scoping** — existing entries for unchanged fields include the new version; entries for NEW fields target only the new version; removed/changed fields stay limited; version-scoped files do not overlap and cover every supported version.
- [ ] **4.5 Missing type lint rules** — every typed field has `{field}--type.ts`; array-of-objects fields use `apilintArrayOfElementsOrClasses` and map-of-objects fields use `apilintChildrenOfElementsOrClasses`, not `apilintType` alone; fields that can hold references also accept the dereferenced element (element name, plus the namespace's `referenced-element` value when it differs).
- [ ] **4.6 Missing enum/value-constraint rules** — every field the spec limits to a fixed set of values has `{field}--equals.ts` (`apilintValueOrArray`) and no `--type` rule duplicating it; values that depend on a field of a parent object (ROS 2 `role` / Operation `action`) are checked with a `parent` condition path; every URI/URL or email field has a `--format-uri` / `--format-email` rule.
- [ ] **4.7 Missing element configs** — every namespace element type (and union subtype) is registered in `config.ts`.
- [ ] **4.8 Rule conventions** — new codes in `codes.ts` are unique and follow the naming (`{SPEC}{VERSION}_{ELEMENT}_FIELD_{FIELD}_{RULE}`) and numbering of their block (element block per `10000`, `100` per field, `+1` for a second rule on the same field); messages match the style of the same spec directory (`should always have a '{field}'`; type messages vary per directory); no `'reference'` in `linterParams`; file names `{kebab-field}--{rule}.ts`; every new rule file is imported in its `lint/index.ts`.

### Phase 5: Check Documentation Values

**Read the "Phase 5 Detail" section of `references/docs-completion-anchor-checks.md`.** For each `documentation.ts` and `completion.ts`, check:

- [ ] **5.1** "(required)" / "optional" labels match the spec designation
- [ ] **5.2** Field descriptions are factually correct (paraphrasing is fine; wrong type/semantics is not)
- [ ] **5.3** No `const documentation: never[] = []` stubs
- [ ] **5.4** Every registered element has a non-empty `completion.ts`

### Phase 6: Check Documentation URL Anchors

**Read the "Phase 6 Detail" section of `references/docs-completion-anchor-checks.md`** for the anchor format table and extraction command.

1. Determine the correct anchor format by inspecting the actual spec page.
2. Extract every URL from `documentation.ts` files. `node .claude/skills/add-spec-version/scripts/verify-urls.mjs --diff {base} --new-only` checks every URL the change introduces against the real page (GitHub `.md` anchors against the raw markdown, GitHub directory links against the directory's `README.md`); `BROKEN` lines are findings, `UNVERIFIED` lines need a manual look. Without `--new-only` it also re-checks links that merely sat on rewritten lines; report those under pre-existing problems.
   Before suggesting a replacement link (e.g. "use the README's URL"), fetch it: the ROS 2 README's own `docs.ros.org/en/rolling/...` links return 404.
3. For each unique anchor, verify the section exists and the anchor format is correct; use one canonical page per element consistently.

### Phase 7: Produce the Report

Structure the report as follows. Only include sections that have findings.

```
## [Spec Name] apidom-ls Review Report

### ✅ Verified Correct
(list what was explicitly checked and found correct, for confidence)

### Issue 1 — Incorrect Required-Field Lint Rules
| File | Field | Spec says | Spec source |
|---|---|---|---|
| path/to/file.ts | fieldName | No / undocumented | §X.Y link |

### Issue 2 — Missing Required-Field Lint Rules
| Missing file | Field | Spec says | Spec source |
|---|---|---|---|
| path/to/missing.ts | fieldName | required | §X.Y link |

### Issue 3 — Missing Element Configs
| Element (config.ts key) | Required fields per spec | Spec source |
|---|---|---|
| elementName | field1, field2 | §X.Y link |

### Issue 4 — Incorrect Documentation Values
| File:line | Field | Problem | Spec source |
|---|---|---|---|
| file.ts:N | fieldName | description of error | §X.Y link |

### Issue 5 — Empty Documentation Stubs
| File | Fields to add |
|---|---|
| file.ts | field1, field2, field3 |

### Issue 6 — Incorrect Documentation URL Anchors
| File:line | Current anchor | Correct anchor |
|---|---|---|
| file.ts:N | #wrong | #correct |

### Issue 7 — Missing Type Lint Rules
| Missing file | Field | Spec type | Spec source |
|---|---|---|---|
| path/to/missing--type.ts | fieldName | string | §X.Y link |

### Issue 8 — Missing or Empty Completion Files
| Element config dir | Status | Fields to add |
|---|---|---|
| path/to/element/ | missing / empty | field1, field2 |

### Issue 9 — Incorrect Target Spec Scoping
| File:line | Field / entry | Current targetSpecs | Expected targetSpecs |
|---|---|---|---|
| path/to/rule.ts:N | fieldName | OpenAPI3 | OpenAPI32 (field new in 3.2) |

### Issue 10 — Rule Convention Violations
[Duplicate codes, non-standard messages, `'reference'` in linterParams, unregistered rule files, wrong enum values]

### Issue 11 — Missing Enum/Value-Constraint Lint Rules
| Missing file | Field | Allowed values / format | Spec source |
|---|---|---|---|
| path/to/missing--equals.ts | fieldName | val1\|val2\|val3 | §X.Y link |
| path/to/missing--format-uri.ts | fieldName | URI | §X.Y link |

### Summary
| Category | Count |
|---|---|
| Incorrect required rules | N |
| Missing required rules | N |
| Missing type rules | N |
| Missing element configs | N |
| Documentation value errors | N |
| Empty documentation stubs | N |
| Wrong URL anchors | N |
| Missing/empty completion files | N |
| Incorrect target spec scoping | N |
| Rule convention violations | N |
| Missing enum/value-constraint rules | N |
```

Include a spec source link (section number + URL) for **every finding**. A finding without a spec citation is not actionable.

## Key Lessons

Recurring mistake patterns (TOC entries mistaken for tables, required-status formats, secondary sources, missing `scopes--required.ts`, missing type/equals/format rules and completion files in stubs, union subtypes, new fields on existing objects, array-of-objects linters, removed objects, two-way `targetSpecs` updates) are documented in `references/key-lessons.md`. Read it before Phase 4.

## Example Invocation

```
/review-ls-changes
```

When run as a subagent (for example from `/add-spec-version`), or when the branch name, the diff or a tracking document such as `ADD-{SPEC}-{VERSION}.md` makes the inputs clear, infer them and state what you inferred in the report instead of asking. Otherwise provide when prompted:
- Spec URL: e.g. `https://spec.openapis.org/oas/v3.2.0` or `https://www.asyncapi.com/docs/reference/specification/v3.0.0`
- Config dir: e.g. `packages/apidom-ls/src/config/openapi/`
- Namespace: e.g. `packages/apidom-ns-openapi-3-2/`
