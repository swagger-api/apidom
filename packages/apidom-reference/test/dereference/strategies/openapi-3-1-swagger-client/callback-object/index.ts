import path from 'node:path';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-openapi-3-1';

import { loadJsonFile } from '../../../../helpers';
import { dereference } from '../../../../../src';
import * as bootstrap from '../bootstrap';

const rootFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  before(function () {
    bootstrap.before();
  });

  after(function () {
    bootstrap.after();
  });

  context('strategies', function () {
    context('openapi-3-1swagger-client', function () {
      context('Callback Object', function () {
        context('given in components/callbacks field', function () {
          const fixturePath = path.join(rootFixturePath, 'components-callbacks');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.yaml');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('yaml') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });

        context('given in Operation Object', function () {
          const fixturePath = path.join(rootFixturePath, 'operation-object');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.yaml');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('yaml') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });
      });
    });
  });
});
