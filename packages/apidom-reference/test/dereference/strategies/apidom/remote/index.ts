import { assert } from 'chai';
import {
  ObjectElement,
  StringElement,
  RefElement,
  toValue,
  ParseResultElement,
} from '@swagger-api/apidom-core';

import { dereferenceApiDOM, Reference, ReferenceSet } from '../../../../../src';

describe('dereference', function () {
  context('strategies', function () {
    context('apidom', function () {
      context('remote', function () {
        specify('should substitute Ref Element with the Element it references', async function () {
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

          const actual = await dereferenceApiDOM(rootReference.value, {
            parse: { mediaType: 'application/vnd.apidom' },
            dereference: { refSet },
          });
          const expected = [{ ref: 'remote-string-value' }];

          assert.deepEqual(toValue(actual), expected);
        });

        specify(
          'should process Ref Element nested in remote referenced element',
          async function () {
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
                    element1: new ObjectElement(
                      {
                        nestedRef: new RefElement(
                          'https://example.com/remote.json#remote-nested-id',
                        ),
                      },
                      { id: 'remote-id' },
                    ),
                    element2: new StringElement('string-element', { id: 'remote-nested-id' }),
                  },
                  { classes: ['result'] },
                ),
              ]),
            });
            const refSet = ReferenceSet({ refs: [rootReference, remoteReference] });

            const actual = await dereferenceApiDOM(rootReference.value, {
              parse: { mediaType: 'application/vnd.apidom' },
              dereference: { refSet },
            });
            const expected = [{ ref: { nestedRef: 'string-element' } }];

            assert.deepEqual(toValue(actual), expected);
          },
        );
      });

      context('given external resolution disabled', function () {
        specify('should not dereference', async function () {
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

          const actual = await dereferenceApiDOM(rootReference.value, {
            parse: { mediaType: 'application/vnd.apidom' },
            resolve: { external: false },
            dereference: { refSet },
          });
          const expected = [{ ref: 'https://example.com/remote.json#remote-id' }];

          assert.deepEqual(toValue(actual), expected);
        });
      });
    });
  });
});
