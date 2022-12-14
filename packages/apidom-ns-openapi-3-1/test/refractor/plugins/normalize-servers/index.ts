import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { OpenApi3_1Element, refractorPluginNormalizeServers } from '../../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-servers', function () {
      context('given OpenAPI.server defined', function () {
        specify(
          'should duplicate Server Objects in PathItem.servers and Operation.servers',
          async function () {
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
            });

            expect(sexprs(openApiElement)).toMatchSnapshot();
          },
        );
      });

      context('given PathItem.servers defined', function () {
        specify('should duplicate Server Objects in Operation.servers', async function () {
          const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  servers:
                   - url: https://example.com/
                     description: production server
                  get: {}
            `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeServers()],
          });

          expect(sexprs(openApiElement)).toMatchSnapshot();
        });
      });

      context('given OpenAPI.servers defined and PathItem.servers defined', function () {
        specify('should duplicate Server Objects from PathItem.servers', async function () {
          const yamlDefinition = dedent`
              openapi: 3.1.0
              servers:
               - url: https://example.com/top
                 description: top production server
              paths:
                /:
                  servers:
                    - url: https://example.com/inner
                      description: inner production server
                  get: {}
            `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeServers()],
          });

          expect(openApiElement).toMatchSnapshot();
        });
      });

      context('given no servers field is defined', function () {
        specify('should not duplicate any Server Objects', async function () {
          const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  get: {}
            `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeServers()],
          });

          expect(sexprs(openApiElement)).toMatchSnapshot();
        });
      });
    });
  });
});
