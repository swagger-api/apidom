import path from 'node:path';
import { assert } from 'chai';
import { mediaTypes, isParameterElement } from '@swagger-api/apidom-ns-asyncapi-2';
import { evaluate } from '@swagger-api/apidom-json-pointer';

import { parse, dereferenceApiDOM } from '../../../../../src';

describe('dereference', function () {
  context('strategies', function () {
    context('asyncapi-2', function () {
      context('Reference Object', function () {
        context('given single ReferenceElement passed to dereferenceApiDOM', function () {
          const fixturePath = path.join(__dirname, 'fixtures', 'external-only', 'root.json');

          specify('should dereference', async function () {
            const parseResult = await parse(fixturePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const referenceElement = evaluate(
              '/components/parameters/externalRef',
              parseResult.api as any,
            );
            const dereferenced = await dereferenceApiDOM(referenceElement, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { baseURI: fixturePath },
            });

            assert.isTrue(isParameterElement(dereferenced));
          });

          specify('should dereference and contain metadata about origin', async function () {
            const parseResult = await parse(fixturePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const referenceElement = evaluate(
              '/components/parameters/externalRef',
              parseResult.api as any,
            );
            const dereferenced = await dereferenceApiDOM(referenceElement, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { baseURI: fixturePath },
            });

            assert.match(dereferenced.meta.get('ref-origin').toValue(), /external-only\/ex\.json$/);
          });
        });
      });
    });
  });
});
