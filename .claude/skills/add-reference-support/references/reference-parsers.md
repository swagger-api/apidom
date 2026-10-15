# apidom-reference Parse Integration (Phase 2)

Add the new parser adapters to the `apidom-reference` package. Based on OpenAPI 3.2.0 implementation, a complete integration requires creating components for all four phases: **parse**, **resolve**, **dereference**, and **bundle**.

## 2.1 Create Parser Classes in apidom-reference

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
/* eslint-disable @typescript-eslint/naming-convention */
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
/* eslint-enable @typescript-eslint/naming-convention */

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

## 2.2 Create Tests in apidom-reference

Copy the sibling parser's test file (e.g. `test/parse/parsers/asyncapi-json-3/index.ts`) and keep all of its contexts: `canParse` (proper and improper media type, unknown extension, no extension, buffer and string detection), `parse` (string, buffer, non-matching data, empty file) and `sourceMap` (enabled, disabled). PR #5182's A2A parser tests had fewer cases and were sent back. Verify:

```bash
node .claude/skills/add-spec-version/scripts/check-test-parity.mjs \
  packages/apidom-reference/test/parse/parsers/{spec}-json-{version}/index.ts \
  packages/apidom-reference/test/parse/parsers/asyncapi-json-3/index.ts --mask asyncapi,3.0.0
```

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
            const file = new File({
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
              const file = new File({ uri: url, data: fs.readFileSync(url) });
              const parser = new {SpecName}JSON{Version}Parser();

              assert.isTrue(await parser.canParse(file));
            });
          });
        });
      });

      context('given file with unknown extension', function () {
        specify('should return false', async function () {
          const file = new File({ uri: '/path/to/spec.yaml' });
          const parser = new {SpecName}JSON{Version}Parser({ fileExtensions: ['.json'] });

          assert.isFalse(await parser.canParse(file));
        });
      });
    });

    context('parse', function () {
      specify('should return parse result', async function () {
        const url = path.join(__dirname, 'fixtures', 'sample-spec.json');
        const file = new File({ uri: url, data: fs.readFileSync(url) });
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

## 2.3 Update saturated.ts Configuration

Edit `packages/apidom-reference/src/configuration/saturated.ts`:

1. **Add imports** at the top:
   ```typescript
   import {SpecName}JSON{Version}Parser from '../parse/parsers/{spec}-json-{version}/index.ts';
   import {SpecName}YAML{Version}Parser from '../parse/parsers/{spec}-yaml-{version}/index.ts';
   ```

2. **Add to parsers array** (insert directly after the parent/previous version of the same spec, JSON before YAML):
   ```typescript
   options.parse.parsers = [
     // ... existing parsers ...
     new {SpecName}JSON{Version}Parser({ allowEmpty: true, sourceMap: false }),
     new {SpecName}YAML{Version}Parser({ allowEmpty: true, sourceMap: false }),
     // ... remaining parsers ...
   ];
   ```

3. **Placement guidelines** (current order in `saturated.ts`):
   - OpenAPI 2, 3.0, 3.1, 3.2 → AsyncAPI 2, 3 → Arazzo 1 → A2A 1 → API Design Systems → ApiDOM JSON, JSON, YAML 1.2, Binary
   - Within a spec, versions go oldest to newest; a new version goes right after its parent version (e.g. `OpenAPIJSON3_2Parser`/`OpenAPIYAML3_2Parser` after the 3.1 pair)
   - A new specification goes after the last versioned spec group (currently A2A) and **before** API Design Systems
   - Keep the generic parsers (`APIDOMJSONParser`, `JSONParser`, `YAMLParser`, `BinaryParser`) at the end

## 2.4 Update package.json Dependencies

Edit `packages/apidom-reference/package.json`.

Spec-specific packages are **not** regular `dependencies` (those hold only core packages such as `apidom-core`, `apidom-error`). Add each new adapter package (and the namespace package, if it is not listed yet; it is needed by the strategies in Phase 3) to **both** `optionalDependencies` and `devDependencies`, keeping both lists alphabetically sorted:

```json
{
  "optionalDependencies": {
    "@swagger-api/apidom-ns-{spec}-{version}": "^{currentVersion}",
    "@swagger-api/apidom-parser-adapter-{spec}-json-{version}": "^{currentVersion}",
    "@swagger-api/apidom-parser-adapter-{spec}-yaml-{version}": "^{currentVersion}"
  },
  "devDependencies": {
    "@swagger-api/apidom-ns-{spec}-{version}": "*",
    "@swagger-api/apidom-parser-adapter-{spec}-json-{version}": "*",
    "@swagger-api/apidom-parser-adapter-{spec}-yaml-{version}": "*"
  }
}
```

`{currentVersion}`: do not hard-code it; use the value the neighbouring `@swagger-api/apidom-*` entries in `optionalDependencies` already use (equal to `"version"` in `packages/apidom-reference/package.json`).

## 2.5 Add package.json `exports` Subpaths

Every parser is also exposed as a subpath export of `@swagger-api/apidom-reference`. Add one entry per parser to `exports` in `packages/apidom-reference/package.json`, next to the entries for the sibling versions of the same spec:

```json
{
  "exports": {
    "./parse/parsers/{spec}-json-{version}": {
      "import": "./src/parse/parsers/{spec}-json-{version}/index.mjs",
      "require": "./src/parse/parsers/{spec}-json-{version}/index.cjs",
      "types": "./types/parse/parsers/{spec}-json-{version}/index.d.ts"
    },
    "./parse/parsers/{spec}-yaml-{version}": {
      "import": "./src/parse/parsers/{spec}-yaml-{version}/index.mjs",
      "require": "./src/parse/parsers/{spec}-yaml-{version}/index.cjs",
      "types": "./types/parse/parsers/{spec}-yaml-{version}/index.d.ts"
    }
  }
}
```

The strategies created in Phase 3 need the same kind of entries (see `reference-strategies.md`, 3.6).
