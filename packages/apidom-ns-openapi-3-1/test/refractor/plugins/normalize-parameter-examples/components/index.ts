import { assert } from 'chai';
import dedent from 'dedent';
import { toValue } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { OpenApi3_1Element, refractorPluginNormalizeParameterExamples } from '../../../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-parameter-examples', function () {
      context('given Parameter Object is defined in Components.parameters', function () {
        specify('should skip the Parameter Object from normalization', async function () {
          const yamlDefinition = dedent`
              openapi: 3.1.0
              components:
                parameters:
                  parameter1:
                    name: param1
                    in: query
                    schema:
                      type: number
                      example: 1
                    example: 2
            `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeParameterExamples()],
          }) as OpenApi3_1Element;

          assert.strictEqual(
            toValue(
              openApiElement
                .get('components')
                .get('parameters')
                .get('parameter1')
                .get('schema')
                .get('example'),
            ),
            1,
          );
        });
      });

      context('given Parameter Object is defined in Components.pathItems', function () {
        specify('should skip the Parameter Object from normalization', async function () {
          const yamlDefinition = dedent`
              openapi: 3.1.0
              components:
                pathItems:
                  pathItem1:
                    parameters:
                      - name: param1
                        in: query
                        schema:
                          type: number
                          example: 1
                        examples:
                          example1:
                            value: 2
            `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [refractorPluginNormalizeParameterExamples()],
          }) as OpenApi3_1Element;

          assert.strictEqual(
            toValue(
              openApiElement
                .get('components')
                .get('pathItems')
                .get('pathItem1')
                .get('parameters')
                .get(0)
                .get('schema')
                .get('example'),
            ),
            1,
          );
        });
      });
    });
  });
});
