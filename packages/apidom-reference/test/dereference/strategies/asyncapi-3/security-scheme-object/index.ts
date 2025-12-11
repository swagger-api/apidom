import path from 'node:path';
import { assert } from 'chai';
import { toValue } from '@swagger-api/apidom-core';
import { mediaTypes } from '@swagger-api/apidom-ns-asyncapi-3';
import { fileURLToPath } from 'node:url';

import { loadJsonFile } from '../../../../helpers.ts';
import { dereference } from '../../../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootFixturePath = path.join(__dirname, 'fixtures');

describe('dereference', function () {
  context('strategies', function () {
    context('asyncapi-3', function () {
      context('Security Scheme Object', function () {
        context('given in components/securitySchemes field', function () {
          const fixturePath = path.join(rootFixturePath, 'components-security-schemes');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));

            assert.deepEqual(toValue(actual), expected);
          });
        });
        context('given in servers/security field', function () {
          const fixturePath = path.join(rootFixturePath, 'server-object');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));
            assert.deepEqual(toValue(actual), expected);
          });
        });
        context('given in operation/security field', function () {
          const fixturePath = path.join(rootFixturePath, 'operation-object');

          specify('should dereference', async function () {
            const rootFilePath = path.join(fixturePath, 'root.json');
            const actual = await dereference(rootFilePath, {
              parse: { mediaType: mediaTypes.latest('json') },
            });
            
            const expected = loadJsonFile(path.join(fixturePath, 'dereferenced.json'));
            assert.deepEqual(toValue(actual), expected);
          });
        });
        context('given in operationTraits/security field', function () {
          const fixturePath = path.join(rootFixturePath, 'operation-trait-object');

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
});
