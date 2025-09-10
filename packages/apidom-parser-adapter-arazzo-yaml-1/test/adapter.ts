import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert, expect } from 'chai';
import dedent from 'dedent';
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
  context('given definition in YAML 1.2 format', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(yamlSpec));
    });

    specify('should detect minor version bump', async function () {
      assert.isTrue(await adapter.detect('arazzo: "1.1.0"'));
    });

    specify('should detect patch version bump', async function () {
      assert.isTrue(await adapter.detect('arazzo: "1.0.1"'));
    });

    specify('should detect minor and patch version bump', async function () {
      assert.isTrue(await adapter.detect('arazzo: "1.1.1"'));
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

  context('given invalid yaml file', function () {
    specify('should return empty parser result', async function () {
      const parseResult = await adapter.parse(' %YAML x ', { sourceMap: true });

      assert.isTrue(parseResult.isEmpty);
    });
  });

  context('given YAML with empty node', function () {
    specify('should generate source maps', async function () {
      const yamlSource = dedent`
          arazzo: 1.0.0
          info:
        `;

      const { result } = await adapter.parse(yamlSource, { sourceMap: true });
      // @ts-ignore
      const infoValue = result.get('info');

      expect(infoValue?.startPositionRow).to.equal(1);
      expect(infoValue?.startPositionColumn).to.equal(5);
      expect(infoValue?.startIndex).to.equal(19);
      expect(infoValue?.endPositionRow).to.equal(1);
      expect(infoValue?.endPositionColumn).to.equal(5);
      expect(infoValue?.endIndex).to.equal(19);
    });
  });

  context('detectionRegExp', function () {
    specify('should detect version ranges in forward compatible way', function () {
      assert.isTrue(adapter.detectionRegExp.test('"arazzo": "1.0.0"'));
      assert.isTrue(adapter.detectionRegExp.test('"arazzo": "1.0.1"'));
      assert.isTrue(adapter.detectionRegExp.test('"arazzo": "1.0.145"'));
      assert.isTrue(adapter.detectionRegExp.test('"arazzo": "1.1.0"'));
    });

    specify('should reject invalid version ranges', function () {
      assert.isFalse(adapter.detectionRegExp.test('arazzo: 1.01.0'));
      assert.isFalse(adapter.detectionRegExp.test('arazzo: 1.0.x'));
      assert.isFalse(adapter.detectionRegExp.test('arazzo: 3.1.0'));
    });
  });
});
