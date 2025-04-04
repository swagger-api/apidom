import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert, expect } from 'chai';
import { isParseResultElement, sexprs } from '@swagger-api/apidom-core';
import { isArazzoSpecification1Element } from '@swagger-api/apidom-ns-arazzo-1';

import * as adapter from '../src/adapter.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonSpec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-workflow.json'))
  .toString();
const yamlSpec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-workflow.yaml'))
  .toString();

describe('adapter', function () {
  context('given definition in JSON format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(jsonSpec));
    });

    specify('should detect minor version bump', async function () {
      assert.isTrue(await adapter.detect('{"arazzo": "1.1.0"}'));
    });

    specify('should detect patch version bump', async function () {
      assert.isTrue(await adapter.detect('{"arazzo": "1.0.1"}'));
    });

    specify('should not detect major version bump', async function () {
      assert.isFalse(await adapter.detect('{"arazzo": "2.0.0"}'));
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
    assert.isTrue(isArazzoSpecification1Element(parseResult.api));
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
      assert.isFalse(adapter.detectionRegExp.test('arazzo: 1.01.0'));
      assert.isFalse(adapter.detectionRegExp.test('arazzo: 1.0.x'));
      assert.isFalse(adapter.detectionRegExp.test('arazzo: 3.1.0'));
    });

    specify('should detect version ranges in forward compatible way', function () {
      assert.isTrue(adapter.detectionRegExp.test('"arazzo": "1.0.0"'));
      assert.isTrue(adapter.detectionRegExp.test('"arazzo": "1.0.145"'));
      assert.isTrue(adapter.detectionRegExp.test('"arazzo": "1.1.0"'));
    });
  });
});
