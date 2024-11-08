import { assert } from 'chai';
import dedent from 'dedent';
import { toValue } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { OpenApi3_1Element, refractorPluginNormalizeServers } from '../../../../src/index.ts';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-servers', function () {
      specify('should use sub-field to store normalized scopes', async function () {
        const yamlDefinition = dedent`
            openapi: 3.1.0
            servers:
              - url: https://example.com/
                description: production server
            paths:
              /:
                get: {}
        `;
        const apiDOM = await parse(yamlDefinition);
        const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
          plugins: [refractorPluginNormalizeServers()],
        }) as OpenApi3_1Element;

        assert.deepEqual(toValue(openApiElement.get('x-normalized')), {
          servers: ['/paths/~1', '/paths/~1/get'],
        });
      });

      context('given custom storage field', function () {
        specify('should use custom storage field to store normalized scopes', async function () {
          const yamlDefinition = dedent`
            openapi: 3.1.0
            servers:
              - url: https://example.com/
                description: production server
            paths:
              /:
                get: {}
          `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [
              refractorPluginNormalizeServers({
                storageField: '$$normalized',
              }),
            ],
          }) as OpenApi3_1Element;

          assert.deepEqual(toValue(openApiElement.get('$$normalized')), {
            servers: ['/paths/~1', '/paths/~1/get'],
          });
        });
      });
    });
  });
});
