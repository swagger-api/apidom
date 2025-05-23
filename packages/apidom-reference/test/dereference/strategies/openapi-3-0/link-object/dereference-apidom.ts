import path from 'node:path';
import { assert } from 'chai';
import {
  mediaTypes,
  isLinkElement,
  LinkElement,
  isOperationElement,
} from '@swagger-api/apidom-ns-openapi-3-0';
import { toValue } from '@swagger-api/apidom-core';
import { evaluate } from '@swagger-api/apidom-json-pointer/modern';
import { fileURLToPath } from 'node:url';

import { parse, dereferenceApiDOM } from '../../../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-0', function () {
      context('Link Object', function () {
        context('given single LinkElement passed to dereferenceApiDOM', function () {
          const fixturePath = path.join(
            __dirname,
            'fixtures',
            'operation-ref-external',
            'entry.json',
          );

          specify('should dereference', async function () {
            const parseResult = await parse(fixturePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const linkElement = evaluate<LinkElement>(parseResult.api, '/components/links/link1');
            const dereferenced = (await dereferenceApiDOM(linkElement, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { baseURI: fixturePath },
            })) as LinkElement;

            assert.isTrue(isLinkElement(dereferenced));
            assert.isTrue(isOperationElement(dereferenced.operationRef?.meta.get('operation')));
          });

          specify('should dereference and contain metadata about origin', async function () {
            const parseResult = await parse(fixturePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const linkElement = evaluate<LinkElement>(parseResult.api, '/components/links/link1');
            const dereferenced = (await dereferenceApiDOM(linkElement, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { baseURI: fixturePath },
            })) as LinkElement;

            assert.match(
              toValue(dereferenced.operationRef?.meta.get('operation').meta.get('ref-origin')),
              /operation-ref-external\/ex\.json$/,
            );
          });
        });
      });
    });
  });
});
