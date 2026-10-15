# Package Configuration and Layout

Templates for the package skeleton of `apidom-ns-{spec}-{version}`: directory layout, `package.json`,
and TypeScript configs. Read this during Phase 2 (directory structure) and Phase 3 steps 3.1, 3.10
and 3.11. Replace every `{spec}`, `{version}` and `{Specification Name}` placeholder.

## Package Directory Layout

Create the following directory structure:

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
│   └── webpack/
│       └── browser.config.js
├── package.json
├── tsconfig.json
├── tsconfig.declaration.json
└── README.md
```

## 3.1 package.json

```json
{
  "name": "@swagger-api/apidom-ns-{spec}-{version}",
  "version": "1.0.0",
  "description": "{Specification Name} {Version} namespace for ApiDOM.",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org"
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
    "build": "npm run clean && run-p --max-parallel ${CPU_CORES:-2} typescript:declaration build:es build:cjs build:umd:browser",
    "build:es": "cross-env BABEL_ENV=es babel src --out-dir src --extensions '.ts' --out-file-extension '.mjs' --root-mode 'upward'",
    "build:cjs": "cross-env BABEL_ENV=cjs babel src --out-dir src --extensions '.ts' --out-file-extension '.cjs' --root-mode 'upward'",
    "build:umd:browser": "cross-env BABEL_ENV=browser webpack --config config/webpack/browser.config.js --progress",
    "lint": "eslint ./",
    "lint:fix": "eslint ./ --fix",
    "clean": "rimraf --glob 'src/**/*.mjs' 'test/**/*.mjs' ./dist ./types",
    "test": "NODE_ENV=test ts-mocha --exit",
    "test:update-snapshots": "cross-env UPDATE_SNAPSHOT=1 BABEL_ENV=cjs mocha",
    "typescript:check-types": "tsc --noEmit && tsc -p ./test/tsconfig.json --noEmit",
    "typescript:declaration": "tsc -p tsconfig.declaration.json && api-extractor run -l -c ./config/api-extractor/api-extractor.json",
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
    "@swagger-api/apidom-core": "^1.2.2",
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

**Note**: Add parent namespace to dependencies if extending an existing namespace.

## 3.10 tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "include": ["src/**/*"],
  "compilerOptions": {
    "composite": true
  }
}
```

## 3.11 tsconfig.declaration.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "outDir": "./types"
  }
}
```
