import path from 'node:path';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';

import { dereference } from '../../../../../src';

describe('dereference', function () {
  context('strategies', function () {
    context('apidom', function () {
      context('remote', function () {
        specify('should substitute Ref Element with the Element it references', async function () {
          const uri = path.join(__dirname, 'fixtures', 'substitute', 'root.json');
          const actual = await dereference(uri, {
            parse: { mediaType: 'application/vnd.apidom' },
          });
          const expected = [{ ref: 'remote-string-value' }];

          assert.deepEqual(toValue(actual), expected);
        });

        specify(
          'should process Ref Element nested in remote referenced element',
          async function () {
            const uri = path.join(__dirname, 'fixtures', 'nested', 'root.json');
            const actual = await dereference(uri, {
              parse: { mediaType: 'application/vnd.apidom' },
            });
            const expected = [{ ref: { nestedRef: 'string-element' } }];

            assert.deepEqual(toValue(actual), expected);
          },
        );
      });

      context('given external resolution disabled', function () {
        specify('should not dereference', async function () {
          const uri = path.join(__dirname, 'fixtures', 'external-disabled', 'root.json');
          const actual = await dereference(uri, {
            parse: { mediaType: 'application/vnd.apidom' },
            resolve: { external: false },
          });
          const expected = [{ ref: './remote.json#remote-id' }];

          assert.deepEqual(toValue(actual), expected);
        });
      });
    });
  });
});
