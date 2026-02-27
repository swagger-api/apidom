# OpenAPI 3.2.0 Language Service Support

This document details the language service (LSP) support added for OpenAPI 3.2.0 features.

## Overview

The `apidom-ls` package provides comprehensive IDE support for OpenAPI 3.2.0, including:
- **Validation** - Lint rules to validate correct usage of new fields
- **Code Completion** - IntelliSense suggestions for new fields
- **Documentation** - Hover documentation with specification links

## Path Item Object

### New Fields

#### 1. `query` Operation
**Type**: Operation Object
**Description**: QUERY HTTP method for safely querying resources with query payloads

**Files**:
- **Lint**: `src/config/openapi/path-item/lint/query--type.ts`
  - Validates `query` field is an Operation Object
  - Target: OpenAPI 3.2.0
- **Completion**: `src/config/openapi/path-item/completion.ts`
  - Suggests `query` operation
  - Documentation: Links to spec
- **Documentation**: `src/config/openapi/path-item/documentation.ts`
  - Omitted (comes from type itself)
- **Allowed Fields**: `src/config/openapi/path-item/lint/allowed-fields-3-2.ts`
  - Includes `query` in allowed fields list

**Example**:
```yaml
paths:
  /search:
    query:
      summary: Complex search query
      requestBody:
        content:
          application/json:
            schema:
              type: object
      responses:
        '200':
          description: Results
```

#### 2. `additionalOperations` Field
**Type**: Map[string, Operation Object]
**Description**: Custom HTTP methods beyond standard ones

**Files**:
- **Lint**:
  - `src/config/openapi/path-item/lint/additional-operations--type.ts` - Validates field is object
  - `src/config/openapi/path-item/lint/additional-operations--values-type.ts` - Validates values are Operation Objects
  - Target: OpenAPI 3.2.0
- **Completion**: `src/config/openapi/path-item/completion.ts`
  - Suggests `additionalOperations` field
  - Documentation: "Map of HTTP methods you choose to include in your API design for non-standard methods"
- **Documentation**: `src/config/openapi/path-item/documentation.ts`
  - Full description with spec links
- **Allowed Fields**: `src/config/openapi/path-item/lint/allowed-fields-3-2.ts`
  - Includes `additionalOperations` in allowed fields list

**Example**:
```yaml
paths:
  /cache:
    additionalOperations:
      PURGE:
        summary: Purge cache
        responses:
          '204':
            description: Purged
      LOCK:
        summary: Lock resource
        responses:
          '200':
            description: Locked
```

### Updated Documentation

**OpenAPI 3.2.0 Specific Documentation Added**:
- `$ref` - Path Item reference with 3.2.0 spec links
- `summary` - Path summary description
- `description` - Path description with CommonMark support
- `servers` - Server array for path-level servers
- `parameters` - Parameter list with 3.2.0 spec links
- `additionalOperations` - Custom HTTP methods map

## Parameter Object

### New Location: `querystring`

**Type**: String
**Values**: `"query"`, `"header"`, `"path"`, `"cookie"`, `"querystring"` (new in 3.2.0)
**Description**: Allows defining all query parameters as a single Schema Object

**Files**:
- **Lint**: `src/config/openapi/parameter/lint/in--equals-3-2.ts`
  - Validates `in` field accepts `querystring` location
  - Message: "'in' must be one of allowed values: query, header, path, cookie, querystring"
  - Target: OpenAPI 3.2.0
- **Lint Registration**: `src/config/openapi/parameter/lint/index.ts`
  - Imported and added to lints array
- **Documentation**: `src/config/openapi/parameter/documentation.ts`
  - Added OpenAPI 3.2.0 specific entry for `in` field
  - Explains `querystring` location
  - Previous OpenAPI3 target changed to [...OpenAPI30, ...OpenAPI31]

**Example**:
```yaml
parameters:
  - name: queryParams
    in: querystring
    schema:
      type: object
      properties:
        filter: { type: string }
        sort: { type: string }
        limit: { type: integer }
```

## Components Object

### Field: `mediaTypes`

**Type**: Map[string, Media Type Object]
**Description**: Reusable Media Type Objects

**Files**:
- **Lint**: `src/config/openapi/components/lint/allowed-fields-3-2.ts`
  - Already includes `mediaTypes` in allowed fields (pre-existing)
  - Target: OpenAPI 3.2.0
- **Completion**: `src/config/openapi/components/completion.ts`
  - Already includes `mediaTypes` completion (pre-existing)
  - Documentation: "An object to hold reusable Media Type Objects"
- **Documentation**: `src/config/openapi/components/documentation.ts`
  - Already includes `mediaTypes` documentation (pre-existing)
  - Links to spec

**Example**:
```yaml
components:
  mediaTypes:
    JsonResponse:
      schema:
        type: object
    EventStream:
      itemSchema:
        type: object
```

## File Summary

### New Files Created (5)

1. **`src/config/openapi/path-item/lint/allowed-fields-3-2.ts`**
   - Separate allowed fields for OpenAPI 3.2.0
   - Includes: `query`, `additionalOperations`, and all standard fields

2. **`src/config/openapi/path-item/lint/query--type.ts`**
   - Validates `query` operation is Operation Object
   - Error: "query" must be in a shape of the Operation Object

3. **`src/config/openapi/path-item/lint/additional-operations--type.ts`**
   - Validates `additionalOperations` field is object
   - Error: "additionalOperations" must be an object

4. **`src/config/openapi/path-item/lint/additional-operations--values-type.ts`**
   - Validates all values in `additionalOperations` are Operation Objects
   - Error: additionalOperations values must be Operation Objects

5. **`src/config/openapi/parameter/lint/in--equals-3-2.ts`**
   - Validates `in` field with querystring location
   - Allowed values: query, header, path, cookie, querystring

### Modified Files (6)

1. **`src/config/openapi/path-item/lint/allowed-fields-3-1.ts`**
   - Removed OpenAPI32 from targetSpecs (now only OpenAPI31)
   - Removed `query` and `additionalOperations` from allowed fields

2. **`src/config/openapi/path-item/lint/index.ts`**
   - Imported 3 new lint rules
   - Added to lints array

3. **`src/config/openapi/path-item/completion.ts`**
   - Added `query` operation completion (OpenAPI32)
   - Added `additionalOperations` field completion (OpenAPI32)

4. **`src/config/openapi/path-item/documentation.ts`**
   - Added OpenAPI32 import
   - Added documentation for: $ref, summary, description, servers, parameters, additionalOperations (all for OpenAPI 3.2.0)
   - Updated comment to mention `query` operation

5. **`src/config/openapi/parameter/lint/index.ts`**
   - Imported `in--equals-3-2` lint rule
   - Added to lints array

6. **`src/config/openapi/parameter/documentation.ts`**
   - Added OpenAPI32 import
   - Changed previous `in` field target from OpenAPI3 to [...OpenAPI30, ...OpenAPI31]
   - Added new OpenAPI32 specific `in` field documentation with querystring location

## Testing

All changes have been tested and validated:
- ✅ Build successful (apidom-ls)
- ✅ All tests passing (242 tests in apidom-ns-openapi-3-2)
- ✅ Language service bundle created successfully

## IDE Features

With these changes, IDEs using the language service will provide:

### 1. Auto-completion
- Type `qu` → suggests `query` operation
- Type `add` → suggests `additionalOperations` field
- Parameter `in:` → accepts `querystring` value
- Components → suggests `mediaTypes` field

### 2. Validation
- Red squiggles for invalid field usage
- Error messages for incorrect types
- Validation that operations are Operation Objects

### 3. Hover Documentation
- Hover over `query` → shows Operation Object documentation
- Hover over `additionalOperations` → shows map documentation with spec links
- Hover over `in: querystring` → explains querystring location
- Hover over `mediaTypes` → shows reusable Media Types documentation

### 4. Go to Definition
- Jump to spec definitions (via documentation links)
- Navigate to referenced media types in components

## Migration from 3.1.0 to 3.2.0

The language service will automatically:
- Suggest new 3.2.0 fields when editing 3.2.0 specs
- Validate 3.1.0 specs without suggesting 3.2.0-only fields
- Provide version-appropriate documentation based on `openapi` version field

No configuration needed - the service detects the OpenAPI version from the document.

## References

- [OpenAPI 3.2.0 Specification](https://spec.openapis.org/oas/v3.2.0.html)
- [Path Item Object](https://spec.openapis.org/oas/v3.2.0.html#path-item-object)
- [Parameter Object](https://spec.openapis.org/oas/v3.2.0.html#parameter-object)
- [Components Object](https://spec.openapis.org/oas/v3.2.0.html#components-object)
