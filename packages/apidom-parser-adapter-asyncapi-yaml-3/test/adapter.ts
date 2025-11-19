import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert, expect } from 'chai';
import dedent from 'dedent';
import { isParseResultElement, sexprs } from '@swagger-api/apidom-core';
import { isAsyncApi3Element } from '@swagger-api/apidom-ns-asyncapi-3';

import * as adapter from '../src/adapter.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const yamlSpec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.yaml')).toString();
const jsonSpec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();

describe('adapter', function () {
  context('given definition in YAML 1.2 format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(yamlSpec));
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

  // TODO: Fix and enable
  // eslint-disable-next-line mocha/no-skipped-tests
  xit('should parse', async function () {
    const parseResult = await adapter.parse(yamlSpec, { sourceMap: true });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isAsyncApi3Element(parseResult.api));
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
        asyncapi: 3.0.0
        info:
      `;

      const { result } = await adapter.parse(yamlSource, { sourceMap: true });
      // @ts-ignore
      const infoValue = result.get('info');

      expect(infoValue?.startPositionRow).to.equal(1);
      expect(infoValue?.startPositionColumn).to.equal(5);
      expect(infoValue?.startIndex).to.equal(21);
      expect(infoValue?.endPositionRow).to.equal(1);
      expect(infoValue?.endPositionColumn).to.equal(5);
      expect(infoValue?.endIndex).to.equal(21);
    });
  });

  context('detectionRegExp', function () {
    specify('should detect version', function () {
      assert.isTrue(adapter.detectionRegExp.test('asyncapi: 3.0.0'));
    });

    specify('should reject invalid version ranges', function () {
      assert.isFalse(adapter.detectionRegExp.test('asyncapi: 2.01.0'));
      assert.isFalse(adapter.detectionRegExp.test('asyncapi: 2.1.013'));
      assert.isFalse(adapter.detectionRegExp.test('asyncapi: 2.1.013 '));
    });
  });
});
