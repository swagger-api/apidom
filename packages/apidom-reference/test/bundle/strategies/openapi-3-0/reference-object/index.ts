import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { mediaTypes, isOpenApi3_0Element } from '@swagger-api/apidom-ns-openapi-3-0';
import { isParseResultElement, toValue } from '@swagger-api/apidom-core';

import { bundle, parse } from '../../../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootFixturePath = path.join(__dirname, 'fixtures');

describe('bundle', function () {
  context('strategies', function () {
    context('openapi-3-0', function () {
      context('Reference Object', function () {
        context('given Reference Objects pointing internally and externally', function () {
          const fixturePath = path.join(rootFixturePath, 'internal-external');
          const rootFilePath = path.join(fixturePath, 'root.json');

          specify('should return the document unchanged', async function () {
            const mediaType = mediaTypes.latest('json');
            const parseResult = await parse(rootFilePath, { parse: { mediaType } });
            const bundled = await bundle(rootFilePath, { parse: { mediaType } });

            assert.isTrue(isParseResultElement(bundled));
            assert.isTrue(isOpenApi3_0Element(bundled.api));
            assert.deepEqual(toValue(bundled), toValue(parseResult));
          });

          specify('should detect OpenAPI 3.0 without a media type', async function () {
            const bundled = await bundle(rootFilePath);

            assert.isTrue(isOpenApi3_0Element(bundled.api));
          });
        });
      });
    });
  });
});
