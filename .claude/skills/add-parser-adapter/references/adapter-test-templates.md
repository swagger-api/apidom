# Parser Adapter Test Templates (Phases 4.7 and 5.5)

The templates are a starting point; the closest sibling adapter's `test/adapter.ts` is the reference. Keep every one of its contexts (formats, unknown type, zero-byte and non-zero-byte empty files, invalid YAML, YAML with empty node, `detectionRegExp`) and verify with `check-test-parity.mjs` (see SKILL.md Critical Rules). Put each concern in its own `context`, as the sibling does, instead of folding it into another test.

## Version-bump expectations depend on the namespace scope

The detection tests must mirror what `{versionPattern}` accepts, which depends on how the namespace is scoped:

| Namespace scope | Example `{versionPattern}` | Minor bump (e.g. `3.3.0` for a 3.2 adapter) | Existing tests |
|-----------------|----------------------------|---------------------------------------------|----------------|
| One minor line (OpenAPI `3-0`, `3-1`, `3-2`) | `3\.2\.(?:[1-9]\d*\|0)` | **not** detected (`assert.isFalse`), the next minor gets its own adapter | `apidom-parser-adapter-openapi-json-3-1/test/adapter.ts`, `apidom-parser-adapter-openapi-json-3-2/test/adapter.ts` |
| Whole major (AsyncAPI `2`/`3`, Arazzo `1`) | `1\.(?:[1-9]\d*\|0)\.(?:[1-9]\d*\|0)` | detected (`assert.isTrue`) | `apidom-parser-adapter-arazzo-json-1/test/adapter.ts`, `apidom-parser-adapter-asyncapi-json-3/test/adapter.ts` |

The templates below use the **minor-line** variant (OpenAPI 3.x, the reference implementation). For a major-scoped namespace, flip the "next minor" assertions to `assert.isTrue` and add the next minor to the "forward compatible" regexp test, as in the Arazzo/AsyncAPI tests.

Additional template variables: `{minorPlusOne}` (next minor), `{majorPlusOne}` (next major), `{example-version}` (the version used in fixtures, e.g. `3.2.0`).

## JSON Parser Adapter Tests (Phase 4.7)

### 4.7 Generate Tests

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

    specify('should detect patch version bump', async function () {
      assert.isTrue(await adapter.detect('{"{specField}": "{majorVersion}.{minorVersion}.145"}'));
    });

    specify('should not detect minor version bump', async function () {
      assert.isFalse(await adapter.detect('{"{specField}": "{majorVersion}.{minorPlusOne}.0"}'));
    });

    specify('should not detect major version bump', async function () {
      assert.isFalse(await adapter.detect('{"{specField}": "{majorPlusOne}.0.0"}'));
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
      assert.isFalse(adapter.detectionRegExp.test('"{specField}": "{majorVersion}.01.0"'));
      assert.isFalse(adapter.detectionRegExp.test('"{specField}": "{majorVersion}.{minorVersion}.x"'));
      assert.isFalse(adapter.detectionRegExp.test('"{specField}": "{majorVersion}.{minorPlusOne}.0"'));
      assert.isFalse(adapter.detectionRegExp.test('"{specField}": "{majorPlusOne}.0.0"'));
    });

    specify('should detect version ranges in forward compatible way', function () {
      assert.isTrue(adapter.detectionRegExp.test('"{specField}": "{majorVersion}.{minorVersion}.0"'));
      assert.isTrue(adapter.detectionRegExp.test('"{specField}": "{majorVersion}.{minorVersion}.145"'));
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
      const mediaType = await parser.findMediaType('{"{specField}": "{example-version}"}');

      assert.strictEqual(mediaType, '{expected-media-type}');
    });
  });
});
```

**Critical**: OpenAPI 3.2.0 testing revealed that testing `mediaTypes.latest()` directly is not recommended. Always test media type detection through the parser integration using `ApiDOMParser.findMediaType()`.

**test/fixtures/sample-spec.json**:
- Copy a minimal valid specification document from the namespace tests or create one

## YAML Parser Adapter Tests (Phase 5.5)

### 5.5 Generate Tests

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

    specify('should detect patch version bump', async function () {
      assert.isTrue(await adapter.detect('{specField}: {majorVersion}.{minorVersion}.145'));
    });

    specify('should not detect minor version bump', async function () {
      assert.isFalse(await adapter.detect('{specField}: {majorVersion}.{minorPlusOne}.0'));
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
      assert.isFalse(adapter.detectionRegExp.test('{specField}: {majorVersion}.{minorVersion}.x'));
      assert.isFalse(adapter.detectionRegExp.test('{specField}: {majorVersion}.{minorPlusOne}.0'));
    });

    specify('should detect version ranges in forward compatible way', function () {
      assert.isTrue(adapter.detectionRegExp.test('{specField}: {majorVersion}.{minorVersion}.0'));
      assert.isTrue(adapter.detectionRegExp.test('{specField}: {majorVersion}.{minorVersion}.145'));
    });
  });
});
```
