import { expect } from 'chai';
import dedent from 'dedent';
import { ObjectElement, toValue } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import { OpenApi3_1Element, refractorPluginNormalizeHeaderExamples } from '../../../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('normalize-header-examples', function () {
      context('given scope to limit the normalization', function () {
        specify('should limit the scope of normalization', async function () {
          const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  get:
                    responses:
                      "200":
                        headers:
                          content-type:
                            schema:
                              type: number
                              example: 1
                            examples:
                              example1:
                                value: 2
                      "400":
                        headers:
                          content-type:
                            schema:
                              type: number
                              example: 1
                            examples:
                              example1:
                                value: 2
        `;
          const apiDOM = await parse(yamlDefinition);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [
              refractorPluginNormalizeHeaderExamples({ scope: '/paths/~1/get/responses/200' }),
            ],
          }) as OpenApi3_1Element;

          expect(toValue(openApiElement)).toMatchSnapshot();
        });
      });

      context('given scope and running normalization multiple times', function () {
        specify('should avoid normalizing the same scope multiple times', async function () {
          const yamlDefinition = dedent`
              openapi: 3.1.0
              paths:
                /:
                  get:
                    responses:
                      "200":
                        headers:
                          content-type:
                            schema:
                              type: number
                              example: 1
                            examples:
                              example1:
                                value: 2
        `;
          const apiDOM = await parse(yamlDefinition);
          const result = apiDOM.result as ObjectElement;
          result.set('x-normalized', ['/paths/~1/get/responses/200']);
          const openApiElement = OpenApi3_1Element.refract(apiDOM.result, {
            plugins: [
              refractorPluginNormalizeHeaderExamples({ scope: '/paths/~1/get/responses/200' }),
            ],
          }) as OpenApi3_1Element;

          expect(toValue(openApiElement)).toMatchSnapshot();
        });
      });
    });
  });
});
