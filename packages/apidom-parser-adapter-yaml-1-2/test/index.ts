import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { isObjectElement, isParseResultElement } from 'apidom';

import * as adapter from '../src/adapter-node';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-data.yaml')).toString();

describe('apidom-parser-adapter-yaml-1-2', function () {
  it('should not detect proper media type', function () {
    assert.isFalse(adapter.detect(spec));
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(spec, {
      sourceMap: true,
    });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isObjectElement(parseResult.result));
  });
});
