import fs from 'fs';
import path from 'path';
import { assert, expect } from 'chai';
import { isParseResultElement, sexprs } from '@swagger-api/apidom-core';
import { isMainElement } from '@swagger-api/apidom-ns-api-design-systems';

import * as adapter from '../src/adapter';

const yamlSpec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'api-design-systems.yaml'))
  .toString();

const jsonSpec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'api-design-systems.json'))
  .toString();

describe('adapter', function () {
  context('given definition in YAML 1.2 format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(yamlSpec));
    });

    specify('should not detect change in version', async function () {
      assert.isFalse(await adapter.detect('version: "2021-05-08"'));
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
    const parseResult = await adapter.parse(jsonSpec, { sourceMap: true });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isMainElement(parseResult.result));
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
      const parseResult = await adapter.parse(' %YAML x ', { sourceMap: true });

      assert.isTrue(parseResult.isEmpty);
    });
  });
});
