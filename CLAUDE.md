# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

ApiDOM is a monorepo that provides a unified structure for describing APIs across different API description languages (OpenAPI, AsyncAPI, Arazzo, etc.) and serialization formats (JSON, YAML). It allows parsers to parse different formats into a single structure, enabling tool builders to consume one structure for all formats.

## Development Commands

### Setup
```bash
# Initial setup
npm i
npm run build
```

**Important**: The monorepo **must** be built before running tests or using packages. This is required for the monorepo package topology to work correctly.

### Build Commands
```bash
npm run build              # Build all packages
npm run build:es          # Build ES modules only (.mjs)
npm run build:cjs         # Build CommonJS only (.cjs)
npm run clean             # Remove all build artifacts
```

**Parallelization**: Build scripts run in parallel with a default of 2 CPU cores. Set `CPU_CORES` environment variable to utilize more cores:
```bash
export CPU_CORES=4
npm run build
```

### Testing
```bash
npm run test              # Run all tests (requires build first)

# For individual packages
cd packages/apidom-core
npm run test              # Run tests for specific package
```

Tests use ts-mocha with mocha bootstrap files. Test files are located in `test/` directories within each package and use `.ts` extension.

### Linting and Type Checking
```bash
npm run lint                      # Lint all packages
npm run lint:fix                  # Auto-fix linting issues
npm run typescript:check-types    # Type check all packages
npm run typescript:declaration    # Generate TypeScript declarations
```

### Linking for Local Development

To use this monorepo as a local dependency in another project:

```bash
# In apidom monorepo
npm i
npm run build
npm run link

# In dependent project
npm link @swagger-api/apidom-core @swagger-api/apidom-parser
# (list all packages you need in a single command)
```

**Important**: Always link packages in a **single** `npm link` command with multiple package names, not separate commands.

To unlink:
```bash
# In dependent project - run npm i to restore
npm i

# In apidom monorepo - to clean up global links
npm run unlink
```

## Architecture

### Three-Stage Processing Pipeline

ApiDOM transforms API documents through three distinct stages:

#### 1. Parse Stage
- **Lexical Analysis**: Uses tree-sitter/web-tree-sitter to convert JSON/YAML strings into CST (Concrete Syntax Tree)
- **Syntactic Analysis**: Converts CST into generic ApiDOM using base namespace
  - **Direct**: CST → Generic ApiDOM (1 traversal, faster, default)
  - **Indirect**: CST → JSON AST → Generic ApiDOM (2 traversals, enables complex analysis)

#### 2. Refract Stage
Takes generic ApiDOM and transforms it into semantic ApiDOM (e.g., OpenAPI 3.1, AsyncAPI 2.x). This is where:
- Generic structures become specification-specific elements
- Plugins can be applied for additional transformations
- Specification rules and semantics are applied

#### 3. Generate Stage
Serializes ApiDOM back to JSON/YAML. Semantic information is preserved but style information (whitespace, comments) is lost.

**Example transformation (OpenAPI 3.1 JSON):**
```
Direct:   JSON string → tree-sitter CST → generic ApiDOM → OpenAPI 3.1 ApiDOM
Indirect: JSON string → tree-sitter CST → JSON AST → generic ApiDOM → OpenAPI 3.1 ApiDOM
Plugins:  JSON string → tree-sitter CST → generic ApiDOM → OpenAPI 3.1 ApiDOM → plugins → OpenAPI 3.1 ApiDOM
```

### Package Organization

The monorepo is organized into logical groups:

#### Core Packages
- **apidom-ast**: AST nodes for JSON/YAML formats, traversal algorithms for CST/AST
- **apidom-core**: Base ApiDOM namespace, predicates, algorithms for transforming/traversing ApiDOM structures
- **apidom-error**: Error handling primitives
- **apidom-converter**: Format conversion utilities
- **apidom-logging**: Logging infrastructure

#### Query and Navigation
- **apidom-json-pointer**: JSON Pointer (RFC 6901) evaluation against ApiDOM
- **apidom-json-pointer-relative**: Relative JSON Pointer support
- **apidom-json-path**: JSONPath expressions for querying ApiDOM structures

#### Namespaces (apidom-ns-*)
Each namespace package provides:
- Specification-specific element classes (extending base elements)
- Refractor layer for transforming generic ApiDOM → semantic ApiDOM
- Predicates for element type checking
- Visitors for traversing the namespace structure

Available namespaces:
- `apidom-ns-openapi-2`, `apidom-ns-openapi-3-0`, `apidom-ns-openapi-3-1`
- `apidom-ns-asyncapi-2`, `apidom-ns-asyncapi-3`
- `apidom-ns-arazzo-1`
- `apidom-ns-json-schema-draft-4/6/7`, `apidom-ns-json-schema-2019-09`, `apidom-ns-json-schema-2020-12`
- `apidom-ns-api-design-systems`

#### Parser Adapters (apidom-parser-adapter-*)
Base adapters:
- `apidom-parser-adapter-json`: JSON parsing (lexical + syntactic analysis)
- `apidom-parser-adapter-yaml-1-2`: YAML 1.2 parsing

Specification adapters extend base adapters to parse directly into namespace elements. Naming pattern: `apidom-parser-adapter-{spec}-{format}-{version}`:
- Example: `apidom-parser-adapter-openapi-json-3-1` (OpenAPI 3.1 in JSON)
- Example: `apidom-parser-adapter-asyncapi-yaml-2` (AsyncAPI 2.x in YAML)

#### Parser Orchestration
- **apidom-parser**: Unified API that consumes any parser adapter with compatible shape. Maps source strings to media types and namespaces.

#### Advanced Manipulation
- **apidom-reference**: Algorithms for parsing, resolving, dereferencing, and bundling
  - Parse component: Default plugins for filesystem/HTTP, multiple format support
  - Resolve component: File resolution (local/HTTP), external dependency resolution
  - Dereference component: Transclude references with referenced elements
  - Bundle component: Package multi-file resources into single file (Compound Document)

#### Language Service
- **apidom-ls**: LSP Protocol-compliant language service providing validation, documentation, completion, semantic highlighting, and dereferencing for supported specifications

### Build Artifacts

Each package generates five types of build artifacts (all are polymorphic - work in browsers, Node.js, Web Workers):

1. **`.cjs` files**: ES5 + CommonJS imports (in `src/` directory) - for legacy Node.js
2. **`.mjs` files**: ES5 + ES6 imports (in `src/` directory) - for modern Node.js and bundlers
3. **`dist/` directory**: UMD bundles (minified and un-minified) - for browsers
4. **`types/` directory**: TypeScript declarations generated from source

### Key Patterns

#### Element Structure
ApiDOM elements are recursive by nature. Elements have:
- `element`: Type name
- `meta`: Metadata (title, description, etc.)
- `attributes`: Element attributes
- `content`: The actual value/children

#### Refractor Pattern
Each namespace package has a `refractor/` directory containing:
- `specification.ts`: Defines the specification structure
- `index.ts`: Main refract function that converts generic → semantic ApiDOM
- `toolbox.ts`: Utilities for refractor plugins
- Visitor classes for traversing and transforming specific element types

#### Parser Adapter Shape
Parser adapters must provide:
- `detect`: Function to determine if a string matches the format
- `parse`: Async function to parse string into ApiDOM
- `mediaTypes`: Array of supported media types

#### Visitor Pattern
Use `visit()` from `apidom-core` to traverse ApiDOM structures. Visitors define `enter` and `leave` methods for each element type they handle.

## Prerequisites

- **Node.js**: `>=22.14.0` (version `=22.14.0` required for development)
- **npm**: `>=10.9.2`
- **node-gyp**: `>=10` with Python 3.x
- **GLIBC**: `>=2.29`
- **GCC compiler**
- **emscripten** or **docker** (for WASM compilation)

## Docker Development

If prerequisites can't be satisfied locally:

```bash
docker-compose up
docker exec -it apidom-dev npm i --verbose
docker exec -it apidom-dev npm run build
docker exec -it apidom-dev npm run test
```

## Important Notes

### Code Style
- Use single quotes (enforced by ESLint)
- Always use `.ts` extension in imports (enforced): `import foo from './foo.ts'`
- Import ordering: builtin/external/internal, then parent/sibling/index with newlines between groups

### WASM Builds
The `prebuild` script builds WASM directly inside `node_modules` for tree-sitter packages. This happens before the main build.

### Source Maps
Elements can include source map information via `hasElementSourceMap()` predicate, allowing tracing back to original source positions.

### Package Dependencies
Packages follow a dependency hierarchy:
- Core packages (ast, core, error) are foundational
- Namespaces depend on core
- Parser adapters depend on both core and relevant namespaces
- Parser depends on parser adapters
- Reference depends on parser and namespaces
- Language service depends on reference

When modifying core packages, expect cascading build requirements in dependent packages.

---

## Implementing Language Service Lint Rules

This section provides guidelines for implementing lint validation rules in `packages/apidom-ls/src/config/` for API specifications. These practices were developed from lessons learned in PR #5104 and other implementations.

**⚠️ MANDATORY REQUIREMENT**: Every new lint rule MUST have corresponding test coverage. Lint rules without tests are incomplete and will not be merged. This is non-negotiable.

### Critical Rules (⚠️ Read This First)

#### 1. Never Create Empty Stubs

**Rule**: Every lint file you create MUST be fully implemented before committing.

**❌ WRONG: Creating placeholders**
```typescript
// allowed-fields-3-0.ts
const allowedFields3_0Lint: LinterMeta = {
  // add remaining lint docs here
  targetSpecs: [{ namespace: 'asyncapi', version: '3.0.0' }],
};
```

**✅ CORRECT: Complete implementation**
```typescript
// allowed-fields-3-0.ts
const allowedFields3_0Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [['field1', 'field2'], 'x-'],
  marker: 'key',
  targetSpecs: AsyncAPI3,
};
```

**Prevention Checklist:**
- [ ] Error code defined in `codes.ts`
- [ ] `source: 'apilint'` set
- [ ] Descriptive error message
- [ ] Severity level set
- [ ] Correct linter function
- [ ] Linter params provided
- [ ] Marker specified ('key' or 'value')
- [ ] targetSpecs set to correct version array

#### 2. Check Similar Implementations FIRST

**Rule**: Before implementing any lint rule, find and read 2-3 similar existing rules.

**Process:**
```bash
# Find similar rules
find packages/apidom-ls/src/config -name "*--required*.ts" | head -3
find packages/apidom-ls/src/config -name "*--type*.ts" | head -3
```

**What to check:**
- Error message patterns
- Linter function choice
- Linter params structure
- Use of conditions
- QuickFix implementation
- How references are handled

#### 3. Don't Redundantly Check References

**Rule**: Never include 'reference' in `linterParams` - the refractor handles this automatically.

**❌ WRONG:**
```typescript
linterParams: [['operation', 'reference']],  // DON'T DO THIS
```

**✅ CORRECT:**
```typescript
linterParams: [['operation']],  // Refractor adds referenced-element metadata
```

**Why**: During refraction, elements that are Reference Objects get marked with `referenced-element: operation` metadata. The linter automatically accepts elements with matching `referenced-element` metadata.

#### 4. Use Conditions, Not Custom Functions

**Rule**: For conditional required fields (required unless $ref present), use `conditions`, not separate linter functions.

**❌ WRONG:**
```typescript
linterFunction: 'hasRequiredFieldUnlessRef',  // Custom function
linterParams: ['name'],
```

**✅ CORRECT:**
```typescript
linterFunction: 'hasRequiredField',
linterParams: ['name'],
conditions: [
  {
    function: 'missingField',
    params: ['$ref'],
  },
],
```

**Reference example:** `correlation-ID/lint/location--required.ts`

#### 5. Implement Complete Validation Sets

**Rule**: When adding a new referenceable object, implement ALL required validation rules.

**Required rules for referenceable objects:**
1. `allowed-fields-{version}.ts` - Define allowed fields
2. `{field}--type.ts` - Type validation for each field
3. `{field}--required.ts` - Required field validation (if applicable)
4. `$ref--no-siblings.ts` - Ensure $ref has no sibling fields
5. `$ref--valid.ts` - Validate $ref is valid URI-reference

**Example from PR #5104 fix:**
For `OperationReplyAddress`:
- ✅ `allowed-fields-3-0.ts`
- ✅ `location--type.ts`
- ✅ `location--required.ts`
- ✅ `description--type.ts`
- ✅ `$ref--no-siblings.ts` (added after review)
- ✅ `$ref--valid.ts` (added after review)

#### 6. Always Write Tests for New Lint Rules

**Rule**: Every new lint rule MUST have corresponding test coverage before the PR is considered complete.

**❌ WRONG: Implementing lint rules without tests**
```typescript
// Created new lint rule in operation/lint/action--required.ts
// ❌ No test file created
// ❌ No test fixtures added
```

**✅ CORRECT: Implementing lint rules with comprehensive tests**
```typescript
// 1. Created lint rule: operation/lint/action--required.ts
// 2. Created test fixtures: test/fixtures/validation/asyncapi/operation-action-required-3-0.yaml
// 3. Created/updated test file: test/operation.ts with test cases
// 4. Verified tests pass: npm run test
```

**Test coverage requirements:**
- **Valid cases**: Document should pass validation without errors
- **Invalid cases**: Document should trigger the specific error code
- **Edge cases**: Empty values, wrong types, conditional cases (with/without $ref)
- **QuickFix validation**: If quickFix is provided, test that it works correctly

**Test location:**
- Test fixtures: `packages/apidom-ls/test/fixtures/validation/{spec}/`
- Test files: `packages/apidom-ls/test/{object-name}.ts`

**Example test structure:**
```typescript
describe('operation', function () {
  context('given asyncapi 3.0.0 document with missing required action field', function () {
    it('should return validation error', async function () {
      const diagnostics = await validator.doValidation(/* ... */);
      assert.strictEqual(diagnostics.length, 1);
      assert.strictEqual(diagnostics[0].code, ApilintCodes.ASYNCAPI3_OPERATION_FIELD_ACTION_REQUIRED);
    });
  });
});
```

**CRITICAL**: Tests are NOT optional. Lint rules without tests will not be merged.

#### 7. Follow Consistent Naming and Messaging

**Rule**: Match error messages and naming conventions from similar existing rules.

**Message Patterns:**
| Type | Pattern | Example |
|------|---------|---------|
| Required field | `"should always have a '{field}'"` | `"should always have a 'name'"` |
| Type validation | `"'{field}' must be a {type}"` | `"'location' must be a string"` |
| Object shape | `"{Object} values must be of {Type} shape"` | `"Operations Object values must be of Operation Object shape"` |
| Reference ignored | `'All other properties in a "$ref" object are ignored'` | (constant message) |

**Linter Function Selection:**
| Validation Need | Linter Function | Params Example |
|----------------|-----------------|----------------|
| Primitive type | `apilintType` | `['string']`, `['boolean']` |
| Element/class | `apilintElementOrClass` | `[['operation']]` |
| Array items | `apilintArrayOfType` | `['string']` |
| Array of elements | `apilintArrayOfElementsOrClasses` | `[['securityRequirement']]` |
| Map values | `apilintChildrenOfElementsOrClasses` | `[['operation']]` |
| Required field | `hasRequiredField` | `['fieldName']` |
| Allowed fields | `allowedFields` | `[['field1', 'field2'], 'x-']` |
| Valid URI | `apilintValidURI` | N/A |

### Pre-Implementation Checklist

Before writing ANY lint rule code:

- [ ] Read official specification section for the object
- [ ] Read namespace element definition (`packages/apidom-ns-{spec}/src/elements/{Object}.ts`)
- [ ] Read refractor specification (`packages/apidom-ns-{spec}/src/refractor/specification.ts`)
- [ ] Find 2-3 similar existing lint rules and read them
- [ ] List ALL fields the object should have
- [ ] Determine which fields are new vs inherited (if extending a version)
- [ ] Check if object can be referenced (has `$ref` field)
- [ ] Verify any URLs you plan to use exist (curl/browser test)

### Implementation Checklist

For each lint rule:

**Lint Rule Implementation:**
- [ ] Add error code to `codes.ts` with appropriate number
- [ ] Set correct `code` from `ApilintCodes`
- [ ] Set `source: 'apilint'`
- [ ] Write clear, specific error message following patterns
- [ ] Set `severity: DiagnosticSeverity.Error` (or Warning for $ref siblings)
- [ ] Choose correct `linterFunction`
- [ ] Provide correct `linterParams` (NO 'reference' redundancy)
- [ ] Set correct `marker` ('key' or 'value')
- [ ] Add `conditions` if validation is conditional
- [ ] Add `quickFix` data for required fields
- [ ] Set `targetSpecs` to correct version array
- [ ] Add import to `index.ts`
- [ ] Add to lints array in `index.ts`

**Test Implementation (REQUIRED):**
- [ ] Create test fixture(s) in `test/fixtures/validation/{spec}/`
  - [ ] Valid case fixture (should pass validation)
  - [ ] Invalid case fixture (should trigger error)
  - [ ] Edge case fixtures (conditional scenarios, type variations)
- [ ] Create or update test file in `test/{object-name}.ts`
  - [ ] Test that valid cases pass without errors
  - [ ] Test that invalid cases trigger the correct error code
  - [ ] Test error message matches expected message
  - [ ] Test that quickFix works (if applicable)
- [ ] Run `npm run test` in `packages/apidom-ls` to verify tests pass

**Build & Quality Checks:**
- [ ] Run `npm run build` to verify no errors
- [ ] Run `npm run typescript:check-types` to verify types
- [ ] Run `npm run lint` to verify code style

### Common Mistakes and Prevention

| Mistake | Why It Happens | Prevention |
|---------|----------------|------------|
| **No tests written** | **Treating tests as optional** | **Tests are MANDATORY - write them first or immediately after lint rule** |
| Empty stub files | Rushed file structure creation | Use checklist, never commit unfinished files |
| Including 'reference' in params | Misunderstanding refractor metadata | Read how reference detection works |
| Custom functions for $ref conditions | Not finding existing patterns | Search for similar implementations first |
| Inconsistent messages | Not checking existing rules | Copy message patterns from similar rules |
| Missing $ref validations | Not checking if object is referenceable | Read spec, check if object can have $ref |
| Wrong linter function | Not understanding function purposes | Review linter function table |
| Redundant type checks | Not understanding required vs type | Check if required validation already exists |
| Missing fields | Not reading full spec | Create comprehensive field list from spec |
| Incomplete test coverage | Only testing happy path | Test valid, invalid, edge cases, and quickFix |

### Validation Rule Patterns

#### Pattern 1: Required Field (Conditional on $ref)
```typescript
const nameRequiredLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_TAG_FIELD_NAME_REQUIRED,
  source: 'apilint',
  message: "should always have a 'name'",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'hasRequiredField',
  linterParams: ['name'],
  marker: 'key',
  conditions: [
    {
      function: 'missingField',
      params: ['$ref'],
    },
  ],
  data: {
    quickFix: [
      {
        message: "add 'name' field",
        action: 'addChild',
        snippetYaml: 'name: \n  ',
        snippetJson: '"name": "",\n    ',
      },
    ],
  },
  targetSpecs: AsyncAPI3,
};
```

#### Pattern 2: Type Validation
```typescript
const locationTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_REPLY_ADDRESS_FIELD_LOCATION_TYPE,
  source: 'apilint',
  message: "'location' value must be a string",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'location',
  data: {},
  targetSpecs: AsyncAPI3,
};
```

#### Pattern 3: Array of Strings
```typescript
const enumTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_PARAMETER_FIELD_ENUM_TYPE,
  source: 'apilint',
  message: "'enum' must be an array of strings",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintArrayOfType',
  linterParams: ['string'],
  marker: 'key',
  target: 'enum',
  data: {},
  targetSpecs: AsyncAPI3,
};
```

#### Pattern 4: Object Values Validation
```typescript
const operationsValuesTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_COMPONENTS_FIELD_OPERATIONS_VALUES_TYPE,
  source: 'apilint',
  message: '"operations" members must be Operation Object',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintChildrenOfElementsOrClasses',
  linterParams: [['operation']],  // NO 'reference' here!
  marker: 'key',
  markerTarget: 'operations',
  target: 'operations',
  data: {},
  targetSpecs: AsyncAPI3,
};
```

#### Pattern 5: $ref No Siblings
```typescript
const $refNoSiblingsLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_REPLY_FIELD_$REF_NO_SIBLINGS,
  source: 'apilint',
  message: 'All other properties in a "$ref" object are ignored',
  severity: DiagnosticSeverity.Warning,  // Warning, not Error
  linterFunction: 'allowedFields',
  linterParams: [['$ref']],
  marker: 'key',
  conditions: [
    {
      function: 'existFields',
      params: [['$ref']],
    },
  ],
  data: {
    quickFix: [
      {
        message: 'remove $ref',
        action: 'removeChild',
        functionParams: ['$ref'],
        target: 'parent',
      },
    ],
  },
  targetSpecs: AsyncAPI3,
};
```

#### Pattern 6: $ref Valid URI
```typescript
const $refValidLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI3_OPERATION_REPLY_ADDRESS_FIELD_$REF_VALID,
  source: 'apilint',
  message: "'$ref' value must be a valid URI-reference",
  severity: DiagnosticSeverity.Error,
  linterFunction: 'apilintValidURI',
  marker: 'value',
  target: '$ref',
  data: {},
  targetSpecs: AsyncAPI3,
};
```

#### Pattern 7: Allowed Fields
```typescript
const allowedFields3_0Lint: LinterMeta = {
  code: ApilintCodes.NOT_ALLOWED_FIELDS,
  source: 'apilint',
  message: 'Object includes not allowed fields',
  severity: DiagnosticSeverity.Error,
  linterFunction: 'allowedFields',
  linterParams: [['field1', 'field2', 'field3'], 'x-'],  // x- for extensions
  marker: 'key',
  targetSpecs: AsyncAPI3,
};
```

### Testing Requirements

For each lint rule implemented:

1. **Create test fixtures** in `packages/apidom-ls/test/fixtures/validation/{spec}/`
   - Valid cases (should pass validation)
   - Invalid cases (should trigger errors)
   - Edge cases (empty values, wrong types, etc.)

2. **Create test files** in `packages/apidom-ls/test/`
   - Reference validation tests
   - Allowed fields tests
   - Field types tests
   - Required fields tests

3. **Test file naming:**
   - `{object}-{validation-type}.ts` (e.g., `operation-reply-address.ts`)
   - Group related validations in same test file

### Error Code Numbering

Error codes follow a structured numbering system in `codes.ts`:

```typescript
// Major version = Object type (e.g., 2080000 = ASYNCAPI3_OPERATION)
// Minor version = Field validations (e.g., 2080100 = first field, 2080200 = second field)
// Increment by 100 for each new field group

ASYNCAPI3_OPERATION = 2080000,
ASYNCAPI3_OPERATION_FIELD_ACTION_TYPE = 2080100,
ASYNCAPI3_OPERATION_FIELD_ACTION_REQUIRED,  // Auto-increments
ASYNCAPI3_OPERATION_FIELD_CHANNEL_TYPE = 2080200,
ASYNCAPI3_OPERATION_FIELD_CHANNEL_REQUIRED,
```

### Before Committing

Final verification checklist:

**Code Completeness:**
- [ ] NO empty stub files remain
- [ ] ALL new error codes added to `codes.ts`
- [ ] ALL lint rules fully implemented (not just targetSpecs)
- [ ] ALL lint rules added to their index.ts files
- [ ] Consistent error messages matching existing patterns
- [ ] NO redundant 'reference' in linterParams
- [ ] Conditional logic uses `conditions`, not custom functions
- [ ] Referenceable objects have $ref validation rules ($ref--no-siblings.ts and $ref--valid.ts)

**Test Coverage (MANDATORY):**
- [ ] ✅ **ALL new lint rules have test coverage** (non-negotiable)
- [ ] Test fixtures created for valid, invalid, and edge cases
- [ ] Test files created or updated with comprehensive test cases
- [ ] All tests pass: `npm run test` in `packages/apidom-ls`
- [ ] Tests verify correct error codes are triggered
- [ ] Tests verify error messages match expectations
- [ ] QuickFix tests included (if applicable)

**Build & Quality:**
- [ ] `npm run build` succeeds
- [ ] `npm run typescript:check-types` passes
- [ ] `npm run lint` passes

**Remember**: PRs with lint rules but no tests will be rejected. Testing is not optional.

### Key Principle

**Always verify against official specification, existing implementations, and namespace definitions before coding.**

Following these guidelines prevents 95% of common issues in lint rule implementation.
