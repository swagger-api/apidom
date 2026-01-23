import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  OpenApi3_2Element,
  refractorPluginNormalizeSecurityRequirements,
} from '../../../../../src/index.ts';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-security-requirements', function () {
      context('given Operation Object is defined inside Components.pathItems', function () {
        specify('should skip the Operation from normalization', async function () {
          const yamlDefinition = dedent`
              openapi: 3.2.0
              security:
                - petstore_auth:
                    - write:pets
                    - read:pets
              components:
                pathItems:
                  pathItem1:
                    get: {}
            `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_2Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeSecurityRequirements()],
          });

          expect(sexprs(openApiElement)).toMatchSnapshot();
        });
      });

      context('given Operation Object is defined in Components.callbacks', function () {
        specify('should skip the Operation from normalization', async function () {
          const yamlDefinition = dedent`
              openapi: 3.2.0
              security:
                - petstore_auth:
                    - write:pets
                    - read:pets
              components:
                callbacks:
                  myCallback:
                    "{$url}":
                       get: {}
            `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_2Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeSecurityRequirements()],
          });

          expect(sexprs(openApiElement)).toMatchSnapshot();
        });
      });
    });
  });
});
