import { expect } from 'chai';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dispatchRefractorPlugins, toValue } from '@swagger-api/apidom-core';
import { dereference } from '@swagger-api/apidom-reference';
import FileResolver from '@swagger-api/apidom-reference/resolve/resolvers/file';

import {
  OpenApi3_2Element,
  refractorPluginNormalizeDiscriminatorMapping,
  keyMap,
  getNodeType,
  createToolbox,
} from '../../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-discriminator-mapping', function () {
      context('given Discriminator.mapping is not defined', function () {
        specify('should add x-normalized-mapping field with normalized mapping', async function () {
          const uri = path.join(__dirname, 'fixtures', 'no-mapping.json');
          const dereferenced = await dereference(uri, {
            parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.2.0' },
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
                'openapi-3-2': {
                  dereferenceDiscriminatorMapping: true,
                },
              },
            },
          });

          const normalized = dispatchRefractorPlugins(
            dereferenced.result as OpenApi3_2Element,
            [refractorPluginNormalizeDiscriminatorMapping({ baseURI: uri })],
            {
              toolboxCreator: createToolbox,
              visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
            },
          ) as OpenApi3_2Element;

          expect(toValue(normalized)).toMatchSnapshot();
        });
      });

      context(
        'given Discriminator.mapping is not defined and oneOf contains an external reference',
        function () {
          specify(
            'should not add x-normalized-mapping field with normalized mapping',
            async function () {
              const uri = path.join(__dirname, 'fixtures', 'no-mapping-external.json');
              const dereferenced = await dereference(uri, {
                parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.2.0' },
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
                    'openapi-3-2': {
                      dereferenceDiscriminatorMapping: true,
                    },
                  },
                },
              });

              const normalized = dispatchRefractorPlugins(
                dereferenced.result as OpenApi3_2Element,
                [refractorPluginNormalizeDiscriminatorMapping({ baseURI: uri })],
                {
                  toolboxCreator: createToolbox,
                  visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
                },
              ) as OpenApi3_2Element;

              expect(toValue(normalized)).toMatchSnapshot();
            },
          );
        },
      );

      context('given Discriminator.mapping is not defined and allOf is present', function () {
        specify('should add x-normalized-mapping field with normalized mapping', async function () {
          const uri = path.join(__dirname, 'fixtures', 'allOf-no-mapping.json');
          const dereferenced = await dereference(uri, {
            parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.2.0' },
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
                'openapi-3-2': {
                  dereferenceDiscriminatorMapping: true,
                },
              },
            },
          });

          const normalized = dispatchRefractorPlugins(
            dereferenced.result as OpenApi3_2Element,
            [refractorPluginNormalizeDiscriminatorMapping({ baseURI: uri })],
            {
              toolboxCreator: createToolbox,
              visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
            },
          ) as OpenApi3_2Element;

          expect(toValue(normalized)).toMatchSnapshot();
        });
      });

      context('given Discriminator.mapping is defined and allOf is present', function () {
        specify('should add x-normalized-mapping field with normalized mapping', async function () {
          const uri = path.join(__dirname, 'fixtures', 'allOf-mapping.json');
          const dereferenced = await dereference(uri, {
            parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.2.0' },
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
                'openapi-3-2': {
                  dereferenceDiscriminatorMapping: true,
                },
              },
            },
          });

          const normalized = dispatchRefractorPlugins(
            dereferenced.result as OpenApi3_2Element,
            [refractorPluginNormalizeDiscriminatorMapping({ baseURI: uri })],
            {
              toolboxCreator: createToolbox,
              visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
            },
          ) as OpenApi3_2Element;

          expect(toValue(normalized)).toMatchSnapshot();
        });
      });

      context('given Discriminator is defined and multiple allOf are present', function () {
        specify('should add x-normalized-mapping field with normalized mapping', async function () {
          const uri = path.join(__dirname, 'fixtures', 'allOf-multiple.json');
          const dereferenced = await dereference(uri, {
            parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.2.0' },
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
                'openapi-3-2': {
                  dereferenceDiscriminatorMapping: true,
                },
              },
            },
          });

          const normalized = dispatchRefractorPlugins(
            dereferenced.result as OpenApi3_2Element,
            [refractorPluginNormalizeDiscriminatorMapping({ baseURI: uri })],
            {
              toolboxCreator: createToolbox,
              visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
            },
          ) as OpenApi3_2Element;

          expect(toValue(normalized)).toMatchSnapshot();
        });
      });
    });
  });
});
