import fs from 'node:fs';
import path from 'node:path';
import { assert, expect } from 'chai';
import { isObjectElement, isParseResultElement, sexprs } from '@swagger-api/apidom-core';

import * as adapter from '../src/adapter-browser';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-data.yaml')).toString();

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

  context('given valid YAML 1.2', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(await adapter.detect(spec));
    });
  });

  context('given non YAML 1.2', function () {
    specify('should detect proper media type', async function () {
      assert.isFalse(await adapter.detect('test : test : test'));
    });
  });

  context('given invalid(1) YAML 1.2', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(
        await adapter.detect(`
        openapi: 3.1.0
        info:
          summary: Update an existing pet
          desc
          title: test title
      `),
      );
    });
  });

  context('given invalid(2) YAML 1.2', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(
        await adapter.detect(`
        asyncapi: 2.4.0
        info:
          version: '1.0.0'
           title: Something # Badly indented
      `),
      );
    });
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(spec, {
      sourceMap: true,
    });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isObjectElement(parseResult.result));
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

  context('given YAML 1.2 containing a syntax error(1)', function () {
    specify('return YAML Syntax error as an annotation in parsing result', async function () {
      const syntaxErrorSpec = `
        asyncapi: 2.4.0
        info:
          version: '1.0.0'
           title: Something # Badly indented
      `;

      const parseResult = await adapter.parse(syntaxErrorSpec, { sourceMap: true });

      assert.isTrue(parseResult.errors.toValue()[0] === '(Error YAML syntax error)');
    });
  });

  context('given YAML 1.2 containing a syntax error(2)', function () {
    specify('return YAML Syntax error as an annotation in parsing result', async function () {
      const syntaxErrorSpec = `
        asyncapi: 2.4.0
        info:
          version: '1.0.0'
          title Something # Missing mapping
      `;

      const parseResult = await adapter.parse(syntaxErrorSpec, { sourceMap: true });

      assert.isTrue(parseResult.errors.toValue()[0] === '(Error YAML syntax error)');
    });
  });
});
