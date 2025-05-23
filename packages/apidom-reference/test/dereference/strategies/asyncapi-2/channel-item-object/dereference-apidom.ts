import path from 'node:path';
import { assert } from 'chai';
import {
  mediaTypes,
  isChannelItemElement,
  ChannelItemElement,
} from '@swagger-api/apidom-ns-asyncapi-2';
import { toValue } from '@swagger-api/apidom-core';
import { evaluate } from '@swagger-api/apidom-json-pointer/modern';
import { fileURLToPath } from 'node:url';

import { parse, dereferenceApiDOM } from '../../../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('dereference', function () {
  context('strategies', function () {
    context('asyncapi-2', function () {
      context('Channel Item Object', function () {
        context('given single ChannelItemElement passed to dereferenceApiDOM', function () {
          const fixturePath = path.join(__dirname, 'fixtures', 'external-only', 'root.json');

          specify('should dereference', async function () {
            const parseResult = await parse(fixturePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const channelItemElement = evaluate<ChannelItemElement>(
              parseResult.api,
              '/channels/channelItem1',
            );
            const dereferenced = await dereferenceApiDOM(channelItemElement, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { baseURI: fixturePath },
            });

            assert.isTrue(isChannelItemElement(dereferenced));
          });

          specify('should dereference and contain metadata about origin', async function () {
            const parseResult = await parse(fixturePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const channelItemElement = evaluate<ChannelItemElement>(
              parseResult.api,
              '/channels/channelItem1',
            );
            const dereferenced = await dereferenceApiDOM(channelItemElement, {
              parse: { mediaType: mediaTypes.latest('json') },
              resolve: { baseURI: fixturePath },
            });

            assert.match(toValue(dereferenced.meta.get('ref-origin')), /external-only\/ex\.json$/);
          });
        });
      });
    });
  });
});
