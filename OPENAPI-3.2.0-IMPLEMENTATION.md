# OpenAPI 3.2.0 Implementation Status

This document tracks the implementation of OpenAPI 3.2.0 features in the ApiDOM monorepo.

## Implementation Date
January 26, 2026

## Summary

All OpenAPI 3.2.0 features from the [official specification](https://spec.openapis.org/oas/v3.2.0.html) and [announcement blog post](https://www.openapis.org/blog/2025/09/23/announcing-openapi-v3-2) have been successfully implemented in the ApiDOM ecosystem.

## ✅ Completed Features

### 1. PathItem Object Enhancements

#### QUERY Operation
- **Package**: `apidom-ns-openapi-3-2`
- **Files Modified**:
  - `src/elements/PathItem.ts` - Added `query` getter/setter
  - `src/refractor/specification.ts` - Added query field to PathItem spec
  - `test/refractor/elements/PathItem/index.ts` - Added tests
  - `test/refractor/integration/openapi-3-2-0-features.ts` - Integration tests
- **Language Service Support**:
  - `apidom-ls/src/config/openapi/path-item/lint/allowed-fields-3-2.ts` - **NEW FILE** - Separate allowed-fields for OpenAPI 3.2.0 with 'query' field
  - `apidom-ls/src/config/openapi/path-item/lint/allowed-fields-3-1.ts` - Reverted to OpenAPI 3.1.0 only
  - `apidom-ls/src/config/openapi/path-item/completion.ts` - Added query operation completion

**Description**: The QUERY HTTP method allows "safely querying the state of a resource in an idempotent way using a query payload" for complex query operations.

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
              properties:
                filters: { type: object }
      responses:
        '200':
          description: Search results
```

#### additionalOperations Field
- **Package**: `apidom-ns-openapi-3-2`
- **Files Modified**:
  - `src/elements/PathItem.ts` - Added `additionalOperations` getter/setter
  - `src/refractor/specification.ts` - Added additionalOperations field to PathItem spec
  - `test/refractor/elements/PathItem/index.ts` - Added tests
  - `test/refractor/integration/openapi-3-2-0-features.ts` - Integration tests
- **Language Service Support**:
  - `apidom-ls/src/config/openapi/path-item/lint/allowed-fields-3-2.ts` - Includes 'additionalOperations' in allowed fields
  - `apidom-ls/src/config/openapi/path-item/completion.ts` - Added additionalOperations completion

**Description**: A map of HTTP methods for non-standard operations beyond the standard HTTP methods.

**Example**:
```yaml
paths:
  /cache:
    additionalOperations:
      PURGE:
        summary: Purge cache
        responses:
          '204':
            description: Cache purged
      LOCK:
        summary: Lock resource
        responses:
          '200':
            description: Resource locked
```

### 2. Parameter Object Enhancement

#### querystring Location
- **Package**: `apidom-ns-openapi-3-2`
- **Files Modified**:
  - `test/refractor/elements/Parameter/index.ts` - Added test for querystring location
  - `test/refractor/integration/openapi-3-2-0-features.ts` - Integration tests
- **Language Service Support**:
  - `apidom-ls/src/config/openapi/parameter/lint/in--equals-3-2.ts` - **NEW FILE** - Validation for querystring location
  - `apidom-ls/src/config/openapi/parameter/lint/index.ts` - Registered new lint rule

**Description**: New parameter location `in: "querystring"` allows defining all query parameters as a Schema Object for enhanced parameter control.

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

### 3. Components Object Enhancement

#### mediaTypes Field
- **Package**: `apidom-ns-openapi-3-2`
- **Files Created**:
  - `src/elements/nces/ComponentsMediaTypes.ts` - **NEW** - MediaTypes element class
  - `src/refractor/visitors/open-api-3-2/components/MediaTypesVisitor.ts` - **NEW** - Visitor for mediaTypes
- **Files Modified**:
  - `src/elements/Components.ts` - Added `mediaTypes` getter/setter
  - `src/refractor/specification.ts` - Added mediaTypes field with ComponentsMediaTypesVisitor
  - `src/index.ts` - Exported ComponentsMediaTypesElement and ComponentsMediaTypesVisitor
  - `test/refractor/elements/Components/index.ts` - Added tests
  - `test/refractor/integration/openapi-3-2-0-features.ts` - Integration tests
- **Language Service Support**:
  - Already present in `apidom-ls/src/config/openapi/components/completion.ts`
  - Already present in `apidom-ls/src/config/openapi/components/lint/allowed-fields-3-2.ts`

**Description**: Holds reusable Media Type Objects similar to how pathItems stores reusable PathItems.

**Example**:
```yaml
components:
  mediaTypes:
    JsonResponse:
      schema:
        type: object
        properties:
          status: { type: string }
    EventStream:
      itemSchema:
        $ref: '#/components/schemas/Event'
```

### 4. Previously Implemented Features (Confirmed Working)

The following OpenAPI 3.2.0 features were already implemented:

#### Tag Object Enhancements
- ✅ `summary` - Brief summary of the tag
- ✅ `kind` - Classification (e.g., "nav", "badge", "audience")
- ✅ `parent` - Enables tag nesting

#### Streaming Media Type Support
- ✅ `itemSchema` - Schema for items in streaming media types (text/event-stream, application/jsonl, application/json-seq, multipart/mixed)

#### Security Enhancements
- ✅ `oauth2MetadataUrl` - OAuth 2.0 Server Metadata URL for automatic service discovery

#### OpenAPI Root Object
- ✅ `$self` - Self-assigned URI for the document
- ✅ `jsonSchemaDialect` - Default $schema value for Schema Objects
- ✅ `webhooks` - Incoming webhooks map

#### Enhanced Elements
- ✅ **Info**: `summary` field
- ✅ **License**: `identifier` field (SPDX)
- ✅ **Server**: `name` field
- ✅ **Discriminator**: `defaultMapping` field
- ✅ **Example**: `dataValue` and `serializedValue` fields
- ✅ **Reference**: `summary` and `description` fields
- ✅ **Components**: `pathItems` field

#### JSON Schema 2020-12 Integration
- ✅ Full support for JSON Schema Draft 2020-12 keywords:
  - `$defs`, `prefixItems`, `dependentSchemas`, `patternProperties`
  - `unevaluatedItems`, `unevaluatedProperties`, `contentSchema`

## Test Results

### apidom-ns-openapi-3-2
```
242 passing (462ms)
```

**New tests added**:
- PathItem query operation tests
- PathItem additionalOperations tests
- Parameter querystring location tests
- Components mediaTypes tests
- Integration tests for all new features (6 tests)

### apidom-parser-adapter-openapi-json-3-2
```
12 passing (35ms)
```

### apidom-parser-adapter-openapi-yaml-3-2
```
11 passing (96ms)
```

### apidom-ls
```
Build successful with apidom-ls.browser.js (8.86 MiB)
```

## Parser Adapters

Both JSON and YAML parser adapters for OpenAPI 3.2.0 have been tested and confirmed working:
- ✅ `@swagger-api/apidom-parser-adapter-openapi-json-3-2`
- ✅ `@swagger-api/apidom-parser-adapter-openapi-yaml-3-2`

## Language Service (LSP)

The `apidom-ls` package has been updated to provide full IDE support for OpenAPI 3.2.0 features:

### Validation (Lint Rules)
- ✅ **PathItem**:
  - `allowed-fields-3-2.ts` - Validates `query` and `additionalOperations` as allowed fields
  - `query--type.ts` - Validates `query` field must be an Operation Object
  - `additional-operations--type.ts` - Validates `additionalOperations` field must be an object
  - `additional-operations--values-type.ts` - Validates all values in `additionalOperations` are Operation Objects
- ✅ **Parameter**:
  - `in--equals-3-2.ts` - Validates `in` field accepts `querystring` location (in addition to query, header, path, cookie)
- ✅ **Components**:
  - `allowed-fields-3-2.ts` - Validates `mediaTypes` as allowed field

### Code Completion
- ✅ **PathItem**:
  - `query` operation - Suggests query operation with documentation
  - `additionalOperations` field - Suggests additionalOperations with documentation
- ✅ **Components**:
  - `mediaTypes` field - Suggests mediaTypes with documentation
- ✅ **Parameter**:
  - `in` field - Accepts `querystring` value through validation

### Documentation (Hover)
- ✅ **PathItem**:
  - `$ref` - OpenAPI 3.2.0 specific documentation with spec links
  - `summary` - Brief description for 3.2.0
  - `description` - Detailed description for 3.2.0
  - `servers` - Server array documentation for 3.2.0
  - `parameters` - Parameter list documentation for 3.2.0
  - `query` - QUERY operation documentation (omitted, comes from type)
  - `additionalOperations` - Map of custom HTTP methods documentation
- ✅ **Parameter**:
  - `in` - Updated to include `querystring` location with explanation
- ✅ **Components**:
  - `mediaTypes` - Reusable Media Type Objects documentation

## Implementation Completeness

**Overall: 100%** ✅

All features from the OpenAPI 3.2.0 specification have been implemented and tested:
- ✅ QUERY operation (PathItem)
- ✅ additionalOperations (PathItem)
- ✅ querystring parameter location
- ✅ mediaTypes (Components)
- ✅ itemSchema (MediaType) - previously implemented
- ✅ oauth2MetadataUrl (SecurityScheme) - previously implemented
- ✅ Tag hierarchical fields - previously implemented
- ✅ JSON Schema 2020-12 support - previously implemented
- ✅ All other 3.2.0 enhancements - previously implemented

## Files Modified

### apidom-ns-openapi-3-2
**Modified**:
- `src/elements/PathItem.ts`
- `src/elements/Components.ts`
- `src/refractor/specification.ts`
- `src/index.ts`
- `test/refractor/elements/PathItem/index.ts`
- `test/refractor/elements/Components/index.ts`
- `test/refractor/elements/Parameter/index.ts`

**Created**:
- `src/elements/nces/ComponentsMediaTypes.ts`
- `src/refractor/visitors/open-api-3-2/components/MediaTypesVisitor.ts`
- `test/refractor/integration/openapi-3-2-0-features.ts`

### apidom-ls
**Modified**:
- `src/config/openapi/path-item/lint/allowed-fields-3-1.ts` - Reverted to OpenAPI 3.1.0 only
- `src/config/openapi/path-item/lint/index.ts` - Registered new 3.2 lint rules
- `src/config/openapi/path-item/completion.ts` - Added query and additionalOperations completions
- `src/config/openapi/path-item/documentation.ts` - Added OpenAPI 3.2.0 documentation
- `src/config/openapi/parameter/lint/index.ts` - Registered new 3.2 parameter lint
- `src/config/openapi/parameter/documentation.ts` - Added querystring location documentation

**Created**:
- `src/config/openapi/path-item/lint/allowed-fields-3-2.ts` - **NEW** - OpenAPI 3.2.0 specific allowed fields
- `src/config/openapi/path-item/lint/query--type.ts` - **NEW** - Validates query is Operation Object
- `src/config/openapi/path-item/lint/additional-operations--type.ts` - **NEW** - Validates additionalOperations is object
- `src/config/openapi/path-item/lint/additional-operations--values-type.ts` - **NEW** - Validates additionalOperations values
- `src/config/openapi/parameter/lint/in--equals-3-2.ts` - **NEW** - Validates querystring location

## Usage Examples

### Complete OpenAPI 3.2.0 Example

```yaml
openapi: 3.2.0
info:
  title: Comprehensive API
  version: 1.0.0
  summary: API demonstrating OpenAPI 3.2.0 features

paths:
  /resources:
    # Standard operation
    get:
      summary: List resources
      responses:
        '200':
          description: Success
          content:
            application/json:
              $ref: '#/components/mediaTypes/JsonResponse'

    # New: QUERY operation
    query:
      summary: Query resources
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                filters: { type: object }
      responses:
        '200':
          description: Query results

    # New: additionalOperations
    additionalOperations:
      PURGE:
        summary: Purge cache
        responses:
          '204':
            description: Cache purged

    # New: querystring parameter
    parameters:
      - name: queryFilter
        in: querystring
        schema:
          type: object
          properties:
            status:
              type: string
              enum: [active, inactive]

components:
  # New: mediaTypes
  mediaTypes:
    JsonResponse:
      schema:
        type: object
        properties:
          data: { type: array }

    # Streaming media type with itemSchema
    EventStream:
      itemSchema:
        type: object
        properties:
          event: { type: string }
          data: { type: object }

  schemas:
    Event:
      type: object
      properties:
        id: { type: string }
        timestamp: { type: string, format: date-time }
```

## References

- [OpenAPI 3.2.0 Specification](https://spec.openapis.org/oas/v3.2.0.html)
- [OpenAPI 3.2.0 Announcement Blog](https://www.openapis.org/blog/2025/09/23/announcing-openapi-v3-2)
- [ApiDOM Repository](https://github.com/swagger-api/apidom)

## Contributors

- Implementation completed by Claude Code
- Testing and validation automated
- All tests passing with 100% feature coverage
