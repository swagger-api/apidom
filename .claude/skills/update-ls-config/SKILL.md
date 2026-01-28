---
name: update-ls-config
description: Updates apidom-ls configuration for a namespace package by analyzing the namespace structure and creating completion, documentation, and lint configurations
disable-model-invocation: false
user-invocable: true
---

# Update Language Service Config Skill

**Skill Name:** `update-ls-config`
**Description:** Updates apidom-ls configuration for a specific namespace package by analyzing the namespace structure and creating completion, documentation, and lint configurations.

## Overview

This skill automates the process of updating the language service (apidom-ls) configuration for a namespace package. It analyzes the namespace package structure, corresponding parser adapter packages, and generates appropriate configuration files for IDE features like autocomplete, hover documentation, and validation.

**Scale**: Based on OpenAPI 3.2.0 implementation, expect to create:
- 70+ completion items for comprehensive property suggestions
- 50+ lint rules for validation (one per element type minimum)
- Documentation for complex/union type properties
- Support for all specification elements and their nested properties

## When to Use

Use this skill when:
- A new namespace package has been created and needs language service support
- An existing namespace package has been updated with new elements or properties
- Parser adapter packages have been created for a namespace
- You need to add IDE support (completion, documentation, validation) for a specification version

## Prerequisites

Before running this skill:
1. **Namespace package must exist**: The target `apidom-ns-{spec}-{version}` package must be created and built
2. **Parser adapters exist** (recommended): Both JSON and YAML parser adapter packages should exist
3. **Package is built**: Run `npm run build` in the namespace package directory
4. **Specification documentation**: Have access to the specification documentation URLs for generating docs

## Skill Instructions

### Phase 1: Gather Information

Ask the user for the following information:

1. **Namespace Package Name**: The namespace package to generate config for (e.g., 'apidom-ns-openapi-3-2', 'apidom-ns-asyncapi-3')
2. **Specification Type**: The specification family (e.g., 'openapi', 'asyncapi', 'arazzo')
3. **Version Identifier**: The version string for directory naming (e.g., 'openapi3_2', 'asyncapi3')
4. **Specification Documentation Base URL**: Base URL for documentation links (e.g., 'https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md')
5. **Update Existing Config**: Whether to update existing config or create new (boolean)

### Phase 2: Analyze Namespace Package

#### 2.1 Read Namespace Structure

Navigate to `packages/{namespace-package}/src/` and analyze:

1. **Elements Directory** (`src/elements/`):
   - List all element files (e.g., `Info.ts`, `Server.ts`, `PathItem.ts`)
   - For each element, extract:
     - Element class name
     - Properties (from class definition or refractor specification)
     - Whether it extends from OpenAPI 3.1/3.0 or is new

2. **Refractor Specification** (`src/refractor/specification.ts`):
   - Read the specification object that defines element structure
   - Extract fixed fields and patterned fields for each element
   - Identify required vs optional properties

3. **Predicates** (`src/predicates.ts`):
   - List all predicates to understand element type checking
   - Map predicate names to element types

#### 2.2 Analyze Parser Adapters

Check for corresponding parser adapter packages:
- `packages/apidom-parser-adapter-{spec}-json-{version}/`
- `packages/apidom-parser-adapter-{spec}-yaml-{version}/`

Extract:
- Media types supported
- Detection patterns
- Version strings

### Phase 3: Determine Config Directory Structure

Based on the specification type and version:

1. **Spec Type Directory**: `packages/apidom-ls/src/config/{spec}/`
   - e.g., `packages/apidom-ls/src/config/openapi/`
   - e.g., `packages/apidom-ls/src/config/asyncapi/`

2. **Version Directory**: `packages/apidom-ls/src/config/{spec}/{version}/`
   - e.g., `packages/apidom-ls/src/config/openapi/openapi3_2/`
   - e.g., `packages/apidom-ls/src/config/asyncapi/asyncapi3/`

3. **Check if version directory exists**:
   - If NO: Create new directory structure
   - If YES: Ask user whether to update or skip

### Phase 4: Generate Target Spec Definition

#### 4.1 Update target-specs.ts

Location: `packages/apidom-ls/src/config/{spec}/target-specs.ts`

Add the new version constant if it doesn't exist:

```typescript
export const {SpecCamelCase}{VersionNoUnderscore} = Symbol.for('{spec}{version}');
```

Example:
```typescript
export const OpenAPI32 = Symbol.for('openapi3.2');
```

Update the `targetSpecs` array to include the new symbol.

### Phase 5: Generate Configuration Files

#### 5.1 Create Version Directory Structure

```
packages/apidom-ls/src/config/{spec}/{version}/
├── completion.ts        # Autocomplete configuration
├── documentation.ts     # Hover documentation
├── lint/               # Validation rules directory
│   ├── allowed-fields.ts
│   ├── {element}--type.ts
│   └── index.ts
└── meta.ts             # Aggregates all configs
```

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

#### 5.4 Generate lint/allowed-fields.ts

Defines which fields are allowed in the root element.

**Template:**
```typescript
import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { {TargetSpecConstant} } from '../../target-specs.ts';

const allowedFieldsLint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [
    '{field1}',
    '{field2}',
    // ... list all allowed fields
  ],
  marker: 'key',
  targetSpecs: {TargetSpecConstant},
};

export default allowedFieldsLint;
```

#### 5.5 Generate lint/{element}--type.ts files

For each element type, create a type validation lint rule. Based on OpenAPI 3.2.0, create comprehensive coverage:

**Standard Type Validation Template:**
```typescript
import { DiagnosticSeverity } from 'vscode-languageserver-types';

import ApilintCodes from '../../../codes.ts';
import { LinterMeta } from '../../../../apidom-language-types.ts';
import { {TargetSpecConstant} } from '../../target-specs.ts';

const {element}TypeLint: LinterMeta = {
  code: ApilintCodes.{SPEC}_{VERSION}_{ELEMENT}_TYPE,
  source: 'apilint',
  message: "'{element}' value must be {expectedType}",
  severity: DiagnosticSeverity.Error,
  linterFunction: '{linterFunction}',
  linterParams: ['{expectedElementType}'],
  marker: 'value',
  target: '{propertyName}',
  data: {
    quickFix: [
      {
        message: "replace it with {expectedType}",
        action: 'replaceWith',
        functionParams: ['{defaultValue}'],
      },
    ],
  },
  targetSpecs: {TargetSpecConstant},
};

export default {element}TypeLint;
```

**Linter functions by validation type:**

1. **Element Type Validation** - `apilintElementOrClass`:
   ```typescript
   linterFunction: 'apilintElementOrClass',
   linterParams: ['{ElementType}Element'],  // e.g., 'InfoElement', 'ServerElement'
   ```

2. **Value Type Validation** - `apilintType`:
   ```typescript
   linterFunction: 'apilintType',
   linterParams: ['string'],  // 'string', 'array', 'object', 'number', 'boolean'
   ```

3. **Required Field Validation** - `apilintContainsRequiredField`:
   ```typescript
   linterFunction: 'apilintContainsRequiredField',
   linterParams: ['{requiredFieldName}'],
   message: "'{element}' must contain '{requiredFieldName}' field",
   ```

4. **Allowed Values Validation** - `apilintValueOrArray`:
   ```typescript
   linterFunction: 'apilintValueOrArray',
   linterParams: ['{allowedValue1}', '{allowedValue2}'],
   message: "'{element}' must be one of: {allowedValue1}, {allowedValue2}",
   ```

5. **Allowed Fields Validation** - `allowedFields`:
   ```typescript
   linterFunction: 'allowedFields',
   linterParams: ['field1', 'field2', 'field3', ...],
   message: "Object includes not allowed fields",
   ```

**Comprehensive Lint Coverage** (as seen in OpenAPI 3.2.0):

Create lint files for:
- **Root element** validation (type, required fields, allowed fields)
- **Each nested element** (Info, Server, License, Contact, etc.)
- **Each array element** (servers, tags, security, etc.)
- **Each collection element** (paths, components, webhooks, etc.)
- **Special validations** (media types, HTTP methods, JSON Schema dialects)

**Example: Complete lint structure for Info element**:
```
lint/
├── info/
│   ├── allowed-fields.ts      # Validate only specified fields
│   ├── title--type.ts         # title must be string
│   ├── title--required.ts     # title is required
│   ├── version--type.ts       # version must be string
│   ├── version--required.ts   # version is required
│   ├── description--type.ts   # description must be string
│   ├── summary--type.ts       # summary must be string (new in 3.2)
│   ├── contact--type.ts       # contact must be Contact element
│   ├── license--type.ts       # license must be License element
│   └── index.ts               # Export all lint rules
```

**OpenAPI 3.2.0 Pattern**: Created 56+ lint rule directories covering every element type and their properties comprehensively.

#### 5.6 Generate lint/index.ts

Aggregates all lint rules.

**Template:**
```typescript
import allowedFieldsLint from './allowed-fields.ts';
import {element1}TypeLint from './{element1}--type.ts';
import {element2}TypeLint from './{element2}--type.ts';
// ... import all lint rules

const lints = [
  allowedFieldsLint,
  {element1}TypeLint,
  {element2}TypeLint,
  // ... list all lint rules
];

export default lints;
```

#### 5.7 Generate meta.ts

Aggregates completion, documentation, and lint configs.

**Template:**
```typescript
import lint from './lint/index.ts';
import completion from './completion.ts';
import documentation from './documentation.ts';
import { FormatMeta } from '../../../apidom-language-types.ts';

const meta: FormatMeta = {
  lint,
  completion,
  documentation,
};

export default meta;
```

### Phase 6: Update Element-Specific Configs

For each element type in the namespace (e.g., Info, Server, PathItem):

1. **Check if element config directory exists**:
   - Path: `packages/apidom-ls/src/config/{spec}/{element-name}/`
   - If it doesn't exist and element is specific to this version, create it

2. **Generate element completion config**:
   - List all properties of the element
   - Generate completion items for each property

3. **Generate element documentation config**:
   - Document complex properties

4. **Generate element lint rules**:
   - Type validation for each property
   - Required field validation
   - Allowed fields validation

### Phase 7: Update Main Config Files

#### 7.1 Update config/{spec}/config.ts

Add import and export for the new version config:

```typescript
import {version}Meta from './{version}/meta.ts';

// In the exports or config object:
export { {version}Meta };
```

#### 7.2 Update config/{spec}/symbols.ts

If new element types were introduced, add symbols:

```typescript
export const {element}Symbol = Symbol.for('{namespace}.{element}');
```

### Phase 8: Validation and Testing

1. **Build the namespace package**:
   ```bash
   cd packages/{namespace-package}
   npm run build
   ```

2. **Build apidom-ls**:
   ```bash
   cd packages/apidom-ls
   npm run build
   ```

3. **Run type checking**:
   ```bash
   npm run typescript:check-types
   ```

4. **Test the configuration**:
   - Open a sample file in an IDE with the language server
   - Verify autocomplete works for the new version
   - Verify hover documentation appears
   - Verify validation/linting works

### Phase 9: Document Changes

Update `packages/apidom-ls/README.md` or `CHANGELOG.md` to reflect:
- New specification version support
- Added completion items
- Added validation rules
- Any breaking changes

## Special Features and Edge Cases

Based on OpenAPI 3.2.0 and other implementations, handle these special cases:

### 1. New HTTP Methods or Operations
When a specification adds new standard operations (like OpenAPI 3.2's QUERY):
- Add completion item with same structure as existing methods
- Add to PathItem allowed fields
- Create lint rule for type validation
- Update documentation with method-specific details

### 2. Dynamic Collections
For fields with arbitrary keys (additionalOperations, webhooks, components.mediaTypes):
- Create value completions for common patterns
- Document the key format/pattern
- Provide lint rules for value types
- Add documentation explaining the collection purpose

### 3. Version-Specific Fields
When adding fields not in parent version:
- Ensure targetSpecs correctly limits to this version
- Document what's new in the field description
- Add appropriate default values in quick fixes
- Create comprehensive lint coverage

### 4. Hierarchical Fields
For nested structures with multiple levels (like OpenAPI 3.2's tag hierarchical fields):
- Create completions for each nesting level
- Use conditions to show relevant properties
- Document the hierarchy structure
- Validate structure at each level

### 5. Global Configuration Fields
For fields affecting document-wide behavior (like jsonSchemaDialect):
- Provide documentation explaining scope of impact
- Include valid values as completions
- Link to related specification sections
- Validate format and allowed values

### 6. Self-Reference Fields
For fields like $self that establish document URI:
- Validate URI format
- Document purpose for relative reference resolution
- Provide examples in documentation

### 7. Reference vs Inline Content
For fields that accept either $ref or inline content:
- Provide completions for both patterns
- Document when to use each approach
- Validate structure for inline content
- Add lint rules for reference format

## Important Patterns

### Completion Format Mapping

| Property Type | CompletionFormat |
|--------------|------------------|
| String | QUOTED |
| Object | OBJECT |
| Array | ARRAY |
| Number | UNQUOTED |
| Boolean | UNQUOTED |
| Any | UNQUOTED |

### Linter Function Mapping

| Validation Type | linterFunction | linterParams |
|----------------|----------------|--------------|
| Element type | apilintElementOrClass | ['ElementName'] |
| Value type | apilintType | ['string'\|'array'\|'object'\|'number'\|'boolean'] |
| Required field | apilintContainsRequiredField | ['fieldName'] |
| Allowed fields | allowedFields | [...fieldNames] |

### Target Spec Naming Convention

- **OpenAPI**: `OpenAPI{major}{minor}` (e.g., `OpenAPI32` for 3.2)
- **AsyncAPI**: `AsyncAPI{major}` (e.g., `AsyncAPI3` for 3.x)
- **Arazzo**: `Arazzo{major}_{minor}` (e.g., `Arazzo1_0` for 1.0)

### Version Directory Naming

- Use lowercase with underscore: `openapi3_2`, `asyncapi3`, `arazzo1_0`
- Must match the pattern used in other version directories

## Common Element Types to Include

For most specifications, generate configs for these common elements:

### Root Element
- Version field (e.g., `openapi`, `asyncapi`)
- Info object
- Servers array
- Security array
- Tags array
- External docs object

### Info Element
- title (required string)
- version (required string)
- description (optional string)
- termsOfService (optional string)
- contact (optional object)
- license (optional object)

### Server Element
- url (required string)
- description (optional string)
- variables (optional object)

### Contact Element
- name (optional string)
- url (optional string)
- email (optional string)

### License Element
- name (required string)
- url (optional string)

## Troubleshooting

### Issue: Cannot find element definitions

**Solution**: Ensure the namespace package is built. Element definitions are in `packages/{namespace}/src/elements/`. If elements are not clearly defined, check the refractor specification.

### Issue: Documentation URLs are incorrect

**Solution**: Verify the specification documentation base URL. Different versions may have different URL structures. Check existing version configs for the pattern.

### Issue: Lint rules are too strict

**Solution**: Review the specification to determine which fields are truly required vs optional. Use `DiagnosticSeverity.Warning` for optional best practices.

### Issue: Completion not showing up

**Solution**:
1. Check that `targetSpecs` is correctly set
2. Verify the completion format matches the property type
3. Ensure meta.ts properly exports the completion array

### Issue: Build errors in apidom-ls

**Solution**:
1. Check all imports use `.ts` extension
2. Verify all referenced target spec symbols exist in target-specs.ts
3. Run `npm run lint:fix` to fix formatting issues

## References

### Existing Configurations to Reference

- **OpenAPI 3.1**: `packages/apidom-ls/src/config/openapi/openapi3_1/`
- **OpenAPI 3.0**: `packages/apidom-ls/src/config/openapi/openapi3_0/`
- **AsyncAPI 3**: `packages/apidom-ls/src/config/asyncapi/asyncapi3/`
- **AsyncAPI 2**: `packages/apidom-ls/src/config/asyncapi/asyncapi2/`

### Key Files to Study

- `packages/apidom-ls/src/config/codes.ts` - All diagnostic codes
- `packages/apidom-ls/src/apidom-language-types.ts` - Type definitions
- `packages/apidom-ls/src/config/config.ts` - Main config aggregator

### Related Documentation

- **Language Server Protocol**: https://microsoft.github.io/language-server-protocol/
- **VSCode Language Extensions**: https://code.visualstudio.com/api/language-extensions/overview
- **ApiDOM Core Concepts**: `packages/apidom-core/README.md`
