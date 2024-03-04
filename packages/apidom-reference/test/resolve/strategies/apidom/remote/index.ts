import { assert } from 'chai';
import {
  ObjectElement,
  StringElement,
  RefElement,
  toValue,
  ParseResultElement,
} from '@swagger-api/apidom-core';

import { resolveApiDOM, Reference, ReferenceSet } from '../../../../../src';

describe('dereference', function () {
  context('strategies', function () {
    context('apidom', function () {
      context('remote', function () {
        specify('should resolve', async function () {
          const rootReference = Reference({
            uri: 'https://example.com/local.json',
            value: new ParseResultElement([
              new ObjectElement(
                {
                  ref: new RefElement('https://example.com/remote.json#remote-id'),
                },
                { classes: ['result'] },
              ),
            ]),
          });
          const remoteReference = Reference({
            uri: 'https://example.com/remote.json',
            value: new ParseResultElement([
              new ObjectElement(
                {
                  element: new StringElement('remote-string-value', { id: 'remote-id' }),
                },
                { classes: ['result'] },
              ),
            ]),
          });
          const refSet = ReferenceSet({ refs: [rootReference, remoteReference] });

          const actual = await resolveApiDOM(rootReference.value, {
            parse: { mediaType: 'application/vnd.apidom' },
            dereference: { refSet },
          });
          const expected = [{ ref: 'remote-string-value' }];

          assert.deepEqual(toValue(actual), expected);
        });
      });
    });
  });
});
