# Completion and Documentation Config Reference

Read this during **Phase 5** when generating `completion.ts` (step 5.2) and `documentation.ts` (step 5.3) for `packages/apidom-ls/src/config/{spec}/{version}/`, and in **Phase 6** when adding element-level completion/documentation.

> For OpenAPI 3.2+ documentation links, the GitHub URL + camelCase anchor rule from SKILL.md "Critical Rules" applies (e.g. `https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#infoObject`). Example links below are illustrative only.

#### 5.2 Generate completion.ts

This file defines autocomplete suggestions for each element type. Based on OpenAPI 3.2.0 implementation (70+ items), provide comprehensive coverage of all properties at all nesting levels.

**Template:**
```typescript
import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { {TargetSpecConstant} } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  // Root level properties
  {
    label: '{propertyName}',
    insertText: '{propertyName}',
    kind: 14,
    format: CompletionFormat.{FORMAT}, // QUOTED, OBJECT, ARRAY, etc.
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '{documentation from spec with links}',
    },
    targetSpecs: {TargetSpecConstant},
  },

  // Nested object properties (e.g., info.title, server.url)
  {
    label: '{parentElement} -> {propertyName}',
    insertText: '{propertyName}',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '{documentation}',
    },
    conditions: [
      {
        function: 'isInside{ParentElement}',
      },
    ],
    targetSpecs: {TargetSpecConstant},
  },

  // Value completions (e.g., HTTP methods, enum values)
  {
    label: '{value}',
    insertText: '{value}',
    kind: 12, // Value kind
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '{description of this value}',
    },
    conditions: [
      {
        function: 'isValueCompletion',
        params: ['{propertyName}'],
      },
    ],
    targetSpecs: {TargetSpecConstant},
  },
];

export default completion;
```

**Comprehensive Coverage Strategy**:

1. **Root Element Properties**:
   - Include ALL properties defined in root specification element
   - Examples: openapi, info, servers, paths, components, security, tags, externalDocs
   - Include new fields (e.g., OpenAPI 3.2's jsonSchemaDialect, webhooks, $self)

2. **Nested Element Properties**:
   - For EVERY element type, create completions for its properties
   - Use conditions to show completions in correct context
   - Examples:
     - Info: title, version, description, summary, contact, license, termsOfService
     - Server: url, description, variables, name (new in 3.2)
     - License: name, url, identifier (new in 3.2)
     - PathItem: get, post, put, delete, patch, options, head, trace, query (new in 3.2), servers, parameters
     - Operation: operationId, summary, description, parameters, requestBody, responses, callbacks, security

3. **Collection/Map Properties**:
   - For dynamic collections (paths, components.schemas, webhooks), add completions for:
     - Pattern keys (e.g., "/users/{id}" for paths)
     - Component names with common patterns
     - HTTP methods for operations

4. **Value Completions**:
   - Enum values (e.g., parameter.in: "query", "header", "path", "cookie")
   - Common HTTP methods
   - Standard MIME types
   - JSON Schema types

5. **Special Field Completions**:
   - $ref completions with JSON Pointer patterns
   - Media type strings (application/json, application/yaml, etc.)
   - Security scheme types (apiKey, http, oauth2, openIdConnect)

**Format Selection Rules**:
- String values → `CompletionFormat.QUOTED`
- Objects → `CompletionFormat.OBJECT`
- Arrays → `CompletionFormat.ARRAY`
- Numbers/booleans → `CompletionFormat.UNQUOTED`
- URLs/URIs → `CompletionFormat.QUOTED`

### Completion Format Mapping

| Property Type | CompletionFormat |
|--------------|------------------|
| String | QUOTED |
| Object | OBJECT |
| Array | ARRAY |
| Number | UNQUOTED |
| Boolean | UNQUOTED |
| Any | UNQUOTED |

**Documentation Best Practices**:
- Link directly to specification section (e.g., `[Documentation](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#info-object)`)
- Include brief description from spec
- Mention if field is required or optional
- Note any constraints or formats
- Reference related fields

**Condition Functions**:
Common conditions to control when completions appear:
```typescript
conditions: [
  { function: 'isInside{ElementType}' },  // Inside specific element
  { function: 'isValueCompletion', params: ['{propertyName}'] },  // Completing value
  { function: 'hasParent', params: ['{parentElement}'] },  // Has specific parent
]
```

**OpenAPI 3.2.0 Pattern**: Created 70+ completion items organized by:
- Root properties (15 items)
- Info properties (7 items)
- Server properties (4 items)
- Components properties (10+ items for each type)
- PathItem properties (15+ items including new QUERY method)
- Operation properties (20+ items)
- Response, Parameter, RequestBody, MediaType properties
- Schema properties (JSON Schema keywords)
- Security properties

#### 5.3 Generate documentation.ts

This file provides hover documentation for properties.

**Template:**
```typescript
import { {TargetSpecConstant} } from '../target-specs.ts';

/**
 * Omitted fixed fields:
 * {List fields that don't need documentation here}
 *
 * Field omission reason: omitted fields do have a non-union type. Thus,
 * documentation for these fields doesn't need to be specified here and will
 * come directly from the type itself. Description of these fields doesn't
 * contain significant information.
 */

const documentation = [
  {
    target: '{propertyName}',
    docs: '{markdown documentation from spec}',
    targetSpecs: {TargetSpecConstant},
  },
  // Repeat for properties that need documentation...
];

export default documentation;
```

**Steps:**
1. For each property in the root element:
   - If property has complex type or union type, add documentation entry
   - If property type is simple and self-explanatory, omit (list in comment)
   - Link to specification documentation with proper version URLs
