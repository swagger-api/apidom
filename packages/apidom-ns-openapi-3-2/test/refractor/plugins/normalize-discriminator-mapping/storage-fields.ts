import { assert } from 'chai';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toValue, dispatchRefractorPlugins } from '@swagger-api/apidom-core';
import { dereference } from '@swagger-api/apidom-reference';
import FileResolver from '@swagger-api/apidom-reference/resolve/resolvers/file';

import {
  OpenApi3_2Element,
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
          parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
          resolve: {
            baseURI: uri,
            resolvers: [
              new FileResolver({
                fileAllowList: [/\.json$/],
              }),
            ],
          },
          dereference: {
            strategyOpts: {
              'openapi-3-1': {
                dereferenceDiscriminatorMapping: true,
              },
            },
          },
        });

        const openApiElement = OpenApi3_2Element.refract(dereferenced.result) as OpenApi3_2Element;

        const normalized = dispatchRefractorPlugins(
          openApiElement,
          [refractorPluginNormalizeDiscriminatorMapping({ baseURI: uri })],
          {
            toolboxCreator: createToolbox,
            visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
          },
        ) as OpenApi3_2Element;

        assert.deepEqual(toValue(normalized.get('x-normalized')), {
          'discriminator-mapping': ['/components/schemas/MyResponse'],
        });
      });

      context('given custom storage field', function () {
        specify('should use custom storage field to store normalized scopes', async function () {
          const uri = path.join(__dirname, 'fixtures', 'no-mapping.json');
          const dereferenced = await dereference(uri, {
            parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
            resolve: {
              baseURI: uri,
              resolvers: [
                new FileResolver({
                  // @ts-ignore
                  fileAllowList: ['*.json', /\.json$/],
                }),
              ],
            },
            dereference: {
              strategyOpts: {
                'openapi-3-1': {
                  dereferenceDiscriminatorMapping: true,
                },
              },
            },
          });

          const openApiElement = OpenApi3_2Element.refract(dereferenced.result) as OpenApi3_2Element;

          const normalized = dispatchRefractorPlugins(
            openApiElement,
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
          ) as OpenApi3_2Element;

          assert.deepEqual(toValue(normalized.get('$$normalized')), {
            'discriminator-mapping': ['/components/schemas/MyResponse'],
          });
        });
      });
    });
  });
});
