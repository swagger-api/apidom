import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert, expect } from 'chai';
import { isParseResultElement, sexprs } from '@swagger-api/apidom-core';
import { isJSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-2020-12';

import * as adapter from '../src/adapter.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonSpec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'json-schema-2020-12.json'))
  .toString();
const yamlSpec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'json-schema-2020-12.yaml'))
  .toString();

describe('adapter', function () {
  context('given definition in JSON format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(jsonSpec));
    });
  });

  context('given definition in YAML 1.2 format', function () {
    specify('should detect proper media type', async function () {
      assert.isFalse(await adapter.detect(yamlSpec));
    });
  });

  context('given definition of unknown type', function () {
    specify('should detect proper media type', async function () {
      assert.isFalse(await adapter.detect('"asyncapi": "2.6.0"'));
    });
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(jsonSpec, { sourceMap: true });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isJSONSchemaElement(parseResult.content[0]));
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
    specify('should reject invalid schema versions', function () {
      assert.isFalse(
        adapter.detectionRegExp.test('$schema: http://json-schema.org/draft-04/schema#'),
      );
      assert.isFalse(
        adapter.detectionRegExp.test('$schema: http://json-schema.org/draft-06/schema#'),
      );
      assert.isFalse(
        adapter.detectionRegExp.test('openapi: http://json-schema.org/draft-07/schema#'),
      );
      assert.isFalse(
        adapter.detectionRegExp.test('openapi: https://json-schema.org/draft/07/schema'),
      );
      assert.isFalse(
        adapter.detectionRegExp.test('$schema: https://json-schema.org/draft/2019-09/schema'),
      );
    });
  });
});
