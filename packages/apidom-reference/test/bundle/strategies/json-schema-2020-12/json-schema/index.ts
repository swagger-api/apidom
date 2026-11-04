import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { isBooleanElement, isParseResultElement, toValue } from '@swagger-api/apidom-core';
import { isJSONSchemaElement, mediaTypes } from '@swagger-api/apidom-ns-json-schema-2020-12';

import { bundle, parse, Reference, ReferenceSet } from '../../../../../src/index.ts';
import { loadJsonFile } from '../../../../helpers.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootFixturePath = path.join(__dirname, 'fixtures');

describe('bundle', function () {
  context('strategies', function () {
    context('json-schema-2020-12', function () {
      context('JSON Schema', function () {
        context('given schemas pointing internally and externally', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-external');

          specify('should return the document unchanged', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const bundled = await bundle(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(rootFilePath);

            assert.isTrue(isParseResultElement(bundled));
            assert.isTrue(isJSONSchemaElement(bundled.result));
            assert.deepEqual(toValue(bundled), [expected]);
          });
        });

        context(
          'given pre-computed refSet with Boolean JSON Schema and no media type',
          function () {
            const fixturePath = path.join(rootFixturePath, 'boolean-root');

            specify('should return the document unchanged', async function () {
              const rootFilePath = path.join(fixturePath, 'root.json');
              const parseResult = await parse(rootFilePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const uri = 'https://example.com/root.json';
              const refSet = new ReferenceSet({
                refs: [new Reference({ uri, value: parseResult })],
              });
              const bundled = await bundle(uri, { bundle: { refSet } });

              assert.isTrue(isParseResultElement(bundled));
              assert.isTrue(isBooleanElement(bundled.result));
              assert.deepEqual(toValue(bundled), [true]);
            });
          },
        );
      });
    });
  });
});
