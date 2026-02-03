# OpenAPI 3.2.0 Dereferencing Tests

This directory contains comprehensive test suites for OpenAPI 3.2.0 dereferencing behavior.

## Overview

OpenAPI 3.2.0 introduces several new features that affect dereferencing:

### Key New Features

1. **`$self` field** (OpenAPI Object) - Self-assigned URI for the document, used as base URI for relative references
2. **`query` operation** (Path Item Object) - New QUERY HTTP method support
3. **`additionalOperations`** (Path Item Object) - Support for custom HTTP methods
4. **`webhooks`** (OpenAPI Object) - Incoming webhook definitions (similar to paths)
5. **`components/pathItems`** - Reusable Path Item Objects
6. **`components/mediaTypes`** - Reusable Media Type Objects
7. **`in: "querystring"`** - New parameter location for query string as a single parameter
8. **JSON Schema 2020-12** - Support for `$defs`, `prefixItems`, `$dynamicAnchor`, etc.

## Test Structure

Tests are organized by object type, following the OpenAPI 3.1 pattern:

```
openapi-3-2/
├── $self-base-uri.ts              # Tests for $self field behavior (COMPLETE)
├── callback-object/               # Callback Object dereferencing
├── example-object/                # Example Object dereferencing
├── header-object/                 # Header Object dereferencing
├── link-object/                   # Link Object dereferencing
├── media-types-component/         # components/mediaTypes dereferencing (NEW in 3.2)
├── parameter-object/              # Parameter Object dereferencing (includes querystring)
├── path-item-object/              # Path Item Object (includes query & additionalOperations)
├── path-items-component/          # components/pathItems dereferencing (NEW in 3.2)
├── reference-object/              # Reference Object dereferencing (COMPLETE)
├── request-body-object/           # Request Body Object dereferencing
├── response-object/               # Response Object dereferencing
├── schema-object/                 # Schema Object dereferencing (includes JSON Schema 2020-12)
├── security-schemes-object/       # Security Scheme Object dereferencing
└── webhooks/                      # Webhooks dereferencing (NEW in 3.2)
```

## Test Statistics

- **Total test files created**: 14
- **Total test code**: ~2,133 lines
- **Test contexts**: ~100+ test scenarios

## Test Coverage by Object

### 1. Schema Object (`schema-object/index.ts`)
**Most comprehensive test suite** - Covers all JSON Schema dereferencing scenarios:

- Internal and external references
- Cyclic references (internal, external, direct, indirect)
- JSON Pointer and URI fragment references
- `$id`, `$anchor`, `$dynamicAnchor` keywords
- `$schema` dialect inheritance
- Boolean schemas
- JSON Schema 2020-12 features (`$defs`, `prefixItems`, etc.)
- Max depth limits
- Error handling (unresolvable references, invalid pointers)

### 2. Reference Object (`reference-object/index.ts`)
**Already complete** with fixtures - Tests Reference Object behavior:

- Internal and external references
- Reference cycles
- Additional fields handling
- Path encoding (spaces, special characters)
- RefSet usage
- Direct and indirect circular references

### 3. Parameter Object (`parameter-object/index.ts`)
Tests parameter dereferencing in:

- `components/parameters`
- Path Item Objects
- Operation Objects
- **New in 3.2**: `in: "querystring"` location

### 4. Path Item Object (`path-item-object/index.ts`)
Tests Path Item dereferencing including:

- Path Item `$ref` field
- `components/pathItems` references
- **New in 3.2**: `query` operation
- **New in 3.2**: `additionalOperations` field

### 5. Webhooks (`webhooks/index.ts`)
**New in 3.2** - Tests webhook dereferencing:

- Internal references in webhooks
- External references in webhooks
- Path Item `$ref` in webhooks

### 6. Media Types Component (`media-types-component/index.ts`)
**New in 3.2** - Tests `components/mediaTypes`:

- Reusable Media Type Objects
- Schema references within media types
- Example references within media types

### 7. Path Items Component (`path-items-component/index.ts`)
**New in 3.2** - Tests `components/pathItems`:

- Reusable Path Item Objects
- References in paths
- References in webhooks
- Nested references
- External references

### 8. Other Objects
Standard dereferencing tests for:

- Request Body Object
- Response Object
- Callback Object
- Header Object
- Link Object
- Example Object
- Security Scheme Object

## Fixture Requirements

### Fixtures Already Created

The `$self-base-uri.ts` and `reference-object/` tests have fixtures in place:

```
fixtures/
├── $self-fragment-refs.json
├── $self-internal-refs.json
├── $self-invalid-uri.json
├── $self-multi-doc-a.json
├── $self-relative-refs.json
├── $self-relative.json
├── $self-trailing-slash.json
├── $self-urn-scheme.json
├── no-$self.json
└── common/                        # Shared fixtures
```

### Fixtures Needed

Each test directory needs fixture subdirectories matching the test contexts:

#### Example: `schema-object/fixtures/`
```
schema-object/fixtures/
├── internal-external/
│   ├── root.json
│   ├── external.json
│   └── dereferenced.json
├── internal-only/
│   ├── root.json
│   └── dereferenced.json
├── cycle-internal/
│   ├── root.json
│   └── (dereferenced.json if needed)
├── $defs-keyword/                 # NEW: JSON Schema 2020-12
├── prefixItems-keyword/           # NEW: JSON Schema 2020-12
├── $dynamicAnchor-keyword/        # NEW: JSON Schema 2020-12
└── ... (other contexts)
```

#### Example: `parameter-object/fixtures/`
```
parameter-object/fixtures/
├── components-parameters/
│   ├── root.json
│   └── dereferenced.json
├── path-item-object/
├── operation-object/
└── querystring-location/          # NEW: 3.2 feature
```

#### Example: `webhooks/fixtures/`
```
webhooks/fixtures/
├── internal-references/           # NEW: 3.2 feature
├── external-references/           # NEW: 3.2 feature
└── path-item-ref/                 # NEW: 3.2 feature
```

## How to Create Fixtures

Follow this pattern (using OpenAPI 3.1 fixtures as reference):

1. **Copy similar fixtures from OpenAPI 3.1** - Most test patterns are identical
2. **Update openapi version** - Change `"openapi": "3.1.x"` to `"openapi": "3.2.0"`
3. **Add new fields where relevant**:
   - Add `$self` field to root objects when testing URI resolution
   - Use `query` operation in path-item-object tests
   - Use `additionalOperations` in path-item-object tests
   - Use `in: "querystring"` in parameter-object tests
   - Create webhook examples for webhooks tests
   - Use JSON Schema 2020-12 keywords (`$defs`, `prefixItems`, etc.) in schema tests

4. **Generate dereferenced.json** - Run the test and capture the actual dereferenced output, or manually create expected output

### Example Fixture Creation

For `parameter-object/fixtures/querystring-location/root.json`:

```json
{
  "openapi": "3.2.0",
  "info": { "title": "Test", "version": "1.0.0" },
  "paths": {
    "/search": {
      "get": {
        "parameters": [
          {
            "$ref": "#/components/parameters/QueryString"
          }
        ],
        "responses": {
          "200": { "description": "Success" }
        }
      }
    }
  },
  "components": {
    "parameters": {
      "QueryString": {
        "name": "query",
        "in": "querystring",
        "content": {
          "application/x-www-form-urlencoded": {
            "schema": {
              "$ref": "#/components/schemas/QueryParams"
            }
          }
        }
      }
    },
    "schemas": {
      "QueryParams": {
        "type": "object",
        "properties": {
          "q": { "type": "string" },
          "limit": { "type": "integer" }
        }
      }
    }
  }
}
```

## Running Tests

```bash
# From monorepo root
npm run build
cd packages/apidom-reference
npm test -- --grep "openapi-3-2"

# Run specific object tests
npm test -- --grep "openapi-3-2.*Schema Object"
npm test -- --grep "openapi-3-2.*Parameter Object"
npm test -- --grep "openapi-3-2.*Webhooks"
```

## Comparison with OpenAPI 3.1

### Similarities
- Most dereferencing behavior is identical
- Reference resolution patterns are the same
- Cyclic reference handling is unchanged
- Error handling is consistent

### Differences (OpenAPI 3.2 specific)
1. **`$self` field** - New base URI resolution mechanism
2. **JSON Schema 2020-12** - Updated schema dialect (was draft-2020-12 in 3.1)
3. **New components** - `pathItems` and `mediaTypes`
4. **New operations** - `query` and `additionalOperations`
5. **New parameter location** - `in: "querystring"`
6. **Webhooks** - New top-level field with Path Item Objects

## Implementation Status

### ✅ Complete
- Test file structure created
- Test patterns defined
- `$self` field tests with fixtures
- `reference-object` tests with fixtures

### 🔨 In Progress (Needs Fixtures)
- Schema Object tests (needs JSON Schema 2020-12 fixtures)
- Parameter Object tests (needs querystring location fixtures)
- Path Item Object tests (needs query/additionalOperations fixtures)
- Webhooks tests (needs webhook fixtures)
- All other object tests

### 📋 TODO
1. Create fixture files for all test contexts
2. Generate or manually create expected `dereferenced.json` files
3. Run tests and fix any failing assertions
4. Add additional test contexts as edge cases are discovered
5. Document any OpenAPI 3.2 specific behaviors

## Notes

- The default JSON Schema dialect for OpenAPI 3.2 is: `https://spec.openapis.org/oas/3.2/dialect/2025-09-17`
- Tests use `mediaTypes.latest('json')` and `mediaTypes.latest('yaml')` from `@swagger-api/apidom-ns-openapi-3-2`
- Follow existing OpenAPI 3.1 test patterns - most behaviors are identical
- Focus fixture creation on **new 3.2 features** first, then fill in standard patterns

## References

- [OpenAPI 3.2.0 Specification](https://spec.openapis.org/oas/v3.2.0.html)
- [OpenAPI 3.1.0 Specification](https://spec.openapis.org/oas/v3.1.0.html) (for comparison)
- [JSON Schema 2020-12](https://json-schema.org/draft/2020-12/json-schema-core.html)
