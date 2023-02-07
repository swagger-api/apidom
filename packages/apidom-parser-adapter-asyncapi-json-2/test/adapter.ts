import fs from 'node:fs';
import path from 'node:path';
import { assert, expect } from 'chai';
import { isParseResultElement, sexprs } from '@swagger-api/apidom-core';
import { isAsyncApi2Element } from '@swagger-api/apidom-ns-asyncapi-2';

import * as adapter from '../src/adapter';

const jsonSpec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
const yamlSpec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.yaml')).toString();

describe('adapter', function () {
  context('given definition in JSON format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(jsonSpec));
    });

    specify('should detect minor version bump', async function () {
      assert.isTrue(await adapter.detect('{"asyncapi": "2.25.0"}'));
    });

    specify('should detect patch version bump', async function () {
      assert.isTrue(await adapter.detect('{"asyncapi": "2.6.1"}'));
    });

    specify('should detect minor and patch version bump', async function () {
      assert.isTrue(await adapter.detect('{"asyncapi": "2.25.1"}'));
    });
  });

  context('given definition in YAML 1.2 format', function () {
    specify('should detect proper media type', async function () {
      assert.isFalse(await adapter.detect(yamlSpec));
    });
  });

  context('given definition of unknown type', function () {
    specify('should detect proper media type', async function () {
      assert.isFalse(await adapter.detect('"openapi": "3.1.0"'));
    });
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(jsonSpec, { sourceMap: true });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isAsyncApi2Element(parseResult.api));
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
    specify('should detect version ranges in forward compatible way', function () {
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.0.0"'));
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.0.145"'));
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.1.0"'));
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.1.145"'));
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.2.0"'));
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.2.145"'));
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.3.0"'));
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.3.1"'));
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.4.0"'));
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.4.1"'));
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.5.0"'));
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.5.1"'));
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.6.0"'));
      assert.isTrue(adapter.detectionRegExp.test('"asyncapi": "2.6.1"'));
    });

    specify('should reject invalid version ranges', function () {
      assert.isFalse(adapter.detectionRegExp.test('"asyncapi": "3.0.0"'));
      assert.isFalse(adapter.detectionRegExp.test('"asyncapi": "3.1.0"'));
      assert.isFalse(adapter.detectionRegExp.test('"asyncapi": "3.1.1"'));
      assert.isFalse(adapter.detectionRegExp.test('"asyncapi": "2.01.0"'));
      assert.isFalse(adapter.detectionRegExp.test('"asyncapi": "2.1.01"'));
    });
  });
});
