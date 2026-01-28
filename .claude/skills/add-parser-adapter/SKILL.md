---
name: add-parser-adapter
description: Creates parser adapter packages for existing ApiDOM namespace packages and integrates them with apidom-reference
disable-model-invocation: false
user-invocable: true
---

# Add Parser Adapter Skill

**Skill Name:** `add-parser-adapter`
**Description:** Creates parser adapter packages for existing ApiDOM namespace packages and integrates them with apidom-reference.

## Overview

This skill automates the process of creating parser adapter packages for API namespaces that don't yet have parsers. It discovers which `apidom-ns-*` packages are missing corresponding `apidom-parser-adapter-*` packages, allows you to select which ones to create, generates the complete parser adapter packages (both JSON and YAML), and integrates them with `apidom-reference`.

## When to Use

Use this skill when:
- A namespace package exists but lacks parser adapters
- You need to add JSON and/or YAML parsing support for an existing namespace
- You want to make a namespace usable in apidom-reference workflows
- You've just created a new namespace using `/add-namespace` and need to add parsers

## Prerequisites

Before running this skill:
1. **Namespace package exists**: The target `apidom-ns-*` package must exist
2. **Specification version field**: Know the field name used to detect the specification version (e.g., `"openapi"`, `"asyncapi"`, `"arazzo"`)
3. **Version pattern**: Know the version pattern (e.g., `"3.1.0"` for OpenAPI 3.1)
4. **Root element**: Know the root specification element class name (e.g., `OpenApi3_1Element`, `ArazzoSpecification1Element`)
5. **Monorepo built**: Run `npm run build` at least once to ensure packages are available

## Skill Instructions

### Phase 1: Discover Missing Parser Adapters

Scan the packages directory to identify namespaces without parser adapters:

1. **Find all namespace packages**:
   ```bash
   ls -1 packages | grep "^apidom-ns-"
   ```

2. **Find all parser adapter packages**:
   ```bash
   ls -1 packages | grep "^apidom-parser-adapter-"
   ```

3. **Identify missing adapters** by comparing:
   - For each `apidom-ns-{spec}-{version}`, check if these exist:
     - `apidom-parser-adapter-{spec}-json-{version}`
     - `apidom-parser-adapter-{spec}-yaml-{version}`

   Special naming cases:
   - API Design Systems: `api-design-systems` (no version)
   - JSON Schema: Pattern is `json-schema-{json|yaml}-{version}`
   - Others: Pattern is `{spec}-{json|yaml}-{version}`

4. **Build options list** of missing adapters:
   ```typescript
   interface MissingAdapter {
     namespace: string;           // e.g., "apidom-ns-openapi-3-2"
     spec: string;                // e.g., "openapi"
     version: string;             // e.g., "3-2"
     missingJSON: boolean;        // true if JSON adapter missing
     missingYAML: boolean;        // true if YAML adapter missing
   }
   ```

### Phase 2: User Selection

Present the missing adapters to the user using `AskUserQuestion`:

```typescript
{
  question: "Which namespace would you like to add parser adapters for?",
  header: "Namespace",
  multiSelect: false,
  options: [
    {
      label: "OpenAPI 3.2 (JSON + YAML)",
      description: "Creates apidom-parser-adapter-openapi-json-3-2 and apidom-parser-adapter-openapi-yaml-3-2"
    },
    {
      label: "JSON Schema 2019-09 (JSON + YAML)",
      description: "Creates apidom-parser-adapter-json-schema-json-2019-09 and apidom-parser-adapter-json-schema-yaml-2019-09"
    }
    // ... more options for each missing adapter
  ]
}
```

After selection, ask for additional information:

```typescript
{
  questions: [
    {
      question: "What is the specification version field name?",
      header: "Field Name",
      options: [
        { label: "openapi", description: "For OpenAPI specifications" },
        { label: "asyncapi", description: "For AsyncAPI specifications" },
        { label: "arazzo", description: "For Arazzo specifications" },
        { label: "Other", description: "Specify a custom field name" }
      ]
    },
    {
      question: "What is the version pattern?",
      header: "Version",
      options: [
        { label: "3.2.0", description: "Exact version (e.g., OpenAPI 3.2.0)" },
        { label: "3.2.x", description: "Minor version range (3.2.0, 3.2.1, etc.)" },
        { label: "Other", description: "Specify custom version pattern" }
      ]
    },
    {
      question: "What is the root specification element class name?",
      header: "Root Element",
      options: [
        { label: "From namespace exports", description: "Automatically discover from namespace package" }
      ]
    }
  ]
}
```

### Phase 3: Extract Namespace Information

Read the namespace package to extract required information:

1. **Read namespace package.json**:
   ```typescript
   const namespacePkg = JSON.parse(
     readFile(`packages/apidom-ns-${spec}-${version}/package.json`)
   );
   ```

2. **Find root element class** by reading the namespace exports:
   - Look for elements that extend from the spec (e.g., files matching pattern like `OpenApi*.ts`, `AsyncApi*.ts`, `Arazzo*.ts`)
   - Read the namespace's `src/index.ts` to identify exported element classes
   - Look for the specification root element (typically has "Specification" or the spec name in PascalCase)

3. **Determine media types** by reading `src/media-types.ts`

4. **Extract version from namespace**:
   - Parse the version number from the namespace package name
   - Convert to regex pattern for detection

### Phase 4: Generate JSON Parser Adapter

Create the JSON parser adapter package:

#### 4.1 Create Directory Structure

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
│   ├── api-extractor/
│   │   └── api-extractor.json
│   └── webpack/
│       └── browser.config.js
├── package.json
├── tsconfig.json
├── tsconfig.declaration.json
└── README.md
```

#### 4.2 Generate package.json

```json
{
  "name": "@swagger-api/apidom-parser-adapter-{spec}-json-{version}",
  "version": "1.0.0",
  "description": "Parser adapter for parsing JSON documents into {Spec Name} {Version} namespace.",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org"
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
    "build": "npm run clean && run-p --max-parallel ${CPU_CORES:-2} typescript:declaration build:es build:cjs build:umd:browser",
    "build:es": "cross-env BABEL_ENV=es babel src --out-dir src --extensions '.ts' --out-file-extension '.mjs' --root-mode 'upward'",
    "build:cjs": "cross-env BABEL_ENV=cjs babel src --out-dir src --extensions '.ts' --out-file-extension '.cjs' --root-mode 'upward'",
    "build:umd:browser": "cross-env BABEL_ENV=browser webpack --config config/webpack/browser.config.js --progress",
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
    "@swagger-api/apidom-core": "^1.2.2",
    "@swagger-api/apidom-ns-{spec}-{version}": "^1.2.2",
    "@swagger-api/apidom-parser-adapter-json": "^1.2.2",
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

#### 4.3 Generate src/adapter.ts

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

#### 4.4 Generate src/media-types.ts

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

#### 4.5 Generate TypeScript Configurations

**tsconfig.json**:
```json
{
  "extends": "../../tsconfig.json",
  "include": ["src/**/*"],
  "compilerOptions": {
    "composite": true
  }
}
```

**tsconfig.declaration.json**:
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

#### 4.6 Copy Configuration Files

Copy from existing parser adapter (e.g., `apidom-parser-adapter-arazzo-json-1`):

1. **config/api-extractor/api-extractor.json** - Update package name
2. **config/webpack/browser.config.js** - Update package name
3. **test/mocha-bootstrap.ts** - Copy as-is
4. **test/.eslintrc** - Copy as-is
5. **test/tsconfig.json** - Copy and update paths

#### 4.7 Generate Tests

**test/adapter.ts**:
```typescript
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert, expect } from 'chai';
import { isParseResultElement, sexprs } from '@swagger-api/apidom-core';
import { is{RootElement} } from '@swagger-api/apidom-ns-{spec}-{version}';

import * as adapter from '../src/adapter.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonSpec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-spec.json'))
  .toString();

describe('adapter', function () {
  context('given definition in JSON format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(jsonSpec));
    });

    specify('should detect minor version bump', async function () {
      assert.isTrue(await adapter.detect('{{"{specField}": "{majorVersion}.{minorPlusOne}.0"}'));
    });

    specify('should detect patch version bump', async function () {
      assert.isTrue(await adapter.detect('{{"{specField}": "{majorVersion}.{minorVersion}.1"}'));
    });

    specify('should not detect major version bump', async function () {
      assert.isFalse(await adapter.detect('{{"{specField}": "{majorPlusOne}.0.0"}'));
    });
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(jsonSpec, { sourceMap: true });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(is{RootElement}(parseResult.api));
    expect(sexprs(parseResult)).toMatchSnapshot();
  });

  context('given zero byte empty file', function () {
    specify('should return empty parse result', async function () {
      const parseResult = await adapter.parse('', { sourceMap: true });

      assert.isTrue(parseResult.isEmpty);
    });
  });

  context('given non-zero byte empty file', function () {
    specify('should return empty parser result', async function () {
      const parseResult = await adapter.parse('  ', { sourceMap: true });

      assert.isTrue(parseResult.isEmpty);
    });
  });

  context('given invalid json file', function () {
    specify('should return empty parser result', async function () {
      const parseResult = await adapter.parse(' a ', { sourceMap: true });

      assert.isTrue(parseResult.isEmpty);
    });
  });

  context('detectionRegExp', function () {
    specify('should reject invalid version ranges', function () {
      assert.isFalse(adapter.detectionRegExp.test('{specField}: {majorVersion}.01.0'));
      assert.isFalse(adapter.detectionRegExp.test('{specField}: {majorVersion}.0.x'));
      assert.isFalse(adapter.detectionRegExp.test('{specField}: {majorPlusOne}.0.0'));
    });

    specify('should detect version ranges in forward compatible way', function () {
      assert.isTrue(adapter.detectionRegExp.test('"{specField}": "{majorVersion}.{minorVersion}.0"'));
      assert.isTrue(adapter.detectionRegExp.test('"{specField}": "{majorVersion}.{minorVersion}.145"'));
      assert.isTrue(adapter.detectionRegExp.test('"{specField}": "{majorVersion}.{minorPlusOne}.0"'));
    });
  });
});
```

**test/media-types.ts**:
```typescript
import { assert } from 'chai';
import ApiDOMParser from '@swagger-api/apidom-parser';

import * as adapter from '../src/adapter.ts';

/**
 * IMPORTANT: Test media types through parser integration, not directly.
 * Testing mediaTypes.latest() directly is discouraged - always test through
 * the parser to ensure proper integration.
 */
describe('given adapter is used in parser', function () {
  const parser = new ApiDOMParser().use(adapter);

  context('given {Spec Name} {Version} definition in {format} format', function () {
    specify('should find appropriate media type', async function () {
      const mediaType = await parser.findMediaType('{{"{specField}": "{version}"}}');

      assert.strictEqual(mediaType, '{expected-media-type}');
    });
  });
});
```

**Critical**: OpenAPI 3.2.0 testing revealed that testing `mediaTypes.latest()` directly is not recommended. Always test media type detection through the parser integration using `ApiDOMParser.findMediaType()`.

**test/fixtures/sample-spec.json**:
- Copy a minimal valid specification document from the namespace tests or create one

### Phase 5: Generate YAML Parser Adapter

Create the YAML parser adapter package (similar to JSON but with YAML-specific changes):

#### 5.1 Same Directory Structure as JSON

#### 5.2 Generate package.json

Same as JSON adapter but:
- Change package name to `apidom-parser-adapter-{spec}-yaml-{version}`
- Update all references from `-json-` to `-yaml-`
- Change dependency from `@swagger-api/apidom-parser-adapter-json` to `@swagger-api/apidom-parser-adapter-yaml-1-2`

#### 5.3 Generate src/adapter.ts

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

#### 5.4 Generate src/media-types.ts

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

#### 5.5 Generate Tests

Same as JSON adapter but:
- Test YAML fixtures instead of JSON
- Add test for detecting YAML format specifically
- Verify YAML-specific detection patterns

**test/adapter.ts** - Update to test both YAML and JSON detection:
```typescript
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert, expect } from 'chai';
import { isParseResultElement, sexprs } from '@swagger-api/apidom-core';
import { is{RootElement} } from '@swagger-api/apidom-ns-{spec}-{version}';

import * as adapter from '../src/adapter.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const yamlSpec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-spec.yaml'))
  .toString();
const jsonSpec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-spec.json'))
  .toString();

describe('adapter', function () {
  context('given definition in YAML 1.2 format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(yamlSpec));
    });

    specify('should detect minor version bump', async function () {
      assert.isTrue(await adapter.detect('{specField}: {majorVersion}.{minorPlusOne}.0'));
    });

    specify('should detect patch version bump', async function () {
      assert.isTrue(await adapter.detect('{specField}: {majorVersion}.{minorVersion}.1'));
    });

    specify('should not detect major version bump', async function () {
      assert.isFalse(await adapter.detect('{specField}: {majorPlusOne}.0.0'));
    });
  });

  context('given definition in JSON format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(jsonSpec));
    });
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(yamlSpec, { sourceMap: true });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(is{RootElement}(parseResult.api));
    expect(sexprs(parseResult)).toMatchSnapshot();
  });

  context('given zero byte empty file', function () {
    specify('should return empty parse result', async function () {
      const parseResult = await adapter.parse('', { sourceMap: true });

      assert.isTrue(parseResult.isEmpty);
    });
  });

  context('detectionRegExp', function () {
    specify('should reject invalid version ranges', function () {
      assert.isFalse(adapter.detectionRegExp.test('{specField}: {majorVersion}.01.0'));
      assert.isFalse(adapter.detectionRegExp.test('{specField}: {majorVersion}.0.x'));
    });

    specify('should detect version ranges in forward compatible way', function () {
      assert.isTrue(adapter.detectionRegExp.test('{specField}: {majorVersion}.{minorVersion}.0'));
      assert.isTrue(adapter.detectionRegExp.test('{specField}: {majorVersion}.{minorVersion}.145'));
      assert.isTrue(adapter.detectionRegExp.test('{specField}: {majorVersion}.{minorPlusOne}.0'));
    });
  });
});
```

### Phase 6: Integrate with apidom-reference

Add the new parser adapters to the `apidom-reference` package. Based on OpenAPI 3.2.0 implementation, a complete integration requires creating components for all four phases: **parse**, **resolve**, **dereference**, and **bundle**.

#### 6.1 Create Parser Classes in apidom-reference

For JSON parser, create `packages/apidom-reference/src/parse/parsers/{spec}-json-{version}/index.ts`:

```typescript
import { pick } from 'ramda';
import { ParseResultElement } from '@swagger-api/apidom-core';
import {
  parse,
  mediaTypes as {SpecName}{Version}MediaTypes,
  detect,
} from '@swagger-api/apidom-parser-adapter-{spec}-json-{version}';

import ParserError from '../../../errors/ParserError.ts';
import Parser, { ParserOptions } from '../Parser.ts';
import File from '../../../File.ts';

export type { default as Parser, ParserOptions } from '../Parser.ts';
export type { default as File, FileOptions } from '../../../File.ts';

/**
 * @public
 */
export interface {SpecName}JSON{Version}ParserOptions extends Omit<ParserOptions, 'name'> {}

/**
 * Parser for {Spec Name} {Version} JSON documents.
 *
 * @public
 */
class {SpecName}JSON{Version}Parser extends Parser {
  public syntacticAnalysis?: 'direct' | 'indirect';

  public refractorOpts!: object;

  constructor(options?: {SpecName}JSON{Version}ParserOptions) {
    const { fileExtensions = [], mediaTypes = {SpecName}{Version}MediaTypes, ...rest } = options ?? {};

    super({ ...rest, name: '{spec}-json-{version}', fileExtensions, mediaTypes });
  }

  async canParse(file: File): Promise<boolean> {
    const hasSupportedFileExtension =
      this.fileExtensions.length === 0 ? true : this.fileExtensions.includes(file.extension);
    const hasSupportedMediaType = this.mediaTypes.includes(file.mediaType);

    if (!hasSupportedFileExtension) return false;
    if (hasSupportedMediaType) return true;
    if (!hasSupportedMediaType) {
      return detect(file.toString());
    }
    return false;
  }

  async parse(file: File): Promise<ParseResultElement> {
    const source = file.toString();

    try {
      const parserOpts = pick(['sourceMap', 'syntacticAnalysis', 'refractorOpts'], this);
      return await parse(source, parserOpts);
    } catch (error: unknown) {
      throw new ParserError(`Error parsing "${file.uri}"`, { cause: error });
    }
  }
}

export default {SpecName}JSON{Version}Parser;
```

**Template Variables**:
- `{SpecName}`: Parser class prefix (e.g., `OpenAPI`, `AsyncAPI`, `Arazzo`)
- `{Version}`: Version in class name (e.g., `3_2`, `2019_09`)
- `{spec}`: Spec identifier (e.g., `openapi`, `asyncapi`)
- `{version}`: Version identifier (e.g., `3-2`, `2019-09`)
- `{Spec Name}`: Human-readable (e.g., `OpenAPI`)

For YAML parser, create `packages/apidom-reference/src/parse/parsers/{spec}-yaml-{version}/index.ts`:

Same structure as JSON parser but:
- Change class name to `{SpecName}YAML{Version}Parser`
- Import from `@swagger-api/apidom-parser-adapter-{spec}-yaml-{version}`
- Update parser name to `'{spec}-yaml-{version}'`

#### 6.2 Create Tests in apidom-reference

For JSON parser, create `packages/apidom-reference/test/parse/parsers/{spec}-json-{version}/index.ts`:

```typescript
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { mediaTypes, is{RootElement} } from '@swagger-api/apidom-ns-{spec}-{version}';

import {SpecName}JSON{Version}Parser from '../../../../src/parse/parsers/{spec}-json-{version}/index.ts';
import File from '../../../../src/File.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('parsers', function () {
  context('{SpecName}JSON{Version}Parser', function () {
    context('canParse', function () {
      context('given file with .json extension', function () {
        context('and with proper media type', function () {
          specify('should return true', async function () {
            const file = File({
              uri: '/path/to/spec.json',
              mediaType: mediaTypes.latest('json'),
            });
            const parser = new {SpecName}JSON{Version}Parser();

            assert.isTrue(await parser.canParse(file));
          });
        });

        context('and with unknown media type', function () {
          context('and file data is buffer and can be detected', function () {
            specify('should return true', async function () {
              const url = path.join(__dirname, 'fixtures', 'sample-spec.json');
              const file = File({ uri: url, data: fs.readFileSync(url) });
              const parser = new {SpecName}JSON{Version}Parser();

              assert.isTrue(await parser.canParse(file));
            });
          });
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', async function () {
          const file = File({ uri: '/path/to/spec.yaml' });
          const parser = new {SpecName}JSON{Version}Parser({ fileExtensions: ['.json'] });

          assert.isFalse(await parser.canParse(file));
        });
      });
    });

    context('parse', function () {
      specify('should return parse result', async function () {
        const url = path.join(__dirname, 'fixtures', 'sample-spec.json');
        const file = File({ uri: url, data: fs.readFileSync(url) });
        const parser = new {SpecName}JSON{Version}Parser();
        const result = await parser.parse(file);

        assert.isTrue(is{RootElement}(result.api));
      });
    });
  });
});
```

Similar test structure for YAML parser.

Create fixture files in `test/parse/parsers/{spec}-json-{version}/fixtures/` and `test/parse/parsers/{spec}-yaml-{version}/fixtures/`.

#### 6.3 Update saturated.ts Configuration

Edit `packages/apidom-reference/src/configuration/saturated.ts`:

1. **Add imports** at the top:
   ```typescript
   import {SpecName}JSON{Version}Parser from '../parse/parsers/{spec}-json-{version}/index.ts';
   import {SpecName}YAML{Version}Parser from '../parse/parsers/{spec}-yaml-{version}/index.ts';
   ```

2. **Add to parsers array** (maintain alphabetical/version order):
   ```typescript
   options.parse.parsers = [
     // ... existing parsers ...
     new {SpecName}JSON{Version}Parser({ allowEmpty: true, sourceMap: false }),
     new {SpecName}YAML{Version}Parser({ allowEmpty: true, sourceMap: false }),
     // ... remaining parsers ...
   ];
   ```

3. **Placement guidelines**:
   - Group by specification (OpenAPI, AsyncAPI, etc.)
   - Within groups, order by version (oldest to newest)
   - Keep generic parsers (JSON, YAML, Binary) at the end

#### 6.4 Update package.json Dependencies

Edit `packages/apidom-reference/package.json`:

Add the new parser adapter packages to dependencies:
```json
{
  "dependencies": {
    "@swagger-api/apidom-parser-adapter-{spec}-json-{version}": "^1.2.2",
    "@swagger-api/apidom-parser-adapter-{spec}-yaml-{version}": "^1.2.2"
  }
}
```

### Phase 7: Create Additional Reference Strategies

Based on OpenAPI 3.2.0 implementation patterns, create strategies for resolve, dereference, and bundle components:

#### 7.1 Create Resolve Strategy

Create `packages/apidom-reference/src/resolve/strategies/{spec}-{version}/index.ts`:

```typescript
import {SpecName}{Version}DereferenceStrategy from '../../dereference/strategies/{spec}-{version}/index.ts';

/**
 * Resolve strategy for {Spec Name} {Version}.
 * Delegates to dereference strategy for resolution.
 *
 * @public
 */
class {SpecName}{Version}ResolveStrategy extends {SpecName}{Version}DereferenceStrategy {
  constructor(options?: {SpecName}{Version}DereferenceStrategyOptions) {
    super(options);
    this.name = '{spec}-{version}';
  }
}

export default {SpecName}{Version}ResolveStrategy;
```

#### 7.2 Create Dereference Strategy

Create `packages/apidom-reference/src/dereference/strategies/{spec}-{version}/index.ts`:

```typescript
import { ParseResultElement, isObjectElement } from '@swagger-api/apidom-core';
import {
  is{RootElement},
  keyMap as {specName}{Version}KeyMap,
  getNodeType,
} from '@swagger-api/apidom-ns-{spec}-{version}';
import { visit, mergeAllVisitors } from '@swagger-api/apidom-reference/configuration/visitors';

import {SpecName}{Version}DereferenceVisitor from './visitors/{spec}-{version}/index.ts';
import type { DereferenceStrategy } from '../../DereferenceStrategy.ts';

/**
 * Dereference strategy for {Spec Name} {Version}.
 *
 * @public
 */
class {SpecName}{Version}DereferenceStrategy implements DereferenceStrategy {
  public name = '{spec}-{version}-dereference';

  canDereference(element: ParseResultElement): boolean {
    if (!isParseResultElement(element)) return false;
    const { api } = element;
    return is{RootElement}(api);
  }

  async dereference(
    file: File,
    parseResult: ParseResultElement,
    options: ReferenceOptions
  ): Promise<Element> {
    const visitors = mergeAllVisitors([
      {SpecName}{Version}DereferenceVisitor({ ...options, keyMap: {specName}{Version}KeyMap, getNodeType }),
    ]);

    return visit(parseResult.api, visitors, options);
  }
}

export default {SpecName}{Version}DereferenceStrategy;
```

#### 7.3 Create Dereference Visitor

Create `packages/apidom-reference/src/dereference/strategies/{spec}-{version}/visitors/{spec}-{version}/index.ts`:

```typescript
import { Mixin } from 'ts-mixer';
import { Element } from '@swagger-api/apidom-core';

import ReferenceVisitor from '../../../visitors/ReferenceVisitor.ts';
import SpecificationVisitor from '../../../visitors/SpecificationVisitor.ts';
import {SpecName}{Version}Visitor from './visitors/index.ts';

/**
 * Main visitor for dereferencing {Spec Name} {Version} documents.
 * Combines Reference resolution, Specification traversal, and spec-specific logic.
 *
 * @public
 */
class Visitor extends Mixin(ReferenceVisitor, SpecificationVisitor, {SpecName}{Version}Visitor) {
  constructor(options) {
    super(options);
    this.element = new Element();
  }
}

export default Visitor;
```

#### 7.4 Create Selector Functions

Create `packages/apidom-reference/src/dereference/strategies/{spec}-{version}/selectors/$anchor.ts`:

```typescript
/**
 * URI selector for $anchor in {Spec Name} {Version}.
 * Handles anchor-based references within the document.
 */
export const $AnchorSelector = (element: Element): Element | undefined => {
  // Implementation for finding elements by $anchor
  // ...
};
```

Create `packages/apidom-reference/src/dereference/strategies/{spec}-{version}/selectors/uri.ts`:

```typescript
/**
 * URI selector for absolute and relative URIs in {Spec Name} {Version}.
 * Handles standard $ref resolution.
 */
export const uriSelector = (element: Element): Element | undefined => {
  // Implementation for finding elements by URI
  // ...
};
```

#### 7.5 Create Bundle Strategy

Create `packages/apidom-reference/src/bundle/strategies/{spec}-{version}/index.ts`:

```typescript
import {SpecName}{Version}DereferenceStrategy from '../../dereference/strategies/{spec}-{version}/index.ts';

/**
 * Bundle strategy for {Spec Name} {Version}.
 * Creates a compound document from multi-file {Spec Name} resources.
 *
 * @public
 */
class {SpecName}{Version}BundleStrategy extends {SpecName}{Version}DereferenceStrategy {
  constructor(options?: {SpecName}{Version}DereferenceStrategyOptions) {
    super(options);
    this.name = '{spec}-{version}-bundle';
  }

  // Override behavior for bundling instead of dereferencing
  // Bundling inlines external references while preserving structure
}

export default {SpecName}{Version}BundleStrategy;
```

#### 7.6 Register Strategies in Configuration

Update `packages/apidom-reference/src/configuration/saturated.ts`:

```typescript
// Import strategies
import {SpecName}{Version}ResolveStrategy from '../resolve/strategies/{spec}-{version}/index.ts';
import {SpecName}{Version}DereferenceStrategy from '../dereference/strategies/{spec}-{version}/index.ts';
import {SpecName}{Version}BundleStrategy from '../bundle/strategies/{spec}-{version}/index.ts';

// In the configuration function:

// Add to resolve strategies
options.resolve.strategies = [
  new {SpecName}{Version}ResolveStrategy(),
  // ... other strategies
];

// Add to dereference strategies
options.dereference.strategies = [
  new {SpecName}{Version}DereferenceStrategy(),
  // ... other strategies
];

// Add to bundle strategies
options.bundle.strategies = [
  new {SpecName}{Version}BundleStrategy(),
  // ... other strategies
];
```

#### 7.7 Create Tests for Reference Strategies

Create comprehensive tests in `packages/apidom-reference/test/`:

- `test/resolve/strategies/{spec}-{version}/` - Test external reference resolution
- `test/dereference/strategies/{spec}-{version}/` - Test $ref transcluding
- `test/bundle/strategies/{spec}-{version}/` - Test multi-file bundling

**Example dereference test structure**:
```typescript
describe('dereference', function () {
  context('strategies', function () {
    context('{SpecName}{Version}DereferenceStrategy', function () {
      specify('should dereference internal $refs', async function () {
        const spec = `
          {
            "{specField}": "{version}",
            "components": {
              "schemas": {
                "Pet": { "type": "object" }
              }
            },
            "paths": {
              "/pets": {
                "get": {
                  "responses": {
                    "200": {
                      "content": {
                        "application/json": {
                          "schema": { "$ref": "#/components/schemas/Pet" }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `;

        const dereferenced = await dereference(spec);

        // Verify $ref was replaced with actual schema
        assert.isTrue(isPetSchema(dereferenced.paths['/pets'].get.responses['200'].content['application/json'].schema));
      });
    });
  });
});
```

**Important Note**: The reference strategy implementation (Phase 7) is optional for basic parser adapter functionality but **highly recommended** for production use. OpenAPI 3.2.0 included complete reference integration from the start. If skipping initially, create a follow-up task to add these strategies.

### Phase 8: Build and Test

1. **Build the new parser adapter packages**:
   ```bash
   # Build JSON adapter
   cd packages/apidom-parser-adapter-{spec}-json-{version}
   npm run build

   # Build YAML adapter
   cd ../apidom-parser-adapter-{spec}-yaml-{version}
   npm run build
   ```

2. **Run tests for parser adapters**:
   ```bash
   cd packages/apidom-parser-adapter-{spec}-json-{version}
   npm run test
   npm run typescript:check-types
   npm run lint

   cd ../apidom-parser-adapter-{spec}-yaml-{version}
   npm run test
   npm run typescript:check-types
   npm run lint
   ```

3. **Build apidom-reference**:
   ```bash
   cd ../../apidom-reference
   npm run build
   ```

4. **Run apidom-reference tests**:
   ```bash
   npm run test
   npm run typescript:check-types
   npm run lint
   ```

5. **Run full monorepo build** (from root):
   ```bash
   npm run build
   npm run test
   ```

### Phase 8: Update Documentation

1. **Update parser adapter README files**:
   - Explain what the adapter does
   - Show usage examples
   - Document detection patterns
   - List supported media types

2. **Update apidom-reference README**:
   - Add new parsers to supported specifications list

3. **Create CHANGELOG.md** for new packages:
   ```markdown
   # Changelog

   All notable changes to this project will be documented in this file.

   ## [1.0.0] - YYYY-MM-DD

   ### Added
   - Initial release
   - Parser adapter for {Spec Name} {Version} JSON documents
   - Detection support for {specField} field
   - Full refraction into semantic ApiDOM
   ```

## Important Patterns

### Naming Conventions

**Parser Adapter Packages**:
- Pattern: `apidom-parser-adapter-{spec}-{format}-{version}`
- Examples:
  - `apidom-parser-adapter-openapi-json-3-2`
  - `apidom-parser-adapter-asyncapi-yaml-3`
  - `apidom-parser-adapter-json-schema-json-2019-09`
  - `apidom-parser-adapter-arazzo-yaml-1`

**Parser Classes in apidom-reference**:
- Pattern: `{SpecName}{Format}{Version}Parser`
- Use underscores for version separators in class names: `3_2`, `2019_09`
- Examples:
  - `OpenAPIJSON3_2Parser`
  - `AsyncAPIYAML3Parser`
  - `JSONSchema2019_09Parser`
  - `ArazzoJSON1Parser`

**Directory Names**:
- Use kebab-case with hyphens
- Pattern: `{spec}-{format}-{version}`
- Examples: `openapi-json-3-2`, `asyncapi-yaml-3`

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

### Special Cases

**JSON Schema**:
- Namespace pattern: `apidom-ns-json-schema-{version}`
- Parser pattern: `apidom-parser-adapter-json-schema-{format}-{version}`
- Examples:
  - `apidom-parser-adapter-json-schema-json-2019-09`
  - `apidom-parser-adapter-json-schema-yaml-2020-12`

**API Design Systems**:
- No version in package name
- Pattern: `apidom-parser-adapter-api-design-systems-{format}`

### Parser Registration Order

In `saturated.ts`, maintain this order:
1. API Design Systems (if present)
2. OpenAPI (oldest to newest)
3. AsyncAPI (oldest to newest)
4. Arazzo
5. JSON Schema (oldest to newest)
6. Other specifications
7. Generic parsers (ApiDOM, JSON, YAML, Binary) at the end

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

## Troubleshooting

### Build Errors

**Import resolution failures**:
- Ensure all imports use `.ts` extension
- Check that namespace package is built first
- Verify package.json exports are correct

**TypeScript errors**:
- Run `npm run typescript:check-types` to identify issues
- Check that tsconfig references are correct
- Ensure all types are properly exported from namespace

### Test Failures

**Snapshot mismatches**:
- Run `npm run test:update-snapshots` to update
- Verify test fixtures are valid specification documents

**Detection failures**:
- Check regex patterns match specification version format
- Ensure test fixtures include version field
- Verify detection logic handles edge cases

**Parse errors**:
- Ensure namespace package exports root element class
- Verify refract method exists on root element
- Check that namespace is properly registered

### Integration Issues

**Parser not found in apidom-reference**:
- Verify parser is imported in `saturated.ts`
- Check parser is added to `options.parse.parsers` array
- Ensure parser class name matches import

**Media type detection fails**:
- Check media types are correctly imported from namespace
- Verify filterByFormat includes both 'generic' and format-specific types
- Test with both media type and content detection

## References

- **Existing Parser Adapters**:
  - Simple: `apidom-parser-adapter-arazzo-json-1`
  - OpenAPI: `apidom-parser-adapter-openapi-json-3-1`
  - AsyncAPI: `apidom-parser-adapter-asyncapi-yaml-3`

- **apidom-reference Integration**:
  - Parser classes: `packages/apidom-reference/src/parse/parsers/`
  - Configuration: `packages/apidom-reference/src/configuration/saturated.ts`
  - Tests: `packages/apidom-reference/test/parse/parsers/`

- **Architecture**: See CLAUDE.md "Parser Adapters" section

## Post-Creation Checklist

After running this skill, verify:

- [ ] JSON parser adapter package created
- [ ] YAML parser adapter package created
- [ ] Both adapters build successfully
- [ ] All adapter tests pass
- [ ] Parser classes created in apidom-reference
- [ ] Parser tests created in apidom-reference
- [ ] saturated.ts updated with new parsers
- [ ] apidom-reference dependencies updated
- [ ] apidom-reference builds successfully
- [ ] apidom-reference tests pass
- [ ] Full monorepo builds successfully
- [ ] Documentation updated (README, CHANGELOG)
- [ ] Type checking passes for all packages
- [ ] Linting passes for all packages
