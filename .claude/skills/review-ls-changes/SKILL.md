---
name: review-ls-changes
description: Reviews changes in the apidom-ls package against the target API specification, checking lint rules, documentation values, and URL anchors for correctness and completeness
disable-model-invocation: false
user-invocable: true
---

# Review Language Service Changes Skill

**Skill Name:** `review-ls-changes`
**Description:** Reviews changes in `packages/apidom-ls` against the target specification, producing a structured report of incorrect, missing, and incomplete lint rules and documentation.

## Overview

This skill verifies that the language service configuration for a given specification namespace is correct and complete. It covers:

- **Lint rules**: Required-field rules match what the spec marks as required; no rules exist for fields the spec marks as optional; allowed-fields lists are complete and accurate
- **Documentation values**: Field descriptions, required/optional labels, and linked text accurately reflect the spec
- **Documentation URL anchors**: Links resolve to real spec sections
- **Element config coverage**: Every element type registered in the namespace is also registered in `config.ts`

The skill was developed from a full review of the A2A 1.0 implementation (PROVCON-5343) and encodes the lessons learned from that session.

## When to Use

Use this skill when:
- A new specification namespace has been wired into `apidom-ls`
- An existing namespace has been updated and the LS config changes need verification
- A PR review is in progress and spec compliance needs to be confirmed
- You need a structured gap analysis before submitting a PR

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

For specs with a normative proto file or JSON Schema, use the spec page first. If the spec page cannot be fully fetched (too long), use curl + Python to extract the relevant section:

```bash
curl -s "{spec-url}" | python3 -c "
import sys, re
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
    def handle_data(self, data):
        stripped = data.strip()
        if stripped:
            self.text.append(stripped)

parser = TextExtractor()
parser.feed(sys.stdin.read())
full = '\n'.join(parser.text)

# Find target section — adjust pattern as needed
positions = [m.start() for m in re.finditer('4\\.5\\. Security Objects', full)]
start = positions[-1]  # last occurrence = actual content (earlier ones are TOC)
print(full[start:start+20000])
"
```

**Always use the last occurrence** of a section heading — earlier occurrences are usually the table of contents, not the actual content.

## Skill Instructions

### Phase 1: Collect Context

Ask the user (or infer from the current branch/diff) for:

1. **Specification URL** — the authoritative spec page
2. **Config directory** — e.g. `packages/apidom-ls/src/config/a2a/`
3. **Namespace package** — e.g. `packages/apidom-ns-a2a-1/`
4. **Scope** — all elements or specific ones (default: all)

### Phase 2: Build the Spec Field Map

Fetch every object definition from the spec. For each object record:
- Exact camelCase field name as used in JSON (see §5.5 JSON Field Naming Convention or equivalent)
- Required: Yes / No
- Type

**Key pitfalls learned from A2A review:**
- Deprecated objects (e.g. `ImplicitOAuthFlow`, `PasswordOAuthFlow`) may appear only as field types within a parent object, with **no separate section and no field table** — do not invent required/optional status for them
- Discriminated unions (e.g. `SecurityScheme`, `OAuthFlows`) list their variant fields as `Optional (OneOf)` — this is distinct from "optional field on the object"
- A "MUST contain exactly one of" note on a union does **not** make any individual variant field required

**Fetch strategy when the page is too long:**
The spec page may truncate in `WebFetch`. Use the curl+Python approach above, searching for each section heading. Always take the **last** occurrence of a heading string (the actual content, not the TOC entry).

### Phase 3: Build the Implementation Map

For each element registered in `config.ts`:

```bash
# List all element configs
find packages/apidom-ls/src/config/{spec-dir} -name "*.ts" | sort

# List all lint rules per element
ls packages/apidom-ls/src/config/{spec-dir}/{element-dir}/lint/

# Read allowed-fields to compare field list
cat packages/apidom-ls/src/config/{spec-dir}/{element-dir}/lint/allowed-fields.ts

# Find all required-field rules
find packages/apidom-ls/src/config/{spec-dir} -name "*--required.ts"

# Find all element types in the namespace
grep -r "this.element = " packages/{namespace-pkg}/src/elements/
```

Also read `config.ts` to identify which element types are registered:

```bash
cat packages/apidom-ls/src/config/{spec-dir}/config.ts
```

### Phase 4: Check Lint Rules

#### 4.1 Incorrect Required-Field Rules

For each `*--required.ts` file, check whether the spec marks the field as **Yes** (required).

**Flag as incorrect if:**
- The spec marks the field as **No** (optional)
- The object has **no spec section** (deprecated flow, undocumented type) — required status is unverifiable

**Do not flag:**
- Fields correctly marked Yes in the spec

#### 4.2 Missing Required-Field Rules

For each object in the spec with required fields (Yes), verify a `{field}--required.ts` rule exists.

**Flag as missing if** no such rule exists and the spec says Yes.

Common pattern: `*--type.ts` exists but the paired `*--required.ts` is absent — this is a systematic gap.

#### 4.3 Allowed-Fields Accuracy

For each `allowed-fields.ts`, compare `linterParams[0]` against the spec's field list for that object.

**Flag if:**
- A field in the array is not in the spec (extra field — causes false positives)
- A spec field is absent from the array (missing field — allows unknown fields through)

#### 4.4 Missing Element Configs

Compare element types from `config.ts` against all element types defined in the namespace:

```bash
# All element types in namespace
grep -r "this.element = " packages/{namespace-pkg}/src/elements/ | grep -v "nces/"

# All keys in config.ts
grep "^  [a-zA-Z]" packages/apidom-ls/src/config/{spec-dir}/config.ts
```

**Flag any element type present in the namespace but absent from `config.ts`.**

For each missing config, note which fields are required per spec — these need `*--required.ts` rules in the new config.

### Phase 5: Check Documentation Values

For each `documentation.ts` file, check every `docs` string against the spec:

#### 5.1 Required/Optional Labels

If a `docs` string says "(required)" or "optional", verify it matches the spec's Yes/No for that field.

**Common mistake found in A2A review:**
```typescript
// ❌ WRONG — capabilities is required (Yes) per spec
docs: '...optional capabilities supported by the agent...'

// ❌ WRONG — ImplicitOAuthFlow has no spec section; field is optional
docs: 'The authorization URL to be used for this flow (string, required).'
```

#### 5.2 Field Descriptions

Verify the description text matches the spec's description for that field. Paraphrasing is acceptable; factual errors (wrong type, wrong semantics) must be flagged.

#### 5.3 Empty Documentation Arrays

Flag any `const documentation: never[] = []` — these stubs provide no hover information. List which fields from the spec should have entries.

### Phase 6: Check Documentation URL Anchors

For each URL in documentation files, verify the anchor resolves to a real section on the spec page.

**Anchor format rules (learned from A2A review):**

| Spec site | Correct anchor format | Wrong formats to catch |
|---|---|---|
| `a2a-protocol.org/latest/specification/` | `#451-securityscheme` (numbered) | `#securityscheme`, `#SecurityScheme` |
| `a2a-protocol.org/latest/definitions/` | `#agent-capabilities` (kebab-case) | `#agentcapabilities`, `#AgentCapabilities` |
| `spec.openapis.org` | Check actual page anchors | Varies |
| `github.com/.../versions/X.md` | `#camelCaseAnchor` | `#kebab-case-anchor` |

**Extract all URLs from docs:**
```bash
grep -rn "https://" packages/apidom-ls/src/config/{spec-dir}/*/documentation.ts
```

Check each unique anchor:
- Does the section exist in the spec?
- Is the anchor format correct for that spec site?

**A2A-specific note**: The `/specification/` page uses numbered anchors (`#441-agentcard`); the `/definitions/` page uses kebab-case (`#agent-card`). These are different pages — pick one consistently per file.

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
| path/to/missing.ts | fieldName | Yes | §X.Y link |

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

### Summary
| Category | Count |
|---|---|
| Incorrect required rules | N |
| Missing required rules | N |
| Missing element configs | N |
| Documentation value errors | N |
| Empty documentation stubs | N |
| Wrong URL anchors | N |
```

Include a spec source link (section number + URL) for **every finding**. A finding without a spec citation is not actionable.

## Key Lessons from A2A 1.0 Review

### Deprecated Flows Have No Spec Section
`ImplicitOAuthFlow` and `PasswordOAuthFlow` appear only as `Optional (OneOf)` fields inside `OAuthFlows`. They have no field tables in the spec. Any `--required.ts` rule for fields on these objects cannot be verified and should be removed.

### Secondary Sources Can Contradict the Spec
The A2A `/definitions/` page and `a2a.proto` both marked `ImplicitOAuthFlow.authorization_url` as optional. However, the user confirmed `authorizationUrl` is required for `ImplicitOAuthFlow`. Always confirm against the specification page — it is the sole source of truth.

### `scopes` Is Systematically Missing
For all active (non-deprecated) OAuth flows, `scopes` was marked **Yes** but no `scopes--required.ts` existed. Check for this pattern when reviewing any OAuth-style spec.

### New Element Configs May Have No Required Rules
When element configs are added quickly (stubs), they often contain only `allowed-fields.ts`. Always cross-check against the spec to add required-field rules.

### Spec Page Truncation
`WebFetch` truncates long spec pages before reaching late sections (e.g., section 4.5 on A2A). Always fall back to `curl | python3` extraction when `WebFetch` reports truncation.

### Required vs Optional Wording in Docs
The word "optional" in a `docs` string is factually wrong for a required field. Always match the spec's Yes/No designation.

### URL Anchor Formats Differ Between Spec Pages
The `/specification/` and `/definitions/` pages on the same spec site use different anchor formats. Mixing them creates broken links. Pick the spec page as the canonical URL and use its actual anchor format.

## Example Invocation

```
/review-ls-changes
```

Then provide when prompted:
- Spec URL: `https://a2a-protocol.org/latest/specification/`
- Config dir: `packages/apidom-ls/src/config/a2a/`
- Namespace: `packages/apidom-ns-a2a-1/`
