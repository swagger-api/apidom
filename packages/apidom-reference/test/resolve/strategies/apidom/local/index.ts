import path from 'node:path';
import { assert } from 'chai';
import { ObjectElement, StringElement, RefElement } from '@swagger-api/apidom-core';
import { fileURLToPath } from 'node:url';

import { resolve, resolveApiDOM } from '../../../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('resolve', function () {
  context('strategies', function () {
    context('apidom', function () {
      context('local', function () {
        context('resolve', function () {
          specify('should resolve', async function () {
            const uri = path.resolve(__dirname, 'fixtures', 'entry.json');
            const refSet = await resolve(uri, {
              parse: { mediaType: 'application/vnd.apidom' },
            });

            assert.strictEqual(refSet.size, 1);
          });
        });

        context('resolveApiDOM', function () {
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
});
