import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { isParseResultElement } from 'apidom';
import { isAsyncApi2Element } from 'apidom-ns-asyncapi-2';

import * as adapter from '../src/adapter';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.yaml')).toString();

describe('apidom-parser-adapter-asyncapi-yaml-2', function () {
  it('should detect proper media type', function () {
    assert.isTrue(adapter.detect(spec));
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(spec, { sourceMap: true });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isAsyncApi2Element(parseResult.api));
  });
});
