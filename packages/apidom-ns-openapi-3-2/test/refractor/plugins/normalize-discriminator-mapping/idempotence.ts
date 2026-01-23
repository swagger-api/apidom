import { expect } from 'chai';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toValue, dispatchRefractorPlugins } from '@swagger-api/apidom-core';
import { dereference } from '@swagger-api/apidom-reference';
import FileResolver from '@swagger-api/apidom-reference/resolve/resolvers/file';

import {
  createToolbox,
  OpenApi3_2Element,
  refractorPluginNormalizeDiscriminatorMapping,
  keyMap,
  getNodeType,
  mediaTypes,
} from '../../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-dicriminator-mapping', function () {
      specify('should have idempotent characteristics', async function () {
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

        const openApiElement = dereferenced.result as OpenApi3_2Element;

        const options = {
          toolboxCreator: createToolbox,
          visitorOptions: { keyMap, nodeTypeGetter: getNodeType },
        };

        dispatchRefractorPlugins(
          openApiElement,
          [refractorPluginNormalizeDiscriminatorMapping({ baseURI: uri })],
          options,
        );
        dispatchRefractorPlugins(
          openApiElement,
          [refractorPluginNormalizeDiscriminatorMapping({ baseURI: uri })],
          options,
        );
        dispatchRefractorPlugins(
          openApiElement,
          [refractorPluginNormalizeDiscriminatorMapping({ baseURI: uri })],
          options,
        );

        expect(toValue(dereferenced.result)).toMatchSnapshot();
      });
    });
  });
});
