import { assert } from 'chai';
import fs from 'fs';
import path from 'path';
// @ts-ignore
import * as adapter from 'apidom-parser-adapter-openapi-json-3-1';

import resolve from '../../../../src/strategies/openapi-3-1/resolve/resolve-reference-objects';

describe('strategies', function () {
  context('openapi-3-1', function () {
    context('resolve', function () {
      context('resolve-reference-objects', function () {
        context('given parsed OpenApi 3.1.x document with single reference', function () {
          specify('should have 2 references in reference map', async function () {
            const jsonDataPath = path.join(__dirname, 'fixtures', 'single-external-reference.json');
            const jsonData = fs.readFileSync(jsonDataPath).toString();
            const parseResult = await adapter.parse(jsonData);
            const refMap = resolve(parseResult);

            assert.strictEqual(refMap.length, 2);
          });
        });
      });
    });
  });
});
