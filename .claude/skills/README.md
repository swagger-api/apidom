# Claude Code Skills for ApiDOM

This directory contains Claude Code skills for common development tasks in the ApiDOM monorepo.

## Recent Updates

**2026-10-14**:

- New `/add-spec-version` orchestrator chains the four skills below with verification gates and bundles helper scripts (redefined-field check, URL/anchor check, unwired-file audit).
- Every skill now follows progressive disclosure: a short `SKILL.md` with the workflow, and detailed templates in `references/`, loaded only when a phase needs them.
- Every skill has `evals/evals.json` with an eval that replays a real review (PR #5110 OAS 3.2, PR #5104 AsyncAPI 3) or planted defects. See "Evaluating Skills" below.

**2026-01-28**: Skills enhanced based on the OpenAPI 3.2.0 implementation (visitor patterns, reference integration, language service scale, testing patterns).

## Skill Layout

```
{skill}/
├── SKILL.md        # workflow, critical rules, checklist (loaded on invocation)
├── references/     # templates and detailed guidance (read when a phase says so)
├── scripts/        # deterministic helpers (add-spec-version only)
└── evals/          # eval prompts, assertions and fixtures
```

## Available Skills

### `/add-spec-version` - Add a Specification Version End to End

Orchestrates adding a new spec or spec version across the monorepo. Use this as the entry point; it calls the skills below.

1. Builds a field map (new / changed / removed / inherited fields per object) from the official spec and the parent namespace, and asks for confirmation
2. Runs `/add-namespace`, `/add-parser-adapter`, `/update-ls-config` and `/review-ls-changes` in order
3. Gates every stage: build, types, lint, tests, field-map coverage, plus the bundled scripts:
   - `scripts/check-redefined-fields.mjs`: getters that duplicate a parent element
   - `scripts/verify-urls.mjs`: URLs and `#anchors` that don't resolve
   - `scripts/find-unwired.sh`: files that mention the parent version but not the new one
4. Covers wiring the other skills don't (LS parser factory and detection, JSON Schema validation, playground, root scripts)

Progress lives in an uncommitted `ADD-{SPEC}-{VERSION}.md` tracking doc, so work can resume across sessions.

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

### `/review-ls-changes` - Review Language Service Changes

Reviews apidom-ls changes on a branch against the official specification (lint rules, documentation values, completion, URL anchors) and produces a findings report with spec citations.

## Evaluating Skills

Each `evals/evals.json` follows the skill-creator schema plus a `fixture` field that names the repository state the eval runs against:

| Skill | Eval | Fixture |
|-------|------|---------|
| add-namespace | OAS 3.2 element field set (PR #5110 review findings) | `git worktree add <dir> ef97b5c32^` |
| add-parser-adapter | OAS 3.2 adapters + apidom-reference wiring | `ef97b5c32^` |
| update-ls-config | AsyncAPI 3 Operation Reply lint rules (PR #5104 review findings) | `c201bb1f8^` |
| review-ls-changes | 8 planted defects in OAS 3.2 LS config | branch from `main` + `git am evals/planted-defects.patch` |
| add-spec-version | OAS 3.2 field map and integration plan | `ef97b5c32^` |

Run them with the `skill-creator` skill: one subagent with the skill and one baseline (previous skill version, or no skill) per eval, working read-only in the fixture worktree and writing to an outputs directory outside the repo. Most assertions are checkable by script (getter names, regexes, file names, message patterns).

Caveat: the root `CLAUDE.md` and the skills themselves mention several OAS 3.2 findings, so these evals measure regressions and relative improvements more than absolute ability on an unseen spec.

## Using Skills

Skills are invoked using slash commands in Claude Code:

```bash
/add-namespace
```

Claude will then interactively guide you through the process, asking for required information and generating all necessary files.

## Creating New Skills

To create a new skill:

1. Create a directory in `.claude/skills/` with your skill name (e.g., `my-skill/`)
2. Create a `SKILL.md` file inside the directory
3. Add YAML frontmatter at the top with metadata:

```markdown
---
name: my-skill
description: Brief description of what the skill does
disable-model-invocation: false
user-invocable: true
---

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

4. Test the skill by invoking it: `/my-skill`

### YAML Frontmatter Fields

- `name`: Command name for the skill (required)
- `description`: What the skill does - Claude uses this to decide when to apply it (recommended)
- `disable-model-invocation`: Set to `true` to prevent Claude auto-triggering (default: `false`)
- `user-invocable`: Set to `false` to hide from `/` menu (default: `true`)
- `allowed-tools`: Tools Claude can use without asking permission (optional)
- `model`: Specific model to use when skill is active (optional)
- `context`: Set to `fork` to run in isolated subagent context (optional)
- `agent`: Subagent type like `Explore`, `Plan`, `general-purpose` (optional)

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
