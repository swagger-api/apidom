import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { isParseResultElement, toValue } from '@swagger-api/apidom-core';
import { isJSONSchemaElement, mediaTypes } from '@swagger-api/apidom-ns-json-schema-2020-12';

import { bundle } from '../../../../../src/index.ts';
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
      });
    });
  });
});
