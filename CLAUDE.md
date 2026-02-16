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

### Git Commit Conventions

**⚠️ CRITICAL**: All commits MUST follow the Conventional Commits specification (commitlint).

**Commit Message Format:**
```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Allowed Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring (neither fixes a bug nor adds a feature)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Changes to build system or dependencies
- `ci`: Changes to CI configuration
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

**Scope Examples:**
- Package names: `core`, `ls`, `parser`, `reference`
- Spec namespaces: `openapi`, `asyncapi`, `arazzo`
- Feature areas: `validation`, `refractor`, `visitor`

**Subject Guidelines:**
- Use imperative mood: "add feature" not "added feature"
- No capitalization of first letter
- No period at the end
- Keep header (type + scope + subject) under 75 characters

**Commit Body Restrictions:**
- **MUST** have a blank line between subject and body
- Each body line should wrap at 100 characters maximum
- Body is optional but recommended for complex changes
- Explain the "why" and "what", not the "how"
- Use present tense: "change" not "changed"
- Reference issues/PRs when applicable: "Fixes #123", "Related to #456"

**Examples:**
```bash
# Simple commit (no body needed)
feat(ls): add validation rules for AsyncAPI 3.0 Operation object

# Complex commit with body
fix(core): correct element traversal in nested structures

The previous traversal algorithm incorrectly skipped intermediate nodes
when dealing with deeply nested ApiDOM elements. This fix ensures all
nodes are visited in the correct order.

Fixes #1234

# With Co-Authored-By footer
docs(readme): update installation instructions

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**When creating commits through git commands, ALWAYS follow this format. Commitlint hooks will reject non-compliant commit messages.**

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

## Package-Specific Documentation

Some packages have additional documentation in their own CLAUDE.md files:

- **apidom-ls** (`packages/apidom-ls/CLAUDE.md`): Comprehensive guidelines for implementing lint validation rules, with lessons learned from PR reviews and real-world examples.
