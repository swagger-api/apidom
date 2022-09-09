import path from 'node:path';
import { assert } from 'chai';
import {
  mediaTypes,
  isLinkElement,
  LinkElement,
  isOperationElement,
  OpenApi3_1Element,
} from '@swagger-api/apidom-ns-openapi-3-1';
import { evaluate } from '@swagger-api/apidom-json-pointer';

import { parse, dereferenceApiDOM } from '../../../../../src';

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-1', function () {
      context('Link Object', function () {
        context('given single LinkElement passed to dereferenceApiDOM', function () {
          const fixturePath = path.join(
            __dirname,
            'fixtures',
            'operation-ref-external',
            'root.json',
          );

          specify('should dereference', async function () {
            const parseResult = await parse(fixturePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const linkElement = evaluate(
              '/components/links/link1',
              parseResult.api as OpenApi3_1Element,
            );
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
            const linkElement = evaluate(
              '/components/links/link1',
              parseResult.api as OpenApi3_1Element,
            );
            const dereferenced = (await dereferenceApiDOM(linkElement, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { baseURI: fixturePath },
            })) as LinkElement;

            assert.match(
              dereferenced.operationRef?.meta.get('operation').meta.get('ref-origin').toValue(),
              /operation-ref-external\/ex\.json$/,
            );
          });
        });
      });
    });
  });
});
