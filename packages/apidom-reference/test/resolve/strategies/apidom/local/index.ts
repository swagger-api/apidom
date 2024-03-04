import { assert } from 'chai';
import { ObjectElement, StringElement, RefElement } from '@swagger-api/apidom-core';

import { resolveApiDOM } from '../../../../../src';

describe('resolve', function () {
  context('strategies', function () {
    context('apidom', function () {
      context('local', function () {
        specify('should resolve', async function () {
          const element = new ObjectElement({
            element: new StringElement('test', { id: 'unique-id' }),
            ref: new RefElement('unique-id'),
          });
          const refSet = await resolveApiDOM(element, {
            parse: { mediaType: 'application/vnd.apidom' },
          });

          assert.strictEqual(refSet.size, 1);
        });
      });
    });
  });
});
