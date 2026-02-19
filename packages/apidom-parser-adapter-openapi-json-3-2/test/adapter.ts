import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert, expect } from 'chai';
import { isParseResultElement, sexprs } from '@swagger-api/apidom-core';
import { isOpenApi3_2Element } from '@swagger-api/apidom-ns-openapi-3-2';

import * as adapter from '../src/adapter.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonSpec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-spec.json')).toString();

describe('adapter', function () {
  context('given definition in JSON format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(jsonSpec));
    });

    specify('should detect minor version bump', async function () {
      assert.isTrue(await adapter.detect('{"openapi": "3.2.1"}'));
    });

    specify('should detect patch version bump', async function () {
      assert.isTrue(await adapter.detect('{"openapi": "3.2.145"}'));
    });

    specify('should not detect major version bump', async function () {
      assert.isFalse(await adapter.detect('{"openapi": "4.0.0"}'));
    });

    specify('should not detect minor version bump to 3.3', async function () {
      assert.isFalse(await adapter.detect('{"openapi": "3.3.0"}'));
    });
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(jsonSpec, { sourceMap: true });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isOpenApi3_2Element(parseResult.api));
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
      assert.isFalse(adapter.detectionRegExp.test('openapi: 3.01.0'));
      assert.isFalse(adapter.detectionRegExp.test('openapi: 3.2.x'));
      assert.isFalse(adapter.detectionRegExp.test('openapi: 4.0.0'));
    });

    specify('should detect version ranges in forward compatible way', function () {
      assert.isTrue(adapter.detectionRegExp.test('"openapi": "3.2.0"'));
      assert.isTrue(adapter.detectionRegExp.test('"openapi": "3.2.145"'));
    });
  });
});
