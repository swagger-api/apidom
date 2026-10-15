# Parser Adapter Package Templates (Phases 4 and 5)

## Contents

- [JSON Parser Adapter (Phase 4)](#json-parser-adapter-phase-4)
  - 4.1 Create Directory Structure
  - 4.2 Generate package.json
  - 4.3 Generate src/adapter.ts (plus template variables)
  - 4.4 Generate src/media-types.ts
  - 4.5 Generate TypeScript Configurations (`tsconfig.json`, `tsconfig.declaration.json`)
  - 4.6 Copy Configuration Files (api-extractor, `vite.config.ts`, mocha config/bootstrap, ignore files, test eslint/tsconfig)
- [YAML Parser Adapter (Phase 5)](#yaml-parser-adapter-phase-5)
  - 5.1 Same Directory Structure as JSON
  - 5.2 Generate package.json (differences from JSON)
  - 5.3 Generate src/adapter.ts
  - 5.4 Generate src/media-types.ts
- [Detection and Media Type Quick Reference](#detection-and-media-type-quick-reference)
  - Version Detection Patterns (JSON/YAML regexps, version patterns)
  - Media Types

Test templates for both adapters live in `adapter-test-templates.md`.

## JSON Parser Adapter (Phase 4)

Create the JSON parser adapter package:

### 4.1 Create Directory Structure

```
packages/apidom-parser-adapter-{spec}-json-{version}/
├── src/
│   ├── adapter.ts
│   └── media-types.ts
├── test/
│   ├── adapter.ts
│   ├── media-types.ts
│   ├── fixtures/
│   │   └── sample-spec.json
│   ├── mocha-bootstrap.ts
│   ├── .eslintrc
│   └── tsconfig.json
├── config/
│   └── api-extractor/
│       └── api-extractor.json
├── .eslintignore
├── .gitignore
├── .mocharc.json
├── vite.config.ts
├── package.json
├── tsconfig.json
├── tsconfig.declaration.json
└── README.md
```

Browser (UMD) bundles are built with Vite via `vite.config.ts`; there is no `config/webpack/` directory.

### 4.2 Generate package.json

```json
{
  "name": "@swagger-api/apidom-parser-adapter-{spec}-json-{version}",
  "version": "{currentVersion}",
  "description": "Parser adapter for parsing JSON documents into {Spec Name} {Version} namespace.",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org",
    "provenance": true
  },
  "type": "module",
  "sideEffects": false,
  "unpkg": "./dist/apidom-parser-adapter-{spec}-json-{version}.browser.min.js",
  "main": "./src/adapter.cjs",
  "exports": {
    "types": "./types/apidom-parser-adapter-{spec}-json-{version}.d.ts",
    "import": "./src/adapter.mjs",
    "require": "./src/adapter.cjs"
  },
  "types": "./types/apidom-parser-adapter-{spec}-json-{version}.d.ts",
  "scripts": {
    "build": "npm run clean && run-p --max-parallel ${CPU_CORES:-6} typescript:declaration build:es build:cjs build:umd:browser",
    "build:es": "cross-env BABEL_ENV=es babel src --out-dir src --extensions '.ts' --out-file-extension '.mjs' --root-mode 'upward'",
    "build:cjs": "cross-env BABEL_ENV=cjs babel src --out-dir src --extensions '.ts' --out-file-extension '.cjs' --root-mode 'upward'",
    "build:umd:browser": "vite build",
    "lint": "eslint ./",
    "lint:fix": "eslint ./ --fix",
    "clean": "rimraf --glob 'src/**/*.mjs' 'src/**/*.cjs' ./dist ./types",
    "typescript:check-types": "tsc --noEmit && tsc -p ./test/tsconfig.json --noEmit",
    "typescript:declaration": "tsc -p tsconfig.declaration.json && api-extractor run -l -c ./config/api-extractor/api-extractor.json",
    "test": "NODE_ENV=test ts-mocha --exit",
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
    "@swagger-api/apidom-core": "^{currentVersion}",
    "@swagger-api/apidom-ns-{spec}-{version}": "^{currentVersion}",
    "@swagger-api/apidom-parser-adapter-json": "^{currentVersion}",
    "@types/ramda": "~0.30.0",
    "ramda": "~0.30.0",
    "ramda-adjunct": "^5.0.0"
  },
  "files": [
    "src/**/*.mjs",
    "src/**/*.cjs",
    "dist/",
    "types/apidom-parser-adapter-{spec}-json-{version}.d.ts",
    "LICENSES",
    "NOTICE",
    "README.md",
    "CHANGELOG.md"
  ]
}
```

`{currentVersion}`: never hard-code a version. The monorepo uses Lerna fixed versioning, so take the current value of `"version"` from a sibling package (e.g. `packages/apidom-parser-adapter-openapi-json-3-2/package.json` or `lerna.json`) and use it both for `"version"` and for every `@swagger-api/apidom-*` dependency range (`^{currentVersion}`). Copy third-party ranges (`@babel/runtime-corejs3`, `ramda`, ...) from that sibling as well instead of from this template.

### 4.3 Generate src/adapter.ts

```typescript
import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import { parse as parseJSON, detect as detectJSON } from '@swagger-api/apidom-parser-adapter-json';
import {specName}Namespace, { {RootElement} } from '@swagger-api/apidom-ns-{spec}-{version}';

export { default as mediaTypes } from './media-types.ts';

/**
 * Detection regex for {Spec Name} {Version}.
 * Matches: "{specField}": "{majorVersion}.{minorVersion}.{patchVersion}"
 *
 * @public
 */
export const detectionRegExp =
  /"{specField}"\s*:\s*"(?<version_json>{versionPattern})"/;

/**
 * Detects if the source string is a {Spec Name} {Version} JSON document.
 *
 * @public
 */
export const detect = async (source: string): Promise<boolean> =>
  detectionRegExp.test(source) && (await detectJSON(source));

/**
 * Parses a {Spec Name} {Version} JSON document into ApiDOM.
 *
 * @public
 */
export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const refractorOpts: Record<string, unknown> = propOr({}, 'refractorOpts', options);
  const parserOpts = omit(['refractorOpts'], options);
  const parseResultElement = await parseJSON(source, parserOpts);
  const { result } = parseResultElement;

  if (isNotUndefined(result)) {
    const {specName}SpecificationElement = {RootElement}.refract(result, refractorOpts);
    {specName}SpecificationElement.classes.push('result');
    parseResultElement.replaceResult({specName}SpecificationElement);
  }

  return parseResultElement;
};

/**
 * @public
 */
export const namespace = createNamespace({specName}Namespace);
```

**Template Variables**:
- `{specName}`: Namespace name in camelCase (e.g., `arazzo`, `openApi`, `asyncApi`)
- `{spec}`: Spec identifier (e.g., `arazzo`, `openapi`, `asyncapi`)
- `{version}`: Version identifier (e.g., `1`, `3-2`, `2019-09`)
- `{RootElement}`: Root element class name (e.g., `ArazzoSpecification1Element`, `OpenApi3_2Element`)
- `{Spec Name}`: Human-readable spec name (e.g., `Arazzo`, `OpenAPI`, `AsyncAPI`)
- `{Version}`: Human-readable version (e.g., `1.x.y`, `3.2.x`)
- `{specField}`: Specification field name (e.g., `arazzo`, `openapi`, `asyncapi`)
- `{versionPattern}`: Version regex pattern (e.g., `1\.(?:[1-9]\d*|0)\.(?:[1-9]\d*|0)` for 1.x.y)
- `{majorVersion}`: Major version number (e.g., `3`)

### 4.4 Generate src/media-types.ts

```typescript
import { mediaTypes, {SpecName}MediaTypes } from '@swagger-api/apidom-ns-{spec}-{version}';

/**
 * Media types for {Spec Name} {Version} JSON documents.
 * Includes both generic JSON and specification-specific media types.
 *
 * @public
 */
const jsonMediaTypes = new {SpecName}MediaTypes(
  ...mediaTypes.filterByFormat('generic'),
  ...mediaTypes.filterByFormat('json'),
);

export default jsonMediaTypes;
```

**Template Variables**:
- `{SpecName}`: Media types class name from namespace (e.g., `ArazzoMediaTypes`, `OpenAPIMediaTypes`)

### 4.5 Generate TypeScript Configurations

**tsconfig.json**:
```json
{
  "extends": "../../tsconfig.json",
  "include": [
    "src/**/*"
  ]
}
```

**tsconfig.declaration.json**:
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

### 4.6 Copy Configuration Files

Copy from an existing parser adapter (e.g., `apidom-parser-adapter-openapi-json-3-2`):

1. **config/api-extractor/api-extractor.json** - Copy as-is (points at `../../types/adapter.d.ts`)
2. **vite.config.ts** - Update `packageName` and `libraryName` (see below)
3. **.mocharc.json**, **.eslintignore** - Copy as-is
4. **.gitignore** - Copy and update the package name in the `/swagger-api-apidom-parser-adapter-*.tgz` line
5. **test/mocha-bootstrap.ts**, **test/.eslintrc**, **test/tsconfig.json** - Copy as-is

**vite.config.ts** (browser UMD bundle, run by the `build:umd:browser` script):
```typescript
import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-{spec}-json-{version}',
  libraryName: '{libraryName}',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
```

- `entry` is required for adapters: the shared base config (`config/vite/vite.config.base.ts`) defaults to `./src/index.ts`, but adapters export from `src/adapter.ts`.
- `{libraryName}`: global UMD name, `apidomParserAdapter` + PascalCase spec + format + version digits, e.g. `apidomParserAdapterOpenapiJson32`, `apidomParserAdapterArazzoYaml1`, `apidomParserAdapterJsonSchemaJson202012`.


## YAML Parser Adapter (Phase 5)

Create the YAML parser adapter package (similar to JSON but with YAML-specific changes):

### 5.1 Same Directory Structure as JSON

### 5.2 Generate package.json

Same as JSON adapter but:
- Change package name to `apidom-parser-adapter-{spec}-yaml-{version}`
- Update all references from `-json-` to `-yaml-` (including `vite.config.ts`: `packageName` and `libraryName`, e.g. `apidomParserAdapterOpenapiYaml32`)
- Change dependency from `@swagger-api/apidom-parser-adapter-json` to `@swagger-api/apidom-parser-adapter-yaml-1-2`

### 5.3 Generate src/adapter.ts

```typescript
import { propOr, omit } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { ParseResultElement, createNamespace } from '@swagger-api/apidom-core';
import {
  parse as parseYAML,
  detect as detectYAML,
} from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import {specName}Namespace, { {RootElement} } from '@swagger-api/apidom-ns-{spec}-{version}';

export { default as mediaTypes } from './media-types.ts';

/**
 * Detection regex for {Spec Name} {Version}.
 * Supports both YAML and JSON formats for flexibility.
 *
 * @public
 */
export const detectionRegExp =
  /(?<YAML>^(["']?){specField}\2\s*:\s*(["']?)(?<version_yaml>{versionPattern})\3(?:\s+|$))|(?<JSON>"{specField}"\s*:\s*"(?<version_json>{versionPattern})")/m;

/**
 * Detects if the source string is a {Spec Name} {Version} YAML document.
 *
 * @public
 */
export const detect = async (source: string): Promise<boolean> =>
  detectionRegExp.test(source) && (await detectYAML(source));

/**
 * Parses a {Spec Name} {Version} YAML document into ApiDOM.
 *
 * @public
 */
export const parse = async (
  source: string,
  options: Record<string, unknown> = {},
): Promise<ParseResultElement> => {
  const refractorOpts: Record<string, unknown> = propOr({}, 'refractorOpts', options);
  const parserOpts = omit(['refractorOpts'], options);
  const parseResultElement = await parseYAML(source, parserOpts);
  const { result } = parseResultElement;

  if (isNotUndefined(result)) {
    const {specName}SpecificationElement = {RootElement}.refract(result, refractorOpts);
    {specName}SpecificationElement.classes.push('result');
    parseResultElement.replaceResult({specName}SpecificationElement);
  }

  return parseResultElement;
};

/**
 * @public
 */
export const namespace = createNamespace({specName}Namespace);
```

### 5.4 Generate src/media-types.ts

```typescript
import { mediaTypes, {SpecName}MediaTypes } from '@swagger-api/apidom-ns-{spec}-{version}';

/**
 * Media types for {Spec Name} {Version} YAML documents.
 * Includes both generic YAML and specification-specific media types.
 *
 * @public
 */
const yamlMediaTypes = new {SpecName}MediaTypes(
  ...mediaTypes.filterByFormat('generic'),
  ...mediaTypes.filterByFormat('yaml'),
);

export default yamlMediaTypes;
```

## Detection and Media Type Quick Reference

### Version Detection Patterns

**JSON Detection RegExp**:
```typescript
/"{specField}"\s*:\s*"(?<version_json>{versionPattern})"/
```

**YAML Detection RegExp** (supports both YAML and JSON):
```typescript
/(?<YAML>^(["']?){specField}\2\s*:\s*(["']?)(?<version_yaml>{versionPattern})\3(?:\s+|$))|(?<JSON>"{specField}"\s*:\s*"(?<version_json>{versionPattern})")/m
```

**Version Patterns**:
- Semantic version: `3\.2\.(?:[1-9]\d*|0)` (3.2.x)
- Major version: `3\.(?:[1-9]\d*|0)\.(?:[1-9]\d*|0)` (3.x.x)
- Any patch: `(?:[1-9]\d*|0)\.(?:[1-9]\d*|0)\.(?:[1-9]\d*|0)` (x.x.x)

Pick the pattern that matches the namespace scope: OpenAPI 3.x namespaces cover one minor line (`3\.2\.x`, so `3.3.0` is **not** detected), while AsyncAPI and Arazzo namespaces cover a whole major (`3.x.y` / `1.x.y`). The adapter tests must assert the same (see `adapter-test-templates.md`).

### Media Types

Import and use media types from the namespace package:
```typescript
import { mediaTypes, {SpecName}MediaTypes } from '@swagger-api/apidom-ns-{spec}-{version}';

// For JSON
const jsonMediaTypes = new {SpecName}MediaTypes(
  ...mediaTypes.filterByFormat('generic'),
  ...mediaTypes.filterByFormat('json'),
);

// For YAML
const yamlMediaTypes = new {SpecName}MediaTypes(
  ...mediaTypes.filterByFormat('generic'),
  ...mediaTypes.filterByFormat('yaml'),
);
```
