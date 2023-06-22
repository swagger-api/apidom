import fs from 'node:fs';
import path from 'node:path';
import { expect, assert } from 'chai';
import { sexprs, isObjectElement, isParseResultElement } from '@swagger-api/apidom-core';

import * as adapter from '../src/adapter-browser';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-data.json')).toString();

describe('adapter-browser', function () {
  /**
   * We don't want web-tree-sitter to use `fetch` interface,
   * we want to it to use `node:fs`, so we make the `fetch` unavailable.
   */
  let { fetch } = globalThis;

  beforeEach(function () {
    fetch = globalThis.fetch;
    // @ts-ignore
    delete globalThis.fetch;
  });

  afterEach(function () {
    globalThis.fetch = fetch;
  });

  context('given valid JSON', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(spec));
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
