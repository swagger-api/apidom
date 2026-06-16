import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert, expect } from 'chai';
import { isParseResultElement, sexprs } from '@swagger-api/apidom-core';
import { isAgentCardElement } from '@swagger-api/apidom-ns-a2a-1';

import * as adapter from '../src/adapter.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const yamlSpec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-agent-card.yaml'))
  .toString();

describe('adapter', function () {
  context('given AgentCard definition in YAML 1.2 format', function () {
    specify('should detect as A2A AgentCard', async function () {
      assert.isTrue(await adapter.detect(yamlSpec));
    });

    specify('should detect minimal YAML with both keys', async function () {
      assert.isTrue(await adapter.detect('capabilities: {}\nskills: []\n'));
    });

    specify('should NOT detect when only capabilities is present', async function () {
      assert.isFalse(await adapter.detect('capabilities: {}\n'));
    });

    specify('should NOT detect an Arazzo workflow', async function () {
      assert.isFalse(await adapter.detect('arazzo: 1.0.1\ninfo:\n  title: x\n  version: 1.0\n'));
    });
  });

  context('given AgentCard definition in JSON format (YAML 1.2 is a superset)', function () {
    specify('should also detect JSON', async function () {
      const jsonSrc =
        '{"capabilities": {"streaming": true}, "skills": [], "name": "test", "url": "https://x", "version": "1.0.0"}';
      assert.isTrue(await adapter.detect(jsonSrc));
    });
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(yamlSpec, { sourceMap: true });

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

  context('detectionRegExp', function () {
    specify('should match a YAML document with capabilities key', function () {
      assert.isTrue(adapter.detectionRegExp.test('capabilities:\n  streaming: true\n'));
    });

    specify('should match a YAML document with skills key', function () {
      assert.isTrue(adapter.detectionRegExp.test('skills:\n  - id: a\n'));
    });

    specify('should match a JSON document with capabilities object', function () {
      assert.isTrue(adapter.detectionRegExp.test('{"capabilities": {}}'));
    });
  });
});
