import { expect } from 'chai';
import dedent from 'dedent';
import { sexprs } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import {
  OpenApi3_1Element,
  refractorPluginNormalizeSecurityRequirements,
} from '../../../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-security-requirements', function () {
      context('given OpenAPI.security fixed field is defined', function () {
        context('and Operation.security is not defined', function () {
          specify(
            'should inherit Security Requirements from OpenAPI.security field',
            async function () {
              const yamlDefinition = dedent`
              openapi: 3.1.0
              security:
                - petstore_auth:
                    - write:pets
                    - read:pets
              webhooks:
                hook1:
                  get: {}
            `;
              const apiDOM = await parse(yamlDefinition);
              const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
                plugins: [refractorPluginNormalizeSecurityRequirements()],
              });

              expect(sexprs(openApiElement)).toMatchSnapshot();
            },
          );
        });

        context('and Operation.security is defined as empty list', function () {
          specify(
            'should not inherit Security Requirements from OpenAPI.security field',
            async function () {
              const yamlDefinition = dedent`
              openapi: 3.1.0
              security:
                - petstore_auth:
                    - write:pets
                    - read:pets
              webhooks:
                hook1:
                  get:
                    security: []
            `;
              const apiDOM = await parse(yamlDefinition);
              const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
                plugins: [refractorPluginNormalizeSecurityRequirements()],
              });

              expect(sexprs(openApiElement)).toMatchSnapshot();
            },
          );
        });

        context('and Operation.security contains single Security Requirement', function () {
          specify(
            'should not inherit Security Requirements from OpenAPI.security field',
            async function () {
              const yamlDefinition = dedent`
              openapi: 3.1.0
              security:
                - petstore_auth:
                    - write:pets
                    - read:pets
              webhooks:
                hook1:
                  get:
                    security: [{}]
            `;
              const apiDOM = await parse(yamlDefinition);
              const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
                plugins: [refractorPluginNormalizeSecurityRequirements()],
              });

              expect(sexprs(openApiElement)).toMatchSnapshot();
            },
          );
        });
      });

      context('given OpenAPI.security fixed field is not defined', function () {
        context('and Operation.security is defined', function () {
          specify('should do nothing', async function () {
            const yamlDefinition = dedent`
              openapi: 3.1.0
              webhooks:
                hook1:
                  get:
                    security: [{}]
            `;
            const apiDOM = await parse(yamlDefinition);
            const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
              plugins: [refractorPluginNormalizeSecurityRequirements()],
            });

            expect(sexprs(openApiElement)).toMatchSnapshot();
          });
        });

        context('and Operation.security is not defined', function () {
          specify('should do nothing', async function () {
            const yamlDefinition = dedent`
              openapi: 3.1.0
              webhooks:
                hook1:
                  get: {}
            `;
            const apiDOM = await parse(yamlDefinition);
            const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
              plugins: [refractorPluginNormalizeSecurityRequirements()],
            });

            expect(sexprs(openApiElement)).toMatchSnapshot();
          });
        });
      });
    });
  });
});
