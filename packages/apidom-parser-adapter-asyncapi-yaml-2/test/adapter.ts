import fs from 'node:fs';
import path from 'node:path';
import { assert, expect } from 'chai';
import dedent from 'dedent';
import { isParseResultElement, SourceMapElement, sexprs } from '@swagger-api/apidom-core';
import { isAsyncApi2Element } from '@swagger-api/apidom-ns-asyncapi-2';

import * as adapter from '../src/adapter';

const yamlSpec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.yaml')).toString();
const jsonSpec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();

describe('adapter', function () {
  context('given definition in YAML 1.2 format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(yamlSpec));
    });

    specify('should detect minor version bump', async function () {
      assert.isTrue(await adapter.detect('asyncapi: "2.25.0"'));
    });

    specify('should detect patch version bump', async function () {
      assert.isTrue(await adapter.detect('asyncapi: "2.6.1"'));
    });

    specify('should detect minor and patch version bump', async function () {
      assert.isTrue(await adapter.detect('asyncapi: "2.25.1"'));
    });
  });

  context('given definition in JSON format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(jsonSpec));
    });
  });

  context('given definition of unknown type', function () {
    specify('should detect proper media type', async function () {
      assert.isFalse(await adapter.detect('"openapi": "3.1.0"'));
    });
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(yamlSpec, { sourceMap: true });

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

  context('given invalid yaml file', function () {
    specify('should return empty parser result', async function () {
      const parseResult = await adapter.parse(' %YAML x ', { sourceMap: true });

      assert.isTrue(parseResult.isEmpty);
    });
  });

  context('given YAML with empty node', function () {
    specify('should generate source maps', async function () {
      const yamlSource = dedent`
        asyncapi: 2.6.0
        info:
      `;

      const { result } = await adapter.parse(yamlSource, { sourceMap: true });
      // @ts-ignore
      const infoValue = result.get('info');
      const sourceMap = infoValue.meta.get('sourceMap');
      const { positionStart, positionEnd } = sourceMap;
      const expectedEmptyPosition = [1, 5, 21];

      assert.instanceOf(sourceMap, SourceMapElement);
      assert.isTrue(positionStart.equals(expectedEmptyPosition));
      assert.isTrue(positionEnd.equals(expectedEmptyPosition));
    });
  });

  context('detectionRegExp', function () {
    specify('should detect version ranges in forward compatible way', function () {
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.0.0'));
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.0.145'));
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.1.0'));
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.1.145'));
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.2.0'));
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.2.145'));
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.3.0'));
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.3.1'));
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.4.0'));
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.4.1'));
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.5.0'));
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.5.1'));
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.6.0'));
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 2.6.1'));
    });

    specify('should reject invalid version ranges', function () {
      assert.isFalse(adapter.detectionRegExp.test('asyncapi: 3.0.0'));
      assert.isFalse(adapter.detectionRegExp.test('asyncapi: 3.1.0'));
      assert.isFalse(adapter.detectionRegExp.test('asyncapi: 3.1.1'));
      assert.isFalse(adapter.detectionRegExp.test('asyncapi: 2.01.0'));
      assert.isFalse(adapter.detectionRegExp.test('asyncapi: 2.1.013'));
      assert.isFalse(adapter.detectionRegExp.test('asyncapi: 2.1.013 '));
    });
  });
});
