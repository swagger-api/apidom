import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert, expect } from 'chai';
import dedent from 'dedent';
import { isParseResultElement, hasElementSourceMap, sexprs } from '@swagger-api/apidom-core';
import { isJSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-2020-12';

import * as adapter from '../src/adapter.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonSpec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'json-schema-2020-12.json'))
  .toString();
const yamlSpec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'json-schema-2020-12.yaml'))
  .toString();

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

  context('given definition with an empty fragment in $schema', function () {
    specify('should detect proper media type', async function () {
      assert.isTrue(
        await adapter.detect(
          '$schema: https://json-schema.org/draft/2020-12/schema#\ntype: object',
        ),
      );
    });
  });

  context('given definition in a multi-line YAML flow mapping', function () {
    specify('should detect proper media type', async function () {
      const id = 'https://json-schema.org/draft/2020-12/schema';

      assert.isTrue(await adapter.detect(`{\n$schema: ${id},\ntype: object\n}`));
      assert.isTrue(await adapter.detect(`{\n$schema: ${id}#,\ntype: object\n}`));
      assert.isTrue(await adapter.detect(`{\ntype: object,\n$schema: ${id}}`));
      assert.isTrue(await adapter.detect(`{\ntype: object,\n$schema: ${id}# }`));
    });
  });

  context('given definition of unknown type', function () {
    specify('should detect proper media type', async function () {
      assert.isFalse(await adapter.detect('"asyncapi": "2.6.0"'));
    });
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(yamlSpec, { sourceMap: true });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isJSONSchemaElement(parseResult.result));
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
        mapping:
          sub-mapping:
      `;

      const { result } = await adapter.parse(yamlSource, { sourceMap: true });
      // @ts-ignore
      const subMappingValue = result.get('mapping').get('sub-mapping');

      assert.isTrue(hasElementSourceMap(subMappingValue));
    });
  });

  context('detectionRegExp', function () {
    specify('should reject invalid schema versions', function () {
      assert.isFalse(
        adapter.detectionRegExp.test('$schema: http://json-schema.org/draft-04/schema#'),
      );
      assert.isFalse(
        adapter.detectionRegExp.test('$schema: http://json-schema.org/draft-06/schema#'),
      );
      assert.isFalse(
        adapter.detectionRegExp.test('openapi: http://json-schema.org/draft-07/schema#'),
      );
      assert.isFalse(
        adapter.detectionRegExp.test('openapi: https://json-schema.org/draft/07/schema'),
      );
      assert.isFalse(
        adapter.detectionRegExp.test('$schema: https://json-schema.org/draft/2019-09/schema'),
      );
    });

    specify('should accept the dialect identifier with or without an empty fragment', function () {
      const id = 'https://json-schema.org/draft/2020-12/schema';
      const versionOf = (source: string) => {
        const groups = source.match(adapter.detectionRegExp)?.groups;
        return groups?.version_yaml ?? groups?.version_json;
      };

      assert.strictEqual(versionOf(`$schema: ${id}`), '2020-12');
      assert.strictEqual(versionOf(`$schema: ${id}#`), '2020-12');
      assert.strictEqual(versionOf(`$schema: ${id}# # dialect`), '2020-12');
      assert.strictEqual(versionOf(`$schema: ${id}#\ntype: object`), '2020-12');
      assert.strictEqual(versionOf(`$schema: '${id}#'`), '2020-12');
      assert.strictEqual(versionOf(`$schema: "${id}#"`), '2020-12');
      assert.strictEqual(versionOf(`"$schema": "${id}#"`), '2020-12');
      assert.strictEqual(versionOf(`{ "$schema": "${id}#" }`), '2020-12');
    });

    specify('should accept flow indicators ending a plain value in flow context', function () {
      const id = 'https://json-schema.org/draft/2020-12/schema';
      const versionOf = (source: string) =>
        source.match(adapter.detectionRegExp)?.groups?.version_yaml;

      assert.strictEqual(versionOf(`{\n$schema: ${id},\ntype: object\n}`), '2020-12');
      assert.strictEqual(versionOf(`{\n$schema: ${id}#,\ntype: object\n}`), '2020-12');
      assert.strictEqual(versionOf(`{\r\n$schema: ${id} ,\r\ntype: object\r\n}`), '2020-12');
      assert.strictEqual(versionOf(`{\ntype: object,\n$schema: ${id}}`), '2020-12');
      assert.strictEqual(versionOf(`{\ntype: object,\n$schema: ${id}#}`), '2020-12');
      assert.strictEqual(versionOf(`{\ntype: object,\n$schema: ${id} }`), '2020-12');
    });

    specify('should reject suffixes of the dialect identifier in flow context', function () {
      const id = 'https://json-schema.org/draft/2020-12/schema';

      assert.isFalse(adapter.detectionRegExp.test(`{\n$schema: ${id}#/x,\ntype: object\n}`));
      assert.isFalse(adapter.detectionRegExp.test(`{\n$schema: ${id}/,\ntype: object\n}`));
      assert.isFalse(adapter.detectionRegExp.test(`{\ntype: object,\n$schema: ${id}##}`));
    });

    specify('should reject flow indicators continuing a plain value in block context', function () {
      const id = 'https://json-schema.org/draft/2020-12/schema';

      assert.isFalse(adapter.detectionRegExp.test(`$schema: ${id},`));
      assert.isFalse(adapter.detectionRegExp.test(`$schema: ${id}#,`));
      assert.isFalse(adapter.detectionRegExp.test(`$schema: ${id}}`));
      assert.isFalse(adapter.detectionRegExp.test(`type: object\n$schema: ${id},\n`));
      assert.isFalse(adapter.detectionRegExp.test(`type: object\n$schema: ${id}#}\n`));
    });

    specify('should reject other fragments and suffixes of the dialect identifier', function () {
      const id = 'https://json-schema.org/draft/2020-12/schema';

      assert.isFalse(adapter.detectionRegExp.test(`$schema: ${id}/`));
      assert.isFalse(adapter.detectionRegExp.test(`$schema: ${id}#/x`));
      assert.isFalse(adapter.detectionRegExp.test(`$schema: ${id}#/x\ntype: object`));
      assert.isFalse(adapter.detectionRegExp.test(`$schema: ${id}##`));
      assert.isFalse(adapter.detectionRegExp.test(`$schema: ${id}#x`));
      assert.isFalse(adapter.detectionRegExp.test(`$schema: '${id}#/x'`));
      assert.isFalse(adapter.detectionRegExp.test(`$schema: "${id}##"`));
      assert.isFalse(adapter.detectionRegExp.test(`{ "$schema": "${id}#/x" }`));
      assert.isFalse(
        adapter.detectionRegExp.test('$schema: http://json-schema.org/draft/2020-12/schema#'),
      );
      assert.isFalse(
        adapter.detectionRegExp.test('$schema: https://json-schema.org/draft/2019-09/schema#'),
      );
    });
  });
});
