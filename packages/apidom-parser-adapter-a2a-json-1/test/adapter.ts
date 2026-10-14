import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert, expect } from 'chai';
import { isParseResultElement, sexprs } from '@swagger-api/apidom-core';
import { isAgentCardElement } from '@swagger-api/apidom-ns-a2a-1';

import * as adapter from '../src/adapter.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonSpec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-agent-card.json'))
  .toString();

describe('adapter', function () {
  context('given AgentCard definition in JSON format', function () {
    specify('should detect as A2A AgentCard', async function () {
      assert.isTrue(await adapter.detect(jsonSpec));
    });

    specify('should detect when both capabilities and skills are present', async function () {
      assert.isTrue(await adapter.detect('{"capabilities": {}, "skills": []}'));
    });

    specify('should NOT detect when only capabilities is present', async function () {
      assert.isFalse(await adapter.detect('{"capabilities": {}}'));
    });

    specify('should NOT detect when only skills is present', async function () {
      assert.isFalse(await adapter.detect('{"skills": []}'));
    });

    specify('should NOT detect an OpenAPI document', async function () {
      assert.isFalse(await adapter.detect('{"openapi": "3.1.0", "info": {}, "paths": {}}'));
    });
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(jsonSpec, { sourceMap: true });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isAgentCardElement(parseResult.api));
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
    specify('should match a document with capabilities object', function () {
      assert.isTrue(adapter.detectionRegExp.test('{"capabilities": {}}'));
    });

    specify('should match a document with skills array', function () {
      assert.isTrue(adapter.detectionRegExp.test('{"skills": []}'));
    });

    specify('should not match unrelated content', function () {
      assert.isFalse(adapter.detectionRegExp.test('{"foo": "bar"}'));
    });
  });
});
