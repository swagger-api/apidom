import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert, expect } from 'chai';
import {
  toValue,
  isObjectElement,
  isParseResultElement,
  sexprs,
  isStringElement,
} from '@swagger-api/apidom-core';

import * as adapter from '../src/adapter-browser.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
      assert.isFalse(
        await adapter.detect(`
      !!Invalid yaml:
         "some: key" :
        - "no quotes here: value"
        - list without separator
        another_key: "value" other_key: value
      [no_key]
      :another_invalid_struct!
      `),
      );
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

  context('given valid YAML 1.2 with very long mapping key', function () {
    specify('should parse', async function () {
      const parseResult = await adapter.parse(`/${'a'.repeat(256)}: test`);

      assert.isFalse(parseResult.isEmpty);
      expect(toValue(parseResult)).toMatchSnapshot();
    });
  });

  context('given invalid YAML 1.2 with indentation syntax error', function () {
    specify('should produce syntax error annotation', async function () {
      const syntaxErrorSpec = `
        asyncapi: 2.4.0
        info:
          version: '1.0.0'
           title: Something # Badly indented
      `;
      const parseResult = await adapter.parse(syntaxErrorSpec, { sourceMap: true });

      assert.isFalse(parseResult.isEmpty);
      assert.strictEqual(toValue(parseResult.errors.get(0)), '(Error YAML syntax error)');
    });
  });

  context('given invalid YAML 1.2 with missing mapping syntax error', function () {
    specify('should produce syntax error annotation', async function () {
      const syntaxErrorSpec = `
        asyncapi: 2.4.0
        info:
          version: '1.0.0'
          title Something # Missing mapping
      `;
      const parseResult = await adapter.parse(syntaxErrorSpec, { sourceMap: true });

      assert.isTrue(parseResult.isEmpty);
      assert.strictEqual(toValue(parseResult.errors.get(0)), '(Error YAML syntax error)');
    });
  });

  context('given an alias', function () {
    specify('should analyze alias as string', async function () {
      const result = await adapter.parse('*alias');
      assert.isTrue(isStringElement(result.result));
    });
  });

  context('given single-quote scalar containing only space characters', function () {
    specify('should parse all space characters', async function () {
      const result = await adapter.parse("' '");
      assert.strictEqual(result.toValue()[0], ' ');
    });
  });

  context('given double-quote scalar containing only space characters', function () {
    specify('should parse all space characters', async function () {
      const result = await adapter.parse('" "');
      assert.strictEqual(result.toValue()[0], ' ');
    });
  });
});
