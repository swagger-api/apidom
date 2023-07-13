import path from 'node:path';
import { assert } from 'chai';
import { mediaTypes, isSchemaElement, OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';
import { evaluate } from '@swagger-api/apidom-json-pointer';

import { parse, dereferenceApiDOM, Reference, ReferenceSet } from '../../../../../src';

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-1', function () {
      context('Schema Object', function () {
        context(
          'given single SchemaElement passed to dereferenceApiDOM with internal references',
          function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'internal-only', 'root.json');

            specify('should dereference', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const schemaElement = evaluate(
                '/components/schemas/User/properties/profile',
                parseResult.api as OpenApi3_1Element,
              );
              const reference = Reference({ uri: fixturePath, parseResult });
              const refSet = ReferenceSet({ refs: [reference] });
              // @ts-ignore
              refSet.rootRef = null;

              const dereferenced = await dereferenceApiDOM(schemaElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: `${fixturePath}#/components/schemas/User/properties/profile` },
              });

              assert.isTrue(isSchemaElement(dereferenced));
            });

            specify('should dereference and contain metadata about origin', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const schemaElement = evaluate(
                '/components/schemas/User/properties/profile',
                parseResult.api as OpenApi3_1Element,
              );
              const reference = Reference({ uri: fixturePath, parseResult });
              const refSet = ReferenceSet({ refs: [reference] });
              // @ts-ignore
              refSet.rootRef = null;

              const dereferenced = await dereferenceApiDOM(schemaElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: `${fixturePath}#/components/schemas/User/properties/profile` },
              });

              assert.match(
                dereferenced.meta.get('ref-origin').toValue(),
                /internal-only\/root\.json$/,
              );
            });
          },
        );

        context(
          'given single SchemaElement passed to dereferenceApiDOM with external references',
          function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'external-only', 'root.json');

            specify('should dereference', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const schemaElement = evaluate(
                '/components/schemas/User/properties/profile',
                parseResult.api as OpenApi3_1Element,
              );
              const dereferenced = await dereferenceApiDOM(schemaElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: fixturePath },
              });

              assert.isTrue(isSchemaElement(dereferenced));
            });

            specify('should dereference and contain metadata about origin', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const pathItemElement = evaluate(
                '/components/schemas/User/properties/profile',
                parseResult.api as OpenApi3_1Element,
              );
              const dereferenced = await dereferenceApiDOM(pathItemElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: fixturePath },
              });

              assert.match(
                dereferenced.meta.get('ref-origin').toValue(),
                /external-only\/ex\.json$/,
              );
            });
          },
        );
      });
    });
  });
});
