import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, assert } from 'chai';
import { sexprs, toJSON, isObjectElement, isParseResultElement } from '@swagger-api/apidom-core';

import * as adapter from '../src/adapter-node.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-data.json')).toString();

describe('adapter-node', function () {
  context('given valid JSON', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect('"string"'));
    });
  });

  context('given non JSON', function () {
    specify('should detect proper media type', async function () {
      assert.isFalse(await adapter.detect('^}'));
    });
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(spec, {
      syntacticAnalysis: 'direct',
      sourceMap: true,
    });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isObjectElement(parseResult.result));
    expect(sexprs(parseResult)).toMatchSnapshot();
  });

  context('given direct syntactic analysis', function () {
    specify('should parse', async function () {
      const json = '"line1\\nline2"';
      const { result } = await adapter.parse(json, {
        syntacticAnalysis: 'direct',
      });

      assert.strictEqual(toJSON(result!), json);
    });

    context('given zero byte empty file', function () {
      specify('should return empty parse result', async function () {
        const parseResult = await adapter.parse('', {
          sourceMap: true,
          syntacticAnalysis: 'direct',
        });

        assert.isTrue(parseResult.isEmpty);
      });
    });

    context('given non-zero byte empty file', function () {
      specify('should return empty parser result', async function () {
        const parseResult = await adapter.parse('  ', {
          sourceMap: true,
          syntacticAnalysis: 'direct',
        });

        assert.isTrue(parseResult.isEmpty);
      });
    });

    context('given invalid json file', function () {
      specify('should return empty parser result', async function () {
        const parseResult = await adapter.parse(' a ', {
          sourceMap: true,
          syntacticAnalysis: 'direct',
        });

        assert.isTrue(parseResult.isEmpty);
      });
    });
  });

  context('given indirect syntactic analysis', function () {
    context('given multi-line JSON string', function () {
      specify('should parse', async function () {
        const json = '"line1\\nline2"';
        const { result } = await adapter.parse(json, {
          syntacticAnalysis: 'indirect',
        });

        assert.strictEqual(toJSON(result!), json);
      });
    });

    context('given zero byte empty file', function () {
      specify('should return empty parse result', async function () {
        const parseResult = await adapter.parse('', {
          sourceMap: true,
          syntacticAnalysis: 'indirect',
        });

        assert.isTrue(parseResult.isEmpty);
      });
    });

    context('given non-zero byte empty file', function () {
      specify('should return empty parser result', async function () {
        const parseResult = await adapter.parse('  ', {
          sourceMap: true,
          syntacticAnalysis: 'indirect',
        });

        assert.isTrue(parseResult.isEmpty);
      });
    });

    context('given invalid json file', function () {
      specify('should return empty parser result', async function () {
        const parseResult = await adapter.parse(' a ', {
          sourceMap: true,
          syntacticAnalysis: 'indirect',
        });

        assert.isTrue(parseResult.isEmpty);
      });
    });
  });
});
