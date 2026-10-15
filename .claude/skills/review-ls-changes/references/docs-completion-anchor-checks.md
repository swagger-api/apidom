# Documentation, Completion, and URL Anchor Checks

Detailed check criteria and commands for **documentation values and completion files** (Phase 5 of `SKILL.md`) and **documentation URL anchors** (Phase 6 of `SKILL.md`).

## Phase 5 Detail: Check Documentation Values

For each `documentation.ts` file, check every `docs` string against the spec:

### 5.1 Required/Optional Labels

If a `docs` string says "(required)" or "optional", verify it matches the spec's required/optional designation for that field.

```typescript
// ❌ WRONG — field is required per spec
docs: '...optional {field} supported by ...'

// ❌ WRONG — object has no spec section; field is actually optional
docs: 'The {field} to be used for this flow (string, required).'
```

### 5.2 Field Descriptions

Verify the description text matches the spec's description for that field. Paraphrasing is acceptable; factual errors (wrong type, wrong semantics) must be flagged.

### 5.3 Empty Documentation Arrays

Flag any `const documentation: never[] = []` — these stubs provide no hover information. List which fields from the spec should have entries.

### 5.4 Missing or Empty Completion Files

For each element registered in `config.ts`, check whether a `completion.ts` file exists and contains entries.

**Flag as missing** if no `completion.ts` exists for an element.

**Flag as empty** if `completion.ts` exports `never[]` or an empty array — completion entries drive IDE auto-complete for all fields and are especially important for required fields.

```bash
# Find elements with no completion file
for dir in packages/apidom-ls/src/config/{spec-dir}/*/; do
  [ ! -f "${dir}completion.ts" ] && echo "No completion.ts: $dir"
done

# Find completion stubs
grep -rln "never\[\]\|= \[\]" packages/apidom-ls/src/config/{spec-dir}/*/completion.ts
```

A common pattern: a new element config is added quickly with `allowed-fields.ts` only; `completion.ts` is left as a stub or omitted entirely.

## Phase 6 Detail: Check Documentation URL Anchors

For each URL in documentation files, verify the anchor resolves to a real section on the spec page.

Different spec sites use different anchor formats — determine the correct format by inspecting the actual page before checking anchors:

| Spec site pattern | Common anchor format |
|---|---|
| Numbered section pages (e.g. `#451-objectname`) | lowercase with hyphens, prefixed by section number |
| GitHub Markdown (e.g. `github.com/.../versions/X.md`) | `#camelCaseAnchor` |
| `spec.openapis.org` | varies by version — check the actual page |
| Separate definition/reference pages | often kebab-case (`#object-name`) |

If the same spec has multiple pages (e.g. a `/specification/` page and a `/definitions/` page), anchor formats typically differ between them. Pick one page as the canonical URL and use its anchor format consistently within each file.

**Extract all URLs from docs:**
```bash
grep -rn "https://" packages/apidom-ls/src/config/{spec-dir}/*/documentation.ts
```

Check each unique anchor:
- Does the section exist in the spec?
- Is the anchor format correct for that spec site?

