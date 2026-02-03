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

## Best Practices for Adding Specification Versions

This section provides guidelines for implementing support for new API specification versions (e.g., OpenAPI 3.2, AsyncAPI 3.0). These practices were developed from lessons learned in PR #5110 and other implementations.

### Critical Rules (⚠️ Read This First)

When implementing a new specification version that extends a parent version:

#### 1. Check Parent Version FIRST

**Rule**: Before adding ANY field to an element, verify it doesn't already exist in the parent version.

**Example from PR #5110**:
```typescript
// ❌ WRONG: Components.ts in OAS 3.2
class Components extends ComponentsElement {
  get pathItems(): ObjectElement | undefined {  // pathItems already in OAS 3.1!
    return this.get('pathItems');
  }
}

// ✅ CORRECT: Only add NEW fields
class Components extends ComponentsElement {
  get mediaTypes(): ObjectElement | undefined {  // mediaTypes is NEW in 3.2
    return this.get('mediaTypes');
  }
}
```

**Checklist**:
- [ ] Read parent namespace element: `packages/apidom-ns-{parent}/src/elements/{ElementName}.ts`
- [ ] Read parent specification document
- [ ] Identify ONLY fields new in current version
- [ ] Never redefine existing fields

#### 2. Verify Fields Exist in Specification

**Rule**: Confirm every field appears in the official specification "Fixed Fields" table.

**Example from PR #5110**:
```typescript
// ❌ WRONG: ComponentsWebhooks element
// webhooks is at root OpenAPI Object level, NOT in Components!
class ComponentsWebhooks extends ObjectElement { ... }
```

**Prevention**:
- Read the specification carefully
- Cross-reference with JSON Schema files
- Check specification examples for actual structure
- Verify field locations in object hierarchy

#### 3. Implement ALL New Fields

**Rule**: Don't skip fields that seem unimportant. Implement everything in the specification.

**Missing fields from PR #5110**:
- `Encoding`: missing `encoding`, `prefixEncoding`, `itemEncoding`
- `MediaType`: missing `prefixEncoding`, `itemEncoding`
- `OAuthFlow`: missing `deviceAuthorizationUrl`
- `OAuthFlows`: missing `deviceAuthorization`
- `XML`: missing `nodeType`
- `SecurityScheme`: missing `deprecated`
- `Response`: missing `summary`

**Process**:
1. Create comprehensive checklist of ALL objects
2. For each object, list ALL fields
3. Compare systematically with parent version
4. Mark new vs inherited fields
5. Implement ALL new fields

#### 4. Verify All URLs

**Rule**: Test every URL before using it. Never assume a URL pattern exists.

**Example from PR #5110**:
```typescript
// ❌ WRONG: URL returns 404
static default = new JsonSchemaDialect('https://spec.openapis.org/oas/3.2/dialect/base');

// ✅ CORRECT: Verified URL
static default = new JsonSchemaDialect('https://spec.openapis.org/oas/3.2/dialect/2025-09-17');
```

**Verification**:
```bash
curl -I https://spec.openapis.org/oas/3.2/dialect/2025-09-17
# Must return 200 OK
```

#### 5. Search Before Creating

**Rule**: Before creating new files, search for existing similar implementations.

**Example from PR #5110**: Both `OpenApi3-1.ts` and `OpenApi3-2.ts` existed when only `OpenApi3-2.ts` should exist.

**Process**:
- Use Glob/Grep to find similar files
- Check parent namespaces
- Verify you're not duplicating functionality

### Pre-Implementation Checklist

Before writing ANY code:

- [ ] Read FULL official specification (not summaries)
- [ ] Read parent specification (if extending)
- [ ] Read parent namespace implementation files
- [ ] Create comparison table: parent vs current
- [ ] Mark which fields are NEW vs inherited
- [ ] Test all URLs exist (curl/browser)
- [ ] List ALL new fields for each object
- [ ] Search for similar existing implementations

### Specification Version Inheritance

When a version extends a parent (e.g., OpenAPI 3.2 extends 3.1):

```typescript
import { InfoElement } from '@swagger-api/apidom-ns-openapi-3-1';

// Only add fields NEW in this version
class Info extends InfoElement {
  // ✅ Add only new fields
  
  // ❌ Don't redefine existing fields
}
```

#### When to Add Fields

| Scenario | Action | Example |
|----------|--------|---------|
| Field exists in parent, unchanged | Don't add | `Info.license` in 3.1 → Don't add in 3.2 |
| Field is completely new | Add getter/setter | `MediaType.itemSchema` new in 3.2 → Add it |
| Nested object changed | Update nested element | `License.identifier` added in 3.1 → Update License in 3.1, not Info.license |

### URL Patterns

| Specification | Pattern |
|---------------|---------|
| OpenAPI Dialect | `https://spec.openapis.org/oas/{version}/dialect/{date}` |
| OpenAPI Schema | `https://spec.openapis.org/oas/{version}/schema/{date}` |

### Before Committing

- [ ] No fields from parent are redefined
- [ ] ALL new spec fields implemented
- [ ] All URLs verified (return 200)
- [ ] No duplicate files
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes
- [ ] `npm run typescript:check-types` passes
- [ ] `npm run lint` passes

### Key Principle

**Always verify against official specification and parent version before implementing.**

Following these guidelines prevents 95% of common issues in specification implementation.
