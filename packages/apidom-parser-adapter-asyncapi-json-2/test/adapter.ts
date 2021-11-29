import fs from 'fs';
import path from 'path';
import { assert, expect } from 'chai';
import { isParseResultElement, sexprs } from '@swagger-api/apidom-core';
import { isAsyncApi2Element } from '@swagger-api/apidom-ns-asyncapi-2';

import * as adapter from '../src/adapter';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();

describe('adapter', function () {
  it('should detect proper media type', function () {
    assert.isTrue(adapter.detect(spec));
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(spec, { sourceMap: true });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isAsyncApi2Element(parseResult.api));
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
});
