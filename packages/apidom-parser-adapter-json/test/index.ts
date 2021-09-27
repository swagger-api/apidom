import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { isObjectElement, isParseResultElement } from '@swagger-api/apidom-core';

import * as adapter from '../src/adapter-node';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-data.json')).toString();

describe('apidom-parser-adapter-json', function () {
  it('should detect proper media type', async function () {
    assert.isTrue(await adapter.detect(spec));
  });

  it('should parse', async function () {
    const parseResult = await adapter.parse(spec, {
      syntacticAnalysis: 'direct',
      sourceMap: true,
    });

    assert.isTrue(isParseResultElement(parseResult));
    assert.isTrue(isObjectElement(parseResult.result));
  });
});
