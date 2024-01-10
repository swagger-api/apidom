import { assert } from 'chai';
import fs from 'node:fs';
import path from 'node:path';
import * as apiDOM from '@swagger-api/apidom-core';
import { isOpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';
import * as openapi3_1Adapter from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
import * as yamlAdapter from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import ApiDOMParser, { ParserError } from '../src/parser';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();

describe('apidom-parser', function () {
  it('should parse', async function () {
    const parser = new ApiDOMParser().use(openapi3_1Adapter);
    const parseResult = await parser.parse(spec);

    assert.isTrue(apiDOM.isParseResultElement(parseResult));
    assert.isTrue(isOpenApi3_1Element(parseResult.api));
  });

  it('should throw error', async function () {
    const source = 'test: !!!test';
    const parser = new ApiDOMParser().use(yamlAdapter);

    try {
      await parser.parse(source);
      assert.fail('should throw ParserError');
    } catch (error: unknown) {
      if (error instanceof ParserError) {
        assert.instanceOf(error, ParserError);
        assert.strictEqual(error.source, source);
        assert.deepEqual(error.parserOptions, {});
      } else {
        assert.fail('should throw ParserError');
      }
    }
  });
});
