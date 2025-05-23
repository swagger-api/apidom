import path from 'node:path';
import { assert } from 'chai';
import {
  mediaTypes,
  isPathItemElement,
  PathItemElement,
  SwaggerElement,
} from '@swagger-api/apidom-ns-openapi-2';
import { toValue } from '@swagger-api/apidom-core';
import { evaluate, compile } from '@swagger-api/apidom-json-pointer/modern';
import { fileURLToPath } from 'node:url';

import { parse, dereferenceApiDOM } from '../../../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-2', function () {
      context('Path Item Object', function () {
        context(
          'given single PathItemElement passed to dereferenceApiDOM with internal references',
          function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'internal-only', 'entry.json');

            specify('should dereference', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const jsonPointer = compile(['paths', '/path1']);
              const pathItemElement = evaluate<PathItemElement>(parseResult.api, jsonPointer);
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
              const pathItemElement = evaluate<PathItemElement>(parseResult.api, jsonPointer);
              const dereferenced = await dereferenceApiDOM(pathItemElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: `${fixturePath}#${jsonPointer}` },
              });

              assert.match(
                toValue(dereferenced.meta.get('ref-origin')),
                /internal-only\/entry\.json$/,
              );
            });
          },
        );

        context(
          'given single PathItemElement passed to dereferenceApiDOM with external references',
          function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'external-only', 'entry.json');

            specify('should dereference', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const pathItemElement = evaluate<PathItemElement>(
                parseResult.api as SwaggerElement,
                compile(['paths', '/path1']),
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
              const pathItemElement = evaluate<PathItemElement>(
                parseResult.api,
                compile(['paths', '/path1']),
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
