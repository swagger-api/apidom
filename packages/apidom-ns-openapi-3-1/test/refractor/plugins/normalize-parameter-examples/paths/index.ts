import { expect } from 'chai';
import dedent from 'dedent';
import { toValue } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { OpenApi3_1Element, refractorPluginNormalizeParameterExamples } from '../../../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-parameter-examples', function () {
      context('given Parameter Object defines examples field', function () {
        context('and Schema Object defines examples field', function () {
          specify('should override Schema Object examples field', async function () {
            const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  parameters:
                    - name: param1
                      in: query
                      schema:
                        type: number
                        examples: [1]
                      examples:
                        example1:
                          value: 2

            `;
            const apiDOM = await parse(yamlDefinition);
            const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
              plugins: [refractorPluginNormalizeParameterExamples()],
            }) as OpenApi3_1Element;

            expect(toValue(openApiElement)).toMatchSnapshot();
          });
        });

        context('and Schema Object defines example field', function () {
          specify('should override Schema Object example field', async function () {
            const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
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

            expect(toValue(openApiElement)).toMatchSnapshot();
          });
        });

        context('and Schema Object defines both example and examples fields', function () {
          specify(
            'should override both Schema Object example and examples fields',
            async function () {
              const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  parameters:
                    - name: param1
                      in: query
                      schema:
                        type: number
                        example: 1
                        examples: [2]
                      examples:
                        example1:
                          value: 3

            `;
              const apiDOM = await parse(yamlDefinition);
              const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
                plugins: [refractorPluginNormalizeParameterExamples()],
              }) as OpenApi3_1Element;

              expect(toValue(openApiElement)).toMatchSnapshot();
            },
          );
        });
      });

      context('given Parameter Object defines example field', function () {
        context('and Schema Object defines examples field', function () {
          specify('should override Schema Object examples field', async function () {
            const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  parameters:
                    - name: param1
                      in: query
                      schema:
                        type: number
                        examples: [2]
                      example: 2

            `;
            const apiDOM = await parse(yamlDefinition);
            const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
              plugins: [refractorPluginNormalizeParameterExamples()],
            }) as OpenApi3_1Element;

            expect(toValue(openApiElement)).toMatchSnapshot();
          });
        });

        context('and Schema Object defines example field', function () {
          specify('should override Schema Object example field', async function () {
            const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  parameters:
                    - name: param1
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

            expect(toValue(openApiElement)).toMatchSnapshot();
          });
        });

        context('and Schema Object defines both example and examples fields', function () {
          specify(
            'should override both Schema Object example and examples fields',
            async function () {
              const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  parameters:
                    - name: param1
                      in: query
                      schema:
                        type: number
                        example: 1
                        examples: [2]
                      example: 3

            `;
              const apiDOM = await parse(yamlDefinition);
              const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
                plugins: [refractorPluginNormalizeParameterExamples()],
              }) as OpenApi3_1Element;

              expect(toValue(openApiElement)).toMatchSnapshot();
            },
          );
        });
      });

      context('given Parameter Object defines both example and examples field', function () {
        context('and Schema Object defines examples field', function () {
          specify('should override Schema Object examples field', async function () {
            const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  parameters:
                    - name: param1
                      in: query
                      schema:
                        type: number
                        examples: [1]
                      examples:
                        example1:
                          value: 2
                      example: 3

            `;
            const apiDOM = await parse(yamlDefinition);
            const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
              plugins: [refractorPluginNormalizeParameterExamples()],
            }) as OpenApi3_1Element;

            expect(toValue(openApiElement)).toMatchSnapshot();
          });
        });

        context('and Schema Object defines example field', function () {
          specify('should override Schema Object example field', async function () {
            const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  parameters:
                    - name: param1
                      in: query
                      schema:
                        type: number
                        example: 1
                      examples:
                        example1:
                          value: 2
                      example: 3

            `;
            const apiDOM = await parse(yamlDefinition);
            const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
              plugins: [refractorPluginNormalizeParameterExamples()],
            }) as OpenApi3_1Element;

            expect(toValue(openApiElement)).toMatchSnapshot();
          });
        });

        context('and Schema Object defines both example and examples fields', function () {
          specify(
            'should override both Schema Object example and examples fields',
            async function () {
              const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  parameters:
                    - name: param1
                      in: query
                      schema:
                        type: number
                        example: 1
                        examples: [2]
                      examples:
                        example1:
                          value: 3
                      example: 4

            `;
              const apiDOM = await parse(yamlDefinition);
              const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
                plugins: [refractorPluginNormalizeParameterExamples()],
              }) as OpenApi3_1Element;

              expect(toValue(openApiElement)).toMatchSnapshot();
            },
          );
        });
      });
    });
  });
});
