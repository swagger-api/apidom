# CLAUDE.md - ApiDOM Language Service

This file provides specific guidance for working with the ApiDOM Language Service package (`apidom-ls`).

## Overview

The `apidom-ls` package provides LSP (Language Server Protocol) compliant language services for API specifications including OpenAPI, AsyncAPI, and Arazzo. It handles validation, completion, documentation, semantic highlighting, and dereferencing.

## Critical Rules for Lint Rule Implementation

### 1. Verify Against Official Specification

**ALWAYS check the official specification** before implementing validation rules.

**Specification Resources:**
- **OpenAPI 3.2**: https://spec.openapis.org/oas/v3.2.0
- **OpenAPI 3.1**: https://spec.openapis.org/oas/v3.1.0
- **OpenAPI 3.0**: https://spec.openapis.org/oas/v3.0.3
- **AsyncAPI 3.0**: https://www.asyncapi.com/docs/reference/specification/v3.0.0
- **AsyncAPI 2.x**: https://www.asyncapi.com/docs/reference/specification/v2.6.0
- **Arazzo 1.0**: https://spec.openapis.org/arazzo/v1.0.0

**Examples from PR #5104 (AsyncAPI 3.0):**
- Fields like `messageId` and `schemaFormat` were removed from Message Trait Object
- Security Requirement Object was removed; `security` is now an array of Security Scheme Object | Reference Object
- Operation `messages` field is an **array** of Message Objects, not a map

**Action**: Before coding, read the relevant specification section for your object and verify field existence and types.

### 2. Understand Element Structure in Namespace Packages

Check the namespace package to understand element structure:

```bash
# Find element definition (replace {spec} and {version} with your spec)
# Examples: apidom-ns-openapi-3-1, apidom-ns-asyncapi-3, apidom-ns-arazzo-1
find packages/apidom-ns-{spec}/src/elements -name "*.ts" | grep -i "ElementName"

# Check if it extends ArrayElement or ObjectElement
grep "class.*ElementName.*extends" packages/apidom-ns-{spec}/src/elements/ElementName.ts

# Example for AsyncAPI 3.0
grep "class.*SecurityScheme.*extends" packages/apidom-ns-asyncapi-3/src/elements/SecurityScheme.ts
```

**Examples from PR #5104 (AsyncAPI 3.0):**

- `Messages` at Components level → `ObjectElement` (map with Message values)
- `OperationMessages` → `ArrayElement` (array of Message references)
- `SecurityScheme` → element name is `'securityScheme'`, not `'securityRequirement'`

### 3. Choose the Correct Linter Function

| Element Structure | Linter Function | Example |
|------------------|----------------|---------|
| Array of specific elements | `apilintArrayOfElementsOrClasses` | `messages: [Message, Message]` |
| Object with specific value types | `apilintChildrenOfElementsOrClasses` | `messages: {msg1: Message, msg2: Message}` |
| Single element type | `apilintElementOrClass` | `payload: SchemaObject` |
| Primitive type | `apilintType` | `name: string` |

**Wrong (from PR #5104):**
```typescript
// ❌ WRONG - Checking if field is 'messages' element
linterFunction: 'apilintElementOrClass',
linterParams: [['messages']],
```

**Correct:**
```typescript
// ✅ CORRECT - Checking array items are 'message' elements
linterFunction: 'apilintArrayOfElementsOrClasses',
linterParams: [['message']],
```

### 4. Use Correct Error Messages

Follow the established message patterns:

| Validation Type | Pattern | Example |
|----------------|---------|---------|
| Array of elements | `"'{field}' must be an array of {Type} Objects"` | `"'messages' must be an array of Message Objects"` |
| Array of primitives | `"'{field}' must be an array of {type}s"` | `"'enum' must be an array of strings"` |
| Map values | `"{Object} values must be of {Type} shape"` | `"Messages Object values must be of Message Object shape"` |

**Wrong (from PR #5104):**
```typescript
message: "security must be an array of Security Requirement Objects",  // ❌ Wrong object type
message: "'messages' must be an array",  // ❌ Missing "of Message Objects"
```

**Correct:**
```typescript
message: "security must be an array of Security Scheme Objects",  // ✅ Correct object type
message: "'messages' must be an array of Message Objects",  // ✅ Complete description
```

### 5. Remove Unused Functions

Before submitting PR:

```bash
# Check if a function is actually used
grep -r "linterFunction: 'functionName'" packages/apidom-ls/src/config
```

If a linter function is no longer used anywhere, remove it from `linter-functions.ts`.

**Example from PR #5104:**
- `hasRequiredFieldUnlessRef` was unused → removed
- Use `hasRequiredField` with `conditions` instead

### 6. Avoid Redundant Test Fixtures

Before creating a test fixture:

1. Check existing fixtures for similar scenarios
2. If two fixtures test the same validation with only cosmetic differences, keep one
3. Use descriptive names that clearly indicate what's being tested

**Example from PR #5104:**
- `channel-address-expression-not-defined.yaml` and `channel-address-parameter-mismatch.yaml` were functionally identical
- Both tested: parameter defined but not used in address expression
- One was removed as redundant

### 7. Pre-Implementation Checklist

Before implementing validation for any object:

- [ ] Read official specification section for the object (see spec URLs in section 1)
- [ ] Check namespace element definition in `packages/apidom-ns-{spec}-{version}/src/elements/{Object}.ts`
  - Example: `packages/apidom-ns-openapi-3-1/src/elements/Info.ts`
  - Example: `packages/apidom-ns-asyncapi-3/src/elements/Operation.ts`
- [ ] Identify if element extends `ArrayElement`, `ObjectElement`, or other base type
- [ ] List all fields the object should have (compare with previous spec version if applicable)
- [ ] Identify which fields were added, removed, or changed from previous version
- [ ] Verify element names used in refractor (e.g., `'info'`, `'message'`, `'securityScheme'`)
- [ ] Find 2-3 similar existing validation rules to use as templates
- [ ] Choose correct linter function based on element structure
- [ ] Write error message following established patterns

### 8. Testing Best Practices

When writing tests:

- **Use comprehensive assertions**: Compare full diagnostic objects when possible, not just individual properties
- **Test both valid and invalid cases**: Ensure validation passes for valid specs and fails for invalid ones
- **Test edge cases**: Empty values, wrong types, conditional validations
- **Avoid redundant fixtures**: Each fixture should test a distinct scenario

**Preferred (comprehensive):**
```typescript
assert.deepEqual(diagnostics[0], {
  code: ApilintCodes.ASYNCAPI3_OPERATION_FIELD_MESSAGES_TYPE,
  message: "'messages' must be an array of Message Objects",
  severity: DiagnosticSeverity.Error,
  range: expectedRange,
  source: 'apilint',
});
```

**Acceptable (when range/source may vary):**
```typescript
assert.strictEqual(diagnostics[0].code, ApilintCodes.ASYNCAPI3_OPERATION_FIELD_MESSAGES_TYPE);
assert.strictEqual(diagnostics[0].message, "'messages' must be an array of Message Objects");
assert.strictEqual(diagnostics[0].severity, DiagnosticSeverity.Error);
```

**Avoid (too selective):**
```typescript
assert.strictEqual(diagnostics[0].code, ApilintCodes.ASYNCAPI3_OPERATION_FIELD_MESSAGES_TYPE);
// Missing other property assertions
```

## Common Pitfalls from PR #5104

### Issue 1: Removed Fields Still in Validation

**Problem**: Message Trait Object included `messageId` and `schemaFormat` in allowed fields for AsyncAPI 3.0, but these fields were removed in the spec.

**Solution**: Always check specification changelog when implementing version-specific validation. Fields present in v2.x may be removed in v3.0.

### Issue 2: Wrong Element Type for Security

**Problem**: Used `'securityRequirement'` element type when it was removed in AsyncAPI 3.0.

**Solution**:
```bash
# ✅ Check namespace for correct element names
grep "this.element = " packages/apidom-ns-{spec}/src/elements/{ElementName}.ts

# Example for AsyncAPI 3.0 SecurityScheme:
grep "this.element = " packages/apidom-ns-asyncapi-3/src/elements/SecurityScheme.ts
# Output: this.element = 'securityScheme';

# Example for OpenAPI 3.1 Info:
grep "this.element = " packages/apidom-ns-openapi-3-1/src/elements/Info.ts
# Output: this.element = 'info';
```

### Issue 3: Wrong Validation for Array vs Object

**Problem**: Used `apilintElementOrClass` for an array field instead of `apilintArrayOfElementsOrClasses`.

**Solution**: Check element definition to see if it extends `ArrayElement` or `ObjectElement`, then choose the appropriate linter function.

### Issue 4: Unused Linter Functions

**Problem**: `hasRequiredFieldUnlessRef` function was defined but never used; replaced by `hasRequiredField` with `conditions`.

**Solution**: Before submitting PR, grep for usage of any custom linter functions you're considering keeping.

## Quick Reference: Common Element Types

These examples show common element structures across different specifications. Always verify against the actual namespace package for your spec.

### AsyncAPI 3.0

| Field | Parent | Type | Linter Function |
|-------|--------|------|----------------|
| `messages` | Operation | `ArrayElement` (array of Message refs) | `apilintArrayOfElementsOrClasses` with `[['message']]` |
| `messages` | Components | `ObjectElement` (map to Messages) | `apilintChildrenOfElementsOrClasses` with `[['message']]` |
| `security` | Operation/Trait | `ArrayElement` (array of SecurityScheme refs) | `apilintArrayOfElementsOrClasses` with `[['securityScheme']]` |
| `parameters` | Channel | `ObjectElement` (map to Parameters) | `apilintChildrenOfElementsOrClasses` with `[['parameter']]` |

### OpenAPI 3.1

| Field | Parent | Type | Linter Function |
|-------|--------|------|----------------|
| `servers` | OpenAPI/PathItem/Operation | `ArrayElement` (array of Server objects) | `apilintArrayOfElementsOrClasses` with `[['server']]` |
| `security` | OpenAPI/Operation | `ArrayElement` (array of SecurityRequirement) | `apilintArrayOfElementsOrClasses` with `[['securityRequirement']]` |
| `schemas` | Components | `ObjectElement` (map to Schemas) | `apilintChildrenOfElementsOrClasses` with `[['schema']]` |
| `tags` | OpenAPI | `ArrayElement` (array of Tag objects) | `apilintArrayOfElementsOrClasses` with `[['tag']]` |

**Note**: Element types and validation patterns may vary between specification versions. Always verify the element structure in the namespace package before implementing validation.

## Build and Test Before PR

Always run full build and tests before submitting:

```bash
cd packages/apidom-ls
npm run build
npm run lint
npm run test
```

**Note**: The monorepo must be built at root level first (`npm run build` from root) before package-level builds will work correctly.

## Summary

1. **Verify against official spec** - Don't assume, check the spec
2. **Check namespace elements** - Understand the actual element structure
3. **Use correct linter function** - Array vs Object vs Element vs Type
4. **Follow message patterns** - Copy from similar existing rules
5. **Remove unused code** - Grep for usage before keeping functions
6. **Avoid redundant fixtures** - Each test should be distinct
7. **Test comprehensively** - Full diagnostic comparison when possible
8. **Build and test** - Always run before submitting PR

Following these guidelines prevents 90% of issues found in PR reviews.
