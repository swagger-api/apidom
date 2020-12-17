import { assert } from 'chai';
import fs from 'fs';
import path from 'path';
import { ParseResultElement } from 'apidom';
// @ts-ignore
import * as adapter from 'apidom-parser-adapter-openapi-json-3-1';

import resolve from '../../../../src/strategies/openapi-3-1/resolve/resolve-reference-objects';

describe('strategies', function () {
  context('openapi-3-1', function () {
    context('resolve', function () {
      context('resolve-reference-objects', function () {
        context('given parsed OpenApi 3.1.x document with single reference', function () {
          let parseResult: ParseResultElement;

          beforeEach(async function () {
            const jsonDataPath = path.join(__dirname, 'fixtures', 'single-external-reference.json');
            const jsonData = fs.readFileSync(jsonDataPath).toString();
            parseResult = await adapter.parse(jsonData);
          });

          specify('should have 2 references in reference map', async function () {
            const refSet = resolve(parseResult);

            assert.strictEqual(refSet.size, 2);
          });

          specify('should have root reference with CWD as URI', function () {
            const refSet = resolve(parseResult);
            const { rootRef } = refSet;

            assert.match(rootRef.uri, /apidom-reference\/$/);
          });

          specify('should have 1st reference as root reference', function () {
            const refSet = resolve(parseResult);
            const { rootRef } = refSet;
            const refSetIterator = refSet.values();

            assert.strictEqual(refSetIterator.next().value, rootRef);
          });

          specify('should have 2nd reference with expected URI', function () {
            const refSet = resolve(parseResult);
            const refSetIterator = refSet.values();
            refSetIterator.next();

            assert.strictEqual(
              refSetIterator.next().value.uri,
              'https://swagger.io/path/to/file.json',
            );
          });
        });
      });
    });
  });
});
