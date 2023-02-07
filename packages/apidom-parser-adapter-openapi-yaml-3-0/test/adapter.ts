import fs from 'node:fs';
import path from 'node:path';
import { assert, expect } from 'chai';
import dedent from 'dedent';
import { isParseResultElement, SourceMapElement, sexprs } from '@swagger-api/apidom-core';
import { isOpenApi3_0Element } from '@swagger-api/apidom-ns-openapi-3-0';

import * as adapter from '../src/adapter';

const jsonSpec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
const yamlSpec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.yaml')).toString();

describe('adapter', function () {
  context('given definition in YAML 1.2 format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(yamlSpec));
    });

    specify('should not detect minor version bump', async function () {
      assert.isFalse(await adapter.detect('openapi: "3.1.0"'));
    });

    specify('should not detect patch version bump', async function () {
      assert.isFalse(await adapter.detect('openapi: "3.0.4"'));
    });

    specify('should not detect minor and patch version bump', async function () {
      assert.isFalse(await adapter.detect('openapi: "3.1.4"'));
    });
  });

  context('given definition in JSON format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(jsonSpec));
    });
  });

  context('given definition of unknown type', function () {
    specify('should detect proper media type', async function () {
      assert.isFalse(await adapter.detect('"asyncapi": "2.6.0"'));
    });
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(yamlSpec, { sourceMap: true });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isOpenApi3_0Element(parseResult.api));
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
        mapping:
          sub-mapping:
      `;

      const { result } = await adapter.parse(yamlSource, { sourceMap: true });
      // @ts-ignore
      const subMappingValue = result.get('mapping').get('sub-mapping');

      assert.instanceOf(subMappingValue.meta.get('sourceMap'), SourceMapElement);
    });
  });

  context('detectionRegExp', function () {
    specify('should reject invalid version ranges', function () {
      assert.isFalse(adapter.detectionRegExp.test('openapi: 3.01.0'));
      assert.isFalse(adapter.detectionRegExp.test('openapi: 3.0.01'));
      assert.isFalse(adapter.detectionRegExp.test('openapi: 3.1.0'));
      assert.isFalse(adapter.detectionRegExp.test('openapi: 3.1.1'));
      assert.isFalse(adapter.detectionRegExp.test('openapi: 3.0.15'));
    });
  });
});
