import { expect } from 'chai';
import dedent from 'dedent';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { OpenApi3_1Element, refractorPluginNormalizeOperationIds } from '../../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-operation-ids', function () {
      context('given Operation Object with un-normalized operationId field', function () {
        context('and Link.operationId is pointing to that Operation', function () {
          specify('should correct the Link.operationId field', async function () {
            const yamlDefinition = dedent`
              openapi: 3.1.0
              components:
                links:
                  link1:
                    operationId: get operation ^
              paths:
                /:
                  get:
                    operationId: get operation ^
            `;
            const apiDOM = await parse(yamlDefinition);
            const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
              plugins: [refractorPluginNormalizeOperationIds()],
            });

            expect(openApiElement).toMatchSnapshot();
          });
        });

        specify('should normalize operationId', async function () {
          const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  get:
                    operationId: get operation ^
            `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeOperationIds()],
          });

          expect(openApiElement).toMatchSnapshot();
        });
      });

      context('given Operation Object with normalized operationId field', function () {
        specify('should not normalize operationId', async function () {
          const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  get:
                    operationId: getOperation
            `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeOperationIds()],
          });

          expect(openApiElement).toMatchSnapshot();
        });
      });

      context('given Operation Object with missing operationId field', function () {
        specify('should not normalize operationId', async function () {
          const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  get: {}
            `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeOperationIds()],
          });

          expect(openApiElement).toMatchSnapshot();
        });
      });

      context(
        'given Operation Object with operationId field containing only special characters',
        function () {
          specify('should normalize operationId', async function () {
            const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /path/to/resource:
                  get:
                    operationId: ^%~ *@#
            `;
            const apiDOM = await parse(yamlDefinition);
            const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
              plugins: [refractorPluginNormalizeOperationIds()],
            });

            expect(openApiElement).toMatchSnapshot();
          });
        },
      );

      context(
        'given Operation Object with operationId field containing only empty spaces',
        function () {
          specify(
            'should construct normalized operationId from path and method',
            async function () {
              const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /path/to/resource:
                  get:
                    operationId: "   "
            `;
              const apiDOM = await parse(yamlDefinition);
              const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
                plugins: [refractorPluginNormalizeOperationIds()],
              });

              expect(openApiElement).toMatchSnapshot();
            },
          );
        },
      );

      context('given Operation Objects with identical operationId fields', function () {
        specify('should normalize operationId and append numeric suffix', async function () {
          const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  get:
                    operationId: get user
                  post:
                    operationId: get user
            `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeOperationIds()],
          });

          expect(openApiElement).toMatchSnapshot();
        });
      });
    });
  });
});
