# Remaining PR #5110 Review Comments - 2026-02-24

## Overview

PR #5110 adds initial support for OpenAPI 3.2. There were 32 inline review comments from 2026-02-24.

**Status**: 19 of 32 completed (59% done)
**Remaining**: 13 comments, all in `apidom-ls` package

## Completed Work (2 commits)

### Commit 1: `c22298218` - "fix(openapi-3-2): address PR review comments"
- Fixed MediaType/Encoding element field types (prefixEncoding, itemEncoding, encoding)
- Added missing fields to specification.ts (prefixEncoding, itemEncoding, deviceAuthorization)
- Added missing fields to replace-empty-element.ts plugin
- Used isOpenApi3_2Element predicate instead of type assertion
- Fixed Callback visitor to only accept Path Item

### Commit 2: `0e01c0469` - "fix(openapi-3-2): address additional PR review comments"
- Fixed WebhooksVisitor, AdditionalOperationsVisitor to only accept Path Item/Operation
- Updated RequestBody/Response ContentVisitors to use standard pattern
- Fixed 3 LS lint rules (media-types, query, item-schema)

## Remaining Tasks (13 in apidom-ls)

### 1. Add encoding fields to encoding config
**File**: `packages/apidom-ls/src/config/openapi/encoding/documentation.ts:15`
**Comment**: "Missing encoding, prefixEncoding and itemEncoding in docs, completion and linting ?"

**Actions**:
- Add `encoding`, `prefixEncoding`, `itemEncoding` to documentation.ts
- Add to completion.ts
- Add to lint/allowed-fields-3-2.ts
- Create type lint rules for each field

**Field Details** (from OAS 3.2 spec):
- `encoding`: Map[string, Encoding Object] - nested encoding
- `prefixEncoding`: Array of Encoding Objects - positional encoding
- `itemEncoding`: Encoding Object - single encoding for array items

### 2. Add prefixEncoding/itemEncoding to media-type lint
**File**: `packages/apidom-ls/src/config/openapi/media-type/lint/allowed-fields-3-2.ts:14`
**Comment**: "Missing prefixEncoding and itemEncoding and type lint for them"

**Actions**:
- Add `prefixEncoding` and `itemEncoding` to allowed-fields-3-2.ts
- Create `prefix-encoding--type.ts` lint rule (should check for array)
- Create `item-encoding--type.ts` lint rule (should check for Encoding Object)

### 3. Add deviceAuthorizationUrl to oauth-flow
**File**: `packages/apidom-ls/src/config/openapi/oauth-flow/completion.ts:108`
**Comment**: "Missing this in allowed fields + rule for its type"

**Actions**:
- Add `deviceAuthorizationUrl` to completion.ts
- Add to lint/allowed-fields-3-2.ts
- Create `device-authorization-url--type.ts` lint rule (string type)
- May also need format-uri lint rule

### 4. Add deviceAuthorization to oauth-flows
**File**: `packages/apidom-ls/src/config/openapi/oauth-flows/completion.ts:178`
**Comment**: "Missing this in allowed fields + type rule"

**Actions**:
- Add `deviceAuthorization` to completion.ts
- Add to lint/allowed-fields-3-2.ts
- Create `device-authorization--type.ts` lint rule (OAuth Flow Object)

### 5. Add deprecated field to security-scheme
**File**: `packages/apidom-ls/src/config/openapi/security-scheme/lint/allowed-fields-3-2.ts:24`
**Comment**: "Also missing deprecated + rules for new fields?"

**Actions**:
- Add `deprecated` to allowed-fields-3-2.ts
- Create `deprecated--type.ts` lint rule (boolean type)
- Check if `oauth2MetadataUrl` is already covered (should be from previous commits)

### 6. Add lint for discriminator defaultMapping type
**File**: `packages/apidom-ls/src/config/openapi/discriminator/lint/allowed-fields-3-2.ts:14`
**Comment**: "Should we add lint for defaultMapping type?"

**Actions**:
- Check if `defaultMapping` already in allowed-fields-3-2.ts
- Create `default-mapping--type.ts` lint rule if needed
- Type should be: Map[string, string] or object with string values

### 7. Add serializedValue type lint to example
**File**: `packages/apidom-ls/src/config/openapi/example/lint/allowed-fields-3-2.ts:15`
**Comment**: "Missing type lint for serializedValue (dataValue is any so we should be fine)"

**Actions**:
- Create `serialized-value--type.ts` lint rule
- Type: string (serialized representation of the value)

### 8. Review info allowed-fields (3.1 vs 3.2)
**File**: `packages/apidom-ls/src/config/openapi/info/lint/allowed-fields-3-2.ts:8`
**Comment**: "Is this not the same as 3.1?"

**Actions**:
- Compare info/lint/allowed-fields-3-1.ts with allowed-fields-3-2.ts
- If identical, consider consolidating or renaming to indicate it applies to both
- Check OAS spec to confirm Info Object is unchanged between 3.1 and 3.2

### 9. Review license mutually-exclusive rule (3.1 vs 3.2)
**File**: `packages/apidom-ls/src/config/openapi/license/lint/identifier--mutually-exclusive-3-2.ts:7`
**Comment**: "Is this not the same as 3.1 rule?"

**Actions**:
- Compare with identifier--mutually-exclusive-3-1.ts
- If identical, consider consolidating
- License Object should be same in 3.1 and 3.2

### 10. Review $self type lint necessity
**File**: `packages/apidom-ls/src/config/openapi/openapi3_2/lint/self--type.ts:7`
**Comment**: "Do we need this if we have the $selfFormatURIReferenceLint?"

**Actions**:
- Check if `self--type.ts` is redundant with `$selfFormatURIReferenceLint`
- If format lint covers it, may be able to remove self--type.ts
- Verify both are being registered in the lint rules

### 11. Rename parameter allowed-fields to include 3.2
**File**: `packages/apidom-ls/src/config/openapi/parameter/lint/allowed-fields-3-1.ts:8`
**Comment**: "Maybe change the name to include 3.2 as well? Possibly same for other files + rules"

**Actions**:
- Check if Parameter Object is unchanged between 3.1 and 3.2
- If unchanged, rename file to `allowed-fields-3-1-3-2.ts` or similar
- Update targetSpecs to include both OpenAPI31 and OpenAPI32
- Search for other similar cases where 3.1 and 3.2 rules are identical

### 12. Extend reference linting to include 3.2
**File**: `packages/apidom-ls/src/config/openapi/reference/completion.ts:6`
**Comment**: "Should also extend linting rules to include 3.2?"

**Actions**:
- Check reference lint rules (e.g., allowed-fields)
- Update targetSpecs to include OpenAPI32
- Reference Object should be same in 3.1 and 3.2

### 13. Check plugin overrides for OAS 3.2
**File**: `packages/apidom-ns-openapi-3-2/src/refractor/plugins/normalize-header-examples/index.ts:16`
**Comment**: "Could check if OpenAPI 3.2 also describes the overrides (also for other plugins) but we can stay with the same until further work"

**Actions**:
- This is marked as "can stay with the same until further work"
- Low priority - can be deferred to future PR
- No immediate action required

## Implementation Strategy

### Phase 1: Add Missing Fields (Tasks 1-5)
Focus on adding new OAS 3.2 fields to documentation, completion, and linting:
- encoding (+ nested fields)
- prefixEncoding/itemEncoding
- deviceAuthorizationUrl/deviceAuthorization
- deprecated (security-scheme)
- serializedValue
- defaultMapping

### Phase 2: Review & Consolidate (Tasks 8-12)
Review duplicate rules between 3.1 and 3.2:
- Info allowed-fields
- License mutually-exclusive
- Parameter allowed-fields
- Reference linting
- $self type lint

### Phase 3: Verify & Test
- Build and test all changes
- Run `npm run lint` in apidom-ls package
- Verify no breaking changes

## Key Files to Reference

### OpenAPI 3.2 Specification
- Main: https://spec.openapis.org/oas/v3.2.0
- GitHub: https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md

### Example Lint Rules
- `packages/apidom-ls/src/config/openapi/media-type/lint/schema--type.ts`
- `packages/apidom-ls/src/config/openapi/oauth-flow/lint/authorization-url--type.ts`

### Completion Examples
- `packages/apidom-ls/src/config/openapi/media-type/completion.ts`
- `packages/apidom-ls/src/config/openapi/oauth-flows/completion.ts`

## Notes

- All lint rules should follow the pattern in CLAUDE.md (apidom-ls package)
- Use correct linter functions based on element type (see CLAUDE.md section 3)
- Error messages should follow established patterns (see CLAUDE.md section 4)
- Test changes with comprehensive `assert.deepEqual` comparisons (see CLAUDE.md section 8)
