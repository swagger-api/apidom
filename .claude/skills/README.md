# Claude Code Skills for ApiDOM

This directory contains Claude Code skills for common development tasks in the ApiDOM monorepo.

## Available Skills

### `/add-namespace` - Add Namespace Package

Creates a complete namespace package for a new API specification version.

**Usage:**
```
/add-namespace
```

Claude will guide you through:
1. Gathering specification information
2. Creating the package structure
3. Generating all required files
4. Setting up tests
5. Building and validating the package

**When to use:**
- Adding support for a new API specification (e.g., RAML, API Blueprint)
- Adding a new major version of an existing spec (e.g., OpenAPI 4.0)

**What it creates:**
- Complete `packages/apidom-ns-{spec}-{version}/` directory
- All element classes with proper types
- Visitor implementations
- Predicates for type checking
- Test structure with examples
- Configuration files (package.json, tsconfig, webpack)

**Prerequisites:**
- Thoroughly understand the specification document
- Identify if you can base on an existing namespace
- List all element types and their properties

### `/add-parser-adapter` - Add Parser Adapter Packages

Creates parser adapter packages for existing namespaces and integrates them with apidom-reference.

**Usage:**
```
/add-parser-adapter
```

Claude will:
1. Discover namespaces without parser adapters
2. Present options for which namespace to add parsers for
3. Generate both JSON and YAML parser adapter packages
4. Create integration code in apidom-reference
5. Build and test the new parsers

**When to use:**
- After creating a new namespace with `/add-namespace`
- When an existing namespace lacks parser adapters
- To enable parsing support for a namespace in apidom-reference

**What it creates:**
- `packages/apidom-parser-adapter-{spec}-json-{version}/` package
- `packages/apidom-parser-adapter-{spec}-yaml-{version}/` package
- Parser classes in `packages/apidom-reference/src/parse/parsers/`
- Integration with apidom-reference saturated configuration
- Complete tests for all parsers

**Prerequisites:**
- Target namespace package must exist
- Namespace package must be built
- Know the specification version field name (e.g., "openapi", "asyncapi")

### `/update-ls-config` - Update Language Service Config

Updates apidom-ls configuration for a namespace package by generating completion, documentation, and lint configurations.

**Usage:**
```
/update-ls-config
```

Claude will:
1. Analyze the selected namespace package structure
2. Extract element definitions and properties
3. Generate autocomplete configuration
4. Generate hover documentation configuration
5. Generate validation/lint rules
6. Integrate with apidom-ls configuration

**When to use:**
- After creating a new namespace package
- After updating an existing namespace with new elements
- When IDE support (autocomplete, hover, validation) is needed for a specification version

**What it creates:**
- `packages/apidom-ls/src/config/{spec}/{version}/` directory structure
- `completion.ts` - Autocomplete suggestions for all properties
- `documentation.ts` - Hover documentation for complex properties
- `lint/` directory - Validation rules for type checking and required fields
- `meta.ts` - Aggregates all configuration
- Updates to target-specs.ts and main config files

**Prerequisites:**
- Namespace package must exist and be built
- Parser adapter packages should exist (recommended)
- Access to specification documentation for generating docs

## Using Skills

Skills are invoked using slash commands in Claude Code:

```bash
/add-namespace
```

Claude will then interactively guide you through the process, asking for required information and generating all necessary files.

## Creating New Skills

To create a new skill:

1. Create a markdown file in `.claude/skills/` directory
2. Use the following structure:

```markdown
# Skill Name

**Skill Name:** `skill-command`
**Description:** Brief description

## Overview
Detailed description of what the skill does

## When to Use
List scenarios when this skill should be used

## Prerequisites
List any prerequisites

## Skill Instructions
Step-by-step instructions for Claude to follow

### Phase 1: Title
Instructions...

### Phase 2: Title
Instructions...

## Important Patterns
Key patterns and conventions to follow

## Troubleshooting
Common issues and solutions

## References
Related documentation
```

3. Test the skill by invoking it: `/skill-command`

## Skill Development Guidelines

When creating skills for ApiDOM:

1. **Follow established patterns**: Study existing packages to understand conventions
2. **Be comprehensive**: Include all necessary files and configurations
3. **Provide templates**: Include code templates with placeholders
4. **Add validation**: Include steps to verify the generated code works
5. **Document patterns**: Explain naming conventions and architectural decisions
6. **Reference examples**: Point to existing packages as references

## Related Documentation

- **CLAUDE.md**: Project-specific instructions for Claude Code
- **Namespace Packages**: `packages/apidom-ns-*/` directories

## Contributing

To improve existing skills or add new ones:

1. Test the skill thoroughly on real use cases
2. Update documentation to reflect any changes
3. Add troubleshooting sections for common issues
4. Include references to related code examples
