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

### Standard Package Files

**IMPORTANT**: When creating a new package, always include these standard files:

#### .gitignore
Every package must have a `.gitignore` file to exclude build artifacts and dependencies from version control. Copy from an existing similar package (e.g., `apidom-parser-adapter-openapi-json-3-1/.gitignore`).

Typical contents:
```gitignore
# Build artifacts
src/**/*.mjs
src/**/*.cjs
dist/
types/

# Dependencies
node_modules/

# IDE
.idea/
.vscode/

# OS
.DS_Store
```

#### README.md
Every package must have a README.md with:
- Package name and description
- Installation instructions
- Usage examples
- API documentation (or link to generated docs)
- License information

Use existing packages as templates for structure and content.

#### CHANGELOG.md
Every package must have a CHANGELOG.md following the format:
```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - YYYY-MM-DD

### Added
- Initial release
- [List key features]
```

Maintain the changelog as the package evolves, following semantic versioning principles.

#### .mocharc.json
Every package with tests must have a `.mocharc.json` file to configure the test runner. This file tells mocha where to find test files and how to execute them.

**CRITICAL**: Without this file, the `npm test` command will fail silently or not find any tests.

Copy from an existing package and use this standard configuration:
```json
{
  "extensions": ["ts"],
  "loader": "ts-node/esm",
  "recursive": true,
  "spec": "test/**/*.ts",
  "file": ["test/mocha-bootstrap.ts"],
  "ignore": ["test/perf/**/*.ts"]
}
```

This configuration:
- Uses TypeScript files directly in tests
- Loads test files recursively from `test/` directory
- Runs the mocha bootstrap file before tests
- Ignores performance test files

### Creating a New Package

When creating a new package in the monorepo, follow this checklist:

#### 1. Choose Package Type and Name

Follow the naming conventions:
- **Namespace packages**: `apidom-ns-{spec}-{version}` (e.g., `apidom-ns-openapi-3-2`)
- **Parser adapters**: `apidom-parser-adapter-{spec}-{format}-{version}` (e.g., `apidom-parser-adapter-openapi-json-3-2`)
- **Core packages**: `apidom-{function}` (e.g., `apidom-core`, `apidom-ast`)

#### 2. Copy Template from Similar Package

Find the most similar existing package and copy its structure:
```bash
# Example: Creating a new OpenAPI 3.2 JSON parser adapter
cp -r packages/apidom-parser-adapter-openapi-json-3-1 packages/apidom-parser-adapter-openapi-json-3-2
cd packages/apidom-parser-adapter-openapi-json-3-2
```

#### 3. Update package.json

Modify the following fields:
- `name`: Update to new package name (e.g., `@swagger-api/apidom-parser-adapter-openapi-json-3-2`)
- `description`: Update to reflect the new package
- `unpkg`: Update the bundle filename
- `main`, `exports.require`: Update `.cjs` file path
- `exports.import`: Update `.mjs` file path
- `exports.types`, `types`: Update `.d.ts` file path
- `dependencies`: Update namespace versions if needed (e.g., `@swagger-api/apidom-ns-openapi-3-2`)
- `files`: Update type declaration filename

#### 4. Create Required Configuration Files

**CRITICAL**: Create these files or tests will not work:

##### .mocharc.json
```json
{
  "extensions": ["ts"],
  "loader": "ts-node/esm",
  "recursive": true,
  "spec": "test/**/*.ts",
  "file": ["test/mocha-bootstrap.ts"],
  "ignore": ["test/perf/**/*.ts"]
}
```

##### .gitignore
```gitignore
# Build artifacts
src/**/*.mjs
src/**/*.cjs
dist/
types/

# Dependencies
node_modules/

# IDE
.idea/
.vscode/

# OS
.DS_Store
```

##### test/mocha-bootstrap.ts
```typescript
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'chai';
import { jestSnapshotPlugin } from 'mocha-chai-jest-snapshot';
import chai from 'chai';

config.truncateThreshold = Infinity;
chai.use(jestSnapshotPlugin());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

before(function () {
  jestSnapshotPlugin.setTestName(path.basename(this.currentTest?.file || ''));
  jestSnapshotPlugin.setFilename(path.join(__dirname, '__snapshots__', 'file.ts.snap'));
});
```

#### 5. Update Test Files

##### For Parser Adapter Packages
Update `test/media-types.ts` to test through the parser integration:

```typescript
import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as openApiJsonAdapter from '../src/adapter.ts';

describe('given adapter is used in parser', function () {
  const parser = new ApiDOMParser().use(openApiJsonAdapter);

  context('given OpenAPI 3.2.0 definition in JSON format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{"openapi": "3.2.0"}');

      assert.strictEqual(mediaType, 'application/vnd.oai.openapi+json;version=3.2.0');
    });
  });
});
```

**Do NOT** test the media types object directly with `assert.isArray()` - always test through parser integration.

##### For YAML Parser Adapters
Use YAML format in test:
```typescript
const mediaType = await parser.findMediaType('openapi: "3.2.0"');
assert.strictEqual(mediaType, 'application/vnd.oai.openapi+yaml;version=3.2.0');
```

#### 6. Update Source Files

Update source files to reference the correct version and namespace:
- Update version strings in detection patterns
- Update imports to reference correct namespace package
- Update media type version identifiers
- Update comments and documentation

#### 7. Create Documentation Files

##### README.md
```markdown
# @swagger-api/apidom-parser-adapter-openapi-json-3-2

Parser adapter for parsing JSON documents into OpenAPI 3.2.x namespace.

## Installation

```bash
npm install @swagger-api/apidom-parser-adapter-openapi-json-3-2
```

## Usage

```javascript
import * as adapter from '@swagger-api/apidom-parser-adapter-openapi-json-3-2';

const parseResult = await adapter.parse('{"openapi": "3.2.0"}');
```

## License

Apache-2.0
```

##### CHANGELOG.md
```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - YYYY-MM-DD

### Added
- Initial release
- Support for OpenAPI 3.2.x JSON parsing
```

#### 8. Build and Test

```bash
# From package directory
npm run build
npm run test
npm run lint
npm run typescript:check-types
```

**IMPORTANT**: Fix any failing tests before committing. Common issues:
- Snapshot mismatches (run with `UPDATE_SNAPSHOT=1` to update)
- Wrong element types in predicates
- Incorrect media type versions
- Missing dependencies

#### 9. Register in Monorepo

If creating a parser adapter, register it in `apidom-parser`:
1. Add dependency to `packages/apidom-parser/package.json`
2. Import and register in `packages/apidom-parser/src/index.ts`

If creating a namespace, register it in `apidom-reference`:
1. Add dependency to `packages/apidom-reference/package.json`
2. Import and register in refractor registry

#### 10. Common Pitfalls to Avoid

- **Missing `.mocharc.json`**: Tests will not run without this file
- **Wrong test pattern**: Don't test media types object directly; test through parser integration
- **Incorrect version references**: Update all version strings (package.json, source, tests)
- **Snapshot mismatches**: When copying from another version, snapshots will need updating
- **Missing test bootstrap**: Ensure `test/mocha-bootstrap.ts` exists
- **Wrong namespace imports**: Update all imports to reference the correct version namespace
- **Incomplete package.json updates**: Update all file paths and names consistently

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
