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
        context('given parsed OpenApi 3.1.x document with single external reference', function () {
          let parseResult: ParseResultElement;
          let rootPath: string;
          let rootData: string;

          beforeEach(async function () {
            rootPath = path.join(__dirname, 'fixtures', 'single-external-reference', 'root.json');
            rootData = fs.readFileSync(rootPath).toString();
            parseResult = await adapter.parse(rootData);
          });

          specify('should have 2 references in reference set', async function () {
            const refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });

            assert.strictEqual(refSet.size, 2);
          });

          specify('should have root reference set to baseURI', async function () {
            const refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });
            const { rootRef } = refSet;

            assert.match(rootRef.uri, /root\.json$/);
          });

          context('given 1st reference', function () {
            specify('should be identical as root reference', async function () {
              const refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });
              const { rootRef } = refSet;
              const refSetIterator = refSet.values();

              assert.strictEqual(refSetIterator.next().value, rootRef);
            });

            specify('should have expected resolved value', async function () {
              const refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });
              const refSetIterator = refSet.values();
              const { value: firstReference } = refSetIterator.next();

              assert.isTrue(firstReference.value.first.equals(JSON.parse(rootData)));
            });
          });

          context('given 2nd reference', function () {
            specify('should have expected URI', async function () {
              const refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });
              const refSetIterator = refSet.values();
              refSetIterator.next();

              assert.match(
                refSetIterator.next().value.uri,
                /test\/strategies\/openapi-3-1\/resolve\/fixtures\/single-external-reference\/ex1\.json$/,
              );
            });

            specify('should have expected resolved value', async function () {
              const refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });
              const refSetIterator = refSet.values();
              refSetIterator.next();
              const { value: secondReference } = refSetIterator.next();

              assert.isTrue(secondReference.value.first.equals({}));
            });
          });
        });

        context('given parsed OpenApi 3.1.x document with no external reference', function () {
          let parseResult: ParseResultElement;
          let rootPath: string;
          let rootData: string;

          beforeEach(async function () {
            rootPath = path.join(__dirname, 'fixtures', 'no-external-reference', 'root.json');
            rootData = fs.readFileSync(rootPath).toString();
            parseResult = await adapter.parse(rootData);
          });

          specify('should have 1 references in reference set', async function () {
            const refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });

            assert.strictEqual(refSet.size, 1);
          });

          specify('should have root reference set to baseURI', async function () {
            const refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });
            const { rootRef } = refSet;

            assert.match(rootRef.uri, /root\.json$/);
          });

          context('given 1st reference', function () {
            specify('should be identical as root reference', async function () {
              const refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });
              const { rootRef } = refSet;
              const refSetIterator = refSet.values();

              assert.strictEqual(refSetIterator.next().value, rootRef);
            });

            specify('should have expected resolved value', async function () {
              const refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });
              const refSetIterator = refSet.values();
              const { value: firstReference } = refSetIterator.next();

              assert.isTrue(firstReference.value.first.equals(JSON.parse(rootData)));
            });
          });
        });
      });
    });
  });
});
