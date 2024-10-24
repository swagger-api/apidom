import path from 'node:path';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-asyncapi-2';
import { fileURLToPath } from 'node:url';

import { loadJsonFile } from '../../../../helpers';
import { dereference } from '../../../../../src';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('strategies', function () {
    context('asyncapi-2', function () {
      context('Correlation ID Object', function () {
        context('given in Message Object', function () {
          const fixturePath = path.join(rootFixturePath, 'message-object');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });
      });

      context('given in Message Trait Object', function () {
        const fixturePath = path.join(rootFixturePath, 'message-trait-object');

        specify('should dereference', async function () {
          const rootFilePath = path.join(fixturePath, 'root.json');
          const actual = await dereference(rootFilePath, {
            parse: { mediaType: mediaTypes.latest('json') },
          });
          const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

          assert.deepEqual(toValue(actual), expected);
        });
      });

      context('given in components/correlationIds field', function () {
        const fixturePath = path.join(rootFixturePath, 'components-correlation-ids');

        specify('should dereference', async function () {
          const rootFilePath = path.join(fixturePath, 'root.json');
          const actual = await dereference(rootFilePath, {
            parse: { mediaType: mediaTypes.latest('json') },
          });
          const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

          assert.deepEqual(toValue(actual), expected);
        });
      });
    });
  });
});
