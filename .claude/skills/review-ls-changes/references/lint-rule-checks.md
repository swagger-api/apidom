# Lint Rule Checks

Detailed commands and check criteria for building the **implementation map** (Phase 3 of `SKILL.md`) and for **checking lint rules** (Phase 4 of `SKILL.md`): incorrect/missing required rules, allowed-fields accuracy, `targetSpecs` scoping, type rules, enum/value constraints, and element config coverage.

## Phase 3 Detail: Build the Implementation Map

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

# Find all type-checking rules
find packages/apidom-ls/src/config/{spec-dir} -name "*--type.ts"

# Check which elements have completion files vs stubs
find packages/apidom-ls/src/config/{spec-dir} -name "completion.ts" | sort
grep -rn "never\[\]" packages/apidom-ls/src/config/{spec-dir}/*/completion.ts

# Find all element types in the namespace
grep -r "this.element = " packages/{namespace-pkg}/src/elements/
```

Also read `config.ts` to identify which element types are registered:

```bash
cat packages/apidom-ls/src/config/{spec-dir}/config.ts
```

**Discriminated union subtypes**: For any union type (e.g. `SecurityScheme` with variants `ApiKeySecurityScheme`, `OAuth2SecurityScheme`, etc.), verify that **each subtype** has its own element type key registered in `config.ts`. A missing subtype entry means zero lint/docs/completion for all of that subtype's fields.

**Deprecated/removed objects**: Also fetch the spec's changelog or "What's New" page to identify objects removed in this version. For each config directory that corresponds to a removed object:
- If the LS still supports an older spec version where the object exists, the config directory **must stay**. Verify instead that its rules, documentation, and completion entries have `targetSpecs` limited to the versions where the object exists (see [4.4 Target Spec Scoping](#44-target-spec-scoping)).
- Flag the directory for removal only if no supported version defines the object.

## Phase 4 Detail: Check Lint Rules

### 4.1 Incorrect Required-Field Rules

For each `*--required.ts` file, check whether the spec marks the field as **required**.

**Flag as incorrect if:**
- The spec marks the field as optional (`No` in a Required column, or no `REQUIRED` marker in the description)
- The object has **no definition of its own** in the spec (it is only referenced as a field type in a parent, with no field table) — required status is unverifiable, so there should be no `--required.ts` rule for its fields

**Do not flag:**
- Fields the spec marks as required
- Conditional rules for fields that are required only in some situations (e.g. OpenAPI Parameter `required` when `in: path`) — verify the condition instead

**Self-check gate — mandatory before reporting any finding here:**
Before adding ANY entry to this issue section, re-fetch the exact Fixed Fields table row for that field using the mandatory table verification approach from Phase 2. You MUST be able to quote the raw table row (field name + type + required status + description text) as evidence. If you cannot produce the raw row, do not flag the rule — absence of evidence is not evidence of incorrectness.

Examples of required evidence:
> Raw spec row (Required column): `capabilities | AgentCapabilities | Yes | A2A Capability set supported by the agent.`

> Raw spec row (description marker): ``| <a name="info-title"></a>title | `string` | **REQUIRED**. The title of the API. |``

A finding with no quoted raw row is **not admissible** in this section.

### 4.2 Missing Required-Field Rules

For each object in the spec with required fields, verify a `{field}--required.ts` rule exists.

**Flag as missing if** no such rule exists and the spec marks the field as required.

Common pattern: `*--type.ts` exists but the paired `*--required.ts` is absent — this is a systematic gap.

### 4.3 Allowed-Fields Accuracy

For each `allowed-fields.ts`, compare `linterParams[0]` against the spec's field list for that object.

**Flag if:**
- A field in the array is not in the spec (extra field — causes false positives)
- A spec field is absent from the array (missing field — allows unknown fields through)

**When extending a parent version**: If a version-scoped file exists (e.g., `allowed-fields-3-2.ts`), verify it contains ALL fields valid for that version — both new fields and fields carried over from the parent. New fields added to an existing object are the most common source of omissions. Also check: if the 3.2 list is identical to the 3.1 list, the file may be redundant or the new fields may have been forgotten.

### 4.4 Target Spec Scoping

Lint rules, `documentation.ts` entries, and `completion.ts` entries carry a `targetSpecs` property built from the constants in `packages/apidom-ls/src/config/{spec-dir}/target-specs.ts` (e.g. `OpenAPI30`, `OpenAPI31`, `OpenAPI32`, and the aggregate `OpenAPI3`). When a new version is added to an existing spec, check scoping in both directions:

**Existing rules/docs/completion — must now include the new version** when the field or object is unchanged in it:
- Either the entry uses an aggregate constant that already includes the new version (e.g. `OpenAPI3`), or the new version constant was added explicitly (e.g. `[...OpenAPI31, ...OpenAPI32]`)
- An entry still scoped to older versions only means documents in the new version silently get no validation, hover docs, or completion for that field

**New rules/docs/completion — must target only the new version** when they cover fields or objects NEW in that version:
- e.g. `media-type/lint/item-schema--type.ts` (`itemSchema` is new in OAS 3.2) must use `targetSpecs: OpenAPI32`, not `OpenAPI3`
- A wider scope makes the rule fire, or the completion appear, for older-version documents where the field is not valid

**Removed or changed fields** must keep `targetSpecs` limited to the versions where they are valid — never delete such entries while older versions are still supported.

**Version-scoped files** (e.g. `allowed-fields.ts` + `allowed-fields-3-2.ts`): their `targetSpecs` must not overlap, and together they must cover every supported version.

```bash
cat packages/apidom-ls/src/config/{spec-dir}/target-specs.ts

# Review targetSpecs per element
grep -rn "targetSpecs" packages/apidom-ls/src/config/{spec-dir}/{element-dir}/

# Candidate lint rules that do NOT apply to the new version (adjust constant names).
# Not all are wrong — rules for older-only fields are expected here; review each one.
grep -rl "targetSpecs" packages/apidom-ls/src/config/openapi/*/lint/ --include="*.ts" \
  | xargs grep -LE "OpenAPI32|OpenAPI3([^0-9]|$)"
```

`documentation.ts` and `completion.ts` contain several entries per file with different `targetSpecs`, so review them entry by entry rather than per file.

### 4.5 Missing Type Lint Rules

For each field that appears in `allowed-fields.ts` (or that has a `*--required.ts` rule), check whether a `{field}--type.ts` rule also exists. The spec's type column is the source of truth.

**Flag as missing if** the spec specifies a type for the field (string, number, boolean, array, object) and no `*--type.ts` rule exists.

```bash
# For a given element, list existing type rules
ls packages/apidom-ls/src/config/{spec-dir}/{element-dir}/lint/ | grep -- "--type"
```

Pattern: when `*--required.ts` exists but `*--type.ts` does not, the field is validated for presence but not for correctness — a common gap.

**Linter function for array and map fields**: A field that is an array of spec objects (not primitives) should use `apilintArrayOfElementsOrClasses` with the element name as param (e.g. `linterParams: [['server']]`), either in its `--type.ts` (as in `a2a/a2a1/lint/skills--type.ts`) or in a `--items-type.ts` paired with a `--type.ts` rule for the container (as in `openapi/openapi3_2/lint/servers--items-type.ts`). A map of spec objects uses `apilintChildrenOfElementsOrClasses` (in `--type.ts` or `--values-type.ts`). Flag:
- `apilintType` alone for a field whose spec type is an array or map of objects (members are never checked)
- `apilintChildrenOfElementsOrClasses` on an array field: it returns `false` for any non-object, so every valid array is reported
- `apilintArrayOfElementsOrClasses` on a map field, for the same reason the other way round

### 4.6 Missing Enum/Value-Constraint Rules

Every field whose spec allows only a fixed set of values (e.g., `location` must be `query | header | cookie`) needs a `{field}--equals.ts` rule (`apilintValueOrArray`, `linterParams: [['query', 'header', 'cookie']]`). `update-ls-config` creates one for every such field, as recent configs do (`openapi/xml/lint/node-type--equals.ts`, `a2a/api-key-security-scheme/lint/location--equals.ts`), so a missing one is a finding (Issue 11), like a missing type rule.

The same applies to format constraints: a field the spec defines as a URL/URI needs `{field}--format-uri.ts` (`apilintValidURI`), and an email field `{field}--format-email.ts` (`apilintValueRegex`, as in `openapi/contact/lint/email--format-email.ts`). URI-reference fields are the exception: `openapi3_2/lint/self--format-uri-reference.ts` names `apilintValidURIReferenceOrFragment`, which `services/validation/linter-functions.ts` doesn't define, so there is no working rule to ask for yet.

**Flag as missing if** the spec text fixes the values ("MUST be one of", "Valid values are", a list of quoted values in the type or description) or the format ("MUST be in the form of a URL", "MUST be in the format of an email address") and no matching rule exists. When the allowed values depend on another field, the rule needs a `conditions` entry (see `asyncapi/security-scheme/lint/in--equals-api-key.ts`).

**Do not flag** fields whose values the spec gives only as examples or leaves open (extensible lists, values from an external registry such as the HTTP authentication schemes for OpenAPI's `scheme`).

```bash
# For a given element, list existing value-constraint rules
ls packages/apidom-ls/src/config/{spec-dir}/{element-dir}/lint/ | grep -E -- "--(equals|format)"
```

### 4.7 Missing Element Configs

Compare element types from `config.ts` against all element types defined in the namespace:

```bash
# All element types in namespace
grep -r "this.element = " packages/{namespace-pkg}/src/elements/ | grep -v "nces/"

# All keys in config.ts
grep "^  [a-zA-Z]" packages/apidom-ls/src/config/{spec-dir}/config.ts
```

**Flag any element type present in the namespace but absent from `config.ts`.**

For each missing config, note which fields are required per spec — these need `*--required.ts` rules in the new config. Also flag missing discriminated-union subtype entries (see Phase 3 note).


### 4.8 Rule Conventions

These defects are mechanical, so check them with commands rather than by reading:

```bash
# Duplicate diagnostic code values (any output is a finding)
grep -oE "= [0-9]+," packages/apidom-ls/src/config/codes.ts | sort | uniq -d

# New codes: compare each with its neighbours (naming and numbering below)
git diff -U2 main...HEAD -- packages/apidom-ls/src/config/codes.ts

# Non-standard required messages in changed rule files
git diff --name-only main...HEAD -- 'packages/apidom-ls/src/config/**/lint/*.ts' \
  | xargs grep -n "message:" | grep "must contain"

# 'reference' in linterParams (the refractor already handles Reference Objects)
git diff --name-only main...HEAD -- 'packages/apidom-ls/src/config/**/lint/*.ts' \
  | xargs grep -n "linterParams" | grep "'reference'"

# Rule files not imported by their lint/index.ts
for f in $(git diff --name-only --diff-filter=A main...HEAD -- 'packages/apidom-ls/src/config/**/lint/*.ts' | grep -v index.ts); do
  grep -q "./$(basename "$f")'" "$(dirname "$f")/index.ts" || echo "not registered: $f"
done
```

Type messages are not uniform across the repo, so they can't be grepped for: `config/openapi/` mostly uses `summary must be a string`, `config/asyncapi/` mostly `'name' value must be a string`, and `config/a2a/` `'name' must be a string`. Compare each new message with 2-3 existing rules of the same kind in the same spec directory and flag only inconsistencies within that directory.

**Code naming and numbering** (see the `OPENAPI3_2` and `A2A1` blocks in `codes.ts`): names follow `{SPEC}{VERSION}_{ELEMENT}_FIELD_{FIELD}_{RULE}` (`OPENAPI3_2_OPEN_API_FIELD_INFO_TYPE`, `A2A1_AGENT_CARD_FIELD_NAME_REQUIRED`), with the prefix of the version that introduced the field. Each spec version has a base (`OPENAPI3_2 = 7100000`, `A2A1 = 9000000`), each element a `10000` block (`OPENAPI3_2_OPEN_API = 7110000`), each field the next multiple of `100`, and a second rule for the same field follows without a value so the enum assigns `+1` (`OPENAPI3_2_OPEN_API_FIELD_INFO_TYPE_REQUIRED`). The A2A block gives required rules their own `100` slot instead; check that new codes follow the pattern of the block they extend.
