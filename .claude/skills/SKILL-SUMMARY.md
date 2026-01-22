# Add Namespace Skill - Summary

## What Was Created

A comprehensive Claude Code skill for creating new namespace packages in the ApiDOM monorepo has been created based on:

1. **PDF Instructions**: "SHUB-Swagger OSS JavaScript New Spec Addition-220126-103935.pdf"
2. **Existing Namespace Packages**: Analysis of all 12 `apidom-ns-*` packages
3. **Established Patterns**: Architecture and conventions from the ApiDOM codebase

## Skill Location

```
.claude/skills/
├── add-namespace.md     # Main skill (742 lines, 22KB)
└── README.md            # Skills documentation
```

## How to Use the Skill

### 1. Invoke the Skill

In Claude Code, simply run:
```
/add-namespace
```

### 2. Provide Required Information

The skill will guide you through providing:

- **Specification name** (e.g., 'openapi', 'asyncapi', 'arazzo')
- **Specification version** (e.g., '3-1', '2', '4-0')
- **Package description**
- **Parent namespace** (optional, if basing on existing namespace)
- **Element definitions**:
  - Element names and types
  - Properties for each element
  - CSS classes (if needed)
  - Extension support requirements

### 3. Automated Generation

The skill will automatically:

1. **Create package structure** with all required directories
2. **Generate core files**:
   - `package.json` with correct scripts and dependencies
   - `tsconfig.json` and `tsconfig.declaration.json`
   - Element classes with proper TypeScript types
   - Namespace registration
   - Predicates for type checking
   - Visitor implementations
   - Specification tree
   - Media type definitions
3. **Copy supporting files** from reference packages
4. **Generate test structure** with examples
5. **Create configuration files** for builds and API extraction

### 4. Build and Test

After generation, the skill guides you through:
```bash
npm run build              # Build the new package
npm run test              # Run tests
npm run typescript:check-types  # Type checking
npm run lint              # Linting
```

## What the Skill Covers

### Package Components

#### Core Elements (src/)
- **elements/**: Element class definitions
  - Base element classes (ObjectElement, ArrayElement, etc.)
  - Property getters/setters with TypeScript types
  - CSS class support for specialized elements
  - Named Collection Elements (NCEs) in `nces/` subdirectory

- **namespace.ts**: Element registration with base namespace
- **predicates.ts**: Type-safe element checking functions
- **media-types.ts**: Media type definitions for the spec

#### Refractor Layer (src/refractor/)
- **specification.ts**: Complete visitor mapping tree
- **registration.ts**: Attaches refract functions to element classes
- **visitors/**: Visitor implementations
  - Generic visitors (FixedFieldsVisitor, PatternedFieldsVisitor, MapVisitor)
  - Spec-specific visitors for each element
  - Fallback and extension visitors
- **plugins/**: Post-refraction transformation plugins
- **toolbox.ts**: Utilities for visitors and plugins

#### Tests (test/)
- **refractor/elements/**: Snapshot tests for each element
- **predicates.ts**: Predicate function tests
- **mocha-bootstrap.ts**: Test environment setup
- **fixtures/**: Test data files

#### Configuration
- **package.json**: Scripts, dependencies, exports
- **tsconfig.json**: TypeScript compilation settings
- **config/api-extractor/**: API documentation extraction
- **config/webpack/**: Browser bundle configuration

### Architecture Patterns

The skill implements ApiDOM's three-stage pipeline:

1. **Parse Stage**: Generic ApiDOM creation (handled by parser adapters)
2. **Refract Stage**: Transform generic → semantic ApiDOM
   - Visitor pattern for element-specific logic
   - Specification tree defines transformation rules
   - Plugin system for post-processing
3. **Generate Stage**: Serialize back to JSON/YAML

### Key Design Decisions Captured

1. **Element Naming**:
   - Classes: PascalCase (`WorkflowElement`)
   - Type names: camelCase (`'workflow'`)
   - Files: Match classes (`Workflow.ts`)

2. **Visitor Pattern**:
   - Uses `ts-mixer` for multiple inheritance
   - Spec-path for traversal
   - Support for specification extensions

3. **Predicate Creation**:
   - `createPredicate` factory from apidom-core
   - Both class-based and structural checks
   - Tree-shaking optimization

4. **Build Artifacts**:
   - ES6 modules (.mjs)
   - CommonJS (.cjs)
   - UMD bundles (dist/)
   - TypeScript declarations (types/)

## Example Packages Referenced

The skill references these packages as examples:

- **Simple**: `apidom-ns-arazzo-1` (26 elements, workflow-focused)
- **Medium**: `apidom-ns-openapi-3-1` (34 elements, JSON Schema integration)
- **Complex**: `apidom-ns-asyncapi-3` (131 elements, protocol bindings)

## Available Skills

### 1. `/add-namespace` - Add Namespace Package

Creates a complete namespace package for a new API specification version.

**When to use**: Adding support for a new API specification or major version.

**What it creates**:
- Complete namespace package with all elements, visitors, and predicates
- Test structure with examples
- Build configurations

### 2. `/add-parser-adapter` - Add Parser Adapter Packages

Creates parser adapter packages for existing namespaces and integrates them with apidom-reference.

**When to use**: After creating a namespace or when parser adapters are missing.

**What it creates**:
- JSON and YAML parser adapter packages
- Parser classes in apidom-reference
- Integration with saturated configuration
- Complete test suites

### 3. `/update-ls-config` - Update Language Service Config

Updates apidom-ls configuration for a namespace package by analyzing structure and generating IDE support files.

**When to use**: After creating/updating a namespace package to add IDE support.

**What it creates**:
- Autocomplete configuration (completion.ts)
- Hover documentation (documentation.ts)
- Validation rules (lint/ directory)
- Integration with apidom-ls configuration

## Next Steps After Using the Skills

### After creating a namespace package (`/add-namespace`):

1. **Create parser adapters** using `/add-parser-adapter`:
   - Generates both JSON and YAML adapters
   - Integrates with apidom-reference automatically

2. **Add IDE support** using `/update-ls-config`:
   - Generates autocomplete configuration
   - Generates hover documentation
   - Generates validation rules
   - Integrates with apidom-ls

3. **Add advanced features** (manual):
   - Dereference strategies in apidom-reference
   - Resolution strategies
   - Bundle strategies (if applicable)

4. **Update swagger-editor** (if applicable):
   - Import namespace
   - Add preview plugin

### After creating parser adapters (`/add-parser-adapter`):

1. **Test integration**:
   - Use parsers with apidom-reference
   - Test detection and parsing
   - Verify media type handling

2. **Add advanced parsing features** (optional):
   - Custom resolve strategies
   - Dereference strategies
   - Bundle strategies

## Troubleshooting

The skill includes troubleshooting sections for:

- **Build Errors**: Import extensions, exports, TypeScript config
- **Test Failures**: Snapshot updates, test data structure
- **Type Errors**: Visitor interfaces, content types, options typing

## Benefits of Using This Skill

1. **Consistency**: Follows all established ApiDOM patterns
2. **Completeness**: Generates all required files and configurations
3. **Type Safety**: Proper TypeScript types throughout
4. **Testing**: Test structure and examples included
5. **Documentation**: Inline comments and pattern explanations
6. **Time Saving**: Automates ~50+ file creation and configuration
7. **Quality**: Based on analysis of existing, production-tested packages

## Skill Maintenance

The skill is designed to be maintainable:

- **Template-based**: Easy to update templates as patterns evolve
- **Well-documented**: Each section explains the "why" behind patterns
- **Example-driven**: References real packages for clarification
- **Comprehensive**: Covers edge cases and special scenarios

## Additional Resources

- **CLAUDE.md**: Project-specific Claude Code instructions
- **PDF Documentation**: Original specification addition guidelines
- **Reference Packages**:
  - `/packages/apidom-ns-arazzo-1/`
  - `/packages/apidom-ns-openapi-3-1/`
  - `/packages/apidom-ns-asyncapi-3/`

---

**Created**: 2026-01-22
**Based on**: Analysis of 12 existing namespace packages and PDF instructions
**Lines of Code**: 742 lines of comprehensive instructions and templates
