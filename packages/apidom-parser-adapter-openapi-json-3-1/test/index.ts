import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { isParseResultElement } from 'apidom';
import { isOpenApi3_1Element } from 'apidom-ns-openapi-3-1';

import * as adapter from '../src/adapter';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();

describe('apidom-parser-adapter-asyncapi-openapi-3-1', function () {
  it('should detect proper media type', function () {
    assert.isTrue(adapter.detect(spec));
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(spec, { sourceMap: true });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isOpenApi3_1Element(parseResult.api));
  });
});
