import path from 'path';
import { assert } from 'chai';
import { toValue } from 'apidom';

import { loadJsonFile } from '../../../../helpers';
import { dereference } from '../../../../../src';

const rootFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-1', function () {
      context('Security Scheme Object', function () {
        context('given components/securitySchemes', function () {
          const fixturePath = path.join(rootFixturePath, 'components-security-schemes');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });
      });
    });
  });
});
