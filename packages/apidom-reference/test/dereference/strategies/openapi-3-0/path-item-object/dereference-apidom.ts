import path from 'node:path';
import { assert } from 'chai';
import {
  mediaTypes,
  isPathItemElement,
  OpenApi3_0Element,
} from '@swagger-api/apidom-ns-openapi-3-0';
import { toValue } from '@swagger-api/apidom-core';
import { evaluate, compile } from '@swagger-api/apidom-json-pointer';

import { parse, dereferenceApiDOM } from '../../../../../src';

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-0', function () {
      context('Path Item Object', function () {
        context(
          'given single PathItemElement passed to dereferenceApiDOM with internal references',
          function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'internal-only', 'root.json');

            specify('should dereference', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const jsonPointer = compile(['paths', '/path1']);
              const pathItemElement = evaluate(jsonPointer, parseResult.api as OpenApi3_0Element);
              const dereferenced = await dereferenceApiDOM(pathItemElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: `${fixturePath}#${jsonPointer}` },
              });

              assert.isTrue(isPathItemElement(dereferenced));
            });

            specify('should dereference and contain metadata about origin', async function () {
              const jsonPointer = compile(['paths', '/path1']);
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const pathItemElement = evaluate(jsonPointer, parseResult.api as OpenApi3_0Element);
              const dereferenced = await dereferenceApiDOM(pathItemElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: `${fixturePath}#${jsonPointer}` },
              });

              assert.match(
                toValue(dereferenced.meta.get('ref-origin')),
                /internal-only\/root\.json$/,
              );
            });
          },
        );

        context(
          'given single PathItemElement passed to dereferenceApiDOM with external references',
          function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'external-only', 'root.json');

            specify('should dereference', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const pathItemElement = evaluate(
                compile(['paths', '/path1']),
                parseResult.api as OpenApi3_0Element,
              );
              const dereferenced = await dereferenceApiDOM(pathItemElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: fixturePath },
              });

              assert.isTrue(isPathItemElement(dereferenced));
            });

            specify('should dereference and contain metadata about origin', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const pathItemElement = evaluate(
                compile(['paths', '/path1']),
                parseResult.api as OpenApi3_0Element,
              );
              const dereferenced = await dereferenceApiDOM(pathItemElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: fixturePath },
              });

              assert.match(
                toValue(dereferenced.meta.get('ref-origin')),
                /external-only\/ex\.json$/,
              );
            });
          },
        );
      });
    });
  });
});
