import { assert } from 'chai';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toValue, dispatchRefractorPlugins } from '@swagger-api/apidom-core';
import { dereference } from '@swagger-api/apidom-reference';
import FileResolver from '@swagger-api/apidom-reference/resolve/resolvers/file';

import {
  OpenApi3_1Element,
  refractorPluginNormalizeDiscriminatorMapping,
  mediaTypes,
  createToolbox,
  keyMap,
  getNodeType,
} from '../../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-discriminator-mapping', function () {
      specify('should use sub-field to store normalized scopes', async function () {
        const uri = path.join(__dirname, 'fixtures', 'no-mapping.json');
        const dereferenced = await dereference(uri, {
          parse: { mediaType: mediaTypes.latest('json') },
          resolve: {
            baseURI: uri,
            resolvers: [
              new FileResolver({
                fileAllowList: [/\.json$/],
              }),
            ],
            dereference: {
              strategyOpts: {
                'openapi-3-1': {
                  dereferenceDiscriminatorMapping: true,
                },
              },
            },
          },
        });

        const normalized = dispatchRefractorPlugins(
          dereferenced.result as OpenApi3_1Element,
          [refractorPluginNormalizeDiscriminatorMapping({ baseURI: uri })],
          {
            toolboxCreator: createToolbox,
            visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
          },
        ) as OpenApi3_1Element;

        assert.deepEqual(toValue(normalized.get('x-normalized')), {
          'discriminator-mapping': ['/components/schemas/MyResponse'],
        });
      });

      context('given custom storage field', function () {
        specify('should use custom storage field to store normalized scopes', async function () {
          const uri = path.join(__dirname, 'fixtures', 'no-mapping.json');
          const dereferenced = await dereference(uri, {
            parse: { mediaType: mediaTypes.latest('json') },
            resolve: {
              baseURI: uri,
              resolvers: [
                new FileResolver({
                  // @ts-ignore
                  fileAllowList: ['*.json', /\.json$/],
                }),
              ],
              dereference: {
                strategyOpts: {
                  'openapi-3-1': {
                    dereferenceDiscriminatorMapping: true,
                  },
                },
              },
            },
          });

          const normalized = dispatchRefractorPlugins(
            dereferenced.result as OpenApi3_1Element,
            [
              refractorPluginNormalizeDiscriminatorMapping({
                storageField: '$$normalized',
                baseURI: uri,
              }),
            ],
            {
              toolboxCreator: createToolbox,
              visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
            },
          ) as OpenApi3_1Element;

          assert.deepEqual(toValue(normalized.get('$$normalized')), {
            'discriminator-mapping': ['/components/schemas/MyResponse'],
          });
        });
      });
    });
  });
});
