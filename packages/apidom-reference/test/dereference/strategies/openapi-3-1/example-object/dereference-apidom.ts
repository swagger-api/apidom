import path from 'node:path';
import { assert } from 'chai';
import {
  mediaTypes,
  ExampleElement,
  isExampleElement,
  OpenApi3_1Element,
} from '@swagger-api/apidom-ns-openapi-3-1';
import { toValue } from '@swagger-api/apidom-core';
import { evaluate } from '@swagger-api/apidom-json-pointer';
import { fileURLToPath } from 'node:url';

import { parse, dereferenceApiDOM } from '../../../../../src';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-1', function () {
      context('Example Object', function () {
        context('given single ExampleElement passed to dereferenceApiDOM', function () {
          const fixturePath = path.join(__dirname, 'fixtures', 'external-value-json', 'root.json');

          specify('should dereference', async function () {
            const parseResult = await parse(fixturePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const exampleElement = evaluate(
              '/components/examples/example1',
              parseResult.api as OpenApi3_1Element,
            );
            const dereferenced = await dereferenceApiDOM(exampleElement, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { baseURI: fixturePath },
            });

            assert.isTrue(isExampleElement(dereferenced));
          });

          specify('should dereference and contain metadata about origin', async function () {
            const parseResult = await parse(fixturePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const exampleElement = evaluate(
              '/components/examples/example1',
              parseResult.api as OpenApi3_1Element,
            );
            const dereferenced = (await dereferenceApiDOM(exampleElement, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { baseURI: fixturePath },
            })) as ExampleElement;

            assert.match(
              toValue(dereferenced.value?.meta.get('ref-origin')),
              /external-value-json\/ex\.json$/,
            );
          });
        });
      });
    });
  });
});
