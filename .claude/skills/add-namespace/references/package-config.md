# Package Configuration and Layout

Templates for the package skeleton of `apidom-ns-{spec}-{version}`: directory layout, `package.json`,
and TypeScript configs. Read this during Phase 2 (directory structure) and Phase 3 steps 3.1, 3.10
and 3.11. Replace every `{spec}`, `{version}` and `{Specification Name}` placeholder.

## Package Directory Layout

Create the following directory structure. It is the layout of a brand-new spec (`apidom-ns-arazzo-1`).
When extending a parent, leave out `visitors/generics/`, `FallbackVisitor.ts`,
`SpecificationExtensionVisitor.ts`, `SpecificationVisitor.ts`, `Visitor.ts` and `refractor/predicates.ts`;
they are imported from the parent package (see Phase 4 in `SKILL.md`).

```
packages/apidom-ns-{spec}-{version}/
├── src/
│   ├── elements/
│   │   ├── nces/              # Named Collection Elements
│   │   └── {ElementName}.ts
│   ├── refractor/
│   │   ├── visitors/
│   │   │   ├── generics/
│   │   │   │   ├── FixedFieldsVisitor.ts
│   │   │   │   ├── PatternedFieldsVisitor.ts
│   │   │   │   └── MapVisitor.ts
│   │   │   ├── {spec}-{version}/
│   │   │   │   ├── {element-name}/
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── FallbackVisitor.ts
│   │   │   ├── SpecificationExtensionVisitor.ts
│   │   │   ├── SpecificationVisitor.ts
│   │   │   └── Visitor.ts
│   │   ├── plugins/
│   │   ├── index.ts
│   │   ├── registration.ts
│   │   ├── specification.ts
│   │   ├── predicates.ts
│   │   └── toolbox.ts
│   ├── traversal/
│   │   └── visitor.ts
│   ├── index.ts
│   ├── namespace.ts
│   ├── predicates.ts
│   └── media-types.ts
├── test/
│   ├── refractor/
│   │   ├── elements/
│   │   │   └── {ElementName}/
│   │   │       ├── index.ts
│   │   │       └── __snapshots__/
│   │   └── plugins/
│   ├── fixtures/
│   ├── mocha-bootstrap.ts
│   ├── predicates.ts
│   └── tsconfig.json
├── config/
│   ├── api-extractor/
│   │   └── api-extractor.json
├── vite.config.ts
├── .eslintignore, .gitignore, .mocharc.json, .npmrc   # copy from the sibling package
├── package.json
├── tsconfig.json
├── tsconfig.declaration.json
├── CHANGELOG.md
└── README.md
```

## 3.1 package.json

```json
{
  "name": "@swagger-api/apidom-ns-{spec}-{version}",
  "version": "{monorepoVersion}",
  "description": "{Specification Name} {Version} namespace for ApiDOM.",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org",
    "provenance": true
  },
  "type": "module",
  "sideEffects": [
    "./src/refractor/registration.mjs",
    "./src/refractor/registration.cjs"
  ],
  "unpkg": "./dist/apidom-ns-{spec}-{version}.browser.min.js",
  "main": "./src/index.cjs",
  "exports": {
    "types": "./types/apidom-ns-{spec}-{version}.d.ts",
    "import": "./src/index.mjs",
    "require": "./src/index.cjs"
  },
  "types": "./types/apidom-ns-{spec}-{version}.d.ts",
  "scripts": {
    "build": "npm run clean && run-p --max-parallel ${CPU_CORES:-6} typescript:declaration build:es build:cjs build:umd:browser",
    "build:es": "cross-env BABEL_ENV=es babel src --out-dir src --extensions '.ts' --out-file-extension '.mjs' --root-mode 'upward'",
    "build:cjs": "cross-env BABEL_ENV=cjs babel src --out-dir src --extensions '.ts' --out-file-extension '.cjs' --root-mode 'upward'",
    "build:umd:browser": "vite build",
    "lint": "eslint ./",
    "lint:fix": "eslint ./ --fix",
    "clean": "rimraf --glob 'src/**/*.mjs' 'test/**/*.mjs' ./dist ./types",
    "test": "NODE_ENV=test ts-mocha --exit",
    "test:update-snapshots": "cross-env UPDATE_SNAPSHOT=1 BABEL_ENV=cjs mocha",
    "typescript:check-types": "tsc --noEmit && tsc -p ./test/tsconfig.json --noEmit",
    "typescript:declaration": "tsc -p tsconfig.declaration.json && api-extractor run -l -c ./config/api-extractor/api-extractor.json 2>&1 | shx grep -v 'Visitor_base'",
    "prepack": "copyfiles -u 3 ../../LICENSES/* LICENSES && copyfiles -u 2 ../../NOTICE .",
    "postpack": "rimraf NOTICE LICENSES"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/swagger-api/apidom.git"
  },
  "author": "SmartBear",
  "license": "Apache-2.0",
  "dependencies": {
    "@babel/runtime-corejs3": "^7.26.10",
    "@swagger-api/apidom-core": "^{monorepoVersion}",
    "@types/ramda": "~0.30.0",
    "ramda": "~0.30.0",
    "ramda-adjunct": "^5.0.0",
    "ts-mixer": "^6.0.3"
  },
  "files": [
    "src/**/*.mjs",
    "src/**/*.cjs",
    "dist/",
    "types/apidom-ns-{spec}-{version}.d.ts",
    "LICENSES",
    "NOTICE",
    "README.md",
    "CHANGELOG.md"
  ]
}
```

`{monorepoVersion}` is the current `version` in the root `lerna.json`; all packages are released
together and depend on each other at that version. Take it, and the third-party dependency ranges,
from `lerna.json` and a sibling namespace's `package.json` rather than from this template, which goes
stale with every release. If extending an existing namespace, add the parent namespace (at the same
`^{monorepoVersion}`) to `dependencies`, plus any other namespaces the parent's `package.json` lists
that your code imports directly.

## 3.10 tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "include": [
    "src/**/*"
  ]
}
```

## 3.11 tsconfig.declaration.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "types",
    "noEmit": false,
    "emitDeclarationOnly": true
  }
}
```

The root `tsconfig.json` sets `noEmit: true`, so `noEmit: false` is what lets declarations be written.
Don't add `composite`, `declarationMap` or `outDir`; no namespace package uses them, and
`api-extractor` expects the declarations in `types/`.

## 3.13 README.md and CHANGELOG.md

**README**: copy the sibling namespace's README (`apidom-ns-arazzo-1/README.md` for a new spec, the parent's for a new version) and keep its section structure and order:

1. `# @swagger-api/apidom-ns-{spec}-{version}` and the one-paragraph description
2. `## Installation`
3. `## {Spec} {version} namespace`
4. `## Predicates`
5. `## Traversal`
6. `## Refractors`, with `### Refractor plugins` and `#### Replace Empty Element plugin`
7. `## Implementation progress` (one row per spec object)

Adapt names, versions and examples; don't add, drop or reorder sections. Reviewers compare the two files side by side (PR #5182).

**CHANGELOG**: header only. Release automation (lerna, Conventional Commits) writes the entries; hand-written "Initial release" entries or a CHANGELOG copied from the parent package (OAS 3.2 copied 3.1's history) both get flagged.

```markdown
# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.
```
