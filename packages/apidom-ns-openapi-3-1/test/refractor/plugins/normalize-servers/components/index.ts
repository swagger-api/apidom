import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { OpenApi3_1Element, refractorPluginNormalizeServers } from '../../../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-servers', function () {
      context('given Path Item Object is defined in Components.pathItems', function () {
        specify('should skip the Path Item from normalization', async function () {
          const yamlDefinition = dedent`
              openapi: 3.1.0
              servers:
               - url: https://example.com/
                 description: production server
              components:
                pathItems:
                  pathItem1:
                    operation: {}
            `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeServers()],
          });

          expect(sexprs(openApiElement)).toMatchSnapshot();
        });
      });

      context('given Path Item Object is defined in Components.callbacks', function () {
        specify('should skip the Path Item from normalization', async function () {
          const yamlDefinition = dedent`
              openapi: 3.1.0
              servers:
               - url: https://example.com/
                 description: production server
              components:
                callbacks:
                  myCallback:
                    "{$url}":
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
