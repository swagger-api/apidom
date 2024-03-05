import path from 'node:path';
import { assert } from 'chai';
import { ObjectElement, RefElement } from '@swagger-api/apidom-core';

import { resolveApiDOM } from '../../../../../src';

describe('dereference', function () {
  context('strategies', function () {
    context('apidom', function () {
      context('remote', function () {
        context('resolveApiDOM', function () {
          specify('should resolve', async function () {
            const element = new ObjectElement({
              ref: new RefElement('./remote.json#remote-id'),
            });
            const refSet = await resolveApiDOM(element, {
              parse: { mediaType: 'application/vnd.apidom' },
              resolve: { baseURI: path.join(__dirname, 'fixtures', 'root.json') },
            });

            assert.strictEqual(refSet.size, 2);
          });
        });
      });
    });
  });
});
